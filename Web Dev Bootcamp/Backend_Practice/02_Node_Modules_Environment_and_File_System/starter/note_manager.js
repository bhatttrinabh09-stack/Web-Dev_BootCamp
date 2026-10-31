// ==============================================================================
// Topic 02 Starter: Defensive Persistent Note Manager
// Follow instructions in README.md section 8.
// ==============================================================================

import fs from 'node:fs/promises';
import path from 'node:path';

// Read path from process.env.NOTES_FILE_PATH with fallback
const targetPath = process.env.NOTES_FILE_PATH || './notes_data.json';
const NOTES_FILE = path.resolve(targetPath);

/**
 * Loads notes from JSON file. Returns empty array if file does not exist.
 * @returns {Promise<Array<{ id: string, title: string, content: string, createdAt: string }>>}
 */
export async function loadNotes() {
  // TODO 1: Read NOTES_FILE using fs.readFile
  //         If error.code === 'ENOENT', return []
  //         Parse JSON and return notes array
  throw new Error("TODO: Implement loadNotes");
}

/**
 * Appends a new note to persistent storage.
 */
export async function saveNote(title, content) {
  // TODO 2: Validate title and content (must be non-empty strings)
  //         Load existing notes
  //         Create new note object with id and createdAt
  //         Write back to disk with fs.writeFile
  //         Return the newly created note object
  throw new Error("TODO: Implement saveNote");
}

/**
 * Retrieves a note by ID or returns null.
 */
export async function getNoteById(id) {
  // TODO 3: Load notes and find matching note by id
  throw new Error("TODO: Implement getNoteById");
}
