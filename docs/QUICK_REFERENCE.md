# 🚀 RALPH WIGGUM LOOP: Quick Reference Card

## One-Page Cheat Sheet for Execution

Print this. Keep it by your desk. ✅

---

## THE PROBLEM (In 30 seconds)

Your website has **TWO fighting design systems**:

- **Homepage:** Modern + colorful (Electric-Lime)
- **Product pages:** Brutalist + edgy (Warm-Sunrise)

**Result:** Users see jarring design changes when navigating.

---

## THE SOLUTION (In 30 seconds)

**Unify everything to Warm-Sunrise** (most complete system)

**5 Phases:**

1. Merge data files
2. Update colors & components
3. Clean up unused code
4. Fix accessibility issues
5. Validate types

**Time:** 5 days (28-35 hours)

---

## YOUR COMMAND CENTER

| Document      | Read First | When  | Purpose           |
| ------------- | ---------- | ----- | ----------------- |
| **SUMMARY**   | ✅ YES     | Now   | Quick overview    |
| **PLAN**      | ⬜ Next    | Today | Detailed strategy |
| **MCP GUIDE** | ⬜ After   | Today | Automation setup  |
| **DASHBOARD** | ⬜ During  | Daily | Track progress    |

---

## QUICK START (Right Now)

### 1. Understand (15 min)

```bash
cat docs/RALPH_WIGGUM_SUMMARY.md
```

### 2. Branch (2 min)

```bash
git checkout -b fix/design-system-unification
```

### 3. Phase 1 (4 hours)

Follow steps in [RALPH_WIGGUM_LOOP_PLAN.md](./RALPH_WIGGUM_LOOP_PLAN.md) → PHASE 1

```bash
# Create new unified data file
# Update all imports
# Verify no errors

npm run check
```

---

## PHASE CHECKLIST

### PHASE 1: Data (4h)

- [ ] Create unified interface
- [ ] Merge mock-data files
- [ ] Update all imports (15 files)
- [ ] Verify: `npm run check`

### PHASE 2: Design (12h)

- [ ] Update Homepage colors
- [ ] Refactor components
- [ ] Test navigation flow
- [ ] Visual regression test

### PHASE 3: Cleanup (2h)

- [ ] Archive unused files
- [ ] Verify no references
- [ ] `npm run check`

### PHASE 4: A11y (4h)

- [ ] Add aria-labels
- [ ] Add form labels
- [ ] Add focus rings
- [ ] Run Axe scanner

### PHASE 5: TypeScript (2h)

- [ ] Fix type warnings
- [ ] Verify: `npm run check`
- [ ] Build: `npm run build`

---

## VALIDATION AT EACH CHECKPOINT

After **every phase**, run:

```bash
npm run check        # TypeScript + ESLint + Prettier
npm run build        # Production build
npm run dev          # Dev server (should start)
```

**If any fails:** Stop. Fix. Don't continue.

---

## MCP SERVERS (Automation Magic ✨)

| Server         | What               | Command                                   |
| -------------- | ------------------ | ----------------------------------------- |
| **CodeQL**     | Find code patterns | `codeql find-imports`                     |
| **Playwright** | Screenshot testing | `npx playwright test`                     |
| **Axe**        | A11y checking      | `npx playwright test --project=a11y-scan` |
| **TypeScript** | Type checking      | `npm run typecheck`                       |
| **Prettier**   | Auto-format        | `npm run format`                          |

---

## SUCCESS CRITERIA

You're done when:

✅ `npm run check` → 0 errors  
✅ `npm run build` → success  
✅ Visual test → 0 regressions  
✅ A11y scan → 0 violations  
✅ Navigate: Homepage → Product → Back → All OK

---

## WHEN STUCK

### Problem: TypeScript errors

```bash
npm run typecheck --noEmit
# Fix errors in the file listed
```

### Problem: Visual broken

```bash
npx playwright test --project=visual-regression
# Review diffs in ./tests/visual-diffs/
```

### Problem: A11y violations

```bash
npx playwright test --project=a11y-scan
# Review violations, add aria-labels
```

### Problem: Pre-commit hook fails

```bash
git stash
git checkout .
# Review what changed
# Commit in smaller chunks
```

### Problem: Need to rollback

```bash
git revert <commit-hash>
# Or just revert the branch
git checkout main
git branch -D fix/design-system-unification
```

---

## DAILY STANDUP (Morning Ritual)

**30 seconds each:**

- What did I complete yesterday?
- What will I do today?
- Am I blocked on anything?
- Confidence level (High/Med/Low)?

---

## TEAM COMMUNICATION

**Lead Dev:** Core implementation (Phases 1-3, 5)  
**QA/Tester:** Visual regression + A11y (Phases 2, 4)  
**Designer:** Approve visual changes (Phase 2)  
**Tech Lead:** Code review before merge

---

## KEY FILES TO MODIFY

**Data Layer:**

- `app/lib/mock-data.ts` (merge with mockData.ts)

**Homepage Components (10 files):**

- `app/routes/_index.tsx`
- `app/components/product/ProductCard.tsx`
- `app/components/product/BundleCard.tsx`
- `app/components/ui/*.tsx` (5 files)

**Layout:**

- `app/components/layout/NeoNavbar.tsx`
- `app/components/layout/NeoFooter.tsx`

**Cleanup:**

- `app/components/layout/Layout.tsx`
- `app/components/layout/Header.tsx`
- `app/components/layout/Footer.tsx`

---

## COLOR REFERENCE (Main Change)

| Old (Electric-Lime)        | New (Warm-Sunrise)         |
| -------------------------- | -------------------------- |
| `--brand-navy: #1A2E3B`    | `--charcoal: #1A2E3B`      |
| `--brand-cream: #F8F5F0`   | `--cream: #F8F5F0`         |
| `--electric-lime: #BFFF00` | `--electric-lime: #BFFF00` |
| `--sale-red: #FF4444`      | `--warm-orange: #FF6B35`   |

---

## TIMELINE AT A GLANCE

```
MON         TUE         WED         THU         FRI
PHASE 1     PHASE 1     PHASE 2A    PHASE 2B    PHASE 4
Data        cont.       Colors      Components  A11y fix
8h          8h          8h          6h          4h
```

---

## BEFORE/AFTER

### BEFORE

```
Homepage          Product Page
┌──────────┐      ┌──────────┐
│ Colorful │  →   │ Brutalist│  ← Jarring!
│ Modern   │      │ Edgy     │
│ Light    │      │ Dark     │
└──────────┘      └──────────┘
```

### AFTER

```
Homepage          Product Page
┌──────────┐      ┌──────────┐
│ Brutalist│  →   │ Brutalist│  ← Seamless!
│ Unified  │      │ Unified  │
│ Dark     │      │ Dark     │
└──────────┘      └──────────┘
```

---

## REMEMBER

✨ **Ralph Wiggum Technique = Observe → Diagnose → Test → Refine → Repeat**

🤖 **MCP servers automate 60% of the work**

✅ **Validate at every checkpoint**

🎯 **5 days to a unified, professional website**

---

## FULL DOCUMENTATION

For detailed info:

- **Strategy:** [RALPH_WIGGUM_LOOP_PLAN.md](./RALPH_WIGGUM_LOOP_PLAN.md)
- **Automation:** [MCP_SERVERS_GUIDE.md](./MCP_SERVERS_GUIDE.md)
- **Tracking:** [RALPH_WIGGUM_DASHBOARD.md](./RALPH_WIGGUM_DASHBOARD.md)

---

**Status:** Ready to execute ✅  
**Print this card:** Yes 🖨️  
**Confidence:** 95% 📈

**LET'S FIX THIS WEBSITE! 🚀**
