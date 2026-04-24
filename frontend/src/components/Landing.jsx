import React, { useState, useEffect } from 'react';
import { getDashboard } from '../utils/api';

const wasteTypesInfo = [
  { id: 'botol_plastik', icon: '🍶', name: 'Botol Plastik', unit: 'Liter' },
  { id: 'kemasan_plastik', icon: '🛍️', name: 'Kemasan Plastik', unit: 'Kg' },
  { id: 'packaging_makanan', icon: '📦', name: 'Packaging Makanan', unit: 'Kg' },
  { id: 'minyak_jelantah', icon: '🫙', name: 'Minyak Jelantah', unit: 'Liter' },
  { id: 'kardus', icon: '📫', name: 'Kardus', unit: 'Kg' },
  { id: 'karton', icon: '🗂️', name: 'Karton', unit: 'Kg' },
  { id: 'logam', icon: '🔩', name: 'Logam', unit: 'Kg' },
];

export default function Landing({ setPage }) {
  const [stats, setStats] = useState({ total_quantity: 0, students: 0, submissions: 0 });

  useEffect(() => {
    // Try to fetch real stats
    getDashboard()
      .then(data => {
        if (data.stats) {
          setStats({
            total_quantity: data.stats.total_quantity || 0,
            students: data.stats.students || 0,
            submissions: data.stats.submissions || 0
          });
        }
      })
      .catch(err => console.warn('Could not fetch stats, using default mock data', err));
  }, []);

  return (
    <div className="page active">
      <div className="hero">
        <div className="hero-school">Program Daur Ulang SMAK PENABUR Harapan Indah · by Ecobassadors</div>
        <div className="hero-badge">🌱 Program Daur Ulang Sekolah</div>
        <h1>Bersama Kita Jaga<br/><em>Bumi Lebih Bersih</em></h1>
        <p>Catat sampah yang kamu kumpulkan, lihat kontribusimu, dan bersaing dengan teman-teman untuk menjadi pahlawan lingkungan!</p>
        <button className="btn-primary" onClick={() => setPage('input')}>✦ Mulai Input Data</button>
        <button className="btn-secondary" onClick={() => setPage('dashboard')}>Lihat Dashboard</button>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">{stats.total_quantity.toFixed(0)}</div>
          <div className="stat-label">Kg + Liter Terkumpul</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.students}</div>
          <div className="stat-label">Siswa Berpartisipasi</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.submissions}</div>
          <div className="stat-label">Total Pengiriman</div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Jenis Sampah yang Diterima</div>
        <div className="section-sub">Kumpulkan dan catat sampah berikut untuk mendapatkan poin</div>
        <div className="waste-grid">
          {wasteTypesInfo.map(w => (
            <div className="waste-card" key={w.id}>
              <span className="waste-icon">{w.icon}</span>
              <div className="waste-name">{w.name}</div>
              <div className="waste-unit">{w.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
