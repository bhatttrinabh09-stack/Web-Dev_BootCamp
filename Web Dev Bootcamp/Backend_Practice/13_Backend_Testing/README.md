# 13. Backend Testing

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Contrast Unit Testing (testing pure functions in isolation) with **Integration Testing** (testing full HTTP request/response pipelines).
- Test Express REST APIs using `supertest` and modern test runners (**Vitest**).
- Structure tests around realistic user scenarios rather than internal implementation details.
- Manage test lifecycle hooks: `beforeAll`, `afterAll`, `beforeEach`, and `afterEach` for clean data teardown.
- Understand test database isolation and avoid tests that break due to execution order dependencies.
- Explain what mocking is and when *not* to mock external dependencies.

## 2. What is this?
**Backend Automated Testing** executes your server code programmatically to ensure endpoints return correct status codes, headers, and payloads, while verifying that database mutations occur properly.

## 3. Why does it exist?
Manually clicking through Postman or browser tabs after every backend code edit is slow, incomplete, and misses edge cases. Automated tests run in seconds on every Git commit, immediately catching regression bugs before broken code reaches production.

## 4. How does it work?
Using `supertest`, tests bind directly to the Express `app` instance over ephemeral in-memory sockets without needing to start a manual server on port 3000:

```
[ Vitest Test Runner ]
       │
       ▼
[ supertest(app) ] ── Executes simulated HTTP request: POST /api/items
       │
       ▼
[ Express Router -> Middleware -> Controller ]
       │
       ▼
[ Assertion ] ── expect(res.status).toBe(201);
              ── expect(res.body.title).toBe('New Item');
```

## 5. Important concepts and syntax
- `supertest(app).get('/path')`
- Lifecycle hooks:
  - `beforeAll(async () => { await db.migrate(); })`
  - `afterAll(async () => { await db.close(); })`
  - `beforeEach(async () => { await db.reset(); })`
- Status code assertions: `.expect(200)`, `.expect(404)`.

## 6. Small worked example
An integration test verifying item creation:

```javascript
import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../server.js';
import { itemsDb } from '../data.js';

describe('POST /api/items', () => {
  beforeEach(() => {
    itemsDb.length = 0; // Reset in-memory database before each test
  });

  it('creates an item and returns 201 Created', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Gadget', price: 29.99 })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Gadget');
    expect(itemsDb).toHaveLength(1);
  });
});
```

## 7. Common mistakes
1. **Tests that depend on execution order:** Test B assuming Test A ran first and created item `#1`. Tests must be completely independent and self-contained.
2. **Forgetting to close database connections in `afterAll`:** Leaving the connection pool open causes the test runner process to hang indefinitely.
3. **Over-mocking the database in integration tests:** Mocking the database driver completely defeats the purpose of an API integration test. Test against a real local test database.

## 8. Coding challenge
**Environment:** Terminal (Vitest + Supertest).

Open `Backend_Practice/13_Backend_Testing/starter/`:
Write automated integration tests for a Customer Account API in `test/accounts.test.js`:
1. `GET /api/accounts`: Tests that all accounts are returned with 200 OK.
2. `GET /api/accounts/:id`:
   - Tests valid ID returns account data.
   - Tests non-existent ID returns 404 Not Found.
3. `POST /api/accounts`:
   - Tests valid payload returns 201 Created.
   - Tests missing required field returns 400 Bad Request.
4. Run `npm test` and verify that all test suites pass.

## 9. Acceptance criteria
- [ ] Tests use `supertest` to query Express app.
- [ ] Tests cover happy paths (200, 201) and error paths (400, 404).
- [ ] Uses `beforeEach` to reset test state.
- [ ] All Vitest assertions pass cleanly.

## 10. Test cases
- **List Accounts:** Expect array, status 200.
- **Get Detail:** Valid ID returns 200; invalid returns 404.
- **Validation Failure:** Empty email returns 400.

## 11. Hints
1. *Concept:* Export your Express `app` from `server.js` without calling `app.listen()` inside the module body, so `supertest` can manage port binding.
2. *Approach:* `const res = await request(app).post('/api/accounts').send({ ... });`.
3. *Specifics:* Assert status using `expect(res.status).toBe(201);`.

## 12. Bonus challenge
Add test coverage reporting: run `npx vitest run --coverage` and inspect the generated coverage report to ensure 100% statement and branch coverage on the account router.

## 13. Self-check
1. What is the difference between a unit test and an integration test on the backend?
2. Why is test isolation (resetting database state between tests) essential?
3. What happens if you forget to close database connections in `afterAll()`?
4. What are the benefits of using `supertest` over manual curl commands?

## 14. References
- [Vitest Official Guide](https://vitest.dev/guide/)
- [Supertest Documentation](https://github.com/ladjs/supertest)
