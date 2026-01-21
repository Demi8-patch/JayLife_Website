# IDE Compatibility Matrix

**Know what works where. Plan accordingly. Ship faster.**

This guide shows which features work in VS Code, Claude Code, and AntiGravity—plus workarounds for gaps.

---

## Quick Reference

| Feature | VS Code | Claude Code | AntiGravity | Notes |
|---------|---------|-------------|-------------|-------|
| **🧠 Context Files** | ✅ | ✅ | ✅ | All read `PRIMER.md`, `STATE.md` |
| **⚡ Skills** | ⚠️ Via tasks | ✅ Native | ✅ Native | VS Code needs task wrappers |
| **📋 Workflows** | ⚠️ Via tasks | ✅ Slash cmds | ✅ Slash cmds | Same `.md` format for all |
| **🔒 Permissions** | N/A | ✅ Explicit | ✅ Inferred | VS Code trusts by default |
| **🌐 Browser Automation** | ⚠️ Extension | ✅ Built-in | ✅ Built-in | VS Code needs Playwright ext |
| **📦 Git Integration** | ✅ Native UI | ✅ CLI commands | ✅ CLI commands | All can stage/commit |
| **🔍 TypeScript Awareness** | ✅ IntelliSense | ✅ Via LSP | ✅ Via LSP | All respect `tsconfig.json` |
| **🎨 Live Preview** | ✅ Extensions | ⚠️ Manual | ⚠️ Manual | VS Code has built-in server |
| **🤖 Haptic Feedback** | N/A | ✅ Mobile | ✅ Mobile | Desktop IDEs don't vibrate |

**Legend:**
- ✅ Full support, works out of the box
- ⚠️ Partial support, needs extension/config
- ❌ Not supported, use alternative
- N/A Not applicable to this IDE

---

## Feature Deep Dive

### 🧠 Context Files (All IDEs: ✅)

**What it is:** AI agents read project docs (`.agent/PRIMER.md`, `STATE.md`, etc.) to understand context.

| IDE | How It Works | Configuration |
|-----|--------------|---------------|
| **VS Code** | Copilot reads workspace files when prompted | No config needed |
| **Claude Code** | Auto-reads files in `.claude/settings.local.json` paths | Set `"Read(path/**)"` permission |
| **AntiGravity** | Automatically ingests `.agent/` on session start | Works out of the box |

**Best practice:** Keep `PRIMER.md` under 100 lines for faster loading.

---

### ⚡ Skills (Claude/AntiGravity: ✅, VS Code: ⚠️)

**What it is:** Reusable agent capabilities (e.g., `frontend_developer`, `test_skill`).

| IDE | Implementation | Example Usage |
|-----|----------------|---------------|
| **VS Code** | Run via `.vscode/tasks.json` | `Ctrl+Shift+P` → "Tasks: Run Task" → "Frontend Developer Skill" |
| **Claude Code** | Native skill invocation | Type in chat: `@frontend_developer` or reference in conversation |
| **AntiGravity** | Auto-loaded from `.agent/skills/` | Just mention: "Use the frontend developer skill to review this" |

**VS Code workaround:**

Create task in `.vscode/tasks.json`:
```json
{
  "label": "Frontend Developer Skill",
  "type": "shell",
  "command": "echo 'Applying frontend_developer skill...' && node .agent/skills/frontend_developer/run.js",
  "problemMatcher": []
}
```

**Limitation:** VS Code skills require manual task creation. Claude/AntiGravity auto-discover skills.

---

### 📋 Workflows (Claude/AntiGravity: ✅, VS Code: ⚠️)

**What it is:** Automated sequences (e.g., `/code-review` runs checklist from `.agent/workflows/code-review.md`).

| IDE | Activation Method | Configuration |
|-----|-------------------|---------------|
| **VS Code** | Tasks or custom extension | Create task per workflow in `tasks.json` |
| **Claude Code** | Slash commands | Add to `.claude/settings.local.json`: `"workflowsPath": "../.agent/workflows"` |
| **AntiGravity** | Slash commands | Works automatically (reads `.agent/workflows/`) |

**Example workflow file:** `.agent/workflows/code-review.md`

```markdown
---
description: Conduct code review using Pragmatic Quality framework
---

1. Check TypeScript types: `npm run typecheck`
2. Run ESLint: `npm run lint`
3. Verify mobile responsiveness (375px, 768px, 1440px)
4. Review accessibility: focus rings, aria-labels, color contrast
5. Test add-to-cart flow with haptics
```

**VS Code task for workflow:**

```json
{
  "label": "Run Code Review",
  "type": "shell",
  "command": "node .agent/scripts/run-workflow.js code-review",
  "problemMatcher": []
}
```

---

### 🔒 Permissions (Claude: ✅, AntiGravity: ✅, VS Code: N/A)

**What it is:** Which commands agents can auto-run without asking.

| IDE | Permission Model | Configuration File |
|-----|------------------|--------------------|
| **VS Code** | Trusts user by default | Extensions have own permission requests |
| **Claude Code** | Explicit allow-list | `.claude/settings.local.json` → `permissions.allow` |
| **AntiGravity** | Context-aware inference | Learns from `.agent/` docs + user approvals |

**See:** [PERMISSIONS.md](./PERMISSIONS.md) for full details.

---

### 🌐 Browser Automation (Claude/AntiGravity: ✅, VS Code: ⚠️)

**What it is:** Agents navigate localhost, take screenshots, test UI.

| IDE | Implementation | Example Use Case |
|-----|----------------|------------------|
| **VS Code** | Playwright extension required | Install: `code --install-extension ms-playwright.playwright` |
| **Claude Code** | Built-in MCP browser tools | "Navigate to localhost:3000 and screenshot the homepage" |
| **AntiGravity** | Built-in browser control | "Test the add-to-cart flow and record a video" |

**VS Code setup:**

1. Install Playwright: `npm install -D @playwright/test`
2. Install VS Code extension: `ms-playwright.playwright`
3. Run tests: `npx playwright test`

**Claude/AntiGravity:** Works immediately, no setup needed.

---

### 📦 Git Integration (All IDEs: ✅)

**What it is:** Stage, commit, diff, merge via IDE.

| IDE | Interface | Workflow Example |
|-----|-----------|------------------|
| **VS Code** | Source Control panel (Ctrl+Shift+G) | Stage via UI, commit, push |
| **Claude Code** | CLI commands in chat | "Stage all changes and commit with message 'Fix navbar'" |
| **AntiGravity** | CLI commands in chat | "Show git diff, then stage and commit" |

**All IDEs support:**
- ✅ `git add`, `git commit`
- ✅ `git status`, `git diff`
- ✅ `git log`, `git branch`

**Caution:** `git push`, `git reset --hard` typically require approval in Claude/AntiGravity.

---

### 🔍 TypeScript Awareness (All IDEs: ✅)

**What it is:** IntelliSense, type checking, auto-imports.

| IDE | Features | Configuration |
|-----|----------|---------------|
| **VS Code** | Full IntelliSense + inline errors | Uses workspace `tsconfig.json` |
| **Claude Code** | Type-aware suggestions via LSP | Respects `tsconfig.json`, runs `npm run typecheck` |
| **AntiGravity** | Type validation on edits | Validates against `tsconfig.json` before applying changes |

**All use the same `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"]
  }
}
```

**Best practice:** Run `npm run typecheck` before committing (all IDEs support this).

---

### 🎨 Live Preview (VS Code: ✅, Claude/AntiGravity: ⚠️)

**What it is:** See code changes instantly in browser without manual refresh.

| IDE | Method | Setup |
|-----|--------|-------|
| **VS Code** | Live Server extension + HMR | Install `ritwickdey.LiveServer`, run `npm run dev` |
| **Claude Code** | Run `npm run dev`, manual browser refresh | Open `localhost:3000` in browser |
| **AntiGravity** | Run `npm run dev`, manual browser refresh | Open `localhost:3000` in browser |

**VS Code advantage:** Native live preview panel (split editor + browser view).

**Workaround for Claude/AntiGravity:**
1. Run `npm run dev` (Vite HMR enabled)
2. Open `localhost:3000` in external browser
3. Changes auto-reload via Vite (no IDE integration needed)

---

## Workarounds for Missing Features

### VS Code: Making Skills Work

**Problem:** VS Code doesn't auto-discover skills from `.agent/skills/`.

**Solution:** Create a task launcher script.

**File:** `.agent/scripts/run-skill.js`

```javascript
const fs = require('fs');
const path = require('path');

const skillName = process.argv[2];
const skillPath = path.join(__dirname, '../skills', skillName, 'SKILL.md');

if (!fs.existsSync(skillPath)) {
  console.error(`Skill not found: ${skillName}`);
  process.exit(1);
}

const skillContent = fs.readFileSync(skillPath, 'utf-8');
console.log(`\n📖 Skill: ${skillName}\n`);
console.log(skillContent);
console.log(`\n✅ Apply this skill to your current task.\n`);
```

**VS Code task:**

```json
{
  "label": "Run Skill: Frontend Developer",
  "type": "shell",
  "command": "node .agent/scripts/run-skill.js frontend_developer",
  "problemMatcher": []
}
```

---

### Claude/AntiGravity: Adding Live Preview

**Problem:** No built-in split-view browser preview like VS Code.

**Solution:** Use browser automation to auto-screenshot on save.

**Workflow:** `.agent/workflows/auto-preview.md`

```markdown
---
description: Auto-screenshot on file save
---

1. Start dev server: `npm run dev`
2. Navigate browser to `localhost:3000`
3. Watch for file changes in `app/`
4. On change detected, wait 1s for HMR
5. Take screenshot, save to `artifacts/preview-{timestamp}.png`
```

**Claude Code:** "Run the auto-preview workflow"

**AntiGravity:** "Enable auto-preview mode"

---

## Performance Considerations

### Context Loading Speed

| IDE | Typical Load Time | Optimization |
|-----|-------------------|--------------|
| **VS Code** | ~200ms | No optimization needed (local) |
| **Claude Code** | ~1-2s | Keep `PRIMER.md` under 100 lines |
| **AntiGravity** | ~500ms | Auto-optimized |

**Tip:** If Claude Code feels slow, split large docs into smaller files and link between them.

---

### Memory Usage (Large Codebases)

| IDE | Handling 1000+ Files | Notes |
|-----|----------------------|-------|
| **VS Code** | Excellent (8GB RAM sufficient) | Indexed search, lazy loading |
| **Claude Code** | Good (12GB RAM recommended) | Full-text search can be slower |
| **AntiGravity** | Excellent (auto-manages context) | Intelligent file prioritization |

**Recommendation:** For repos >500 files, configure `.vscode/settings.json`:

```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/dist/**": true
  }
}
```

---

## Mobile Development

### Testing on Physical Devices

| IDE | Method | Setup Complexity |
|-----|--------|------------------|
| **VS Code** | Port forwarding + remote debugging | Medium (requires ADB for Android) |
| **Claude Code** | Use ngrok + ask Claude to test URL | Easy (one command) |
| **AntiGravity** | Use ngrok + built-in browser | Easy (auto-handled) |

**Example (Claude/AntiGravity):**

```bash
# Start dev server with ngrok:
npx ngrok http 3000

# Copy URL (e.g., https://abc123.ngrok.io)
# Then tell the agent: "Navigate to this ngrok URL and test mobile view"
```

---

## IDE-Specific Strengths

### VS Code Excels At:

- ✅ **Editing experience** — Best IntelliSense, multi-cursor, Vim mode
- ✅ **Extension ecosystem** — 50k+ extensions for every language/framework
- ✅ **Debugging** — Breakpoints, watch variables, call stacks
- ✅ **Live preview** — Split view with instant refresh

**Use VS Code when:** You're writing lots of code manually and need powerful editing tools.

---

### Claude Code Excels At:

- ✅ **Conversational coding** — Explain intent, Claude writes implementation
- ✅ **Context awareness** — Reads entire codebase to suggest changes
- ✅ **Refactoring** — Large-scale renames, restructures across multiple files
- ✅ **Documentation** — Writes clear comments and README files

**Use Claude Code when:** You need to explain complex changes or refactor legacy code.

---

### AntiGravity Excels At:

- ✅ **Autonomous workflows** — Execute multi-step plans without prompting
- ✅ **Browser testing** — Built-in visual regression testing
- ✅ **Artifact generation** — Auto-creates reports, walkthroughs, plans
- ✅ **Smart context** — Learns from project structure and past interactions

**Use AntiGravity when:** You want an AI partner that can independently complete tasks.

---

## Hybrid Workflows (Best of All Worlds)

### Recommended Setup

**Daily coding:** VS Code (best editor experience)

**Refactoring/planning:** Claude Code (explains reasoning, touches multiple files)

**Testing/verification:** AntiGravity (automates browser tests, generates reports)

### Example Workflow

```
1. Plan feature in Claude Code
   → "Create a new product grid component with filtering"
   → Claude writes implementation plan

2. Implement in VS Code
   → Copy Claude's plan
   → Code with full IntelliSense + debugging

3. Test in AntiGravity
   → "Run browser tests on localhost:3000"
   → "Generate walkthrough showing the new grid works"
```

**Why this works:** Each IDE handles what it does best. No single tool is optimal for everything.

---

## Migration Guide

### Moving from VS Code to Claude Code

**What carries over:**
- ✅ `.vscode/settings.json` formatting preferences (Prettier, ESLint)
- ✅ Git history and branch state
- ✅ npm scripts (`npm run dev`, etc.)

**What needs setup:**
- ⚠️ Permissions in `.claude/settings.local.json`
- ⚠️ Skills/workflows paths

**Migration steps:**
1. Copy permissions from [PERMISSIONS.md](./PERMISSIONS.md)
2. Set `skillsPath` and `workflowsPath` in `.claude/settings.local.json`
3. Restart Claude Code

---

### Moving from Claude Code to AntiGravity

**What carries over:**
- ✅ Everything! (AntiGravity reads `.agent` like Claude)
- ✅ Skills auto-discovered
- ✅ Workflows available via slash commands

**What needs setup:**
- Nothing! AntiGravity is drop-in compatible.

**Migration steps:**
1. Open project in AntiGravity
2. Verify: "Read PRIMER.md and summarize"
3. ✅ Done!

---

## Troubleshooting

### "Skill not found" in VS Code

**Cause:** Skills aren't auto-discovered in VS Code.

**Fix:** Create a task in `.vscode/tasks.json` that runs the skill script.

---

### Claude Code slow to respond

**Cause:** Large context files (>200 lines) or too many files in workspace.

**Fix:**
1. Split `STATE.md` into smaller docs
2. Add `node_modules/` to `.gitignore` (should already be there)
3. Exclude build artifacts in `.claude/settings.local.json`

---

### AntiGravity doesn't see latest changes

**Cause:** File watcher not detecting edits (rare).

**Fix:** Explicitly tell AntiGravity: "Refresh file system and re-read .agent/"

---

## Version Compatibility

| IDE | Minimum Version | Recommended | Notes |
|-----|----------------|-------------|-------|
| **VS Code** | 1.85.0 | Latest stable | Extensions may need newer versions |
| **Claude Code** | N/A (SaaS) | Always latest | Updates automatically |
| **AntiGravity** | N/A (SaaS) | Always latest | Rolling updates |
| **Node.js** | 18.0.0 | 20.x LTS | Required for Hydrogen dev server |

---

## Next Steps

1. **Test your IDE:** Run verification steps from [INSTALLATION.md](./INSTALLATION.md)
2. **Review permissions:** Ensure safe commands are auto-approved ([PERMISSIONS.md](./PERMISSIONS.md))
3. **Try a workflow:** Run `/code-review` to see slash commands in action
4. **Check strengths table:** Use the right IDE for each task

**Questions?** Open an issue or ask an agent: "Explain IDE compatibility for [feature]"
