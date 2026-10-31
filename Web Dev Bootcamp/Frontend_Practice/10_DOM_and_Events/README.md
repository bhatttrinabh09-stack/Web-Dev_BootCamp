# 10. DOM Manipulation and Events

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain what the Document Object Model (DOM) is and how it represents an HTML page.
- Select DOM elements using `document.querySelector` and `document.querySelectorAll`.
- Create, modify, and remove DOM nodes using `createElement`, `append`, `remove`, `classList`, and `dataset`.
- Attach and remove event listeners with `addEventListener`.
- Leverage event bubbling and **event delegation** to handle dynamic lists with optimal performance.
- Prevent Cross-Site Scripting (XSS) by using `textContent` instead of injecting raw user strings via `innerHTML`.

## 2. What is this?
The **DOM** (Document Object Model) is a tree-like object-oriented representation of the web document constructed by the browser. Every HTML tag becomes a JavaScript object (a DOM Node) with properties and methods that JavaScript can read and manipulate in real time.

## 3. Why does it exist?
Without the DOM, web pages would be completely static after initial download. The DOM API allows JavaScript to respond to user clicks, submit forms asynchronously, dynamically add list items, toggle classes for animations, and validate inputs on the fly.

## 4. How does it work?
### The Event Propagation Lifecycle:
When a user clicks a button nested inside an article:

```
[Window] ── 1. Capture Phase ──> [Document] ──> [Body] ──> [Article]
                                                               │
                                                       2. Target Phase: [Button]
                                                               │
[Window] <── 3. Bubbling Phase <── [Document] <── [Body] <── [Article]
```

### Event Delegation:
Instead of attaching 100 individual event listeners to 100 list items (which consumes excessive memory and fails when new items are added dynamically), attach **one** listener to the common parent and inspect `e.target`:

```javascript
parentList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn-delete");
  if (deleteBtn) {
    const itemId = deleteBtn.dataset.id;
    removeItem(itemId);
  }
});
```

### XSS Warning:
```javascript
// ❌ Dangerous: If user enters "<img src=x onerror=alert('Hacked')>", script runs!
card.innerHTML = `<p>${userInput}</p>`;

// ✔ Safe: Automatically escapes all characters as safe text
card.textContent = userInput;
```

## 5. Important concepts and syntax
- `document.querySelector(selector)`: Returns first matching element or `null`.
- `document.querySelectorAll(selector)`: Returns a static `NodeList`.
- `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()`.
- `element.addEventListener("event", handler, options)`.
- `e.preventDefault()`: Cancels default browser action (e.g. form submission refresh or following a link).
- `e.stopPropagation()`: Stops the event from bubbling up the DOM tree.

## 6. Small worked example
A click-counter button with dynamic DOM updates:

```javascript
const counterBtn = document.querySelector("#counter-btn");
const displaySpan = document.querySelector("#count-display");

let count = 0;

counterBtn.addEventListener("click", () => {
  count += 1;
  displaySpan.textContent = String(count);

  if (count >= 10) {
    displaySpan.classList.add("highlight");
  }
});
```

## 7. Common mistakes
1. **Calling the function immediately inside `addEventListener`:** Writing `btn.addEventListener("click", handleClick())` executes the function immediately on script load rather than on click! Pass the reference: `handleClick`.
2. **Attaching listeners inside loops for dynamic elements:** Memory leak and performance degradation. Use event delegation on the parent container instead.
3. **Using `innerHTML` with unsanitized user input:** Exposes the application to critical Cross-Site Scripting (XSS) vulnerabilities.

## 8. Coding challenge
**Environment:** Browser & JavaScript Editor.

Open `Frontend_Practice/10_DOM_and_Events/starter/`:
Build an interactive Task Manager in `app.js` and `index.html`:
1. **Add Task:** Form input captures a task description. Submitting the form (via `submit` event, stopping page refresh with `e.preventDefault()`) creates a new list item.
2. **Toggle Complete:** Clicking a task's checkbox toggles the `.completed` CSS class on the task text.
3. **Delete Task:** Clicking a delete button removes that task item from the DOM.
4. **Filter Tasks:** Filter buttons ("All", "Active", "Completed") show/hide matching items.
5. **Event Delegation:** Handle task toggling and deletion using a single listener on the `<ul>` task list parent.
6. **XSS Safety:** Ensure entering HTML tags (e.g. `<b>bold</b>`) into the input renders as literal plain text, not HTML.

## 9. Acceptance criteria
- [ ] Submitting the form adds tasks without refreshing the browser.
- [ ] Empty or whitespace-only tasks are rejected with a visual error.
- [ ] Task list uses event delegation on `#task-list`.
- [ ] Filter buttons correctly show/hide items according to their completion state.
- [ ] Safe against XSS injection.

## 10. Test cases
- **Normal:** Type "Buy groceries", press Enter; item appears in list.
- **Edge:** Type `   ` (only spaces); input highlights red, no task added.
- **Security:** Type `<script>alert('xss')</script>`; text displays literally without executing.
- **Filtering:** Add 2 items, complete 1, click "Active"; only incomplete item displays.

## 11. Hints
1. *Concept:* Use `document.createElement("li")`, populate text with `textContent`, and add classes with `classList.add()`.
2. *Approach:* Store the task ID on the element using HTML5 dataset: `li.dataset.id = Date.now().toString()`.
3. *Specifics:* In the parent click handler, use `const li = e.target.closest("li");` to locate the target task item.

## 12. Bonus challenge
Add an inline edit capability: double-clicking a task's text converts it into an input field allowing the user to update the text in place and save on `Enter` or cancel on `Escape`.

## 13. Self-check
1. What is the difference between `e.target` and `e.currentTarget` inside an event listener?
2. Why is event delegation more memory-efficient than attaching listeners to each child element?
3. What is the difference between `textContent` and `innerHTML`?
4. What does `e.preventDefault()` do when attached to a `<form>` submit event?

## 14. References
- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Event bubbling and capture](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [MDN: Event delegation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events#event_delegation)
