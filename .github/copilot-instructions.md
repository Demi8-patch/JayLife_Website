## Purpose

This file gives an AI coding agent the minimum, immediately-actionable context
to be productive in the Jay Life storefront repo.

**Quick start**
- **Dev:** `npm run dev` (runs `shopify hydrogen dev --codegen`)
- **Build:** `npm run build` and preview with `npm run preview`
- **Typecheck / Lint:** `npm run typecheck` and `npm run lint`
- **GraphQL codegen:** `npm run codegen`

**Environment & runtime**
- Node >= 18 required (see `package.json`).
- Server uses Hydrogen/Remix and runs on Shopify Oxygen edge in production; local preview uses `@shopify/mini-oxygen` via Vite (`vite.config.ts`).
- Important env vars (referenced in `server.ts`): `PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`, `SESSION_SECRET`.

**Big-picture architecture (how things fit together)**
- UI: `app/components/` (layout, product, ui). Mobile-first React components (Remix routes under `app/routes/`).
- App bootstrap: `app/root.tsx` wraps pages with `NeoLayout` and loads design tokens (`app/styles/tokens.css`).
- Server entry: `server.ts` creates the Storefront client and handles request caching for product pages.
- Build tooling: Hydrogen + Remix + Vite plugins configured in `vite.config.ts`.

**Project-specific patterns & conventions**
- Mobile-first CSS: prefer `px-5 md:px-20` (scale up with `md:`). See `CLAUDE.md` examples.
- Thumb-zone UX: bottom tab bar on mobile (`BottomNav`), header shown on desktop (`Header`).
- Design tokens live in `app/styles/tokens.css` — prefer tokens over hard-coded colors.
- Path alias `~/*` maps to `./app/*` (see `tsconfig.json`). Use `~/` imports for app code.
- Haptics: small vibrate calls used in add-to-cart flows — search `useHaptics` in `app/lib/hooks`.

**Data & Shopify integration notes**
- GraphQL Storefront queries live near usage (see `app/lib/queries.ts`). Run `npm run codegen` after changing queries.
- Common product metafields: `ingredients` (JSON), `tagline`, `lab_report_url`, `synergy_rituals` — code expects these shapes.
- Server creates a storefront client in `server.ts` and uses `getStorefrontHeaders(request)` — avoid leaking secret tokens into client bundles.

**Examples (copyable patterns)**
- Mobile-first layout: use small-first then `md:` expansion.
  - Good: `<div className="px-5 md:px-20 py-12 md:py-20">`
- Product page cache header (server-side): see `server.ts` where `/ritual/` pages set `Cache-Control`.

**Quality, testing & PR checks**
- Run visual/responsive checks after UI changes (desktop 1440px, tablet 768px, mobile 375px).
- Check known a11y items from `.agent/AGENTS.md`: NeoNavbar mobile toggle aria-label, form input labels in `NeoFooter`, focus rings for variant buttons.
- Performance targets: LCP < 2.5s, FID < 100ms, CLS < 0.1 (see `.agent/AGENTS.md`).

**Where to look first (important files)**
- [package.json](package.json) — scripts & Node engine
- [server.ts](server.ts) — Storefront client + caching
- [vite.config.ts](vite.config.ts) — Hydrogen/Vite/Oxygen plugins
- [app/root.tsx](app/root.tsx) — layout & tokens
- [app/styles/tokens.css](app/styles/tokens.css) — design tokens
- [app/lib/queries.ts](app/lib/queries.ts) and [app/lib/mock-data.ts](app/lib/mock-data.ts) — GraphQL and data shapes
- [.agent/AGENTS.md](.agent/AGENTS.md) — agent mappings and workflows
- [CLAUDE.md](CLAUDE.md) — extended design + style guidance

**How to behave when editing**
- Preserve mobile-first classes and design tokens; avoid desktop-first overrides.
- When changing GraphQL queries, run `npm run codegen` and update types.
- For frontend changes, run visual diff/responsive checks and address known a11y items before PR.

If anything here is unclear or you'd like more examples (component scaffolding, query templates, or CI steps), tell me what to expand.
