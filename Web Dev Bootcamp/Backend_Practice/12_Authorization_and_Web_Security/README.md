# 12. Authorization and Web Security

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Distinguish Authentication ("Who you are") from **Authorization** ("What you are allowed to access").
- Implement Role-Based Access Control (RBAC) and **Resource Ownership checks** on the server.
- Prevent Broken Access Control vulnerabilities (Insecure Direct Object References - IDOR).
- Defend web applications against common attacks from the **OWASP Top 10** (XSS, CSRF, Injection, Misconfiguration).
- Configure security HTTP headers using `helmet` and implement Rate Limiting against brute-force attacks.
- Explain why CORS is a browser cross-origin policy, not an authorization or security gate.

## 2. What is this?
**Authorization (AuthZ)** is the system of permissions that restricts authenticated users from viewing or modifying resources they do not own. **Web Security** is the engineering discipline of eliminating architectural vulnerabilities so attackers cannot steal credentials, inject malicious scripts, or manipulate database records.

## 3. Why does it exist?
Even if authentication is 100% secure:
If user `A` visits `GET /api/documents/892` and changes the ID to `GET /api/documents/893` (belonging to user `B`), an API without resource ownership checks will happily return user `B`'s private document! This vulnerability (Broken Access Control) consistently ranks as the **#1 threat on the OWASP Top 10**.

## 4. How does it work?
### Resource Ownership Verification Pattern:
```javascript
app.delete('/api/projects/:id', authenticateUser, async (req, res, next) => {
  const project = await db.findProject(req.params.id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  // CRITICAL AUTHORIZATION CHECK:
  // Is the authenticated user the owner of this project, or an 'admin'?
  if (project.ownerId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: You do not own this project' });
  }

  await db.deleteProject(req.params.id);
  res.status(204).send();
});
```

### The OWASP Top 10 Security Checklist:
1. **Broken Access Control:** Always verify resource ownership on every mutation.
2. **Cryptographic Failures:** Use bcrypt/Argon2; enforce HTTPS.
3. **Injection (SQLi / Command):** Use parameterized queries.
4. **Insecure Design:** Threat modeling and defense in depth.
5. **Security Misconfiguration:** Disabling debug modes, removing default passwords.
6. **Vulnerable Dependencies:** Regular `npm audit`.
7. **Identification & Auth Failures:** Rate limiting, multi-factor auth.
8. **Software & Data Integrity:** Verifying package hashes and signatures.
9. **Security Logging Failures:** Audit logs for login failures and privilege escalations.
10. **Server-Side Request Forgery (SSRF):** Validating remote URLs fetched by server.

## 5. Important concepts and syntax
- `401 Unauthorized`: "You are not logged in. Please authenticate."
- `403 Forbidden`: "I know who you are, but you do not have permission to access this resource."
- Role Guard Middleware:
  ```javascript
  export const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
  ```

## 6. Small worked example
A reusable ownership checking middleware:

```javascript
export function verifyOwnership(req, res, next) {
  const resourceOwnerId = req.resource.userId;
  const currentUserId = req.user.id;

  if (resourceOwnerId !== currentUserId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access forbidden: Insufficient permissions' });
  }
  next();
}
```

## 7. Common mistakes
1. **Relying on frontend UI to enforce permissions:** Disabling a delete button in React without server-side checks. Attackers send HTTP requests directly.
2. **Returning 401 instead of 403:** Using 401 when a logged-in user tries to access an unauthorized resource. 401 prompts for login; 403 indicates forbidden permissions.
3. **Believing CORS prevents backend attacks:** CORS only tells browsers whether to share responses with frontend scripts. It does not stop cURL, Postman, or mobile apps from querying your API!

## 8. Coding challenge
**Environment:** Terminal (Node.js + Express).

Open `Backend_Practice/12_Authorization_and_Web_Security/starter/`:
Implement role and ownership authorization in `middleware/authorize.js` and `server.js`:
1. In `middleware/authorize.js`:
   - Implement `requireRole(allowedRole)`: Verifies `req.user.role === allowedRole`. Returns 403 Forbidden if mismatched.
   - Implement `requireOwnership`: Verifies that `req.params.id` matches a note owned by `req.user.id`. Returns 403 Forbidden if owned by another user.
2. In `server.js`:
   - Protect `GET /api/admin/metrics` with `requireRole('admin')`.
   - Protect `DELETE /api/notes/:id` with `requireOwnership`.
3. Run `npm test` to prove that a standard user cannot delete another user's note or access admin metrics.

## 9. Acceptance criteria
- [ ] Returns 403 Forbidden on authorization failure.
- [ ] Non-admin user blocked from `/api/admin/metrics`.
- [ ] User A cannot delete User B's notes.
- [ ] User A can delete their own note (returns 204).
- [ ] All automated security tests pass.

## 10. Test cases
- **Admin Access:** Admin accesses metrics -> 200 OK.
- **Member Access to Admin:** Member accesses metrics -> 403 Forbidden.
- **Cross-User Delete:** User 1 attempts deleting User 2's note -> 403 Forbidden.
- **Valid Delete:** User 1 deletes their own note -> 204 No Content.

## 11. Hints
1. *Concept:* Simulated user is injected onto `req.user` by the authentication middleware.
2. *Approach:* Check `if (note.userId !== req.user.id) return res.status(403)...`.
3. *Specifics:* Differentiate 404 (note doesn't exist) from 403 (note exists, but not yours).

## 12. Bonus challenge
Add Helmet (`import helmet from 'helmet'; app.use(helmet())`) and write a test asserting that security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`) are returned on all responses.

## 13. Self-check
1. What is the fundamental difference between HTTP 401 Unauthorized and HTTP 403 Forbidden?
2. What is an IDOR (Insecure Direct Object Reference) vulnerability?
3. Why does CORS provide zero security against backend server-to-server attacks?
4. Name three vulnerabilities from the OWASP Top 10 and how to mitigate them.

## 14. References
- [OWASP Top 10 (Official)](https://owasp.org/www-project-top-ten/)
- [OWASP: Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Helmet: Secure Express Headers](https://helmetjs.github.io/)
