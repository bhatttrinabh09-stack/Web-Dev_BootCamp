# 03. HTTP and a Basic Node Server

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Construct an HTTP web server from scratch using Node.js's built-in `node:http` module without any external frameworks.
- Parse HTTP request methods (`GET`, `POST`), URLs, and request headers from incoming requests.
- Stream and buffer incoming request bodies asynchronously using Node.js streams.
- Formulate HTTP response headers, content types (`application/json`, `text/plain`), and status codes.
- Explain server ports, TCP socket listening, and basic routing mechanisms.

## 2. What is this?
The **HTTP Module (`node:http`)** is the foundational networking library built directly into the Node.js core runtime. It allows JavaScript to open a TCP port on your operating system, listen for incoming HTTP network connections, decode request streams, and send formatted HTTP responses back to web browsers and mobile clients.

## 3. Why does it exist?
Before learning high-level frameworks like Express or Fastify, you must understand what those frameworks actually abstract. Express is essentially a layer of ergonomic convenience built on top of `node:http`. Learning raw `node:http` demystifies how headers, status codes, and request body streams work under the hood.

## 4. How does it work?
In `node:http`, the request body arrives as an asynchronous **Readable Stream** of binary data chunks (`Buffer`):

```
Client sends POST /api/echo with body '{"msg":"hello"}'
       │
       ▼
[ Node.js http.createServer ]
       │
       ├── req.method = 'POST'
       ├── req.url = '/api/echo'
       │
       ├── Streams incoming chunks:
       │   req.on('data', chunk => chunks.push(chunk))
       │
       └── Stream completes:
           req.on('end', () => {
             const body = Buffer.concat(chunks).toString();
             // Process body, craft response
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ received: JSON.parse(body) }));
           })
```

## 5. Important concepts and syntax
- `http.createServer((req, res) => { ... })`: Instantiates server.
- `server.listen(port, callback)`: Binds server to listen on a local port.
- `req.method`: HTTP verb (`GET`, `POST`, `PUT`, `DELETE`).
- `req.url`: Request URL path (e.g. `/api/status`).
- `res.writeHead(statusCode, headers)`: Sets HTTP status and response headers.
- `res.end(payload)`: Sends final payload chunk and closes the HTTP connection.

## 6. Small worked example
A minimal health check server:

```javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
```

## 7. Common mistakes
1. **Forgetting `res.end()`:** If you set headers or write data but never call `res.end()`, the client's browser spinner will spin indefinitely until the connection times out.
2. **Assuming `req.body` exists automatically:** In raw `node:http`, `req.body` is `undefined`. You must assemble chunks from `req.on('data')` manually.
3. **Writing headers after sending response body:** Calling `res.writeHead()` *after* `res.write()` or `res.end()` throws `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Backend_Practice/03_HTTP_and_Basic_Node_Server/starter/`:
Build a raw Node.js HTTP server in `server.js` supporting three endpoints:
1. `GET /api/status`: Returns HTTP 200 with `{ status: "online", uptime: process.uptime() }`.
2. `GET /api/time`: Returns HTTP 200 with `{ iso: new Date().toISOString() }`.
3. `POST /api/echo`:
   - Collects the incoming JSON request body stream.
   - Parses the JSON safely.
   - Returns HTTP 200 with `{ received: parsedBody, length: bodyString.length }`.
   - If the body is malformed JSON, returns HTTP 400 with `{ error: "Invalid JSON payload" }`.
4. Any other method or route returns HTTP 404 with `{ error: "Not Found" }`.
5. Run `node test_server.js` to execute automated HTTP requests against the endpoints.

## 9. Acceptance criteria
- [ ] Uses only built-in `node:http` (no external dependencies).
- [ ] Returns correct HTTP status codes (`200`, `400`, `404`).
- [ ] All responses set `Content-Type: application/json`.
- [ ] Assembles request body stream correctly on `POST /api/echo`.
- [ ] Automated test suite passes with all green checkmarks.

## 10. Test cases
- **Status Endpoint:** `GET /api/status` returns 200 with `status: "online"`.
- **Echo Endpoint:** `POST /api/echo` with `{"message":"antigravity"}` echoes back payload.
- **Malformed JSON:** `POST /api/echo` with `"bad{json"` returns 400 Bad Request.
- **Unknown Route:** `GET /unknown` returns 404 Not Found.

## 11. Hints
1. *Concept:* Collect stream chunks in an array: `const chunks = []; req.on('data', c => chunks.push(c));`.
2. *Approach:* On `req.on('end')`, wrap `JSON.parse(Buffer.concat(chunks).toString())` in a `try/catch` to catch malformed payloads.
3. *Specifics:* Always set the header `'Content-Type': 'application/json'`.

## 12. Bonus challenge
Add a request size limit: if an incoming stream payload on `POST /api/echo` exceeds 10 kilobytes, destroy the request socket with `req.destroy()` and return HTTP 413 Payload Too Large.

## 13. Self-check
1. What is the difference between `res.write()` and `res.end()` in `node:http`?
2. Why is request body data received as streams of chunks rather than a single string variable?
3. What causes the dreaded `ERR_HTTP_HEADERS_SENT` error in Node.js?
4. What is a port number and why can't two servers listen on the same port at the same time?

## 14. References
- [Node.js: HTTP Module Documentation](https://nodejs.org/api/http.html)
- [Node.js: Anatomy of an HTTP Transaction](https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction)
