// ==============================================================================
// Topic 11 Starter: Browser Storage & Web APIs
// Follow instructions in README.md section 8.
// ==============================================================================

const STORAGE_KEY = "dev_bootcamp_tasks";
const taskListEl = document.querySelector("#task-list");
const addBtn = document.querySelector("#add-prompt-btn");
const shareBtn = document.querySelector("#share-btn");
const clearBtn = document.querySelector("#clear-btn");
const toastEl = document.querySelector("#toast");

let toastTimer = null;

/**
 * Defensively loads tasks from localStorage or URL query params.
 * @returns {Array<{ id: string, text: string }>}
 */
function loadTasks() {
  // TODO 1: Check URLSearchParams for 'tasks' parameter.
  //         If present, parse and return it.

  // TODO 2: If no URL params, load from localStorage with try/catch.
  //         If missing or invalid JSON, return an empty array [].
  return [];
}

/**
 * Persists tasks array to localStorage.
 * @param {Array} tasks
 */
function saveTasks(tasks) {
  // TODO: Serialize with JSON.stringify and store under STORAGE_KEY
}

function renderTasks(tasks) {
  taskListEl.innerHTML = "";
  tasks.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    });

    li.appendChild(delBtn);
    taskListEl.appendChild(li);
  });
}

let appTasks = loadTasks();
renderTasks(appTasks);

addBtn.addEventListener("click", () => {
  const text = prompt("Enter task:");
  if (text && text.trim()) {
    appTasks.push({ id: Date.now().toString(), text: text.trim() });
    saveTasks(appTasks);
    renderTasks(appTasks);
  }
});

clearBtn.addEventListener("click", () => {
  appTasks = [];
  localStorage.removeItem(STORAGE_KEY);
  renderTasks(appTasks);
});

// TODO 3: Implement Shareable Link using URLSearchParams & navigator.clipboard
shareBtn.addEventListener("click", async () => {
  // 1. Create a URL containing current tasks in search params
  // 2. Write URL to navigator.clipboard.writeText(...)
  // 3. Show toast notification for 2000ms using setTimeout
});
