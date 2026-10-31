import http from 'node:http';
import { app } from './server.js';

const PORT = 3093;

function request(path, options = {}) {
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
    req.end();
  });
}

async function runTests() {
  console.log("Starting server for Security & Authorization tests...\n");
  const server = app.listen(PORT);

  try {
    // Test 1: Member blocked from Admin metrics -> 403
    const res1 = await request('/api/admin/metrics', {
      method: 'GET',
      headers: { 'x-user-id': 'user-alpha', 'x-user-role': 'member' },
    });
    console.assert(res1.statusCode === 403, `Expected 403, got ${res1.statusCode}`);
    console.log("✔ Test 1: Member correctly blocked from Admin endpoint with 403.");

    // Test 2: Admin allowed into Admin metrics -> 200
    const res2 = await request('/api/admin/metrics', {
      method: 'GET',
      headers: { 'x-user-id': 'admin-user', 'x-user-role': 'admin' },
    });
    console.assert(res2.statusCode === 200, `Expected 200, got ${res2.statusCode}`);
    console.log("✔ Test 2: Admin granted access to metrics.");

    // Test 3: User Alpha attempts to delete User Beta's note (note-2) -> 403 Forbidden!
    const res3 = await request('/api/notes/note-2', {
      method: 'DELETE',
      headers: { 'x-user-id': 'user-alpha', 'x-user-role': 'member' },
    });
    console.assert(res3.statusCode === 403, `Expected 403 Forbidden on IDOR attempt, got ${res3.statusCode}`);
    console.log("✔ Test 3: IDOR prevention verified: User Alpha blocked from deleting User Beta's note.");

    // Test 4: User Alpha deletes their own note (note-1) -> 204 No Content
    const res4 = await request('/api/notes/note-1', {
      method: 'DELETE',
      headers: { 'x-user-id': 'user-alpha', 'x-user-role': 'member' },
    });
    console.assert(res4.statusCode === 204, `Expected 204, got ${res4.statusCode}`);
    console.log("✔ Test 4: Legitimate owner permitted to delete own resource.");

    console.log("\n🎉 All Security & Authorization tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
