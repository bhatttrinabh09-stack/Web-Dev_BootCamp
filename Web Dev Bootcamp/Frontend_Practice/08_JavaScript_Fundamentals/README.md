# 08. JavaScript Fundamentals

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain what JavaScript does in the browser environment versus HTML and CSS.
- Declare variables using `let` and `const` and explain why `var` is avoided in modern code.
- Distinguish between primitive types (string, number, boolean, null, undefined, symbol, bigint) and reference types.
- Avoid implicit type coercion pitfalls by using strict equality (`===`) and strict inequality (`!==`).
- Evaluate truthy and falsy values and write clean conditional branching (`if/else`, `switch`, ternary).
- Write controlled loops (`for`, `while`, `for...of`) and debug logic using console statements and breakpoints.

## 2. What is this?
**JavaScript** is the dynamically typed, interpreted programming language of the web. While HTML defines structure and CSS provides aesthetics, JavaScript enables behavior, interactivity, state computation, and network communication.

## 3. Why does it exist?
Static web documents can display text and pictures, but modern applications require calculating shopping cart totals, validating passwords as you type, rendering dynamic feeds, and responding to user actions in real time without refreshing the entire browser window.

## 4. How does it work?
JavaScript runs in a single-threaded runtime engine (e.g. Google V8 in Chrome and Node.js).
Code is parsed into an Abstract Syntax Tree (AST), compiled into bytecode via Just-In-Time (JIT) compilation, and executed line-by-line on the **Call Stack**.

### Types & Coercion:
- **Primitives (Immutable, stored by value):**
  `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- **Falsy Values:**
  `false`, `0`, `-0`, `0n`, `""` (empty string), `null`, `undefined`, `NaN`. Everything else is **truthy** (including empty arrays `[]` and empty objects `{}`!).

### Equality Comparison:
```javascript
// ❌ Loose equality (performs implicit coercion - dangerous!)
"0" == 0;    // true
false == 0;  // true
null == undefined; // true

// ✔ Strict equality (compares type AND value without coercion)
"0" === 0;   // false (string vs number)
false === 0; // false
```

## 5. Important concepts and syntax
- `let`: Block-scoped variable that can be reassigned.
- `const`: Block-scoped variable that cannot be reassigned (prefer by default).
- Template literals: `` `User ${name} has ${score} points` ``.
- Logical operators: `&&` (AND), `||` (OR), `??` (Nullish coalescing: checks only `null` and `undefined`), `!` (NOT).
- Loops:
  ```javascript
  for (let i = 0; i < items.length; i++) { ... }
  for (const item of items) { ... }
  ```

## 6. Small worked example
A robust discount calculator demonstrating strict comparison and boundary checks:

```javascript
function calculateDiscount(price, customerType) {
  // Input validation
  if (typeof price !== "number" || isNaN(price) || price < 0) {
    throw new Error("Invalid price: must be a positive number");
  }

  let discountRate = 0;
  if (customerType === "VIP") {
    discountRate = 0.20; // 20%
  } else if (customerType === "MEMBER") {
    discountRate = 0.10; // 10%
  } else {
    discountRate = 0.0;
  }

  const finalPrice = price - (price * discountRate);
  return Number(finalPrice.toFixed(2));
}

console.log(calculateDiscount(100, "VIP"));    // 80
console.log(calculateDiscount(50, "REGULAR")); // 50
```

## 7. Common mistakes
1. **Using `==` instead of `===`:** Accidental type coercion bugs that are notoriously difficult to track down.
2. **Reassigning a `const` variable:** `const x = 10; x = 20;` throws `TypeError: Assignment to constant variable`.
3. **Assuming `[]` or `{}` are falsy:** In JavaScript, `Boolean([])` is `true`. Checking if an array is empty requires `array.length === 0`.
4. **Infinite loops:** Forgetting to increment the loop counter inside a `while` loop, freezing the browser tab.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Frontend_Practice/08_JavaScript_Fundamentals/starter/grade_calculator.js`:
Implement a grade calculation utility `evaluateStudentScore(score, hasExtraCredit)`:
1. Validates the input:
   - `score` must be a valid finite number between `0` and `100`.
   - If invalid (out of bounds, NaN, negative, string), return `'INVALID_SCORE'`.
2. Extra credit bonus:
   - If `hasExtraCredit` is truthy (boolean `true`), award `+5` points to `score` (clamped to a maximum of `100`).
3. Determines letter grade:
   - `90 - 100`: `'A'`
   - `80 - 89.99`: `'B'`
   - `70 - 79.99`: `'C'`
   - `60 - 69.99`: `'D'`
   - `< 60`: `'F'`
4. Calculates whether the student passed (`score >= 60`).
5. Returns a structured result object: `{ finalScore, letterGrade, isPassed }`.
6. Run `node grade_calculator.js` to execute automated tests.

## 9. Acceptance criteria
- [ ] Strict type checking protects against non-number inputs (`NaN`, strings, objects).
- [ ] Boundaries (`0`, `60`, `70`, `80`, `90`, `100`) evaluate accurately.
- [ ] Extra credit cannot exceed the `100` point cap.
- [ ] All assertions in `grade_calculator.js` pass with zero failures.

## 10. Test cases
- **Normal:** `evaluateStudentScore(85, false)` -> `{ finalScore: 85, letterGrade: 'B', isPassed: true }`.
- **Edge:** `evaluateStudentScore(98, true)` -> `{ finalScore: 100, letterGrade: 'A', isPassed: true }` (clamped).
- **Boundary:** `evaluateStudentScore(59.9, false)` -> letter `'F'`, `isPassed: false`.
- **Failure:** `evaluateStudentScore(-5, false)` or `evaluateStudentScore("90", false)` -> `'INVALID_SCORE'`.

## 11. Hints
1. *Concept:* Use `typeof score !== "number" || Number.isNaN(score)` to catch both strings and `NaN`.
2. *Approach:* Calculate `const effectiveScore = Math.min(100, hasExtraCredit ? score + 5 : score)`.
3. *Specifics:* Make sure to test `score === 0` to ensure your truthiness check does not treat `0` as invalid!

## 12. Bonus challenge
Add a function `batchProcessGrades(scoresArray)` that iterates over a list of scores, rejects invalid entries, and returns the class average, highest score, and pass percentage using a `for...of` loop.

## 13. Self-check
1. What is the difference between `null` and `undefined` in JavaScript?
2. Why does `"5" - 2` equal `3`, while `"5" + 2` equals `"52"`?
3. List 5 distinct falsy values in JavaScript.
4. What happens when you check `if ([])` in JavaScript? Why?

## 14. References
- [MDN: JavaScript First Steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)
- [MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [JavaScript.info: Variables and Types](https://javascript.info/first-steps)
