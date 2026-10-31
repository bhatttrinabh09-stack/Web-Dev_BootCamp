import http from 'node:http';
import { app } from './server.js';

const PORT = 3096;

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
  console.log("Starting server for REST CRUD tests...\n");
  const server = app.listen(PORT);

  try {
    // 1. GET /api/issues with pagination
    const res1 = await request('/api/issues?page=1&limit=2');
    console.assert(res1.statusCode === 200, `Expected 200, got ${res1.statusCode}`);
    console.assert(res1.data.data.length === 2, `Expected 2 issues, got ${res1.data.data.length}`);
    console.assert(res1.data.pagination.total >= 4, "Expected total >= 4");
    console.log("✔ Test 1: GET /api/issues pagination verified.");

    // 2. Filter by status
    const res2 = await request('/api/issues?status=open');
    console.assert(res2.statusCode === 200, `Expected 200, got ${res2.statusCode}`);
    console.assert(res2.data.data.every(i => i.status === 'open'), "All items must have status 'open'");
    console.log("✔ Test 2: Filter by status (?status=open) verified.");

    // 3. POST /api/issues
    const newIssue = { title: "Auth token expiry bug", status: "open", priority: "high" };
    const res3 = await request('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, newIssue);
    console.assert(res3.statusCode === 201, `Expected 201, got ${res3.statusCode}`);
    const createdId = res3.data.id;
    console.assert(createdId, "Issue should have an ID");
    console.log("✔ Test 3: POST /api/issues created resource with 201 Created.");

    // 4. PATCH /api/issues/:id
    const res4 = await request(`/api/issues/${createdId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }, { status: "resolved" });
    console.assert(res4.statusCode === 200, `Expected 200, got ${res4.statusCode}`);
    console.assert(res4.data.status === "resolved", "Status should be updated to resolved");
    console.log("✔ Test 4: PATCH /api/issues/:id updated partial field.");

    // 5. DELETE /api/issues/:id
    const res5 = await request(`/api/issues/${createdId}`, { method: 'DELETE' });
    console.assert(res5.statusCode === 204, `Expected 204 No Content, got ${res5.statusCode}`);
    console.log("✔ Test 5: DELETE /api/issues/:id returned 204 No Content.");

    // 6. Verify deleted issue returns 404
    const res6 = await request(`/api/issues/${createdId}`);
    console.assert(res6.statusCode === 404, `Expected 404, got ${res6.statusCode}`);
    console.log("✔ Test 6: Deleted issue confirmed gone with 404.");

    console.log("\n🎉 All REST CRUD tests passed successfully!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
