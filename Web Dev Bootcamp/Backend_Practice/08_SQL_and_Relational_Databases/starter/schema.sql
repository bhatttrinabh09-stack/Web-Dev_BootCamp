-- ==============================================================================
-- Topic 08 Starter: Relational E-Commerce Schema
-- ==============================================================================

-- 1. Customers Table
CREATE TABLE customers (
  -- TODO: id (SERIAL or INT PRIMARY KEY)
  -- TODO: name (VARCHAR NOT NULL)
  -- TODO: email (VARCHAR UNIQUE NOT NULL)
  -- TODO: created_at (TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP)
);

-- 2. Products Table
CREATE TABLE products (
  -- TODO: id (PRIMARY KEY)
  -- TODO: title (VARCHAR NOT NULL)
  -- TODO: price (NUMERIC NOT NULL CHECK (price > 0))
  -- TODO: stock (INTEGER NOT NULL CHECK (stock >= 0))
);

-- 3. Orders Table
CREATE TABLE orders (
  -- TODO: id (PRIMARY KEY)
  -- TODO: customer_id (REFERENCES customers(id) ON DELETE CASCADE)
  -- TODO: product_id (REFERENCES products(id))
  -- TODO: quantity (INTEGER NOT NULL CHECK (quantity > 0))
  -- TODO: total_price (NUMERIC NOT NULL)
  -- TODO: order_date (TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP)
);
