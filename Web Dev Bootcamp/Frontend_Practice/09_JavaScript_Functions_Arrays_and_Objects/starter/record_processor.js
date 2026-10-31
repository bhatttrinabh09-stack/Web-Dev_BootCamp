// ==============================================================================
// Topic 09 Starter: E-Commerce Order Record Processor
// Run with: node record_processor.js
// ==============================================================================

/**
 * Filter orders by their status ('completed', 'pending', 'cancelled').
 * Pure function: MUST NOT mutate the input array.
 */
function filterOrdersByStatus(orders, status) {
  // TODO: Use .filter() to return matching orders
  throw new Error("TODO: Implement filterOrdersByStatus");
}

/**
 * Extract unique customer emails, sorted alphabetically.
 * Pure function: MUST NOT mutate the input array.
 */
function getUniqueCustomerEmails(orders) {
  // TODO: Map to customer emails, remove duplicates, and sort alphabetically
  throw new Error("TODO: Implement getUniqueCustomerEmails");
}

/**
 * Calculate total revenue grouped by item category.
 * @returns {Record<string, number>} e.g. { Electronics: 1500, Office: 85 }
 */
function calculateTotalRevenueByCategory(orders) {
  // TODO: Use .reduce() to iterate over orders and sum item prices by category
  throw new Error("TODO: Implement calculateTotalRevenueByCategory");
}

/**
 * Find the single order with the highest total amount.
 * @returns {object | null}
 */
function findHighestValueOrder(orders) {
  // TODO: Find and return order with max totalAmount, or null if empty
  throw new Error("TODO: Implement findHighestValueOrder");
}

// ==============================================================================
// Sample Data & Automated Tests
// ==============================================================================
const sampleOrders = Object.freeze([
  {
    id: "ord-001",
    customerEmail: "maria@example.com",
    category: "Electronics",
    totalAmount: 499.99,
    status: "completed",
  },
  {
    id: "ord-002",
    customerEmail: "devon@example.com",
    category: "Books",
    totalAmount: 29.50,
    status: "completed",
  },
  {
    id: "ord-003",
    customerEmail: "maria@example.com", // Duplicate customer
    category: "Electronics",
    totalAmount: 149.00,
    status: "pending",
  },
  {
    id: "ord-004",
    customerEmail: "alex@example.com",
    category: "Office",
    totalAmount: 85.20,
    status: "completed",
  },
  {
    id: "ord-005",
    customerEmail: "devon@example.com",
    category: "Electronics",
    totalAmount: 1200.00,
    status: "cancelled",
  },
]);

function runTests() {
  console.log("Running Record Processor Tests...\n");

  // Test 1: Filter by Status
  const completed = filterOrdersByStatus(sampleOrders, "completed");
  console.assert(completed.length === 3, `Expected 3 completed orders, got ${completed.length}`);
  console.assert(completed.every(o => o.status === "completed"), "All items must be completed");
  console.log("✔ Test 1: Filter by status passed.");

  // Test 2: Unique Customer Emails
  const emails = getUniqueCustomerEmails(sampleOrders);
  console.assert(emails.length === 3, `Expected 3 unique emails, got ${emails.length}`);
  console.assert(emails[0] === "alex@example.com", `Expected alex first, got ${emails[0]}`);
  console.assert(emails[1] === "devon@example.com", `Expected devon second, got ${emails[1]}`);
  console.assert(emails[2] === "maria@example.com", `Expected maria third, got ${emails[2]}`);
  console.log("✔ Test 2: Unique sorted emails passed.");

  // Test 3: Revenue by Category (only completed orders count toward revenue)
  const revenue = calculateTotalRevenueByCategory(completed);
  console.assert(Math.round(revenue.Electronics) === 500, `Expected ~500 for Electronics, got ${revenue.Electronics}`);
  console.assert(Math.round(revenue.Books) === 30, `Expected ~30 for Books, got ${revenue.Books}`);
  console.assert(Math.round(revenue.Office) === 85, `Expected ~85 for Office, got ${revenue.Office}`);
  console.log("✔ Test 3: Revenue by category passed.");

  // Test 4: Highest Value Order
  const highest = findHighestValueOrder(sampleOrders);
  console.assert(highest.id === "ord-005", `Expected ord-005, got ${highest?.id}`);
  console.assert(findHighestValueOrder([]) === null, "Empty array must return null");
  console.log("✔ Test 4: Highest value order passed.");

  console.log("\n🎉 All tests passed successfully!");
}

try {
  runTests();
} catch (err) {
  console.error("❌ Test run failed:", err.message);
}
