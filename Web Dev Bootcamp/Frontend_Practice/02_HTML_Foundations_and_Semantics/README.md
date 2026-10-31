# 02. HTML Foundations and Semantics

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Construct valid, standards-compliant HTML5 document structures with correct metadata.
- Choose semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`) over generic `<div>` wrappers.
- Implement accessible headings (`<h1>`-`<h6>`) establishing a clear document outline.
- Embed media (images, links, lists, tables) with meaningful attributes like `alt`, `href`, and `target`.
- Explain how assistive technologies (screen readers) utilize the HTML accessibility tree.

## 2. What is this?
**HTML** (HyperText Markup Language) is the declarative skeleton of every web document. It provides meaning and structure to raw text and media. **Semantic HTML** means using elements according to their inherent meaning (e.g. `<nav>` for navigation links, `<article>` for self-contained syndicatable content) rather than solely for their default appearance.

## 3. Why does it exist?
If a web page is built purely of generic `<div>` and `<span>` tags ("div soup"):
- Screen readers cannot announce navigation regions, headings, or main content to visually impaired users.
- Search engine crawlers (Googlebot) cannot index content hierarchy effectively.
- Keyboard users cannot navigate between sections with landmark shortcuts.
- CSS and JavaScript require extra classes and custom ARIA attributes to achieve what native elements do out of the box.

## 4. How does it work?
HTML elements are parsed by the browser into the **DOM tree** and simultaneously into the **Accessibility Tree**:

```
HTML Markup ──────> DOM Tree ─────────> Visual Render Tree (DOM + CSSOM)
     │
     └────────────> Accessibility Tree ─> Screen Readers & Assistive Tech
                    (Landmarks, Roles, Accessible Names)
```

For instance:
- `<nav>` automatically exposes the ARIA role `navigation`.
- `<main>` automatically exposes the ARIA role `main`.
- `<button>` automatically supports keyboard focus (`Tab`) and activation (`Enter`, `Space`).

## 5. Important concepts and syntax
- `<!DOCTYPE html>`: Tells the browser to render in HTML5 standard mode.
- `<meta charset="UTF-8">`: Specifies UTF-8 character encoding.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Ensures responsive mobile scaling.
- Semantic Landmarks:
  - `<header>`: Introductory content or site header.
  - `<nav>`: Primary navigation links.
  - `<main>`: The unique primary content of the document (only one per page).
  - `<article>`: Self-contained composition (e.g. blog post, card, product review).
  - `<section>`: Thematic grouping of content, typically with a heading.
  - `<aside>`: Tangentially related content (e.g. sidebar, related links).
  - `<footer>`: Closing content (copyright, contact info, sitemap).
- Media and links: `<img src="..." alt="Descriptive text">`, `<a href="..." rel="noopener noreferrer">`.

## 6. Small worked example
A semantic blog article card vs non-semantic "div soup":

```html
<!-- ❌ Bad: Div Soup (No semantic meaning or landmarks) -->
<div class="card">
  <div class="title">How Browsers Work</div>
  <div class="date">Oct 31, 2026</div>
  <div class="summary">An overview of rendering engines.</div>
  <div class="link" onclick="location.href='/read'">Read more</div>
</div>

<!-- ✔ Good: Semantic HTML (Exposes landmark, heading, and keyboard link) -->
<article class="blog-card">
  <h2>How Browsers Work</h2>
  <time datetime="2026-10-31">October 31, 2026</time>
  <p>An overview of rendering engines.</p>
  <a href="/read">Read full article on How Browsers Work</a>
</article>
```

## 7. Common mistakes
1. **Skipping heading levels:** Jumping from `<h1>` directly to `<h4>`, which breaks screen reader navigation outlines.
2. **Missing or meaningless `alt` attributes on images:** Using `alt="image"` or `alt="picture"` instead of describing what the image depicts, or omitting `alt` entirely.
3. **Using generic clickable `<div>` elements instead of `<a>` or `<button>`:** A `div` is not focusable by keyboard (`Tab`) and will not trigger on `Enter` or `Space` unless manually coded with JavaScript.
4. **Multiple `<main>` tags:** Having more than one `<main>` visible on a single page violates HTML specifications.

## 8. Coding challenge
**Environment:** Browser.

In `Frontend_Practice/02_HTML_Foundations_and_Semantics/starter/index.html`:
You are given an unsemantic personal profile and portfolio club page filled with placeholder `<div>` tags.
1. Replace all non-semantic containers with appropriate semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
2. Construct a valid heading hierarchy (`<h1>` through `<h3>`) with zero skipped levels.
3. Fix all broken media elements: provide meaningful `alt` attributes for images and descriptive anchor texts for external links.
4. Add a table showing weekly club schedule using `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` with appropriate `scope` attributes.
5. Open `index.html` in your browser and verify the visual layout and structure.

## 9. Acceptance criteria
- [ ] Document starts with `<!DOCTYPE html>` and valid `<head>` metadata (charset, viewport, title).
- [ ] Only one `<main>` element exists.
- [ ] Contains `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- [ ] Heading order is strictly hierarchical (`h1` -> `h2` -> `h3`).
- [ ] All `<img>` tags possess descriptive `alt` text.
- [ ] Table uses `<thead>`, `<tbody>`, and `<th scope="col">`.

## 10. Test cases
- **Normal:** Validated with W3C Nu HTML Validator (zero structural errors).
- **Edge:** Images with decorative purposes use `alt=""` (empty string) while informational images have clear descriptions.
- **Accessibility:** Navigating with keyboard (`Tab`) cycles through every link in the `<nav>` and content areas.

## 11. Hints
1. *Concept:* Think of semantic tags as expressing *what the content is*, not what it *looks like*.
2. *Approach:* Identify the primary topic of the page for `<h1>`. Subsections become `<h2>`, and items within a subsection become `<h3>`.
3. *Specifics:* The schedule belongs inside a `<section aria-labelledby="schedule-heading">` using semantic table tags.

## 12. Bonus challenge
Add Open Graph `<meta>` tags (`og:title`, `og:description`, `og:image`, `og:url`) into the `<head>` of your page so that social media platforms generate a rich preview card when the URL is shared.

## 13. Self-check
1. What is the difference between an `<article>` and a `<section>`?
2. Why is an empty `alt=""` different from omitting the `alt` attribute entirely on an `<img>` tag?
3. What is the purpose of the `<meta name="viewport">` tag? What happens on a mobile phone without it?
4. Why should you never use `<div>` when an `<a>` or `<button>` element is suitable?

## 14. References
- [MDN: HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Accessibility/HTML)
- [MDN: Document and website structure](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Document_and_website_structure)
- [W3C Nu HTML Checker](https://validator.w3.org/nu/)
