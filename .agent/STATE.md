# Jay Life Project State
**Last Updated:** 2026-01-20 | **Version:** 1.1

---

## Quick Context (Read First)

**Project:** Jay Life - Gen-Z wellness D2C storefront
**Stack:** Shopify Hydrogen (Remix/React) + Storefront GraphQL API + Tailwind CSS
**Target:** Shopify Oxygen edge deployment
**Philosophy:** "Design for thumb, scale to mouse" - Mobile-first

---

## External Resources (forAntiGravity)

**Location:** `C:\Users\dtrip\Downloads\forAntiGravity\`

### Subagents Library
**Path:** `awesome-claude-code-subagents-main\categories\`

| Category | Path | Key Agents |
|----------|------|------------|
| Core Dev | `01-core-development/` | frontend-developer, graphql-architect, ui-designer |
| Languages | `02-language-specialists/` | react-specialist, typescript-pro, javascript-pro |
| Infrastructure | `03-infrastructure/` | deployment-engineer, devops-engineer |
| Quality | `04-quality-security/` | code-reviewer, accessibility-tester, security-auditor |
| Data/AI | `05-data-ai/` | (not primary for this project) |
| DevEx | `06-developer-experience/` | documentation-engineer, refactoring-specialist |

### Workflows Library
**Path:** `claude-code-workflows-main\`

| Workflow | Path | Use For |
|----------|------|---------|
| **Design Review** | `design-review/design-review-agent.md` | Visual QA with Playwright |
| **Code Review** | `code-review/pragmatic-code-review-subagent.md` | PR reviews |
| **Security Review** | `security-review/security-review-slash-command.md` | Security audit |
| **Design Principles** | `design-review/design-principles-example.md` | Checklist template |

### How to Use
1. **Design Review:** Run after UI changes - uses Playwright to test responsiveness, a11y, visual polish
2. **Code Review:** Run before PR merge - checks architecture, security, maintainability
3. **Security Review:** Run before production - focuses on input validation, auth, data exposure

---

## Critical Issue: Dual Design System

The codebase has **TWO conflicting visual systems** that must be unified:

| System | Primary Color | Text Color | Border Style | Used By |
|--------|--------------|------------|--------------|---------|
| **Electric-Lime** | `#BFFF00` | `#1A2E3B` (navy) | Soft shadows | Homepage only |
| **Warm-Sunrise** | `#BFFF00` | `#2D2926` (charcoal) | Neo-brutalist 4px | PDP, Rituals, Layout |

**Decision Required:** Choose Option A (unify to warm-sunrise), B (unify to electric-lime), or C (hybrid)

---

## File Inventory

### Active Layout (Warm-Sunrise)
- `app/root.tsx` - Uses NeoLayout
- `app/components/layout/NeoLayout.tsx`
- `app/components/layout/NeoNavbar.tsx`
- `app/components/layout/NeoFooter.tsx`

### Deprecated Layout (Original)
- `app/components/layout/Layout.tsx`
- `app/components/layout/Header.tsx`
- `app/components/layout/Footer.tsx`
- `app/components/layout/BottomNav.tsx`
- `app/components/layout/AnnouncementBar.tsx`

### Routes
| Route | Status | Design System |
|-------|--------|---------------|
| `_index.tsx` | Active | Electric-Lime |
| `ritual.$handle.tsx` | Active | Warm-Sunrise |
| `rituals._index.tsx` | Active | Warm-Sunrise |
| `cart.tsx` | Active | Needs review |
| `account._index.tsx` | Active | Needs review |
| `learn._index.tsx` | Active | Needs review |
| `warm-sunrise.tsx` | Test page | Reference only |

### Data Models (Conflict!)
| File | Interface | Fields |
|------|-----------|--------|
| `app/lib/mock-data.ts` | `Ritual` | `price: number`, has ratings |
| `app/lib/mockData.ts` | `Product` | `price: string`, has brandColor |

**Action:** Consolidate to single interface

---

## Design Tokens

### Brand Colors (Canonical - from brand_guidelines.md)
```css
--color-acid: #BFFF00       /* Primary CTA */
--color-cream: #FAF9F5      /* Background */
--color-charcoal: #1A1A1A   /* Text */
--color-muted: #68809A      /* Secondary */
--color-coral: #FF6F61      /* Errors/Urgency */
--color-lavender: #E6E6FA   /* Info accent */
```

### Typography
- **Headlines:** Outfit 700 (32px mobile / 56px desktop)
- **Body:** Inter 400 (16px)
- **Specs:** JetBrains Mono 400 (14px)

### Spacing (8px base)
- Touch targets: 48px min, 56px recommended
- Container: 20px mobile / 80px desktop

---

## Accessibility Status

### Passing
- Skip links implemented
- Focus-visible states defined
- Touch targets enforced (48px)
- Reduced motion support

### Issues
- Missing `aria-label` on NeoNavbar mobile toggle
- Form inputs lack labels in NeoFooter email
- No focus ring on PDP variant buttons

---

## Component Status

### Homepage (Electric-Lime) Components
| Component | Status | Notes |
|-----------|--------|-------|
| `ProductCard.tsx` | Active | Expects `Ritual` interface |
| `ProductCarousel.tsx` | Active | Uses RITUALS array |
| `BundleCard.tsx` | Active | Promotion component |
| `PriceDisplay.tsx` | Active | Price formatting |
| `SaleBadge.tsx` | Active | Discount badges |
| `WishlistButton.tsx` | Active | Heart icon |
| `CountdownTimer.tsx` | Active | Sale urgency |
| `ExitIntentPopup.tsx` | Active | Email capture |
| `EmailCapture.tsx` | Active | Newsletter signup |

### PDP/Rituals (Warm-Sunrise) Components
| Component | Status | Notes |
|-----------|--------|-------|
| `RitualGrid.tsx` | Active | Expects `Product[]` |
| `RitualCard.tsx` | Active | Neo-brutalist style |
| `VariantSelector.tsx` | Active | Size/type selection |
| `QuantitySelector.tsx` | Active | +/- buttons |
| `DeliveryEstimate.tsx` | Active | Shipping info |
| `ReviewSection.tsx` | Active | Customer reviews |
| `FAQAccordion.tsx` | Active | Expandable FAQ |

### Shared UI Components
| Component | Status |
|-----------|--------|
| `Badge.tsx` | Active |
| `TrustBadge.tsx` | Active |
| `StarRating.tsx` | Active |
| `Icons.tsx` | Active |

---

## Brand Voice Rules

### Use
- Ritual, Routine, Results, Feel, Daily, Formula, Clean

### Avoid (Critical)
- Stack, Deploy, Protocol, Upgrade (as product term)
- Nourish, Journey, Holistic, Self-care, Balance

### CTA Text
| Instead of | Use |
|------------|-----|
| "Deploy your stack" | "Shop Our Collection" |
| "Add to ritual" | "Add to Cart" |
| "Start your ritual" | "Shop Now" |

---

## Relevant Agents (from skills library)

### Primary Agents for This Project
| Agent | Use For |
|-------|---------|
| `react-specialist` | Component optimization, hooks, performance |
| `typescript-pro` | Type safety, interface consolidation |
| `frontend-developer` | UI implementation, responsive design |
| `graphql-architect` | Shopify Storefront API queries |
| `documentation-engineer` | Keep docs in sync |

### Supporting Agents
| Agent | Use For |
|-------|---------|
| `ui-designer` | Design system unification |
| `accessibility-tester` | WCAG compliance fixes |
| `performance-engineer` | Core Web Vitals |
| `code-reviewer` | PR reviews |

---

## Pending Tasks

### High Priority
1. [ ] Decide design system direction (A/B/C)
2. [ ] Consolidate mock data interfaces
3. [ ] Fix accessibility issues
4. [ ] Unify color variables across codebase

### Medium Priority
5. [ ] Update deprecated layout files or remove
6. [ ] Add missing TypeScript types
7. [ ] Implement actual Shopify GraphQL queries
8. [ ] Add cart functionality

### Low Priority
9. [ ] Add loading states
10. [ ] Implement error boundaries
11. [ ] Add analytics tracking
12. [ ] Performance optimization

---

## GraphQL Queries Needed

```graphql
# Products listing
query GetRituals($first: Int!) {
  products(first: $first) {
    edges { node { id handle title ... } }
  }
}

# Single product
query GetRitual($handle: String!) {
  productByHandle(handle: $handle) { ... }
}

# Cart operations
mutation CartCreate { ... }
mutation CartLinesAdd { ... }
```

---

## Session Notes

### 2026-01-20
- Created initial state file
- Documented dual design system issue
- Mapped component inventory
- Referenced relevant subagents

---

## Quick Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run typecheck        # Check types
npm run lint             # ESLint
shopify hydrogen deploy  # Deploy to Oxygen
```

---

## Reference Docs

| Document | Location |
|----------|----------|
| Design System | `docs/WARM_SUNRISE_DESIGN_SYSTEM.md` |
| Gap Report | `docs/GAP_REPORT.md` |
| Brand Guidelines | `brand_guidelines.md` |
| Project Config | `CLAUDE.md` |
| Design Principles | `.agent/DESIGN_PRINCIPLES.md` |
| Agent Registry | `.agent/AGENTS.md` |
| Session Primer | `.agent/PRIMER.md` |

### External Resources

| Resource | Location |
|----------|----------|
| Subagents Library | `C:\Users\dtrip\Downloads\forAntiGravity\awesome-claude-code-subagents-main\categories\` |
| Workflows Library | `C:\Users\dtrip\Downloads\forAntiGravity\claude-code-workflows-main\` |

---

*Update this file when: design decisions made, components added/removed, issues resolved, or session context changes.*
