// ==============================================================================
// Topic 13 Starter: Fetch, JSON, and HTTP States
// Follow instructions in README.md section 8.
// ==============================================================================

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
const BROKEN_ENDPOINT = "https://jsonplaceholder.typicode.com/invalid-route-404";

// DOM Elements
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const errorMessage = document.querySelector("#error-message");
const emptyState = document.querySelector("#empty-state");
const userGrid = document.querySelector("#user-grid");
const searchInput = document.querySelector("#search-input");
const retryBtn = document.querySelector("#retry-btn");
const simulateErrorBtn = document.querySelector("#simulate-error-btn");

let allUsers = [];
let activeUrl = API_ENDPOINT;

/**
 * Fetches users from the API and coordinates UI states.
 */
async function fetchUsers(url) {
  // TODO:
  // 1. Show loading state; hide error, empty, and user grid.
  // 2. Perform fetch(url)
  // 3. Verify response.ok. If false, throw an Error with the status code.
  // 4. Parse response.json()
  // 5. Save users in allUsers array and render.
  // 6. Handle errors in catch block: show error state and message.
}

/**
 * Renders user cards to the grid or triggers empty state.
 */
function renderUsers(users) {
  // TODO:
  // 1. If users.length === 0, show emptyState and hide userGrid.
  // 2. Otherwise, hide emptyState, populate userGrid with cards.
}

// TODO: Listen to searchInput 'input' event and filter allUsers by name

// Retry button triggers re-fetch
retryBtn.addEventListener("click", () => fetchUsers(API_ENDPOINT));

// Simulate Error button toggles broken endpoint
simulateErrorBtn.addEventListener("click", () => fetchUsers(BROKEN_ENDPOINT));

// Initial Load
fetchUsers(API_ENDPOINT);
