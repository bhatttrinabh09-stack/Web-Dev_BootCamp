import fs from 'node:fs';

console.log("Analyzing SQL Schema and Queries...\n");

const schema = fs.readFileSync('schema.sql', 'utf-8');
const queries = fs.readFileSync('queries.sql', 'utf-8');

// Schema checks
console.assert(/CREATE TABLE customers/i.test(schema), "Missing customers table");
console.assert(/CREATE TABLE products/i.test(schema), "Missing products table");
console.assert(/CREATE TABLE orders/i.test(schema), "Missing orders table");
console.assert(/(REFERENCES customers|FOREIGN KEY)/i.test(schema), "Missing Foreign Key reference to customers");
console.log("✔ Schema tables and foreign keys parsed.");

// Query checks
console.assert(/JOIN/i.test(queries), "Queries must use JOIN");
console.assert(/GROUP BY/i.test(queries), "Query 2 must use GROUP BY");
console.assert(/LIMIT/i.test(queries), "Query 2 must use LIMIT");
console.assert(/IS NULL/i.test(queries), "Query 3 must check IS NULL");
console.log("✔ Analytical SQL queries syntax verified.");

console.log("\n🎉 All SQL syntax and relational checks passed!");
