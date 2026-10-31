// ==============================================================================
// Topic 03 Starter: Raw Node.js HTTP Server
// Run with: node server.js
// ==============================================================================

import http from 'node:http';

const PORT = 3000;

export const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Helper to send JSON responses
  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // TODO 1: Handle GET /api/status -> return { status: 'online', uptime: process.uptime() }

  // TODO 2: Handle GET /api/time -> return { iso: new Date().toISOString() }

  // TODO 3: Handle POST /api/echo
  //         Collect request body stream chunks:
  //         req.on('data', chunk => ...)
  //         req.on('end', () => { ... parse JSON, sendJson or 400 on parse error })

  // TODO 4: Default 404 for unhandled routes
  sendJson(404, { error: 'Not Found' });
});

// Start listening if run directly
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
