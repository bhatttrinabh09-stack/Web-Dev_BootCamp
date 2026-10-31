# 03. HTML Forms and Accessibility

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Construct accessible HTML forms linking `<label>` elements explicitly with inputs via `for` and `id`.
- Utilize appropriate input types (`text`, `email`, `number`, `tel`, `date`, `password`, `checkbox`, `radio`) to trigger proper mobile virtual keyboards.
- Implement native HTML5 form validation attributes (`required`, `minlength`, `maxlength`, `min`, `max`, `pattern`).
- Manage input grouping using `<fieldset>` and `<legend>`.
- Explain WCAG keyboard navigation principles: focus order, tab indices, visible focus indicators, and accessible submission.

## 2. What is this?
An **HTML form** is the primary mechanism for users to input data and submit it to a server. **Web Accessibility** (a11y) ensures that all users—including individuals with motor, visual, auditory, or cognitive disabilities—can understand, navigate, and interact with the web.

## 3. Why does it exist?
A form that looks visually appealing can still be completely unusable:
- If an input lacks an associated `<label>`, screen readers announce "edit text, blank" without telling the user what information to type.
- If you use `<div>` instead of `<button>`, keyboard users cannot press `Enter` to submit.
- If you omit native validation, users on mobile devices or slow connections must wait for round-trip server errors for simple typos.

## 4. How does it work?
When a user submits a `<form action="/submit" method="POST">`:

```
User enters data
    │
    ▼
Browser checks native validation constraints (required, type="email", pattern)
    ├─ If Invalid: Browser blocks submission, displays localized error tooltip, focuses field
    └─ If Valid:
         1. Browser serializes form data into key-value pairs matching `name` attributes
         2. Dispatches HTTP request with Content-Type: application/x-www-form-urlencoded
            or multipart/form-data
```

For accessibility:
```html
<label for="user-email">Email Address</label>
<input type="email" id="user-email" name="email" required>
```
Clicking the `<label>` automatically directs cursor focus to the input, expanding the click target for users with motor tremors.

## 5. Important concepts and syntax
- Explicit Labeling: `<label for="inputId">Label</label>` + `<input id="inputId" name="paramName">`.
- `<fieldset>` and `<legend>`: Group related controls (e.g. shipping address or a set of radio buttons).
- Form Controls:
  - `<input type="text | email | password | number | tel | date | checkbox | radio | file">`
  - `<select>` and `<option>`
  - `<textarea>` for multiline text.
  - `<button type="submit | button | reset">`
- Validation attributes: `required`, `pattern="[0-9]{5}"`, `min="18"`, `max="100"`.
- Keyboard & ARIA helpers: `aria-describedby="hint-id"`, `aria-invalid="true"`.

## 6. Small worked example
Accessible newsletter subscription with error hint:

```html
<form action="/subscribe" method="POST" novalidate>
  <fieldset>
    <legend>Newsletter Subscription</legend>
    
    <label for="sub-email">Your Email Address <span aria-hidden="true">*</span></label>
    <input 
      type="email" 
      id="sub-email" 
      name="email" 
      required 
      aria-required="true"
      aria-describedby="email-hint"
    >
    <p id="email-hint" class="hint">We will never sell or share your email.</p>

    <button type="submit">Subscribe</button>
  </fieldset>
</form>
```

## 7. Common mistakes
1. **Placeholder as replacement for label:** Using `placeholder="Enter email"` instead of a visible `<label>`. Placeholders disappear as soon as the user starts typing and often have poor color contrast.
2. **Missing `name` attribute:** If an `<input>` has an `id` but lacks a `name` attribute, its value will NOT be included in the submitted form data payload.
3. **Using `<button>` inside `<form>` without `type="button"`:** The default type of a `<button>` inside a `<form>` is `type="submit"`. An unintended button (like "Cancel") will inadvertently submit the form.

## 8. Coding challenge
**Environment:** Browser.

In `Frontend_Practice/03_HTML_Forms_and_Accessibility/starter/index.html`:
Create an accessible conference event registration form containing:
1. Full Name (`text`, required, minlength 3).
2. Email Address (`email`, required).
3. Ticket Quantity (`number`, min 1, max 5, required).
4. Attendee Track (radio buttons grouped in `<fieldset>` with `<legend>`: "Frontend", "Backend", "Full Stack").
5. Dietary Requirements (`select` dropdown with options: "None", "Vegetarian", "Vegan", "Gluten-Free").
6. Terms & Conditions acceptance (`checkbox`, required).
7. Submit button (`<button type="submit">`).
8. Add an `aria-describedby` hint explaining password/ticket rules.

## 9. Acceptance criteria
- [ ] Every input, select, and textarea is explicitly tied to a `<label>` via `for` and `id`.
- [ ] Radio buttons are contained in a `<fieldset>` with an informative `<legend>`.
- [ ] Native validation attributes (`required`, `min`, `max`, `type="email"`) prevent invalid submissions.
- [ ] The entire form can be completed and submitted using only the keyboard (`Tab`, `Space`, `Arrow Keys`, `Enter`).

## 10. Test cases
- **Normal:** Fill in valid data, click submit; form attempts submission without browser validation errors.
- **Edge:** Entering `0` or `6` in ticket quantity triggers native range validation error.
- **Failure:** Submitting with empty email triggers "Please fill out this field" or "Please include an '@'".

## 11. Hints
1. *Concept:* Remember that radio buttons that belong to the same choice group must share the exact same `name` attribute.
2. *Approach:* Place your helper text inside a `<span id="ticket-help">` and reference it with `aria-describedby="ticket-help"` on the ticket input.
3. *Specifics:* Never remove default browser focus rings without providing an equal or higher-contrast `:focus-visible` style.

## 12. Bonus challenge
Add client-side custom error messaging using the HTML5 constraint validation API in JavaScript: listen to the `invalid` event on inputs and set custom validation messages using `input.setCustomValidity()`.

## 13. Self-check
1. Why is wrapping an input inside a label (`<label><input ...></label>`) sometimes less flexible than using `for` and `id`?
2. What is the difference between `aria-required="true"` and the native `required` attribute?
3. What happens to keyboard users if you apply CSS `outline: none` to all inputs without a replacement style?
4. When should you use a radio button instead of a select dropdown?

## 14. References
- [MDN: Your first HTML form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Forms/Your_first_form)
- [MDN: How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Forms/How_to_structure_a_web_form)
- [W3C Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
