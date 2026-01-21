# Cross-IDE Installation Guide

**One setup process. Three IDEs. Zero hassle.**

This guide gets you productive in VS Code, Claude Code, or AntiGravity within 5 minutes.

---

## Prerequisites

| Requirement | Minimum Version | Check Command |
|------------|----------------|---------------|
| **Node.js** | 18.0.0 | `node --version` |
| **Git** | Any recent | `git --version` |
| **IDE** | Latest stable | VS Code / Claude / AntiGravity installed |

---

## Quick Start (Choose Your IDE)

### 🎯 AntiGravity (You're Here!)

**Already configured!** AntiGravity reads `.agent` natively.

**Verify it works:**
```
1. Ask me: "What is the brand voice?"
2. I should quote from PRIMER.md ("Ritual, Routine, Results...")
3. Type: /code-review
4. I should recognize the workflow
```

✅ **You're ready!** No installation needed.

---

### 🔵 VS Code Setup

**Step 1: Install Extensions**

```bash
# From project root:
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

Or install via UI: `Ctrl+Shift+X` → Search extensions from `.vscode/extensions.json`

**Step 2: Reload Window**

`Ctrl+Shift+P` → "Developer: Reload Window"

**Step 3: Verify Tasks Work**

`Ctrl+Shift+P` → "Tasks: Run Task" → You should see:
- ✅ Install Agent Config
- ✅ Run Code Review  
- ✅ Dev Server

**Test:** Run "Dev Server" → Browser opens at `localhost:3000`

---

### 💬 Claude Code Setup

**Step 1: Verify Skills Path**

Check `.claude/settings.local.json` contains:
```json
{
  "skillsPath": "../.agent/skills",
  "workflowsPath": "../.agent/workflows"
}
```

**Step 2: Restart Claude**

Close and reopen Claude Code completely.

**Step 3: Test Workflows**

In chat, type: `/code-review`

✅ **Success:** Claude responds with workflow steps from `.agent/workflows/code-review.md`

---

## What Gets Installed

### 📁 Shared Configuration (`.agent`)

| File | Purpose | Used By |
|------|---------|---------|
| `PRIMER.md` | Session context & quick decisions | All IDEs |
| `DESIGN_PRINCIPLES.md` | UI/UX standards checklist | All IDEs |
| `STATE.md` | Full project state & history | All IDEs |
| `AGENTS.md` | Agent specialization mapping | All IDEs |
| `skills/` | Reusable agent capabilities | Claude, AntiGravity |
| `workflows/` | Step-by-step automation | All IDEs |

### ⚙️ IDE-Specific Configs

| IDE | Config Location | What It Does |
|-----|----------------|--------------|
| **VS Code** | `.vscode/settings.json` | Editor formatting, ESLint, file associations |
| **VS Code** | `.vscode/tasks.json` | Quick-run commands for workflows |
| **Claude** | `.claude/settings.local.json` | Permissions, skills/workflow paths |
| **AntiGravity** | *(none needed)* | Reads `.agent` automatically |

---

## Automated Installation Script

### Windows (PowerShell)

```powershell
# Run from project root:
.\\.agent\\scripts\\install.ps1
```

**What it does:**
1. ✅ Checks Node version ≥18
2. ✅ Installs npm dependencies
3. ✅ Creates symlinks for shared configs
4. ✅ Validates `.agent` structure
5. ✅ Outputs IDE-specific next steps

### Manual Verification

```bash
# Verify installation:
node .agent/scripts/verify-install.js
```

**Expected output:**
```
✅ .agent directory
✅ PRIMER.md
✅ skills folder
✅ workflows folder
✅ VS Code settings
✅ Claude settings

6 passed, 0 failed
Installation verified! ✨
```

---

## Troubleshooting

### ❌ VS Code doesn't show agent tasks

**Fix:** 
1. Check `.vscode/tasks.json` exists
2. Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Verify tasks: `Ctrl+Shift+P` → "Tasks: Run Task"

### ❌ Claude says "workflow not found"

**Fix:**
1. Check `.claude/settings.local.json` has `"workflowsPath": "../.agent/workflows"`
2. Restart Claude Code completely
3. Verify file exists: `.agent/workflows/code-review.md`

### ❌ AntiGravity doesn't load context

**Fix:**
1. Check `.agent/PRIMER.md` exists and isn't corrupted
2. Ask explicitly: "Read .agent/PRIMER.md and summarize it"
3. If that works, context is available

### ❌ Node version too old

**Error:** `Node version must be ≥18 (found: v16.x)`

**Fix:**
```bash
# Windows (using nvm-windows):
nvm install 18
nvm use 18
node --version  # Should show v18.x or v20.x
```

---

## Post-Installation Checklist

- [ ] **Dependencies installed:** `npm install` completed without errors
- [ ] **Dev server runs:** `npm run dev` → `localhost:3000` loads
- [ ] **TypeScript valid:** `npm run typecheck` passes
- [ ] **Linting works:** `npm run lint` runs (warnings OK, errors need fixing)
- [ ] **IDE recognizes config:** Your IDE sees skills/workflows/tasks

---

## Next Steps

1. **Read the primer:** [PRIMER.md](./PRIMER.md) for instant context
2. **Check workflows:** [workflows/code-review.md](./workflows/code-review.md) for automated QA
3. **Review design rules:** [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) for UI standards
4. **Start developing:** `npm run dev` and open `localhost:3000`

---

## Support

**Can't get it working?**

1. Check [IDE_COMPATIBILITY.md](./IDE_COMPATIBILITY.md) for known limitations
2. Review [PERMISSIONS.md](./PERMISSIONS.md) if commands are blocked
3. Verify your IDE version is up-to-date (VS Code ≥1.85, Claude latest)

**Still stuck?** Open an issue with:
- Your IDE name + version
- Output of `node --version`
- Error message or screenshot
