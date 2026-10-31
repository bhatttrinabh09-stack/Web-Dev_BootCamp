# 00. Developer Workflow & Version Control

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Navigate files and directories fluently using modern terminal shell commands.
- Initialize a local Git repository, configure your identity, and explain the three trees of Git.
- Stage, commit with descriptive conventional commit messages, create feature branches, and merge them.
- Configure `.gitignore` to prevent secret leakage and local environment clutter.
- Read and interpret terminal error messages, inspect browser console logs, and navigate official documentation.

## 2. What is this?
The **developer workflow** is the set of tools, commands, and habits programmers use to create, test, track, and collaborate on code. Rather than clicking buttons on a GUI, professional software engineers operate within a code editor (e.g. VS Code), an integrated command-line interface (CLI / terminal), and a distributed version control system (**Git**).

## 3. Why does it exist?
Without version control:
- Editing code directly on production or without backup causes catastrophic data loss.
- Collaborating with other developers results in overwriting each other's files.
- You have no historical log of why a change was made or ability to revert breaking bugs.

Git provides a mathematical, cryptographically verified timeline of every change in your codebase.

## 4. How does it work?
Git manages files across three distinct local zones:

```
┌──────────────────┐       git add        ┌──────────────────┐      git commit      ┌──────────────────┐
│ Working Directory│ ───────────────────> │  Staging Area    │ ───────────────────> │ Local Repository │
│  (Untracked/     │                      │     (Index)      │                      │     (.git /      │
│   Modified)      │ <─────────────────── │                  │ <─────────────────── │  Commit History) │
└──────────────────┘     git restore      └──────────────────┘      git reset       └──────────────────┘
```

When you edit a file, it sits modified in your **Working Directory**. You explicitly choose what changes to include by staging them (`git add`), then capture a snapshot permanently (`git commit`).

## 5. Important concepts and syntax
- `pwd`: Print Working Directory.
- `ls -la`: List all files including hidden files with details.
- `cd <dir>`: Change directory (`cd ..` moves up one level).
- `git init`: Initialize a new local Git repository in the current folder.
- `git status`: Show modified, staged, and untracked files.
- `git add <file>`: Stage changes for commit.
- `git commit -m "type(scope): description"`: Snapshot staged changes.
- `git branch <name>` / `git switch -c <name>`: Create and switch to an isolated branch.
- `git merge <name>`: Integrate commits from a branch into your current branch.
- `.gitignore`: Plain text file listing patterns Git should never track (e.g. `node_modules/`, `.env`).

## 6. Small worked example
Here is how a developer configures Git and stages their first file in the terminal:

```bash
# 1. Check Git version and config
git --version
git config --global user.name "Alex Developer"
git config --global user.email "alex@example.com"

# 2. Initialize a repository inside a new test folder
mkdir workflow-demo && cd workflow-demo
git init

# 3. Create a README and a secret file
echo "# Project Title" > README.md
echo "DATABASE_PASSWORD=supersecret" > .env

# 4. Exclude secrets via .gitignore
echo ".env" > .gitignore

# 5. Check status - .env will NOT appear as untracked
git status

# 6. Stage and commit
git add README.md .gitignore
git commit -m "chore: initial repository scaffolding and gitignore"
```

## 7. Common mistakes
1. **Committing secrets or dependency folders:** Forgetting `.gitignore` before `git add .` and committing passwords or thousands of files in `node_modules/`.
2. **Vague commit messages:** Writing `git commit -m "fixed stuff"` or `git commit -m "update"`. Commit messages should explain *what* and *why*, using conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`).
3. **Working directly on `main` for experimental features:** Not creating a branch, causing broken half-finished code to contaminate the stable branch.
4. **Panic over terminal errors:** Closing the terminal when red text appears rather than reading the line number and error description.

## 8. Coding challenge
**Environment:** Terminal / Shell.

Navigate to `Frontend_Practice/00_Developer_Workflow/starter/`.
In this directory:
1. Initialize a new Git repository inside `starter/sandbox_repo`.
2. Configure `.gitignore` to ignore `.env` and all files ending in `.log`.
3. Create a file named `app.js` with a basic console log.
4. Make your initial commit on branch `main`.
5. Create and checkout a new branch named `feature/add-math-helper`.
6. Add a function `add(a, b)` inside `math.js`, stage and commit it with a conventional commit message.
7. Switch back to `main` and merge `feature/add-math-helper`.
8. Verify the commit history shows both commits cleanly.

## 9. Acceptance criteria
- [ ] `sandbox_repo/.git` exists.
- [ ] `.env` and `debug.log` exist in `sandbox_repo` but are ignored by `git status`.
- [ ] `git log --oneline` shows at least two descriptive commits.
- [ ] `math.js` is present on `main` following the successful merge.

## 10. Test cases
- **Normal:** Running `git status` inside `sandbox_repo` with `.env` present outputs `nothing to commit, working tree clean`.
- **Edge:** Merging branch without fast-forward issues or cleanly merging.
- **Failure case:** Creating `error.log` and confirming it does NOT show up in `git status`.

## 11. Hints
1. *Concept:* Remember that `.gitignore` must be committed to the repository to be active, and patterns match relative to the `.gitignore` location.
2. *Approach:* Use `git switch -c <branch>` or `git checkout -b <branch>` to make your feature branch before writing `math.js`.
3. *Specifics:* Run `git log --graph --oneline --all` to view your branch history visually.

## 12. Bonus challenge
Simulate a merge conflict: edit the same line of `math.js` on both `main` and a new branch `feature/conflict-test`. Attempt to merge and resolve the conflict manually by removing the Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

## 13. Self-check
1. What is the difference between the staging area and the commit history in Git?
2. Why is committing a `.env` file containing API keys a major security risk, and why does deleting it in a later commit not completely fix the leak?
3. What is the difference between `git branch` and `git switch`?
4. If your terminal displays `command not found: node`, what does this diagnostic tell you about your system PATH or environment?

## 14. References
- [Pro Git Book (Official)](https://git-scm.com/book/en/v2)
- [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)
- [MDN: Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/Command_line_crash_course)
