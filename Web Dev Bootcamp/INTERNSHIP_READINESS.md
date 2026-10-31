# Internship Readiness Checklist & Technical Interview Prep

> **A rigorous, evidence-based benchmark for junior full-stack developer and internship positions.**
> This is not a guarantee of employment; it is an uncompromising standard of technical competence, portfolio proof, and engineering articulation.

---

## 1. Technical Competencies Checklist

You should be able to demonstrate every one of these competencies live on a whiteboard, in a shared editor, or in an interview discussion.

### A. Web Fundamentals & Browser Mechanics
- [ ] Explain the end-to-end lifecycle when a user types `https://example.com` into the URL bar: DNS lookup, TCP handshake, TLS negotiation, HTTP GET request, server processing, HTTP response, DOM construction, CSSOM calculation, render tree, layout, and paint.
- [ ] Explain the difference between HTTP/1.1 (pipelining, head-of-line blocking) and HTTP/2 (multiplexing, binary framing, header compression).
- [ ] Differentiate between client-side routing (SPA) and multi-page server-rendered architecture, including SEO and performance trade-offs.
- [ ] Articulate Cross-Origin Resource Sharing (CORS): origin definition (protocol, domain, port), why browsers enforce it, preflight `OPTIONS` requests, and why CORS is a browser security model rather than API authentication.

### B. Core JavaScript & TypeScript
- [ ] Explain JavaScript execution context, call stack, heap, microtask queue (Promises), macrotask queue (`setTimeout`, I/O), and the Event Loop.
- [ ] Differentiate `==` (type coercion rules) vs `===` (strict equality), primitive types vs reference types, and memory mutability.
- [ ] Explain closures and demonstrate practical applications (data privacy, currying, custom hook state).
- [ ] Describe Prototypal Inheritance vs ES6 `class` syntax.
- [ ] Model complex domain data with TypeScript `interfaces`, `types`, `generics`, union types, and type guards; demonstrate why `any` defeats type safety and when to use `unknown`.

### C. Frontend Architecture & React
- [ ] Explain React's declarative mental model, virtual DOM reconciliation (diffing algorithm), and why component state updates are scheduled rather than instantaneous.
- [ ] Master React Hook rules and lifecycles: `useState` (immutability), `useEffect` (side-effects, synchronization, dependency arrays, cleanup functions), `useRef` (DOM access, mutable values across renders), `useMemo` & `useCallback` (memoization trade-offs).
- [ ] Manage application state: local component state vs lifted state vs React Context vs dedicated server caches (e.g. TanStack Query).
- [ ] Form management: controlled inputs vs uncontrolled inputs, client-side schema validation, keyboard accessibility, ARIA landmarks, and focus management.

### D. Backend Services & REST APIs
- [ ] Explain Node.js runtime architecture: V8 engine, Libuv thread pool, non-blocking asynchronous I/O, and single-threaded event loop.
- [ ] Design idiomatic RESTful APIs adhering to HTTP verb semantics (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) with appropriate status codes (`200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `500`).
- [ ] Express middleware architecture: request/response lifecycle, logging, payload parsing, authentication guards, and centralized error handling middleware.
- [ ] Input validation and sanitization: schema validation (e.g. Zod / Joi) on request headers, params, query, and body before hitting business logic.

### E. Relational Databases & Persistence
- [ ] Database normalization (1NF, 2NF, 3NF), primary keys, foreign keys, cascade rules, unique constraints, and indexes.
- [ ] Write raw SQL queries featuring `INNER JOIN`, `LEFT JOIN`, `GROUP BY`, `HAVING`, aggregation functions (`COUNT`, `SUM`, `AVG`), and subqueries.
- [ ] Prevent SQL Injection vulnerabilities using parameterized queries (`$1, $2`) and explain why string concatenation is fatal.
- [ ] Database transactions: ACID properties (Atomicity, Consistency, Isolation, Durability) and implementing `BEGIN`, `COMMIT`, `ROLLBACK`.

### F. Web Security & Authentication
- [ ] Differentiate Authentication ("Who are you?") vs Authorization ("What are you allowed to do?").
- [ ] Secure password handling: salting and slow hashing algorithms (Argon2 / bcrypt) vs unsafe fast hashes (MD5, SHA256).
- [ ] Cookie-based session authentication vs Stateless Token (JWT) authentication: trade-offs regarding revocation, payload size, and server memory.
- [ ] Security configurations: `HttpOnly`, `Secure`, and `SameSite` (Strict/Lax) cookie attributes to mitigate XSS-based token theft and CSRF.
- [ ] Defend against the OWASP Top 10: XSS (input encoding/sanitization), CSRF (anti-CSRF tokens, SameSite), Broken Access Control (server-side ID checks), and Rate Limiting.

### G. DevOps, Testing & Tooling
- [ ] Git workflow: feature branches, atomic commits with conventional messages, resolving merge conflicts, and interactive rebasing basics.
- [ ] Automated testing hierarchy: Unit testing pure functions, Integration testing API endpoints with supertest/test DB, and UI component testing with React Testing Library.
- [ ] Production build processes: transpilation, bundling, minification, tree-shaking, environment variable separation (`.env`), and Dockerization basics.

---

## 2. Portfolio Evidence Requirements

To qualify as internship-ready, your GitHub profile must showcase at least three completed, well-documented projects, culminating in your full-stack capstone.

### Portfolio Project Standards:
1. **No Clone Apps without Custom Architecture:** Generic tutorial clones (e.g. basic Todo apps without auth/database) do not count. Projects must solve a distinct problem or exhibit robust engineering.
2. **Professional README for Every Project:**
   - Badges (build status, tech stack).
   - Problem statement & target user persona.
   - Live demo URL and testing credentials (e.g. demo user login).
   - Architecture diagram (flow of data between browser, API, and DB).
   - Database schema diagram (ERD).
   - Documented API endpoints (Request payload, response codes).
   - Step-by-step local setup instructions.
   - Architectural trade-offs and future improvements.
3. **Clean Code & Git History:**
   - Commit history showing iterative development over time, not a single massive "initial commit".
   - Zero hardcoded API keys, tokens, or database passwords in commits.
   - Clean linting (`eslint`), formatting (`prettier`), and passing test suites.

---

## 3. Technical Interview Question Bank & Practice

Practice answering these out loud using the STAR technique (Situation, Task, Action, Result) or technical concept explanation (Definition, Mechanism, Edge Cases, Code Example).

### JavaScript & DOM
1. *What is event delegation in JavaScript and why is it useful for dynamic lists?*
2. *Explain the difference between `null`, `undefined`, and `undeclared`.*
3. *What is a closure? Write an example where a closure creates a private counter.*
4. *What happens under the hood when you execute a Promise chain with `.then().catch()` vs `async/await` with `try/catch`?*

### HTML & CSS
1. *Why is semantic HTML important for accessibility (a11y) and screen readers? Provide examples where `<button>` must be used instead of `<div onClick>...`.*
2. *Explain the CSS Box Model. What does `box-sizing: border-box` do and why is it universally applied?*
3. *Explain the difference between CSS Flexbox and CSS Grid. When would you choose one over the other?*
4. *How does CSS specificity work? Calculate specificity for `nav.primary ul li a:hover`.*

### React
1. *Why can't you mutate React state directly (e.g. `items.push(newItem)`)? What mechanism triggers a re-render?*
2. *What is the purpose of the `key` prop in React lists? What bugs occur when you use array index as a key for items that can be reordered or deleted?*
3. *Explain the dependency array in `useEffect`. What causes an infinite loop, and how do cleanup functions prevent memory leaks?*
4. *When would you reach for the React Context API vs passing props vs using a dedicated client-side cache like TanStack Query?*

### Node.js & Backend
1. *How does Node.js handle thousands of concurrent requests if JavaScript is single-threaded?*
2. *What is Express middleware? Explain the arguments `(req, res, next)` and what happens if you forget to invoke `next()`.*
3. *How do you structure error handling in an Express application so that unhandled exceptions don't crash the Node process or leak stack traces to users?*
4. *What is the difference between `PUT` and `PATCH` in REST API conventions?*

### Databases & SQL
1. *What is the difference between an `INNER JOIN` and a `LEFT JOIN`? Give a concrete business example where using an `INNER JOIN` would accidentally hide valid records.*
2. *What is SQL Injection? Write a vulnerable query and rewrite it using parameterized placeholders.*
3. *What is a database index? What are the benefits and what is the cost of indexing every column in a table?*

### Live Coding Interview Prompts
1. **Array Transformation:** Given an array of order objects `{ id, userId, amount, status, date }`, write a pure function that calculates the total revenue from `'completed'` orders grouped by `userId`.
2. **Debounce Implementation:** Write a custom `debounce(fn, delay)` utility in plain JavaScript and explain how it prevents API flooding during search input typing.
3. **API Endpoint:** Implement an Express route `POST /api/items` with input validation, duplicate name check in PostgreSQL, parameterized insert, and correct status codes.
