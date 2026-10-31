# Project 06: Full-Stack Capstone Application

## 1. Project Overview & Architectural Vision
The Capstone Project represents the culmination of your entire bootcamp journey: a complete, production-deployed full-stack web application designed and built from first principles.

You will select a real-world problem domain (e.g. Peer Mentorship Platform, Campus Equipment Lending Hub, or Team Workflow Kanban), architect the relational database schema, construct a secure Express REST API, build a responsive React + TypeScript frontend, configure authentication and role-based permissions, write end-to-end tests, and deploy both frontend and backend to the cloud.

---

## 2. Core Capstone Architecture Requirements

### A. Frontend Architecture (Client Tier)
- **Framework & Language:** React 18+ with TypeScript (strict mode enabled).
- **Tooling:** Vite development server and production build pipeline.
- **Routing:** React Router v6 with nested layouts, protected route guards, and 404 pages.
- **State Management:** Local state, React Context for authentication session, and custom hooks for API calls.
- **UI & Accessibility:** Mobile-first responsive design, semantic landmarks, keyboard accessible controls, and WCAG AA color contrast compliance.
- **States:** Robust Loading skeletons, Error boundaries with Retry, and Empty states.

### B. Backend Architecture (API Tier)
- **Runtime & Framework:** Node.js (Active LTS) with Express.js.
- **Architecture:** Layered separation: Routes -> Controllers -> Services -> Data Access Layer.
- **Validation:** Strict server-side schema validation on all incoming request bodies and parameters.
- **Error Handling:** Centralized 4-argument error handling middleware; zero leaked stack traces in production.
- **Security:** Helmet HTTP headers, CORS origin restrictions, and rate limiting.

### C. Database Architecture (Persistence Tier)
- **Database Engine:** PostgreSQL (relational).
- **Relational Schema:** At least two related entity tables with Primary Keys, Foreign Keys, cascading rules, and check constraints.
- **Integrity & Safety:** 100% parameterized queries (`$1, $2`) using `pg.Pool`; zero string concatenation.
- **Performance:** B-tree indexes applied to foreign key columns and frequently queried fields.

### D. Authentication & Authorization
- **Password Security:** Salted and hashed using `bcrypt` (minimum 10 work rounds). Plaintext passwords never stored or logged.
- **Session Management:** Secure, `HttpOnly`, `SameSite=Lax` cookies or signed JWT authentication.
- **Authorization Guard:** At least one meaningful authorization rule (e.g. Resource Ownership check or Admin role check). Users cannot edit or delete resources owned by others.

### E. DevOps, Testing & Production Deployment
- **Automated Testing:**
  - Frontend: Vitest + React Testing Library component tests.
  - Backend: Vitest + Supertest integration tests for auth and CRUD endpoints.
- **Configuration:** Strict Twelve-Factor environment variable management (`.env.example` provided; zero committed secrets).
- **Cloud Deployment:**
  - Frontend deployed on Vercel, Netlify, or Cloudflare Pages with SPA rewrite rules.
  - Backend API deployed on Render, Railway, or Fly.io with database connection pooling.
- **Documentation:** A portfolio-grade `README.md` featuring architecture diagram, database schema (ERD), API endpoint table, setup guide, and deployed live links.

---

## 3. Step-by-Step Capstone Milestone Plan

Do not attempt to write all code at once. Execute the project in 6 structured milestones:

```
┌─────────────────────────────────┐
│ Milestone 1: Domain & Schema    │ ── Define problem, user stories & PostgreSQL ERD
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Milestone 2: Backend REST API   │ ── Express CRUD, validation & parameterized queries
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Milestone 3: Auth & Security    │ ── Registration, login, bcrypt, cookies & ownership
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Milestone 4: Frontend UI (React)│ ── TypeScript components, routing & state hooks
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Milestone 5: Full-Stack Connect │ ── Wire frontend to API, handle 4 UI states & auth
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Milestone 6: Testing & Deploy   │ ── Automated tests, cloud deployment & README docs
└─────────────────────────────────┘
```

---

## 4. Acceptance Criteria & Benchmark

Your capstone is complete and portfolio-ready only when:
- [ ] Deployed public frontend link and backend health check link are live and functional.
- [ ] A new user can register, log in, perform full CRUD on their resources, and log out.
- [ ] Users are prevented from modifying or deleting resources owned by other users.
- [ ] Both frontend and backend have passing automated test suites.
- [ ] Repository has a clean commit history over time with conventional commit messages.
- [ ] Root README includes an architecture diagram, database ERD, and API table.
- [ ] You can walk through and explain every architectural decision in a technical interview!
