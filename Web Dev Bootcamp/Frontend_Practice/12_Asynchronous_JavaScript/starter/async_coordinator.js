// ==============================================================================
// Topic 12 Starter: Asynchronous Trip Booking Coordinator
// Run with: node async_coordinator.js
// ==============================================================================

// Mock Backend Services (Do not modify mock services)
function mockFetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === "invalid") {
        reject(new Error("User not found"));
      } else {
        resolve({ id: userId, name: "Samira Vance", tier: "Gold" });
      }
    }, 100);
  });
}

function mockFetchFlights(destination) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { flightNo: "FL-101", destination, price: 350 },
        { flightNo: "FL-204", destination, price: 420 },
      ]);
    }, 150);
  });
}

function mockFetchHotels(destination) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (destination === "Nowhere") {
        reject(new Error("No hotels found at destination"));
      } else {
        resolve([
          { hotelName: "Grand Central", destination, nightRate: 180 },
          { hotelName: "Boutique Suites", destination, nightRate: 220 },
        ]);
      }
    }, 150);
  });
}

/**
 * Coordinates user validation and concurrent travel bookings.
 * @param {string} userId
 * @param {string} destination
 * @returns {Promise<object>}
 */
async function bookTrip(userId, destination) {
  // TODO 1: Fetch user with mockFetchUser(userId).
  
  // TODO 2: Once user is fetched, fetch flights AND hotels IN PARALLEL
  //         using Promise.all([mockFetchFlights(...), mockFetchHotels(...)])
  
  // TODO 3: Return consolidated itinerary:
  //         { status: 'confirmed', user, flights, hotels, bookedAt: new Date().toISOString() }
  
  // TODO 4: Wrap everything in try/catch. On failure, return:
  //         { status: 'failed', reason: err.message }

  throw new Error("TODO: Implement bookTrip");
}

// ==============================================================================
// Automated Tests
// ==============================================================================
async function runTests() {
  console.log("Running Asynchronous Coordinator Tests...\n");

  // Test 1: Successful parallel booking
  const t0 = Date.now();
  const result = await bookTrip("usr-77", "Tokyo");
  const duration = Date.now() - t0;

  console.assert(result.status === "confirmed", `Expected status 'confirmed', got ${result.status}`);
  console.assert(result.flights.length === 2, "Expected 2 flight options");
  console.assert(result.hotels.length === 2, "Expected 2 hotel options");
  // Duration check: Sequential would take 100 + 150 + 150 = ~400ms.
  // Parallel should take ~250ms (allow cushion up to 350ms).
  console.assert(duration < 350, `Too slow (${duration}ms)! Did you run flights and hotels in parallel?`);
  console.log(`✔ Test 1: Trip confirmed in ${duration}ms (parallel execution verified).`);

  // Test 2: Invalid user failure
  const failUser = await bookTrip("invalid", "Tokyo");
  console.assert(failUser.status === "failed", "Expected failure for invalid user");
  console.assert(failUser.reason === "User not found", `Expected 'User not found', got ${failUser.reason}`);
  console.log("✔ Test 2: Handled invalid user rejection gracefully.");

  // Test 3: Hotel failure
  const failHotel = await bookTrip("usr-77", "Nowhere");
  console.assert(failHotel.status === "failed", "Expected failure for unknown destination");
  console.assert(failHotel.reason === "No hotels found at destination", "Expected hotel failure reason");
  console.log("✔ Test 3: Handled hotel rejection gracefully.");

  console.log("\n🎉 All async tests passed successfully!");
}

runTests().catch(err => console.error("Test runner crashed:", err));
