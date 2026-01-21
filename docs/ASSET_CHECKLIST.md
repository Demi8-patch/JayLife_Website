# Asset Checklist for Design Team

This checklist outlines all required visual assets for the Jay Life storefront. Please deliver assets according to the specifications below.

---

## Hero Images

High-impact hero banners for the homepage and key landing pages.

### Desktop (1920x800)

- [ ] `hero-home-desktop.avif`
- [ ] `hero-home-desktop.webp`
- [ ] `hero-home-desktop.jpg`

### Mobile (750x1000)

- [ ] `hero-home-mobile.avif`
- [ ] `hero-home-mobile.webp`
- [ ] `hero-home-mobile.jpg`

---

## Product Images

Each SKU requires images at 3 sizes (400px, 800px, 1600px width) in avif, webp, and jpg formats.

### FOCUS

- [ ] `focus-400.avif`
- [ ] `focus-400.webp`
- [ ] `focus-400.jpg`
- [ ] `focus-800.avif`
- [ ] `focus-800.webp`
- [ ] `focus-800.jpg`
- [ ] `focus-1600.avif`
- [ ] `focus-1600.webp`
- [ ] `focus-1600.jpg`

### CALM

- [ ] `calm-400.avif`
- [ ] `calm-400.webp`
- [ ] `calm-400.jpg`
- [ ] `calm-800.avif`
- [ ] `calm-800.webp`
- [ ] `calm-800.jpg`
- [ ] `calm-1600.avif`
- [ ] `calm-1600.webp`
- [ ] `calm-1600.jpg`

### GUT

- [ ] `gut-400.avif`
- [ ] `gut-400.webp`
- [ ] `gut-400.jpg`
- [ ] `gut-800.avif`
- [ ] `gut-800.webp`
- [ ] `gut-800.jpg`
- [ ] `gut-1600.avif`
- [ ] `gut-1600.webp`
- [ ] `gut-1600.jpg`

### GLOW

- [ ] `glow-400.avif`
- [ ] `glow-400.webp`
- [ ] `glow-400.jpg`
- [ ] `glow-800.avif`
- [ ] `glow-800.webp`
- [ ] `glow-800.jpg`
- [ ] `glow-1600.avif`
- [ ] `glow-1600.webp`
- [ ] `glow-1600.jpg`

### MOVE

- [ ] `move-400.avif`
- [ ] `move-400.webp`
- [ ] `move-400.jpg`
- [ ] `move-800.avif`
- [ ] `move-800.webp`
- [ ] `move-800.jpg`
- [ ] `move-1600.avif`
- [ ] `move-1600.webp`
- [ ] `move-1600.jpg`

---

## Lab Reports

Third-party lab test certificates for each product (PDF format).

- [ ] `lab-report-focus.pdf`
- [ ] `lab-report-calm.pdf`
- [ ] `lab-report-gut.pdf`
- [ ] `lab-report-glow.pdf`
- [ ] `lab-report-move.pdf`

---

## OG Images (Social Sharing)

Open Graph images for social media previews. All images should be 1200x630 pixels.

### Homepage

- [ ] `og-home.jpg` (1200x630)

### Product Pages

- [ ] `og-focus.jpg` (1200x630)
- [ ] `og-calm.jpg` (1200x630)
- [ ] `og-gut.jpg` (1200x630)
- [ ] `og-glow.jpg` (1200x630)
- [ ] `og-move.jpg` (1200x630)

---

## Logos & Badges

Brand identity assets and trust indicators.

### Logo

- [ ] `logo.svg` (primary logo, vector format)
- [ ] `logo-white.svg` (white variant for dark backgrounds)
- [ ] `logo-black.svg` (black variant for light backgrounds)

### Trust Badges

- [ ] `trust-lab.svg` (lab-tested badge)
- [ ] `badge-30day.svg` (30-day money-back guarantee badge)
- [ ] `badge-free-shipping.svg` (free shipping badge, if applicable)

### Favicon

- [ ] `favicon.ico` (16x16, 32x32, 48x48 multi-resolution)
- [ ] `favicon-192.png` (192x192 for Android)
- [ ] `favicon-512.png` (512x512 for PWA)
- [ ] `apple-touch-icon.png` (180x180 for iOS)

---

## Testimonial Avatars

Customer photos for review sections. Ensure model/photo releases are obtained.

- [ ] `avatar-1.jpg` (200x200, circular crop ready)
- [ ] `avatar-2.jpg` (200x200, circular crop ready)
- [ ] `avatar-3.jpg` (200x200, circular crop ready)
- [ ] `avatar-4.jpg` (200x200, circular crop ready)
- [ ] `avatar-5.jpg` (200x200, circular crop ready)

### Release Confirmation

- [ ] **Model/photo releases obtained for all testimonial avatars**
- [ ] **Written consent for commercial use confirmed**

---

## Delivery Instructions

### File Naming

- Use lowercase, hyphen-separated names (e.g., `focus-800.webp`)
- No spaces or special characters

### Image Optimization

- AVIF: Quality 80, max compression
- WebP: Quality 85
- JPG: Quality 85, progressive encoding

### Color Profile

- sRGB for all web images
- Embed color profile in files

### Delivery Method

- Upload to shared folder or asset management system
- Notify dev team via Slack/email when assets are ready
- Include a manifest listing all delivered files

### Directory Structure

```
/public/images/
├── hero/
│   ├── hero-home-desktop.avif
│   ├── hero-home-desktop.webp
│   └── ...
├── products/
│   ├── focus-400.avif
│   ├── focus-800.avif
│   └── ...
├── og/
│   ├── og-home.jpg
│   └── ...
├── badges/
│   ├── trust-lab.svg
│   └── ...
├── avatars/
│   ├── avatar-1.jpg
│   └── ...
└── logos/
    ├── logo.svg
    └── ...

/public/docs/
└── lab-reports/
    ├── lab-report-focus.pdf
    └── ...
```

---

## Summary

| Category            | Items Required |
| ------------------- | -------------- |
| Hero Images         | 6              |
| Product Images      | 45             |
| Lab Reports         | 5              |
| OG Images           | 6              |
| Logos               | 3              |
| Trust Badges        | 3              |
| Favicons            | 4              |
| Testimonial Avatars | 5              |
| **Total**           | **77**         |

---

_Last updated: 2026-01-21_
