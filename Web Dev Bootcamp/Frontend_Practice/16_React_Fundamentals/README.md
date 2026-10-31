# 16. React Fundamentals

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain why component-based UI libraries exist and the concept of declarative programming.
- Author functional components using JSX syntax rules (single root, closing tags, camelCase attributes).
- Pass data downward through component trees using `props` and compose layouts with `props.children`.
- Render dynamic collections using `.map()` and supply stable, unique `key` props.
- Implement conditional rendering using ternary operators (`condition ? <A /> : <B />`) and logical AND (`&&`).
- Handle synthetic user events (`onClick`, `onChange`, `onSubmit`).

## 2. What is this?
**React** is a declarative, component-based JavaScript library for building user interfaces. Instead of manually querying and updating DOM elements with imperative steps (`document.getElementById`, `element.classList.add`), you write components that declare what the UI should look like for a given set of data.

## 3. Why does it exist?
In large vanilla JavaScript apps, keeping the DOM synchronized with underlying application data across hundreds of user interactions is error-prone. React abstracts DOM manipulation: when state changes, React recalculates the virtual representation and automatically updates only the specific browser DOM nodes that changed.

## 4. How does it work?
React operates on a **One-Way Data Flow**:

```
[Parent Component]
       │
       ├── Passes Props (Read-only data) ──> [Child Component]
       │                                            │
       └── Receives Events (Callbacks) <────────────┘
```

### The Virtual DOM & Reconciliation:
1. Component function runs and returns JSX.
2. React builds a lightweight Virtual DOM tree in memory.
3. React diffs the new Virtual DOM with the previous snapshot.
4. React commits the minimum necessary changes to the real browser DOM.

### Keys in Lists:
```tsx
// ❌ Bug: Using index as key breaks when reordering/deleting!
{items.map((item, index) => <Card key={index} data={item} />)}

// ✔ Correct: Always use a unique, persistent ID
{items.map(item => <Card key={item.id} data={item} />)}
```

## 5. Important concepts and syntax
- Functional Component:
  ```tsx
  interface BadgeProps {
    label: string;
    variant?: "primary" | "secondary";
  }
  export function Badge({ label, variant = "primary" }: BadgeProps) {
    return <span className={`badge badge-${variant}`}>{label}</span>;
  }
  ```
- Props Children:
  ```tsx
  export function Container({ children }: { children: React.ReactNode }) {
    return <div className="layout-container">{children}</div>;
  }
  ```

## 6. Small worked example
A conditional user status greeting component:

```tsx
interface UserGreetingProps {
  username: string;
  isOnline: boolean;
  unreadCount: number;
}

export function UserGreeting({ username, isOnline, unreadCount }: UserGreetingProps) {
  return (
    <div className="user-greeting">
      <p>Hello, <strong>{username}</strong>!</p>
      <span className={isOnline ? "status-online" : "status-offline"}>
        {isOnline ? "Active Now" : "Away"}
      </span>
      {unreadCount > 0 && (
        <span className="badge-notification">{unreadCount} new messages</span>
      )}
    </div>
  );
}
```

## 7. Common mistakes
1. **Returning multiple adjacent root elements without a fragment:** JSX expressions must have exactly one parent element. Wrap siblings in `<> ... </>` (React Fragment).
2. **Mutating props inside a child component:** Props are strictly read-only. A component must never modify its received props.
3. **Using `class` instead of `className`:** JSX compiles to JavaScript objects; because `class` is a reserved JavaScript keyword, React uses `className`.

## 8. Coding challenge
**Environment:** Browser & Terminal (Vite + React + TS).

Open `Frontend_Practice/16_React_Fundamentals/starter/`:
Build a Course Catalogue application composed of reusable components:
1. Examine `src/types.ts` for the `Course` interface.
2. Implement `src/components/CourseCard.tsx`:
   - Displays course title, instructor, duration, and price.
   - If `isEnrolled` is true, displays a green "Enrolled" badge; otherwise shows an "Enroll Now" button.
   - When "Enroll Now" is clicked, invoke an `onEnroll(courseId)` callback prop.
3. Implement `src/components/CourseList.tsx`:
   - Renders a list of `CourseCard` components using `.map()`.
   - Passes the required unique `key` prop using `course.id`.
4. In `src/App.tsx`, assemble the components using sample data.
5. Run `npm install` and `npm run dev` to test your application in the browser.

## 9. Acceptance criteria
- [ ] TypeScript types are strictly defined for all component props.
- [ ] Components are modular and separated into dedicated files.
- [ ] Proper unique keys applied to list items (no array index keys).
- [ ] Conditional rendering correctly differentiates enrolled vs available courses.

## 10. Test cases
- **Normal:** 3 courses render with proper titles and instructors.
- **Conditional:** An enrolled course shows the "Enrolled" badge instead of the enroll button.
- **Event:** Clicking "Enroll Now" fires the alert or console callback with course ID.

## 11. Hints
1. *Concept:* Remember that event handler callbacks in React receive the function reference: `onClick={() => onEnroll(course.id)}`.
2. *Approach:* Define `interface CourseCardProps { course: Course; onEnroll: (id: string) => void; }`.
3. *Specifics:* Run `npm run dev` in the starter directory to view changes live.

## 12. Bonus challenge
Add a search filter input in `App.tsx` that filters the courses passed down to `CourseList` by title in real-time.

## 13. Self-check
1. Why does JSX require elements to be wrapped in a single parent or Fragment?
2. What happens under the hood when a key prop changes on a list item?
3. Why are props immutable in React?
4. What is the difference between declarative UI in React and imperative UI in plain JavaScript?

## 14. References
- [React Official Documentation: Describing the UI](https://react.dev/learn/describing-the-ui)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
