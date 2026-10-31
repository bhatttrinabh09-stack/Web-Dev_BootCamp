# 15. Production Concepts and Optional Extensions

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain cursor-based pagination versus offset-based pagination at high scale.
- Understand caching layers (e.g. Redis) and the challenges of cache invalidation.
- Handle multipart file uploads safely with input validation (MIME types, file size limits).
- Explain asynchronous background job queues (e.g. BullMQ / Redis) for long-running tasks.
- Describe real-time bidirectional communication via WebSockets (`ws` / Socket.io).
- Understand containerization fundamentals using **Docker** (`Dockerfile`, `docker-compose`).

## 2. What is this?
**Production Extensions** represent architectural patterns utilized when applications scale beyond a single web server and basic database queries. These patterns address high concurrency, real-time messaging, background job scheduling, and horizontal scaling.

## 3. Why does it exist?
- If a user uploads a 50MB PDF report, generating that PDF inside an HTTP request handler will block the Node.js event loop and cause timeouts. Offloading the work to a **Background Job Queue** keeps the API fast.
- If 10,000 users query the homepage simultaneously, querying the database 10,000 times will crash PostgreSQL. A **Redis Cache** returns pre-calculated results in 1 millisecond.
- Running `docker-compose up` spins up an identical environment (Node, PostgreSQL, Redis) across all developer machines and cloud servers.

## 4. How does it work?
### Asynchronous Job Queue Pipeline:
```
Client sends POST /api/reports/generate
       │
       ▼
[ Express API ] ── Adds job to Queue { reportId, userId } ──> [ Redis Queue ]
       │                                                             │
       └── Returns HTTP 202 Accepted ("Processing...")               ▼
                                                              [ Background Worker ]
                                                              Executes PDF generation
                                                              (takes 30 seconds!)
```

### Offset vs Cursor Pagination:
- **Offset (`OFFSET 100000`):** Database must scan and discard 100,000 rows. Slower as offset grows, and misses rows if items are inserted concurrently.
- **Cursor (`WHERE id > 'last_seen_id' LIMIT 10`):** Instant index seek. Constant time $O(1)$ performance regardless of dataset size.

## 5. Important concepts and syntax
- Rate Limiting: Protecting endpoints from denial-of-service and brute-force attacks.
- Caching pattern (Cache-Aside):
  ```javascript
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const data = await db.query(...);
  await redis.setex(key, 300, JSON.stringify(data)); // 5 min TTL
  ```
- Dockerfile:
  ```dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  CMD ["node", "server.js"]
  ```

## 6. Small worked example
A simulated in-memory cache with Time-To-Live (TTL):

```javascript
export class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlMs) {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null; // Expired!
    }
    return entry.value;
  }
}
```

## 7. Common mistakes
1. **Never setting a TTL on cache keys:** Filling cache memory until the server runs out of RAM. Always set an expiration (`TTL`).
2. **Accepting file uploads without extension & MIME checks:** Allowing users to upload executable `.exe` or `.php` files to public directories.
3. **Using WebSockets when basic HTTP polling or SSE suffices:** WebSockets maintain persistent TCP connections that complicate load balancing and horizontal scaling.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Backend_Practice/15_Production_Concepts_and_Optional_Extras/starter/`:
Implement a Proof-of-Concept for **Cursor-Based Pagination** in `cursor_pagination.js`:
1. You are given a sorted collection of 100 event records.
2. Implement `paginateWithCursor(records, cursorId, limit)`:
   - If `cursorId` is null, returns the first `limit` records.
   - If `cursorId` is provided, seeks to the item following `cursorId` and returns the next `limit` records.
   - Returns `{ data: [...], nextCursor: 'id_of_last_item' | null, hasMore: boolean }`.
3. Run `node test_cursor.js` to execute automated pagination checks.

## 9. Acceptance criteria
- [ ] Returns requested limit of items.
- [ ] `nextCursor` accurately identifies boundary for the subsequent page.
- [ ] `hasMore` is false on the final page.
- [ ] Automated tests pass cleanly.

## 10. Test cases
- **First Page:** `paginateWithCursor(events, null, 10)` -> 10 items, `hasMore: true`.
- **Second Page:** Passing `nextCursor` from page 1 returns items 11 through 20.
- **Final Page:** Reaching end returns remaining items with `nextCursor: null` and `hasMore: false`.

## 11. Hints
1. *Concept:* Find the index of `cursorId` with `.findIndex(r => r.id === cursorId)`.
2. *Approach:* Slice starting from `index + 1` up to `index + 1 + limit`.
3. *Specifics:* `hasMore` is true if `index + 1 + limit < records.length`.

## 12. Bonus challenge
Write a Dockerfile and `docker-compose.yml` file that orchestrates an Express server connected to a PostgreSQL database on a shared internal Docker bridge network.

## 13. Self-check
1. Why is cursor-based pagination significantly faster than offset-based pagination on large datasets?
2. What is a Cache Stampede and how do TTLs and background revalidation mitigate it?
3. What are the security hazards of handling user file uploads?
4. When would you choose a background job queue over handling work directly in an HTTP request handler?

## 14. References
- [Docker Documentation](https://docs.docker.com/)
- [Redis Official Documentation](https://redis.io/documentation)
- [BullMQ: Background Jobs for Node.js](https://docs.bullmq.io/)
