// ==============================================================================
// Topic 12 Starter: Role & Ownership Authorization Guards
// ==============================================================================

import { notesDb } from '../data/notes.js';

/**
 * Enforces specific user role ('admin', etc.)
 */
export function requireRole(role) {
  return (req, res, next) => {
    // TODO: Verify req.user.role === role. If not, return 403 Forbidden
    throw new Error("TODO: Implement requireRole");
  };
}

/**
 * Enforces resource ownership (User must own the note to modify/delete)
 */
export function requireOwnership(req, res, next) {
  const noteId = req.params.id;
  const note = notesDb.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  // TODO: Check if note.userId === req.user.id or req.user.role === 'admin'
  // If not -> return res.status(403).json({ error: "Forbidden: Not your resource" })
  throw new Error("TODO: Implement requireOwnership");
}
