# Web Development Bootcamp: Build It, Understand It, Ship It

> **A self-paced, production-grounded engineering curriculum from first principles to full-stack deployment.**

Welcome to your practical web-development workspace. This repository is structured to take you from a complete beginner in web technologies to an engineer capable of designing, building, debugging, testing, deploying, and articulating modern full-stack web applications suitable for internship and junior developer roles.

---

## 🎯 The Core Philosophy: Active Construction

This bootcamp is **not** a collection of tutorials to passively watch, nor is it a code-generation playground. Real software engineering skill is formed through the feedback loop of writing code, encountering errors, diagnosing failures in developer tools, reasoning through edge cases, and defending architectural decisions.

```
       ┌───────────────┐
       │ 1. Understand │ ── Read concept & explain in plain English
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │  2. Predict   │ ── Hypothesize behavior before running
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │  3. Attempt   │ ── Implement starter challenge independently
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │    4. Run     │ ── Execute in browser / Node / SQL CLI
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │   5. Debug    │ ── Inspect errors, logs & DevTools
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │   6. Review   │ ── Peer / AI review on edge cases & syntax
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │  7. Reflect   │ ── Answer self-checks & log key takeaways
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │   8. Commit   │ ── Git commit with conventional message
       └───────────────┘
```

**Effort Distribution:**
- **20% Theory & Mental Models**
- **70% Hands-on Coding & Debugging**
- **10% Reflection & Code Articulation**

---

## 🧭 Repository Structure

```text
Web Dev Bootcamp/
├── package.json                      # npm start / npm run dev runs the Live Learning Portal
├── portal/                           # Real-time interactive browser dashboard & live-reload server
│   ├── server.js
│   └── public/ (index.html, style.css, app.js)
├── README.md                         # This file: roadmap, setup, instructions
├── PROGRESS.md                       # Mastery checklist & status tracker
├── LEARNING_RULES.md                 # Rules preventing tutorial hell & AI crutches
├── INTERNSHIP_READINESS.md           # Skills, portfolio, & technical interview prep
│
├── Frontend_Practice/                # 22 structured browser engineering modules
│   ├── 00_Developer_Workflow/
│   ├── ...
│   └── 21_Frontend_Build_and_Deployment/
│
├── Backend_Practice/                 # 16 structured server & database engineering modules
│   ├── 00_Backend_and_Client_Server_Foundations/
│   ├── ...
│   └── 15_Production_Concepts_and_Optional_Extras/
│
└── Projects/                         # 6 Cumulative Milestone Projects
    ├── 01_Personal_Profile_Site/
    ├── ...
    └── 06_Full_Stack_Capstone/
```

---

## ⚡ The Bootcamp Live Portal (Real-Time Synchronized Learning)

You do **not** need to manually open HTML files or re-run terminal scripts after every change. A unified, real-time developer portal is built directly into this workspace:

```bash
npm start
# or: npm run dev
```

Open **`http://localhost:3000`** in your browser.

### What the Live Portal does for every exercise:
1. **Live Visual Preview (Real-Time):** For every HTML, CSS, DOM, and React exercise, the portal embeds an interactive preview frame that **automatically reloads the exact second you save your code** in your editor.
2. **Auto-Run Terminal & Test Console (Real-Time):** For JavaScript algorithms, Node.js scripts, and backend APIs, the portal detects file changes and **automatically re-executes tests live**, streaming console output, pass/fail assertions, and timing directly onto your screen.
3. **Multi-Device Responsive Preview:** Switch between Desktop (100%), Tablet (768px), and Mobile (375px) viewports with one click.
4. **Interactive Progressive Hints:** Read hints one by one with click-to-reveal spoiler guards so you never accidentally see a solution.
5. **Captured Browser Logs:** Real-time stream of `console.log()` statements originating from your code.

---

## 🛠️ Prerequisites & Local Environment Setup

Before starting Topic 00, ensure your local machine has the standard toolchain installed:

1. **Terminal & Shell:**
   - macOS / Linux: `zsh` or `bash`.
   - Windows: WSL2 (Windows Subsystem for Linux) with Ubuntu.
2. **Node.js & npm:**
   - Install the latest Active LTS version of Node.js (`v20.x` or `v22.x`).
   - Check with: `node -v` and `npm -v`.
3. **Git:**
   - Install Git: `git --version`.
   - Configure identity:
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```
4. **Code Editor:**
   - Visual Studio Code or equivalent IDE with extensions: *ESLint*, *Prettier*, *Tailwind CSS* (optional), *GitLens*.
5. **Modern Browser:**
   - Google Chrome, Firefox Developer Edition, or Chromium with active DevTools.
6. **PostgreSQL (for Backend module 08+):**
   - Local PostgreSQL installation (`psql`) or Dockerized container.

---

## 🚀 How to Work Through Each Topic

1. **Navigate to the folder:**
   ```bash
   cd Frontend_Practice/00_Developer_Workflow
   ```
2. **Read `README.md` completely:**
   - Understand the learning outcomes, real-world context, and mental models.
   - Study the worked example carefully.
3. **Inspect the `starter/` directory:**
   - Examine the skeleton code, function signatures, types, and marked `TODO` prompts.
4. **Solve the challenge:**
   - Follow the instructions in section 8 of the topic `README.md`.
   - Test against the acceptance criteria and test cases.
5. **Self-check and log:**
   - Answer the self-check questions in `README.md`.
   - Update `PROGRESS.md` to reflect your completion status.
6. **Commit your work:**
   ```bash
   git add .
   git commit -m "feat(topic): complete exercise for [Topic Name]"
   ```

---

## 📌 Guiding Principles

- **Never copy-paste code you cannot explain line by line.**
- **Embrace error messages:** The red text in your console is not a failure; it is an exact diagnostic report telling you what assumption broke.
- **Inspect before guessing:** Use `console.log`, browser DevTools breakpoints, network tabs, and SQL `EXPLAIN` rather than guessing what went wrong.
- **Follow [LEARNING_RULES.md](file:///Users/trinabh_bhatt/Desktop/Web%20Dev%20Bootcamp/LEARNING_RULES.md) strictly.**
