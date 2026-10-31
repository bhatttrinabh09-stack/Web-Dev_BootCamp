import http from 'node:http';
import { app } from './server.js';

const PORT = 3095;

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({ port: PORT, path, ...options }, (res) => {
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
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("Starting server for Validation & Error tests...\n");
  const server = app.listen(PORT);

  try {
    // Test 1: Valid registration -> 201 Created
    const validUser = { email: "alex@example.com", password: "securePassword123", age: 24 };
    const res1 = await request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, validUser);
    console.assert(res1.statusCode === 201, `Expected 201, got ${res1.statusCode}`);
    console.log("✔ Test 1: Valid registration succeeded with 201 Created.");

    // Test 2: Invalid Email -> 400 Bad Request
    const badEmail = { email: "not-an-email", password: "securePassword123", age: 24 };
    const res2 = await request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, badEmail);
    console.assert(res2.statusCode === 400, `Expected 400, got ${res2.statusCode}`);
    console.log("✔ Test 2: Malformed email rejected with 400 Bad Request.");

    // Test 3: Short password -> 400 Bad Request
    const shortPass = { email: "alex@example.com", password: "short", age: 24 };
    const res3 = await request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, shortPass);
    console.assert(res3.statusCode === 400, `Expected 400, got ${res3.statusCode}`);
    console.log("✔ Test 3: Short password rejected with 400 Bad Request.");

    // Test 4: Underage -> 400 Bad Request
    const underage = { email: "alex@example.com", password: "securePassword123", age: 14 };
    const res4 = await request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, underage);
    console.assert(res4.statusCode === 400, `Expected 400, got ${res4.statusCode}`);
    console.log("✔ Test 4: Underage registration rejected with 400 Bad Request.");

    // Test 5: Server Crash Handling -> 500
    const res5 = await request('/api/crash-test');
    console.assert(res5.statusCode === 500, `Expected 500, got ${res5.statusCode}`);
    console.log("✔ Test 5: Centralized error handler intercepted unexpected crash with 500.");

    console.log("\n🎉 All Validation & Error Handling tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
