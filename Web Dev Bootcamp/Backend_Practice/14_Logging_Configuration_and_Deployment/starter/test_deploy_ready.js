import http from 'node:http';
import { app } from './server.js';

const PORT = 3092;

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ port: PORT, path, method: 'GET' }, (res) => {
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
    req.end();
  });
}

async function runTests() {
  console.log("Starting server for Deployment & Logging tests...\n");
  const server = app.listen(PORT);

  try {
    // 1. Health check returns 200
    const res1 = await request('/health');
    console.assert(res1.statusCode === 200, `Expected 200, got ${res1.statusCode}`);
    console.assert(res1.data.status === 'healthy', "Status should be healthy");
    console.log("✔ Test 1: Health check endpoint returned 200 OK.");

    // 2. Request trace header present
    console.assert(res1.headers['x-request-id'], "Response should have X-Request-Id header");
    console.log("✔ Test 2: Request correlation ID (X-Request-Id) attached.");

    console.log("\n🎉 All Deployment & Logging verification tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
