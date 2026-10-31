# 09. PostgreSQL Data Modelling and Queries

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Connect to and interact with a PostgreSQL database instance using the `psql` command-line client.
- Model production domain schemas with appropriate PostgreSQL data types (`UUID`, `VARCHAR`, `TIMESTAMPTZ`, `JSONB`, `BOOLEAN`).
- Model One-to-One, One-to-Many, and **Many-to-Many** relationships using junction (join) tables.
- Create database indexes (`B-tree`) to accelerate query lookups and explain index trade-offs.
- Execute multi-table analytical queries featuring subqueries and window functions.
- Safely alter schemas using migrations without dropping production tables.

## 2. What is this?
**PostgreSQL** is the world's most advanced open-source relational database. It is renowned for its reliability, feature robustness, and performance. Beyond basic SQL, PostgreSQL supports UUID generation, rich date/time arithmetic, JSONB storage, and complex indexing.

## 3. Why does it exist?
While basic SQL syntax works across many databases, real-world engineering requires specialized database capabilities:
- Using auto-incrementing integers (`1, 2, 3`) for public IDs allows competitors to scrape your URLs and guess total order volumes. UUIDs prevent ID enumeration.
- PostgreSQL's `JSONB` format allows storing flexible schemaless attributes alongside strictly typed relational columns.
- Advanced constraints prevent race conditions and invalid data before it touches storage.

## 4. How does it work?
### Modelling Many-to-Many Relationships:
A student can enroll in multiple courses, and a course has multiple students. This requires a **Junction Table**:

```
┌─────────────────┐       ┌────────────────────────┐       ┌─────────────────┐
│  users (table)  │       │  enrollments (table)   │       │ courses (table) │
├─────────────────┤       ├────────────────────────┤       ├─────────────────┤
│ id (PK) UUID    │ <──── │ user_id (FK)   UUID    │ ────> │ id (PK) UUID    │
│ email   VARCHAR │       │ course_id (FK) UUID    │       │ title   VARCHAR │
└─────────────────┘       │ enrolled_at    TIMESTAMP│      └─────────────────┘
                          │ PRIMARY KEY (user_id,  │
                          │              course_id)│
                          └────────────────────────┘
```
The composite primary key `(user_id, course_id)` guarantees a student cannot accidentally enroll in the same course twice!

## 5. Important concepts and syntax
- UUID Extension:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  -- or gen_random_uuid() in PostgreSQL 13+
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ```
- Adding an Index:
  ```sql
  CREATE INDEX idx_users_email ON users(email);
  ```
- Analyzing Query Performance:
  ```sql
  EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
  ```

## 6. Small worked example
A Many-to-Many query retrieving a student's enrolled course titles:

```sql
SELECT 
  u.email, 
  c.title AS course_title, 
  e.enrolled_at
FROM users u
JOIN enrollments e ON u.id = e.user_id
JOIN courses c ON e.course_id = c.id
WHERE u.id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
```

## 7. Common mistakes
1. **Indexing every single column:** Indexes speed up `SELECT` reads, but **slow down** `INSERT`, `UPDATE`, and `DELETE` writes because the index tree must be updated on every modification! Only index columns used frequently in `WHERE` and `JOIN` clauses.
2. **Using `TIMESTAMP` instead of `TIMESTAMPTZ`:** Plain `TIMESTAMP` ignores time zones, causing timezone conversion bugs when servers or users are in different parts of the world. Always use `TIMESTAMPTZ`.
3. **Missing Foreign Key indexes:** Foreign key columns (like `order_id` or `user_id`) are NOT indexed automatically in PostgreSQL. Failing to add an index causes table scans on joins.

## 8. Coding challenge
**Environment:** SQL / PostgreSQL CLI (`psql`).

Open `Backend_Practice/09_PostgreSQL_Data_Modelling_and_Queries/starter/`:
1. In `init_postgres.sql`:
   - Design a Project Management schema with UUID primary keys:
     - `organizations` (`id UUID`, `name VARCHAR NOT NULL`, `created_at TIMESTAMPTZ`).
     - `members` (`id UUID`, `org_id UUID REFERENCES organizations`, `email VARCHAR NOT NULL`, `role VARCHAR CHECK (role IN ('admin', 'member', 'viewer'))`).
     - `tasks` (`id UUID`, `org_id UUID REFERENCES organizations`, `assignee_id UUID REFERENCES members`, `title VARCHAR NOT NULL`, `status VARCHAR CHECK (status IN ('todo', 'in_progress', 'done'))`).
   - Add indexes on foreign keys and email.
   - Insert sample seed data for 1 organization, 3 members, and 5 tasks.
2. In `analytic_queries.sql`:
   - Write an analytical query returning each organization name, total member count, total tasks count, and number of completed (`done`) tasks.
3. Run `node verify_postgres.js` to validate schema and query correctness.

## 9. Acceptance criteria
- [ ] Schema utilizes UUIDs with `gen_random_uuid()` as primary keys.
- [ ] Role and status values are constrained with SQL `CHECK` clauses.
- [ ] Foreign keys include indexes for performance.
- [ ] Analytical query uses aggregations (`COUNT`, `FILTER (WHERE status = 'done')` or `SUM(CASE ...)`).

## 10. Test cases
- **UUID Check:** Primary keys use `gen_random_uuid()`.
- **Constraint:** Attempting to insert `role = 'superadmin'` violates CHECK constraint.
- **Aggregation:** Organization report returns accurate task counts.

## 11. Hints
1. *Concept:* In PostgreSQL, you can conditionally count rows using: `COUNT(*) FILTER (WHERE status = 'done')`.
2. *Approach:* Create indexes explicitly: `CREATE INDEX idx_tasks_org_id ON tasks(org_id);`.
3. *Specifics:* Always default timestamps with `DEFAULT CURRENT_TIMESTAMP` or `DEFAULT NOW()`.

## 12. Bonus challenge
Use PostgreSQL's `JSONB` data type to add a `metadata JSONB` column to the `tasks` table, and write a query using the JSON containment operator (`@>`) to find tasks with specific tags.

## 13. Self-check
1. Why are UUIDs often preferred over auto-incrementing serial integers for public IDs?
2. What is the difference between `TIMESTAMPTZ` and `TIMESTAMP` in PostgreSQL?
3. How does a database index speed up `SELECT` queries, and what is its cost?
4. What is a junction table and when is it required?

## 14. References
- [PostgreSQL Official Documentation: Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL: Indexes](https://www.postgresql.org/docs/current/indexes.html)
