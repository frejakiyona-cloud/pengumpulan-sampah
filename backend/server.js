const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API: Verify Code
app.post('/api/verify-code', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || code.length !== 4) {
      return res.status(400).json({ error: 'Kode tidak valid' });
    }

    const result = await db.query('SELECT code FROM students WHERE code = $1', [code.toUpperCase()]);
    if (result.rows.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false, error: 'Kode tidak ditemukan' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper: Generate Code
const generateCode = () => {
  const c = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  const n = '0123456789';
  return c[Math.floor(Math.random() * c.length)] + 
         n[Math.floor(Math.random() * n.length)] + 
         n[Math.floor(Math.random() * n.length)] + 
         n[Math.floor(Math.random() * n.length)];
};

// API: Submit Waste Data
app.post('/api/submissions', async (req, res) => {
  try {
    const { isNewUser, existingCode, wasteType, quantity } = req.body;
    
    if (!wasteType || quantity <= 0) {
      return res.status(400).json({ error: 'Data tidak valid' });
    }

    let code = existingCode ? existingCode.toUpperCase() : null;

    if (isNewUser) {
      // Generate a unique code
      let isUnique = false;
      while (!isUnique) {
        code = generateCode();
        const check = await db.query('SELECT code FROM students WHERE code = $1', [code]);
        if (check.rows.length === 0) {
          isUnique = true;
        }
      }
      // Insert new student
      await db.query('INSERT INTO students (code) VALUES ($1)', [code]);
    } else {
      // Validate existing code
      if (!code || code.length !== 4) {
        return res.status(400).json({ error: 'Kode tidak valid' });
      }
      const check = await db.query('SELECT code FROM students WHERE code = $1', [code]);
      if (check.rows.length === 0) {
         return res.status(404).json({ error: 'Kode tidak ditemukan' });
      }
    }

    // Insert submission
    await db.query(
      'INSERT INTO submissions (student_code, waste_type, quantity) VALUES ($1, $2, $3)',
      [code, wasteType, quantity]
    );

    res.json({ success: true, code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  try {
    // 1. Get totals by waste type
    const totalsResult = await db.query(`
      SELECT waste_type, SUM(quantity) as total 
      FROM submissions 
      GROUP BY waste_type
    `);
    
    const totals = {
      kemasan_plastik: 0,
      botol_plastik: 0,
      minyak_jelantah: 0,
      kardus: 0,
      karton: 0,
      packaging_makanan: 0,
      logam: 0
    };

    totalsResult.rows.forEach(row => {
      if (totals[row.waste_type] !== undefined) {
        totals[row.waste_type] = parseFloat(row.total);
      }
    });

    // 2. Get leaderboard (Top 10)
    const leaderboardResult = await db.query(`
      SELECT student_code as code, SUM(quantity) as total, COUNT(*) as submissions
      FROM submissions
      GROUP BY student_code
      ORDER BY total DESC
      LIMIT 10
    `);

    // 3. Get aggregate stats
    const statsResult = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM students) as total_students,
        (SELECT COUNT(*) FROM submissions) as total_submissions,
        (SELECT COALESCE(SUM(quantity), 0) FROM submissions) as total_quantity
    `);

    const stats = {
      students: parseInt(statsResult.rows[0].total_students),
      submissions: parseInt(statsResult.rows[0].total_submissions),
      total_quantity: parseFloat(statsResult.rows[0].total_quantity)
    };

    res.json({
      totals,
      leaderboard: leaderboardResult.rows.map(r => ({
        ...r,
        total: parseFloat(r.total),
        submissions: parseInt(r.submissions)
      })),
      stats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
