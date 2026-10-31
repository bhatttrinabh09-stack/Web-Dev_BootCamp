# Project 01: Personal Profile and Developer Showcase

## 1. Project Overview & Objective
Build and deploy a semantic, fully accessible, responsive personal developer profile site. This project establishes your digital presence as an engineer, showcasing your skills, bio, featured projects, and contact channels.

## 2. Target User & Persona
- **Audience:** Tech recruiters, engineering hiring managers, and open-source collaborators.
- **Goal:** Rapidly understand your technical competencies, review live project links, and contact you easily across mobile or desktop devices.

## 3. Core Requirements
- **Semantic HTML5:** Uses proper document landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) with zero skipped heading levels (`<h1>` -> `<h2>` -> `<h3>`).
- **Responsive Layout:** Mobile-first styling utilizing CSS Flexbox and CSS Grid. Seamless layout transitions across mobile (<640px), tablet (640px-1024px), and desktop (>1024px).
- **Accessibility (a11y):** All images have descriptive `alt` text; all interactive links have descriptive names (no "click here"); color contrast passes WCAG AA (>= 4.5:1); full keyboard navigation support with visible focus indicators.
- **Design Tokens:** Clean CSS custom properties for palette, typography, and spacing.
- **Live Deployment:** Deployed to a free static host (GitHub Pages, Netlify, or Vercel) with HTTPS.

## 4. Acceptance Criteria
- [ ] Validated with W3C HTML5 validator (zero errors).
- [ ] No horizontal scrolling on screens down to 320px width.
- [ ] Focus rings are clearly visible when navigating with the `Tab` key.
- [ ] Lighthouse audit scores >= 95 in Accessibility and Best Practices.
- [ ] Deployed public URL works and is documented in project README.

## 5. Test & Quality Checklist
- [ ] Tested in Chrome, Firefox, and mobile viewport emulation.
- [ ] Checked color contrast with WebAIM or DevTools picker.
- [ ] Verified that disabling CSS keeps the content completely readable in logical document order.

## 6. Final Reflection
After deploying, answer these questions in your personal learning notes:
1. *What specific semantic tags did you choose for your project showcase section and why?*
2. *How did `box-sizing: border-box` simplify your card layout?*
3. *What was the most challenging responsive breakpoint to tune and why?*
