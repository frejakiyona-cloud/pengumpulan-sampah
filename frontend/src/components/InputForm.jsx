import React, { useState } from 'react';
import { verifyCode, submitData } from '../utils/api';

const wasteUnits = { botol_plastik:'Liter', minyak_jelantah:'Liter', kemasan_plastik:'Kg', packaging_makanan:'Kg', kardus:'Kg', karton:'Kg', logam:'Kg', beling:'Kg' };

export default function InputForm() {
  const [tab, setTab] = useState('new');
  const [wasteType, setWasteType] = useState('');
  const [qty, setQty] = useState('');
  const [existingCode, setExistingCode] = useState('');
  const [verifyMsg, setVerifyMsg] = useState({ text: '', color: '' });
  const [successCode, setSuccessCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const code = existingCode.toUpperCase().trim();
    if (code.length !== 4) {
      setVerifyMsg({ text: '✗ Kode tidak valid. Masukkan 4 karakter.', color: '#A32D2D' });
      return;
    }
    
    try {
      const res = await verifyCode(code);
      if (res.valid) {
        setVerifyMsg({ text: '✓ Kode ditemukan!', color: 'var(--teal-600)' });
      } else {
        setVerifyMsg({ text: '✗ Kode tidak ditemukan di database.', color: '#A32D2D' });
      }
    } catch (err) {
      setVerifyMsg({ text: '✗ Gagal memverifikasi ke server.', color: '#A32D2D' });
    }
  };

  const handleSubmit = async () => {
    if (!wasteType) return alert('Pilih jenis sampah terlebih dahulu.');
    if (!qty || qty <= 0) return alert('Masukkan jumlah yang valid.');
    
    let code = tab === 'return' ? existingCode.toUpperCase().trim() : null;
    if (tab === 'return' && code?.length !== 4) return alert('Masukkan kode yang valid.');

    setLoading(true);
    try {
      const res = await submitData({
        isNewUser: tab === 'new',
        existingCode: code,
        wasteType,
        quantity: parseFloat(qty)
      });
      
      if (res.success) {
        setSuccessCode(res.code);
      } else {
        alert(res.error || 'Terjadi kesalahan.');
      }
    } catch (err) {
      alert('Gagal mengirim data ke server. Pastikan server berjalan.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccessCode(null);
    setWasteType('');
    setQty('');
    setExistingCode('');
    setVerifyMsg({ text: '', color: '' });
    setTab('new');
  };

  return (
    <div className="page active">
      <div className="section" style={{ maxWidth: 560 }}>
        <div className="section-title">Input Data Sampah</div>
        <div className="section-sub">Masukkan kode unikmu dan catat sampah yang kamu kumpulkan</div>
        
        {successCode ? (
          <div className="success-card show">
            <div style={{ fontSize: 48, marginBottom: '1rem' }}>✅</div>
            <div className="success-title">Data Berhasil Dikirim!</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Kode unikmu:</div>
            <div className="success-code">{successCode}</div>
            <div className="success-note">⚠️ Simpan kode ini! Kamu akan membutuhkannya untuk pengiriman berikutnya.</div>
            <button className="submit-btn" style={{ marginTop: '1.25rem', maxWidth: 220, display: 'inline-block' }} onClick={resetForm}>
              Kirim Lagi
            </button>
          </div>
        ) : (
          <div className="form-card">
            <div className="form-section-title">Kode Unik Siswa</div>
            <div className="toggle-group">
              <button className={`toggle-btn ${tab === 'new' ? 'active' : ''}`} onClick={() => setTab('new')}>Pertama Kali</button>
              <button className={`toggle-btn ${tab === 'return' ? 'active' : ''}`} onClick={() => setTab('return')}>Sudah Punya Kode</button>
            </div>
            
            {tab === 'new' && (
              <div className="info-box">💡 Kode unikmu akan dibuat otomatis oleh sistem saat kamu mengirim data pertama kali.</div>
            )}
            
            {tab === 'return' && (
              <div className="field-group">
                <label className="field-label">Masukkan Kode Unikmu</label>
                <div className="code-input-row">
                  <input 
                    type="text" 
                    placeholder="Contoh: F243" 
                    maxLength="4" 
                    value={existingCode}
                    onChange={(e) => setExistingCode(e.target.value)}
                  />
                  <button onClick={handleVerify}>Verifikasi</button>
                </div>
                {verifyMsg.text && <div style={{ fontSize: 12, marginTop: -8, color: verifyMsg.color }}>{verifyMsg.text}</div>}
              </div>
            )}

            <div className="form-section-title" style={{ marginTop: '1.5rem' }}>Data Sampah</div>
            <div className="field-group">
              <label className="field-label">Jenis Sampah</label>
              <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
                <option value="">-- Pilih jenis sampah --</option>
                <option value="botol_plastik">🍶 Botol Plastik</option>
                <option value="kemasan_plastik">🛍️ Kemasan Plastik</option>
                <option value="packaging_makanan">📦 Packaging Makanan</option>
                <option value="minyak_jelantah">🫙 Minyak Jelantah</option>
                <option value="kardus">📫 Kardus</option>
                <option value="karton">🗂️ Karton</option>
                <option value="logam">🔩 Logam</option>
                <option value="beling">🫗 Beling</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Jumlah</label>
              <div className="qty-row">
                <input type="number" placeholder="0" min="0" step="0.1" value={qty} onChange={(e) => setQty(e.target.value)} />
                <div className="unit-badge">{wasteType ? wasteUnits[wasteType] : '—'}</div>
              </div>
            </div>
            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Mengirim...' : 'Kirim Data Sampah →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
