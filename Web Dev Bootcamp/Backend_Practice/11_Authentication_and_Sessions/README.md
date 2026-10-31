# 11. Authentication and Sessions

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain the user authentication lifecycle: registration, password hashing, credential verification, and logout.
- Hash and salt passwords securely using recognized cryptographic libraries (`bcrypt` or `argon2`) and explain why plain hashes (MD5, SHA-256) are insecure.
- Compare Stateful Cookie/Session Authentication with Stateless Token-Based Authentication (JWT).
- Configure secure session cookie attributes (`HttpOnly`, `Secure`, `SameSite=Strict/Lax`) to defend against XSS token theft and CSRF.
- Decode and sign JSON Web Tokens (JWT) and evaluate their security trade-offs (e.g. token revocation challenges).

## 2. What is this?
**Authentication (AuthN)** is the process of verifying that users are who they claim to be. When a user registers or logs in, the backend must verify their credentials without ever storing or handling plaintext passwords in memory or database records.

## 3. Why does it exist?
If a database stores passwords in plaintext, a single database breach or SQL injection immediately exposes every user's personal password across all accounts. Fast hashing algorithms (like SHA-256) can be cracked in seconds using hardware rainbow tables. Slow, salted algorithms (bcrypt/Argon2) make brute-force cracking mathematically infeasible.

## 4. How does it work?
### Secure Password Hashing Lifecycle:
```
User inputs: "mySuperSecretPassword"
       │
       ▼
[ bcrypt.hash(password, 12) ]
       ├── Generates random cryptographic Salt
       ├── Performs 2^12 computational work rounds
       │
       ▼
Stores in DB: "$2b$12$e8Y...f9xK2" (Hashed & Salted String)
```

On Login:
```
User inputs password ──> bcrypt.compare(password, storedHash) ──> true / false
```

### Cookie vs Token Architecture:
- **Session Cookie (Stateful):** Server stores session in database/Redis; client receives a random cookie identifier. Server can revoke the session immediately by deleting the session row.
- **JWT (Stateless):** Client receives a cryptographically signed token containing `{ userId: "123", role: "admin" }`. Server verifies signature without querying the database, but token cannot be revoked easily before expiration.

## 5. Important concepts and syntax
- `bcrypt.hash(password, saltRounds)`: Asynchronously hash password.
- `bcrypt.compare(candidatePassword, storedHash)`: Safely compare password.
- Secure Cookie Flags:
  - `httpOnly: true`: Prevents client-side JavaScript (`document.cookie`) from reading the cookie, defeating XSS token theft!
  - `secure: true`: Transmits cookie over HTTPS only.
  - `sameSite: 'strict' | 'lax'`: Defends against Cross-Site Request Forgery (CSRF).

## 6. Small worked example
Safe password hashing and verification with bcrypt:

```javascript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

// Registration: Hash password
export async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

// Login: Verify password
export async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
```

## 7. Common mistakes
1. **Storing plaintext passwords:** A fatal engineering violation. Never store or log plaintext passwords under any circumstances.
2. **Storing JWT auth tokens in `localStorage`:** If your site has a minor XSS vulnerability, an injected script can read `localStorage.getItem('token')` and steal user sessions. Store auth tokens in `HttpOnly` cookies.
3. **Using fast hashes like SHA-256 or MD5:** SHA-256 is designed to be fast for file verification; passwords require intentionally *slow* key derivation functions (bcrypt/argon2).

## 8. Coding challenge
**Environment:** Terminal (Node.js + Express).

Open `Backend_Practice/11_Authentication_and_Sessions/starter/`:
Build a safe local authentication workflow in `auth.js` and `server.js`:
1. In `auth.js`:
   - Implement `registerUser(email, password)`: Hashes password with `bcrypt` (10 rounds) and stores user record `{ id, email, passwordHash }`. Rejects duplicate emails.
   - Implement `loginUser(email, password)`: Verifies password using `bcrypt.compare`. Returns safe user object (excluding `passwordHash`) or throws authentication error.
2. In `server.js`:
   - `POST /api/auth/register`: Calls `registerUser`, returns HTTP 201 with `{ id, email }`.
   - `POST /api/auth/login`: Calls `loginUser`, sets an `HttpOnly`, `SameSite=Lax` cookie named `session_user`, and returns HTTP 200.
   - `POST /api/auth/logout`: Clears the session cookie (`res.clearCookie`) and returns HTTP 200.
3. Run `npm test` to verify password hashing, login verification, and cookie clearing.

## 9. Acceptance criteria
- [ ] Passwords hashed using `bcrypt` (never plaintext).
- [ ] `passwordHash` is NEVER returned in response payloads.
- [ ] Login sets `HttpOnly` cookie.
- [ ] Logout clears cookie cleanly.
- [ ] Automated tests pass.

## 10. Test cases
- **Register:** New user registered; inspecting stored record shows bcrypt hash.
- **Valid Login:** Correct password succeeds and sets session cookie.
- **Invalid Login:** Wrong password rejected with 401 Unauthorized.
- **Logout:** Cookie cleared.

## 11. Hints
1. *Concept:* Set cookies using `res.cookie('session_user', userId, { httpOnly: true, sameSite: 'lax' })`.
2. *Approach:* Clear cookies using `res.clearCookie('session_user')`.
3. *Specifics:* Never reveal whether an email exists on failed login: return generic "Invalid email or password".

## 12. Bonus challenge
Sign and verify a signed JSON Web Token using `jsonwebtoken`: embed the user ID and an expiration timestamp (`expiresIn: '1h'`), and verify the signature in an `authenticateToken` middleware.

## 13. Self-check
1. Why is SHA-256 considered unsafe for password storage while bcrypt is recommended?
2. What does the `HttpOnly` cookie flag do and why is it critical for authentication security?
3. What is the difference between a stateful session and a stateless JWT token?
4. What information is stored in the three parts of a JSON Web Token?

## 14. References
- [OWASP: Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Node bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
