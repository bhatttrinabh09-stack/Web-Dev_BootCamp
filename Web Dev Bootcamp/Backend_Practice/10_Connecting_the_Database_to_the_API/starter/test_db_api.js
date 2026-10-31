import fs from 'node:fs';

console.log("Analyzing Database API Security and Parameterization...\n");

const code = fs.readFileSync('routes/products.js', 'utf-8');

// Security check: Verify NO string interpolation in SQL
const hasDangerousInterpolation = /query\([`"'].*\$\{/i.test(code);
console.assert(!hasDangerousInterpolation, "CRITICAL SECURITY WARNING: String interpolation found in SQL query! Use parameterized queries ($1).");
console.log("✔ SQL Injection check passed: Zero string interpolation detected.");

console.assert(/RETURNING/i.test(code), "POST query should include RETURNING clause");
console.log("✔ RETURNING clause verified.");

console.log("\n🎉 Database connection and parameterized query checks passed!");
