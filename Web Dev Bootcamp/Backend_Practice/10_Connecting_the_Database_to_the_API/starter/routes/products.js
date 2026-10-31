// ==============================================================================
// Topic 10 Starter: Database-Connected Products Router
// Follow instructions in README.md section 8.
// ==============================================================================

import { Router } from 'express';
import { pool } from '../db.js';

export const productRouter = Router();

// GET /api/products
productRouter.get('/', async (req, res, next) => {
  try {
    // TODO 1: Query all products using pool.query
    // Return res.status(200).json(rows)
    throw new Error("TODO: Implement GET /api/products");
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
productRouter.get('/:id', async (req, res, next) => {
  try {
    // TODO 2: Query product by ID using parameterized query ($1)
    // If rows.length === 0 -> return 404
    throw new Error("TODO: Implement GET /api/products/:id");
  } catch (err) {
    next(err);
  }
});

// POST /api/products
productRouter.post('/', async (req, res, next) => {
  const { title, price, category } = req.body;
  try {
    // TODO 3: Insert product using parameterized query:
    // INSERT INTO products (title, price, category) VALUES ($1, $2, $3) RETURNING *;
    // Return 201 Created with rows[0]
    throw new Error("TODO: Implement POST /api/products");
  } catch (err) {
    next(err);
  }
});
