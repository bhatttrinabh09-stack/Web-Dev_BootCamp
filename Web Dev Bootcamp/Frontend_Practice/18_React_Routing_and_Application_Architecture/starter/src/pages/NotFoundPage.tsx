import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1>404</h1>
      <p>Oops! The page you were looking for doesn't exist.</p>
      <Link to="/" style={{ color: '#2563eb' }}>Return to Home</Link>
    </div>
  );
}
