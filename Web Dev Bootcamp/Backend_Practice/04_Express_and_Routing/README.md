# 04. Express and Routing

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain why web application frameworks like Express exist and what abstractions they provide over `node:http`.
- Configure an Express application, register route handlers, and bind listening ports.
- Extract dynamic route parameters using `req.params` (e.g. `/api/books/:id`).
- Extract URL query parameters using `req.query` (e.g. `/api/books?category=fiction`).
- Parse incoming JSON payloads using built-in `express.json()` middleware.
- Structure route modules modularly using `express.Router()`.

## 2. What is this?
**Express** is the most widely adopted minimal web framework for Node.js. It simplifies HTTP server development by providing intuitive routing, query string parsing, parameter extraction, and middleware pipelines on top of Node's built-in networking APIs.

## 3. Why does it exist?
In raw `node:http`, building a web API requires manual `if/else` ladders for every route, manual string slicing to extract URL parameters, manual stream buffering for JSON request bodies, and manual header setting. Express reduces 40 lines of boilerplate to 5 lines of declarative code.

## 4. How does it work?
Express maps incoming HTTP requests to callback functions using HTTP methods and route path patterns:

```
Incoming Request: GET /api/books/42?sort=asc
      │
      ▼
[ express.json() ] ── (Parses body if present)
      │
      ▼
Matches Route Pattern: app.get('/api/books/:id', handler)
      │
      ├── req.params.id = '42'
      ├── req.query.sort = 'asc'
      │
      ▼
Handler sends response:
res.status(200).json({ id: req.params.id, title: 'Clean Architecture' });
```

### Modular Router Separation:
Instead of putting 50 routes in one giant `server.js`, split routes by resource using `express.Router()`:
```javascript
// routes/users.js
import { Router } from 'express';
export const userRouter = Router();
userRouter.get('/', (req, res) => { ... });

// server.js
app.use('/api/users', userRouter);
```

## 5. Important concepts and syntax
- `app.use(express.json())`: Enables JSON body parsing on all incoming requests.
- `app.get(path, handler)`, `app.post()`, `app.put()`, `app.delete()`.
- Route Params: `/items/:id` -> `req.params.id`.
- Query Params: `/items?category=tech` -> `req.query.category`.
- Response methods:
  - `res.status(code).json(object)`: Sets status and sends JSON.
  - `res.sendStatus(code)`: Sends status with default status text.

## 6. Small worked example
A simple user API router:

```javascript
import express from 'express';

const app = express();
app.use(express.json());

const users = [{ id: '1', name: 'Alex' }];

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});
```

## 7. Common mistakes
1. **Forgetting `app.use(express.json())`:** If you omit this, `req.body` will be `undefined` on `POST` and `PUT` requests!
2. **Missing `return` when sending error responses:**
   ```javascript
   if (!item) {
     res.status(404).json({ error: 'Not found' }); // Forgetting 'return' allows execution to continue below!
   }
   res.status(200).json(item); // Throws ERR_HTTP_HEADERS_SENT!
   ```
3. **Placing dynamic `:id` routes before static routes:** If you define `GET /items/:id` before `GET /items/search`, requesting `/items/search` will match `:id` with `req.params.id === 'search'`.

## 8. Coding challenge
**Environment:** Terminal (Node.js + Express).

Open `Backend_Practice/04_Express_and_Routing/starter/`:
Build an in-memory Book Collection API in `routes/books.js` and `server.js`:
1. `GET /api/books`:
   - Returns array of all books.
   - Supports optional query parameter filtering: `?author=...` filters books matching that author (case-insensitive).
2. `GET /api/books/:id`:
   - Returns the book matching the ID with HTTP 200.
   - If not found, returns HTTP 404 with `{ error: "Book not found" }`.
3. `POST /api/books`:
   - Reads `{ title, author, year }` from `req.body`.
   - Validates that `title` and `author` exist. If missing, returns HTTP 400 with `{ error: "Title and author are required" }`.
   - Creates new book with auto-generated `id`, appends to collection, and returns HTTP 201 with newly created book object.
4. Run `npm test` to verify all routes and parameter handling.

## 9. Acceptance criteria
- [ ] Route separation: book routes are isolated in `routes/books.js` using `express.Router()`.
- [ ] Correctly uses `req.params`, `req.query`, and `req.body`.
- [ ] Returns correct status codes (`200`, `201`, `400`, `404`).
- [ ] All automated tests pass cleanly.

## 10. Test cases
- **List All:** `GET /api/books` returns array of books.
- **Filter Query:** `GET /api/books?author=orwell` returns filtered list.
- **Detail Route:** `GET /api/books/b1` returns specific book; unknown ID returns 404.
- **Create Route:** `POST /api/books` creates book and returns 201 Created.

## 11. Hints
1. *Concept:* Remember that `req.params` and `req.query` values are always strings.
2. *Approach:* For case-insensitive author filtering: `b.author.toLowerCase().includes(queryAuthor.toLowerCase())`.
3. *Specifics:* Mount the router in `server.js` using `app.use('/api/books', bookRouter)`.

## 12. Bonus challenge
Add a route `DELETE /api/books/:id` that removes a book from the in-memory array and returns HTTP 204 No Content.

## 13. Self-check
1. What does `app.use(express.json())` do under the hood?
2. What is the difference between `req.params` and `req.query`?
3. Why must you include `return` when sending early error responses (e.g. `return res.status(404)...`)?
4. How does `express.Router()` improve codebase architecture compared to putting all routes on `app`?

## 14. References
- [Express: Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Express: Request API](https://expressjs.com/en/4x/api.html#req)
- [Express: Response API](https://expressjs.com/en/4x/api.html#res)
