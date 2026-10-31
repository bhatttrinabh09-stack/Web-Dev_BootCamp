import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>🚀 Production Deployment Artifact</h1>
      <p>This application demonstrates production bundling, caching headers, and SPA rewrites.</p>
    </main>
  </React.StrictMode>
);
