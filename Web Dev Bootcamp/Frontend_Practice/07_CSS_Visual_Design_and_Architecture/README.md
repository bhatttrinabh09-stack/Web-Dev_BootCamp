# 07. CSS Visual Design and Architecture

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Construct an organized CSS architecture using Custom Properties (CSS variables) for tokens (colors, spacing, typography).
- Implement consistent typography scales and ensure WCAG AA color contrast ratios (minimum 4.5:1 for normal text).
- Author smooth, hardware-accelerated transitions and transforms without layout thrashing.
- Implement accessible motion respecting the user's `prefers-reduced-motion` operating system preferences.
- Organize maintainable component styles without deep nesting or fragile specificity wars.

## 2. What is this?
**CSS Architecture** is the methodology used to structure style sheets for maintainability, reusability, and scale. **Design Tokens** (stored as CSS custom properties) define the foundational visual primitives of an interface: primary and neutral color palettes, spacing units, border radii, and font hierarchies.

## 3. Why does it exist?
Without architecture, CSS files quickly turn into thousands of lines of unmaintainable rules with arbitrary pixel values (`padding: 13px; margin-top: 7px; color: #324a5b`), repetitive definitions, and specificity conflicts solved only by spamming `!important`. A tokenized design system ensures visual harmony and effortless theming (e.g. dark mode).

## 4. How does it work?
CSS Custom Properties inherit down the DOM tree and can be redefined dynamically:

```css
:root {
  /* Design Tokens */
  --color-primary: #2563eb;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --radius-md: 0.5rem;
}

[data-theme="dark"] {
  --color-surface: #0f172a;
  --color-text: #f8fafc;
}

.button {
  background-color: var(--color-primary);
  color: var(--color-surface);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
}
```

### Motion and Accessibility:
Not all users tolerate animations. Vestibular disorders cause nausea from motion. Always wrap non-essential motion in:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 5. Important concepts and syntax
- Declaring tokens: `--token-name: value;` inside `:root`.
- Consuming tokens: `color: var(--token-name, fallback);`.
- High-Performance Transitions: Only animate `transform` and `opacity`. Animating `width`, `height`, or `top` triggers costly browser Layout (reflow) calculations!
- BEM (Block Element Modifier) Naming Convention:
  - Block: `.card`
  - Element: `.card__title`, `.card__button`
  - Modifier: `.card--featured`, `.card__button--disabled`

## 6. Small worked example
A high-performance interactive button with transform animation:

```css
.btn {
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  /* Animate only transform and opacity for 60fps GPU smoothness */
  transition: transform 150ms ease, opacity 150ms ease;
}

.btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.btn:active {
  transform: translateY(0);
}
```

## 7. Common mistakes
1. **Low color contrast:** Using light grey text (`#aaa`) on white backgrounds (`#fff`), which fails WCAG AA contrast guidelines (fails 4.5:1 ratio).
2. **Animating geometry properties:** Creating hover effects with `transition: width 0.3s` instead of `transform: scaleX(...)`, causing browser jitter and battery drain on mobile devices.
3. **Hardcoding magic numbers:** Scattering ad-hoc pixel values across 20 CSS files instead of referencing spacing variables.

## 8. Coding challenge
**Environment:** Browser & CSS Editor.

Open `Frontend_Practice/07_CSS_Visual_Design_and_Architecture/starter/`:
1. Open `variables.css` and define a comprehensive design token system:
   - Primary, secondary, surface, background, and text colors.
   - Spacing scale based on 4px/8px multiples (`--space-1`: 0.25rem, `--space-2`: 0.5rem, `--space-4`: 1rem, `--space-6`: 1.5rem, etc.).
   - Font scale using `rem`.
2. In `components.css`, create reusable classes for:
   - Alert banners: `.alert`, `.alert--info`, `.alert--success`, `.alert--danger`.
   - Badges: `.badge`, `.badge--primary`, `.badge--warning`.
   - Interactive Card with subtle scale hover effect (`transform: scale(1.02)`).
3. Ensure all text meets WCAG AA contrast (test in browser DevTools or color picker).
4. Add a `prefers-reduced-motion` media query that disables transitions for users who request reduced motion.

## 9. Acceptance criteria
- [ ] All colors and spacing are driven by CSS custom properties.
- [ ] Components use consistent naming conventions.
- [ ] Hover animations use `transform` and `opacity` exclusively.
- [ ] `prefers-reduced-motion` rule is present and functional.

## 10. Test cases
- **Contrast Test:** Inspect text elements in Chrome DevTools to verify contrast ratio >= 4.5:1.
- **Motion Test:** Emulate `prefers-reduced-motion: reduce` in DevTools Rendering tab; animations should cease immediately.
- **Theme Test:** Changing `:root` tokens instantly updates the entire UI.

## 11. Hints
1. *Concept:* Set `--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);` as a token.
2. *Approach:* For alert banners, use a light tinted background combined with a darker, high-contrast text color from the same hue family.
3. *Specifics:* In Chrome DevTools, open the Command Menu (`Cmd+Shift+P`), type "Rendering", and select "Emulate CSS prefers-reduced-motion".

## 12. Bonus challenge
Implement a dark mode toggle: add a `[data-theme="dark"]` selector in `variables.css` that inverts surface and text variables, and verify that all components automatically switch themes without touching component CSS!

## 13. Self-check
1. Why is animating `transform: translateX(10px)` significantly faster than animating `left: 10px`?
2. What is the WCAG AA minimum contrast ratio for normal body text?
3. Why are CSS variables declared in `:root` accessible throughout the entire document?
4. What is the purpose of the `prefers-reduced-motion` media query?

## 14. References
- [MDN: Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WebAIM: Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
