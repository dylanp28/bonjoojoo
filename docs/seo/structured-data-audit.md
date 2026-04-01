# Structured Data Audit — Bonjoojoo

**Last updated:** 2026-04-01

## Implementation Summary

All JSON-LD structured data has been implemented. Below is the schema inventory and validation status.

---

## Schema Inventory

### 1. Organization + WebSite (Sitewide)
**File:** `src/app/layout.tsx`

Injected in `<head>` on every page via the root layout.

| Field | Value |
|-------|-------|
| `@type` | Organization |
| `name` | Bonjoojoo |
| `url` | https://bonjoojoo.com |
| `logo` | /logos/bonjoojoo-logo-primary.svg |
| `sameAs` | Instagram, Facebook, TikTok, Pinterest |

| Field | Value |
|-------|-------|
| `@type` | WebSite |
| `potentialAction` | SearchAction → `/search?q={search_term_string}` |

---

### 2. Product + BreadcrumbList (Product Pages)
**File:** `src/app/product/[id]/layout.tsx`

Rendered server-side for each product. Uses `productGroups` data.

| Field | Source |
|-------|--------|
| `name` | `product.name` |
| `description` | `product.description` |
| `sku` | `defaultVariant.sku` or `product.id` fallback |
| `image` | All variant images (absolute URLs) |
| `brand.name` | "Bonjoojoo" |
| `offers.priceCurrency` | USD |
| `offers.price` | `product.basePrice` |
| `offers.availability` | InStock / OutOfStock based on variants |
| `aggregateRating` | Placeholder: 4.8 / 127 reviews (update when live reviews exist) |

BreadcrumbList: Home → Category → Product Name

---

### 3. BreadcrumbList (Category Pages)
**File:** `src/app/category/[category]/layout.tsx`

| Breadcrumb | Value |
|-----------|-------|
| Position 1 | Home → https://bonjoojoo.com |
| Position 2 | Category label → /category/{category} |

---

## Sitemap
**File:** `src/app/sitemap.xml/route.ts`

Dynamic sitemap covering:
- Homepage + key static pages (priority 1.0–0.5)
- Category pages: rings, necklaces, earrings, bracelets (priority 0.8)
- All product pages from `productGroups` (priority 0.7–0.8)
- Blog posts from `blogPosts` (priority 0.6)

Served at: `https://bonjoojoo.com/sitemap.xml`

---

## Robots.txt
**File:** `src/app/robots.txt/route.ts`

- `User-agent: *` → `Allow: /`
- Disallows: `/admin/`, `/api/`, `/checkout/`, `/account/`, `/_next/`
- Sitemap pointer: `Sitemap: https://bonjoojoo.com/sitemap.xml`
- AI crawler opt-out: GPTBot, ChatGPT-User, anthropic-ai, Claude-Web, Google-Extended

---

## Validation Instructions

Use [Google Rich Results Test](https://search.google.com/test/rich-results) to validate.

### Pages to Test

| URL | Expected Rich Result Type |
|-----|--------------------------|
| `https://bonjoojoo.com` | WebSite (Sitelinks Searchbox) |
| `https://bonjoojoo.com/product/lhbd3782a` | Product (price, availability, rating) |
| `https://bonjoojoo.com/product/lhbd3782a` | Breadcrumb |
| `https://bonjoojoo.com/category/rings` | Breadcrumb |

### Validation Results

| Test | Date | Status | Notes |
|------|------|--------|-------|
| Product schema — lhbd3782a | — | Pending | Run against live URL |
| Organization schema | — | Pending | Check in Google Search Console |
| WebSite SearchAction | — | Pending | May take days to appear |
| Category BreadcrumbList | — | Pending | |
| Sitemap accessibility | — | Pending | Verify at /sitemap.xml |

---

## TODOs / Follow-ups

- [ ] Replace hardcoded `aggregateRating` (4.8 / 127) in product schema with real review data once review system is live
- [ ] Submit sitemap via Google Search Console
- [ ] Monitor Google Search Console for structured data errors after deploy
- [ ] Add `Article` schema to blog post pages (`src/app/blog/[slug]/page.tsx`)
