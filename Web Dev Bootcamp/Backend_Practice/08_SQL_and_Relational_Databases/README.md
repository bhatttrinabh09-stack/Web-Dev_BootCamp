# 08. SQL and Relational Databases

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain why relational databases exist and how they guarantee structured persistence and data integrity.
- Define relational schema concepts: tables, rows, columns, data types, primary keys, and foreign keys.
- Enforce data integrity using constraints (`NOT NULL`, `UNIQUE`, `CHECK`, `REFERENCES`).
- Apply relational normalization principles (1NF, 2NF, 3NF) to eliminate duplicate data.
- Author core SQL queries: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `GROUP BY`, and aggregate functions (`COUNT`, `SUM`, `AVG`).
- Combine relational entities using `INNER JOIN` and `LEFT JOIN`.

## 2. What is this?
A **Relational Database Management System (RDBMS)** stores structured data in tables consisting of rows and columns. **SQL (Structured Query Language)** is the standardized declarative language used to create, query, update, and manage relational databases.

## 3. Why does it exist?
Storing data in flat JSON files on a server disk fails at scale:
- Multiple users writing to a JSON file simultaneously corrupt the file (race condition).
- Searching for a specific record in a 10GB JSON file requires loading the entire 10GB into RAM.
- There are no foreign key constraints, meaning an order could reference a non-existent customer.
RDBMS engines (PostgreSQL, MySQL) provide ACID guarantees, transaction safety, concurrent locking, and indexing.

## 4. How does it work?
Relational tables connect via Primary Keys and Foreign Keys:

```
┌────────────────────────┐                 ┌───────────────────────────┐
│     users table        │                 │       orders table        │
├────────────────────────┤                 ├───────────────────────────┤
│ id (PK)   SERIAL       │ <─── 1-to-Many ─│ id (PK)       SERIAL      │
│ email     VARCHAR(255) │                 │ user_id (FK)  INTEGER     │
│ full_name VARCHAR(100) │                 │ total_amount  NUMERIC     │
└────────────────────────┘                 │ created_at    TIMESTAMPTZ │
                                           └───────────────────────────┘
```

### Joining Tables:
```sql
SELECT users.full_name, orders.total_amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total_amount > 100.00;
```
- `INNER JOIN`: Returns only rows where a match exists in **both** tables.
- `LEFT JOIN`: Returns all rows from the left table, with `NULL` for unmatched right table rows.

## 5. Important concepts and syntax
- `CREATE TABLE table_name ( column_name TYPE CONSTRAINTS );`
- Constraints: `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK (amount > 0)`.
- Foreign Key: `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`.
- Aggregations with `GROUP BY`:
  ```sql
  SELECT user_id, COUNT(*) as order_count, SUM(total_amount) as total_spent
  FROM orders
  GROUP BY user_id
  HAVING COUNT(*) >= 2;
  ```

## 6. Small worked example
Calculating customer spend summary:

```sql
SELECT 
  u.id, 
  u.email, 
  COUNT(o.id) AS total_orders, 
  COALESCE(SUM(o.total_amount), 0) AS lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email
ORDER BY lifetime_value DESC;
```
*Explanation:* Uses `LEFT JOIN` so users with 0 orders still appear in the list with `0` spend via `COALESCE`.

## 7. Common mistakes
1. **Accidentally using `INNER JOIN` when you need all records:** Using `INNER JOIN` on customers and orders excludes new customers who haven't placed an order yet!
2. **Missing `GROUP BY` with aggregate functions:** Selecting non-aggregated columns alongside `COUNT()` or `SUM()` without grouping by those columns throws a SQL syntax error.
3. **Omitting `WHERE` clause on `UPDATE` or `DELETE`:** Running `DELETE FROM users;` deletes every single row in the table! Always specify `WHERE id = ...`.

## 8. Coding challenge
**Environment:** SQL CLI / Node verification runner.

Open `Backend_Practice/08_SQL_and_Relational_Databases/starter/`:
1. In `schema.sql`:
   - Design the schema for an E-Commerce system: `customers`, `products`, and `orders`.
   - `customers`: `id`, `name`, `email` (unique, not null), `created_at`.
   - `products`: `id`, `title`, `price` (check > 0), `stock` (check >= 0).
   - `orders`: `id`, `customer_id` (foreign key to customers), `product_id` (foreign key to products), `quantity` (> 0), `total_price`, `order_date`.
2. In `queries.sql`:
   - Query 1: Retrieve all orders made by customer with email `'alex@example.com'`, joining customer name and product title.
   - Query 2: Find the top 3 best-selling products by total quantity sold using `SUM()`, `GROUP BY`, and `ORDER BY ... DESC LIMIT 3`.
   - Query 3: Find all customers who have never placed an order using a `LEFT JOIN` and `WHERE orders.id IS NULL`.
3. Run `node verify_sql.js` to parse and validate the SQL statements.

## 9. Acceptance criteria
- [ ] Schema enforces primary keys, foreign keys, not-null, and check constraints.
- [ ] Queries use uppercase SQL keywords consistently.
- [ ] Query 1 correctly joins 3 tables (`orders`, `customers`, `products`).
- [ ] Query 2 calculates totals with `GROUP BY` and `LIMIT`.
- [ ] Query 3 uses `LEFT JOIN ... WHERE ... IS NULL`.

## 10. Test cases
- **Constraint Check:** Verify check constraint prevents negative prices.
- **Join Check:** Query 1 returns product title and customer name.
- **Aggregation:** Query 2 aggregates quantities correctly.

## 11. Hints
1. *Concept:* Foreign keys create referential integrity: the database will prevent inserting an order for a customer that does not exist.
2. *Approach:* For joining three tables: `FROM orders JOIN customers ON ... JOIN products ON ...`.
3. *Specifics:* In Query 3, check `WHERE o.id IS NULL` after the `LEFT JOIN`.

## 12. Bonus challenge
Write a SQL Transaction (`BEGIN; ... COMMIT;`) simulating the purchase of an item: inserts into `orders` and decrements product `stock` by the ordered quantity, rolling back (`ROLLBACK;`) if stock falls below zero.

## 13. Self-check
1. What is the difference between a Primary Key and a Foreign Key?
2. What happens if you run an `UPDATE` statement without a `WHERE` clause?
3. In what situation would you choose `LEFT JOIN` over `INNER JOIN`?
4. What is database normalization and what problem does 3NF (Third Normal Form) solve?

## 14. References
- [PostgreSQL Tutorial (Official)](https://www.postgresql.org/docs/current/tutorial.html)
- [SQL Bolt: Interactive SQL Lessons](https://sqlbolt.com/)
- [MDN: Database basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Databases)
