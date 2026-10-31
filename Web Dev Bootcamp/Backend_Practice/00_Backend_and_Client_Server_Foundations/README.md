# 00. Backend and Client-Server Foundations

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain the division of responsibilities between client (frontend) and server (backend).
- Articulate why frontend-only applications cannot enforce security, confidentiality, or data integrity.
- Trace the complete client-server request/response lifecycle through application layers.
- Differentiate between **Authentication** (identity verification) and **Authorization** (access control).
- Diagram how the browser, web server, and database collaborate to serve dynamic user data.

## 2. What is this?
The **backend** is the server-side software, business logic, APIs, and databases that run away from the user's browser. While the frontend handles presentation and user interaction, the backend acts as the authoritative source of truth, enforcing business rules, securing credentials, and persisting data permanently.

## 3. Why does it exist?
Code running in the user's browser is completely under the user's control. A user can open browser DevTools, edit JavaScript variables, bypass form validation, inspect network requests, or modify local storage.
Without a backend:
- Anyone could overwrite other users' data.
- Passwords and private records would have to be stored publicly in client code.
- Calculations (e.g. charging credit cards or calculating discounts) could be manipulated maliciously.

## 4. How does it work?
The Three-Tier Architecture:

```
[ Tier 1: Client / Frontend ]
  Browser / React App
         │
         │  1. HTTP POST /api/login { email, password }
         ▼
[ Tier 2: Server / Backend ]
  Node.js / Express API
         │
         ├── 2. Validates input schema
         ├── 3. Queries Database: SELECT * FROM users WHERE email = $1;
         │
         ▼
[ Tier 3: Database ]
  PostgreSQL / Relational Store
         │
         ├── 4. Returns user record (hashed password)
         ▼
[ Tier 2: Server / Backend ]
         ├── 5. Verifies password hash (Argon2 / bcrypt)
         ├── 6. Generates session or signed auth token
         │
         │  7. HTTP 200 OK + Set-Cookie: session_id=...
         ▼
[ Tier 1: Client / Frontend ]
  Receives confirmation, redirects user to /dashboard
```

### Authentication vs Authorization:
- **Authentication (AuthN):** "Who are you?" (e.g. Logging in with username and password, 2FA).
- **Authorization (AuthZ):** "What are you permitted to do?" (e.g. Can this user delete project `#42`? Is this user an `'admin'`?).

## 5. Important concepts and syntax
- **Client (User Agent):** Requests resources (Web Browser, Mobile App, cURL CLI).
- **Server:** Listens on a designated network port (e.g. `3000`), receives requests, executes logic, and responds.
- **Statelessness:** Each HTTP request is self-contained. The server does not remember previous requests unless explicit session identifiers or tokens are passed.
- **Payload:** The data transmitted in the HTTP request or response body (typically JSON).

## 6. Small worked example
A conceptual flow of viewing private bank account balance:

```text
1. Client sends: GET /api/account/balance
   Headers: Cookie: session_id=abc123xyz
2. Backend receives request:
   - Reads session_id from cookie
   - Checks session store: "Session abc123xyz belongs to user_id 501"
   - AuthZ check: User 501 is requesting their own account -> PERMITTED
   - Queries DB: SELECT balance FROM accounts WHERE user_id = 501;
3. Backend responds:
   HTTP/1.1 200 OK
   Content-Type: application/json
   { "balance": 1420.50, "currency": "USD" }
```

## 7. Common mistakes
1. **Relying on frontend checks for security:** Hiding a "Delete Database" button in CSS using `display: none` for non-admin users. A malicious user can simply send the HTTP `DELETE /api/database` request directly!
2. **Confusing AuthN and AuthZ:** Treating login as authorization. Logging in proves who you are; it does not automatically give you permission to edit another customer's profile.
3. **Believing the server knows who is calling without credentials:** Expecting an API to automatically recognize a user across page reloads without cookies, headers, or tokens.

## 8. Coding challenge
**Environment:** Markdown & Node.js Verification Script.

Open `Backend_Practice/00_Backend_and_Client_Server_Foundations/starter/`:
1. Open `request_flow_analysis.md`.
2. Trace the step-by-step lifecycle of an e-commerce order checkout:
   - Detail the exact HTTP method, path, headers, and payload sent by client.
   - Detail the 4 server-side validation and authorization checks performed before taking payment.
   - Detail the database query operations (checking inventory stock, recording order, decreasing inventory).
   - Detail the response status code and JSON response body returned to client.
3. Run `node verify_flow.js` to evaluate the architectural analysis.

## 9. Acceptance criteria
- [ ] Explicitly differentiates authentication check from inventory authorization.
- [ ] Identifies potential security vulnerabilities if client validation were relied upon exclusively.
- [ ] Outlines database consistency check (preventing negative inventory).
- [ ] Verification script confirms all analytical sections are complete.

## 10. Test cases
- **Normal:** Valid order flow documents HTTP 201 Created response.
- **Edge:** Out-of-stock scenario documents 400 or 409 Conflict status.
- **Security:** Documents why price must be looked up in the database rather than trusted from the client payload.

## 11. Hints
1. *Concept:* Never trust the price sent from the client! A client could send `{ itemId: 1, price: 0.01 }`. The server must query the actual price from the database.
2. *Approach:* Think about database race conditions: what happens if two users buy the last item at the exact same millisecond?
3. *Specifics:* Review the status code list: resource creation should return `201 Created`.

## 12. Bonus challenge
Explain the concept of an Idempotency Key in payment APIs (e.g. Stripe) and how it prevents a customer from being double-charged if their internet drops right as they click "Pay".

## 13. Self-check
1. Why must password verification always occur on the backend server?
2. What is the fundamental difference between Authentication and Authorization?
3. If a mobile app and a web browser both use the same backend API, what changes on the server?
4. What is the three-tier architecture in web engineering?

## 14. References
- [MDN: Server-side website programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side)
- [OWASP: Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
