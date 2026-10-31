// ==============================================================================
// Topic 04 Starter: Books Router
// Follow instructions in README.md section 8.
// ==============================================================================

import { Router } from 'express';

export const bookRouter = Router();

// In-Memory Data Store
export let books = [
  { id: 'b1', title: '1984', author: 'George Orwell', year: 1949 },
  { id: 'b2', title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
  { id: 'b3', title: 'Animal Farm', author: 'George Orwell', year: 1945 },
];

// TODO 1: GET / - Return all books (with optional ?author= query filtering)

// TODO 2: GET /:id - Return book by ID or 404

// TODO 3: POST / - Validate title/author, add new book, return 201 Created
