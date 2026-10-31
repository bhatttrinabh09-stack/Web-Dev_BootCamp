import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;

// Connected SSE clients for live reload and output streaming
const sseClients = new Set();

function broadcastEvent(type, payload = {}) {
  const message = `data: ${JSON.stringify({ type, ...payload })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Map of topics
function scanTopics() {
  const categories = [
    { name: 'Frontend Practice', folder: 'Frontend_Practice', prefix: 'FE' },
    { name: 'Backend Practice', folder: 'Backend_Practice', prefix: 'BE' },
    { name: 'Milestone Projects', folder: 'Projects', prefix: 'PRJ' },
  ];

  const results = [];

  for (const cat of categories) {
    const catPath = path.join(ROOT_DIR, cat.folder);
    if (!fs.existsSync(catPath)) continue;

    const items = fs.readdirSync(catPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort();

    for (const item of items) {
      const topicRelPath = path.join(cat.folder, item);
      const topicFullPath = path.join(ROOT_DIR, topicRelPath);
      const starterPath = path.join(topicFullPath, 'starter');
      const readmePath = path.join(topicFullPath, 'README.md');

      let title = item.replace(/^[0-9]+_/, '').replace(/_/g, ' ');
      let runner = null;
      let hasHtml = false;
      let starterFiles = [];

      if (fs.existsSync(starterPath)) {
        try {
          starterFiles = fs.readdirSync(starterPath);
          hasHtml = starterFiles.some(f => f.endsWith('.html'));

          // Determine default runner command
          if (starterFiles.includes('package.json')) {
            try {
              const pkg = JSON.parse(fs.readFileSync(path.join(starterPath, 'package.json'), 'utf-8'));
              if (pkg.scripts && pkg.scripts.test) runner = 'npm test';
              else if (pkg.scripts && pkg.scripts.start) runner = 'npm start';
            } catch {}
          }
          
          if (!runner) {
            const testFile = starterFiles.find(f => f.startsWith('test_') && f.endsWith('.js'));
            const verifyFile = starterFiles.find(f => f.startsWith('verify_') && f.endsWith('.js'));
            const jsFile = starterFiles.find(f => f.endsWith('.js') && f !== 'test_server.js');

            if (testFile) runner = `node ${testFile}`;
            else if (verifyFile) runner = `node ${verifyFile}`;
            else if (jsFile) runner = `node ${jsFile}`;
            else if (starterFiles.includes('setup_task.sh')) runner = `bash setup_task.sh`;
            else if (starterFiles.some(f => f.endsWith('.ts'))) runner = `npx tsx src/processor.ts`;
          }
        } catch {}
      }

      // Read title from README if present
      if (fs.existsSync(readmePath)) {
        try {
          const firstLine = fs.readFileSync(readmePath, 'utf-8').split('\n')[0];
          if (firstLine.startsWith('# ')) {
            title = firstLine.replace('# ', '').trim();
          }
        } catch {}
      }

      results.push({
        id: topicRelPath,
        category: cat.name,
        folderName: item,
        relPath: topicRelPath,
        title,
        runner,
        hasHtml,
        starterFiles,
      });
    }
  }

  return results;
}

// Execute runner command
let activeProcess = null;

function runTopicCommand(topicRelPath, onOutput, onComplete) {
  const topics = scanTopics();
  const topic = topics.find(t => t.relPath === topicRelPath);

  if (!topic || !topic.runner) {
    onComplete({ code: 0, output: 'No automated runner configured for this topic. Use the Live Preview tab to inspect your work!' });
    return;
  }

  const starterDir = path.join(ROOT_DIR, topicRelPath, 'starter');
  if (!fs.existsSync(starterDir)) {
    onComplete({ code: 1, output: `Starter directory not found: ${starterDir}` });
    return;
  }

  if (activeProcess) {
    try { activeProcess.kill(); } catch {}
  }

  const [cmd, ...args] = topic.runner.split(' ');
  const startTime = Date.now();
  let fullOutput = `> Running in ${topicRelPath}/starter: ${topic.runner}\n\n`;

  onOutput(fullOutput);

  try {
    activeProcess = spawn(cmd, args, {
      cwd: starterDir,
      shell: true,
      env: { ...process.env, FORCE_COLOR: '1' },
    });

    activeProcess.stdout.on('data', data => {
      const text = data.toString();
      fullOutput += text;
      onOutput(text);
    });

    activeProcess.stderr.on('data', data => {
      const text = data.toString();
      fullOutput += text;
      onOutput(text);
    });

    activeProcess.on('close', code => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      const summary = `\n\n----------------------------------------\nProcess exited with code ${code} (${duration}s)\n`;
      fullOutput += summary;
      onOutput(summary);
      activeProcess = null;
      onComplete({ code, output: fullOutput, duration });
    });

    activeProcess.on('error', err => {
      const errorMsg = `\nFailed to start command: ${err.message}\n`;
      fullOutput += errorMsg;
      onOutput(errorMsg);
      activeProcess = null;
      onComplete({ code: 1, output: fullOutput });
    });
  } catch (err) {
    onComplete({ code: 1, output: `Spawn error: ${err.message}` });
  }
}

// Watcher for real-time reload and auto-run
let debounceTimer = null;
let lastActiveTopic = null;

function setupWatcher() {
  const watchPaths = [
    path.join(ROOT_DIR, 'Frontend_Practice'),
    path.join(ROOT_DIR, 'Backend_Practice'),
    path.join(ROOT_DIR, 'Projects'),
  ];

  for (const wp of watchPaths) {
    if (!fs.existsSync(wp)) continue;
    try {
      fs.watch(wp, { recursive: true }, (eventType, filename) => {
        if (!filename || filename.includes('.git') || filename.includes('node_modules')) return;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          // Identify which topic folder was changed
          const parts = filename.split(path.sep);
          const categoryFolder = path.basename(wp);
          const topicFolder = parts[0];
          const changedTopicPath = path.join(categoryFolder, topicFolder);

          console.log(`[Watch] File changed in ${changedTopicPath}: ${filename}`);

          broadcastEvent('file_changed', {
            topic: changedTopicPath,
            file: filename,
            time: new Date().toLocaleTimeString(),
          });
        }, 150);
      });
    } catch (err) {
      console.warn(`[Watch Warning] Could not watch ${wp}:`, err.message);
    }
  }
}

// Injected live-reload and console-capturing script
const INJECTED_LIVE_SCRIPT = `
<!-- ================= LIVE RELOAD & CONSOLE STREAM INJECTION ================= -->
<script>
  (function() {
    // 1. Live reload via Server-Sent Events
    try {
      const evtSource = new EventSource('/api/events');
      evtSource.onmessage = function(event) {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'file_changed') {
            console.log('[Live Portal] File change detected, reloading frame...');
            window.location.reload();
          }
        } catch(e) {}
      };
    } catch(e) {}

    // 2. Intercept console logs and post to parent window
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    function sendToParent(type, args) {
      try {
        const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        window.parent.postMessage({ type: 'exercise_console', level: type, text }, '*');
      } catch(e) {}
    }

    console.log = function(...args) {
      originalLog.apply(console, args);
      sendToParent('log', args);
    };
    console.error = function(...args) {
      originalError.apply(console, args);
      sendToParent('error', args);
    };
    console.warn = function(...args) {
      originalWarn.apply(console, args);
      sendToParent('warn', args);
    };
    window.addEventListener('error', function(err) {
      sendToParent('error', [err.message + ' at ' + (err.filename || '') + ':' + (err.lineno || '')]);
    });
  })();
</script>
<!-- ========================================================================== -->
`;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown',
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(urlObj.pathname);

  // 1. SSE Endpoint for Real-Time Events
  if (pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('data: {"type":"connected"}\n\n');
    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // 2. API: Get List of All Topics
  if (pathname === '/api/topics') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(scanTopics()));
    return;
  }

  // 3. API: Get Topic Details (README + Starter File Listing)
  if (pathname === '/api/topic-details') {
    const topicPath = urlObj.searchParams.get('path');
    if (!topicPath) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing path parameter' }));
      return;
    }

    const fullTopicPath = path.join(ROOT_DIR, topicPath);
    const readmeFile = path.join(fullTopicPath, 'README.md');
    const starterDir = path.join(fullTopicPath, 'starter');

    let readmeContent = '';
    if (fs.existsSync(readmeFile)) {
      readmeContent = fs.readFileSync(readmeFile, 'utf-8');
    }

    const files = [];
    if (fs.existsSync(starterDir)) {
      function walk(dir, rel = '') {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const ent of entries) {
          const entryRel = path.join(rel, ent.name);
          const entryFull = path.join(dir, ent.name);
          if (ent.isDirectory()) {
            walk(entryFull, entryRel);
          } else {
            let content = '';
            try {
              // Read text files
              if (/\.(html|css|js|ts|tsx|json|md|sql|sh)$/.test(ent.name)) {
                content = fs.readFileSync(entryFull, 'utf-8');
              }
            } catch {}
            files.push({
              name: ent.name,
              path: entryRel,
              content,
            });
          }
        }
      }
      walk(starterDir);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      readme: readmeContent,
      files,
    }));
    return;
  }

  // 4. API: Execute Runner Command
  if (pathname === '/api/run' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { topicPath } = JSON.parse(body);
        lastActiveTopic = topicPath;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        runTopicCommand(topicPath, (chunk) => {
          broadcastEvent('runner_output', { topic: topicPath, chunk });
        }, (result) => {
          res.end(JSON.stringify(result));
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 5. Preview Static Server (Serves Starter Files with Live Reload Injection)
  if (pathname.startsWith('/preview/')) {
    const rawFilePath = pathname.replace('/preview/', '');
    let targetFile = path.join(ROOT_DIR, rawFilePath);

    // If directory, look for index.html
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory()) {
      targetFile = path.join(targetFile, 'index.html');
    }

    if (!fs.existsSync(targetFile) || fs.statSync(targetFile).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`<h2>404: Preview file not found</h2><p>${targetFile}</p>`);
      return;
    }

    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      if (ext === '.html') {
        let html = fs.readFileSync(targetFile, 'utf-8');
        // Inject live reload script
        if (html.includes('</body>')) {
          html = html.replace('</body>', `${INJECTED_LIVE_SCRIPT}</body>`);
        } else {
          html += INJECTED_LIVE_SCRIPT;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
      }

      const stream = fs.createReadStream(targetFile);
      res.writeHead(200, { 'Content-Type': contentType });
      stream.pipe(res);
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error serving file: ${err.message}`);
      return;
    }
  }

  // 6. Serve Portal Front-End Static Assets
  let portalFile = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(portalFile) || fs.statSync(portalFile).isDirectory()) {
    portalFile = path.join(__dirname, 'public', 'index.html');
  }

  const ext = path.extname(portalFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const stream = fs.createReadStream(portalFile);
    res.writeHead(200, { 'Content-Type': contentType });
    stream.pipe(res);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n================================================================`);
  console.log(`🚀 BOOTCAMP LIVE PORTAL RUNNING!`);
  console.log(`👉 Open: http://localhost:${PORT}`);
  console.log(`⚡ Real-time file changes will automatically update in browser!`);
  console.log(`================================================================\n`);
  setupWatcher();
});

