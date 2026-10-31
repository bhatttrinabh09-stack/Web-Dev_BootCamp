import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#0f172a', color: 'white' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>API Explorer</Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<h2>Search & Explore View (TODO)</h2>} />
          <Route path="/details/:id" element={<h2>Item Details (TODO)</h2>} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}
