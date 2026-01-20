# Component Dependency Map
**Jay Life Storefront — Route → Component → Data Flow**

> **Purpose:** Enable rapid navigation, refactoring, and feature additions by mapping all 7 routes, 29+ components, and 2 data sources. Use this map to understand cascade effects when modifying shared components or data models.
>
> **Last Updated:** After design system lock (Warm-Sunrise), data model unification (Ritual interface), and A11y fixes.

---

## 1. Route Dependency Tree

### Routes Overview
**7 Total Routes** organized by purpose:

| Route | Path | Purpose | Type | Components Used | Data Source |
|-------|------|---------|------|-----------------|-------------|
| **_index** | `/` | Homepage | SSR | 8 | Mock (RITUALS) |
| **ritual.$handle** | `/ritual/:handle` | Product detail page (PDP) | SSR+Loader | 9 | Mock (getRitualByHandle) |
| **rituals._index** | `/rituals` | Collection listing | SSR+Loader | 1 | Mock (RITUALS) |
| **warm-sunrise** | `/warm-sunrise` | Campaign landing page | SSR | 0 | None (static JSX) |
| **learn._index** | `/learn` | Educational hub | SSR | 0 | None (static JSX) |
| **cart** | `/cart` | Shopping cart page | SSR | 0 | None (TODO: cart context) |
| **account._index** | `/account` | User account page | SSR | 0 | None (stub) |

**Global Wrapper:** [app/root.tsx](app/root.tsx)
- Imports: `NeoLayout` (wraps all routes)
- Styles: `tokens.css` (design tokens)
- Layout: HTML shell, error boundary, SEO meta

---

## 2. Route → Component Dependency Chains

### Route: [_index.tsx](app/routes/_index.tsx) — Homepage
**Data Source:** `app/lib/mock-data.ts` → `RITUALS` array

```
_index.tsx (Homepage)
├─ RitualGrid ★ (product grid)
│  ├─ Ritual[]
│  └─ Child: (none, renders Link + ProductCard-like DOM)
├─ ProductCarousel ★ (bestsellers section)
│  ├─ Ritual[]
│  └─ Child: ProductCard (each item)
│     └─ Child: PriceDisplay, SaleBadge, StarRating
├─ BundleCard ★ (bundle offer)
│  ├─ BundleProduct[]
│  └─ Child: PriceDisplay, SaleBadge, CartIcon
├─ TrustBadge (UI)
├─ StarRating (UI)
├─ EmailCapture (UI form)
├─ CountdownTimer (UI timer)
└─ ExitIntentPopup (UI overlay)
```

**Data Flow:**
```
Mock Data (app/lib/mock-data.ts)
  ↓
  RITUALS array
  ↓
  _index.tsx loader (fallback) or GraphQL PRODUCTS_QUERY
  ↓
  RitualGrid, ProductCarousel (parallel rendering)
```

**Key Props:**
- `RitualGrid`: `rituals: Ritual[]`
- `ProductCarousel`: `rituals: Ritual[], title?, subtitle?, darkMode?`
- `BundleCard`: `title, tagline, products[], price`

**Notes:**
- All product imports use mock data with GraphQL fallback (see [queries.ts](app/lib/queries.ts))
- RitualGrid and ProductCarousel both accept `Ritual[]` type (unified interface)

---

### Route: [ritual.$handle.tsx](app/routes/ritual.$handle.tsx) — Product Detail Page (PDP)
**Data Source:** `getRitualByHandle(handle)` from mock-data.ts (or GraphQL query fallback)

```
ritual.$handle.tsx (PDP)
├─ StarRating (product rating)
├─ PriceDisplay (price, with currency)
├─ SaleBadge / ProductBadge (conditional)
├─ WishlistButton (save product)
├─ VariantSelector ★ (size/color picker — A11y enhanced)
│  ├─ aria-pressed, aria-disabled, role="group"
│  └─ focus:ring-2 styling
├─ DeliveryEstimate (shipping info)
├─ QuantitySelector (quantity input)
├─ FAQAccordion (collapsible FAQs)
├─ ReviewSection (customer reviews)
├─ ProductCarousel ★ (related/synergy products)
│  └─ Child: ProductCard
│     └─ Child: PriceDisplay, SaleBadge, StarRating
└─ Breadcrumb navigation (Link components, no sub-component)
```

**Data Flow:**
```
ritual.$handle.tsx loader
  ↓
  getRitualByHandle(handle) from mock-data.ts
  ↓
  Ritual object
  ↓
  Pass to VariantSelector, DeliveryEstimate, ReviewSection
  ↓
  getSynergyRituals(handle) for related products carousel
```

**Key Props:**
- `VariantSelector`: `ritual.variants, onSelect?`
- `ProductCarousel`: `rituals: Ritual[]` (synergy products)
- `FAQAccordion`: `faqs: { question, answer }[]` (from ritual.faq)
- `ReviewSection`: `reviews: { author, text, rating }[]` (from ritual.reviews)

**Notes:**
- VariantSelector is A11y-enhanced (final pass completed)
- Breadcrumb uses `Link` from Remix (color: warm-sunrise-charcoal)
- ProductCarousel is reused here (shared with homepage)

---

### Route: [rituals._index.tsx](app/routes/rituals._index.tsx) — Collection Listing
**Data Source:** `RITUALS` from mock-data.ts (all products) or GraphQL PRODUCTS_QUERY

```
rituals._index.tsx (Collection)
└─ RitualGrid ★ (product grid)
   ├─ Ritual[]
   └─ Renders: ProductCard-like DOM (Link + image + price + badge)
```

**Data Flow:**
```
Mock Data (app/lib/mock-data.ts)
  ↓
  RITUALS array
  ↓
  rituals._index.tsx loader
  ↓
  RitualGrid
```

**Key Props:**
- `RitualGrid`: `rituals: Ritual[]`

**Notes:**
- Simplest route (single component)
- Shared RitualGrid component (also used on homepage)
- No filters/sorting yet (TODO for collection refinement)

---

### Route: [warm-sunrise.tsx](app/routes/warm-sunrise.tsx) — Campaign Landing
**Data Source:** None (static JSX, no data imports)

```
warm-sunrise.tsx (Campaign page)
└─ Static JSX (navbar, hero, modals)
   └─ No imported components
```

**Notes:**
- Standalone page, no component imports
- Uses inline Warm-Sunrise design tokens
- Contains campaign-specific copy and imagery

---

### Route: [learn._index.tsx](app/routes/learn._index.tsx) — Educational Hub
**Data Source:** None (static JSX stub)

```
learn._index.tsx (Learn hub)
└─ Static JSX or TODO
```

**Notes:**
- Minimal implementation, no components yet
- Potential future home for educational content, guides

---

### Route: [cart.tsx](app/routes/cart.tsx) — Shopping Cart
**Data Source:** None (TODO: cart context)

```
cart.tsx (Shopping cart)
└─ Static JSX (empty state)
```

**Notes:**
- **Currently:** Empty state only, no CartDrawer integration
- **TODO:** Integrate with cart context or state management
- **Blocked:** Awaits Shopify cart API integration

---

### Route: [account._index.tsx](app/routes/account._index.tsx) — User Account
**Data Source:** None (stub)

**Notes:**
- **Currently:** Stub, not implemented
- **TODO:** User authentication, order history, saved items

---

## 3. Component Hierarchy & Reuse Matrix

### Component Types & Locations

**Layout Components** (app/components/layout/)
| Component | Used By Routes | Frequency | Purpose |
|-----------|---|---|---|
| **NeoLayout** ★ | ALL (app/root.tsx) | 1× global | App wrapper, header, footer, mobile bottom nav |
| **NeoNavbar** | NeoLayout | 1× | Desktop/mobile navigation bar (A11y enhanced) |
| **NeoFooter** | NeoLayout | 1× | Footer + email signup (A11y enhanced) |
| **BottomNav** | NeoLayout | 1× | Mobile bottom tab bar |
| **Header** | Legacy (may be unused) | 0-1× | Alternative header component |
| **Footer** | Legacy (may be unused) | 0-1× | Alternative footer component |
| **AnnouncementBar** | NeoLayout? | 0-1× | Promotional banner |
| **Layout** | Legacy (may be unused) | 0-1× | Alternative layout wrapper |

**Product Components** (app/components/product/)
| Component | Used By Routes | Frequency | Purpose | Data |
|-----------|---|---|---|---|
| **RitualGrid** ★ | _index, rituals._index | 2× | Product grid (6-9 cards, 3 cols) | `Ritual[]` |
| **ProductCarousel** ★ | _index, ritual.$handle | 2× | Horizontal scrollable carousel (4-5 cards) | `Ritual[]` |
| **ProductCard** | ProductCarousel | ~4-5 per route | Single product card (carousel item) | `Ritual` |
| **VariantSelector** | ritual.$handle | 1× | Size/color/option picker (A11y) | `variants[]` |
| **BundleCard** | _index | 1× | Bundle offer card (3 products) | `BundleProduct[]` |
| **DeliveryEstimate** | ritual.$handle | 1× | Shipping timeline | `handle` (query) |
| **ReviewSection** | ritual.$handle | 1× | Customer reviews grid | `reviews[]` (from Ritual) |
| **RitualCard** | Unknown | ? | Single ritual display card | `Ritual` |

**UI Components** (app/components/ui/)
| Component | Used By | Frequency | Purpose | Props |
|-----------|---------|---|---|---|
| **PriceDisplay** ★ | _index (BundleCard), ProductCard, ritual.$handle | 3+ | Formatted price + currency | `price: number, salePrice?, sale?` |
| **SaleBadge** | ProductCard, BundleCard, ritual.$handle | 3+ | "Sale" label overlay | `isNew?, isSale?, discount?` |
| **StarRating** ★ | _index (via carousel), ProductCard, ritual.$handle | 2+ | 5-star rating display | `rating: number, count?` |
| **WishlistButton** | ritual.$handle | 1× | Heart icon (save product) | `productId, onToggle?` |
| **QuantitySelector** | ritual.$handle | 1× | +/- quantity input | `value, onChange, min?, max?` |
| **FAQAccordion** | ritual.$handle | 1× | Collapsible FAQ list | `faqs: { q, a }[]` |
| **Badge** | RitualGrid?, ProductCard? | 1-2× | Generic label badge | `text, variant?, className?` |
| **CountdownTimer** | _index | 1× | Countdown display (flash sale) | `targetDate, onExpire?` |
| **EmailCapture** | _index, NeoFooter | 2× | Email signup form | `onSuccess?, placeholder?` |
| **ExitIntentPopup** | _index | 1× | Modal on exit intent | `onClose, title, message` |
| **TrustBadge** | _index | 1× | Trust signals (shipping, returns) | `variant?` |
| **Icons** | Multiple | ~8+ | Icon library (Chevron, Cart, Check, etc.) | `className?, size?` |

**Cart Components** (app/components/cart/)
| Component | Used By | Status |
|-----------|---------|--------|
| **CartDrawer** | (Not integrated yet) | Stub/TODO |

**Legend:**
- **★** = High reuse / Critical to system
- **Frequency** = Number of distinct routes that import the component
- **Frequency %** = Reuse potential across site

---

## 4. Component Reuse Patterns

### Highly Reused (High Reuse - 3+ Routes/Locations)

| Component | Routes | Count | Optimization |
|-----------|--------|-------|--------------|
| **RitualGrid** | _index, rituals._index | 2 | Core product display; unified `Ritual` interface |
| **ProductCarousel** | _index, ritual.$handle | 2 | Flexible; reuses `Ritual` type |
| **PriceDisplay** | _index, ritual.$handle, ProductCard | 3+ | Canonical price formatting (no duplication) |
| **StarRating** | _index, ritual.$handle, ProductCard | 3+ | Shared rating UI |
| **SaleBadge** | ProductCard, BundleCard, ritual.$handle | 3+ | Consistent sale badge styling |

### Medium Reuse (2 Routes/Locations)

| Component | Routes | Count |
|-----------|--------|-------|
| **EmailCapture** | _index, NeoFooter | 2 |
| **Icons** | Multiple (global) | 8+ |

### Single Use (1 Route/Location)

| Component | Route | Purpose |
|-----------|-------|---------|
| **VariantSelector** | ritual.$handle | PDP only |
| **DeliveryEstimate** | ritual.$handle | PDP only |
| **ReviewSection** | ritual.$handle | PDP only |
| **FAQAccordion** | ritual.$handle | PDP only |
| **WishlistButton** | ritual.$handle | PDP only |
| **QuantitySelector** | ritual.$handle | PDP only |
| **CountdownTimer** | _index | Homepage flash sale |
| **ExitIntentPopup** | _index | Homepage exit-intent |
| **TrustBadge** | _index | Homepage trust signals |
| **BundleCard** | _index | Homepage bundle section |

**Optimization Insight:** PDP (ritual.$handle) is most component-heavy (9 components), suggesting future modularization opportunity if bundled into sections.

---

## 5. Data Flow Diagram

### Primary Data Sources

```
┌─────────────────────────────────────┐
│   DATA SOURCES                      │
├─────────────────────────────────────┤
│ 1. Mock Data:                       │
│    app/lib/mock-data.ts             │
│    ├─ RITUALS: Ritual[]             │
│    ├─ getRitualByHandle()           │
│    └─ getSynergyRituals()           │
│                                     │
│ 2. GraphQL (Fallback):              │
│    app/lib/queries.ts               │
│    ├─ PRODUCT_QUERY                 │
│    ├─ PRODUCTS_QUERY                │
│    └─ transformShopifyProduct()     │
│        → Ritual                     │
└─────────────────────────────────────┘
         ↓
    ┌────────────────────────────────┐
    │  DATA MODEL: Ritual Interface  │
    ├────────────────────────────────┤
    │ {                              │
    │   handle: string               │
    │   title: string                │
    │   price: number                │
    │   salePrice?: number           │
    │   rating: number               │
    │   reviewCount: number          │
    │   image?: string               │
    │   ingredients: string[]        │
    │   description: string          │
    │   variants: Variant[]          │
    │   reviews: Review[]            │
    │   faq: FAQ[]                   │
    │   synergy?: string[]           │
    │ }                              │
    └────────────────────────────────┘
         ↓
    ┌────────────────────────────────┐
    │ ROUTE LOADERS                  │
    ├────────────────────────────────┤
    │ _index:                        │
    │   → RITUALS[]                  │
    │                                │
    │ ritual.$handle:                │
    │   → getRitualByHandle()        │
    │   → getSynergyRituals()        │
    │                                │
    │ rituals._index:                │
    │   → RITUALS[]                  │
    └────────────────────────────────┘
         ↓
    ┌────────────────────────────────┐
    │ COMPONENT CONSUMERS            │
    ├────────────────────────────────┤
    │ Homepage (_index):             │
    │   RitualGrid(RITUALS)          │
    │   ProductCarousel(RITUALS)     │
    │   BundleCard(manual data)      │
    │                                │
    │ PDP (ritual.$handle):          │
    │   VariantSelector(variants)    │
    │   ReviewSection(reviews)       │
    │   ProductCarousel(synergy)     │
    │                                │
    │ Collection (rituals._index):   │
    │   RitualGrid(RITUALS)          │
    └────────────────────────────────┘
```

### Data Flow for Each Route

**Homepage (_index.tsx):**
```
Mock: RITUALS[]
  ├→ RitualGrid (display grid)
  ├→ ProductCarousel (bestsellers carousel)
  └→ BundleCard (hardcoded bundle data)
```

**PDP (ritual.$handle.tsx):**
```
Mock: getRitualByHandle(handle)
  ├→ VariantSelector (ritual.variants)
  ├→ DeliveryEstimate (ritual.handle)
  ├→ ReviewSection (ritual.reviews)
  ├→ FAQAccordion (ritual.faq)
  ├→ StarRating (ritual.rating)
  ├→ PriceDisplay (ritual.price)
  └→ ProductCarousel (getSynergyRituals())
```

**Collection (rituals._index.tsx):**
```
Mock: RITUALS[]
  └→ RitualGrid (display grid)
```

---

## 6. A11y & Component Status

### A11y-Enhanced Components (Final Pass ✅)

| Component | WCAG 2.1 AA | Features | Date |
|-----------|---|---|---|
| **NeoNavbar** | ✅ | aria-label, aria-expanded, focus:ring-2 on toggle | Final |
| **NeoFooter** | ✅ | `<label htmlFor>`, focus:ring-2 on email input | Final |
| **VariantSelector** | ✅ | aria-pressed, aria-disabled, role="group", focus:ring-2 | Final |

### Components Needing A11y Audit (Next Phase)

| Component | Potential Gap | Action |
|-----------|---|---|
| **RitualGrid** | Image alt text | Add alt props to img tags |
| **ProductCarousel** | Carousel arrows keyboard nav | Add keyboard handlers |
| **FAQAccordion** | Expand/collapse aria | Add aria-expanded |
| **ReviewSection** | Form inputs (if reviewable) | Add labels, focus ring |
| **QuantitySelector** | Keyboard input validation | Ensure +/- buttons have aria-label |
| **WishlistButton** | Toggle state accessibility | Add aria-pressed |

---

## 7. Design System (Warm-Sunrise) — Component Palette

### Colors Used in Components (Locked ✅)

| Element | Color Token | Hex Value | Components |
|---------|---|---|---|
| Primary buttons | `warm-sunrise-lime` | #BFFF00 | BundleCard CTA, CountdownTimer |
| Text/Borders | `warm-sunrise-charcoal` | #2D2926 | All text, RitualGrid borders |
| Backgrounds | `warm-sunrise-offwhite` | #F8F8F5 | RitualGrid bg, ProductCarousel bg |
| Accents/Discounts | `warm-sunrise-orange` | #FF6B35 | SaleBadge, VariantSelector hover |
| Shadows | `shadow-neo` (4px offset) | var(--shadow-neo) | RitualGrid cards, modals |

**Migration Status:** ✅ All routes + components fully migrated from legacy `brand-navy`, `brand-cream`, `sale-red` to Warm-Sunrise palette.

---

## 8. Dependency Map — Summary Table

### Complete Route→Component Matrix

```
Route                    Direct Children          Via Carousel            UI/Layout    Data
───────────────────────────────────────────────────────────────────────────────────────────
_index (Homepage)        RitualGrid               ProductCarousel          8 UI         RITUALS
                         BundleCard              (ProductCard × 4-5)       components   
                                                                                        
ritual.$handle (PDP)     VariantSelector          ProductCarousel          6 UI         getRitual
                         DeliveryEstimate        (ProductCard × 4-5)       components   getSynergy
                         ReviewSection                                     
                         FAQAccordion                                       
                                                                                        
rituals._index (Coll.)   RitualGrid               None                      1 layout     RITUALS
                                                                                        
warm-sunrise             None (static JSX)        None                      None         None
───────────────────────────────────────────────────────────────────────────────────────────
cart                     None (TODO)              None                      None         None (TODO)
learn                    None (static)            None                      None         None
account                  None (stub)              None                      None         None
```

---

## 9. Refactoring Guidance — Using This Map

### For Feature Additions

**"Add wishlist persistence to all products"**
- Modify: `WishlistButton` (single point)
- Impact: 1 component affects PDP only (low-risk)
- Reuse: If needed elsewhere, add to ProductCard → affects RitualGrid + ProductCarousel

**"Add product filters to collection"**
- Modify: `rituals._index.tsx` (route) → add filter state
- Add new component: `ProductFilters`
- Impact: Isolated to collection page (low-risk)

**"Update product card layout"**
- Modify: `ProductCard` (single point)
- Impact: Affects ProductCarousel on _index + ritual.$handle (2 routes, high-visibility)
- Reuse pattern: Use RitualGrid if grid layout changes needed

### For Bug Fixes

**"Fix PriceDisplay formatting bug"**
- Modify: `PriceDisplay` (single point)
- Affected routes: _index (BundleCard, ProductCarousel), ritual.$handle (main + carousel) = 2 routes
- Risk: Medium (but isolated to one component)

**"Fix RitualGrid mobile layout"**
- Modify: `RitualGrid` (single point)
- Affected routes: _index, rituals._index = 2 routes
- Risk: Medium (affects major user flow)

### For Data Model Changes

**"Add `ingredients` metadata to all products"**
- Modify: `Ritual` interface in [app/lib/mock-data.ts](app/lib/mock-data.ts)
- Add to RITUALS array
- Update components consuming ingredients: None currently (future expansion)
- Risk: Low (no components consume yet)

**"Change price from `number` to `{ usd: number, eur: number }`"**
- Modify: `Ritual` interface
- Update: `transformShopifyProduct()` in [app/lib/queries.ts](app/lib/queries.ts)
- Update: `PriceDisplay` (render logic)
- Affected routes: _index, ritual.$handle, rituals._index (indirect via components)
- Risk: **High** (cascading change across 3+ components)

---

## 10. Migration Checklist — Next Phase

Use this map for upcoming tasks:

- [ ] **Filters on collection:** Add `ProductFilters` component to `rituals._index.tsx`
- [ ] **Cart integration:** Replace stub `cart.tsx` with `CartDrawer` + context
- [ ] **A11y audit:** Implement audit for RitualGrid, ProductCarousel, FAQAccordion, QuantitySelector
- [ ] **Image optimization:** Add `loading="lazy"`, optimize alt text across RitualGrid + ProductCarousel
- [ ] **GraphQL hookup:** Replace mock data fallback with live Shopify API in `ritual.$handle.tsx` loader
- [ ] **Reviews submission:** Add form to `ReviewSection` if user-generated content planned
- [ ] **Account page:** Build out `account._index.tsx` with order history
- [ ] **Learn hub:** Populate `learn._index.tsx` with educational content

---

## Appendix: File Manifest

**Data & Config**
- [app/lib/mock-data.ts](app/lib/mock-data.ts) — Canonical `Ritual` interface + RITUALS array
- [app/lib/queries.ts](app/lib/queries.ts) — GraphQL queries + `transformShopifyProduct()` (Ritual)
- [app/styles/tokens.css](app/styles/tokens.css) — Design tokens (Warm-Sunrise locked)
- [tailwind.config.ts](tailwind.config.ts) — Tailwind theme (warm-sunrise palette)

**Routes (7 files)**
- [app/routes/_index.tsx](app/routes/_index.tsx) — Homepage
- [app/routes/ritual.$handle.tsx](app/routes/ritual.$handle.tsx) — PDP
- [app/routes/rituals._index.tsx](app/routes/rituals._index.tsx) — Collection
- [app/routes/warm-sunrise.tsx](app/routes/warm-sunrise.tsx) — Campaign
- [app/routes/learn._index.tsx](app/routes/learn._index.tsx) — Learn hub
- [app/routes/cart.tsx](app/routes/cart.tsx) — Cart (stub)
- [app/routes/account._index.tsx](app/routes/account._index.tsx) — Account (stub)

**Components (29 files)**
- Layout: NeoLayout, NeoNavbar, NeoFooter, BottomNav, Header, Footer, AnnouncementBar, Layout
- Product: RitualGrid, ProductCarousel, ProductCard, VariantSelector, BundleCard, DeliveryEstimate, ReviewSection, RitualCard
- UI: PriceDisplay, SaleBadge, StarRating, WishlistButton, QuantitySelector, FAQAccordion, Badge, CountdownTimer, EmailCapture, ExitIntentPopup, TrustBadge, Icons
- Cart: CartDrawer

**Layout Wrapper**
- [app/root.tsx](app/root.tsx) — Global app shell (NeoLayout integration, error boundary, meta)

---

**End of Component Dependency Map**

For questions about component interactions or data flow, refer to specific sections above or query the referenced file paths directly.
