# Jay Life Critical Gaps Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a production-ready Jay Life storefront by closing 5 critical gaps: Marketing Assets, Design System, Shopify Integration, Cart/Checkout, and Authentication.

**Architecture:** Brand-First approach — lock visual identity before code changes. Each phase deploys independently, enabling incremental value delivery and easy rollback.

**Tech Stack:** Shopify Hydrogen (Remix), Storefront API (GraphQL), Tailwind CSS, Framer Motion, Shopify Oxygen hosting.

---

## Phase 1: Marketing Assets

**Goal:** Replace all placeholder images with production-ready assets and create responsive image infrastructure.

### Task 1.1: Complete Asset Manifest

**Files:**
- Modify: `docs/ASSET_MANIFEST_TEMPLATE.json`

**Step 1: Read the current manifest**

Run: `cat docs/ASSET_MANIFEST_TEMPLATE.json`
Expected: Current manifest with only focus and calm products

**Step 2: Add missing products to manifest**

```json
{
  "site": {
    "hero": {
      "desktop": "hero-desktop.avif",
      "mobile": "hero-mobile.avif",
      "alt": "Jay Life supplement bottles arranged on warm sunrise background",
      "caption": "Upgrade your daily ritual",
      "sale_end_iso": "2026-02-28T23:59:00Z"
    },
    "og": {
      "home": "og-home.png"
    }
  },
  "products": {
    "focus": {
      "title": "FOCUS",
      "images": ["product_focus-400.avif", "product_focus-800.avif", "product_focus-1600.avif"],
      "alt": "FOCUS - Stay sharp. No jitters.",
      "lab_report": "lab_focus.pdf",
      "price": 27,
      "compareAtPrice": 34
    },
    "calm": {
      "title": "CALM",
      "images": ["product_calm-400.avif", "product_calm-800.avif", "product_calm-1600.avif"],
      "alt": "CALM - Find your calm.",
      "lab_report": "lab_calm.pdf",
      "price": 24,
      "compareAtPrice": 29
    },
    "gut": {
      "title": "GUT",
      "images": ["product_gut-400.avif", "product_gut-800.avif", "product_gut-1600.avif"],
      "alt": "GUT - Healthy digestion from within.",
      "lab_report": "lab_gut.pdf",
      "price": 32,
      "compareAtPrice": null
    },
    "glow": {
      "title": "GLOW",
      "images": ["product_glow-400.avif", "product_glow-800.avif", "product_glow-1600.avif"],
      "alt": "GLOW - Radiance from within.",
      "lab_report": "lab_glow.pdf",
      "price": 29,
      "compareAtPrice": 36
    },
    "move": {
      "title": "MOVE",
      "images": ["product_move-400.avif", "product_move-800.avif", "product_move-1600.avif"],
      "alt": "MOVE - Perform better. Recover faster.",
      "lab_report": "lab_move.pdf",
      "price": 32,
      "compareAtPrice": 38
    }
  },
  "testimonials": [
    {
      "slug": "alex-m",
      "quote": "Finally a focus supplement that actually works without making me feel wired.",
      "author": "Alex M.",
      "role": "Software Engineer",
      "avatar": "testimonial_alex-48.avif",
      "release_confirmed": false
    },
    {
      "slug": "sarah-k",
      "quote": "I've tried dozens of nootropics. This is the first that delivers without the crash.",
      "author": "Sarah K.",
      "role": "Marketing Manager",
      "avatar": "testimonial_sarah-48.avif",
      "release_confirmed": false
    }
  ],
  "logos": {
    "logo": "logo.svg",
    "trust_lab": "trust-lab.svg",
    "badge_30day": "badge-30day.svg"
  }
}
```

**Step 3: Commit**

```bash
git add docs/ASSET_MANIFEST_TEMPLATE.json
git commit -m "feat(assets): complete manifest for all 5 products"
```

---

### Task 1.2: Create Responsive Image Component

**Files:**
- Create: `app/components/ui/ResponsiveImage.tsx`
- Test: Manual visual test

**Step 1: Create the ResponsiveImage component**

```tsx
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

/**
 * Responsive image component with AVIF/WebP/JPG fallback chain.
 * Expects images at /images/ with -400, -800, -1600 suffixes.
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1600px',
  className = '',
  loading = 'lazy',
  priority = false,
}: ResponsiveImageProps) {
  // Extract base path without extension
  const basePath = src.replace(/\.(avif|webp|jpg|jpeg|png)$/, '');
  const hasResponsiveSizes = !src.includes('unsplash') && !src.startsWith('http');

  if (!hasResponsiveSizes) {
    // External URL or placeholder - use as-is
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
      />
    );
  }

  return (
    <picture>
      {/* AVIF - best compression */}
      <source
        type="image/avif"
        srcSet={`${basePath}-400.avif 400w, ${basePath}-800.avif 800w, ${basePath}-1600.avif 1600w`}
        sizes={sizes}
      />
      {/* WebP - good fallback */}
      <source
        type="image/webp"
        srcSet={`${basePath}-400.webp 400w, ${basePath}-800.webp 800w, ${basePath}-1600.webp 1600w`}
        sizes={sizes}
      />
      {/* JPG - universal fallback */}
      <img
        src={`${basePath}-800.jpg`}
        srcSet={`${basePath}-400.jpg 400w, ${basePath}-800.jpg 800w, ${basePath}-1600.jpg 1600w`}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
      />
    </picture>
  );
}
```

**Step 2: Verify file created**

Run: `cat app/components/ui/ResponsiveImage.tsx | head -20`
Expected: Component code visible

**Step 3: Commit**

```bash
git add app/components/ui/ResponsiveImage.tsx
git commit -m "feat(ui): add ResponsiveImage component with AVIF/WebP fallback"
```

---

### Task 1.3: Create Public Images Folder Structure

**Files:**
- Create: `public/images/products/` folder structure
- Create: `public/images/placeholder.jpg`

**Step 1: Create folder structure**

```bash
mkdir -p public/images/products/focus
mkdir -p public/images/products/calm
mkdir -p public/images/products/gut
mkdir -p public/images/products/glow
mkdir -p public/images/products/move
mkdir -p public/images/testimonials
mkdir -p public/images/hero
mkdir -p public/images/og
mkdir -p public/images/logos
```

**Step 2: Create placeholder README in each folder**

```bash
echo "Place product images here: product_focus-400.avif, product_focus-800.avif, product_focus-1600.avif" > public/images/products/focus/README.txt
```

**Step 3: Commit**

```bash
git add public/images/
git commit -m "feat(assets): create public/images folder structure"
```

---

### Task 1.4: Create Asset Checklist for Design Team

**Files:**
- Create: `docs/ASSET_CHECKLIST.md`

**Step 1: Create checklist document**

```markdown
# Asset Checklist for Design/Photo Team

## Required Before Launch

### Hero Images
- [ ] `hero-desktop.avif` (1600w, 16:9 aspect)
- [ ] `hero-desktop.webp` (fallback)
- [ ] `hero-desktop.jpg` (fallback)
- [ ] `hero-mobile.avif` (800w, 4:5 aspect)
- [ ] `hero-mobile.webp` (fallback)
- [ ] `hero-mobile.jpg` (fallback)

### Product Images (per SKU: focus, calm, gut, glow, move)
For each product, provide:
- [ ] `product_<handle>-400.avif` (400w, 1:1 square)
- [ ] `product_<handle>-800.avif` (800w, 1:1 square)
- [ ] `product_<handle>-1600.avif` (1600w, 1:1 square)
- [ ] Same in .webp and .jpg formats

### Lab Reports
- [ ] `lab_focus.pdf`
- [ ] `lab_calm.pdf`
- [ ] `lab_gut.pdf`
- [ ] `lab_glow.pdf`
- [ ] `lab_move.pdf`

### OG Images
- [ ] `og-home.png` (1200x630)
- [ ] `og-product-focus.png` (1200x630)
- [ ] `og-product-calm.png` (1200x630)
- [ ] `og-product-gut.png` (1200x630)
- [ ] `og-product-glow.png` (1200x630)
- [ ] `og-product-move.png` (1200x630)

### Logos & Badges
- [ ] `logo.svg`
- [ ] `trust-lab.svg`
- [ ] `badge-30day.svg`
- [ ] `favicon.ico` (32x32)
- [ ] `favicon-192.png` (192x192)

### Testimonial Avatars (if real photos)
- [ ] `testimonial_<slug>-48.avif`
- [ ] `testimonial_<slug>-96.avif`
- [ ] Release confirmation signed

## Delivery Instructions
1. Place files in `public/images/` matching folder structure
2. Update `docs/ASSET_MANIFEST_TEMPLATE.json` with final filenames
3. Run `npm run build` to verify no broken image references
```

**Step 2: Commit**

```bash
git add docs/ASSET_CHECKLIST.md
git commit -m "docs(assets): add asset checklist for design team"
```

---

### Task 1.5: Deploy Phase 1

**Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No errors (or warnings only)

**Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Tag release**

```bash
git tag v0.1.0-assets
git push origin main --tags
```

---

## Phase 2: Design System Merge

**Goal:** Unify the dual color systems (Electric-Lime vs Warm-Sunrise) into a single consistent palette.

### Task 2.1: Audit Current Color Usage

**Files:**
- Read: `app/styles/tokens.css`
- Read: `tailwind.config.ts`

**Step 1: Document color discrepancies**

Current state (from exploration):
- `tokens.css` already maps to Warm-Sunrise via CSS variables
- `tailwind.config.ts` defines Warm-Sunrise palette directly
- Legacy aliases exist (`brand-navy`, `brand-sage`) mapped to new values

**Step 2: Identify components using legacy colors**

Run: `grep -r "brand-navy\|brand-sage\|#1A2E3B" app/`
Expected: List of files using legacy colors (should be minimal)

---

### Task 2.2: Remove Legacy Color References

**Files:**
- Modify: Any files using `brand-navy`, `brand-sage`, or hardcoded legacy hex values

**Step 1: Search and replace legacy colors**

For each file found in audit:
- Replace `brand-navy` with `charcoal` or `warm-sunrise-charcoal`
- Replace `brand-sage` with `acid` or `warm-sunrise-lime`
- Replace `#1A2E3B` with `#2D2926` (Warm-Sunrise charcoal)

**Step 2: Verify no hardcoded legacy colors remain**

Run: `grep -r "#1A2E3B\|#68809A" app/`
Expected: No results

**Step 3: Commit**

```bash
git add -A
git commit -m "fix(design): remove legacy color references"
```

---

### Task 2.3: Delete Unused Legacy Components

**Files:**
- Delete: `app/components/layout/Layout.tsx`
- Delete: `app/components/layout/Header.tsx`
- Delete: `app/components/layout/Footer.tsx`
- Delete: `app/components/layout/BottomNav.tsx`
- Delete: `app/components/layout/AnnouncementBar.tsx`

**Step 1: Verify these components are not imported**

Run: `grep -r "from '~/components/layout/Layout'\|from '~/components/layout/Header'\|from '~/components/layout/Footer'\|from '~/components/layout/BottomNav'\|from '~/components/layout/AnnouncementBar'" app/`
Expected: No results (only Neo* components should be in use)

**Step 2: Delete legacy components**

```bash
rm app/components/layout/Layout.tsx
rm app/components/layout/Header.tsx
rm app/components/layout/Footer.tsx
rm app/components/layout/BottomNav.tsx
rm app/components/layout/AnnouncementBar.tsx
```

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor(layout): remove unused legacy layout components"
```

---

### Task 2.4: Simplify tokens.css

**Files:**
- Modify: `app/styles/tokens.css`

**Step 1: Remove deprecated aliases**

Remove these lines from tokens.css:
```css
/* Remove these deprecated aliases */
--brand-sage: #8b9b7a; /* Deprecated, use --warm-sunrise-* */
```

**Step 2: Add comment clarifying single source of truth**

Add at top of :root:
```css
/*
 * SINGLE SOURCE OF TRUTH: Warm-Sunrise Palette
 * All colors derive from --warm-sunrise-* variables
 * Do not add new color systems - extend Warm-Sunrise only
 */
```

**Step 3: Commit**

```bash
git add app/styles/tokens.css
git commit -m "fix(tokens): clarify warm-sunrise as single color source"
```

---

### Task 2.5: Visual Consistency Check

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Manual visual audit**

Check these routes for consistent colors:
- `/` (Homepage)
- `/rituals` (Collection page)
- `/ritual/focus` (PDP)
- `/cart` (Cart page)
- `/account` (Account page)

**Step 3: Document any remaining inconsistencies**

If found, create tasks to fix specific components.

---

### Task 2.6: Deploy Phase 2

**Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Tag release**

```bash
git tag v0.2.0-design
git push origin main --tags
```

---

## Phase 3: Shopify Integration

**Goal:** Connect the storefront to real Shopify product data via Storefront API.

### Task 3.1: Create Shopify Client

**Files:**
- Create: `app/lib/shopify.server.ts`

**Step 1: Create the Shopify client module**

```typescript
/**
 * Shopify Storefront API client
 * Server-only module for making authenticated API requests
 */

const SHOPIFY_STOREFRONT_API_URL = process.env.PUBLIC_STOREFRONT_API_URL!;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN!;

interface StorefrontResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json: StorefrontResponse<T> = await response.json();

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  return json.data;
}
```

**Step 2: Commit**

```bash
git add app/lib/shopify.server.ts
git commit -m "feat(shopify): add Storefront API client"
```

---

### Task 3.2: Create Environment Variables Template

**Files:**
- Create: `.env.example`
- Modify: `.gitignore` (ensure .env is ignored)

**Step 1: Create .env.example**

```bash
# Shopify Storefront API
PUBLIC_STOREFRONT_API_URL=https://your-store.myshopify.com/api/2024-01/graphql.json
PUBLIC_STOREFRONT_API_TOKEN=your-storefront-access-token

# Optional: Shopify Admin API (for customer operations)
SHOPIFY_ADMIN_API_URL=https://your-store.myshopify.com/admin/api/2024-01/graphql.json
SHOPIFY_ADMIN_ACCESS_TOKEN=your-admin-access-token
```

**Step 2: Verify .gitignore includes .env**

Run: `grep "^\.env$" .gitignore`
Expected: `.env` found

**Step 3: Commit**

```bash
git add .env.example
git commit -m "docs(env): add environment variables template"
```

---

### Task 3.3: Enhance Product Queries

**Files:**
- Modify: `app/lib/queries.ts`

**Step 1: Add collection query**

```typescript
/**
 * Query to fetch a collection by handle with products
 */
export const COLLECTION_QUERY = `#graphql
  ${PRODUCT_METAFIELDS_FRAGMENT}
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          variants(first: 10) {
            nodes {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
          ...ProductMetafields
        }
      }
    }
  }
`;

/**
 * Query to fetch single product with full details
 */
export const PRODUCT_DETAIL_QUERY = `#graphql
  ${PRODUCT_METAFIELDS_FRAGMENT}
  query GetProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      ...ProductMetafields
    }
  }
`;
```

**Step 2: Commit**

```bash
git add app/lib/queries.ts
git commit -m "feat(queries): add collection and product detail queries"
```

---

### Task 3.4: Update Rituals Route with Loader

**Files:**
- Modify: `app/routes/rituals._index.tsx`

**Step 1: Add loader function**

```typescript
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { storefront } from '~/lib/shopify.server';
import { COLLECTION_QUERY, transformShopifyProduct } from '~/lib/queries';
import { RITUALS } from '~/lib/mock-data';

export async function loader({ request }: LoaderFunctionArgs) {
  // Try to fetch from Shopify, fall back to mock data
  try {
    const data = await storefront<{ collection: any }>(COLLECTION_QUERY, {
      handle: 'rituals',
      first: 20,
    });

    if (data.collection?.products?.nodes) {
      const products = data.collection.products.nodes.map(transformShopifyProduct);
      return json({ products, source: 'shopify' });
    }
  } catch (error) {
    console.error('Failed to fetch from Shopify, using mock data:', error);
  }

  // Fallback to mock data
  return json({ products: RITUALS, source: 'mock' });
}

export default function RitualsPage() {
  const { products, source } = useLoaderData<typeof loader>();

  // ... rest of component using products
}
```

**Step 2: Commit**

```bash
git add app/routes/rituals._index.tsx
git commit -m "feat(rituals): add Shopify loader with mock fallback"
```

---

### Task 3.5: Update Product Detail Route with Loader

**Files:**
- Modify: `app/routes/ritual.$handle.tsx`

**Step 1: Add loader function**

```typescript
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { storefront } from '~/lib/shopify.server';
import { PRODUCT_DETAIL_QUERY, transformShopifyProduct } from '~/lib/queries';
import { getRitualByHandle } from '~/lib/mock-data';

export async function loader({ params }: LoaderFunctionArgs) {
  const { handle } = params;

  if (!handle) {
    throw new Response('Product not found', { status: 404 });
  }

  // Try Shopify first
  try {
    const data = await storefront<{ product: any }>(PRODUCT_DETAIL_QUERY, {
      handle,
    });

    if (data.product) {
      return json({ product: transformShopifyProduct(data.product), source: 'shopify' });
    }
  } catch (error) {
    console.error('Failed to fetch from Shopify:', error);
  }

  // Fallback to mock data
  const product = getRitualByHandle(handle);
  if (!product) {
    throw new Response('Product not found', { status: 404 });
  }

  return json({ product, source: 'mock' });
}
```

**Step 2: Commit**

```bash
git add app/routes/ritual.$handle.tsx
git commit -m "feat(pdp): add Shopify loader with mock fallback"
```

---

### Task 3.6: Deploy Phase 3

**Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Set environment variables in Oxygen**

```bash
shopify hydrogen env set PUBLIC_STOREFRONT_API_URL "https://jaylife.myshopify.com/api/2024-01/graphql.json"
shopify hydrogen env set PUBLIC_STOREFRONT_API_TOKEN "your-token-here"
```

**Step 4: Deploy**

```bash
shopify hydrogen deploy
```

**Step 5: Tag release**

```bash
git tag v0.3.0-shopify
git push origin main --tags
```

---

## Phase 4: Cart/Checkout

**Goal:** Build functional cart state management and integrate Shopify checkout.

### Task 4.1: Create Cart Context

**Files:**
- Create: `app/lib/cart-context.tsx`

**Step 1: Create cart context with Shopify integration**

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useFetcher } from '@remix-run/react';

interface CartLine {
  id: string;
  merchandiseId: string;
  quantity: number;
  title: string;
  price: number;
  image?: string;
  handle: string;
}

interface CartState {
  id: string | null;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: number;
  checkoutUrl: string | null;
  loading: boolean;
}

interface CartContextValue extends CartState {
  addItem: (merchandiseId: string, quantity?: number) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = 'jaylife_cart_id';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    id: null,
    lines: [],
    totalQuantity: 0,
    subtotal: 0,
    checkoutUrl: null,
    loading: false,
  });

  const fetcher = useFetcher();

  // Load cart ID from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      // Fetch existing cart
      fetcher.load(`/api/cart?cartId=${savedCartId}`);
    }
  }, []);

  // Handle fetcher responses
  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as any;
      if (data.cart) {
        setCart({
          id: data.cart.id,
          lines: data.cart.lines || [],
          totalQuantity: data.cart.totalQuantity || 0,
          subtotal: data.cart.subtotal || 0,
          checkoutUrl: data.cart.checkoutUrl || null,
          loading: false,
        });
        localStorage.setItem(CART_ID_KEY, data.cart.id);
      }
    }
  }, [fetcher.data]);

  const addItem = (merchandiseId: string, quantity = 1) => {
    setCart((prev) => ({ ...prev, loading: true }));
    fetcher.submit(
      { action: 'add', merchandiseId, quantity: String(quantity), cartId: cart.id || '' },
      { method: 'post', action: '/api/cart' }
    );

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const updateItem = (lineId: string, quantity: number) => {
    setCart((prev) => ({ ...prev, loading: true }));
    fetcher.submit(
      { action: 'update', lineId, quantity: String(quantity), cartId: cart.id || '' },
      { method: 'post', action: '/api/cart' }
    );
  };

  const removeItem = (lineId: string) => {
    setCart((prev) => ({ ...prev, loading: true }));
    fetcher.submit(
      { action: 'remove', lineId, cartId: cart.id || '' },
      { method: 'post', action: '/api/cart' }
    );
  };

  const clearCart = () => {
    localStorage.removeItem(CART_ID_KEY);
    setCart({
      id: null,
      lines: [],
      totalQuantity: 0,
      subtotal: 0,
      checkoutUrl: null,
      loading: false,
    });
  };

  return (
    <CartContext.Provider value={{ ...cart, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

**Step 2: Commit**

```bash
git add app/lib/cart-context.tsx
git commit -m "feat(cart): add cart context with Shopify integration"
```

---

### Task 4.2: Create Cart API Route

**Files:**
- Create: `app/routes/api.cart.tsx`

**Step 1: Create cart API route**

```typescript
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { storefront } from '~/lib/shopify.server';

const CART_CREATE = `#graphql
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                  title
                  featuredImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                  title
                  featuredImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE = `#graphql
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                  title
                  featuredImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE = `#graphql
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                  title
                  featuredImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = `#graphql
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
              }
              product {
                handle
                title
                featuredImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

function transformCart(shopifyCart: any) {
  if (!shopifyCart) return null;

  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: parseFloat(shopifyCart.cost?.subtotalAmount?.amount || '0'),
    lines: shopifyCart.lines?.nodes?.map((line: any) => ({
      id: line.id,
      merchandiseId: line.merchandise.id,
      quantity: line.quantity,
      title: line.merchandise.product.title,
      variantTitle: line.merchandise.title,
      price: parseFloat(line.merchandise.price.amount),
      image: line.merchandise.product.featuredImage?.url,
      handle: line.merchandise.product.handle,
    })) || [],
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const cartId = url.searchParams.get('cartId');

  if (!cartId) {
    return json({ cart: null });
  }

  try {
    const data = await storefront<{ cart: any }>(CART_QUERY, { cartId });
    return json({ cart: transformCart(data.cart) });
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return json({ cart: null });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action') as string;
  const cartId = formData.get('cartId') as string;

  try {
    let result: any;

    switch (action) {
      case 'add': {
        const merchandiseId = formData.get('merchandiseId') as string;
        const quantity = parseInt(formData.get('quantity') as string, 10);

        if (cartId) {
          // Add to existing cart
          result = await storefront(CART_LINES_ADD, {
            cartId,
            lines: [{ merchandiseId, quantity }],
          });
          return json({ cart: transformCart(result.cartLinesAdd.cart) });
        } else {
          // Create new cart
          result = await storefront(CART_CREATE, {
            input: {
              lines: [{ merchandiseId, quantity }],
            },
          });
          return json({ cart: transformCart(result.cartCreate.cart) });
        }
      }

      case 'update': {
        const lineId = formData.get('lineId') as string;
        const quantity = parseInt(formData.get('quantity') as string, 10);

        result = await storefront(CART_LINES_UPDATE, {
          cartId,
          lines: [{ id: lineId, quantity }],
        });
        return json({ cart: transformCart(result.cartLinesUpdate.cart) });
      }

      case 'remove': {
        const lineId = formData.get('lineId') as string;

        result = await storefront(CART_LINES_REMOVE, {
          cartId,
          lineIds: [lineId],
        });
        return json({ cart: transformCart(result.cartLinesRemove.cart) });
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Cart action failed:', error);
    return json({ error: 'Cart operation failed' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add app/routes/api.cart.tsx
git commit -m "feat(cart): add cart API route with Shopify mutations"
```

---

### Task 4.3: Wrap App with Cart Provider

**Files:**
- Modify: `app/root.tsx`

**Step 1: Import and add CartProvider**

```typescript
import { CartProvider } from '~/lib/cart-context';

// In the App component, wrap children with CartProvider:
export default function App() {
  return (
    <html>
      <head>...</head>
      <body>
        <CartProvider>
          {/* existing content */}
          <Outlet />
        </CartProvider>
      </body>
    </html>
  );
}
```

**Step 2: Commit**

```bash
git add app/root.tsx
git commit -m "feat(cart): wrap app with CartProvider"
```

---

### Task 4.4: Update CartDrawer to Use Cart Context

**Files:**
- Modify: `app/components/cart/CartDrawer.tsx`

**Step 1: Refactor CartDrawer to use useCart hook**

Update the component to use `useCart()` instead of props for cart state.

**Step 2: Update checkout button to use checkoutUrl**

```typescript
{cart.checkoutUrl && (
  <a
    href={cart.checkoutUrl}
    className="btn-primary btn-full btn-primary-lg"
  >
    Checkout · ${cart.subtotal.toFixed(2)}
  </a>
)}
```

**Step 3: Commit**

```bash
git add app/components/cart/CartDrawer.tsx
git commit -m "feat(cart): integrate CartDrawer with cart context"
```

---

### Task 4.5: Add Add-to-Cart Button to PDP

**Files:**
- Modify: `app/routes/ritual.$handle.tsx`

**Step 1: Import useCart and add button handler**

```typescript
import { useCart } from '~/lib/cart-context';

// In component:
const { addItem, loading } = useCart();
const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);

const handleAddToCart = () => {
  if (selectedVariant) {
    addItem(selectedVariant.id, 1);
  }
};
```

**Step 2: Commit**

```bash
git add app/routes/ritual.$handle.tsx
git commit -m "feat(pdp): add working add-to-cart button"
```

---

### Task 4.6: Deploy Phase 4

**Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Test cart flow manually**

1. Go to `/ritual/focus`
2. Click "Add to Cart"
3. Verify cart drawer opens with item
4. Click "Checkout"
5. Verify redirect to Shopify checkout

**Step 4: Tag release**

```bash
git tag v0.4.0-cart
git push origin main --tags
```

---

## Phase 5: Authentication

**Goal:** Implement customer login, registration, and account functionality.

### Task 5.1: Create Auth Context

**Files:**
- Create: `app/lib/auth-context.tsx`

**Step 1: Create auth context**

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useFetcher } from '@remix-run/react';

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextValue {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, firstName?: string, lastName?: string) => void;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'jaylife_customer_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher();

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      fetcher.load(`/api/auth?action=verify&token=${token}`);
    } else {
      setLoading(false);
    }
  }, []);

  // Handle fetcher responses
  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as any;
      setLoading(false);

      if (data.customer) {
        setCustomer(data.customer);
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
        }
        setError(null);
      } else if (data.error) {
        setError(data.error);
        setCustomer(null);
      }
    }
  }, [fetcher.data]);

  const login = (email: string, password: string) => {
    setLoading(true);
    setError(null);
    fetcher.submit(
      { action: 'login', email, password },
      { method: 'post', action: '/api/auth' }
    );
  };

  const register = (email: string, password: string, firstName?: string, lastName?: string) => {
    setLoading(true);
    setError(null);
    fetcher.submit(
      { action: 'register', email, password, firstName: firstName || '', lastName: lastName || '' },
      { method: 'post', action: '/api/auth' }
    );
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

**Step 2: Commit**

```bash
git add app/lib/auth-context.tsx
git commit -m "feat(auth): add auth context"
```

---

### Task 5.2: Create Auth API Route

**Files:**
- Create: `app/routes/api.auth.tsx`

**Step 1: Create auth API route with Shopify Customer API**

```typescript
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { storefront } from '~/lib/shopify.server';

const CUSTOMER_CREATE = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `#graphql
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_QUERY = `#graphql
  query Customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      orders(first: 10) {
        nodes {
          id
          orderNumber
          totalPrice {
            amount
            currencyCode
          }
          processedAt
        }
      }
    }
  }
`;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const token = url.searchParams.get('token');

  if (action === 'verify' && token) {
    try {
      const data = await storefront<{ customer: any }>(CUSTOMER_QUERY, {
        customerAccessToken: token,
      });

      if (data.customer) {
        return json({
          customer: {
            id: data.customer.id,
            email: data.customer.email,
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
          },
        });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }

  return json({ customer: null });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action') as string;

  try {
    switch (action) {
      case 'login': {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const tokenResult = await storefront<{ customerAccessTokenCreate: any }>(
          CUSTOMER_ACCESS_TOKEN_CREATE,
          { input: { email, password } }
        );

        const errors = tokenResult.customerAccessTokenCreate.customerUserErrors;
        if (errors?.length > 0) {
          return json({ error: errors[0].message }, { status: 400 });
        }

        const token = tokenResult.customerAccessTokenCreate.customerAccessToken.accessToken;

        // Fetch customer data
        const customerResult = await storefront<{ customer: any }>(CUSTOMER_QUERY, {
          customerAccessToken: token,
        });

        return json({
          customer: {
            id: customerResult.customer.id,
            email: customerResult.customer.email,
            firstName: customerResult.customer.firstName,
            lastName: customerResult.customer.lastName,
          },
          token,
        });
      }

      case 'register': {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        const createResult = await storefront<{ customerCreate: any }>(CUSTOMER_CREATE, {
          input: { email, password, firstName, lastName },
        });

        const errors = createResult.customerCreate.customerUserErrors;
        if (errors?.length > 0) {
          return json({ error: errors[0].message }, { status: 400 });
        }

        // Auto-login after registration
        const tokenResult = await storefront<{ customerAccessTokenCreate: any }>(
          CUSTOMER_ACCESS_TOKEN_CREATE,
          { input: { email, password } }
        );

        const token = tokenResult.customerAccessTokenCreate.customerAccessToken.accessToken;

        return json({
          customer: {
            id: createResult.customerCreate.customer.id,
            email: createResult.customerCreate.customer.email,
            firstName: createResult.customerCreate.customer.firstName,
            lastName: createResult.customerCreate.customer.lastName,
          },
          token,
        });
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth action failed:', error);
    return json({ error: 'Authentication failed' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add app/routes/api.auth.tsx
git commit -m "feat(auth): add auth API route with Shopify Customer API"
```

---

### Task 5.3: Create Login Page

**Files:**
- Create: `app/routes/account.login.tsx`

**Step 1: Create login page**

```typescript
import { useState } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { useAuth } from '~/lib/auth-context';
import { NeoLayout } from '~/components/layout/NeoLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <NeoLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="w-full max-w-md">
          <h1 className="font-display text-display text-center mb-8">Welcome back</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-coral/10 text-coral p-4 rounded-card text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-sajid"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-sajid"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-full"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/account/register" className="text-charcoal underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </NeoLayout>
  );
}
```

**Step 2: Commit**

```bash
git add app/routes/account.login.tsx
git commit -m "feat(auth): add login page"
```

---

### Task 5.4: Create Register Page

**Files:**
- Create: `app/routes/account.register.tsx`

**Step 1: Create register page** (similar structure to login)

**Step 2: Commit**

```bash
git add app/routes/account.register.tsx
git commit -m "feat(auth): add register page"
```

---

### Task 5.5: Update Account Page with Auth

**Files:**
- Modify: `app/routes/account._index.tsx`

**Step 1: Add authentication check and redirect**

```typescript
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useAuth } from '~/lib/auth-context';

export default function AccountPage() {
  const { customer, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !customer) {
      navigate('/account/login');
    }
  }, [customer, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return null;
  }

  return (
    <NeoLayout>
      <div className="section">
        <h1 className="font-display text-display mb-8">
          Welcome, {customer.firstName || customer.email}
        </h1>

        <button onClick={logout} className="btn-ghost">
          Sign out
        </button>
      </div>
    </NeoLayout>
  );
}
```

**Step 2: Commit**

```bash
git add app/routes/account._index.tsx
git commit -m "feat(auth): integrate account page with auth context"
```

---

### Task 5.6: Add AuthProvider to Root

**Files:**
- Modify: `app/root.tsx`

**Step 1: Import and wrap with AuthProvider**

```typescript
import { AuthProvider } from '~/lib/auth-context';

// Wrap alongside CartProvider
<AuthProvider>
  <CartProvider>
    <Outlet />
  </CartProvider>
</AuthProvider>
```

**Step 2: Commit**

```bash
git add app/root.tsx
git commit -m "feat(auth): add AuthProvider to app root"
```

---

### Task 5.7: Deploy Phase 5

**Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Test auth flow manually**

1. Go to `/account`
2. Verify redirect to `/account/login`
3. Try logging in with test credentials
4. Verify redirect back to `/account` with customer data
5. Test logout

**Step 4: Tag release**

```bash
git tag v0.5.0-auth
git push origin main --tags
```

---

## Summary

| Phase | Version Tag | Key Deliverables |
|-------|-------------|------------------|
| 1. Assets | v0.1.0-assets | Complete manifest, ResponsiveImage component, folder structure |
| 2. Design | v0.2.0-design | Unified color system, removed legacy components |
| 3. Shopify | v0.3.0-shopify | API client, loaders for rituals and PDP |
| 4. Cart | v0.4.0-cart | Cart context, API routes, working checkout |
| 5. Auth | v0.5.0-auth | Auth context, login/register, protected account |

Each phase deploys independently. Roll back by reverting to previous tag if issues arise.
