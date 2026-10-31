# 07. Input Validation and Error Handling

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain why client-side validation is completely insufficient for security.
- Distinguish between **Input Validation** (enforcing types, boundaries, patterns) and **Sanitization** (stripping malicious tags/characters).
- Validate incoming request headers, parameters, query strings, and JSON request bodies before hitting business logic.
- Implement centralized error-handling middleware with the 4-argument signature `(err, req, res, next)`.
- Distinguish Operational (Expected) Errors from Programmer (Unexpected) Bugs.
- Ensure production responses never leak sensitive internal stack traces or database connection strings.

## 2. What is this?
**Input Validation** is the defensive boundary ensuring that all data entering your API meets strict schemas (correct types, non-empty, within numeric ranges). **Centralized Error Handling** is an architectural pattern where all unhandled exceptions and business failures are routed to a single dedicated middleware function that formats consistent, secure JSON error responses.

## 3. Why does it exist?
Any attacker can bypass frontend HTML form validation with a single cURL command:
`curl -X POST https://api.site.com/orders -d '{"quantity": -50, "price": "free"}'`.
If the backend does not validate inputs:
- Corrupted or negative values destroy database integrity.
- SQL injections or buffer overflows can occur.
- Unhandled crashes leak full server file paths and passwords to attackers via default stack traces.

## 4. How does it work?
The Defensive Validation & Error Lifecycle:

```
Incoming Request
       │
       ▼
[ Validation Middleware ]
       ├── Schema Valid? ── Yes ────> next() ──> [ Route Controller ]
       │                                                │
       └── Invalid Data?  ── No ────> next(new AppError('Invalid email', 400))
                                                        │
                                                        ▼
[ Centralized Error Handler: (err, req, res, next) ] <──┘ (Captures all errors!)
       │
       ├── Log error internally (with stack trace)
       │
       └── Send Safe Client Response:
           res.status(err.statusCode || 500).json({
             error: err.isOperational ? err.message : 'Internal Server Error'
           })
```

### Operational vs Programmer Errors:
- **Operational Errors:** Expected failures that occur during normal application life (e.g. invalid password, 404 not found, duplicate email). Return clean 4xx client errors.
- **Programmer Errors:** Unexpected bugs (e.g. `TypeError: Cannot read property of undefined`, database connection drops). Log deeply, return generic 500 to user, never leak stack traces!

## 5. Important concepts and syntax
- Error Middleware Signature: MUST have **4 arguments**: `(err, req, res, next)`. If you omit `next`, Express will treat it as standard middleware!
- Custom Error Class:
  ```javascript
  export class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
    }
  }
  ```
- Catching Async Errors: Express 4 does not automatically catch rejected Promises in async handlers. You must wrap async routes in `try/catch` or an `asyncHandler` wrapper:
  ```javascript
  const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  ```

## 6. Small worked example
A centralized error-handling middleware:

```javascript
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  console.error(`[ERROR] ${err.message}`, err.stack);

  res.status(statusCode).json({
    status: 'error',
    message: err.isOperational || !isProd ? err.message : 'Something went wrong on our end',
    // NEVER leak stack trace in production!
    ...(isProd ? {} : { stack: err.stack }),
  });
}
```

## 7. Common mistakes
1. **Writing error middleware with 3 arguments:** `(err, req, res)` will NOT be recognized by Express as an error handler. It must have 4 parameters: `(err, req, res, next)`.
2. **Leaking stack traces in production responses:** Sending `res.status(500).json({ stack: err.stack })` gives hackers your exact server directory structure, database library names, and code lines.
3. **Crashing the Node process on unhandled promise rejections:** Not routing async errors to `next(err)`.

## 8. Coding challenge
**Environment:** Terminal (Node.js + Express).

Open `Backend_Practice/07_Input_Validation_and_Error_Handling/starter/`:
Enhance the User Registration API in `server.js`:
1. In `middleware/validateRegistration.js`:
   - Validate `req.body.email`: Must be a valid email format (contains `@` and `.`).
   - Validate `req.body.password`: Must be a string with at least 8 characters.
   - Validate `req.body.age`: Must be an integer between `18` and `120`.
   - If any validation fails, invoke `next(new AppError(validationErrorMessage, 400))`.
2. In `middleware/errorHandler.js`:
   - Implement the 4-argument error handler.
   - Format consistent responses: `{ status: "error", message: err.message }`.
   - Ensure unexpected 500 errors in production do not reveal stack traces.
3. In `server.js`:
   - Register route `POST /api/register` with validation middleware.
   - Add a route `GET /api/crash-test` that throws an unexpected error to verify 500 handling.
   - Mount `errorHandler` at the very end of the middleware chain.
4. Run `npm test` to verify validation rejections and safe error handling.

## 9. Acceptance criteria
- [ ] Centralized error handler uses 4 arguments: `(err, req, res, next)`.
- [ ] Validates email format, password length, and age ranges.
- [ ] Invalid inputs return HTTP 400 Bad Request with descriptive message.
- [ ] Unexpected exceptions return HTTP 500 without leaking stack traces.
- [ ] All automated tests pass cleanly.

## 10. Test cases
- **Valid:** Valid credentials return 201 Created.
- **Invalid Email:** Email `"bademail"` returns 400 Bad Request.
- **Underage:** Age `15` returns 400 Bad Request ("Must be at least 18 years old").
- **Server Crash:** `/api/crash-test` returns 500 without crashing Node server.

## 11. Hints
1. *Concept:* Subclass `Error` to create `AppError` with a custom `statusCode` property.
2. *Approach:* In validation middleware, perform checks sequentially and call `return next(new AppError(...))` on the first failure.
3. *Specifics:* Make sure `app.use(errorHandler)` is placed *after* all routes in `server.js`.

## 12. Bonus challenge
Integrate the popular schema validation library **Zod**: define a `RegistrationSchema` with Zod and build a generic `validate(schema)` middleware factory.

## 13. Self-check
1. Why must input validation always be repeated on the server even if client-side validation is already active?
2. What are the four arguments required for an Express centralized error-handling middleware?
3. Why should internal server stack traces never be sent in HTTP responses to public clients?
4. What is the difference between an operational error and a programmer error?

## 14. References
- [Express: Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Joyent: Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)
