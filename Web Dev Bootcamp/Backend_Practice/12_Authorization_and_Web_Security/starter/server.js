import express from 'express';
import { requireRole, requireOwnership } from './middleware/authorize.js';
import { notesDb } from './data/notes.js';

export const app = express();
app.use(express.json());

// Simulated Authentication Middleware (reads user from test header)
app.use((req, res, next) => {
  const simulatedId = req.headers['x-user-id'] || 'user-alpha';
  const simulatedRole = req.headers['x-user-role'] || 'member';
  req.user = { id: simulatedId, role: simulatedRole };
  next();
});

// Admin-Only Route
app.get('/api/admin/metrics', requireRole('admin'), (req, res) => {
  res.status(200).json({ systemHealth: "Optimal", activeUsers: 420 });
});

// Protected Delete Route (Requires Ownership)
app.delete('/api/notes/:id', requireOwnership, (req, res) => {
  const index = notesDb.findIndex(n => n.id === req.params.id);
  notesDb.splice(index, 1);
  res.status(204).send();
});

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
