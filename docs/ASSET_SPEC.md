**Asset Spec**

This file lists all assets and copy the marketing team must provide for launch. Follow the filename patterns and formats exactly to make integration frictionless.

**Hero / LCP**:

- Filenames: `hero-desktop.avif`, `hero-desktop.webp`, `hero-desktop.jpg`, `hero-mobile.avif`, `hero-mobile.webp`, `hero-mobile.jpg`
- Sizes: desktop 1600w (crop center/right as needed), mobile 800w
- Aspect ratio: square/1:1 or 4:5 depending on design—confirm focal point
- Formats: AVIF primary, WebP fallback, JPEG fallback
- Alt text: short descriptive sentence (e.g. "Jay Life supplement bottles on white background")
- Provide 1-line caption + preferred focal point coordinates (x,y) if subject not centered
- Provide exact sale banner text + UTC end datetime for countdown

**Product Images (per SKU)**:

- Filenames: `product_<handle>-400.avif`, `product_<handle>-800.avif`, `product_<handle>-1600.avif` (also `.webp` and `.jpg` variants)
- Required widths: 400px, 800px, 1600px
- Variant: one pack shot (white background), one lifestyle shot (800w), one pack-close (800w)
- Aspect ratio: square (1:1) for grid; include 4:5 vertical crop if available
- Alt text template: `<Product Title> — <short tagline>` (max 125 chars)
- Provide suggested `srcset` line for each SKU

SKUs (from `RITUALS`):

- `focus`, `calm`, `gut`, `glow`, `move` — provide assets for each handle

**Product Thumbnails / Placeholders**:

- Filename: `/images/placeholder.jpg` (800w jpeg)
- Purpose: fallback for missing images

**Testimonials & Headshots**:

- Filenames: `testimonial_<slug>.avif` + `.webp` + `.jpg` (48w, 96w, 192w)
- Provide approved quote text, author name, title/role, and signed release confirmation
- Alt text: `Photo of <Author Name>`

**Lab Reports / Certificates**:

- Provide a secure URL or PDF for each SKU: `lab_<handle>.pdf`
- Update `labReportUrl` to point to production URL (HTTPS)

**Bundles & Category Images**:

- Filenames: `bundle_<slug>-800.avif` (800w), `category_<slug>-800.avif`
- Alt text and short description for each bundle/category

**Social / OG images**:

- Filenames: `og-home.png` (1200x630), `og-product-<handle>.png` (1200x630)
- Provide alt text and preferred title overlay (optional)

**Avatars / Staff / Social Proof**:

- Headshots: `avatar_<firstname>-48.avif` (48w), `avatar_<firstname>-96.avif` (96w)
- If headshots unavailable, provide approved SVG initials (we accept the provided SVGs)
- Release: confirm permission to publish for each testimonial

**Icons / Badges / Logos**:

- Provide SVGs for: `logo.svg`, `trust-lab.svg`, `badge-30day.svg` (vector preferred)
- Provide favicon: `favicon.ico` (32x32) and `favicon-192.png` for Android

**Fonts & Web assets**:

- Provide webfont licenses and preferred font-face declarations if using custom fonts

**Copy & Metadata**:

- hero headline, subhead, CTA labels, sale banner text + end datetime
- product taglines, short and long descriptions, benefits (bulleted), FAQs for each SKU
- final prices: `price`, `compareAtPrice`, and `discountPercent` per SKU
- SEO: page titles, meta descriptions, and canonical OG image for the homepage
- Email capture copy and privacy link for the ESP

**Naming & Delivery Guidelines**:

- Use lowercase, hyphen-separated filenames
- Provide AVIF + WebP + JPG fallback for every important image
- Supply images in a zip with a JSON manifest `{ "handle": { "images": ["..."], "alt": "..." } }`

**Acceptance criteria**:

- All assets uploaded to `public/images/` with filenames above
- `labReportUrl` fields replaced with HTTPS links
- All testimonial headshots have release confirmation
- Image sizes are <= recommended widths and optimized (AVIF where possible)

If you want, I can generate the JSON manifest template and a ready-to-upload zip structure. Reply `manifest` to have me create `docs/ASSET_MANIFEST_TEMPLATE.json` and a short `README` with upload instructions.
