## Purpose & Audience

**For:** AI coding agents and developers working on Jay Life's Shopify Hydrogen storefront  
**Goal:** Enable productive, high-quality contributions in minimal onboarding time  
**Why it matters:** Clear conventions prevent drift, reduce refactoring, and maintain performance/accessibility standards across the team.

This guide distills **essential patterns, tech decisions, and non-negotiables** to unblock agent-driven development while respecting mobile-first design, type safety, and Shopify best practices.

## Quick Start (Do These First)

| Command             | Purpose                                             | When to Use                                |
| ------------------- | --------------------------------------------------- | ------------------------------------------ |
| `npm run dev`       | Launch dev server with hot-reload + GraphQL codegen | After cloning; before any feature work     |
| `npm run typecheck` | Validate TypeScript types                           | Before committing code                     |
| `npm run lint`      | Check ESLint + formatting                           | Before opening PR                          |
| `npm run build`     | Production build                                    | Verify before deployment                   |
| `npm run preview`   | Preview production build locally                    | After build; test performance              |
| `npm run codegen`   | Regenerate GraphQL types                            | **Always run after editing `.ts` queries** |

**Node version:** ≥ 18 (check `package.json`). If CI fails, verify your Node matches.

## Environment & Runtime (What Powers This Codebase)

| Component             | Details                                                                | Reference                                   |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Framework**         | Hydrogen (Shopify's React metaframework) + Remix                       | Runs on Shopify Oxygen (edge) in production |
| **Build system**      | Vite + Hydrogen plugins                                                | See `vite.config.ts`                        |
| **Local server**      | `@shopify/mini-oxygen` + Vite dev                                      | Mirrors Oxygen behavior locally             |
| **Required env vars** | `PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`, `SESSION_SECRET` | Set in `.env.local` (never commit)          |

**Why this matters:** Hydrogen is optimized for mobile-first, fast edge rendering. The local dev server mirrors production closely, so issues you fix locally are likely fixed in production.

## Architecture: How Parts Connect (Think Step-by-Step)

### Data Flow (Agent Critique: Understand This Before Touching Code)

**Request → Server → Storefront API → Cache/Response → Component → DOM**

| Layer              | Location                                       | Role                                                 | Key Decision                                             |
| ------------------ | ---------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| **Routes**         | `app/routes/*.tsx`                             | Remix routes; handles navigation                     | Keep route-specific; extract shared logic to lib/        |
| **Server**         | `server.ts`                                    | Creates Storefront client; handles caching headers   | Where to set `Cache-Control` for product pages           |
| **Components**     | `app/components/`                              | Reusable React UI; layout, product, cart, ui folders | Mobile-first Tailwind classes; prefer tokens over colors |
| **Data fetching**  | `app/lib/queries.ts`                           | GraphQL queries live near usage                      | Always run `npm run codegen` after editing               |
| **Styling system** | `app/styles/tokens.css` + `tailwind.config.ts` | Design tokens + responsive classes                   | Use `px-5 md:px-20` pattern; avoid hardcoded values      |

### Component Organization (Why It Matters)

- **`layout/`**: NeoNavbar, NeoLayout, NeoFooter, BottomNav — page shells & navigation
- **`product/`**: Product cards, rituals, variants, reviews — everything product-display related
- **`cart/`**: CartDrawer — add-to-cart, checkout flow
- **`ui/`**: Reusable primitives — Badge, buttons, modals, etc.

**Why structure matters:** Agents (and humans) find code faster. Clear boundaries = fewer bugs.

## Core Patterns & Conventions (Do This, Not That)

| Pattern              | ✅ Do This                                         | ❌ Avoid This                  | Why                                          | Example                                    |
| -------------------- | -------------------------------------------------- | ------------------------------ | -------------------------------------------- | ------------------------------------------ |
| **Mobile-first CSS** | Start small, use `md:` breakpoints                 | Desktop-first `lg:` overrides  | Mobile is 80% of traffic; scales right       | `className="px-5 md:px-20 py-12 md:py-20"` |
| **Design tokens**    | Import from `tokens.css`                           | Hardcoded hex/RGB colors       | Single source of truth; rebrand in one place | `className="bg-primary text-accent"`       |
| **Imports**          | Use `~/*` alias for app code                       | Relative `../../../lib/` paths | Cleaner, refactor-safe                       | `import { query } from '~/lib/queries.ts'` |
| **GraphQL updates**  | Run `npm run codegen` after query edits            | Ship without types updated     | Generated types keep data safe               | Edit query → codegen → commit              |
| **Haptics**          | Call `useHaptics()` in interactive flows           | No user feedback               | Users feel "stuck" on mobile                 | `useHaptics('vibrate')` in add-to-cart     |
| **Thumb-zone UX**    | Bottom nav on mobile (`BottomNav`), top on desktop | Fixed header everywhere        | Mobile users reach bottom easier             | Two separate nav components                |

### Data Metafields (Shopify Integration)

**These metafields are expected by the app; add them to products in Shopify:**

| Metafield         | Type   | Purpose                      |
| ----------------- | ------ | ---------------------------- |
| `ingredients`     | JSON   | List of product ingredients  |
| `tagline`         | String | Short product description    |
| `lab_report_url`  | URL    | Link to lab/certificate      |
| `synergy_rituals` | JSON   | Related rituals for bundling |

**Agent tip:** If a component crashes on `product.metafields.custom.ingredients`, the metafield is missing or malformed in Shopify.

## Copyable Patterns & Scaffolds (Template Starter Code)

### Mobile-First Layout Component

```tsx
export default function MyComponent() {
  return (
    <div className="px-5 md:px-20 py-12 md:py-20">
      {/* Mobile-first: small padding scales to desktop */}
      <h1 className="text-lg md:text-3xl font-bold">Title</h1>
      <p className="text-sm md:text-base leading-relaxed">Content</p>
    </div>
  );
}
```

### GraphQL Query Pattern

```typescript
// app/lib/queries.ts
export const PRODUCT_QUERY = `#graphql
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      metafields(identifiers: [
        { namespace: "custom", key: "ingredients" }
      ]) {
        nodes { value }
      }
    }
  }
`;

// After editing: run `npm run codegen` to regenerate types
```

### Add-to-Cart with Haptics (Mobile Feedback)

```tsx
import { useHaptics } from '~/lib/hooks/useHaptics';

export function AddToCartButton() {
  const { vibrate } = useHaptics();

  const handleClick = () => {
    vibrate('light'); // Feels responsive on mobile
    // ... add to cart logic
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

## Quality Checklist (Before PR Submission)

### ✅ Required Checks (Do Every Time)

- [ ] **Type safety:** Run `npm run typecheck` — no errors
- [ ] **Linting:** Run `npm run lint` — passes ESLint + Prettier
- [ ] **GraphQL:** Run `npm run codegen` if queries changed
- [ ] **Mobile test:** Open DevTools (F12) → responsive design mode → test at 375px width
- [ ] **Desktop test:** Verify layout at 1440px
- [ ] **Tablet test:** Confirm touch interactions work at 768px

### ✅ Accessibility (A11y) Requirements

Per `.agent/AGENTS.md`, verify:

- [ ] NeoNavbar mobile toggle has `aria-label` (screen readers)
- [ ] Form inputs in NeoFooter have proper `<label>` elements
- [ ] Interactive buttons have visible focus rings (`:focus-visible`)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)

### ✅ Performance Targets (Web Vitals)

- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay): < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1

**How to test:** `npm run preview` → Chrome DevTools → Lighthouse tab (disable CPU throttle for consistent results)

## File Reference Guide (Where to Look First)

**Critical files (start here for any feature)**

| File                                           | Purpose                         | When to Edit                              |
| ---------------------------------------------- | ------------------------------- | ----------------------------------------- |
| [package.json](package.json)                   | Scripts & Node engine           | Add dependencies, update scripts          |
| [server.ts](server.ts)                         | Storefront client + caching     | Set `Cache-Control` headers, add env vars |
| [vite.config.ts](vite.config.ts)               | Build config (Hydrogen/Vite)    | Rarely; touch only if build fails         |
| [app/root.tsx](app/root.tsx)                   | Layout wrapper + tokens loader  | Global stylesheet changes                 |
| [app/styles/tokens.css](app/styles/tokens.css) | Design tokens (colors, spacing) | Rebrand; define new theme variables       |
| [app/lib/queries.ts](app/lib/queries.ts)       | GraphQL queries                 | Always `npm run codegen` after edits      |
| [app/lib/mock-data.ts](app/lib/mock-data.ts)   | Test data shapes                | Verify before integrating Shopify data    |

**Reference & workflow docs**

- [.agent/AGENTS.md](.agent/AGENTS.md) — agent mappings, workflows, performance targets
- [CLAUDE.md](CLAUDE.md) — extended design guidance + style troubleshooting
- [AUTOMATION_GUIDE.md](AUTOMATION_GUIDE.md) — CI/CD pipeline steps

## Docs folder — canonical location for human-readable artifacts

- Put all operational, testing, and runbook documents in the `docs/` folder (examples: testing checklists, design decisions, playbooks, runbooks). Avoid keeping these files in the repository root.
- When creating or editing docs:
  - Create or update `docs/<name>.md` (e.g., `docs/TESTING_CHECKLIST.md`).
  - Reference the doc from `.agent/AGENTS.md` or other workflow files if automated agents consume it.
  - Use clear, uppercase filenames for checklists/playbooks (e.g., `TESTING_CHECKLIST.md`, `DEPLOY_PLAYBOOK.md`).
  - Open a PR for substantive changes and include the visual/regression checks performed.
- Agents: always open and modify docs under `docs/` rather than editing root-level artifacts. If you find a relevant doc at the repo root (for example `TESTING_CHECKLIST.md`), propose or make a move to `docs/TESTING_CHECKLIST.md` and update references.

## Edit Behavior & Best Practices

**When editing code, follow these principles:**

1. **Preserve mobile-first classes** — Never override `md:` with `lg:` — Hydrogen is mobile-optimized
2. **GraphQL + codegen ritual** — Edit query → `npm run codegen` → commit types — This prevents runtime type errors
3. **Visual diff after UI changes** — Test at 375px (mobile), 768px (tablet), 1440px (desktop) before PR
4. **Address a11y proactively** — Include `aria-label`, focus rings, and label elements from the start
5. **Avoid token leaks** — Never log or expose `SHOPIFY_API_SECRET` in client bundles (use `server.ts` only)

**Trouble-free workflow**

```
1. Clone & setup:   git clone → npm install → npm run dev
2. Feature work:    Edit components → Run npm run typecheck
3. Before commit:   npm run lint → npm run build → visual test
4. Before PR:       Full checklist above → Push to branch
```
