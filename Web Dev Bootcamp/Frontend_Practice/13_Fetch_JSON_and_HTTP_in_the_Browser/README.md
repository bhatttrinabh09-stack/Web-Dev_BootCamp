# 13. Fetch, JSON, and HTTP in the Browser

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Formulate HTTP requests using the browser's native `fetch()` API with headers, methods, and payloads.
- Understand why `fetch()` does NOT reject on HTTP 404 or 500 status codes, and explicitly verify `response.ok`.
- Manage the 4 mandatory frontend UI states: **Idle/Loading**, **Success**, **Empty**, and **Error**.
- Parse and serialize JSON payloads safely.
- Demystify CORS (Cross-Origin Resource Sharing): explain what it is, why the browser enforces it, and how it is resolved.

## 2. What is this?
**The Fetch API** is the modern browser standard for performing asynchronous HTTP network requests to external servers and APIs. **JSON** (JavaScript Object Notation) is the lightweight text format used to exchange structured data between clients and servers.

## 3. Why does it exist?
Traditional websites required full-page reloads to load new content. With `fetch()`, client-side applications can dynamically request data in the background (AJAX) and update specific parts of the DOM without interrupting the user experience.

## 4. How does it work?
### The Fetch Network Flow:
```
[Browser] ── fetch('/api/items') ──> [Server]
    │                                    │
    ▼                                    ▼
Receives Response Stream              Processes & Responds
    │                                 HTTP/1.1 200 OK
    ├─ 1. Check `response.ok`         Content-Type: application/json
    │     (true if status 200-299)
    │
    └─ 2. Parse Body Stream: `await response.json()`
```

### The 4 Essential UI States:
Every user interface that fetches asynchronous data must handle four distinct visual states:
1. **Loading State:** Spinner or skeleton screen while waiting for the network.
2. **Success State:** Data successfully received and rendered in the DOM.
3. **Empty State:** Network request succeeded (200 OK), but the returned data array is empty (`data.length === 0`).
4. **Error State:** Network disconnected or server returned 4xx/5xx error; displays user-friendly message with a "Retry" button.

### Understanding CORS (Cross-Origin Resource Sharing):
CORS is a **browser security mechanism**, NOT an API error!
- An **Origin** is defined by: `Protocol + Domain + Port` (e.g. `http://localhost:3000`).
- If a frontend at `http://localhost:5173` calls an API at `http://localhost:3000`, the browser blocks the response unless the API server sends the header:
  `Access-Control-Allow-Origin: *` (or specific origin).

## 5. Important concepts and syntax
- `const res = await fetch(url, options);`
- `if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);`
- Sending JSON:
  ```javascript
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Alex" }),
  });
  ```

## 6. Small worked example
A robust API fetcher with status checking and error boundary:

```javascript
async function getProduct(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    
    // Crucial: fetch does NOT reject on 404 or 500!
    if (!response.ok) {
      throw new Error(`Failed to fetch product (Status: ${response.status})`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
```

## 7. Common mistakes
1. **Assuming `fetch` rejects on 404 or 500:** A `fetch()` promise only rejects on a complete network failure (e.g. lost internet connection or blocked DNS). A `404 Not Found` resolves successfully! You *must* check `response.ok`.
2. **Attempting to read `response.json()` twice:** The response body is a readable stream that can only be consumed once. Calling `await res.json()` followed by `await res.text()` throws a `TypeError: Already read`.
3. **Ignoring Empty States:** Rendering a blank blank screen when an API returns `[]` instead of showing "No items found".

## 8. Coding challenge
**Environment:** Browser.

Open `Frontend_Practice/13_Fetch_JSON_and_HTTP_in_the_Browser/starter/`:
Build a dynamic User Directory that queries the public JSONPlaceholder API (`https://jsonplaceholder.typicode.com/users`):
1. **Loading State:** When fetching starts, show the `#loading-spinner` and hide content and error containers.
2. **Success State:** Render users in `#user-grid` displaying their name, email, and company name.
3. **Empty State:** Provide a search filter input; when no users match the query, display `#empty-state`.
4. **Error & Retry State:** If fetching fails (simulate with an invalid endpoint URL `https://jsonplaceholder.typicode.com/invalid-route`), show `#error-container` with the error message and a working "Retry" button.
5. Do not hardcode a happy path as the only outcome!

## 9. Acceptance criteria
- [ ] Explicitly checks `response.ok` before attempting `response.json()`.
- [ ] All four UI states (Loading, Success, Empty, Error) render correctly.
- [ ] Search input dynamically filters users and triggers the empty state if no matches exist.
- [ ] "Retry" button re-attempts the network request cleanly.

## 10. Test cases
- **Normal:** Page loads, spinner appears briefly, 10 users render in the grid.
- **Empty:** Typing `"zzzz"` in search hides cards and reveals "No users match your search".
- **Error:** Triggering a failed endpoint displays error card with Retry button; clicking Retry re-fetches.

## 11. Hints
1. *Concept:* Keep track of UI state using an object or variable: `let state = { loading: false, error: null, users: [] }`.
2. *Approach:* Create a dedicated `render()` function that inspects the current state and toggles the `hidden` attribute on the corresponding DOM elements.
3. *Specifics:* For the search filter, listen to the `input` event on the search box and filter the stored `users` array.

## 12. Bonus challenge
Add an AbortController (`const controller = new AbortController()`) to cancel pending in-flight requests if the user navigates away or types a new search query before the previous request finishes.

## 13. Self-check
1. Why does `fetch("https://httpstat.us/500")` NOT jump directly to the `catch` block?
2. What headers must be included in a `POST` request sending a JSON body?
3. What is CORS and why can't a backend developer "disable CORS in the user's browser"?
4. What is the difference between `response.json()` and `JSON.parse()`?

## 14. References
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [MDN: Response: ok property](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
