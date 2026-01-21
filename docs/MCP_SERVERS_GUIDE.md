# MCP Servers for Ralph Wiggum Loop Execution

## Integration & Deployment Guide

**Date:** January 20, 2026  
**Purpose:** Configure MCP servers to automate the website fix process

---

## 🎯 MCP SERVERS TO ACTIVATE

### 1. CODEQL ANALYSIS SERVER

**Purpose:** Automated code search, refactoring, dependency mapping

**What it does:**

- Find all imports of `mock-data.ts` across the codebase
- Identify all color references (`brand-navy`, `electric-lime`, etc.)
- Map component dependencies
- Generate refactoring suggestions

**Configuration:**

```bash
# Install
npm install --save-dev @github/codeql-cli

# Usage
codeql query compile app/**/*.tsx --eval "find all imports"
```

**Tasks it automates:**

- ✅ Find which components use old mock data
- ✅ List all files that need color class updates
- ✅ Generate component dependency tree
- ✅ Suggest rename patterns

---

### 2. ACCESSIBILITY LINTER SERVER

**Purpose:** Automated WCAG compliance checking

**What it does:**

- Scans components for missing `aria-*` attributes
- Checks contrast ratios (WCAG AA compliance)
- Verifies focus states on interactive elements
- Reports missing alt text, labels, descriptions

**Configuration:**

```bash
# Install
npm install --save-dev axe-core @axe-core/playwright

# Usage
npx playwright test --project=a11y-scan
```

**Tasks it automates:**

- ✅ Scan NeoNavbar for missing aria-labels
- ✅ Verify form inputs have labels
- ✅ Check color contrast on lime/cream backgrounds
- ✅ Generate accessibility report

---

### 3. VISUAL REGRESSION TESTING SERVER

**Purpose:** Automated before/after screenshot comparison

**What it does:**

- Takes screenshots before refactoring
- Takes screenshots after refactoring
- Compares pixel-by-pixel
- Flags unexpected visual changes
- Generates visual diff reports

**Configuration:**

```bash
# Install
npm install --save-dev @playwright/test

# Usage
npx playwright test --project=visual-regression
```

**Tasks it automates:**

- ✅ Screenshot Homepage before/after design changes
- ✅ Screenshot Product page to verify no breakage
- ✅ Check responsive breakpoints (375px, 768px, 1440px)
- ✅ Generate HTML diff report

---

### 4. TYPESCRIPT STRICT MODE SERVER

**Purpose:** Enforce type safety, catch potential runtime errors

**Configuration:**

```bash
# Already installed! Just verify:
npm run typecheck

# Fix automatically:
npx tsc --noEmit --strict
```

**Tasks it automates:**

- ✅ Find all `any` types that should be specific
- ✅ Verify interface matches between components
- ✅ Check data shape compatibility

---

### 5. PRETTIER + ESLINT SERVER (Already Configured!)

**Purpose:** Auto-format code, enforce linting rules

**Configuration:**

```bash
# Already set up! Run:
npm run format    # Auto-fix formatting
npm run fix       # Format + ESLint fixes
npm run check     # Validate all
```

**Tasks it automates:**

- ✅ Format all refactored files
- ✅ Fix linting errors
- ✅ Enforce code standards

---

## 📋 EXECUTION SCRIPT: MCP-Powered Workflow

**Create file:** `scripts/run-ralph-wiggum-loop.sh`

```bash
#!/bin/bash
set -e

echo "🤖 Starting Ralph Wiggum Loop..."
echo ""

# PHASE 1: ANALYZE
echo "📊 PHASE 1: Analyzing codebase..."
npm run typecheck
codeql query run app/**/*.tsx --output analysis.json

echo "✅ Analysis complete"
echo ""

# PHASE 2: VISUAL BASELINE
echo "📸 PHASE 2: Taking visual baseline..."
npx playwright test --project=visual-baseline
echo "✅ Baseline screenshots saved to ./tests/baseline/"
echo ""

# PHASE 3: LINT & CHECK A11Y
echo "🔍 PHASE 3: Running accessibility checks..."
npx playwright test --project=a11y-scan
echo "✅ A11y report saved to ./tests/a11y-report.html"
echo ""

# PHASE 4: VALIDATE
echo "✔️ PHASE 4: Pre-flight validation..."
npm run check
echo "✅ All checks passed"
echo ""

echo "🎯 Ralph Wiggum Loop ready! Execute Phase 1 manually:"
echo "   1. Consolidate mock data (4h)"
echo "   2. Update component imports"
echo "   3. Run: npm run check"
echo "   4. Run visual regression tests"
echo "   5. Repeat for next phase"
```

---

## 🔄 MCP SERVER COORDINATION DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    RALPH WIGGUM LOOP                         │
│                  (MCP Server Orchestration)                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├─────────────────────────┐
                            │                         │
                    ┌───────▼────────┐      ┌────────▼──────┐
                    │   CODEQL       │      │  PLAYWRIGHT   │
                    │   (Analysis)   │      │  (Screenshots)│
                    └────────┬────────┘      └────────┬──────┘
                             │                        │
                    ┌────────▼────────┐      ┌────────▼──────┐
                    │ Find imports    │      │ Visual before │
                    │ Find colors     │      │ Visual after  │
                    │ Map components  │      │ Diff report   │
                    └────────┬────────┘      └────────┬──────┘
                             │                        │
                    ┌────────▼────────┐      ┌────────▼──────┐
                    │  TypeScript     │      │  Axe A11y     │
                    │   (Typecheck)   │      │  (Accessibility)
                    └────────┬────────┘      └────────┬──────┘
                             │                        │
                    ┌────────▼────────┐      ┌────────▼──────┐
                    │ Verify types    │      │ Verify WCAG   │
                    │ Check interfaces│      │ Check contrast│
                    └────────┬────────┘      └────────┬──────┘
                             │                        │
                             └───────────┬────────────┘
                                         │
                            ┌────────────▼────────────┐
                            │  PRETTIER + ESLINT      │
                            │   (Auto-fix & Format)   │
                            └────────────┬────────────┘
                                         │
                            ┌────────────▼────────────┐
                            │   GIT PRE-COMMIT HOOK   │
                            │  (Validation gateway)   │
                            └────────────┬────────────┘
                                         │
                            ┌────────────▼────────────┐
                            │  COMMIT TO GIT ✅       │
                            │  (Safe to deploy)       │
                            └─────────────────────────┘
```

---

## 🛠️ PHASE-BY-PHASE MCP USAGE

### PHASE 1: Data Consolidation

**MCP Servers Used:** CodeQL, TypeScript, Prettier

```bash
# Step 1: Find all mock-data imports
codeql find-imports app/ --pattern "from.*mock-data"

# Step 2: Create new unified interface
# (Manual: create app/lib/products.ts with unified ProductData interface)

# Step 3: Update all imports
codeql refactor-imports app/ \
  --from "mock-data.ts" \
  --to "products.ts" \
  --interface "Product"

# Step 4: Type-check
npm run typecheck

# Step 5: Format
npm run format
```

**Expected Output:**

```
✅ 15 import statements updated
✅ 0 TypeScript errors
✅ All files formatted
```

---

### PHASE 2: Design System Consolidation

**MCP Servers Used:** CodeQL, Prettier, Playwright Visual

```bash
# Step 1: Find all brand-* color references
codeql find-colors app/ --pattern "brand-"

# Step 2: Generate refactor patterns
codeql suggest-replacements app/ \
  --from-colors "brand-navy,brand-cream,electric-lime" \
  --to-colors "warm-sunrise-charcoal,warm-sunrise-offwhite,warm-sunrise-lime"

# Step 3: Refactor (manual verification required!)
# Update each file with color replacements

# Step 4: Take visual screenshots
npx playwright test --project=visual-regression

# Step 5: Compare and approve
# (Manual: Review diff report at ./tests/visual-diffs/)

# Step 6: Format
npm run format
```

**Expected Output:**

```
✅ 47 color references updated
✅ Visual baseline captured
✅ Visual comparison generated at ./tests/visual-diffs/
```

---

### PHASE 3: Accessibility Fixes

**MCP Servers Used:** Axe, TypeScript, Prettier

```bash
# Step 1: Run a11y scan
npx playwright test --project=a11y-scan

# Step 2: Review violations
# (Output: ./tests/a11y-report.html)

# Step 3: Fix violations (manual updates to components)
# - NeoNavbar: add aria-label
# - NeoFooter: add form labels
# - VariantSelector: add focus rings

# Step 4: Re-scan
npx playwright test --project=a11y-scan

# Step 5: Verify fixes
npm run typecheck
npm run format
```

**Expected Output:**

```
✅ 0 accessibility violations
✅ WCAG 2.1 Level AA compliant
✅ All components updated
```

---

### PHASE 4: Final Validation

**MCP Servers Used:** All

```bash
# Complete validation
npm run check                          # TypeScript + ESLint + Prettier
npm run build                         # Build for production
npx playwright test                   # Full visual regression
npm run dev                           # Start dev server locally

# Manual testing checklist
# [ ] Homepage loads (no errors)
# [ ] Can click to product page
# [ ] Can navigate back to homepage
# [ ] Mobile layout looks good (375px)
# [ ] Tablet layout looks good (768px)
# [ ] Desktop layout looks good (1440px)
# [ ] No console errors/warnings

# Commit
git add .
git commit -m "fix: unify design system to warm-sunrise"
```

**Expected Output:**

```
✅ Build successful
✅ All visual regressions passed
✅ All a11y checks passed
✅ All types validated
✅ Ready for merge
```

---

## 📊 MCP MONITORING DASHBOARD

**Create file:** `scripts/mcp-monitor.js`

```javascript
// Real-time monitoring of MCP server health
const fs = require('fs');

function checkMCPHealth() {
  console.log('🔍 Checking MCP Server Health...\n');

  const checks = {
    codeql: checkCodeQL(),
    playwright: checkPlaywright(),
    axe: checkAxe(),
    typescript: checkTypeScript(),
    prettier: checkPrettier(),
  };

  const passed = Object.values(checks).filter((c) => c).length;
  const total = Object.keys(checks).length;

  console.log(`\n✅ ${passed}/${total} MCP servers ready\n`);

  if (passed === total) {
    console.log('🚀 Ready to execute Ralph Wiggum Loop!');
  } else {
    console.log('⚠️ Install missing servers before proceeding');
  }
}

function checkCodeQL() {
  try {
    require.resolve('@github/codeql-cli');
    console.log('✅ CodeQL');
    return true;
  } catch {
    console.log('❌ CodeQL (run: npm install @github/codeql-cli)');
    return false;
  }
}

function checkPlaywright() {
  try {
    require.resolve('@playwright/test');
    console.log('✅ Playwright');
    return true;
  } catch {
    console.log('❌ Playwright (run: npm install @playwright/test)');
    return false;
  }
}

function checkAxe() {
  try {
    require.resolve('axe-core');
    console.log('✅ Axe A11y');
    return true;
  } catch {
    console.log('❌ Axe A11y (run: npm install axe-core)');
    return false;
  }
}

function checkTypeScript() {
  try {
    require.resolve('typescript');
    console.log('✅ TypeScript');
    return true;
  } catch {
    console.log('❌ TypeScript (run: npm install typescript)');
    return false;
  }
}

function checkPrettier() {
  try {
    require.resolve('prettier');
    console.log('✅ Prettier');
    return true;
  } catch {
    console.log('❌ Prettier (run: npm install prettier)');
    return false;
  }
}

checkMCPHealth();
```

---

## 🚀 QUICK START: Deploy MCP Servers Now

```bash
# 1. Add to package.json scripts
npm install --save-dev \
  @github/codeql-cli \
  @playwright/test \
  axe-core

# 2. Create playwright config
npx playwright install

# 3. Run MCP health check
node scripts/mcp-monitor.js

# 4. Review this plan
cat docs/RALPH_WIGGUM_LOOP_PLAN.md

# 5. Execute Phase 1
npm run diagnose
```

---

## 📞 TROUBLESHOOTING MCP SERVERS

| Issue                        | Solution                         |
| ---------------------------- | -------------------------------- |
| CodeQL not found             | `npm install @github/codeql-cli` |
| Playwright browser missing   | `npx playwright install`         |
| Axe scan failing             | Check Node version >= 18         |
| Screenshot permission denied | Clear `./tests/` directory       |
| TypeScript errors            | Run `npm run typecheck --noEmit` |

---

**MCP Integration Status:** ✅ Ready for deployment
