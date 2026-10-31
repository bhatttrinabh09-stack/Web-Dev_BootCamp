import http from 'node:http';
import { server } from './server.js';

const PORT = 3099;

function makeRequest(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({ port: PORT, path, ...options }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data ? JSON.parse(data) : null,
        });
      });
    });
    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("Starting server for integration testing...\n");
  await new Promise(resolve => server.listen(PORT, resolve));

  try {
    // Test 1: GET /api/status
    const res1 = await makeRequest('/api/status', { method: 'GET' });
    console.assert(res1.statusCode === 200, `Expected 200, got ${res1.statusCode}`);
    console.assert(res1.data.status === 'online', 'Status should be online');
    console.log("✔ Test 1: GET /api/status returned 200 OK.");

    // Test 2: GET /api/time
    const res2 = await makeRequest('/api/time', { method: 'GET' });
    console.assert(res2.statusCode === 200, `Expected 200, got ${res2.statusCode}`);
    console.assert(res2.data.iso, 'Response should contain ISO date string');
    console.log("✔ Test 2: GET /api/time returned ISO timestamp.");

    // Test 3: POST /api/echo
    const payload = { greeting: "Hello from test!" };
    const res3 = await makeRequest('/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, payload);
    console.assert(res3.statusCode === 200, `Expected 200, got ${res3.statusCode}`);
    console.assert(res3.data.received.greeting === payload.greeting, "Echo payload mismatch");
    console.log("✔ Test 3: POST /api/echo processed and echoed stream body.");

    // Test 4: 404 Route
    const res4 = await makeRequest('/unknown-route', { method: 'GET' });
    console.assert(res4.statusCode === 404, `Expected 404, got ${res4.statusCode}`);
    console.log("✔ Test 4: Unhandled route returned 404 Not Found.");

    console.log("\n🎉 All raw HTTP server tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  server.close();
  process.exit(1);
});
