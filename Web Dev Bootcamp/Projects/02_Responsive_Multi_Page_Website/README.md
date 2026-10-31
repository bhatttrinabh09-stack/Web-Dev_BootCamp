# Project 02: Responsive Multi-Page Website

## 1. Project Overview & Objective
Design and construct a cohesive, multi-page website for a business, student organization, or community conference. The project demonstrates component reusability, multi-page navigation architectures, accessible forms, and advanced responsive grid styling.

## 2. Target User & Persona
- **Audience:** Potential conference attendees or club members seeking information, schedule details, speaker bios, and ticket registration.
- **Goal:** Effortlessly browse across multiple pages, review the event timetable, and submit a validated registration form.

## 3. Core Requirements
- **Multiple Pages (minimum 3 pages):**
  1. `index.html`: Home page featuring hero banner, value proposition, and key highlights.
  2. `schedule.html`: Timetable featuring semantic tables or grid cards displaying daily talks, speakers, and venues.
  3. `register.html`: Comprehensive event registration form with client-side HTML5 validation, accessible fieldsets, and error guidance.
- **Shared Design System:** Unified stylesheet (`style.css`) with consistent navigation header and footer across all pages.
- **Active Navigation Indicator:** The current active page link in the navbar must be visually distinct and announce `aria-current="page"`.
- **Responsive Layout:** Adapts flawlessly from mobile single-column to desktop multi-column layouts without layout shift.

## 4. Acceptance Criteria
- [ ] Consistent navigation bar and footer present on every page.
- [ ] Active page link highlights properly with `aria-current="page"`.
- [ ] Registration form uses proper input types (`email`, `tel`, `number`, `checkbox`) with labels tied via `for`/`id`.
- [ ] Zero layout breaks across 320px, 768px, and 1200px viewports.
- [ ] All pages pass W3C validation.

## 5. Test & Quality Checklist
- [ ] Tested keyboard navigation across all three pages (`Tab`, `Enter`).
- [ ] Tested form submission on `register.html` with invalid and valid inputs.
- [ ] Verified that relative links between pages resolve correctly without 404s.

## 6. Final Reflection
1. *How did you structure your CSS to avoid duplicating navigation and footer rules across pages?*
2. *Why is `aria-current="page"` important for screen reader users on a multi-page site?*
3. *What criteria did you use to choose between CSS Flexbox and CSS Grid for the schedule layout?*
