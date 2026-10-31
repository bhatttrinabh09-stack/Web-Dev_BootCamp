# 04. CSS Fundamentals and Box Model

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain and calculate specificity in CSS selectors using the `(Inline, ID, Class/Attribute/Pseudo, Element)` rubric.
- Diagram and manipulate the CSS Box Model: `content`, `padding`, `border`, and `margin`.
- Master the difference between `box-sizing: content-box` and `box-sizing: border-box`.
- Apply relative sizing units (`rem`, `em`, `%`, `vw`, `vh`) over static pixel values for responsive layouts.
- Diagnose layout collapses, margin collapses, and specificity conflicts using browser DevTools.

## 2. What is this?
**CSS** (Cascading Style Sheets) controls the visual styling, typography, spacing, and layout of HTML elements. The **Box Model** is the fundamental geometry engine of CSS: every single element on a web page is treated by the browser as a rectangular box.

## 3. Why does it exist?
Without an exact box model, predicting how wide or tall elements will render is impossible. Under the old default `content-box`, adding padding or border to an element caused it to blow past its defined `width`, breaking adjacent layouts. Applying `box-sizing: border-box` ensures dimensions stay predictable.

## 4. How does it work?
The anatomy of every CSS box:

```
┌───────────────────────────────────────────────┐
│                    MARGIN                     │
│  ┌─────────────────────────────────────────┐  │
│  │                 BORDER                  │  │
│  │  ┌───────────────────────────────────┐  │  │
│  │  │              PADDING              │  │  │
│  │  │  ┌─────────────────────────────┐  │  │  │
│  │  │  │                             │  │  │  │
│  │  │  │           CONTENT           │  │  │  │
│  │  │  │        (width x height)     │  │  │  │
│  │  │  │                             │  │  │  │
│  │  │  └─────────────────────────────┘  │  │  │
│  │  └───────────────────────────────────┘  │  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

### The Sizing Formula:
- **`box-sizing: content-box` (Legacy default):**
  $$	ext{Total Rendered Width} = 	ext{width} + 	ext{padding-left} + 	ext{padding-right} + 	ext{border-left} + 	ext{border-right}$$
- **`box-sizing: border-box` (Modern standard):**
  $$	ext{Total Rendered Width} = 	ext{width}$$ (Padding and border are absorbed inside the specified width).

## 5. Important concepts and syntax
- Specificity Hierarchy:
  1. `!important` (Overrides all, use with extreme restraint).
  2. Inline styles (`style="color: red;"`) -> `1,0,0,0`.
  3. IDs (`#header`) -> `0,1,0,0`.
  4. Classes, Attributes, Pseudo-classes (`.btn`, `[type="text"]`, `:hover`) -> `0,0,1,0`.
  5. Elements & Pseudo-elements (`p`, `div`, `::before`) -> `0,0,0,1`.
- Modern CSS Reset:
  ```css
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ```
- Margin Collapse: Vertical margins between adjacent block elements collapse into the single largest margin rather than adding together.

## 6. Small worked example
Calculating rendered width under `content-box` vs `border-box`:

```css
/* Box 1 */
.box-one {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Rendered width = 300 + 20 + 20 + 5 + 5 = 350px! Overflow risk! */
}

/* Box 2 */
.box-two {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Rendered width = exactly 300px. Content shrinks to 250px. */
}
```

## 7. Common mistakes
1. **Confusing `padding` and `margin`:** Padding is space *inside* the border (part of the clickable/background area); margin is empty space *outside* pushing neighboring elements away.
2. **Over-using ID selectors in CSS:** Styling with `#my-button` creates high specificity that is difficult to override or reuse across components. Use classes (`.btn`).
3. **Using fixed `px` for typography and body widths:** Hardcoding `font-size: 16px` prevents users from resizing text via browser accessibility settings. Use `rem`.

## 8. Coding challenge
**Environment:** Browser & CSS Editor.

Open `Frontend_Practice/04_CSS_Fundamentals_and_Box_Model/starter/`:
1. Inspect `starter/index.html` and `starter/style.css`.
2. Notice the broken layout: the profile card container has horizontal scrollbars and overflows its parent wrapper because it uses legacy sizing.
3. Apply a universal `box-sizing: border-box` reset.
4. Style the profile card according to the design specifications:
   - Max-width of `24rem` centered horizontally.
   - Distinct padding, background color, subtle border, and rounded corners.
   - Profile avatar with circular border radius and proper aspect ratio.
   - Clean typographic scale using `rem`.
5. Fix the intentional specificity bug where a high-specificity selector is blocking button hover states.

## 9. Acceptance criteria
- [ ] Universal reset applied using `*, *::before, *::after`.
- [ ] No horizontal scrollbars or element overflowing parent bounds.
- [ ] Profile card dimensions match specifications without hardcoded heights (let content dictate height).
- [ ] Hover states on the action button trigger smoothly.

## 10. Test cases
- **Normal:** Card renders centered at `384px` (24rem) with consistent inner padding.
- **Edge:** Increasing card padding from `1rem` to `3rem` keeps the outer container width unchanged (thanks to `border-box`).
- **Failure:** Removing `box-sizing: border-box` causes layout to overflow.

## 11. Hints
1. *Concept:* Centering a block element horizontally requires `margin-inline: auto` (or `margin: 0 auto`) alongside a `max-width`.
2. *Approach:* Check browser DevTools Computed tab to inspect the exact pixels allocated to margin, border, padding, and content.
3. *Specifics:* An avatar image needs `object-fit: cover` and equal width/height with `border-radius: 50%` to remain an undistorted circle.

## 12. Bonus challenge
Use CSS logical properties (`margin-block`, `margin-inline`, `padding-block`, `padding-inline`) instead of physical directional properties (`margin-top`, `padding-left`) to support internationalization and right-to-left (RTL) text flows.

## 13. Self-check
1. If an element has `width: 200px`, `padding: 20px`, `border: 2px solid`, and `box-sizing: content-box`, what is its total rendered width?
2. Which selector has higher specificity: `body header nav ul li.active a` or `#primary-nav a`? Explain why.
3. What is margin collapsing and why does it occur between vertical margins but not horizontal margins?
4. What is the difference between `1rem` and `1em`?

## 14. References
- [MDN: The Box Model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity)
- [CSS-Tricks: Box-Sizing](https://css-tricks.com/box-sizing/)
