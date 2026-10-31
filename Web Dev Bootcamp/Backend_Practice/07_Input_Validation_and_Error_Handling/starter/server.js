import express from 'express';
import { validateRegistration } from './middleware/validateRegistration.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();
app.use(express.json());

// Registration endpoint protected by validation
app.post('/api/register', validateRegistration, (req, res) => {
  const { email, age } = req.body;
  res.status(201).json({
    message: "User registered successfully",
    user: { id: "u-" + Date.now(), email, age },
  });
});

// Crash test route to verify 500 handling
app.get('/api/crash-test', (req, res, next) => {
  // Simulate an unexpected runtime bug
  next(new Error("Database connection pool exhausted unexpectedly!"));
});

// Centralized error handler MUST be mounted LAST
app.use(errorHandler);

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
