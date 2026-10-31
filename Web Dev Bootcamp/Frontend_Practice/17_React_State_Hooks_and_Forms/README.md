# 17. React State, Hooks, and Forms

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain component state, scheduled re-renders, and why direct state mutation fails in React.
- Manage interactive UI state using the `useState` hook with immutable updates.
- Synchronize components with external systems using `useEffect` with proper dependency arrays and cleanup functions.
- Avoid common `useEffect` anti-patterns (e.g. using effects for derived state).
- Build controlled form inputs and validate inputs cleanly in React.
- Lift state up to common parent components to share data between sibling components.

## 2. What is this?
**State** is a component's memory: data that changes over time based on user interactions, network responses, or timers. **Hooks** are special functions (starting with `use`) that let functional components hook into React features (state, lifecycle synchronization, DOM refs).

## 3. Why does it exist?
If you store data in a standard local variable (`let count = 0`), changing it does not notify React that anything has changed, so no re-render occurs. Calling a state setter (`setCount(count + 1)`) informs React to schedule a re-render and update the screen.

## 4. How does it work?
### The Immutability Rule:
```tsx
// ❌ WRONG: Mutating state directly does NOT trigger a re-render!
const [items, setItems] = useState<string[]>([]);
items.push("new item"); // React has no idea this changed!

// ✔ CORRECT: Create a brand new array/object reference
setItems([...items, "new item"]);
```

### The `useEffect` Lifecycle:
```
Component Mounts ──> Runs Effect Function ──> Returns Cleanup Function (optional)
Component Updates ─> Runs Cleanup (from previous render!) ──> Runs New Effect Function
Component Unmounts ─> Runs Final Cleanup Function
```

### The Golden Rule of Derived State:
If a value can be computed from existing props or state, **do not put it in state** and do not synchronize it with `useEffect`. Compute it on the fly during rendering!

## 5. Important concepts and syntax
- `const [state, setState] = useState(initialValue);`
- Functional state updates: `setCount(prev => prev + 1);` (crucial when updates depend on previous state).
- Controlled input:
  ```tsx
  <input 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
  />
  ```
- `useEffect` Dependency Array:
  - `[]`: Runs once on mount, cleanup runs on unmount.
  - `[dep1, dep2]`: Runs when `dep1` or `dep2` changes.
  - Omitted: Runs after *every single render* (almost always a bug!).

## 6. Small worked example
A timer with clean interval cleanup:

```tsx
export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // CRUCIAL: Cleanup function prevents memory leaks!
    return () => clearInterval(intervalId);
  }, []);

  return <p>Elapsed time: {seconds}s</p>;
}
```

## 7. Common mistakes
1. **Infinite loops with `useEffect`:** Updating a state variable inside `useEffect` while including that same variable in the dependency array without a guard condition.
2. **Missing cleanup functions:** Setting up event listeners or timers inside `useEffect` without returning a removal function, causing zombie listeners that multiply on every render.
3. **Putting derived data into state:** Creating state for `firstName`, `lastName`, and `fullName`. `fullName` should simply be `const fullName = \`\${firstName} \${lastName}\`;`.

## 8. Coding challenge
**Environment:** Browser & Terminal (Vite + React + TS).

Open `Frontend_Practice/17_React_State_Hooks_and_Forms/starter/`:
Build a Controlled Form & Filtered Inventory Tracker:
1. In `src/components/ProductForm.tsx`:
   - Create a controlled form to add products (Name, Category, Price).
   - Validate that Name has >= 3 characters and Price is > 0.
   - Show inline validation errors and disable submit button when invalid.
2. In `src/App.tsx`:
   - Manage the list of products in state.
   - Provide a Category filter dropdown ("All", "Electronics", "Clothing", "Books").
   - Compute **derived statistics** without using `useEffect`: Total Products count, Average Price, and Filtered Products.
3. In `src/components/ProductStats.tsx`:
   - Display the computed statistics in summary cards.
4. Verify that adding a product immediately updates both the list and the statistics.

## 9. Acceptance criteria
- [ ] Inputs are fully controlled with React state.
- [ ] Form submission validates data and clears fields upon success.
- [ ] Statistics (count, average price) are calculated as derived state, NOT stored in separate state.
- [ ] No `useEffect` is used for derived calculations.

## 10. Test cases
- **Normal:** Enter "Mechanical Keyboard", "Electronics", "120"; product appears in list and average price updates.
- **Validation:** Entering price "-5" disables submit and flags invalid price.
- **Filter:** Selecting "Books" filters list to books only; stats reflect filtered view.

## 11. Hints
1. *Concept:* Lift the `products` array state into `App.tsx` so both `ProductForm` and `ProductStats` can access or update it.
2. *Approach:* In `ProductForm`, prevent default submission with `e.preventDefault()`.
3. *Specifics:* Calculate `const filtered = category === 'All' ? products : products.filter(...)`.

## 12. Bonus challenge
Use `localStorage` inside a custom hook `useLocalStorage<T>(key, initialValue)` that synchronizes the products list to browser storage automatically via `useEffect`.

## 13. Self-check
1. Why is direct state mutation (`state.count = 5`) forbidden in React?
2. What is the difference between passing `[]` vs passing no dependency array to `useEffect`?
3. When should you use the functional updater form `setCount(prev => prev + 1)` instead of `setCount(count + 1)`?
4. Why is creating state for derived data considered an anti-pattern in React?

## 14. References
- [React: State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
