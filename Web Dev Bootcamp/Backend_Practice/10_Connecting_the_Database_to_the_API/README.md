# 10. Connecting the Database to the API

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Connect an Express backend to a PostgreSQL database using the `pg` (node-postgres) driver.
- Manage database connections efficiently using Connection Pooling (`pg.Pool`).
- Prevent catastrophic SQL Injection attacks using **Parameterized Queries** (`$1, $2`).
- Organize backend code into a clean, maintainable layered architecture (Routes -> Controllers/Services -> DB Access).
- Handle database runtime errors defensively (e.g. Unique key violation code `23505`).
- Explain the role of Object-Relational Mappers (ORMs) and why raw SQL must be mastered first.

## 2. What is this?
**Database Integration** is the bridge linking your Node.js application server to your persistent PostgreSQL database. Using the `pg` library, your Express server sends SQL commands across a network socket and receives typed JavaScript objects in return.

## 3. Why does it exist?
In earlier exercises, resources were stored in in-memory JavaScript arrays (`let books = []`). The moment the Node server restarted, all customer data vanished. Connecting PostgreSQL ensures data survives server restarts, crashes, and deployments.

## 4. How does it work?
### Connection Pooling with `pg.Pool`:
Opening a new database connection for every incoming HTTP request takes ~50ms of TCP/TLS handshaking, which crushes API performance. A **Connection Pool** maintains a pre-warmed set of reusable connections:

```
[ Incoming HTTP Requests ]
    │        │        │
    ▼        ▼        ▼
┌─────────────────────────────────┐
│     pg.Pool (5-20 connections)  │ ── Reuses connections instantly!
└─────────────────────────────────┘
    │        │        │
    ▼        ▼        ▼
[ PostgreSQL Database Server ]
```

### SQL Injection: The #1 Database Vulnerability
```javascript
// ❌ VULNERABLE: Direct string concatenation!
// If user inputs: "admin' OR '1'='1"
const query = `SELECT * FROM users WHERE username = '${userInput}'`;
// Executes: SELECT * FROM users WHERE username = 'admin' OR '1'='1' (Bypasses password!)

// ✔ SECURE: Parameterized Query
// PostgreSQL treats $1 strictly as literal text, never as executable SQL!
const query = `SELECT * FROM users WHERE username = $1`;
const result = await pool.query(query, [userInput]);
```

## 5. Important concepts and syntax
- Creating the Pool:
  ```javascript
  import pg from 'pg';
  export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  ```
- Executing queries:
  ```javascript
  const { rows } = await pool.query('SELECT * FROM items WHERE category = $1', [category]);
  ```
- Unique Violation Error Code: `err.code === '23505'`.

## 6. Small worked example
A secure user creation controller using parameterized queries:

```javascript
export async function createUser(req, res, next) {
  const { email, name } = req.body;
  try {
    const query = `
      INSERT INTO users (email, name)
      VALUES ($1, $2)
      RETURNING id, email, name, created_at;
    `;
    const { rows } = await pool.query(query, [email, name]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Unique constraint violation
      return res.status(409).json({ error: 'Email already registered' });
    }
    next(err);
  }
}
```

## 7. Common mistakes
1. **Concatenating untrusted user input into SQL strings:** The single most dangerous web security mistake. Always use `$1, $2` parameters.
2. **Creating `new Client()` on every request instead of `pg.Pool`:** Exhausts database connection limits within seconds under traffic.
3. **Forgetting `RETURNING *` on `INSERT` or `UPDATE`:** In PostgreSQL, an `INSERT` statement does not return the created row unless you explicitly append `RETURNING *`.

## 8. Coding challenge
**Environment:** Terminal (Node.js + PostgreSQL).

Open `Backend_Practice/10_Connecting_the_Database_to_the_API/starter/`:
Replace in-memory storage with real PostgreSQL persistence in `routes/products.js`:
1. In `db.js`: Configure `pg.Pool` reading `process.env.DATABASE_URL`.
2. In `routes/products.js`:
   - `GET /api/products`: Executes `SELECT * FROM products ORDER BY created_at DESC;`.
   - `GET /api/products/:id`: Uses parameterized query `$1` to fetch by ID. Returns 404 if not found.
   - `POST /api/products`: Inserts `{ title, price, category }` using parameterized query and `RETURNING *`. Returns 201 Created.
   - `DELETE /api/products/:id`: Deletes by ID using `$1`. Returns 204 No Content.
3. Test against a local PostgreSQL instance or run `npm test` with the mock/test runner.

## 9. Acceptance criteria
- [ ] Uses `pg.Pool` connection pool.
- [ ] ZERO string concatenation in SQL queries (100% parameterized with `$1, $2`).
- [ ] `POST` uses `RETURNING *` to respond with the created record.
- [ ] Handled unique constraint conflicts with 409 Conflict.

## 10. Test cases
- **Fetch List:** `GET /api/products` returns array from PostgreSQL.
- **SQL Injection Defense:** Passing `' OR 1=1 --` into title parameter is treated as harmless literal text.
- **Create:** `POST` creates row and returns database-assigned ID and timestamp.

## 11. Hints
1. *Concept:* The `$1, $2` placeholders correspond to the array elements in the second argument: `pool.query(sql, [val1, val2])`.
2. *Approach:* Check if item exists: `if (rows.length === 0) return res.status(404)...`.
3. *Specifics:* For deletion: check `result.rowCount === 0` to know if an ID did not exist.

## 12. Bonus challenge
Implement a database transaction in Node.js using `const client = await pool.connect()`: execute `BEGIN`, perform multiple queries, `COMMIT`, and ensure `client.release()` is called in a `finally` block.

## 13. Self-check
1. Why is concatenating user input directly into a SQL query string a catastrophic security vulnerability?
2. What is the performance benefit of a database connection pool over opening individual connections?
3. What does the `RETURNING *` clause do in a PostgreSQL `INSERT` statement?
4. What is PostgreSQL error code `23505`?

## 14. References
- [node-postgres (pg) Official Documentation](https://node-postgres.com/)
- [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
