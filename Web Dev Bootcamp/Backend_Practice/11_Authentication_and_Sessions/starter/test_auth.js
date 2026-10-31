import http from 'node:http';
import { app } from './server.js';
import { usersDb } from './auth.js';

const PORT = 3094;

function request(path, options = {}, body = null) {
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
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("Starting server for Auth tests...\n");
  const server = app.listen(PORT);

  try {
    // 1. Register new user
    const res1 = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { email: "priya@example.com", password: "Password123!" });
    console.assert(res1.statusCode === 201, `Expected 201, got ${res1.statusCode}`);
    console.assert(res1.data.id && !res1.data.passwordHash, "passwordHash must never be returned");
    console.log("✔ Test 1: User registered and passwordHash was hidden.");

    // Verify stored DB has bcrypt hash
    const stored = usersDb.find(u => u.email === "priya@example.com");
    console.assert(stored.passwordHash.startsWith("$2b$"), "Password should be bcrypt hash starting with $2b$");
    console.log("✔ Test 2: Database stores salted bcrypt hash.");

    // 2. Login with valid password
    const res2 = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { email: "priya@example.com", password: "Password123!" });
    console.assert(res2.statusCode === 200, `Expected 200, got ${res2.statusCode}`);
    const setCookie = res2.headers['set-cookie']?.[0];
    console.assert(setCookie && setCookie.includes("HttpOnly"), "Session cookie must have HttpOnly attribute");
    console.log("✔ Test 3: Login succeeded and set HttpOnly session cookie.");

    // 3. Login with invalid password
    const res3 = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { email: "priya@example.com", password: "WrongPassword" });
    console.assert(res3.statusCode === 401, `Expected 401, got ${res3.statusCode}`);
    console.log("✔ Test 4: Rejected invalid password with 401.");

    console.log("\n🎉 All Authentication & Session tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
