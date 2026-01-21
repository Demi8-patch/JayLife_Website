# Jay Life Design Principles Checklist

**Adapted from:** `forAntiGravity\claude-code-workflows-main\design-review\design-principles-example.md`
**Target:** Gen-Z D2C Wellness E-commerce (Mobile-First)

---

## I. Core Design Philosophy

- [ ] **Thumb-Zone First:** Primary actions in bottom 60% of mobile viewport
- [ ] **Touch Targets:** Minimum 48px, recommended 56px for CTAs
- [ ] **Speed:** Target LCP < 2.5s, FID < 100ms
- [ ] **Clarity:** No jargon - "Explain it like I'm 15"
- [ ] **Consistency:** Single design system across all pages
- [ ] **Accessibility:** WCAG 2.1 AA minimum
- [ ] **Conversion Focus:** Clear path from browse to cart

---

## II. Design System Foundation

### Color Palette

| Token              | Hex       | Usage               | Contrast Check      |
| ------------------ | --------- | ------------------- | ------------------- |
| `--color-acid`     | `#BFFF00` | Primary CTA, badges | [ ] 12.58:1 on dark |
| `--color-cream`    | `#FAF9F5` | Backgrounds         | [ ] Verified        |
| `--color-charcoal` | `#1A1A1A` | Primary text        | [ ] Verified        |
| `--color-muted`    | `#68809A` | Secondary text      | [ ] 4.5:1 min       |
| `--color-coral`    | `#FF6F61` | Errors, urgency     | [ ] Use white text  |
| `--color-lavender` | `#E6E6FA` | Info badges         | [ ] Verified        |

**Critical Rules:**

- [ ] Never use `#BFFF00` as text on light backgrounds (1.57:1 = FAIL)
- [ ] Always use dark text on lime backgrounds
- [ ] Use white text on coral/red badges

### Typography Scale

| Role     | Font           | Mobile | Desktop | Weight |
| -------- | -------------- | ------ | ------- | ------ |
| Hero     | Outfit         | 32px   | 56px    | 700    |
| Headline | Outfit         | 24px   | 36px    | 600    |
| Subhead  | Inter          | 18px   | 22px    | 500    |
| Body     | Inter          | 16px   | 16px    | 400    |
| Specs    | JetBrains Mono | 14px   | 14px    | 400    |
| Caption  | Inter          | 12px   | 12px    | 500    |

- [ ] Font loading: Outfit (display swap) > Inter (system fallback) > JetBrains (async)
- [ ] Line height: 1.5-1.7 for body text

### Spacing (8px Base)

| Token | Value | Usage                     |
| ----- | ----- | ------------------------- |
| `xs`  | 8px   | Inline spacing            |
| `sm`  | 16px  | Component padding         |
| `md`  | 24px  | Section gaps              |
| `lg`  | 48px  | Section padding (mobile)  |
| `xl`  | 80px  | Section padding (desktop) |

---

## III. Component Checklist

### Buttons

- [ ] Primary: Acid green bg, charcoal text, 48-56px height
- [ ] Secondary: Charcoal bg, cream text
- [ ] Ghost: Transparent, charcoal border
- [ ] All buttons: 12px border radius, no uppercase
- [ ] Hover state: Lift + glow effect
- [ ] Focus state: 4px lime ring
- [ ] Disabled: 50% opacity

### Cards

- [ ] Border radius: 16px (soft) or 24px (neo-brutalist)
- [ ] Shadow: `0 2px 8px rgba(0, 0, 0, 0.04)` OR `4px border`
- [ ] Padding: 24px mobile, 32px desktop
- [ ] Consistent style across site (pick one!)

### Product Cards (E-commerce Critical)

- [ ] High-quality product photography
- [ ] Benefit-focused tagline (not tech jargon)
- [ ] Star rating + review count visible
- [ ] Clear pricing with currency
- [ ] "Add to Cart" button (standard text)
- [ ] Trust badge (Lab Verified)
- [ ] Sale badge if applicable (top-right corner)

### Forms

- [ ] All inputs have visible labels
- [ ] Placeholder text provides examples
- [ ] Error states use coral color
- [ ] Success feedback on submission
- [ ] 48px minimum input height

---

## IV. Layout Structure

### Mobile Layout

```
┌─────────────────────┐
│   Announcement Bar  │ <- Promo/shipping
├─────────────────────┤
│   Logo + Cart       │ <- Sticky header
├─────────────────────┤
│                     │
│   CONTENT AREA      │ <- Scrollable
│                     │
├─────────────────────┤
│   [CTA] [CTA]       │ <- Thumb zone
└─────────────────────┘
```

### Desktop Layout

- [ ] Max-width container: 1280px
- [ ] Side padding: 80px
- [ ] Responsive grid (12-column)

### Page Section Order (Recommended)

1. [ ] Announcement Bar
2. [ ] Navigation
3. [ ] Hero + CTA
4. [ ] Trust Bar (icons)
5. [ ] Featured Products
6. [ ] How It Works
7. [ ] Social Proof
8. [ ] Email Capture
9. [ ] Footer + FDA disclaimer

---

## V. Interaction Design

### Micro-interactions

- [ ] Duration: 150-200ms
- [ ] Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] Haptic: 10ms vibration on add-to-cart
- [ ] Reduced motion: Respect `prefers-reduced-motion`

### Loading States

- [ ] Skeleton screens for page loads
- [ ] Spinners for in-component actions
- [ ] Optimistic UI for cart updates

### Hover States

- [ ] Cards: Lift + shadow
- [ ] Buttons: Color shift + glow
- [ ] Links: Underline or color change

---

## VI. Accessibility Checklist

### Keyboard Navigation

- [ ] All interactive elements focusable via Tab
- [ ] Visible focus ring (4px lime)
- [ ] Skip link to main content
- [ ] No keyboard traps

### Screen Readers

- [ ] Semantic HTML (nav, main, article, etc.)
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Icon buttons have aria-label
- [ ] Dynamic content announced

### Color & Contrast

- [ ] 4.5:1 minimum for normal text
- [ ] 3:1 minimum for large text
- [ ] Color not sole indicator of state
- [ ] Dark mode considerations

---

## VII. E-commerce Conversion Checklist

### Trust Elements

- [ ] Lab testing badges near CTAs
- [ ] Money-back guarantee visible
- [ ] Secure checkout indicators
- [ ] Customer reviews with photos
- [ ] Verified buyer badges

### Product Display

- [ ] Multiple product images
- [ ] Zoom capability
- [ ] Ingredient list visible
- [ ] Clear pricing (no hidden costs)
- [ ] Subscription options clear

### Cart Experience

- [ ] Persistent cart icon with count
- [ ] Slide-out cart drawer
- [ ] Clear item summary
- [ ] Easy quantity adjustment
- [ ] Upsell suggestions

---

## VIII. Brand Voice in UI

### Do Use

- Ritual, Routine, Results
- Feel, Daily, Formula
- Clean, Science-backed

### Never Use

- Stack, Deploy, Protocol
- Upgrade (as product term)
- Journey, Holistic, Balance
- Nourish, Self-care

### CTA Button Text

| Bad                 | Good                  |
| ------------------- | --------------------- |
| "Deploy your stack" | "Shop Our Collection" |
| "Add to ritual"     | "Add to Cart"         |
| "Start your ritual" | "Shop Now"            |
| "Lock in"           | "Get Started"         |

---

## IX. Design Review Workflow

**Using forAntiGravity design-review-agent:**

### Phase 1: Interaction Testing

- [ ] Primary user flow works
- [ ] All interactive states tested
- [ ] Destructive actions have confirmations

### Phase 2: Responsiveness

- [ ] Desktop (1440px) - screenshot
- [ ] Tablet (768px) - verify adaptation
- [ ] Mobile (375px) - touch optimization
- [ ] No horizontal scroll

### Phase 3: Visual Polish

- [ ] Alignment and spacing consistent
- [ ] Typography hierarchy clear
- [ ] Color palette consistent

### Phase 4: Accessibility

- [ ] Keyboard navigation complete
- [ ] Focus states visible
- [ ] Contrast ratios pass

### Phase 5: Console Check

- [ ] No JavaScript errors
- [ ] No failed network requests

---

## X. Issue Triage

| Severity    | Description                       | Action                |
| ----------- | --------------------------------- | --------------------- |
| **Blocker** | Breaks functionality, fails a11y  | Fix before deploy     |
| **High**    | UX problem, brand violation       | Fix in current sprint |
| **Medium**  | Polish issue, minor inconsistency | Follow-up ticket      |
| **Nit**     | Preference, tiny detail           | Optional              |

---

_Checklist version: 1.0 | Based on brand_guidelines.md + forAntiGravity workflows_
