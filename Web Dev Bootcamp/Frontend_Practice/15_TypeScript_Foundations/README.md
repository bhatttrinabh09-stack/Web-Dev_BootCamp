# 15. TypeScript Foundations

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain what TypeScript is and how the compile-time type system enhances JavaScript.
- Apply primitive type annotations, array types, object types, and function signatures.
- Model domain structures using `interface` and `type` aliases.
- Use Union types (`|`), Literal types, and Optional properties (`?`).
- Narrow types safely using type guards (`typeof`, `in`, `instanceof`).
- Distinguish between `unknown` (type-safe) and `any` (type-bypassing), and write basic Generics (`<T>`).

## 2. What is this?
**TypeScript** is a strongly typed superset of JavaScript developed by Microsoft. It adds static type checking to JavaScript at compile-time. Browsers and Node cannot execute TypeScript directly; the TypeScript compiler (`tsc`) checks types and strips them away, emitting standard JavaScript.

## 3. Why does it exist?
In large JavaScript codebases, the most frequent production crashes are runtime `TypeError: Cannot read properties of undefined` or passing arguments in the wrong order. TypeScript catches these bugs in your editor before the code ever runs.

## 4. How does it work?
```
TypeScript Code (.ts) ── tsc (Compile-time Type Check) ──> Emits Plain JavaScript (.js)
                                │
               (Errors flagged in IDE / Terminal)
```

### Static vs Runtime:
TypeScript **does not exist at runtime**. If an API returns unexpected data over the network, TypeScript cannot protect you without runtime validation (like Zod).

### Unknown vs Any:
```typescript
// ❌ Any: Completely disables TypeScript type-checking (Avoid!)
let badVal: any = 10;
badVal.toUpperCase(); // Compiles fine, crashes at runtime!

// ✔ Unknown: Requires explicit type narrowing before operations
let safeVal: unknown = "hello";
if (typeof safeVal === "string") {
  console.log(safeVal.toUpperCase()); // Safe!
}
```

## 5. Important concepts and syntax
- Type Aliases vs Interfaces:
  ```typescript
  type Status = "pending" | "active" | "archived"; // Union of literals
  interface User {
    id: string;
    email: string;
    role?: "admin" | "member"; // Optional property
  }
  ```
- Generics:
  ```typescript
  function wrapInArray<T>(item: T): T[] {
    return [item];
  }
  ```

## 6. Small worked example
A type-safe result wrapper using Discriminated Unions:

```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResponse(res: ApiResponse<string[]>) {
  if (res.success) {
    // TypeScript narrows res to the success object; data is guaranteed!
    console.log(`Received ${res.data.length} items`);
  } else {
    // TypeScript narrows res to the error object; error is guaranteed!
    console.error(`Error: ${res.error}`);
  }
}
```

## 7. Common mistakes
1. **Silencing compiler errors with `any`:** Defeats the entire purpose of TypeScript. Use `unknown` with a type guard instead.
2. **Assuming TypeScript validates API payloads:** TS types disappear after compilation. An external API payload typed as `User` might still be `null` at runtime.
3. **Overusing type assertions (`as Type`):** Type assertions tell the compiler "trust me, I know better than you", which can mask real runtime mismatches.

## 8. Coding challenge
**Environment:** Terminal (TypeScript / tsx).

Open `Frontend_Practice/15_TypeScript_Foundations/starter/`:
1. Inspect `src/processor.ts`.
2. Define the TypeScript interfaces and types for a Payment Processing Pipeline:
   - `PaymentMethod`: Literal union `'credit_card' | 'bank_transfer' | 'crypto'`.
   - `Transaction`: Interface with `id` (string), `amount` (number), `currency` (string), `method` (`PaymentMethod`), and `feeDiscountRate?` (optional number).
   - `TransactionSummary`: Interface with `totalProcessed` (number), `totalFees` (number), `transactionCount` (number).
3. Implement `calculateTransactionFee(tx: Transaction): number`:
   - Credit card: 2.9% fee
   - Bank transfer: 1.0% fee
   - Crypto: 0.5% fee
   - If `feeDiscountRate` is present, reduce the fee by that percentage.
4. Implement `summarizeTransactions(txs: Transaction[]): TransactionSummary`.
5. Strictly avoid `any` anywhere in the implementation.
6. Run `npm test` or `npx tsx src/processor.ts` to execute the assertions.

## 9. Acceptance criteria
- [ ] Strict type safety: no `any` used.
- [ ] Correctly models domain with interfaces, union types, and optional parameters.
- [ ] Fee calculation logic passes all tests.
- [ ] Running `npx tsc --noEmit` produces zero compiler errors.

## 10. Test cases
- **Normal:** Credit card fee of $100 -> $2.90.
- **Optional Property:** $100 fee with 50% discount -> $1.45.
- **Summary:** Array of transactions correctly calculates totals.

## 11. Hints
1. *Concept:* Use a `switch(tx.method)` statement; TypeScript will verify exhaustiveness.
2. *Approach:* For optional properties, check `if (tx.feeDiscountRate !== undefined)`.
3. *Specifics:* Run `npm run check` to check types without compiling files to disk.

## 12. Bonus challenge
Add a generic pagination wrapper `PaginatedResult<T>`: `{ items: T[]; total: number; page: number; limit: number }` and implement a function `paginateList<T>(list: T[], page: number, limit: number): PaginatedResult<T>`.

## 13. Self-check
1. What is the difference between `interface` and `type` in TypeScript?
2. What is a Discriminated Union and why is it useful for modeling API states?
3. Why does `typeof x === "object"` return `true` for `null` in JavaScript and TypeScript? How do you narrow properly?
4. What happens to TypeScript type annotations when your code is bundled and deployed to production?

## 14. References
- [TypeScript Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
