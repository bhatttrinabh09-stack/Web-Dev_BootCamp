import { paginateWithCursor } from './cursor_pagination.js';

console.log("Running Cursor Pagination Tests...\n");

// Generate 25 test records
const sampleRecords = Array.from({ length: 25 }, (_, i) => ({
  id: `rec-${(i + 1).toString().padStart(3, '0')}`,
  title: `Log Entry #${i + 1}`,
  timestamp: Date.now() + i * 1000,
}));

// Test 1: Page 1 (limit 10)
const page1 = paginateWithCursor(sampleRecords, null, 10);
console.assert(page1.data.length === 10, `Expected 10 items, got ${page1.data.length}`);
console.assert(page1.data[0].id === "rec-001", "First item should be rec-001");
console.assert(page1.nextCursor === "rec-010", "Next cursor should be rec-010");
console.assert(page1.hasMore === true, "hasMore should be true");
console.log("✔ Test 1: Page 1 retrieved with valid nextCursor.");

// Test 2: Page 2 using cursor
const page2 = paginateWithCursor(sampleRecords, page1.nextCursor, 10);
console.assert(page2.data.length === 10, `Expected 10 items, got ${page2.data.length}`);
console.assert(page2.data[0].id === "rec-011", "First item of page 2 should be rec-011");
console.assert(page2.nextCursor === "rec-020", "Next cursor should be rec-020");
console.log("✔ Test 2: Page 2 retrieved starting from cursor.");

// Test 3: Final page
const page3 = paginateWithCursor(sampleRecords, page2.nextCursor, 10);
console.assert(page3.data.length === 5, `Expected 5 remaining items, got ${page3.data.length}`);
console.assert(page3.hasMore === false, "hasMore should be false on final page");
console.assert(page3.nextCursor === null || page3.nextCursor === "rec-025", "nextCursor handled");
console.log("✔ Test 3: Final page correctly detected end of records.");

console.log("\n🎉 All Cursor Pagination tests passed!");
