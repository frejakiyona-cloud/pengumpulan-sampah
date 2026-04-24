import React, { useState } from 'react';
import Landing from './components/Landing';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = useState('landing');

  return (
    <>
      <nav>
        <div className="nav-logo" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text)' }}>Ecoquester</div>
        <div className="nav-links">
          <button className={`nav-link ${page === 'landing' ? 'active' : ''}`} onClick={() => setPage('landing')}>Beranda</button>
          <button className={`nav-link ${page === 'input' ? 'active' : ''}`} onClick={() => setPage('input')}>Input</button>
          <button className={`nav-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>Dashboard</button>
        </div>
      </nav>

      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'input' && <InputForm />}
      {page === 'dashboard' && <Dashboard />}
    </>
  );
}
