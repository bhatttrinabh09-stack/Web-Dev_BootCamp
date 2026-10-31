# Production Deployment Verification Checklist

Use this checklist before and after deploying your frontend application to production.

## Pre-Deployment Verification
- [ ] TypeScript check passed: `npx tsc --noEmit` returns zero errors.
- [ ] Unit and integration test suites pass with 100% success rate.
- [ ] Production build succeeds locally: `npm run build` completes cleanly.
- [ ] Production preview verified locally: `npm run preview`.
- [ ] No hardcoded `localhost` URLs exist in API client files.
- [ ] All environment variables are documented with fallback placeholders in `.env.example`.
- [ ] Zero private secrets or API keys are committed in Git history.

## Routing & Asset Configuration
- [ ] SPA catch-all rewrite rule configured (`_redirects` for Netlify, `vercel.json` for Vercel).
- [ ] Verified that refreshing a nested route (e.g. `/items/42`) loads correctly without 404.
- [ ] Favicon, page title, and meta viewport tags are configured in `index.html`.

## Post-Deployment Smoke Test
- [ ] Application loads over HTTPS with a valid SSL/TLS certificate.
- [ ] Browser DevTools console contains zero uncaught errors or network 404s.
- [ ] Primary user journeys (e.g. browsing, searching, submitting forms) operate successfully.
- [ ] Lighthouse audit scores >= 90 across Performance, Accessibility, and Best Practices.

## Emergency Rollback Plan
Document the steps to restore the previous stable release if this deployment fails:
1. ...
2. ...
