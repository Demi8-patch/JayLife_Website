Jay Life Brand Guidelines
Version 2.0 | January 2026

**Mobile-First Overhaul** - Optimized for Gen-Z thumb-zone interactions

---

1. Brand Overview
   Who We Are
   Jay Life is a Gen-Z direct-to-consumer wellness brand offering modular, science-backed daily optimization tools. We operate with pharma-grade backend compliance (Jay Life Pharma) but present an entirely independent, internet-native frontend identity.

Brand Promise
"Small upgrades compound."

We don't overhaul lives. We upgrade them—one step at a time.

Strategic Position
For Gen-Z optimizers who want to feel noticeably better without medical anxiety, Jay Life is the daily wellness brand that offers modular, science-backed rituals. Unlike traditional pharma that treats sickness, we upgrade daily life.

2. Brand Architecture
   The Brand Firewall
   Layer Identity Role
   Backend Jay Life Pharma Supply chain, compliance, credibility
   Frontend Jay Life (D2C) Brand voice, aesthetics, customer relationship
   The backend is boring, safe, massive scale. The frontend is internet-native, aesthetic, human.

Product Architecture
Modular systems—no one-size-fits-all multivitamins:

Product Purpose Key Copy
FOCUS Caffeine + L-Theanine + Tyrosine "Stay sharp. No jitters."
CALM Ashwagandha + Magnesium "Find your calm. Quiet your mind."
GUT Probiotics + Digestive Enzymes "Healthy digestion from within."
GLOW Collagen + Biotin "Radiant skin. From the inside out."
MOVE Recovery compounds "Perform better. Recover faster." 3. Brand Personality
Archetype
The Smart Friend / The Sage-Next-Door

The friend who's doing slightly better than you. Not a guru. Not a doctor. A credible wellness companion who happens to know what works.

Personality Traits
Trait Expression
Calm Confidence We don't shout. We state facts.
Internet-Native We speak fluent meme but don't spam them.
Honest No miracle claims. Clear timelines (3-5 weeks).
Optimistic Upgrade-focused, not problem-focused.
What We Are NOT
❌ Medical authority cosplay

❌ Hustle culture aggression

❌ Beige passive wellness

❌ Complex biohacker protocols

4. Visual Identity
   Aesthetic: "App, Not Pharmacy"
   Our visuals should feel like a premium tech product, not a prescription.

### Color Palette (2026 Refresh)

| Color          | Hex                      | CSS Variable        | Usage                         |
| -------------- | ------------------------ | ------------------- | ----------------------------- |
| **Acid Green** | `#BFFF00`                | `--color-acid`      | Primary actions, energy, CTAs |
| **Acid Glow**  | `rgba(191, 255, 0, 0.2)` | `--color-acid-glow` | Hover states, badges          |
| **Cream**      | `#FAF9F5`                | `--color-cream`     | Primary background            |
| **Warm White** | `#FFFFFF`                | `--color-white`     | Cards, surfaces               |
| **Charcoal**   | `#1A1A1A`                | `--color-charcoal`  | Primary text, dark elements   |
| **Muted**      | `#68809A`                | `--color-muted`     | Secondary text, captions      |
| **Coral**      | `#FF6F61`                | `--color-coral`     | Errors, warnings, urgency     |
| **Lavender**   | `#E6E6FA`                | `--color-lavender`  | Calm accent, info badges      |

### Typography System

| Role         | Font           | Size (Mobile) | Size (Desktop) | Weight |
| ------------ | -------------- | ------------- | -------------- | ------ |
| **Hero**     | Outfit         | 32px          | 56px           | 700    |
| **Headline** | Outfit         | 24px          | 36px           | 600    |
| **Subhead**  | Inter          | 18px          | 22px           | 500    |
| **Body**     | Inter          | 16px          | 16px           | 400    |
| **Specs**    | JetBrains Mono | 14px          | 14px           | 400    |
| **Caption**  | Inter          | 12px          | 12px           | 500    |

**Font Loading Priority:**

1. Outfit (headlines) - Display swap
2. Inter (body) - System fallback first
3. JetBrains Mono (specs) - Load async

### Mobile-First Design Principles

**The Thumb Zone Rule**
Design for single-hand operation. Primary actions in bottom 60% of screen.

```
┌─────────────────────┐
│   HARD REACH        │  <- Secondary content
│                     │
├─────────────────────┤
│   NATURAL REACH     │  <- Primary content
│                     │
├─────────────────────┤
│   THUMB ZONE        │  <- Primary actions, nav
│   [CTA] [CTA]       │
└─────────────────────┘
```

**Touch Targets**

- Minimum: 48px × 48px
- Recommended: 56px × 56px for primary CTAs
- Spacing between targets: 8px minimum

**Spacing Scale (8px base)**
| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 8px | Inline spacing |
| `sm` | 16px | Component padding |
| `md` | 24px | Section gaps |
| `lg` | 48px | Section padding (mobile) |
| `xl` | 80px | Section padding (desktop) |

### Component Library

**Cards**

- Border radius: 16px
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.04)`
- Padding: 24px (mobile), 32px (desktop)

**Buttons**

- Primary: Acid green background, charcoal text
- Secondary: Charcoal background, cream text
- Ghost: Transparent, charcoal border
- Height: 48px minimum, 56px recommended
- Border radius: 12px
- Font: Bold, no uppercase

**Badges**

- Success: Acid green tint
- Warning: Coral tint
- Info: Lavender
- Neutral: Charcoal tint

### Animation Guidelines

**Micro-interactions**

- Duration: 150-200ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Haptic: 10ms vibration on add-to-cart

**Reduced Motion**
Always respect `prefers-reduced-motion: reduce`:

- Replace animations with instant state changes
- Keep essential feedback (color changes, scale)

5. Voice & Tone
   Voice Characteristics
   Attribute Description
   Calm Not loud. We don't need to yell.
   Confident Not arrogant. Facts speak.
   Friendly Not corporate. Like texting a smart friend.
   Clear No jargon. "Explain it like I'm 15."
   Sentence Structure
   Short sentences. Fragment-friendly.

Verb-first when giving instructions.

Sparse emojis: One per paragraph max.

Spec-sheet formatting: Bullets over paragraphs.

Power Lexicon (Words We Use)
Word Why
Routine Familiar, approachable daily practice
Ritual Elevated daily habit
Results Clear, tangible outcomes
Feel Sensory, personal experience
Daily Consistent, simple commitment
Formula Scientific precision
Blend Natural combination
Clean No crash, precision
Anti-Lexicon (Words We Avoid)

**Tech/Gaming Jargon (Critical - Alienates Mainstream Consumers)**
Avoid Use Instead
Stack Routine / Bundle / Collection
Deploy Take / Use / Start
Protocol Routine / Ritual / Daily practice
Upgrade (product context) Results / Benefits / Transformation
Compound (as verb) Build / Grow / Develop
Lock in Focus / Concentrate

**Passive Wellness Language**
Avoid Use Instead
Nourish Fuel
Journey Routine
Holistic Science-backed
Self-care Daily wellness
Balance Optimization

**Why This Matters:** "Stack" is gaming/supplement niche jargon that alienates 80%+ of mainstream consumers. B2C supplement brands (AG1, Ritual, Seed) use warm, accessible, human language. 6. Messaging Hierarchy
Tier 1: Brand Promise
"Small upgrades compound."

Tier 2: Category Message
"Daily self-optimization tools that turn science-backed ingredients into simple, aesthetic rituals."

Tier 3: Product Messages
FOCUS: "Stay sharp. No jitters."

CALM: "Find your calm. Quiet your mind."

GUT: "Healthy digestion from within."

GLOW: "Radiant skin. From the inside out."

MOVE: "Perform better. Recover faster."

Tier 4: Proof Points
Pharma-grade manufacturing

Lab reports via QR

Clear timelines (3-5 weeks)

No proprietary blend hiding

7. Content Guidelines
   Content Pillars
   "Explain it like I'm 15" — Radical simplicity in education

"Products in real life" — Usage context, not lab coats

"Wellness without shame" — Emotional safety, not guilt

Platform Strategy
Platform Format Tone
TikTok Product breakdowns, results clips Peak energy
Instagram Product visuals, lifestyle Aesthetic calm
YouTube Shorts Quick science explainers Educational cool
Honesty Rules
No miracle claims

Always state timelines (2-6 weeks typical)

Say when something won't work for someone

Link to sources

8. Do's and Don'ts
   ✅ Do
   Use short, punchy copy

Lead with the outcome, not the ingredient

Show the product in daily context (desk, gym bag, nightstand)

Include lab report QR codes

Acknowledge what we don't do

❌ Don't
Use clinical/medical imagery

Promise overnight transformations

Use passive "wellness" language

Hide behind proprietary blends

Gatekeep with complex protocols

9. Application Examples
   Product Description Template
   [PRODUCT NAME]
   [Key ingredients in spec format]
   [Outcome in one line]

Example:

FOCUS
Caffeine · L-Theanine · Tyrosine
Stay sharp. No jitters.

Social Caption Template
[Hook] + [What it does] + [Timeline/Proof]

Example:

"Brain fog at 2pm? Try Focus. Most people notice sharper clarity within 7 days. Lab report in bio."

**CTA Button Text Guidelines**
| Instead of | Use |
|------------|-----|
| "Deploy your stack" | "Shop Our Collection" / "Build Your Routine" |
| "Add to ritual" | "Add to Cart" |
| "Start your ritual" | "Shop Now" / "Get Started" |
| "Deploy daily" | "Take daily" / "Use daily" |

Email Subject Lines
"Your order shipped. Lock in tomorrow."

"Week 2 check-in: feeling it yet?"

"What 3,000mg of Magnesium actually does"

10. B2C Conversion Guidelines

### Website Section Structure (Recommended Order)

1. **Announcement Bar** — Promo/shipping info ("Free shipping on orders $50+ | 30-day guarantee")
2. **Navigation** — Logo, nav links, cart icon (not just "0")
3. **Hero** — Value prop + CTA + lifestyle imagery
4. **Trust Bar** — Lab verified, shipping, guarantee (with icons)
5. **Featured Products** — With images, ratings, prices
6. **How It Works** — 3-step visual process
7. **Social Proof** — Customer reviews carousel
8. **Results Timeline** — Expectation setting (3-5 weeks)
9. **Ingredient Transparency** — Research-backed doses
10. **Email Capture** — "Get 10% off your first order"
11. **Footer** — Links, policies, social, FDA disclaimer

### Product Card Requirements

- High-quality product photography (essential for e-commerce)
- Benefit-focused taglines (not tech jargon)
- Star ratings and review counts (e.g., "4.7 ★ | 500 reviews")
- Clear pricing with currency
- Standard "Add to Cart" button
- Trust badge (Lab Verified)
- Quick-view hover states

### Trust Elements (Must Include)

| Element                      | Placement                                     |
| ---------------------------- | --------------------------------------------- |
| Lab testing badges           | Product cards, near CTAs                      |
| Money-back guarantee         | Hero area, checkout                           |
| Secure checkout indicators   | Cart, checkout                                |
| Customer reviews with photos | Homepage, product pages                       |
| Press mentions/logos         | Homepage ("Featured in: Forbes, Vogue, etc.") |
| Verified buyer badges        | All testimonials                              |

### Social Proof Requirements

- Star rating summary (e.g., "★★★★★ 4.8/5 from 4,500+ reviews")
- Multiple testimonials with customer photos
- Specific product mentions and duration of use
- "Verified Buyer" badges
- User-generated content carousel

### Conversion Checklist

**Above the Fold (Hero)**

- [ ] Clear value proposition
- [ ] Product/lifestyle imagery
- [ ] Social proof (star rating, customer count)
- [ ] Primary CTA visible
- [ ] Trust indicators

**Product Display**

- [ ] High-quality product photography
- [ ] Clear pricing
- [ ] Benefit-focused descriptions
- [ ] Add to Cart functionality
- [ ] Star ratings visible

**Footer (Required)**

- [ ] Company information
- [ ] Contact details
- [ ] Social media links
- [ ] Privacy policy / Terms of service
- [ ] FDA disclaimer

---

11. Brand Summary Card
    Element Definition
    Name Jay Life
    Tagline Small upgrades compound.
    Archetype The Smart Friend
    Voice Calm, confident, clear, friendly
    Aesthetic Elevated wellness. Premium but approachable.
    Products Modular systems: FOCUS, CALM, GUT, GLOW, MOVE
    Proof Pharma backend, QR lab reports, clear timelines
    Language Consumer-friendly, no tech jargon
    Never Miracle claims, medical cosplay, beige wellness, "stack/deploy/protocol" terminology

---

12. Reference Brands for Inspiration
1. **AG1 (Athletic Greens)** — Clean, premium, science-forward
1. **Ritual** — Transparency, modern design, subscription-focused
1. **Seed** — Scientific credibility, sophisticated design
1. **Moon Juice** — Lifestyle-forward, aspirational
1. **Thesis** — Personalization, clean UI

---

Guidelines created January 2026. Updated with B2C conversion optimizations.
