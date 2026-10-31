// ==============================================================================
// Bootcamp Live Portal - Client Application
// ==============================================================================

let topics = [];
let activeTopic = null;
let activeTopicData = null;
let eventSource = null;
let browserLogs = [];

// DOM Elements
const connectionStatus = document.getElementById('connection-status');
const activeTopicTitle = document.getElementById('active-topic-title');
const topicSearch = document.getElementById('topic-search');
const topicTree = document.getElementById('topic-tree');
const autorunToggle = document.getElementById('autorun-toggle');
const runBtn = document.getElementById('run-btn');

// Tabs & Views
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const previewFrame = document.getElementById('preview-frame');
const previewWrapper = document.getElementById('preview-wrapper');
const previewToolbar = document.getElementById('preview-toolbar');
const noPreviewPlaceholder = document.getElementById('no-preview-placeholder');
const reloadPreviewBtn = document.getElementById('reload-preview-btn');
const openExternalBtn = document.getElementById('open-external-btn');
const deviceButtons = document.querySelectorAll('.device-btn');
const previewIndicator = document.getElementById('preview-update-indicator');

// Terminal Elements
const terminalOutput = document.getElementById('terminal-output');
const terminalCommandTitle = document.getElementById('terminal-command-title');
const runnerStatusBadge = document.getElementById('runner-status-badge');
const clearTerminalBtn = document.getElementById('clear-terminal-btn');

// Instructions & Files
const instructionsContent = document.getElementById('instructions-content');
const starterFilesList = document.getElementById('starter-files-list');
const currentFileName = document.getElementById('current-file-name');
const currentFileContent = document.getElementById('current-file-content');

// Logs
const browserLogsList = document.getElementById('browser-logs-list');
const browserLogCount = document.getElementById('browser-log-count');
const clearLogsBtn = document.getElementById('clear-logs-btn');
const liveToast = document.getElementById('live-toast');

// 1. Initialize Real-Time Server-Sent Events (SSE)
function initSSE() {
  eventSource = new EventSource('/api/events');

  eventSource.onopen = () => {
    connectionStatus.className = 'connection-status connected';
    connectionStatus.querySelector('.status-label').textContent = 'Live Synced';
  };

  eventSource.onerror = () => {
    connectionStatus.className = 'connection-status';
    connectionStatus.querySelector('.status-label').textContent = 'Reconnecting...';
  };

  eventSource.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      handleServerEvent(data);
    } catch {}
  };
}

function showToast(message) {
  liveToast.textContent = message;
  liveToast.classList.add('show');
  setTimeout(() => liveToast.classList.remove('show'), 2000);
}

function handleServerEvent(event) {
  if (event.type === 'file_changed') {
    showToast(`⚡ Saved ${event.file} - Live Syncing...`);
    
    // Flash update indicator on Preview tab
    previewIndicator.classList.add('flash');
    setTimeout(() => previewIndicator.classList.remove('flash'), 1000);

    // If change is in currently active topic:
    if (activeTopic && event.topic === activeTopic.relPath) {
      // Reload file tree contents
      loadTopicDetails(activeTopic, false);

      // If Auto-Run is enabled and topic has a runner, execute immediately!
      if (autorunToggle.checked && activeTopic.runner) {
        console.log(`[Auto-Run] File changed in ${activeTopic.relPath}. Executing: ${activeTopic.runner}`);
        executeActiveTopicRunner();
      }
    }
  }

  if (event.type === 'runner_output') {
    if (activeTopic && event.topic === activeTopic.relPath) {
      terminalOutput.textContent += event.chunk;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }
}

// 2. Fetch Topics and Build Directory Tree
async function loadTopics() {
  try {
    const res = await fetch('/api/topics');
    topics = await res.json();
    renderTopicTree();

    // Select first topic or restored topic from URL hash
    const savedTopicId = window.location.hash.replace('#', '') || topics[0]?.relPath;
    const initial = topics.find(t => t.relPath === savedTopicId) || topics[0];
    if (initial) {
      selectTopic(initial);
    }
  } catch (err) {
    topicTree.innerHTML = `<div style="padding: 1rem; color: #ef4444;">Failed to load topics: ${err.message}</div>`;
  }
}

function renderTopicTree(filterText = '') {
  topicTree.innerHTML = '';
  const filter = filterText.toLowerCase();

  const grouped = topics.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    if (!filter || t.title.toLowerCase().includes(filter) || t.folderName.toLowerCase().includes(filter)) {
      acc[t.category].push(t);
    }
    return acc;
  }, {});

  for (const [category, catTopics] of Object.entries(grouped)) {
    if (catTopics.length === 0) continue;

    const groupDiv = document.createElement('div');
    groupDiv.className = 'category-group';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'category-title';
    titleDiv.textContent = `${category} (${catTopics.length})`;
    groupDiv.appendChild(titleDiv);

    catTopics.forEach(t => {
      const itemDiv = document.createElement('div');
      itemDiv.className = `topic-item ${activeTopic?.relPath === t.relPath ? 'active' : ''}`;
      
      const numMatch = t.folderName.match(/^([0-9]{2})/);
      const num = numMatch ? numMatch[1] : '';

      itemDiv.innerHTML = `
        <span class="topic-num">${num}</span>
        <span class="topic-name">${escapeHtml(t.title)}</span>
        <span class="topic-badge">${t.hasHtml ? 'HTML' : 'JS/Node'}</span>
      `;

      itemDiv.addEventListener('click', () => selectTopic(t));
      groupDiv.appendChild(itemDiv);
    });

    topicTree.appendChild(groupDiv);
  }
}

// 3. Select and Activate a Topic
async function selectTopic(topic) {
  activeTopic = topic;
  window.location.hash = topic.relPath;
  activeTopicTitle.textContent = topic.title;

  // Update active state in sidebar
  document.querySelectorAll('.topic-item').forEach(el => {
    el.classList.toggle('active', el.textContent.includes(topic.title));
  });

  // Load details
  await loadTopicDetails(topic, true);

  // Configure Live Preview
  if (topic.hasHtml) {
    const previewUrl = `/preview/${topic.relPath}/starter/index.html`;
    previewFrame.src = previewUrl;
    previewFrame.style.display = 'block';
    noPreviewPlaceholder.style.display = 'none';
    previewToolbar.style.display = 'flex';
    openExternalBtn.href = previewUrl;
    document.querySelector('#tab-btn-preview').click();
  } else {
    previewFrame.src = 'about:blank';
    previewFrame.style.display = 'none';
    noPreviewPlaceholder.style.display = 'block';
    previewToolbar.style.display = 'none';
    // If logic/backend, switch to runner or instructions
    if (topic.runner) {
      document.querySelector('#tab-btn-runner').click();
      executeActiveTopicRunner();
    } else {
      document.querySelector('#tab-btn-instructions').click();
    }
  }

  // Update runner controls
  if (topic.runner) {
    runBtn.style.display = 'inline-flex';
    terminalCommandTitle.textContent = topic.runner;
  } else {
    runBtn.style.display = 'none';
    terminalCommandTitle.textContent = 'bash';
  }
}

// 4. Load Topic Details (README & Files)
async function loadTopicDetails(topic, clearTerminal = true) {
  try {
    const res = await fetch(`/api/topic-details?path=${encodeURIComponent(topic.relPath)}`);
    activeTopicData = await res.json();

    // Render Instructions
    renderInstructions(activeTopicData.readme);

    // Render Starter Files
    renderStarterFiles(activeTopicData.files);

    if (clearTerminal) {
      terminalOutput.textContent = topic.runner 
        ? `Ready. Press 'Run Tests' (or save any file in your editor with Auto-Run enabled) to execute:\n> ${topic.runner}\n`
        : `No runner command configured for this topic. Use the Live Preview tab to inspect your work!`;
      runnerStatusBadge.textContent = 'Idle';
      runnerStatusBadge.style.background = '#1e293b';
      runnerStatusBadge.style.color = '#cbd5e1';
    }
  } catch (err) {
    instructionsContent.innerHTML = `<p style="color: red;">Failed to load topic details: ${err.message}</p>`;
  }
}

// 5. Execute Runner Command
async function executeActiveTopicRunner() {
  if (!activeTopic || !activeTopic.runner) return;

  runnerStatusBadge.textContent = 'Running...';
  runnerStatusBadge.style.background = '#f59e0b';
  runnerStatusBadge.style.color = '#0f172a';
  terminalOutput.textContent = `> ${activeTopic.runner}\n\n`;

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicPath: activeTopic.relPath }),
    });

    const result = await res.json();
    terminalOutput.textContent = result.output;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

    if (result.code === 0) {
      runnerStatusBadge.textContent = 'Passing ✔';
      runnerStatusBadge.style.background = '#22c55e';
      runnerStatusBadge.style.color = '#0f172a';
    } else {
      runnerStatusBadge.textContent = `Exit ${result.code} ✘`;
      runnerStatusBadge.style.background = '#ef4444';
      runnerStatusBadge.style.color = 'white';
    }
  } catch (err) {
    terminalOutput.textContent += `\nError executing runner: ${err.message}`;
    runnerStatusBadge.textContent = 'Error';
    runnerStatusBadge.style.background = '#ef4444';
  }
}

// 6. Format and Render Markdown Instructions with Interactive Hints
function renderInstructions(markdown) {
  if (!markdown) {
    instructionsContent.innerHTML = '<p>No README found for this topic.</p>';
    return;
  }

  // Simple, clean markdown-to-HTML converter
  let html = markdown
    // Headings
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    // Code blocks
    .replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre><code class="lang-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" style="color: #38bdf8;">$1</a>')
    // Unordered lists
    .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
    // Checklist items
    .replace(/<li>\[ \] (.*?)<\/li>/gim, '<li style="list-style: none;"><label><input type="checkbox" style="margin-right: 8px;"> $1</label></li>')
    .replace(/<li>\[x\] (.*?)<\/li>/gim, '<li style="list-style: none;"><label><input type="checkbox" checked style="margin-right: 8px;"> $1</label></li>');

  // Wrap consecutive <li> into <ul>
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<ul') || p.startsWith('<ol')) return p;
    return `<p>${p}</p>`;
  }).join('\n');

  instructionsContent.innerHTML = html;

  // Enhance hints section with collapsible spoiler disclosures
  enhanceHintsSection();
}

function enhanceHintsSection() {
  const headings = instructionsContent.querySelectorAll('h2');
  headings.forEach(h2 => {
    if (h2.textContent.includes('Hints')) {
      let current = h2.nextElementSibling;
      let hintIndex = 1;
      while (current && current.tagName !== 'H2') {
        if (current.tagName === 'OL' || current.tagName === 'UL') {
          const listItems = current.querySelectorAll('li');
          const wrapper = document.createElement('div');

          listItems.forEach(li => {
            const card = document.createElement('div');
            card.className = 'hint-card';
            card.innerHTML = `
              <button class="hint-trigger">💡 Reveal Hint ${hintIndex} (No Spoiler)</button>
              <div class="hint-body">${li.innerHTML}</div>
            `;
            const trigger = card.querySelector('.hint-trigger');
            const body = card.querySelector('.hint-body');
            trigger.addEventListener('click', () => {
              body.classList.toggle('open');
              trigger.textContent = body.classList.contains('open') ? `Hide Hint ${hintIndex}` : `💡 Reveal Hint ${hintIndex}`;
            });
            wrapper.appendChild(card);
            hintIndex++;
          });

          current.replaceWith(wrapper);
          break;
        }
        current = current.nextElementSibling;
      }
    }
  });
}

// 7. Render Starter Files View
function renderStarterFiles(files) {
  starterFilesList.innerHTML = '';
  if (!files || files.length === 0) {
    starterFilesList.innerHTML = '<div style="padding: 1rem; color: #64748b;">No starter files found.</div>';
    currentFileName.textContent = 'None';
    currentFileContent.textContent = '// No files available';
    return;
  }

  files.forEach((f, index) => {
    const item = document.createElement('div');
    item.className = `file-item ${index === 0 ? 'active' : ''}`;
    item.textContent = f.path;
    item.addEventListener('click', () => {
      document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      displayFileContent(f);
    });
    starterFilesList.appendChild(item);
  });

  // Display first file
  displayFileContent(files[0]);
}

function displayFileContent(file) {
  currentFileName.textContent = file.path;
  currentFileContent.textContent = file.content || '// [Binary or unreadable file]';
}

// 8. Capture Console Messages from Preview Frame
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'exercise_console') {
    addBrowserLog(event.data.level, event.data.text);
  }
});

function addBrowserLog(level, text) {
  if (browserLogs.length === 0) {
    browserLogsList.innerHTML = '';
  }

  const entry = document.createElement('div');
  entry.className = `log-entry ${level}`;
  const time = new Date().toLocaleTimeString();
  entry.textContent = `[${time}] ${text}`;
  browserLogsList.appendChild(entry);
  browserLogsList.scrollTop = browserLogsList.scrollHeight;

  browserLogs.push({ level, text });
  browserLogCount.textContent = browserLogs.length;
}

// 9. Event Listeners & Controls
topicSearch.addEventListener('input', (e) => {
  renderTopicTree(e.target.value);
});

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panelId = btn.dataset.tab;
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  });
});

deviceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    deviceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    previewFrame.style.width = btn.dataset.width;
  });
});

reloadPreviewBtn.addEventListener('click', () => {
  if (previewFrame.src && previewFrame.src !== 'about:blank') {
    previewFrame.src = previewFrame.src;
  }
});

runBtn.addEventListener('click', () => {
  document.querySelector('#tab-btn-runner').click();
  executeActiveTopicRunner();
});

clearTerminalBtn.addEventListener('click', () => {
  terminalOutput.textContent = '';
});

clearLogsBtn.addEventListener('click', () => {
  browserLogs = [];
  browserLogCount.textContent = '0';
  browserLogsList.innerHTML = '<div class="log-empty">No console logs recorded yet.</div>';
});

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Start Portal
initSSE();
loadTopics();

