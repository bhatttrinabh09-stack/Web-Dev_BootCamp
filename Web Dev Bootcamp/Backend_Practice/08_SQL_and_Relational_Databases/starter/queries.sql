-- ==============================================================================
-- Topic 08 Starter: Business Analytic SQL Queries
-- ==============================================================================

-- QUERY 1: Retrieve all orders for 'alex@example.com' with customer name and product title
-- TODO: SELECT c.name, p.title, o.quantity, o.total_price ...


-- QUERY 2: Find top 3 best-selling products by total quantity sold
-- TODO: SELECT p.title, SUM(o.quantity) as total_sold ... GROUP BY ... ORDER BY ... LIMIT 3;


-- QUERY 3: Find all customers who have NEVER placed an order
-- TODO: SELECT c.name, c.email FROM customers c LEFT JOIN orders o ON ... WHERE o.id IS NULL;
