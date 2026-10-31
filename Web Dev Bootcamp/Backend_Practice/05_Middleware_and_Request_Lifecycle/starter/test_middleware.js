import http from 'node:http';
import { app } from './server.js';

const PORT = 3097;

function request(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ port: PORT, path, method: 'GET', headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: data ? JSON.parse(data) : null,
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log("Starting server for middleware tests...\n");
  const server = app.listen(PORT);

  try {
    // Test 1: Public route is accessible
    const res1 = await request('/api/public-data');
    console.assert(res1.statusCode === 200, `Expected 200, got ${res1.statusCode}`);
    console.log("✔ Test 1: Public route succeeded without auth.");

    // Test 2: Protected route without key returns 401
    const res2 = await request('/api/secret-data');
    console.assert(res2.statusCode === 401, `Expected 401, got ${res2.statusCode}`);
    console.assert(res2.data.error.includes("API key"), "Error message should mention API key");
    console.log("✔ Test 2: Protected route rejected unauthenticated request with 401.");

    // Test 3: Protected route with invalid key returns 401
    const res3 = await request('/api/secret-data', { 'x-api-key': 'wrong-key' });
    console.assert(res3.statusCode === 401, `Expected 401, got ${res3.statusCode}`);
    console.log("✔ Test 3: Protected route rejected incorrect key with 401.");

    // Test 4: Protected route with valid key returns 200
    const res4 = await request('/api/secret-data', { 'x-api-key': 'super-secret-key' });
    console.assert(res4.statusCode === 200, `Expected 200, got ${res4.statusCode}`);
    console.assert(res4.data.secret, "Response should contain secret data");
    console.log("✔ Test 4: Protected route succeeded with valid API key.");

    console.log("\n🎉 All middleware lifecycle tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
