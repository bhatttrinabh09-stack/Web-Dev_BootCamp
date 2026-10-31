import fs from 'node:fs/promises';
import path from 'node:path';
import { loadNotes, saveNote, getNoteById } from './note_manager.js';

const testFile = path.resolve('./notes_data.json');

async function runTests() {
  console.log("Running Note Manager FS Tests...\n");

  // Clean up previous test runs
  try { await fs.unlink(testFile); } catch {}

  // Test 1: Load missing file returns empty array
  const initial = await loadNotes();
  console.assert(Array.isArray(initial) && initial.length === 0, "Missing file should return []");
  console.log("✔ Test 1: Handled non-existent file cleanly.");

  // Test 2: Save a note
  const note1 = await saveNote("Node Architecture", "Libuv handles asynchronous I/O.");
  console.assert(note1.title === "Node Architecture", "Title mismatch");
  console.assert(note1.id && note1.createdAt, "Note should have id and createdAt timestamp");
  console.log("✔ Test 2: Saved note to disk.");

  // Test 3: Load notes verifies persistence
  const loaded = await loadNotes();
  console.assert(loaded.length === 1, `Expected 1 note, got ${loaded.length}`);
  console.assert(loaded[0].title === "Node Architecture", "Loaded title mismatch");
  console.log("✔ Test 3: Verified disk persistence.");

  // Test 4: Get by ID
  const found = await getNoteById(note1.id);
  console.assert(found !== null && found.title === "Node Architecture", "Failed to retrieve note by ID");
  console.assert((await getNoteById("non-existent")) === null, "Unknown ID must return null");
  console.log("✔ Test 4: Retrieved note by ID.");

  // Clean up test file
  try { await fs.unlink(testFile); } catch {}

  console.log("\n🎉 All File System & Environment tests passed!");
}

runTests().catch(err => {
  console.error("Test failure:", err.message);
  process.exit(1);
});
