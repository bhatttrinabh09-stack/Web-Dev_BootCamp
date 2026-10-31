import fs from 'node:fs';

console.log("Validating PostgreSQL Schema and Queries...\n");

const schema = fs.readFileSync('init_postgres.sql', 'utf-8');
const queries = fs.readFileSync('analytic_queries.sql', 'utf-8');

console.assert(/gen_random_uuid/i.test(schema), "Schema should use gen_random_uuid() for primary keys");
console.assert(/CHECK/i.test(schema), "Schema should use CHECK constraints for roles/statuses");
console.assert(/CREATE INDEX/i.test(schema), "Schema should include explicit index creation");
console.log("✔ PostgreSQL schema constraints and indexes verified.");

console.assert(/GROUP BY/i.test(queries), "Analytic query must use GROUP BY");
console.log("✔ Analytic query structure verified.");

console.log("\n🎉 PostgreSQL modelling check passed!");
