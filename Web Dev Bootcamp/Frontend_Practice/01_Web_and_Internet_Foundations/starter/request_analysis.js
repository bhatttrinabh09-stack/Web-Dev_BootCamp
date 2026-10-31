// ==============================================================================
// Topic 01 Starter: URL and HTTP Status Analyzer
// Run with: node request_analysis.js
// ==============================================================================

/**
 * Parses a raw URL string into its structural components.
 * @param {string} rawUrl
 * @returns {object} { protocol, hostname, port, pathname, queryParams, hash }
 */
function parseUrl(rawUrl) {
  // TODO: Use the built-in URL API to parse rawUrl.
  // Transform url.searchParams into a plain JavaScript key-value object.
  // Return the specified shape.
  throw new Error("TODO: Implement parseUrl");
}

/**
 * Categorizes an HTTP numeric status code.
 * @param {number} code
 * @returns {'Informational' | 'Success' | 'Redirection' | 'Client Error' | 'Server Error' | 'Invalid'}
 */
function categorizeStatusCode(code) {
  // TODO: Implement status code categorization based on RFC standard ranges.
  throw new Error("TODO: Implement categorizeStatusCode");
}

// ==============================================================================
// Automated Tests - Do not edit below this line
// ==============================================================================
function runTests() {
  console.log("Running URL & HTTP Analyzer Tests...\n");

  // Test 1: Full URL
  const testUrl = "https://developer.mozilla.org:443/en-US/search?q=css&sort=desc#results";
  const parsed = parseUrl(testUrl);
  console.assert(parsed.protocol === "https:", `Expected 'https:', got ${parsed.protocol}`);
  console.assert(parsed.hostname === "developer.mozilla.org", `Expected 'developer.mozilla.org', got ${parsed.hostname}`);
  console.assert(parsed.pathname === "/en-US/search", `Expected '/en-US/search', got ${parsed.pathname}`);
  console.assert(parsed.queryParams.q === "css", `Expected query 'q' to be 'css', got ${parsed.queryParams.q}`);
  console.assert(parsed.queryParams.sort === "desc", `Expected query 'sort' to be 'desc', got ${parsed.queryParams.sort}`);
  console.assert(parsed.hash === "#results", `Expected '#results', got ${parsed.hash}`);
  console.log("✔ Test 1: Full URL parsed successfully.");

  // Test 2: Minimal URL
  const minUrl = "http://localhost:3000/api";
  const parsedMin = parseUrl(minUrl);
  console.assert(parsedMin.port === "3000", `Expected '3000', got ${parsedMin.port}`);
  console.assert(Object.keys(parsedMin.queryParams).length === 0, "Expected empty queryParams");
  console.log("✔ Test 2: Minimal URL parsed successfully.");

  // Test 3: Status Codes
  console.assert(categorizeStatusCode(200) === "Success", "200 should be Success");
  console.assert(categorizeStatusCode(201) === "Success", "201 should be Success");
  console.assert(categorizeStatusCode(301) === "Redirection", "301 should be Redirection");
  console.assert(categorizeStatusCode(404) === "Client Error", "404 should be Client Error");
  console.assert(categorizeStatusCode(500) === "Server Error", "500 should be Server Error");
  console.assert(categorizeStatusCode(999) === "Invalid", "999 should be Invalid");
  console.log("✔ Test 3: HTTP status codes categorized correctly.");

  console.log("\n🎉 All tests passed successfully!");
}

try {
  runTests();
} catch (err) {
  console.error("❌ Test failed:", err.message);
}
