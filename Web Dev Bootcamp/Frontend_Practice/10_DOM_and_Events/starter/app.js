// ==============================================================================
// Topic 10 Starter: DOM and Event Delegation Task Manager
// Implement according to README instructions.
// ==============================================================================

// 1. DOM References
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMsg = document.querySelector("#error-msg");
const itemsLeft = document.querySelector("#items-left");
const filterButtons = document.querySelectorAll(".filter-btn");

// Application State
let tasks = [];
let currentFilter = "all";

/**
 * Renders tasks to the DOM safely.
 */
function renderTasks() {
  // TODO:
  // 1. Clear existing taskList content.
  // 2. Filter tasks based on currentFilter ('all', 'active', 'completed').
  // 3. For each task, construct a semantic <li> using createElement.
  //    IMPORTANT: Set task text using .textContent to prevent XSS vulnerabilities!
  // 4. Update the itemsLeft counter text.
}

// TODO: Handle Form Submit (Add Task)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // 1. Read taskInput.value.trim()
  // 2. If empty, show errorMsg.
  // 3. If valid, hide errorMsg, create new task object: { id: Date.now().toString(), text, completed: false }
  // 4. Push to tasks array, clear input, call renderTasks().
});

// TODO: Handle Task List Actions (Toggle & Delete) via EVENT DELEGATION
taskList.addEventListener("click", (e) => {
  // 1. Check if clicked target is a checkbox (.task-checkbox) -> toggle task.completed
  // 2. Check if clicked target is delete button (.delete-btn) -> remove task from tasks
  // 3. Call renderTasks()
});

// TODO: Handle Filter Buttons
filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // 1. Remove .active from all buttons, add to clicked button
    // 2. Set currentFilter to e.target.dataset.filter
    // 3. Call renderTasks()
  });
});
