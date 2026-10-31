import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { app, accountsDb } from '../server.js';

describe('Accounts API Integration Tests', () => {
  beforeEach(() => {
    // Reset test database
    accountsDb.length = 0;
    accountsDb.push(
      { id: "acc-1", email: "alex@example.com", balance: 500 },
      { id: "acc-2", email: "samira@example.com", balance: 1250 }
    );
  });

  it('GET /api/accounts returns all accounts with 200', async () => {
    const res = await request(app).get('/api/accounts');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('GET /api/accounts/:id returns single account for valid ID', async () => {
    // TODO: Write test for GET /api/accounts/acc-1
  });

  it('GET /api/accounts/:id returns 404 for unknown ID', async () => {
    // TODO: Write test for GET /api/accounts/non-existent
  });

  it('POST /api/accounts creates new account with 201', async () => {
    // TODO: Write test for POST /api/accounts with valid data
  });

  it('POST /api/accounts returns 400 when email is missing', async () => {
    // TODO: Write test for POST /api/accounts with missing email
  });
});
