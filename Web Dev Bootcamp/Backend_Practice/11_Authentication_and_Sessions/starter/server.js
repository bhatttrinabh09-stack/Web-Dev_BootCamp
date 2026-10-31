import express from 'express';
import cookieParser from 'cookie-parser';
import { registerUser, loginUser } from './auth.js';

export const app = express();
app.use(express.json());
app.use(cookieParser());

// Registration
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await registerUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    // Set HttpOnly cookie
    res.cookie('session_user', user.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('session_user');
  res.status(200).json({ message: "Logged out successfully" });
});

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
