# 01. Web and Internet Foundations

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Articulate the distinction between the physical Internet and the World Wide Web.
- Trace the lifecycle of a web request from URL bar to browser render.
- Identify the components of a URL (protocol, subdomain, domain, port, path, query parameters, hash).
- Decode HTTP request and response anatomy (methods, status codes, headers, body).
- Explain how the browser constructs the DOM, CSSOM, Render Tree, Layout, and Paint.

## 2. What is this?
The **Internet** is a global decentralized network of physical computers connected by fiber-optic cables, routers, and switches communicating via TCP/IP.
The **World Wide Web** (WWW) is an application layer built on top of the Internet that enables documents, media, and services to be linked and transferred via HTTP/HTTPS.

## 3. Why does it exist?
Understanding the underlying network and browser mechanics prevents you from writing slow, insecure, or brittle applications. You cannot optimize rendering, troubleshoot CORS errors, or design scalable APIs without understanding how packets move across the network and how browsers paint pixels.

## 4. How does it work?
When you enter `https://api.example.com/users?page=2` into your browser:

```
[Browser] ── 1. DNS Lookup ──> [DNS Server] (Resolves domain to IP: 93.184.216.34)
    │
    ├───── 2. TCP Handshake (SYN, SYN-ACK, ACK) + TLS Negotiation
    │
    ├───── 3. Sends HTTP GET Request
    │         GET /users?page=2 HTTP/1.1
    │         Host: api.example.com
    │         Accept: application/json
    │
    ▼
[Server]  ── 4. Processes request, queries DB, crafts response
    │
    ├───── 5. Sends HTTP Response
    │         HTTP/1.1 200 OK
    │         Content-Type: application/json
    │         {"data": [...]}
    ▼
[Browser] ── 6. Critical Rendering Path:
             HTML -> DOM
             CSS  -> CSSOM
             DOM + CSSOM -> Render Tree -> Layout (Reflow) -> Paint -> Composite
```

## 5. Important concepts and syntax
- **DNS (Domain Name System):** The internet's address book mapping human-readable domain names (e.g., `google.com`) to numeric IP addresses (e.g., `142.250.190.46`).
- **Port:** A virtual communication endpoint (e.g. `80` for HTTP, `443` for HTTPS, `3000` or `5173` for local dev).
- **HTTP Methods:**
  - `GET`: Retrieve resource (safe, idempotent, no request body).
  - `POST`: Create resource or trigger action (non-idempotent, has request body).
  - `PUT`: Replace resource completely.
  - `PATCH`: Partially update resource.
  - `DELETE`: Remove resource.
- **HTTP Status Code Categories:**
  - `1xx`: Informational.
  - `2xx`: Success (`200 OK`, `201 Created`, `204 No Content`).
  - `3xx`: Redirection (`301 Moved Permanently`, `304 Not Modified`).
  - `4xx`: Client Error (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`).
  - `5xx`: Server Error (`500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`).

## 6. Small worked example
Analyzing a raw HTTP request and response:

```http
# Client Request
GET /articles/hello-world HTTP/1.1
Host: blog.example.com
User-Agent: Mozilla/5.0
Accept: text/html

# Server Response
HTTP/1.1 200 OK
Date: Sat, 31 Oct 2026 03:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 124

<!DOCTYPE html>
<html>
  <head><title>Hello</title></head>
  <body><h1>Hello World</h1></body>
</html>
```
*Explanation:* The client asks for `/articles/hello-world` using HTTP method `GET`. The server responds with `200 OK`, specifies the payload type via `Content-Type: text/html`, and provides the HTML bytes in the response body.

## 7. Common mistakes
1. **Confusing Client Error (4xx) with Server Error (5xx):** A `404` means the requested route was not found or the client supplied a bad URL; it is not a crash in server code.
2. **Assuming `POST` is secure simply because data is in the body:** HTTP traffic is plaintext! Only HTTPS (TLS encryption) protects data in transit from eavesdroppers.
3. **Assuming DOM construction waits for all images to download:** The browser constructs the DOM from HTML as bytes stream in, requesting linked assets (CSS, JS, images) in parallel.

## 8. Coding challenge
**Environment:** Browser DevTools & Terminal (Node.js).

Open `Frontend_Practice/01_Web_and_Internet_Foundations/starter/`.
1. Inspect the file `starter/request_analysis.js`.
2. Implement the parsing function `parseUrl(rawUrl)` which takes a raw URL string and decomposes it into:
   - `protocol` (e.g. `'https:'`)
   - `hostname` (e.g. `'api.example.com'`)
   - `port` (e.g. `'443'` or default)
   - `pathname` (e.g. `'/v1/users'`)
   - `queryParams` (an object mapping keys to values)
   - `hash` (e.g. `'#profile'`)
3. Implement `categorizeStatusCode(code)` returning category names: `'Informational'`, `'Success'`, `'Redirection'`, `'Client Error'`, `'Server Error'`, or `'Invalid'`.
4. Run `node starter/request_analysis.js` and ensure all assertions pass.

## 9. Acceptance criteria
- [ ] `parseUrl()` correctly parses query strings into key-value pairs without external libraries.
- [ ] Handles URLs with and without explicit ports and hashes.
- [ ] `categorizeStatusCode()` correctly categorizes standard HTTP status codes.
- [ ] Running `node starter/request_analysis.js` prints all green checkmarks.

## 10. Test cases
- **Normal:** `parseUrl('https://example.com:8080/search?q=javascript&sort=asc#top')` -> port `'8080'`, query `{ q: 'javascript', sort: 'asc' }`.
- **Edge:** `parseUrl('http://localhost/')` -> pathname `'/'`, empty query `{}`.
- **Failure:** `categorizeStatusCode(999)` returns `'Invalid'`.

## 11. Hints
1. *Concept:* Look at the built-in JavaScript `URL` and `URLSearchParams` objects available in both Node.js and modern browsers.
2. *Approach:* `new URL(rawUrl)` automatically parses components; `url.searchParams.entries()` gives query pairs.
3. *Specifics:* For status codes, divide by 100 or use numerical range checks (`code >= 200 && code <= 299`).

## 12. Bonus challenge
Use your browser DevTools Network tab on any major website (e.g. `wikipedia.org`). Find the initial document request:
- What HTTP protocol version was negotiated? (HTTP/2, HTTP/3?)
- What was the response status and `Content-Type`?
- What IP address and remote port were connected to?

## 13. Self-check
1. What is the fundamental difference between an IP address and a domain name?
2. Why is HTTP called a "stateless" protocol?
3. What is the difference between Reflow (Layout) and Repaint in the browser rendering pipeline? Which is computationally heavier?
4. If a server returns status `301`, what does the client do next?

## 14. References
- [MDN: How the Web Works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_the_Web_works)
- [MDN: Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [MDN: Populating the page: how browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)
