#!/usr/bin/env bash
# ==============================================================================
# Topic 00 Starter: Developer Workflow & Git Verification Script
# Follow instructions in README.md section 8.
# ==============================================================================

set -e

echo "=== Developer Workflow Exercise ==="
echo "Task: Create your sandbox_repo, initialize Git, configure .gitignore, branch and merge."

TARGET_DIR="./sandbox_repo"

if [ ! -d "$TARGET_DIR" ]; then
  mkdir -p "$TARGET_DIR"
  echo "Created directory: $TARGET_DIR"
fi

echo "Now navigate into $TARGET_DIR and follow the steps in README.md!"
