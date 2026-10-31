# 19. Frontend Data Fetching and State Management

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Connect React applications to RESTful backend endpoints using `fetch` with robust lifecycle management.
- Prevent stale responses and race conditions using `AbortController` in `useEffect` cleanup.
- Differentiate between Local component state, Shared state, and Server Cache state.
- Implement the React Context API (`createContext`, `useContext`) for cross-cutting global concerns (theming, auth user).
- Explain why frontend environment variables (e.g. `VITE_API_URL`) are public and never contain secrets.

## 2. What is this?
**Frontend Data Fetching** is the mechanism by which React components synchronize with server databases over HTTP. **State Management** refers to how data is stored, shared, and updated across the component tree.

## 3. Why does it exist?
Real applications do not have hardcoded data. They request live data from servers. If data fetching is done carelessly in React:
- Changing search filters rapidly can cause older, slower responses to overwrite newer results (race condition).
- Passing props through 8 levels of components that don't need the data ("prop drilling") clutters code.
- Storing API keys in frontend `.env` files leads to catastrophic credential leaks.

## 4. How does it work?
### Network Cancellation with AbortController:
```tsx
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      const res = await fetch(`/api/search?q=${query}`, { signal: controller.signal });
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  }

  loadData();

  // If query changes before fetch completes, cancel previous request!
  return () => controller.abort();
}, [query]);
```

### The State Hierarchy:
1. **Local State (`useState`):** Form inputs, modal open/close toggles, UI tabs.
2. **Context API:** Global data that rarely changes (Auth user object, Theme `'dark' | 'light'`).
3. **Server Cache (e.g. TanStack Query):** Remote asynchronous data requiring caching, deduplication, and background refetching.

## 5. Important concepts and syntax
- React Context:
  ```tsx
  const ThemeContext = createContext<ThemeContextType | null>(null);
  export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
  };
  ```
- Environment Variables in Vite:
  - Prefixed with `VITE_` (e.g. `VITE_API_BASE_URL`).
  - Accessed via `import.meta.env.VITE_API_BASE_URL`.
  - **CRITICAL:** Anything prefixed with `VITE_` is baked into public client JavaScript! Never store database passwords or secret keys here!

## 6. Small worked example
A custom hook encapsulating fetch states:

```tsx
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then(d => { if (!isCancelled) setData(d); })
      .catch(err => { if (!isCancelled) setError(err.message); })
      .finally(() => { if (!isCancelled) setLoading(false); });

    return () => { isCancelled = true; };
  }, [url]);

  return { data, loading, error };
}
```

## 7. Common mistakes
1. **Network race conditions:** Not cancelling or ignoring previous fetch promises when query parameters change quickly.
2. **Overusing Context for rapidly changing data:** Placing high-frequency state (like keystrokes or mouse coordinates) into Context triggers re-renders across all consuming components.
3. **Committing private API keys to Vite apps:** Thinking frontend `.env` is secure. Any user can open DevTools and inspect bundled client variables.

## 8. Coding challenge
**Environment:** Browser & Terminal (Vite + React + TS).

Open `Frontend_Practice/19_Frontend_Data_Fetching_and_State/starter/`:
Build a Searchable Product Catalog consuming the DummyJSON practice API (`https://dummyjson.com/products/search?q=...`):
1. In `src/context/ThemeContext.tsx`:
   - Implement `ThemeProvider` and custom hook `useTheme()`.
   - Provide `theme` ('light' | 'dark') and `toggleTheme()` to the entire app.
2. In `src/hooks/useProducts.ts`:
   - Implement custom hook `useProducts(searchQuery)`.
   - Use `AbortController` in `useEffect` cleanup to cancel in-flight queries.
   - Return `{ products, loading, error, empty }`.
3. In `src/App.tsx`:
   - Connect the search box to `useProducts`.
   - Render Loading, Error, Empty, and Success states.
   - Support dark/light mode switching via `useTheme`.

## 9. Acceptance criteria
- [ ] Uses `AbortController` to cancel out-of-date search requests.
- [ ] Context provider wraps app cleanly with strict null checking in custom hook.
- [ ] Handles all four UI states (Loading, Success, Empty, Error).
- [ ] Dark theme toggles styling across root container without prop drilling.

## 10. Test cases
- **Normal:** Type "phone"; list displays smartphone results.
- **Race Condition Prevention:** Type "laptop" quickly followed by "watch"; final display shows watch results without being overwritten by the slower laptop response.
- **Empty:** Type "xyzrandomquery"; shows empty state.

## 11. Hints
1. *Concept:* Catch `AbortError` and ignore it: `if (err.name === 'AbortError') return;`.
2. *Approach:* In `ThemeContext`, store `'theme'` in `useState<'light' | 'dark'>('light')`.
3. *Specifics:* Pass `{ signal: controller.signal }` as the second argument to `fetch()`.

## 12. Bonus challenge
Implement client-side pagination: accept a `page` number in `useProducts`, append `&limit=10&skip=${(page - 1) * 10}` to the URL, and add Next/Previous buttons.

## 13. Self-check
1. What is a network race condition and how does `AbortController` solve it?
2. Why is storing private payment gateway secret keys in a Vite frontend application fatal?
3. When should you use React Context vs passing standard props?
4. What happens when a component consumes a Context value and that value updates?

## 14. References
- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Vite: Env Variables and Modes](https://vite.dev/guide/env-and-mode.html)
