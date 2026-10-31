# 12. Asynchronous JavaScript

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain synchronous blocking vs asynchronous non-blocking execution in JavaScript.
- Diagram the JavaScript Event Loop: Call Stack, Web APIs, Microtask Queue, and Task (Macrotask) Queue.
- Manage Promises across their three states (`pending`, `fulfilled`, `rejected`) using `.then()`, `.catch()`, and `.finally()`.
- Author asynchronous code using modern `async` and `await` with structured `try/catch` error boundaries.
- Coordinate concurrent operations using `Promise.all` and compare with `Promise.allSettled`.

## 2. What is this?
**Asynchronous JavaScript** is the programming pattern that allows long-running operations (network requests, database queries, file reading, timers) to execute in the background without freezing the browser's single main thread or UI rendering.

## 3. Why does it exist?
JavaScript is single-threaded: it has one call stack. If a network request took 2 seconds synchronously, the entire browser tab would completely freeze: buttons would not click, scrolling would stall, and animations would stop until the request finished. Asynchronous execution delegates wait time to the browser/operating system.

## 4. How does it work?
The JavaScript **Event Loop** continuously checks if the Call Stack is empty:

```
┌─────────────────┐       Calls async Web API        ┌─────────────────┐
│   CALL STACK    │ ───────────────────────────────> │    WEB APIs     │
│ (executes sync) │                                  │ (Timers, Fetch) │
└────────┬────────┘                                  └────────┬────────┘
         ▲                                                    │ Completes
         │                                                    ▼
         │             ┌─────────────────────────────────────────────────────────┐
         │             │                   MICROTASK QUEUE                       │
         └──────────── │ (Promise callbacks, queueMicrotask - Highest Priority!) │
         │             └─────────────────────────────────────────────────────────┘
         │             ┌─────────────────────────────────────────────────────────┐
         │             │                TASK (MACROTASK) QUEUE                   │
         └──────────── │ (setTimeout, setInterval, I/O - Runs after Microtasks)  │
                       └─────────────────────────────────────────────────────────┘
```

### Microtask vs Macrotask Order:
1. Synchronous code in Call Stack completes.
2. ALL pending **Microtasks** (Promises) run to completion.
3. ONE **Macrotask** (`setTimeout`) runs.
4. UI renders/paints if needed. Repeat.

## 5. Important concepts and syntax
- Creating a Promise:
  ```javascript
  const myPromise = new Promise((resolve, reject) => {
    if (success) resolve(data);
    else reject(new Error("Failure"));
  });
  ```
- `async/await` syntax:
  ```javascript
  async function fetchData() {
    try {
      const result = await someAsyncCall();
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      console.log("Cleanup executed");
    }
  }
  ```
- `Promise.all([p1, p2])`: Fails fast if *any* promise rejects.
- `Promise.allSettled([p1, p2])`: Waits for all to complete regardless of rejection.

## 6. Small worked example
Predicting execution order in the Event Loop:

```javascript
console.log("1: Synchronous start");

setTimeout(() => {
  console.log("2: Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Microtask (Promise)");
});

console.log("4: Synchronous end");

// Output Order:
// 1: Synchronous start
// 4: Synchronous end
// 3: Microtask (Promise)  <-- Microtasks drain before macrotasks!
// 2: Macrotask (setTimeout)
```

## 7. Common mistakes
1. **The "Async Waterfall" anti-pattern:** Awaiting independent requests sequentially instead of concurrently:
   ```javascript
   // ❌ Slow: Takes 2s + 2s = 4s total
   const user = await fetchUser();
   const posts = await fetchPosts();

   // ✔ Fast: Runs in parallel, takes only 2s total!
   const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
   ```
2. **Forgetting `await`:** Assigning a promise to a variable (`const data = fetchUser()`) and attempting to read properties (`data.name`) before the promise has resolved (results in `undefined`).
3. **Uncaught Promise Rejections:** Not wrapping `await` calls in `try/catch`, which in Node.js can crash the entire server process.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Frontend_Practice/12_Asynchronous_JavaScript/starter/async_coordinator.js`:
Implement an asynchronous flight and hotel reservation coordinator:
1. `fetchUser(userId)`: Simulates a network call resolving in 100ms. Rejects if `userId === "invalid"`.
2. `fetchFlights(destination)`: Resolves in 150ms with flight options.
3. `fetchHotels(destination)`: Resolves in 150ms with hotel options.
4. `bookTrip(userId, destination)`:
   - Fetches the user first.
   - Once verified, fetches flights AND hotels **in parallel** using `Promise.all`.
   - Returns a consolidated itinerary object: `{ user, flights, hotels, bookedAt }`.
   - Handles errors gracefully: if any service fails, catches the error and returns `{ status: "failed", reason: err.message }`.
5. Run `node async_coordinator.js` to verify parallel execution timing and failure handling.

## 9. Acceptance criteria
- [ ] User verification runs before flight/hotel calls.
- [ ] Flights and hotels are requested concurrently via `Promise.all` (total time for both is ~150ms, NOT 300ms).
- [ ] Catches rejections and returns the error object without unhandled exceptions.
- [ ] All automated tests pass.

## 10. Test cases
- **Normal:** Valid user and destination returns full itinerary in ~250ms total.
- **Concurrent Check:** Confirms `Promise.all` was used rather than sequential awaits.
- **Failure:** Invalid user or failed hotel returns `{ status: "failed", reason: ... }`.

## 11. Hints
1. *Concept:* Parallel execution means triggering both promises before awaiting them, or using `Promise.all([fetchFlights(...), fetchHotels(...)])`.
2. *Approach:* Measure execution time using `const start = Date.now()` to ensure tasks ran in parallel.
3. *Specifics:* Wrap the entire flow inside `try { ... } catch (err) { ... }`.

## 12. Bonus challenge
Implement a custom `retryWithBackoff(fn, maxRetries, baseDelayMs)` function that takes an asynchronous function and retries it with exponential delay (`delay * 2^attempt`) on failure.

## 13. Self-check
1. What is the fundamental difference between the Microtask Queue and the Macrotask Queue in the Event Loop?
2. Why is `Promise.all` considered "fail-fast"? What happens to the remaining pending promises if one fails?
3. What does an `async` function return if you return a plain number like `return 42`?
4. How do you execute three asynchronous functions sequentially where each depends on the result of the previous one?

## 14. References
- [MDN: Introducing asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS)
- [MDN: How to use promises](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises)
- [JavaScript.info: Event loop](https://javascript.info/event-loop)
