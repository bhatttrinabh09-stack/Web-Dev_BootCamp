// ==============================================================================
// Topic 15 Starter: TypeScript Transaction Processor
// Run with: npx tsx src/processor.ts
// ==============================================================================

// TODO 1: Define PaymentMethod union type ('credit_card' | 'bank_transfer' | 'crypto')

// TODO 2: Define Transaction interface
// - id: string
// - amount: number
// - currency: string
// - method: PaymentMethod
// - feeDiscountRate?: number (optional)

// TODO 3: Define TransactionSummary interface
// - totalProcessed: number
// - totalFees: number
// - transactionCount: number

/**
 * Calculates fee for a single transaction.
 */
export function calculateTransactionFee(tx: any): number {
  // TODO: Replace 'any' with Transaction type
  // Fees: credit_card -> 2.9%, bank_transfer -> 1.0%, crypto -> 0.5%
  // Apply feeDiscountRate if present
  throw new Error("TODO: Implement calculateTransactionFee");
}

/**
 * Aggregates a list of transactions into a summary.
 */
export function summarizeTransactions(txs: any[]): any {
  // TODO: Replace 'any' types with proper Transaction[] and TransactionSummary
  throw new Error("TODO: Implement summarizeTransactions");
}

// ==============================================================================
// Test Runner
// ==============================================================================
function runTests() {
  console.log("Running TypeScript Processor Tests...\n");

  const tx1 = {
    id: "tx-1",
    amount: 100,
    currency: "USD",
    method: "credit_card" as const,
  };

  const tx2 = {
    id: "tx-2",
    amount: 200,
    currency: "USD",
    method: "bank_transfer" as const,
    feeDiscountRate: 0.5, // 50% discount on the fee
  };

  const fee1 = calculateTransactionFee(tx1);
  console.assert(Math.abs(fee1 - 2.9) < 0.001, `Expected 2.90, got ${fee1}`);
  console.log("✔ Test 1: Credit card fee calculated correctly.");

  const fee2 = calculateTransactionFee(tx2);
  // Bank fee = 200 * 0.01 = 2.0. With 50% discount = 1.0
  console.assert(Math.abs(fee2 - 1.0) < 0.001, `Expected 1.00, got ${fee2}`);
  console.log("✔ Test 2: Discounted bank fee calculated correctly.");

  const summary = summarizeTransactions([tx1, tx2]);
  console.assert(summary.totalProcessed === 300, `Expected totalProcessed 300, got ${summary.totalProcessed}`);
  console.assert(summary.transactionCount === 2, `Expected count 2, got ${summary.transactionCount}`);
  console.log("✔ Test 3: Transaction summary aggregate passed.");

  console.log("\n🎉 All TypeScript tests passed!");
}

try {
  runTests();
} catch (err: any) {
  console.error("❌ Test failed:", err.message);
}
