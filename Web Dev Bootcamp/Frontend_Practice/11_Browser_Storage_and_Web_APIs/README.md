# 11. Browser Storage and Web APIs

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Compare `localStorage`, `sessionStorage`, and Cookies across persistence, capacity, and security.
- Serialize and deserialize complex data structures using `JSON.stringify` and `JSON.parse`.
- Handle corrupted or missing stored data defensively with `try/catch`.
- Utilize modern Browser Web APIs: `URL`, `URLSearchParams`, Clipboard API (`navigator.clipboard`), and Timers.
- Navigate official MDN Web API documentation to research unknown browser interfaces.

## 2. What is this?
**Browser Storage** provides persistent key-value storage directly within the user's browser across page refreshes. **Web APIs** are built-in browser interfaces extending standard JavaScript, allowing web apps to interact with the device hardware, network, clipboard, and browser session.

## 3. Why does it exist?
Without browser storage, every time a user refreshes their tab or closes their browser, all unsaved state (draft text, shopping cart items, UI theme preferences) is permanently erased. Browser storage enables offline capability and instant state hydration.

## 4. How does it work?
### Client-Side Storage Comparison:
| Storage Mechanism | Expiration | Capacity | Transmitted with HTTP Requests? | Best Use Case |
|---|---|---|---|---|
| `localStorage` | Never (until cleared) | ~5MB | No | Theme preference, offline drafts |
| `sessionStorage` | Tab close | ~5MB | No | Multi-step form wizard data |
| `Cookies` | Configurable | ~4KB | Yes (Every single request!) | Auth session identifiers |

### Storage Serialization:
`localStorage` only stores strings! Attempting to store an object directly results in `"[object Object]"`:
```javascript
// ❌ Bug:
localStorage.setItem("user", { name: "Alex" });
localStorage.getItem("user"); // "[object Object]" - Corrupted!

// ✔ Correct:
localStorage.setItem("user", JSON.stringify({ name: "Alex" }));
const user = JSON.parse(localStorage.getItem("user"));
```

## 5. Important concepts and syntax
- `localStorage.setItem(key, valueString)`
- `localStorage.getItem(key)`: Returns string or `null` if not found.
- `localStorage.removeItem(key)` / `localStorage.clear()`.
- Clipboard API: `navigator.clipboard.writeText("text")`.
- Timers: `const timerId = setTimeout(fn, ms); clearTimeout(timerId);`
- `URLSearchParams`:
  ```javascript
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  ```

## 6. Small worked example
Defensive storage helper with error boundary:

```javascript
function loadStoredData(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallbackValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed to parse storage key "${key}". Resetting to fallback.`, err);
    return fallbackValue;
  }
}
```

## 7. Common mistakes
1. **Storing sensitive secrets in `localStorage`:** Any script running on the page (including third-party analytics or XSS exploits) can read `localStorage`. Never store JWT auth tokens or passwords here!
2. **Synchronous main-thread blocking:** `localStorage` is synchronous. Reading or writing megabytes of data blocks UI rendering and causes jank.
3. **Crashing on corrupted JSON:** Calling `JSON.parse(null)` returns `null`, but calling `JSON.parse("undefined")` or malformed strings throws a fatal `SyntaxError` if not wrapped in `try/catch`.

## 8. Coding challenge
**Environment:** Browser.

Open `Frontend_Practice/11_Browser_Storage_and_Web_APIs/starter/`:
Extend the Task Manager with persistence and Web APIs in `storage_app.js`:
1. **Save to Storage:** Whenever tasks are added, toggled, or deleted, persist the array into `localStorage` under the key `'dev_bootcamp_tasks'`.
2. **Defensive Load:** On initial page load, retrieve and parse the saved tasks. If storage is empty or contains malformed JSON, fall back gracefully to an empty array without crashing.
3. **Share to Clipboard API:** Add a "Copy Shareable Link" button that encodes current active tasks into URL query parameters (`?tasks=...`) and copies the URL to the user's clipboard using `navigator.clipboard.writeText()`, displaying a temporary "Copied!" notification for 2 seconds using `setTimeout`.
4. **URL Hydration:** On load, check if URL contains `tasks` query parameters; if present, import them.

## 9. Acceptance criteria
- [ ] Tasks persist across hard browser page refreshes (`Cmd+R` / `F5`).
- [ ] Corrupted storage data (e.g. manually setting `localStorage.setItem('dev_bootcamp_tasks', 'invalid{json')`) does not crash the app.
- [ ] "Copy Link" button successfully writes URL to clipboard and shows 2s toast.
- [ ] Opening URL with query parameters loads the shared tasks.

## 10. Test cases
- **Normal:** Add 3 tasks, refresh page; all 3 tasks remain intact.
- **Corrupted Storage:** Open DevTools Application tab, edit `dev_bootcamp_tasks` to `"corrupted"`, reload; app logs warning and initializes empty list.
- **Clipboard:** Click copy; paste into browser URL bar; parameters are present.

## 11. Hints
1. *Concept:* Use `try { JSON.parse(...) } catch { return []; }` for rock-solid parsing.
2. *Approach:* For query parameter encoding, use `encodeURIComponent(JSON.stringify(tasks))`.
3. *Specifics:* Clear any existing timer ID with `clearTimeout()` if the user clicks "Copy" repeatedly before the 2 seconds expire.

## 12. Bonus challenge
Listen to the `window.addEventListener('storage', (e) => ...)` event to automatically synchronize task updates across multiple browser tabs in real-time!

## 13. Self-check
1. What is the storage size limit of `localStorage` compared to cookies?
2. What happens when a user operates in Private Browsing / Incognito mode regarding `localStorage`?
3. Why should sensitive session credentials never be stored in `localStorage`?
4. What does `navigator.clipboard.writeText()` return? Is it synchronous or asynchronous?

## 14. References
- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
