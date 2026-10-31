# 20. Frontend Testing, Accessibility, and Performance

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Distinguish the roles of Unit Tests, Integration Tests, and End-to-End (E2E) Tests.
- Author robust component tests using **Vitest** and **React Testing Library** (RTL).
- Follow the guiding principle: *Test components the way users interact with them* (avoid testing internal implementation details).
- Query DOM nodes accessibly using `getByRole`, `getByLabelText`, and `findByText`.
- Identify and resolve accessibility issues (keyboard accessibility, ARIA landmarks, color contrast).
- Measure Core Web Vitals (LCP, INP, CLS) and optimize React rendering performance.

## 2. What is this?
**Automated Testing** verifies software correctness without manual clicking. **Accessibility (a11y)** ensures full usability for assistive device users. **Performance Optimization** ensures applications load rapidly, respond immediately to inputs, and maintain 60fps rendering.

## 3. Why does it exist?
Manual testing fails as codebases grow. Adding a feature in one component can silently break a checkout form elsewhere. Automated tests give you the confidence to refactor without fear. Accessibility and performance directly impact user retention and legal compliance.

## 4. How does it work?
### React Testing Library Philosophy:
Don't test component state or internal methods. Test what the user sees and does:

```
[User Action] ──> types into input / clicks button
       │
       ▼
[Assertion]  ──> expects specific text / element to appear in the document
```

```tsx
// ✔ Testing user behavior via RTL:
test('increments counter on button click', async () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  await userEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

### Core Web Vitals:
- **LCP (Largest Contentful Paint):** How fast the main content renders (target < 2.5s).
- **INP (Interaction to Next Paint):** How responsive the UI feels to user clicks (target < 200ms).
- **CLS (Cumulative Layout Shift):** Visual stability: elements shouldn't jump around as images load (target < 0.1).

## 5. Important concepts and syntax
- RTL Queries:
  - `getByRole('button', { name: 'Submit' })` (Always prefer!).
  - `getByLabelText('Email')`
  - `findByRole` / `findByText`: Asynchronous query returning a Promise (waits for elements to appear after fetch).
- Accessibility checks:
  - Axe DevTools browser extension.
  - Keyboard navigation (`Tab`, `Shift+Tab`, `Space`, `Enter`).

## 6. Small worked example
Testing an asynchronous user profile component:

```tsx
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

test('renders user data after loading', async () => {
  render(<UserProfile userId="1" />);
  
  // Loading spinner renders initially
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // findBy waits asynchronously for user name to render
  const heading = await screen.findByRole('heading', { name: /Sarah Lin/i });
  expect(heading).toBeInTheDocument();
});
```

## 7. Common mistakes
1. **Testing implementation details:** Asserting on `wrapper.state().count` or inspecting internal function names rather than user-visible DOM output.
2. **Using `getByText` when `getByRole` is available:** `getByRole` verifies semantic HTML and accessibility at the same time.
3. **Optimizing performance before measuring:** Wrapping every single function in `useCallback` or `useMemo` without profiling in DevTools first. Premature optimization adds memory overhead.

## 8. Coding challenge
**Environment:** Terminal (Vitest + RTL).

Open `Frontend_Practice/20_Frontend_Testing_Accessibility_and_Performance/starter/`:
You are given an interactive `FeedbackWidget` component:
1. In `src/components/FeedbackWidget.test.tsx`, write automated tests for:
   - Initial render: submits button is disabled when rating is not selected.
   - User interaction: clicking rating star 4 enables submit button.
   - Form submission: typing feedback text and clicking submit displays the thank-you confirmation banner.
2. In `src/components/FeedbackWidget.tsx`, audit and resolve accessibility violations:
   - Ensure ratings are keyboard accessible using semantic buttons with clear `aria-label` attributes.
   - Ensure the text input has an associated `<label>`.
3. Run `npm test` and ensure all test suites pass with 100% green checkmarks.

## 9. Acceptance criteria
- [ ] Tests use `screen.getByRole` and `userEvent`.
- [ ] Tests verify disabled state and submission lifecycle.
- [ ] Rating controls are accessible via keyboard (`Tab` and `Enter`).
- [ ] All Vitest tests pass cleanly.

## 10. Test cases
- **Initial:** Button is disabled.
- **Select Rating:** Rating button clicked -> submit button enabled.
- **Submit:** Success message rendered in document.

## 11. Hints
1. *Concept:* Use `@testing-library/user-event` for realistic user clicks and keystrokes.
2. *Approach:* `const user = userEvent.setup(); await user.click(...);`.
3. *Specifics:* Query the submit button using `screen.getByRole('button', { name: /submit feedback/i })`.

## 12. Bonus challenge
Use Chrome DevTools Lighthouse to run an Accessibility and Performance audit on a deployed project, achieving a score >= 95 in both categories.

## 13. Self-check
1. Why does React Testing Library discourage testing component state directly?
2. What is the difference between `getBy...`, `queryBy...`, and `findBy...` in RTL?
3. What causes Cumulative Layout Shift (CLS) on a webpage and how do you prevent it for images?
4. What is the purpose of `aria-label` on an icon button that has no visible text?

## 14. References
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Web.dev: Core Web Vitals](https://web.dev/explore/vitals)
