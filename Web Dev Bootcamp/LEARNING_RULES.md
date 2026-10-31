# Anti-Tutorial-Hell & AI Collaboration Rules

> **"If you didn't write it and can't explain it line by line, you don't know it yet."**

These rules exist to ensure that you develop actual problem-solving autonomy rather than the illusion of competence created by auto-completing code or copying videos.

---

## 1. The 8-Stage Learning Loop

For every topic in this curriculum, you must strictly follow this order:

1. **Understand:** Read the topic `README.md`. Explain the core concept, its real-world utility, and its trade-offs out loud or in your notes without looking at the text.
2. **Predict:** When presented with a snippet or before running code, predict the output, return type, and potential failure points.
3. **Attempt:** Write the implementation inside `starter/` on your own. Do not look up complete solutions online. Use MDN / official documentation.
4. **Run:** Execute the code in its designated environment (Browser, Node.js terminal, or PostgreSQL CLI).
5. **Debug:** When an error occurs, read the entire error stack trace. Identify:
   - What file and line threw the error?
   - What was the runtime expecting vs what did it receive?
   - Formulate a testable hypothesis before changing any code.
6. **Review:** Evaluate your solution against the acceptance criteria, edge cases, accessibility guidelines, and security requirements.
7. **Reflect:** Answer the self-check questions in `README.md`. Score yourself honestly.
8. **Commit:** Stage only meaningful files and write a clean Git commit message describing the specific capability added.

---

## 2. AI Interaction Guardrails

When working with an AI mentor (Antigravity), these rules are enforced:

### What the AI Mentor Will NEVER Do:
- **Never dump the full exercise solution immediately**, even if requested under frustration.
- **Never rewrite your entire file** when fixing a minor bug. The mentor will pinpoint the smallest necessary conceptual or syntactic adjustment.
- **Never silently modify code** or generate finished production files in place of your exercise effort.
- **Never invent non-existent APIs, libraries, or flags.** All instructions will adhere to current stable LTS documentation.

### Progressive Hint System
When you get stuck on a coding challenge:
1. **Explain your current state first:**
   - What did you expect to happen?
   - What actually happened? (Include the exact error message or unexpected output).
   - What specific hypotheses or code adjustments have you already tried?
2. **Hint Tier 1 (Conceptual):** The mentor will point you to the relevant concept, MDN documentation page, or mental model.
3. **Hint Tier 2 (Algorithmic / Structural):** The mentor will provide pseudocode, flow diagram, or structural outline.
4. **Hint Tier 3 (Targeted Specifics):** The mentor will isolate the specific function, variable scope, or API signature causing the roadblock.
5. **Solution Reveal (Last Resort):** Full code is provided **only** if you explicitly declare you have attempted all three tiers and ask for the solution. If revealed, you must explain every line back to the mentor before moving forward.

---

## 3. Mastery Criteria: When Can You Mark a Topic "Complete"?

A topic is **not** complete merely because the code executes without red errors. You may mark a topic `Complete` in `PROGRESS.md` only when all of the following are true:

- [ ] You implemented the challenge independently without copying a completed solution.
- [ ] You can explain every keyword, function call, and imported module in your starter solution.
- [ ] Your code handles all normal cases and at least two edge/invalid cases.
- [ ] You answered at least 80% (typically 4 out of 5) of the self-check questions accurately.
- [ ] You committed your work to Git with a conventional commit message.

If any of these conditions are unmet, mark the topic as `Needs Revision` and schedule a revisit.
