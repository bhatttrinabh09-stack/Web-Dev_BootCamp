// ==============================================================================
// Topic 08 Starter: Score & Grade Evaluator
// Run with: node grade_calculator.js
// ==============================================================================

/**
 * Evaluates a numeric student score and returns grade analysis.
 * @param {number} score - Raw exam score (0 to 100)
 * @param {boolean} hasExtraCredit - Whether extra credit (+5) applies
 * @returns {{ finalScore: number, letterGrade: string, isPassed: boolean } | 'INVALID_SCORE'}
 */
function evaluateStudentScore(score, hasExtraCredit) {
  // TODO: 1. Validate score: must be a number, not NaN, between 0 and 100 inclusive.
  //          If invalid, return 'INVALID_SCORE'.

  // TODO: 2. Apply extra credit (+5 points) if hasExtraCredit is strictly true,
  //          clamping the result so it does not exceed 100.

  // TODO: 3. Determine letter grade:
  //          90 - 100  -> 'A'
  //          80 - 89.9 -> 'B'
  //          70 - 79.9 -> 'C'
  //          60 - 69.9 -> 'D'
  //          < 60      -> 'F'

  // TODO: 4. Determine isPassed (true if finalScore >= 60, false otherwise).

  // TODO: 5. Return { finalScore, letterGrade, isPassed }.
  throw new Error("TODO: Implement evaluateStudentScore");
}

// ==============================================================================
// Automated Tests - Do not edit below this line
// ==============================================================================
function runTests() {
  console.log("Running Grade Evaluator Tests...\n");

  // Normal Case
  const res1 = evaluateStudentScore(85, false);
  console.assert(res1.finalScore === 85 && res1.letterGrade === "B" && res1.isPassed === true,
    `Test 1 Failed: Expected 85 B true, got ${JSON.stringify(res1)}`);
  console.log("✔ Test 1: Standard grade (85 -> B) passed.");

  // Extra Credit Clamping Case
  const res2 = evaluateStudentScore(98, true);
  console.assert(res2.finalScore === 100 && res2.letterGrade === "A",
    `Test 2 Failed: Expected 100 A, got ${JSON.stringify(res2)}`);
  console.log("✔ Test 2: Extra credit clamped to 100 passed.");

  // Boundary Case (Passing threshold)
  const res3 = evaluateStudentScore(60, false);
  console.assert(res3.finalScore === 60 && res3.letterGrade === "D" && res3.isPassed === true,
    `Test 3 Failed: Expected 60 D true, got ${JSON.stringify(res3)}`);
  console.log("✔ Test 3: Boundary threshold 60 passed.");

  // Failing Case
  const res4 = evaluateStudentScore(54, false);
  console.assert(res4.finalScore === 54 && res4.letterGrade === "F" && res4.isPassed === false,
    `Test 4 Failed: Expected 54 F false, got ${JSON.stringify(res4)}`);
  console.log("✔ Test 4: Failing grade evaluated correctly.");

  // Zero Case (Zero is valid score!)
  const resZero = evaluateStudentScore(0, false);
  console.assert(resZero.finalScore === 0 && resZero.letterGrade === "F" && resZero.isPassed === false,
    `Test Zero Failed: Expected 0 F false, got ${JSON.stringify(resZero)}`);
  console.log("✔ Test 5: Score of 0 handled correctly.");

  // Invalid Inputs
  console.assert(evaluateStudentScore(-10, false) === "INVALID_SCORE", "Negative score should be invalid");
  console.assert(evaluateStudentScore(105, false) === "INVALID_SCORE", "Score > 100 should be invalid");
  console.assert(evaluateStudentScore("85", false) === "INVALID_SCORE", "String score should be invalid");
  console.assert(evaluateStudentScore(NaN, false) === "INVALID_SCORE", "NaN should be invalid");
  console.log("✔ Test 6: Invalid inputs rejected properly.");

  console.log("\n🎉 All tests passed successfully!");
}

try {
  runTests();
} catch (err) {
  console.error("❌ Test run error:", err.message);
}
