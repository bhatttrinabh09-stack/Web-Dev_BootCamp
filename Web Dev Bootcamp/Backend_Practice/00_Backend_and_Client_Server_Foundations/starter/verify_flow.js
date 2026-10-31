// Verification script for Topic 00
import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('request_flow_analysis.md');

try {
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log("Analyzing your request flow document...\n");

  const hasMethod = /POST/i.test(content);
  const hasAuth = /(cookie|authorization|token)/i.test(content);
  const hasDB = /(inventory|select|stock)/i.test(content);
  const hasStatus = /(201|400|409)/.test(content);

  if (hasMethod && hasAuth && hasDB && hasStatus && !content.includes("...")) {
    console.log("🎉 Great job! Your architectural flow analysis is complete and rigorous.");
  } else {
    console.log("⚠️ Some sections still contain placeholder prompts (...) or missing concepts. Complete all steps in request_flow_analysis.md.");
  }
} catch (err) {
  console.error("Error reading request_flow_analysis.md:", err.message);
}
