# 🎯 RALPH WIGGUM LOOP: Website Fix Strategy

## Jay Life Storefront Diagnostic & Execution Plan

**Created:** January 20, 2026  
**Method:** Ralph Wiggum Technique (AI-driven software development)  
**Audience:** Jay Life Development Team  
**Timeline:** 3-5 days execution; 2 weeks full deployment

---

## 🧠 EXECUTIVE SUMMARY (Non-Programmer Explanation)

Your website has **two competing design systems** fighting each other:

- **Homepage** looks modern and colorful (Electric-Lime)
- **Product pages** look brutalist and edgy (Warm-Sunrise)

**Result:** Jarring experience. Users click to browse → whole design changes.

**Solution:** Unify to **Warm-Sunrise Neo-Brutalist** system (most complete, already live on PDP).

**Effort:** 40-60 hours of structured automation + manual fixes.

---

## 📊 DIAGNOSIS: What's Broken (Rule 5: Structured Output)

### Issue Severity Matrix

| Priority     | Issue                                      | Impact                       | Effort | Blocker? |
| ------------ | ------------------------------------------ | ---------------------------- | ------ | -------- |
| **CRITICAL** | Two design systems fighting                | Visual chaos                 | 20h    | ✅ YES   |
| **CRITICAL** | Two mock data files (incompatible shapes)  | App crashes on wrong data    | 8h     | ✅ YES   |
| **HIGH**     | Homepage components don't match PDP layout | Navigation breaks experience | 12h    | ⚠️ YES   |
| **HIGH**     | Accessibility issues (aria-labels missing) | WCAG compliance fails        | 4h     | ✅ YES   |
| **MEDIUM**   | Unused layout files clutter codebase       | Maintenance burden           | 2h     | ❌ NO    |
| **MEDIUM**   | TypeScript compatibility warning           | Dev productivity hit         | 1h     | ❌ NO    |
| **LOW**      | Prettier/ESLint not configured             | Code quality drifts          | 0.5h   | ❌ NO    |

---

## 🎬 THE RALPH WIGGUM LOOP EXPLAINED (Rule 6: Explain the Why)

### What It Is

**Ralph Wiggum Technique** = AI-driven iterative problem-solving loop:

```
OBSERVE → DIAGNOSE → HYPOTHESIZE → TEST → REFINE → REPEAT
```

Think of it like a doctor:

1. **Look at symptoms** (visual inconsistency, data shape errors)
2. **Find root cause** (two competing systems)
3. **Propose solution** (unify to Warm-Sunrise)
4. **Test incrementally** (fix Homepage → test → fix PDP → test)
5. **Learn & refine** (if it breaks, adjust and try again)

### Why This Matters

- **Non-linear:** Don't just follow a checklist; learn as you go
- **AI-assisted:** Use MCP servers to automate 80% of fixes
- **Human-validated:** You verify each change before committing
- **Reversible:** Each step is atomic; can roll back if needed

---

## 🛠️ STEP-BY-STEP EXECUTION PLAN (Rule 4: Draft-Plan-Act)

### PHASE 1: Data Consolidation (Remove Blocker #1)

**Duration:** 4 hours | **Risk:** Medium

**Goal:** One source of truth for product data

**Tasks:**

- [ ] Analyze both mock data files (`mock-data.ts` vs `mockData.ts`)
- [ ] Create unified `ProductData.ts` interface
- [ ] Merge RITUALS + PRODUCTS into single dataset
- [ ] Update all imports across 15 component files
- [ ] Test: Verify app compiles, no TypeScript errors

**Why:** Prevents data shape mismatches that cause runtime crashes

**MCP Server Role:** CodeQL analysis to find all data imports

---

### PHASE 2: Design System Consolidation (Remove Blocker #2)

**Duration:** 12 hours | **Risk:** High (most visual changes)

**Goal:** Unify Homepage to Warm-Sunrise Neo-Brutalist

**Tasks:**

**2A. Update Homepage Color Palette (3h)**

- [ ] Replace `--brand-navy: #1A2E3B` → `--charcoal: #1A2E3B` (already matches!)
- [ ] Replace `--brand-cream: #F8F5F0` → `--cream: #F8F5F0` (already matches!)
- [ ] Update `_index.tsx` to use Tailwind `warm-sunrise-*` classes
- [ ] Test: Screenshot Homepage before/after (should look nearly identical)

**2B. Refactor Homepage Components (6h)**

- [ ] `ProductCard.tsx`: Add neo-brutalist border styling
- [ ] `BundleCard.tsx`: Align with `RitualCard.tsx` design
- [ ] `ProductCarousel.tsx`: Use warm-sunrise shadows
- [ ] `CountdownTimer.tsx`: Match neo-brutalist font
- [ ] Update all `className` strings in Homepage route

**2C. Validate Navigation Flow (3h)**

- [ ] Click from Homepage → Product Page → should feel seamless
- [ ] Check responsive: Mobile 375px → Tablet 768px → Desktop 1440px
- [ ] Verify no layout shift when navigating between pages
- [ ] Test: Video record user flow for review

**Why:** Visual consistency increases trust & conversion

**MCP Server Role:** Regex find-replace for class names; visual diff generation

---

### PHASE 3: Component Cleanup (Remove Technical Debt)

**Duration:** 6 hours | **Risk:** Low

**Goal:** Remove unused files, organize codebase

**Tasks:**

- [ ] Archive unused layout files to `/deprecated/`
  - `Layout.tsx`, `Header.tsx`, `Footer.tsx`, `BottomNav.tsx`, `AnnouncementBar.tsx`
- [ ] Update imports in any references
- [ ] Delete old mock data file if not used
- [ ] Clean up `.gitignore` if needed

**Why:** Reduces cognitive load; prevents accidental use of old systems

**MCP Server Role:** Codebase search to verify no remaining references

---

### PHASE 4: Accessibility Fixes (Compliance)

**Duration:** 4 hours | **Risk:** Low

**Goal:** Pass WCAG 2.1 Level AA

**Issues to fix:**

| Issue                                    | Location                  | Fix                              |
| ---------------------------------------- | ------------------------- | -------------------------------- |
| Missing `aria-label` on icon-only button | `NeoNavbar` mobile toggle | Add `aria-label="Toggle menu"`   |
| No form labels                           | `NeoFooter` email input   | Wrap in `<label>` with `htmlFor` |
| Missing focus ring                       | PDP variant buttons       | Add `:focus-visible` state       |
| Low contrast check                       | Lime on cream             | Run contrast checker tool        |

**Tasks:**

- [ ] `NeoNavbar.tsx`: Add aria-labels to mobile menu button
- [ ] `NeoFooter.tsx`: Add form labels and aria-describedby
- [ ] `VariantSelector.tsx`: Add focus ring styling
- [ ] Run `axe` accessibility scanner in browser
- [ ] Document results in `docs/A11Y_AUDIT.md`

**Why:** Legal compliance + inclusive design + SEO boost

**MCP Server Role:** Accessibility linting tool (automated a11y checker)

---

### PHASE 5: TypeScript & Linting (Code Quality)

**Duration:** 2 hours | **Risk:** Very Low

**Goal:** Zero warnings, strict mode ready

**Tasks:**

- [ ] Fix TypeScript version warning (already done in setup!)
- [ ] Run `npm run check` (typecheck + lint + format)
- [ ] Fix any remaining `@ts-ignore` comments
- [ ] Verify all `any` types are resolved
- [ ] Pre-commit hooks auto-check on next commit

**Why:** Catches bugs before production; improves maintainability

**MCP Server Role:** Already configured (Prettier + ESLint)

---

## 📈 SUCCESS METRICS (Rule 3: Boundaries)

After completing all phases, measure:

| Metric                 | Target                                   | Tool                                    |
| ---------------------- | ---------------------------------------- | --------------------------------------- |
| **Visual Consistency** | 0 style conflicts between Homepage & PDP | Manual screenshot review                |
| **Data Integrity**     | 0 TypeScript errors                      | `npm run typecheck`                     |
| **Accessibility**      | Pass axe scanner with 0 violations       | Browser extension                       |
| **Performance**        | LCP < 2.5s                               | Chrome DevTools                         |
| **Code Quality**       | ESLint 0 errors, Prettier formatted      | `npm run lint` + `npm run format:check` |

---

## 🚀 DETAILED EXECUTION (Rule 10: Divide & Conquer)

### Week 1: Quick Wins (48 hours)

**Day 1 (4h):**

- [ ] Create unified data interface
- [ ] Update 3 test components
- [ ] Verify no crashes

**Day 2 (8h):**

- [ ] Update all Homepage components
- [ ] Screenshot comparison
- [ ] User flow testing

**Day 3 (4h):**

- [ ] Accessibility fixes
- [ ] A11y audit
- [ ] Document findings

**Day 4 (4h):**

- [ ] Code cleanup
- [ ] TypeScript fixes
- [ ] Final validation

---

## 📦 RESOURCES NEEDED (Rule 8: Provide Scaffold)

### MCP Servers to Deploy

1. **CodeQL Analysis**
   - Purpose: Find all data imports, color references
   - Command: `npm install --save-dev @github/codeql-cli`

2. **Accessibility Linter**
   - Purpose: Automated a11y checks
   - Command: `npm install --save-dev @axe-core/react`

3. **Visual Regression Testing**
   - Purpose: Before/after screenshots
   - Command: `npm install --save-dev @playwright/test`

### Files to Modify (19 total)

**Data Layer (2):**

- `app/lib/mock-data.ts` (merge with mockData.ts)
- `app/lib/queries.ts` (update if needed)

**Components - Homepage (10):**

- `app/routes/_index.tsx`
- `app/components/product/ProductCard.tsx`
- `app/components/product/ProductCarousel.tsx`
- `app/components/product/BundleCard.tsx`
- `app/components/ui/PriceDisplay.tsx`
- `app/components/ui/SaleBadge.tsx`
- `app/components/ui/WishlistButton.tsx`
- `app/components/ui/CountdownTimer.tsx`
- `app/components/ui/ExitIntentPopup.tsx`
- `app/components/ui/EmailCapture.tsx`

**Layout (4):**

- `app/components/layout/NeoNavbar.tsx` (aria-labels)
- `app/components/layout/NeoFooter.tsx` (form labels)
- `app/components/product/VariantSelector.tsx` (focus rings)
- `app/root.tsx` (verify imports)

**Cleanup (3):**

- `app/components/layout/Layout.tsx` (archive)
- `app/components/layout/Header.tsx` (archive)
- `app/components/layout/Footer.tsx` (archive)

---

## ⚡ AUTOMATION SCRIPTS (Rule 8: Scaffold)

**Create new scripts in `package.json`:**

```bash
# Run full diagnostic
npm run diagnose

# Fix specific issues
npm run fix:data         # Consolidate mock data
npm run fix:design       # Unify color system
npm run fix:a11y         # Fix accessibility issues

# Full validation
npm run validate:all     # All checks at once
```

---

## 🎓 RISK MITIGATION (Rule 9: Think Step by Step)

| Risk                   | Probability | Mitigation                                 |
| ---------------------- | ----------- | ------------------------------------------ |
| Breaking Navigation    | Medium      | Git branch before changes; test on staging |
| TypeScript Errors      | Low         | Run `npm run typecheck` after each file    |
| Visual Regression      | High        | Screenshot comparison tool + manual review |
| Data Loss              | Very Low    | Backup mock-data.ts before merging         |
| Performance Regression | Low         | Lighthouse check after major changes       |

---

## 📋 TEMPLATE: Component Refactor Pattern

**When updating components, follow this template:**

```typescript
// BEFORE: Electric-Lime system
export function ProductCard({ ritual }: { ritual: Ritual }) {
  return (
    <div className="rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-brand-navy">{ritual.name}</h3>
      {/* Old styling */}
    </div>
  );
}

// AFTER: Warm-Sunrise system
export function ProductCard({ ritual }: { ritual: Product }) {
  return (
    <div className="border-4 border-warm-sunrise-charcoal shadow-neo">
      <h3 className="font-black uppercase text-warm-sunrise-charcoal">{ritual.name}</h3>
      {/* Neo-brutalist styling */}
    </div>
  );
}
```

---

## 🔄 VALIDATION CHECKLIST (Before Committing)

- [ ] `npm run check` passes (typecheck + lint + format)
- [ ] App compiles: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] Homepage loads without errors
- [ ] Can navigate to Product page
- [ ] No console errors
- [ ] Mobile responsive (375px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1440px)
- [ ] Axe a11y scanner passes
- [ ] Git pre-commit hook passes (if configured)
- [ ] Screenshots match design system

---

## 📞 NEXT STEPS

1. **Confirm approach:** Review this plan with stakeholders
2. **Allocate resources:** Assign team members to phases
3. **Create feature branch:** `git checkout -b fix/design-system-unification`
4. **Execute Phase 1:** Start with data consolidation (lowest risk)
5. **Deploy to staging:** Test before production
6. **Document lessons:** Update this plan after execution

---

## 📚 REFERENCES

- [Ralph Wiggum Technique (WSJ Article)](https://www.wsj.com/tech/ai/our-ai-future-is-already-here-its-just-not-evenly-distributed-cf7a6f35)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Warm Sunrise Design System](./WARM_SUNRISE_DESIGN_SYSTEM.md)
- [Gap Report Details](./GAP_REPORT.md)

---

**Status:** Ready for execution ✅
**Estimated Completion:** 5 business days
**Confidence Level:** High (95%)
