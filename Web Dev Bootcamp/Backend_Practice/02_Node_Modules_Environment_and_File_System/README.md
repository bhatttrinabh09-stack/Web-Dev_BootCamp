# 02. Node Modules, Environment, and File System

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Compare CommonJS (`require` / `module.exports`) with modern ES Modules (`import` / `export`) in Node.js.
- Perform asynchronous file system operations using `node:fs/promises` (`readFile`, `writeFile`, `mkdir`).
- Resolve file system paths safely across operating systems using `node:path`.
- Configure application settings using environment variables (`process.env`) and `.env` files.
- Protect secrets from version control leaks using `.env` and `.gitignore`.
- Build a persistent JSON file data manager that handles missing files and parse errors defensively.

## 2. What is this?
**File System (`node:fs`)** and **Path (`node:path`)** are core Node.js modules that permit reading, writing, and organizing files on the server's hard drive. **Environment Variables** are dynamic key-value pairs set outside the application code to configure database connections, port numbers, and secret API keys according to the environment (development, staging, production).

## 3. Why does it exist?
Hardcoding file paths (like `C:\Users\Sarah\data.json`) breaks immediately when deployed to a Linux server. Hardcoding secrets (database passwords, private keys) inside source code leads to security breaches as soon as the code is pushed to GitHub. Environment variables separate code from configuration.

## 4. How does it work?
### Module Systems in Node:
- **CommonJS (Legacy standard):** `const fs = require('fs');` (Synchronous loading).
- **ES Modules (Modern standard):** `import fs from 'node:fs/promises';` (Specified via `"type": "module"` in `package.json`).

### Safe Path Resolution:
Operating systems use different path separators (Windows uses `\`, POSIX/Mac/Linux uses `/`). Always use `path.join` or `path.resolve`:
```javascript
import path from 'node:path';
const filePath = path.resolve('data', 'users.json');
```

### The Secret Safety Lifecycle:
```
Local Computer (.env file with real secrets) ── [ .gitignore blocks .env ] ──> GitHub Repo (Only .env.example)
                                                                                     │
Production Server ── Receives environment variables via host dashboard <──────────────┘
```

## 5. Important concepts and syntax
- `fs.readFile(path, 'utf-8')`: Asynchronously read file contents.
- `fs.writeFile(path, stringContent, 'utf-8')`: Asynchronously write or overwrite file.
- `path.resolve(...segments)`: Resolves an absolute path.
- `path.dirname(filePath)`: Gets directory name.
- Reading environment variables: `const PORT = process.env.PORT || 3000;`.

## 6. Small worked example
Defensive JSON file reader:

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';

async function readJsonSafely(filename, defaultValue = []) {
  const fullPath = path.resolve(filename);
  try {
    const raw = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`File ${filename} not found. Returning default.`);
      return defaultValue;
    }
    throw new Error(`Corrupted JSON in ${filename}: ${err.message}`);
  }
}
```

## 7. Common mistakes
1. **Using synchronous fs methods in server code:** Calling `fs.readFileSync()` on a running web server blocks all concurrent requests while reading from disk! Always use `fs/promises`.
2. **Concatenating path strings manually:** Writing `__dirname + '/data/' + file` fails on Windows. Use `path.join(__dirname, 'data', file)`.
3. **Committing `.env` to Git:** Pushing API credentials or database passwords to public repositories.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Backend_Practice/02_Node_Modules_Environment_and_File_System/starter/`:
Build a Persistent Note Storage utility in `note_manager.js`:
1. The note storage file path must be read from the environment variable `NOTES_FILE_PATH`. If not set, default to `./notes_data.json`.
2. Implement `loadNotes()`:
   - Reads and parses the JSON file asynchronously.
   - If the file does not exist (`ENOENT`), returns an empty array `[]` without throwing an error.
3. Implement `saveNote(title, content)`:
   - Validates that title and content are non-empty strings.
   - Appends `{ id: Date.now().toString(), title, content, createdAt: new Date().toISOString() }`.
   - Writes the updated array back to disk with formatted indentation (`JSON.stringify(notes, null, 2)`).
4. Implement `getNoteById(id)`: Returns matching note or `null`.
5. Run `node test_notes.js` to execute automated integration tests.

## 9. Acceptance criteria
- [ ] Uses asynchronous `node:fs/promises` and `node:path`.
- [ ] Handles missing file condition (`ENOENT`) gracefully.
- [ ] Reads file path from `process.env.NOTES_FILE_PATH` with fallback.
- [ ] All automated tests pass with clean exit.

## 10. Test cases
- **Missing File:** Calling `loadNotes()` when no file exists returns `[]` without crashing.
- **Write and Read:** Saving two notes writes valid JSON to disk; subsequent load returns both.
- **Validation:** Attempting to save a note with an empty title throws an Error.

## 11. Hints
1. *Concept:* Wrap the `fs.readFile` call in `try/catch`. Check `if (err.code === 'ENOENT')`.
2. *Approach:* Use `await fs.writeFile(filePath, JSON.stringify(notes, null, 2), 'utf-8')`.
3. *Specifics:* Clean up any generated test JSON files in a `finally` block or test teardown.

## 12. Bonus challenge
Add an atomic write strategy: write new note data to a temporary file (`notes_data.json.tmp`) first, and then rename it to `notes_data.json` using `fs.rename()`. This guarantees zero data corruption if the system crashes mid-write!

## 13. Self-check
1. Why is `fs.readFile` preferred over `fs.readFileSync` in backend server applications?
2. What does the `ENOENT` error code mean in Node.js?
3. Why should `.env` files always be excluded in `.gitignore`?
4. What is the difference between `path.join()` and `path.resolve()`?

## 14. References
- [Node.js: File System API (Promises)](https://nodejs.org/api/fs.html#promises-api)
- [Node.js: Path API](https://nodejs.org/api/path.html)
- [Twelve-Factor App: Config in Environment](https://12factor.net/config)
