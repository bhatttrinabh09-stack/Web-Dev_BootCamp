# Project 04: React API Application

## 1. Project Overview & Objective
Develop an enterprise-grade Single Page Application (SPA) using **React**, **TypeScript**, and **React Router**. The application consumes a real-world third-party REST API (e.g. GitHub User Search, OpenWeather, or TMDB Movie Explorer), managing asynchronous data fetching, client-side routing, loading skeletons, error states, and automated component tests.

## 2. Target User & Persona
- **Audience:** Users searching and exploring external datasets with search filters, detailed views, and bookmarking/favoriting capabilities.
- **Goal:** Experience instantaneous page navigation, robust search filtering with debouncing or query params, and zero broken states during network disruptions.

## 3. Core Requirements
- **Tech Stack:** React 18+, TypeScript, React Router 6, Vite.
- **Client-Side Routing:**
  - `/`: Search and Explore view with pagination/infinite scroll.
  - `/details/:id`: Deep resource detail view with comprehensive attributes.
  - `*`: 404 Not Found route.
- **The 4 Essential UI States:** Fully designed Loading Skeletons, Error state with Retry trigger, Empty search results view, and Success data grid.
- **Race Condition Prevention:** Utilize `AbortController` in custom fetch hooks.
- **Automated Testing:** Vitest and React Testing Library tests covering search input, loading transitions, and successful item rendering.

## 4. Acceptance Criteria
- [ ] Written 100% in TypeScript with strict type checking (no `any`).
- [ ] Route navigation occurs instantaneously without full-page reloads.
- [ ] Network failures (simulated offline mode) display user-friendly error banners with working "Retry" buttons.
- [ ] Automated tests pass with `npm test`.

## 5. Test & Quality Checklist
- [ ] Offline test: Toggle "Offline" in Chrome DevTools Network tab; verify error handling and retry mechanism.
- [ ] Responsiveness: Verified on iPhone SE (375px) and Desktop (1440px).
- [ ] Accessibility: Search form inputs have visible labels and announce result counts to screen readers.

## 6. Final Reflection
1. *How did TypeScript interfaces protect you from API payload mismatches?*
2. *Why was `AbortController` necessary for your search input lifecycle?*
3. *What was your testing strategy for mocking asynchronous API calls in Vitest?*
