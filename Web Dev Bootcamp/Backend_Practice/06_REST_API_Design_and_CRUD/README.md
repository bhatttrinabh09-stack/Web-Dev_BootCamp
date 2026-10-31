# 06. REST API Design and CRUD Operations

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Design resource-oriented, idiomatic RESTful APIs adhering to standard HTTP verb conventions.
- Implement the full CRUD (Create, Read, Update, Delete) lifecycle for domain resources.
- Map operations cleanly to HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and status codes (`200`, `201`, `204`, `400`, `404`).
- Support querying capabilities: pagination (`?page=1&limit=10`), sorting (`?sort=price`), and filtering (`?status=active`).
- Structure predictable JSON response envelopes and author standard API endpoint documentation tables.

## 2. What is this?
**REST (Representational State Transfer)** is an architectural pattern for designing networked APIs. In REST, everything is a **Resource** (e.g. users, products, tickets) identified by standard plural URLs (nouns, not verbs), manipulated using standard HTTP methods.

## 3. Why does it exist?
Without REST conventions, every developer invents arbitrary URL names:
- Developer A: `POST /getUser?id=5`
- Developer B: `GET /fetchUserById/5`
- Developer C: `POST /delete_user_now`
This lack of structure makes APIs unpredictable, uncacheable, and difficult to maintain. REST provides a universally understood blueprint.

## 4. How does it work?
The RESTful CRUD Blueprint:

| Operation | HTTP Method | Endpoint URI | Request Body | Success Status | Description |
|---|:---:|---|:---:|:---:|---|
| **Create** | `POST` | `/api/projects` | JSON Resource | `201 Created` | Creates a new project |
| **Read (List)** | `GET` | `/api/projects` | None | `200 OK` | Retrieves list with pagination |
| **Read (Item)** | `GET` | `/api/projects/:id` | None | `200 OK` | Retrieves single project |
| **Update (Full)** | `PUT` | `/api/projects/:id` | Full Resource | `200 OK` | Replaces entire project |
| **Update (Partial)** | `PATCH`| `/api/projects/:id` | Partial Fields | `200 OK` | Updates specific fields |
| **Delete** | `DELETE`| `/api/projects/:id` | None | `204 No Content`| Removes project |

### Consistent Response Envelopes:
```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

## 5. Important concepts and syntax
- Nouns over Verbs: Use `/api/orders`, NEVER `/api/getOrders` or `/api/createOrder`.
- `PUT` vs `PATCH`:
  - `PUT`: Replaces the entire resource. Missing fields are reset or overwritten.
  - `PATCH`: Modifies only the specific fields provided in the body.
- `204 No Content`: Successful deletion that sends no response body (use `res.status(204).send()`).

## 6. Small worked example
A partial update (`PATCH`) route:

```javascript
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Apply partial updates
  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  task.updatedAt = new Date().toISOString();

  res.status(200).json(task);
});
```

## 7. Common mistakes
1. **Using verbs in URLs:** Writing `/api/createTicket` instead of `POST /api/tickets`.
2. **Returning 200 OK when returning empty or deleting:** Sending a body with `204 No Content` (browsers will ignore the body) or returning 200 with an empty object instead of 204.
3. **Inconsistent pluralization:** Mixing `/api/user` (singular) and `/api/products` (plural). Always use plural nouns for collections.

## 8. Coding challenge
**Environment:** Terminal (Node.js + Express).

Open `Backend_Practice/06_REST_API_Design_and_CRUD/starter/`:
Build a complete CRUD API for an Issue Tracking system in `routes/issues.js`:
1. `GET /api/issues`:
   - Supports pagination: `?page=1&limit=5`.
   - Supports filtering by status: `?status=open | in_progress | resolved`.
   - Returns paginated envelope: `{ data: [...], pagination: { page, limit, total } }`.
2. `GET /api/issues/:id`: Returns single issue or 404.
3. `POST /api/issues`: Creates issue with `{ title, description, priority }`. Returns 201 Created.
4. `PATCH /api/issues/:id`: Updates fields provided in `req.body`. Returns 200 OK.
5. `DELETE /api/issues/:id`: Removes issue and returns 204 No Content.
6. Run `npm test` to execute comprehensive CRUD verification.

## 9. Acceptance criteria
- [ ] Strict adherence to REST URI and HTTP verb conventions.
- [ ] All 5 endpoints implemented and responding with proper status codes.
- [ ] Pagination calculations slice data correctly.
- [ ] Automated tests pass with 100% success.

## 10. Test cases
- **Create:** `POST /api/issues` creates new issue -> 201 Created.
- **Read List:** `GET /api/issues?limit=2` returns only 2 issues.
- **Update:** `PATCH /api/issues/:id` updates status -> 200 OK.
- **Delete:** `DELETE /api/issues/:id` -> 204 No Content; subsequent GET returns 404.

## 11. Hints
1. *Concept:* For pagination: `const offset = (page - 1) * limit; const pagedData = filtered.slice(offset, offset + limit);`.
2. *Approach:* Parse query numbers: `const page = Math.max(1, parseInt(req.query.page) || 1);`.
3. *Specifics:* For deletion: find index with `.findIndex()`, remove with `.splice(index, 1)`, and end response with `res.status(204).send()`.

## 12. Bonus challenge
Add sorting capability: support `?sortBy=priority&order=asc|desc` to sort issues before applying pagination.

## 13. Self-check
1. What is the difference between `PUT` and `PATCH` in RESTful APIs?
2. Why are resource URLs named with plural nouns (`/api/items`) rather than verbs (`/api/getItems`)?
3. What HTTP status code should be returned after a resource is successfully deleted with no content in the response?
4. What is the difference between status code `401 Unauthorized` and `403 Forbidden`?

## 14. References
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
