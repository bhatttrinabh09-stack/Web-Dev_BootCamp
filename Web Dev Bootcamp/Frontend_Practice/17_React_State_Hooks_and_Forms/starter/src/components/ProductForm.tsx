import React, { useState } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export function ProductForm({ onAddProduct }: ProductFormProps) {
  // TODO: Create controlled state for name, category, and price
  // TODO: Add client-side validation logic
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and submit
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div className="form-group">
        <label>Product Name</label>
        <input type="text" placeholder="e.g. Wireless Mouse" />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>
      <div className="form-group">
        <label>Price ($)</label>
        <input type="number" step="0.01" />
      </div>
      <button type="submit" className="btn">Add Product</button>
    </form>
  );
}
