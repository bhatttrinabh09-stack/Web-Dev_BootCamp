import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { useProducts } from './hooks/useProducts';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const { products, loading, error, empty } = useProducts(query);

  return (
    <div className={`app-container theme-${theme}`}>
      <header className="header">
        <h1>Product Search</h1>
        <button onClick={toggleTheme}>Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
      </header>

      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search products (e.g. phone, watch, laptop)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
      {empty && <p>No products found for "{query}".</p>}

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h3>{p.title}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
