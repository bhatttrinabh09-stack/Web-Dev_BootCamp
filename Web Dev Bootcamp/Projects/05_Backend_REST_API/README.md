# Project 05: Backend REST API

## 1. Project Overview & Objective
Design, implement, and document a robust, production-grade RESTful API backend using **Node.js**, **Express**, and **PostgreSQL**. The API provides a full relational CRUD backend for a domain service (e.g. Course Management, Issue Tracker, or E-Commerce Catalog) featuring schema validation, parameterized queries, relational joins, authentication, and integration testing.

## 2. Target User & Persona
- **Audience:** Frontend clients (React SPAs, Mobile Apps) requiring a reliable, secure API service.
- **Goal:** Predictable JSON endpoints, robust input validation, secure credential handling, and relational data persistence.

## 3. Core Requirements
- **Express + PostgreSQL:** Clean layered architecture (Routes -> Controllers -> Services -> Database Pool).
- **Relational Data Model:** At least two related database tables (e.g. `users` 1-to-Many `posts`, or `courses` Many-to-Many `students`) linked with Foreign Keys.
- **CRUD Operations:** Complete `GET` (list + item), `POST`, `PATCH`, and `DELETE` lifecycle.
- **Security & Parameterization:** 100% of SQL queries must use parameterized placeholders (`$1, $2`) to eliminate SQL Injection risks.
- **Input Validation:** Enforce strict request body schemas; return HTTP 400 with helpful field error details on bad input.
- **Centralized Error Handling:** All errors funnel through a 4-argument Express error middleware; zero leaked stack traces in production.
- **Integration Test Suite:** Automated test suite using `supertest` verifying success paths, validation rejections, and 404 boundaries.

## 4. Acceptance Criteria
- [ ] All endpoints follow RESTful plural naming conventions.
- [ ] Database queries are parameterized without string interpolation.
- [ ] Handled unique constraint conflicts with HTTP 409 Conflict.
- [ ] Health check endpoint `GET /health` returns database connectivity status.
- [ ] Automated tests pass with `npm test`.

## 5. Test & Quality Checklist
- [ ] Tested with Postman or cURL: missing required field returns 400.
- [ ] Tested with SQL injection payload (`' OR 1=1 --`); confirmed harmless handling.
- [ ] Verified database foreign key cascade behavior on deletion.

## 6. Final Reflection
1. *How did connection pooling improve the efficiency of your Express backend?*
2. *What strategy did you use to catch asynchronous errors in Express route handlers?*
3. *Why is database-level foreign key enforcement superior to enforcing relationships in application JavaScript?*
