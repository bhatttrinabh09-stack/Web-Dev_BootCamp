# 21. Frontend Build and Deployment

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Contrast development mode (`npm run dev`) with production build artifacts (`npm run build`).
- Inspect and explain minification, tree-shaking, and content-hashing in the output `dist/` directory.
- Configure deployment for Single Page Applications (SPA rewrites / redirects) on platforms like Vercel, Netlify, or Cloudflare Pages.
- Configure custom domains, SSL/TLS certificates, and HTTPS enforcement.
- Diagnose and troubleshoot production build failures and runtime deployment bugs.
- Author professional project documentation (`README.md`) suitable for engineering portfolio presentations.

## 2. What is this?
**Build & Deployment** is the process of taking local, human-readable source code (TypeScript, React, CSS) and transforming it into optimized, production-ready static assets (HTML, CSS, JS bundles) served over a Global Content Delivery Network (CDN).

## 3. Why does it exist?
Code written for developer convenience (TypeScript types, JSX, unminified files, Hot Module Replacement servers) cannot and should not be served directly to end users. A production build strips development overhead, compresses assets, and enables lightning-fast caching on edge networks worldwide.

## 4. How does it work?
### The Build Pipeline:
```
Source Code (.tsx, .ts, .css) ──> Vite / Rollup ──> Output Artifacts in dist/
                                                         ├── index.html
                                                         ├── assets/index-a9f2b1.js (Minified, Tree-shaken)
                                                         └── assets/index-38c01d.css (Minified)
```

### The SPA Routing Dilemma (and Fix):
In an SPA, routes like `/dashboard` or `/profile/42` do NOT exist as physical HTML files on the server disk.
If a user bookmarks `https://myapp.com/dashboard` and refreshes:
- **Without Rewrite:** The web server searches for a file `/dashboard/index.html`, cannot find it, and returns `404 Not Found`!
- **With Rewrite Rule:** The web server redirects all incoming paths to `/index.html` (HTTP 200), letting React Router read the URL and render the correct view.

For Netlify: `/*    /index.html   200` (in `public/_redirects`).
For Vercel: rewrite rule in `vercel.json`.

## 5. Important concepts and syntax
- Content Hashing: Asset files include a hash in their name (e.g. `index-a9f2b1.js`). If code changes, the hash changes, busting browser cache instantly.
- Production environment variables: Configured in the hosting dashboard (e.g. Vercel Project Settings), never committed to Git.
- Deployment verification checklist:
  1. Build succeeds locally (`npm run build`).
  2. All test suites pass (`npm test`).
  3. No TypeScript type errors (`tsc --noEmit`).
  4. Routing rewrites verified on deep links.

## 6. Small worked example
A standard `vercel.json` SPA configuration:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 7. Common mistakes
1. **Hardcoding localhost URLs in production code:** Writing `fetch('http://localhost:5000/api')`. In production, this fails because the user's browser attempts to connect to their own local machine! Use `import.meta.env.VITE_API_BASE_URL`.
2. **Missing SPA rewrites:** Site works when navigating from the home page, but hard-refreshing `/products/12` throws a 404 error.
3. **Leaving debug logs and dead code:** Failing to verify production bundle size before shipping.

## 8. Coding challenge
**Environment:** Terminal & Hosting Dashboard.

Open `Frontend_Practice/21_Frontend_Build_and_Deployment/starter/`:
Prepare and document a production release:
1. Examine `package.json` and `vite.config.ts`.
2. Add the proper SPA rewrite configuration:
   - Create `public/_redirects` for Netlify (`/*  /index.html  200`).
   - Create `vercel.json` for Vercel.
3. Run `npm run build` in the starter directory.
4. Inspect the generated `dist/` directory: analyze bundle sizes.
5. Complete `DEPLOYMENT_CHECKLIST.md` documenting build checks, environment variables, and rollback steps.

## 9. Acceptance criteria
- [ ] `npm run build` generates production bundle in `dist/` without errors.
- [ ] SPA rewrite configuration files present (`_redirects` and `vercel.json`).
- [ ] `DEPLOYMENT_CHECKLIST.md` is thoroughly filled out.
- [ ] Zero committed secrets in source files.

## 10. Test cases
- **Build:** `npm run build` exits with code 0.
- **Preview:** `npm run preview` launches production preview server locally to verify built assets.
- **Deep Link:** Opening a deep route (e.g. `/preview`) resolves without 404.

## 11. Hints
1. *Concept:* Files in Vite's `public/` directory are copied as-is into the root of `dist/` during build.
2. *Approach:* Test your production build locally using `npm run preview` before deploying to the cloud.
3. *Specifics:* In `vercel.json`, ensure valid JSON syntax (no trailing commas).

## 12. Bonus challenge
Set up automated deployment using GitHub Actions: create `.github/workflows/deploy.yml` that runs linting, tests, and builds automatically on every push to `main`.

## 13. Self-check
1. Why does an SPA throw a 404 error when a user refreshes a sub-route on a static web host?
2. What is content-hashing in file names (e.g. `app.d83f2a.js`) and why does it enable long-term HTTP caching?
3. What is the difference between `npm run dev` and `npm run preview`?
4. What steps should you take immediately if a production deployment introduces a critical bug?

## 14. References
- [Vite: Building for Production](https://vite.dev/guide/build.html)
- [Vercel: Single Page Application Routing](https://vercel.com/docs/frameworks/vite)
- [Netlify: Redirects and Rewrites](https://docs.netlify.com/routing/redirects/)
