# 09. JavaScript Functions, Arrays, and Objects

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Compare function declarations, function expressions, and arrow functions (`=>`).
- Understand lexical scope, closures, and the difference between passing by value vs passing by reference.
- Manipulate arrays immutably using modern iteration methods (`map`, `filter`, `find`, `reduce`, `some`, `every`).
- Master object and array destructuring, default parameters, and the spread/rest operator (`...`).
- Decompose complex data transformation problems into clean, testable, pure functions.

## 2. What is this?
**Functions**, **Arrays**, and **Objects** form the structural backbone of real-world JavaScript engineering. Functions encapsulate reusable logic. Arrays store ordered sequences of values. Objects store structured key-value pairs representing domain models (users, products, transactions).

## 3. Why does it exist?
In modern frontend and backend development (React, Express, databases), nearly all work consists of processing collections of records: taking raw JSON data from an API, filtering matching results, formatting display strings, calculating aggregate summaries, and updating state immutably.

## 4. How does it work?
### Value vs Reference:
- Primitives (`number`, `string`) are copied by **value**.
- Objects and Arrays are stored by **reference** (pointers in memory).
```javascript
const a = [1, 2, 3];
const b = a;         // b points to the SAME memory address!
b.push(4);
console.log(a);      // [1, 2, 3, 4] - Mutated!

// Immutable update with spread operator:
const c = [...a, 5]; // Creates a brand new array copy
```

### High-Order Array Methods Pipeline:
```
Raw Array ─── .filter() ───> Filtered Array ─── .map() ───> Transformed Array ─── .reduce() ───> Summary Value
```

## 5. Important concepts and syntax
- Arrow Function syntax: `const add = (a, b) => a + b;`
- Array Methods:
  - `.map(fn)`: Transforms every element into a new array of identical length.
  - `.filter(fn)`: Returns a new array with only elements matching a condition.
  - `.find(fn)`: Returns the first matching element, or `undefined`.
  - `.reduce((acc, curr) => ..., initialValue)`: Accumulates elements into a single value (number, object, etc.).
- Destructuring:
  ```javascript
  const user = { id: 1, name: "Maria", role: "admin" };
  const { name, role } = user;
  const [first, ...rest] = [10, 20, 30, 40];
  ```

## 6. Small worked example
Calculating total revenue from active subscriptions using pure array chaining:

```javascript
const subscriptions = [
  { id: 1, plan: "Pro", price: 29, active: true },
  { id: 2, plan: "Basic", price: 9, active: false },
  { id: 3, plan: "Enterprise", price: 99, active: true },
];

const totalActiveRevenue = subscriptions
  .filter(sub => sub.active)
  .map(sub => sub.price)
  .reduce((sum, price) => sum + price, 0);

console.log(totalActiveRevenue); // 128
```

## 7. Common mistakes
1. **Accidental array mutation:** Using `.sort()`, `.splice()`, or `.reverse()` directly on an original array mutates it in place. Use `.toSorted()`, `.toSpliced()`, or clone with `[...arr].sort()` first.
2. **Forgetting return in multi-line arrow functions:**
   `const double = (x) => { x * 2; };` returns `undefined` because braces `{}` require an explicit `return` keyword!
3. **Omitting the initial value in `.reduce()`:** Omitting the second argument defaults the accumulator to the first element, causing bugs when reducing objects or empty arrays.

## 8. Coding challenge
**Environment:** Terminal (Node.js).

Open `Frontend_Practice/09_JavaScript_Functions_Arrays_and_Objects/starter/record_processor.js`:
You are provided a dataset of customer e-commerce orders. Implement four pure transformation functions:
1. `filterOrdersByStatus(orders, status)`: Returns all orders matching the given status without mutating the original array.
2. `getUniqueCustomerEmails(orders)`: Returns a sorted array of unique customer email addresses (no duplicates).
3. `calculateTotalRevenueByCategory(orders)`: Returns an object grouping total revenue by product category, e.g. `{ Electronics: 1200, Books: 45 }`.
4. `findHighestValueOrder(orders)`: Returns the single order with the largest total price, or `null` if empty.
5. Run `node record_processor.js` and verify all tests pass.

## 9. Acceptance criteria
- [ ] Functions are pure: the input `orders` array must remain completely unmutated.
- [ ] No `for` or `while` loops: solve using idiomatic array methods (`filter`, `map`, `reduce`, `find`).
- [ ] Unique emails have zero duplicates and are alphabetically sorted.
- [ ] All automated test assertions pass.

## 10. Test cases
- **Normal:** Passing standard orders produces correct category totals.
- **Edge:** Calling `findHighestValueOrder([])` returns `null`.
- **Immutability:** Checking `Object.isFrozen(orders)` or checking `orders.length` after operations confirms no mutations occurred.

## 11. Hints
1. *Concept:* To get unique items from an array, combine `new Set(array)` with the spread operator: `[...new Set(array)]`.
2. *Approach:* For `calculateTotalRevenueByCategory`, use `.reduce((acc, order) => { ... }, {})`.
3. *Specifics:* For sorting strings alphabetically without mutating: `emails.slice().sort((a, b) => a.localeCompare(b))`.

## 12. Bonus challenge
Implement a functional composition utility `pipe(...fns)` that takes multiple unary transformation functions and executes them left-to-right on an initial input data structure.

## 13. Self-check
1. What is the difference between a function declaration and an arrow function regarding the `this` keyword?
2. What happens if you execute `[3, 1, 10, 2].sort()` without a comparator function? Why?
3. What is a closure? Provide a one-sentence definition and an example use-case.
4. Why is immutability crucial in modern frontend frameworks like React?

## 14. References
- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Array methods](https://javascript.info/array-methods)
