# 05. Middleware and the Request Lifecycle

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain what Express middleware is and trace its execution order in the request/response lifecycle.
- Write custom request-logging middleware calculating request duration and method/path details.
- Master the `next()` function and explain the fatal consequences of omitting `next()` or failing to end the response.
- Build authentication guard middleware that validates request authorization headers.
- Understand how middleware ordering governs application security and flow control.

## 2. What is this?
**Middleware** is a function with access to the Request object (`req`), the Response object (`res`), and the `next` middleware function in the application’s request-response cycle. Think of middleware as an assembly line or pipeline: every request passes through a sequence of functions before reaching the final route handler.

## 3. Why does it exist?
Without middleware, every single route handler would have to duplicate the same repetitive code: parsing JSON bodies, checking if the user is authenticated, logging access logs, setting CORS headers, and catching crashes. Middleware centralizes cross-cutting concerns into reusable pipeline stages.

## 4. How does it work?
The Middleware Pipeline:

```
Incoming Request: GET /api/admin/dashboard
       │
       ▼
[ 1. Logger Middleware ] ──────────> Logs "GET /api/admin/dashboard" -> calls next()
       │
       ▼
[ 2. JSON Parser Middleware ] ─────> Parses req.body -> calls next()
       │
       ▼
[ 3. Auth Guard Middleware ]
       ├── Valid Token? ── Yes ────> calls next()
       └── No Token?    ── No  ────> res.status(401).json({ error: 'Unauthorized' })
                                     (Pipeline halts immediately! Route handler is never called!)
       │
       ▼
[ 4. Route Handler ] ──────────────> res.status(200).json({ data: 'Admin Data' })
```

### The Critical Role of `next()`:
If a middleware function does not send a response (`res.json()`) and does not invoke `next()`, **the request hangs indefinitely** and the browser will eventually time out!

## 5. Important concepts and syntax
- Middleware Signature: `(req, res, next) => { ... }`
- Calling `next()`: Passes execution to the next middleware in line.
- Passing errors: `next(new Error("Something broke"))`: Skips all remaining route middleware and jumps directly to error handling middleware.
- Mounting middleware:
  - Globally: `app.use(myMiddleware);`
  - Per Route: `app.get('/protected', authGuard, handler);`

## 6. Small worked example
A request duration logging middleware:

```javascript
export function requestTimer(req, res, next) {
  const start = Date.now();

  // Attach listener to response 'finish' event
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next(); // Pass control to the next handler!
}
```

## 7. Common mistakes
1. **Forgetting to call `next()`:** Causing the request to freeze without an error or response.
2. **Calling `next()` after sending a response:** Calling `res.json(...)` followed by `next()` causes downstream middleware to execute and attempt to write to an already-closed response.
3. **Incorrect middleware registration order:** Registering `express.json()` *after* a route handler. Handlers registered before body parsing will receive an empty or undefined `req.body`.

## 8. Coding challenge
**Environment:** Terminal (Node.js + Express).

Open `Backend_Practice/05_Middleware_and_Request_Lifecycle/starter/`:
Build two reusable custom middleware functions in `server.js`:
1. `requestLogger`:
   - Records HTTP method, path, and attaches a custom header `X-Response-Time` indicating processing duration.
   - Logs `[METHOD] PATH` to console.
   - Invokes `next()`.
2. `apiKeyAuthGuard`:
   - Inspects `req.headers['x-api-key']`.
   - If key matches `'super-secret-key'`, allows request to proceed via `next()`.
   - If key is missing or invalid, immediately halts pipeline with HTTP 401 Unauthorized: `{ error: "Invalid or missing API key" }`.
3. Protect the route `GET /api/secret-data` with `apiKeyAuthGuard`.
4. Keep the route `GET /api/public-data` open without authentication.
5. Run `node test_middleware.js` to execute integration tests.

## 9. Acceptance criteria
- [ ] Middleware follows `(req, res, next)` signature.
- [ ] Unauthenticated requests to protected route return 401 without executing route handler.
- [ ] Authenticated requests return 200 with data.
- [ ] Public routes remain accessible without headers.
- [ ] Automated tests pass cleanly.

## 10. Test cases
- **Public Route:** `GET /api/public-data` returns 200.
- **Protected Without Key:** `GET /api/secret-data` returns 401 Unauthorized.
- **Protected With Key:** `GET /api/secret-data` with header `x-api-key: super-secret-key` returns 200.

## 11. Hints
1. *Concept:* Remember headers in Node/Express are lowercased: `req.headers['x-api-key']`.
2. *Approach:* Place `app.use(requestLogger)` at the very top of `server.js` before all routes.
3. *Specifics:* Pass `apiKeyAuthGuard` as the second argument to `app.get('/api/secret-data', apiKeyAuthGuard, handler)`.

## 12. Bonus challenge
Build a Rate Limiter middleware in memory: allow a maximum of 5 requests per IP address (`req.ip`) per 10-second window. Return HTTP 429 Too Many Requests if the limit is exceeded.

## 13. Self-check
1. What happens if a middleware function neither calls `next()` nor sends a response?
2. Why is the order in which you call `app.use()` critical in Express?
3. What is the difference between global middleware and route-level middleware?
4. How does `next(err)` differ from `next()`?

## 14. References
- [Express: Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [Express: Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
