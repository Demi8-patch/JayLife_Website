# CLAUDE.md

This file provides guidance to Claude Code when working with the Jay Life storefront.

## Project Overview

**Jay Life** is a mobile-first headless ecommerce storefront for a Gen-Z wellness brand offering stackable, science-backed daily optimization tools (rituals).

**Stack:**
- **Frontend:** Shopify Hydrogen (Remix-based React)
- **Backend:** Shopify Storefront API (GraphQL)
- **Hosting:** Shopify Oxygen (edge)
- **Styling:** Tailwind CSS with custom design tokens

**Design Philosophy:** "Design for thumb, scale to mouse" - Mobile-first, thumb-zone optimized.

## Architecture

```
jaylife-storefront/
├── app/
│   ├── components/        # React components
│   │   ├── layout/        # BottomNav, Header, Footer
│   │   ├── product/       # RitualCard, RitualGrid, IngredientList
│   │   ├── cart/          # CartDrawer, CartLine, CartSummary
│   │   └── ui/            # Button, Input, Badge (shadcn-based)
│   ├── routes/            # Remix routes
│   │   ├── _index.tsx     # Homepage
│   │   ├── rituals._index.tsx
│   │   ├── ritual.$handle.tsx
│   │   ├── cart.tsx
│   │   ├── account.tsx
│   │   └── learn/
│   ├── styles/
│   │   └── tokens.css     # Design tokens
│   └── lib/
│       ├── shopify.ts     # Storefront API client
│       └── hooks/         # useCart, useHaptics, etc.
├── public/
├── tailwind.config.ts
└── hydrogen.config.ts
```

## Design System

### Colors
```css
--color-acid: #BFFF00;      /* Primary actions */
--color-cream: #FAF9F5;     /* Background */
--color-charcoal: #1A1A1A;  /* Text */
--color-muted: #68809A;     /* Secondary text */
--color-coral: #FF6F61;     /* Errors */
--color-lavender: #E6E6FA;  /* Calm accent */
```

### Typography
- **Headlines:** Inter Bold, 28px mobile / 48px desktop, -0.5px tracking
- **Body:** Inter Regular, 16px
- **Specs:** JetBrains Mono, 14px (ingredient lists)

### Spacing
- **Base unit:** 8px
- **Touch targets:** 48px minimum
- **Container padding:** 20px mobile / 80px desktop

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with hero + ritual grid |
| `/rituals` | All products grid |
| `/ritual/:handle` | Product detail (FOCUS, CALM, etc.) |
| `/cart` | Cart page/drawer |
| `/account` | Customer dashboard |
| `/learn` | Educational content |

## Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Build & Deploy
npm run build            # Production build
npm run preview          # Preview production build
shopify hydrogen deploy  # Deploy to Oxygen

# Testing
npm run typecheck        # TypeScript check
npm run lint             # ESLint
```

## Key Patterns

### Mobile-First Components
All components start mobile and scale up:
```tsx
// Good: Mobile-first
<div className="px-5 md:px-20 py-12 md:py-20">

// Bad: Desktop-first
<div className="px-20 md:px-5">
```

### Thumb-Zone Navigation
Bottom tab bar on mobile, top header on desktop:
```tsx
<BottomNav className="fixed bottom-0 md:hidden" />
<Header className="hidden md:flex" />
```

### Touch Targets
All interactive elements minimum 48px:
```tsx
<button className="min-h-12 min-w-12 ...">
```

### Haptic Feedback
Use on add-to-cart and key interactions:
```tsx
const handleAdd = () => {
  if (navigator.vibrate) navigator.vibrate(10);
  addToCart(product);
};
```

## Product Data (Shopify Metafields)

Products use these metafields:
- `ingredients` (JSON): `[{name, dose}]`
- `tagline` (string): "Stay sharp. No jitters."
- `lab_report_url` (string): Link to lab report
- `synergy_rituals` (list): Related product handles

## Brand Voice

- **Calm, confident, clear, friendly**
- Short sentences. Fragment-friendly.
- Use: Ritual, Upgrade, Deploy, Clean, Lock in
- Avoid: Nourish, Journey, Holistic, Self-care, Balance

## References

- Design Doc: `docs/plans/2026-01-14-jaylife-ecommerce-design.md`
- Brand Guidelines: `brand_guidelines.md`
- Design Checklist: `context/design-principles.md`
