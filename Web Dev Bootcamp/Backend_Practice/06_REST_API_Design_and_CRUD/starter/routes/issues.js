// ==============================================================================
// Topic 06 Starter: RESTful Issue Tracker API
// Follow instructions in README.md section 8.
// ==============================================================================

import { Router } from 'express';

export const issueRouter = Router();

// In-Memory Issues Store
export let issues = [
  { id: "iss-1", title: "Navbar overflow on mobile", status: "open", priority: "high" },
  { id: "iss-2", title: "Database connection leak", status: "in_progress", priority: "critical" },
  { id: "iss-3", title: "Update README dependencies", status: "resolved", priority: "low" },
  { id: "iss-4", title: "Optimize image asset sizes", status: "open", priority: "medium" },
];

// 1. GET /api/issues (List with ?page=, ?limit=, and ?status= filtering)
issueRouter.get('/', (req, res) => {
  // TODO:
  // 1. Filter by status if req.query.status exists
  // 2. Parse page (default 1) and limit (default 10)
  // 3. Slice array for pagination
  // 4. Return { data: pagedIssues, pagination: { page, limit, total } }
  throw new Error("TODO: Implement GET /api/issues");
});

// 2. GET /api/issues/:id (Read single)
issueRouter.get('/:id', (req, res) => {
  // TODO: Find issue by id or return 404
  throw new Error("TODO: Implement GET /api/issues/:id");
});

// 3. POST /api/issues (Create)
issueRouter.post('/', (req, res) => {
  // TODO: Create new issue, generate id, push to issues, return 201 Created
  throw new Error("TODO: Implement POST /api/issues");
});

// 4. PATCH /api/issues/:id (Partial update)
issueRouter.patch('/:id', (req, res) => {
  // TODO: Find issue, apply req.body updates, return 200 OK
  throw new Error("TODO: Implement PATCH /api/issues/:id");
});

// 5. DELETE /api/issues/:id (Delete)
issueRouter.delete('/:id', (req, res) => {
  // TODO: Find index, remove issue, return 204 No Content
  throw new Error("TODO: Implement DELETE /api/issues/:id");
});
