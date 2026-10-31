import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="capstone-app">
      <header>
        <h1>Capstone Application</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<h2>Capstone Dashboard (Milestone 4)</h2>} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}
