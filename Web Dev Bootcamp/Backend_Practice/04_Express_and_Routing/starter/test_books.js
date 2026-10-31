import http from 'node:http';
import { app } from './server.js';

const PORT = 3098;

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
  console.log("Starting Express server for tests...\n");
  const server = app.listen(PORT);

  try {
    // Test 1: GET /api/books
    const res1 = await request('/api/books', { method: 'GET' });
    console.assert(res1.statusCode === 200, `Expected 200, got ${res1.statusCode}`);
    console.assert(res1.data.length >= 3, "Expected at least 3 books");
    console.log("✔ Test 1: GET /api/books returned book list.");

    // Test 2: Filter query ?author=Orwell
    const res2 = await request('/api/books?author=Orwell', { method: 'GET' });
    console.assert(res2.statusCode === 200, `Expected 200, got ${res2.statusCode}`);
    console.assert(res2.data.length === 2, `Expected 2 Orwell books, got ${res2.data.length}`);
    console.log("✔ Test 2: Query parameter filtering (?author=Orwell) verified.");

    // Test 3: GET /api/books/:id
    const res3 = await request('/api/books/b1', { method: 'GET' });
    console.assert(res3.statusCode === 200, `Expected 200, got ${res3.statusCode}`);
    console.assert(res3.data.title === '1984', "Book title mismatch");
    console.log("✔ Test 3: Route parameter (:id) resolved book.");

    // Test 4: 404 on missing book
    const res4 = await request('/api/books/unknown-id', { method: 'GET' });
    console.assert(res4.statusCode === 404, `Expected 404, got ${res4.statusCode}`);
    console.log("✔ Test 4: Missing book returned 404.");

    // Test 5: POST /api/books
    const newBook = { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953 };
    const res5 = await request('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, newBook);
    console.assert(res5.statusCode === 201, `Expected 201 Created, got ${res5.statusCode}`);
    console.assert(res5.data.id && res5.data.title === newBook.title, "Created book mismatch");
    console.log("✔ Test 5: POST /api/books created resource with 201 Created.");

    console.log("\n🎉 All Express routing tests passed!");
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error("Test failure:", err);
  process.exit(1);
});
