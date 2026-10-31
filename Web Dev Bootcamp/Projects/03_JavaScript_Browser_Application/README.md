# Project 03: JavaScript Browser Application

## 1. Project Overview & Objective
Build an interactive, framework-free browser application: a **Personal Finance & Expense Tracker** (or Task Flow Manager) using vanilla JavaScript, DOM manipulation, custom event handling, state serialization, and `localStorage` persistence.

## 2. Target User & Persona
- **Audience:** Users wanting to track daily expenses, categorize transactions, view budget summaries, and export their financial data without requiring a user account.
- **Goal:** Quickly log an expense, filter by category/date, observe dynamic budget statistics, and retain data across browser refreshes.

## 3. Core Requirements
- **No External Frameworks:** Plain JavaScript (ES6+), semantic HTML, and CSS.
- **State Management:** Single central state array of transaction objects: `{ id, description, amount, category, type ('income' | 'expense'), date }`.
- **Dynamic DOM Rendering:** Efficiently render transaction lists using event delegation. Prevent XSS vulnerabilities by using `textContent` for user text.
- **Calculated Dashboard Summaries:** Dynamic updates for Total Income, Total Expenses, and Net Balance.
- **Data Persistence:** Automatically serialize state to `localStorage` on any add/delete action; defensively load and parse data on startup with error fallback.
- **Filtering & Search:** Real-time search by description and filtering by category or transaction type.

## 4. Acceptance Criteria
- [ ] Adding, editing, and deleting transactions works smoothly without full-page reloads.
- [ ] Financial balance and category breakdowns recalculate instantaneously.
- [ ] Refreshing or closing the browser preserves all entered records.
- [ ] Invalid inputs (negative values in amount, empty descriptions) are rejected with clear user error messaging.
- [ ] Tested safe against script injection (`<script>alert('xss')</script>`).

## 5. Test & Quality Checklist
- [ ] Manual test: Add 5 items, filter by "Expense", verify list matches.
- [ ] Storage test: Edit `localStorage` key to malformed JSON, reload page; app recovers gracefully without crashing.
- [ ] Accessibility: All action buttons have visible labels or `aria-label` attributes.

## 6. Final Reflection
1. *How did event delegation simplify handling delete buttons on dynamic list items?*
2. *Why is `localStorage` considered synchronous, and what performance implications does that have?*
3. *What design decisions did you make to prevent XSS attacks when rendering user descriptions?*
