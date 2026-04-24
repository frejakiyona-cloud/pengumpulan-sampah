-- Database schema for Sistem Sampah Siswa

CREATE TABLE IF NOT EXISTS students (
  code VARCHAR(4) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  student_code VARCHAR(4) REFERENCES students(code),
  waste_type VARCHAR(50) NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create an index for faster leaderboard queries
CREATE INDEX idx_submissions_student_code ON submissions(student_code);
