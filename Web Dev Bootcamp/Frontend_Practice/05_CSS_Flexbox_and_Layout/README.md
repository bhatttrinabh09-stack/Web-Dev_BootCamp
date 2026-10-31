# 05. CSS Flexbox and Layout

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Establish a flex formatting context and navigate the Main Axis vs Cross Axis.
- Control alignment, distribution, and spacing using `justify-content`, `align-items`, and `gap`.
- Manage item growth and shrinkage using `flex-grow`, `flex-shrink`, and `flex-basis`.
- Understand normal document flow versus out-of-flow positioning (`relative`, `absolute`, `fixed`, `sticky`).
- Explain stacking contexts, z-index hierarchy, and diagnose layout bugs.

## 2. What is this?
**CSS Flexible Box Layout (Flexbox)** is a one-dimensional layout model designed for distributing space among items along either a row or a column. **CSS Positioning** allows elements to break out of the standard top-to-bottom document flow to pin, float, or layer over other elements.

## 3. Why does it exist?
Before Flexbox, vertical centering, equal-height columns, and sticky footers required brittle hacks (floats, tables, clearing hacks, or JavaScript math). Flexbox makes one-dimensional alignment intuitive and fluid.

## 4. How does it work?
Declaring `display: flex` on a container turns direct children into **flex items**:

```
                  MAIN AXIS (flex-direction: row)
     ┌────────────────────────────────────────────────────────┐
     │  justify-content: flex-start | center | space-between  │
   ▲ │                                                        │
   │ │   ┌────────────┐        ┌────────────┐                 │
 C │ │   │   Item 1   │        │   Item 2   │                 │
 R │ │   │            │        │            │                 │
 O │ │   └────────────┘        └────────────┘                 │
 S │ │                                                        │
 S │ │  align-items: flex-start | center | flex-end | stretch │
   ▼ └────────────────────────────────────────────────────────┘
```
- Changing `flex-direction: column` flips the axes: the Main Axis runs vertically, and the Cross Axis runs horizontally.

### Positioning Modes:
- `static`: Default normal document flow.
- `relative`: Stays in document flow, but offsets (`top`, `left`) visually relative to its normal position. Forms a positioning boundary for absolute descendants!
- `absolute`: Removed from normal flow. Positioned relative to its closest non-static ancestor.
- `fixed`: Removed from flow. Anchored directly to the browser viewport.
- `sticky`: Hybrid: behaves like `relative` until the viewport scrolls past a threshold, then sticks like `fixed`.

## 5. Important concepts and syntax
- Container properties:
  - `display: flex;`
  - `flex-direction: row | column | row-reverse | column-reverse;`
  - `justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;`
  - `align-items: stretch | center | flex-start | flex-end | baseline;`
  - `flex-wrap: nowrap | wrap;`
  - `gap: 1rem;`
- Item properties:
  - `flex: [grow] [shrink] [basis];` (e.g. `flex: 1 1 auto;` or `flex: 1;`)
  - `align-self: center;` (Overrides container `align-items` for a single item).
- Stacking Context: A 3D conceptual layering of HTML elements along the z-axis. Created by elements with `position: relative/absolute/fixed` + a non-auto `z-index`, or `opacity < 1`, or `transform`.

## 6. Small worked example
A sticky responsive navigation bar with space-between distribution:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
```

## 7. Common mistakes
1. **Trying to center an absolute element with `justify-content`:** Flexbox only aligns direct flex children. An `absolute` item ignores flex alignment unless styled with inset coordinates.
2. **Forgetting `flex-wrap: wrap`:** Flex containers default to `flex-wrap: nowrap`, causing items to shrink down or overflow horizontally rather than wrapping to the next line.
3. **Z-index not working because position is `static`:** Setting `z-index: 999` on a default `static` element does nothing; it requires a positioning mode (`relative`, `absolute`, `fixed`, `sticky`).

## 8. Coding challenge
**Environment:** Browser & CSS Editor.

Open `Frontend_Practice/05_CSS_Flexbox_and_Layout/starter/`:
1. Open `index.html` and `style.css`.
2. Notice the broken layout:
   - The navigation bar is collapsed and unaligned.
   - The card grid items overflow their container horizontally instead of wrapping.
   - The "Badge" on each card is in the wrong place because its container lacks a relative positioning context.
3. Refactor the navigation bar using Flexbox: logo on the left, navigation links in the middle, and an action button on the right.
4. Make the navigation bar `sticky` at the top of the page when scrolling.
5. Create a card row with `display: flex`, `flex-wrap: wrap`, and a consistent `gap: 1.5rem` where each card flexes to equal height.
6. Position the "New" badge in the top-right corner of each card using `position: absolute` with proper relative containment.

## 9. Acceptance criteria
- [ ] Navbar stays pinned to top during scroll with appropriate `z-index`.
- [ ] Nav items are vertically centered and horizontally distributed (`space-between`).
- [ ] Cards wrap cleanly on smaller viewports.
- [ ] Card badges are correctly anchored to their parent card boundary.

## 10. Test cases
- **Normal:** Resizing viewport from 1200px down to 600px causes cards to wrap gracefully without horizontal scrollbars.
- **Edge:** Cards with varying text lengths maintain equal heights across a row.
- **Failure:** Removing `position: relative` from `.card` causes the badge to jump to the top-right of the entire page body.

## 11. Hints
1. *Concept:* Remember that `position: absolute` searches up the DOM tree for the nearest ancestor with any position other than `static`.
2. *Approach:* To make flex items stretch to equal height across a row, ensure `align-items: stretch` (the default) is preserved.
3. *Specifics:* For a 3-column card row that wraps, give cards `flex: 1 1 18rem`.

## 12. Bonus challenge
Implement a mobile toggle hamburger menu for the navigation bar using pure CSS (checkbox hack with `<input type="checkbox" id="menu-toggle">` and the sibling combinator `~`).

## 13. Self-check
1. What is the difference between the Main Axis and the Cross Axis in Flexbox? Which property changes their orientation?
2. What does `flex: 1` actually expand to in terms of `flex-grow`, `flex-shrink`, and `flex-basis`?
3. Why does setting `position: absolute; top: 0; right: 0;` on an element sometimes snap it to the top-right of the browser window instead of its parent element?
4. What is a stacking context and how can a lower `z-index` element appear in front of an element with `z-index: 9999`?

## 14. References
- [MDN: Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN: Positioning](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning)
