import React, { useState } from 'react';
import { Product } from './types';
import { ProductForm } from './components/ProductForm';

export default function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: 'USB-C Cable', category: 'Electronics', price: 14.99 },
    { id: 'p2', name: 'Clean Code Handbook', category: 'Books', price: 34.50 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // TODO: Compute derived statistics:
  // 1. filteredProducts based on selectedCategory
  // 2. totalProducts count
  // 3. averagePrice of filtered products

  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const productWithId: Product = { ...newProd, id: Date.now().toString() };
    setProducts(prev => [...prev, productWithId]);
  };

  return (
    <div className="container">
      <h1>Inventory & Pricing Tracker</h1>
      
      {/* TODO: Display stats bar */}

      <ProductForm onAddProduct={handleAddProduct} />

      <section className="card">
        <h2>Product Records</h2>
        {/* Render products table */}
      </section>
    </div>
  );
}
