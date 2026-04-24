import React, { useState, useEffect } from 'react';
import { getDashboard } from '../utils/api';

const wasteNames = { 
  botol_plastik:'🍶 Botol Plastik', 
  kemasan_plastik:'🛍️ Kemasan Plastik', 
  packaging_makanan:'📦 Packaging Makanan', 
  minyak_jelantah:'🫙 Minyak Jelantah', 
  kardus:'📫 Kardus', 
  karton:'🗂️ Karton',
  logam:'🔩 Logam',
  beling:'🫗 Beling'
};

const wasteUnits = { botol_plastik:'Liter', minyak_jelantah:'Liter', kemasan_plastik:'Kg', packaging_makanan:'Kg', kardus:'Kg', karton:'Kg', logam:'Kg', beling:'Kg' };

const initialData = {
  totals: { kemasan_plastik:0, botol_plastik:0, minyak_jelantah:0, kardus:0, karton:0, packaging_makanan:0, logam:0, beling:0 },
  leaderboard: []
};

export default function Dashboard() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    getDashboard()
      .then(res => {
        if (res.totals) setData(res);
      })
      .catch(err => console.warn('Using mock dashboard data', err));
  }, []);

  const t = data.totals;
  const maxVal = Math.max(...Object.values(t));
  const rankColors = ['gold', 'silver', 'bronze'];

  return (
    <div className="page active">
      <div className="section">
        <div className="section-title">Dashboard Pengumpulan Sampah</div>
        <div className="section-sub">Data real-time dari seluruh siswa yang berpartisipasi</div>
        
        <div className="dash-grid">
          <div className="dash-card"><div className="dash-card-icon">🛍️</div><div className="dash-card-label">Kemasan Plastik</div><div className="dash-card-value">{t.kemasan_plastik.toFixed(1)}</div><div className="dash-card-unit">Kg</div></div>
          <div className="dash-card"><div className="dash-card-icon">🍶</div><div className="dash-card-label">Botol Plastik</div><div className="dash-card-value">{t.botol_plastik.toFixed(1)}</div><div className="dash-card-unit">Liter</div></div>
          <div className="dash-card"><div className="dash-card-icon">🫙</div><div className="dash-card-label">Minyak Jelantah</div><div className="dash-card-value">{t.minyak_jelantah.toFixed(1)}</div><div className="dash-card-unit">Liter</div></div>
          <div className="dash-card"><div className="dash-card-icon">📫</div><div className="dash-card-label">Kardus</div><div className="dash-card-value">{t.kardus.toFixed(1)}</div><div className="dash-card-unit">Kg</div></div>
          <div className="dash-card"><div className="dash-card-icon">🗂️</div><div className="dash-card-label">Karton</div><div className="dash-card-value">{t.karton.toFixed(1)}</div><div className="dash-card-unit">Kg</div></div>
          <div className="dash-card"><div className="dash-card-icon">📦</div><div className="dash-card-label">Packaging Makanan</div><div className="dash-card-value">{t.packaging_makanan.toFixed(1)}</div><div className="dash-card-unit">Kg</div></div>
          <div className="dash-card"><div className="dash-card-icon">🔩</div><div className="dash-card-label">Logam</div><div className="dash-card-value">{t.logam.toFixed(1)}</div><div className="dash-card-unit">Kg</div></div>
          <div className="dash-card"><div className="dash-card-icon">🫗</div><div className="dash-card-label">Beling</div><div className="dash-card-value">{t.beling.toFixed(1)}</div><div className="dash-card-unit">Kg</div></div>
        </div>

        <div className="bar-chart">
          <div className="bar-chart-title">Distribusi per Jenis Sampah</div>
          <div id="bar-chart-rows">
            {Object.entries(t).map(([k, v]) => (
              <div className="bar-row" key={k}>
                <div className="bar-name">{wasteNames[k]}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.round(v / maxVal * 100)}%` }}></div>
                </div>
                <div className="bar-val">{v.toFixed(1)} {wasteUnits[k]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>🏆 Papan Peringkat</div>
        <div className="section-sub">Peringkat berdasarkan total kontribusi (kode saja, tanpa identitas)</div>
        <div className="leaderboard">
          <div className="lb-header">Peringkat · Kode Siswa · Total Kontribusi</div>
          {data.leaderboard.map((r, i) => (
            <div className="lb-row" key={r.code}>
              <div className={`lb-rank ${rankColors[i] || ''}`}>#{i + 1}</div>
              <div className="lb-code">{r.code}</div>
              <div>
                <div className="lb-total">{r.total.toFixed(1)} unit</div>
                <div className="lb-sub">{r.submissions} pengiriman</div>
              </div>
              {i === 0 && <div className="lb-badge">🏆 Teratas</div>}
            </div>
          ))}
          {data.leaderboard.length === 0 && (
             <div className="lb-row" style={{ justifyContent: 'center', color: 'var(--text-muted)' }}>Belum ada data.</div>
          )}
        </div>
      </div>
    </div>
  );
}
