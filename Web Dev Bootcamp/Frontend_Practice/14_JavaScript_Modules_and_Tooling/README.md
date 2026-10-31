# 14. JavaScript Modules and Tooling

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Modularize code using standard ES Modules (`import` and `export`).
- Distinguish between default exports and named exports.
- Understand the role of Node.js and npm as development environment tools.
- Read and configure `package.json`, semantic versioning (`^`, `~`), and lockfiles (`package-lock.json`).
- Explain what a modern build tool and development server (**Vite**) does: Hot Module Replacement (HMR), bundling, transpilation, and asset optimization.

## 2. What is this?
**ES Modules (ESM)** is the official ECMAScript standard for breaking JavaScript code into reusable, isolated files with explicit dependencies. **Vite** is a modern frontend development server and bundler that provides near-instant local server start and optimized production builds.

## 3. Why does it exist?
Early web development relied on loading dozens of `<script>` tags in HTML. All variables polluted the global `window` object, leading to naming collisions, unpredictable load orders, and unmaintainable monolithic files. Modules provide strict scoping and encapsulation.

## 4. How does it work?
In an ES Module, each file is its own isolated scope:

```javascript
// math.js - Named Export
export function add(a, b) { return a + b; }
export const PI = 3.14159;

// main.js - Named Import
import { add, PI } from './math.js';
console.log(add(2, 3));
```

In HTML:
```html
<script type="module" src="./src/main.js"></script>
```
The browser downloads imported files via HTTP/2 in parallel, honoring the dependency graph.

### What Vite Does:
- **In Development:** Serves source code over native ESM without pre-bundling. Edits trigger Hot Module Replacement (HMR) updating the browser in milliseconds without losing application state.
- **In Production:** Uses Rollup to bundle, minify, tree-shake (remove unused dead code), and generate content-hashed asset files for high-speed caching.

## 5. Important concepts and syntax
- Named Export: `export const formatCurrency = ...;` -> `import { formatCurrency } from './utils.js';`
- Default Export: `export default class Store { ... }` -> `import Store from './Store.js';`
- `package.json`: Manifest file containing metadata, scripts (`"dev": "vite"`), and dependencies (`dependencies` for production, `devDependencies` for development/testing).
- Semantic Versioning (`MAJOR.MINOR.PATCH`):
  - `^1.2.3`: Allows minor updates (`1.3.0`, but not `2.0.0`).
  - `~1.2.3`: Allows patch updates (`1.2.4`, but not `1.3.0`).

## 6. Small worked example
Separating concerns into modules:

```javascript
// src/services/storage.js
export function saveItem(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// src/main.js
import { saveItem } from './services/storage.js';
saveItem('theme', 'dark');
```

## 7. Common mistakes
1. **Forgetting `.js` extension in native browser imports:** Browsers require `import { add } from './math.js';`. Omitting the file extension causes a 404 in native ESM.
2. **Mixing up named and default imports:** Attempting `import myFunc from './utils.js'` when `myFunc` was exported as a named export (`export function myFunc`) results in `undefined`.
3. **Committing `node_modules/` to Git:** Never commit the dependencies directory! Commit only `package.json` and `package-lock.json`.

## 8. Coding challenge
**Environment:** Terminal & Browser (Vite).

Open `Frontend_Practice/14_JavaScript_Modules_and_Tooling/starter/`:
You are given a modular application scaffold:
1. Examine `package.json` and inspect the dev script.
2. In `src/currency.js`: Export named functions `formatUSD(amount)` and `convertEURtoUSD(eur, rate)`.
3. In `src/cart.js`: Implement a `Cart` class and export it as the **default export**. The cart tracks items, calculates subtotal, and calculates tax.
4. In `src/main.js`: Import both modules, attach event listeners to the shopping cart UI, and verify the calculations.
5. In your terminal, run `npm install` followed by `npm run dev` to start Vite. Open the localhost URL in your browser.

## 9. Acceptance criteria
- [ ] Clean separation of concerns across `currency.js`, `cart.js`, and `main.js`.
- [ ] Uses both named and default ES module exports appropriately.
- [ ] Running `npm run dev` launches the Vite server with zero terminal errors.
- [ ] Shopping cart calculates total and tax correctly in the browser.

## 10. Test cases
- **Normal:** Adding items updates cart total using formatted currency strings.
- **Vite HMR:** Editing text in `main.js` updates the browser instantly via Hot Module Replacement.
- **Build:** Running `npm run build` generates optimized production assets in `dist/`.

## 11. Hints
1. *Concept:* Remember default exports are imported without curly braces: `import Cart from './cart.js'`.
2. *Approach:* In Vite, static CSS is imported directly into JavaScript: `import './style.css';`.
3. *Specifics:* Run `node -v` to ensure you are on a current Node LTS before running `npm install`.

## 12. Bonus challenge
Run `npm run build` and inspect the generated `dist/` directory. Look at the minified bundle and analyze how Vite performed tree-shaking on unused functions.

## 13. Self-check
1. What is the difference between a named export and a default export?
2. What is the purpose of `package-lock.json` and why should it always be committed to Git?
3. What is Hot Module Replacement (HMR) and why is it superior to full-page reloads?
4. What is the difference between `dependencies` and `devDependencies` in `package.json`?

## 14. References
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Vite Official Guide](https://vite.dev/guide/)
- [npm package.json Documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
