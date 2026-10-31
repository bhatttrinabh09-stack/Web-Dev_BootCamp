# 01. Node.js and NPM

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain what the Node.js runtime is and how the Google V8 engine runs JavaScript on servers and operating systems.
- Contrast browser APIs (`window`, `document`, DOM) with Node.js APIs (`process`, `fs`, `os`, `path`).
- Execute JavaScript scripts and interactive sessions via the Node.js REPL.
- Manage packages and dependencies using `npm` (Node Package Manager).
- Configure scripts and dependencies inside `package.json`.
- Build a standalone Command-Line Interface (CLI) utility.

## 2. What is this?
**Node.js** is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 engine. Prior to Node.js, JavaScript could only execute inside web browsers. Node allows JavaScript to run directly on your operating system as server applications, system tools, and background services.

## 3. Why does it exist?
Traditionally, backends were written in different languages (Java, PHP, Python, Ruby), requiring developers to switch mental models and syntax between frontend and backend. Node.js enables full-stack JavaScript. Moreover, its asynchronous, non-blocking I/O model is uniquely suited for handling thousands of concurrent network connections efficiently.

## 4. How does it work?
Node.js Architecture:

```
[ Your JavaScript Code ]
          │
          ▼
[ V8 Engine (Google) ] ── Compiles JS to machine code
          │
          ▼
[ Node.js Bindings / Core APIs (fs, http, crypto, path) ]
          │
          ▼
[ Libuv (C Library) ] ── Manages Event Loop, Thread Pool & Asynchronous OS I/O
```

### Browser vs Node.js Environment:
| Feature | Browser | Node.js |
|---|---|---|
| Global Object | `window` | `global` / `globalThis` |
| DOM & Document | Available (`document.querySelector`) | Does not exist! |
| File System Access | Prohibited (sandboxed) | Full access (`node:fs`) |
| Network Server | Cannot listen on ports | Built-in HTTP server (`node:http`) |
| System Process | Restricted | Direct access (`process.env`, `process.argv`) |

## 5. Important concepts and syntax
- `process.argv`: Array containing command-line arguments passed to the script.
- `process.env`: Object containing operating system environment variables.
- `process.exit(code)`: Terminate current process (`0` for success, non-zero for error).
- `package.json`: Project manifest file created via `npm init -y`.
- Running scripts: `node script.js` or `npm run <script-name>`.

## 6. Small worked example
A Node.js command-line argument inspector:

```javascript
// cli-demo.js
console.log("Node version:", process.version);
console.log("Current working directory:", process.cwd());

// process.argv[0] is node binary path
// process.argv[1] is script path
// process.argv[2...] are user arguments
const args = process.argv.slice(2);
console.log("User arguments passed:", args);

if (args.length === 0) {
  console.log("Usage: node cli-demo.js <name>");
  process.exit(1);
}

console.log(`Hello, ${args[0]}!`);
```

## 7. Common mistakes
1. **Trying to access `window` or `document` in Node:** Running code that calls `document.getElementById()` in Node throws `ReferenceError: document is not defined`.
2. **Hardcoding global npm installations:** Using `npm install -g` for project dependencies. Project dependencies must always be saved locally in `package.json`.
3. **Assuming Node is multi-threaded for JavaScript execution:** Your JavaScript runs on a single thread. Heavy CPU-bound loops (like computing primes) will block all incoming server requests unless offloaded to worker threads.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Backend_Practice/01_Node_js_and_NPM/starter/`:
Build a System Diagnostics & Text Stats CLI utility in `cli.js`:
1. Parse command-line arguments using `process.argv.slice(2)`:
   - Flag `--info`: Prints system information: Node version, OS platform (`os.platform()`), and total memory in MB (`os.totalmem()`).
   - Flag `--count <words...>`: Counts total words passed and prints word count and character count.
   - If no arguments or unknown flags are passed, prints a clean `--help` guide and exits with code 1.
2. Configure `package.json` with a custom script `"start": "node cli.js"`.
3. Run `npm test` to verify CLI argument parsing and error exits.

## 9. Acceptance criteria
- [ ] Uses built-in `process` and `node:os` modules.
- [ ] Handles `--info`, `--count`, and invalid flag arguments.
- [ ] Exits with code `1` when missing required arguments.
- [ ] Automated tests in `test_cli.js` pass.

## 10. Test cases
- **Info:** `node cli.js --info` -> outputs Node version and OS platform.
- **Count:** `node cli.js --count hello world from node` -> outputs `Words: 4, Characters: 20`.
- **Error:** `node cli.js --unknown` -> exits with code 1 and prints help guide.

## 11. Hints
1. *Concept:* Import the built-in operating system module using `import os from 'node:os';`.
2. *Approach:* Check `args[0]` using a `switch` or `if/else` block.
3. *Specifics:* Convert bytes to megabytes with `Math.round(os.totalmem() / (1024 * 1024))`.

## 12. Bonus challenge
Use `node:readline` to make the CLI interactive, prompting the user for questions in the terminal if no command-line flags are provided.

## 13. Self-check
1. What is the role of the V8 engine in Node.js?
2. Why is `document` undefined in a Node.js script?
3. What is the difference between `dependencies` and `devDependencies` in `package.json`?
4. What information is stored in `process.argv`?

## 14. References
- [Node.js Official Learn](https://nodejs.org/en/learn)
- [Node.js: Process API](https://nodejs.org/api/process.html)
- [Node.js: OS API](https://nodejs.org/api/os.html)
