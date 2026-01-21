# Session Primer

**Read this first for instant context**

---

## What is this?

Jay Life - Gen-Z wellness D2C storefront on Shopify Hydrogen (Remix + React + Tailwind)

## Critical Issue

**TWO design systems exist** - must unify before production:

- Homepage uses "Electric-Lime" system
- Rest of site uses "Warm-Sunrise" neo-brutalist system

## Stack

```
Frontend: Shopify Hydrogen (Remix-based React)
Backend:  Shopify Storefront API (GraphQL)
Hosting:  Shopify Oxygen (edge)
Styling:  Tailwind CSS + tokens.css
```

## Active Layout

- `app/root.tsx` wraps with `NeoLayout`
- Uses `NeoNavbar` + `NeoFooter`
- Original Layout/Header/Footer are deprecated

## Data Conflict

Two mock data files with different interfaces:

- `mock-data.ts` has `Ritual` (price: number)
- `mockData.ts` has `Product` (price: string)

## Brand Voice

- Use: Ritual, Routine, Results, Feel, Clean
- Never: Stack, Deploy, Protocol, Journey, Holistic

## Key Files

| Purpose          | File                                 |
| ---------------- | ------------------------------------ |
| Full state       | `.agent/STATE.md`                    |
| Agent mapping    | `.agent/AGENTS.md`                   |
| Design checklist | `.agent/DESIGN_PRINCIPLES.md`        |
| Security review  | `.agent/SECURITY_REVIEW.md`          |
| Gap analysis     | `docs/GAP_REPORT.md`                 |
| Design system    | `docs/WARM_SUNRISE_DESIGN_SYSTEM.md` |
| Brand guide      | `brand_guidelines.md`                |
| Project config   | `CLAUDE.md`                          |

## External Resources

**forAntiGravity:** `C:\Users\dtrip\Downloads\forAntiGravity\`

| Resource                                         | Use For            |
| ------------------------------------------------ | ------------------ |
| `awesome-claude-code-subagents-main\categories\` | Specialized agents |
| `claude-code-workflows-main\design-review\`      | Visual QA workflow |
| `claude-code-workflows-main\code-review\`        | PR review workflow |
| `claude-code-workflows-main\security-review\`    | Security audit     |

## Commands

```bash
npm run dev     # localhost:3000
npm run build   # production
npm run lint    # check code
```

## Quick Decisions Needed

1. Which design system? (warm-sunrise vs electric-lime)
2. Consolidate data interfaces
3. Fix accessibility gaps

---

_For full context, read `.agent/STATE.md`_
