# Cross-Device Testing Checklist
**Jay Life Hydrogen Storefront**  
**Launch Readiness: Pre-Deployment Validation**

---

## 📱 Mobile Testing (375px width)
**Device Profile:** iPhone SE / 6 / 7 / 8  
**Tools:** Chrome DevTools → Responsive Mode (375×812px)  
**Priority:** CRITICAL — 80% of traffic

| Element | Test Action | ✓ Pass Criteria | Status |
|---------|------------|-----------------|--------|
| **Navigation** | Tap menu icon | Menu slides in, overlay covers full screen | ☐ |
| **Hero Section** | Scroll down | Text readable, image scales properly | ☐ |
| **Product Card** | Tap product | Card expands/navigates, pricing visible | ☐ |
| **Add to Cart** | Tap "Add" button | Haptic feedback, toast notification appears | ☐ |
| **Cart Drawer** | Swipe up/down | Drawer slides smoothly, close button accessible | ☐ |
| **Form Input** | Type in email field | Keyboard doesn't overlap input, text visible | ☐ |
| **Bottom Nav** | Tap each icon | All 4 nav items clickable, active state shows | ☐ |
| **Buttons** | Tap primary CTA | Min 48px height, visible focus ring | ☐ |
| **Images** | Page load | All images load within 2.5s (LCP target) | ☐ |
| **Text Contrast** | Visual check | All text readable (4.5:1 ratio WCAG AA) | ☐ |

**Accessibility Check:**
- [ ] Tap through entire page with Tab key — all interactive elements reachable
- [ ] Test with screen reader (NVDA on Windows) — headings, buttons announced properly
- [ ] Verify focus ring visible on all buttons
- [ ] No text smaller than 12px (zoom test: pinch-to-zoom works smoothly)

---

## 💻 Tablet Testing (768px width)
**Device Profile:** iPad / Android Tablet  
**Tools:** Chrome DevTools → Responsive Mode (768×1024px)  
**Priority:** HIGH — Layout must adapt

| Element | Test Action | ✓ Pass Criteria | Status |
|---------|------------|-----------------|--------|
| **Navigation** | Landscape orientation | Top header visible, bottom nav hidden | ☐ |
| **Grid Layout** | View product grid | 2-column layout (not 1), proper spacing | ☐ |
| **Touch Targets** | Tap buttons | All buttons still ≥48px height | ☐ |
| **Modals/Drawers** | Open cart drawer | Modal centered, not full-width | ☐ |
| **Typography** | Read headlines | Scaling to `md:` breakpoint applied correctly | ☐ |
| **Spacing** | Visual check | Padding: 20px (matches `md:px-20`) | ☐ |

---

## 🖥️ Desktop Testing (1440px width)
**Device Profile:** MacBook / Windows Desktop  
**Tools:** Chrome DevTools → Responsive Mode (1440×900px)  
**Priority:** HIGH — Design intent verified

| Element | Test Action | ✓ Pass Criteria | Status |
|---------|------------|-----------------|--------|
| **Header** | Page load | Full header visible, logo + nav centered | ☐ |
| **Hero Section** | Scroll | Background image fills viewport, text overlay readable | ☐ |
| **Product Grid** | View collection | 3+ columns, max-width container centered | ☐ |
| **Hover States** | Hover over card | Shadow/scale effect smooth, no layout shift | ☐ |
| **CTA Buttons** | Hover over primary button | Lime background → hover state visible, cursor pointer | ☐ |
| **Bottom Nav** | Hidden check | Bottom nav NOT visible (hidden md:hidden) | ☐ |
| **Form Inputs** | Focus on email | Blue focus ring (4px) appears, no overlap | ☐ |
| **Footer** | Scroll to bottom | Links clickable, social icons aligned | ☐ |

---

## 🎨 Visual Regression Checks (All Widths)

| Component | Check | Status |
|-----------|-------|--------|
| **Color accuracy** | Acid green (#BFFF00) appears bright/saturated | ☐ |
| **Shadows** | Neo-brutalist shadows (4px hard drops) render correctly | ☐ |
| **Spacing** | 8px grid spacing consistent (no odd margins) | ☐ |
| **Typography** | Font weights (700, 800, 900) render crisp (no fuzziness) | ☐ |
| **Images** | No broken images, all WebP/optimized format | ☐ |
| **Border radius** | Buttons round (8px), cards softer (12px) | ☐ |

---

## ⚡ Performance Audit (Lighthouse)

**Instructions:**
1. Open preview at `http://localhost:3000`
2. Chrome DevTools → Lighthouse tab
3. Configuration: **Mobile** (throttle: Slow 4G, CPU: 4x slowdown)
4. Run audit on homepage

| Metric | Target | Status | Notes |
|--------|--------|--------|-------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ☐ | Image load time |
| **FID** (First Input Delay) | < 100ms | ☐ | Button interaction |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ☐ | No jumps on load |
| **Performance Score** | ≥ 90 | ☐ | Overall speed |
| **Accessibility Score** | ≥ 90 | ☐ | WCAG compliance |
| **Best Practices Score** | ≥ 90 | ☐ | Security, standards |

**Common Issues to Debug:**
- **LCP slow?** → Check image optimization (use WebP, lazy-load with Hydrogen `<Image>`)
- **CLS high?** → Check variant selector, cart drawer animations (use `transform` not `margin`)
- **FID high?** → Check JS bundle size (framer-motion is 111kb gzipped — acceptable but monitor)

---

## 🛒 Functional Test Flows

### Add-to-Cart Flow
```
1. [ ] Load product page (/rituals/focus-drops)
2. [ ] Select variant (e.g., size/flavor)
3. [ ] Tap "Add to Cart" → haptic feedback fires ✓
4. [ ] Toast notification appears (2–3 sec fade-out)
5. [ ] Cart drawer slides in from bottom (mobile) or right (desktop)
6. [ ] Item quantity shows + badge
7. [ ] Can tap to update quantity
8. [ ] Remove button works
9. [ ] Checkout button routes to Shopify checkout
```

### Navigation Test
```
1. [ ] Home → Rituals → Works (no 404)
2. [ ] Rituals → Individual ritual → Works
3. [ ] Mobile menu toggle works (hamburger → close)
4. [ ] Desktop header links work (Shop, Learn, Account)
5. [ ] Bottom nav (mobile) tabs switch without page reload
6. [ ] Back button browser navigation works (no stuck state)
```

### Form Test (Email Capture)
```
1. [ ] Enter valid email → Submit works
2. [ ] Enter invalid email (no @) → Error message shows
3. [ ] Empty submit → Validation error displays
4. [ ] Success state shows for 2 sec, then clears
5. [ ] No console errors (check DevTools → Console tab)
```

---

## 📊 Metafield Verification

**Check these exist in Shopify Admin → Products → Custom Data:**

| Product | Metafield | Type | Value Present | Status |
|---------|-----------|------|---------------|--------|
| Focus Drops | `custom.ingredients` | JSON | `[{"name":"L-Theanine"...}]` | ☐ |
| Focus Drops | `custom.tagline` | String | "Citrus Blend" | ☐ |
| Focus Drops | `custom.lab_report_url` | URL | PDF link | ☐ |
| Focus Drops | `custom.synergy_rituals` | JSON | `["calmness","sleep"]` | ☐ |

**If missing:**
- [ ] **Product crashes on load** → Check browser console (DevTools → Console)
- **Solution:** Add metafields in Shopify Admin, rebuild with `npm run build`, test again

---

## ✅ Final Sign-Off Checklist

**Before Deployment, Verify ALL:**

- [ ] **All 4 npm checks pass** (typecheck, lint, build, preview)
- [ ] **Mobile (375px):** All 10 items ticked
- [ ] **Tablet (768px):** All items ticked
- [ ] **Desktop (1440px):** All items ticked
- [ ] **Accessibility:** Tab navigation, screen reader, focus rings work
- [ ] **Lighthouse scores:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Add-to-cart flow:** Complete with haptic feedback
- [ ] **Navigation:** No 404s, mobile menu works
- [ ] **Forms:** Email capture validates
- [ ] **Metafields:** At least 3 products have `ingredients` metafield populated
- [ ] **No console errors** (DevTools → Console tab is clean)
- [ ] **No visual regressions** (colors, shadows, spacing match Figma)

---

## 🚀 Deployment Go/No-Go

**GO** ✅ if all checkboxes ticked  
**NO-GO** ❌ if any critical items (marked **CRITICAL**) fail

**Date Tested:** ___________  
**Tested By:** ___________  
**Notes:** ___________
