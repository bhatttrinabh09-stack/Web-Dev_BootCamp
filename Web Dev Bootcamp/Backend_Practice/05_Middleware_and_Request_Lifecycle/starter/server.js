// ==============================================================================
// Topic 05 Starter: Custom Express Middleware
// Follow instructions in README.md section 8.
// ==============================================================================

import express from 'express';

export const app = express();
app.use(express.json());

const VALID_API_KEY = "super-secret-key";

/**
 * 1. Request Logger Middleware
 * Logs incoming request method & URL, adds start time
 */
export function requestLogger(req, res, next) {
  // TODO: Log request, call next()
  console.log(`[${req.method}] ${req.url}`);
  next();
}

/**
 * 2. API Key Authentication Guard Middleware
 */
export function apiKeyAuthGuard(req, res, next) {
  // TODO:
  // 1. Check req.headers['x-api-key']
  // 2. If valid, call next()
  // 3. If invalid or missing, return res.status(401).json({ error: "Invalid or missing API key" })
  throw new Error("TODO: Implement apiKeyAuthGuard");
}

// Register global logger
app.use(requestLogger);

// Public Route (No auth needed)
app.get('/api/public-data', (req, res) => {
  res.status(200).json({ message: "This is public data accessible by all." });
});

// Protected Route (Requires apiKeyAuthGuard)
app.get('/api/secret-data', apiKeyAuthGuard, (req, res) => {
  res.status(200).json({ secret: "Classified engineering data." });
});

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
