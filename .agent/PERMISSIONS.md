# Agent Permissions Guide

**What AI agents can auto-run without asking you first.**

This document explains which commands are auto-approved across VS Code, Claude Code, and AntiGravity—and why these permissions are safe.

---

## Permission Philosophy

### ✅ Auto-Approved = Safe, Reversible, Read-Only

**We auto-approve commands that:**
- Read files/directories (never delete)
- Run linters/type checkers (validate, don't modify)
- Start dev servers (local only, no production impact)
- Install npm dependencies (from `package.json`, not arbitrary packages)

### ❌ Always Require Approval = Destructive, External, Permanent

**Agents MUST ask before:**
- Deleting files (`rm`, `rmdir`)
- Modifying production environments
- Making external API calls
- Running arbitrary scripts from the internet
- Installing global system dependencies

---

## Auto-Approved Commands

### Development Server

| Command | Purpose | Why Safe |
|---------|---------|----------|
| `npm run dev` | Start local Hydrogen dev server | Localhost only, no external writes |
| `npm run build` | Production build test | Creates `dist/` folder (ignored by git) |
| `npm run preview` | Preview production build | Localhost only |
| `timeout /t 8 /nobreak` | Wait for server startup | No side effects |

**Security rationale:** These commands only affect your local machine. Dev server runs on `localhost:3000` and cannot modify production.

---

### Code Quality

| Command | Purpose | Why Safe |
|---------|---------|----------|
| `npm run lint` | ESLint + Prettier checks | Read-only analysis |
| `npm run typecheck` | TypeScript validation | Read-only, no code changes |
| `npx eslint <file>` | Lint specific file | Read-only |
| `npx tsc --noEmit` | Type-check without building | No output written |

**Security rationale:** Linters and type checkers analyze code but never modify it without explicit `--fix` flag.

---

### Dependency Management

| Command | Purpose | Why Safe |
|---------|---------|----------|
| `npm install` | Install from `package.json` | Sandboxed to `node_modules/` |
| `npm install <package>` | Add new dependency | Updates `package.json` (version controlled) |
| `npx shopify hydrogen dev` | Shopify CLI dev server | Localhost, uses `.env.local` |

**Security rationale:** `npm install` only installs packages listed in `package.json`. Adding new packages updates version-controlled files, so changes are reviewable.

---

### File System (Read-Only)

| Command | Purpose | Why Safe |
|---------|---------|----------|
| `tree` | List directory structure | Read-only |
| `ls`, `dir` | List files | Read-only |
| `git ls-files --cached` | List tracked files | Read-only |
| `findstr <pattern> <file>` | Search file contents | Read-only |

**Security rationale:** These commands never modify files, only display information.

---

### Git Operations (Non-Destructive)

| Command | Purpose | Why Safe |
|---------|---------|----------|
| `git add <file>` | Stage changes | Reversible (can unstage) |
| `git commit -m "message"` | Commit changes | Reversible (can amend/revert) |
| `git status` | Check repo state | Read-only |
| `git diff` | Show changes | Read-only |

**Security rationale:** Staging and committing are local operations. You control when/if changes are pushed to remote.

**⚠️ NOT auto-approved:** `git push`, `git reset --hard`, `git clean -fd` (destructive)

---

### Browser Automation (Testing)

| Command | Purpose | Why Safe |
|---------|---------|----------|
| `mcp__plugin_playwright__browser_navigate` | Navigate to URL | Localhost testing only |
| `mcp__plugin_playwright__browser_screenshot` | Capture screenshots | Saves to local `artifacts/` |
| `mcp__plugin_playwright__browser_press_key` | Simulate keyboard input | Controlled test environment |

**Security rationale:** Browser automation runs in isolated context. Screenshots are saved locally, not uploaded.

---

## IDE-Specific Permissions

### VS Code

**Default behavior:** Trusts user by default. No explicit permissions needed.

**Extension permissions:**
- ESLint: Can auto-fix on save (if enabled in `.vscode/settings.json`)
- Prettier: Can format on save
- Copilot: Can suggest code completions

**Control:** Disable in `.vscode/settings.json` if needed.

---

### Claude Code

**Configured in:** `.claude/settings.local.json`

**Current permissions:**
```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev:*)",
      "Bash(npm run lint)",
      "Bash(npm run typecheck:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Read(C:\\Users\\dtrip\\OneDrive\\Desktop\\jaysite\\JayLife_Website\\.agent\\**)"
    ]
  }
}
```

**How to add new permissions:**
1. Edit `.claude/settings.local.json`
2. Add pattern to `permissions.allow` array using glob syntax
3. Restart Claude Code

**Examples:**
- `"Bash(npm install:*)"` — Allow any `npm install` command
- `"Read(/path/to/dir/**)"` — Allow reading all files in directory
- `"Skill(superpowers:brainstorming)"` — Enable specific skill

---

### AntiGravity

**Default behavior:** Infers safe commands automatically. Uses context from `.agent/` to determine intent.

**No explicit config needed.** AntiGravity learns from:
- Project structure (detects `package.json` → knows `npm` is safe)
- `.agent/PRIMER.md` — Documents expected workflows
- Previous interactions — Builds trust over time

**Override:** If AntiGravity asks for approval on a command you consider safe, you can train it by approving once and saying "Always allow this."

---

## Adding New Permissions

### When to Add

**Add a new auto-approval when:**
- Command is repeatable without asking (e.g., `npm run test`)
- It's read-only or side-effects are version-controlled
- You trust the tool (e.g., official Shopify CLI)

**Example:** Adding Playwright tests

```json
// .claude/settings.local.json
{
  "permissions": {
    "allow": [
      "Bash(npx playwright test:*)"  // Auto-run tests
    ]
  }
}
```

---

## Security Best Practices

### ✅ DO

- Review permissions quarterly (remove unused commands)
- Use glob patterns for flexibility (`npm run *` vs individual commands)
- Document WHY a permission is needed (add comments in config)
- Keep `.env` files out of version control (add to `.gitignore`)

### ❌ DON'T

- Auto-approve `rm -rf` or destructive file operations
- Allow arbitrary shell commands (`Bash(*:*)` — too broad!)
- Store API keys in config files (use `.env.local`)
- Auto-approve production deployment commands

---

## Blocked Command? How to Proceed

**Scenario:** Agent asks "Can I run this command?" and you're not sure if it's safe.

### Decision Flowchart

```
Is it read-only? (ls, cat, grep)
  ├─ YES → ✅ Safe to approve + add to auto-approved list
  └─ NO  → Continue...

Does it modify version-controlled files? (edit code, git commit)
  ├─ YES → ✅ Safe (can review in git diff)
  └─ NO  → Continue...

Is it localhost-only? (npm run dev, localhost:3000)
  ├─ YES → ✅ Safe (no production impact)
  └─ NO  → Continue...

Does it affect production or external systems? (deploy, API calls)
  ├─ YES → ❌ REVIEW carefully, ask agent for details
  └─ NO  → Probably safe, but ask agent to explain
```

---

## Permission Audit Log

**When permissions were last reviewed:** Not yet audited

**Upcoming review:** Quarterly (next: April 2026)

**Changes since last review:**
- Initial setup (January 2026)
- Added browser automation for Playwright testing
- Enabled git add/commit for automated workflows

---

## External Resources Access

### Allowed External Paths

**Claude Code has read access to:**
- `C:\Users\dtrip\Downloads\forAntiGravity\awesome-claude-code-subagents-main\**`
- `C:\Users\dtrip\Downloads\forAntiGravity\claude-code-workflows-main\**`

**Purpose:** Reference specialized agent configurations and workflows for design review, security audits, etc.

**Security note:** Read-only. Claude cannot execute files from these directories without explicit approval.

---

## Need Help?

**Questions about a specific permission?**
1. Check this doc's "Auto-Approved Commands" section
2. Review IDE-specific config (`.claude/settings.local.json`, `.vscode/settings.json`)
3. Ask the agent: "Why do you need permission to run [command]?"

**Want to revoke a permission?**
- **Claude Code:** Remove from `.claude/settings.local.json`, restart Claude
- **VS Code:** Disable extension or setting in `.vscode/settings.json`
- **AntiGravity:** Tell the agent "Stop auto-running [command], ask me first"
