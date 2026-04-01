# Performance Audit — bonjoojoo.com

**Date:** 2026-04-01
**Auditor:** DevOps Engineer
**Scope:** Homepage + Product page
**Goal:** Improve Lighthouse score to 85+

---

## Estimated Lighthouse Scores (Code Review)

| Metric | Before | After |
|--------|--------|-------|
| Performance | ~55–65 | ~80–90 |
| Accessibility | ~90 | ~90 |
| Best Practices | ~85 | ~90 |
| SEO | ~90 | ~92 |

*Scores are estimated from static code analysis. Run `npx lighthouse https://bonjoojoo.com --output html` after deployment for actual numbers.*

---

## Core Web Vitals Findings

### LCP (Largest Contentful Paint) — Primary Issue

**Problem:** Four full-viewport hero sections each backed by large unoptimized MP4 videos:
- `model-hero.mp4` → **6.4 MB**
- `crowns-hero.mp4` → **10 MB**
- `bestsellers-hero.mp4` → **7.0 MB**
- `diamonds-hero.mp4` → **13 MB**
- **Total: ~36.4 MB** of video on initial page load

Even with `LazyVideo`'s IntersectionObserver, the first (above-fold) hero loads eagerly and blocks LCP.

**Fix applied:** Switched all hero videos to pre-existing `-optimized.mp4` variants:
- `model-hero-optimized.mp4` → **1.1 MB** (83% reduction)
- `crowns-hero-optimized.mp4` → **1.9 MB** (81% reduction)
- `bestsellers-hero-optimized.mp4` → **1.4 MB** (80% reduction)
- `diamonds-hero-optimized.mp4` → **2.1 MB** (84% reduction)
- **Total after: ~6.5 MB** (82% overall reduction)

**Impact:** Significant LCP improvement, especially on mobile/slower connections.

---

### CLS (Cumulative Layout Shift) — Addressed

**Hero sections:** All full-viewport sections have explicit `height: '100vh'` defined — space is reserved before video loads. CLS risk here is low.

**Product grid (category pages):** Uses `aspect-[4/5]` on all image containers, and loading shimmer uses the same aspect ratio. CLS risk is mitigated.

**Font loading (CLS risk fixed):** Fonts were loaded via CSS `@import` in `globals.css` — a render-blocking pattern that causes late text reflow and CLS.

**Fix applied:**
- Removed `@import url(...)` from `globals.css`
- Added `<link rel="stylesheet" href="...&display=swap" />` directly in `layout.tsx` `<head>`
- Fonts now load in parallel with other resources instead of serially after CSS parse

---

### FID / INP (Interaction Responsiveness)

**Status:** Homepage is a `'use client'` component with heavy Framer Motion animations (`LuxuryReveal`, `LuxuryParallax`, `FocusSection` with `useScroll`/`useTransform`). These are initialized after hydration and include `MotionConfig reducedMotion="user"` to respect user preferences.

**Recommendation (future):** Consider splitting the product carousel into a separate lazy-loaded client component to reduce initial JS parse time.

---

## Changes Made

### 1. Hero video optimization (`src/app/page.tsx`)
Switched all 4 background video sources to their optimized variants. Net reduction: ~29.9 MB per page load.

```diff
- src="/videos/model-hero.mp4"
+ src="/videos/model-hero-optimized.mp4"

- src="/videos/crowns-hero.mp4"
+ src="/videos/crowns-hero-optimized.mp4"

- src="/videos/bestsellers-hero.mp4"
+ src="/videos/bestsellers-hero-optimized.mp4"

- src="/videos/diamonds-hero.mp4"
+ src="/videos/diamonds-hero-optimized.mp4"
```

### 2. Stripe preconnect (`src/app/layout.tsx`)
Added early connection hints for Stripe JS and API, reducing TLS handshake latency when Stripe loads on checkout:

```html
<link rel="preconnect" href="https://js.stripe.com" />
<link rel="dns-prefetch" href="https://api.stripe.com" />
```

### 3. Font loading strategy (`src/app/globals.css` + `src/app/layout.tsx`)
Converted font loading from render-blocking CSS `@import` to parallel HTML `<link>` tag:

```diff
// globals.css — REMOVED:
- @import url('https://fonts.googleapis.com/css2?...');

// layout.tsx — ADDED:
+ <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:...&family=DM+Sans:...&display=swap" />
```

---

## Image Optimization Status

| Check | Status |
|-------|--------|
| `next/image` used for all product images | ✅ Yes |
| `next/image` used for editorial/lifestyle images | ✅ Yes |
| Raw `<img>` tags in active pages | ✅ None (only in a comment in JewelryAssets.tsx) |
| `priority` on above-fold product image | ✅ Yes (product detail page: `priority={selectedImage === 0}`) |
| Lazy loading for below-fold images | ✅ `next/image` lazy loads by default |
| `next.config.js` image formats | ✅ AVIF + WebP configured |
| `deviceSizes` configured | ✅ Yes (`[390, 414, 768, 1024, 1280, 1440, 1920]`) |

---

## Remaining Recommendations (Future Work)

1. **Self-host fonts** using `next/font/google` — eliminates external font requests entirely, improves FCP by ~100–200ms
2. **Add `<link rel="preload">` for hero video** — preload `model-hero-optimized.mp4` since it's above-fold and eager
3. **Lazy-load product carousel** — extract the horizontal scroll section into a separate `React.lazy` component
4. **Compress public images** — `bonjoojoo-1.png` through `bonjoojoo-6.png` are PNGs; converting to WebP would reduce OG/social image payloads
5. **Consider `100dvh`** instead of `100vh` for hero sections — avoids mobile browser chrome CLS on iOS Safari
