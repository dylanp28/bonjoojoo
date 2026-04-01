# Google Merchant Center Feed — Notes & Spec Validation

**Feed URL:** `https://bonjoojoo.com/feed.xml`
**Route:** `src/app/feed.xml/route.ts`
**Last updated:** 2026-04-01

---

## Feed Overview

| Field | Value |
|-------|-------|
| Format | RSS 2.0 with Google Base namespace (`xmlns:g`) |
| SKUs | 46 (one entry per variant — one per metal/finish) |
| Auto-generated | Yes — dynamically built from `productGroups` in `src/data/productGroups.ts` |
| Cache | 24 h (`s-maxage=86400, stale-while-revalidate`) |

---

## Fields Implemented

| Field | Source | Notes |
|-------|--------|-------|
| `g:id` | `variant.sku` | Unique per variant/SKU |
| `g:title` | `product.name — variant.name` | Includes metal type |
| `g:description` | `product.description` | Full description |
| `g:link` | `/product/{product.id}` | Canonical product page |
| `g:image_link` | `variant.images[0]` | First variant image, absolute URL |
| `g:price` | `variant.price ?? product.basePrice` | USD, 2 decimal places |
| `g:availability` | `variant.inStock` | `in stock` / `out of stock` |
| `g:brand` | `"Bonjoojoo"` | Hardcoded |
| `g:condition` | `"new"` | All products are new |
| `g:google_product_category` | `"Apparel & Accessories > Jewelry"` | Google taxonomy string |
| `g:item_group_id` | `product.id` | Groups variants by base product |
| `g:mpn` | `variant.sku` | Manufacturer part number |
| `g:material` | `variant.metal` | e.g., "14k Yellow Gold" |
| `g:shipping` | Free US Standard | Matches shipping policy |

---

## Gaps & Recommended Improvements

### High Priority

| Gap | Details | Action |
|-----|---------|--------|
| **`g:additional_image_link`** | Only first variant image is used. Multi-image products lose supplementary gallery shots. | Add remaining `variant.images` as `additional_image_link` elements (max 10) |
| **`g:identifier_exists`** | No `GTIN` (UPC/EAN/ISBN) is set. Google recommends either a GTIN or explicit `<g:identifier_exists>false</g:identifier_exists>`. Without it, Google may flag items as missing identifiers. | Add `<g:identifier_exists>false</g:identifier_exists>` for now; source GTINs from supplier if available |
| **`g:color`** | Metal/finish is in `g:material` but `g:color` is a separate recommended attribute for jewelry. | Extract color from `variant.metal` (e.g., "Yellow Gold", "Rose Gold", "White Gold") |

### Medium Priority

| Gap | Details | Action |
|-----|---------|--------|
| **`g:size`** | Rings have no ring-size data (one size listing covers all sizes). Google accepts "One Size" for jewelry. | Add `<g:size>One Size</g:size>` or pass ring size if offered as a variant |
| **`g:sale_price`** | `product.originalPrice` > `product.basePrice` for sale items, but `g:sale_price` is not emitted. | If `originalPrice > basePrice`, set `g:price` to `originalPrice` and `g:sale_price` to `basePrice` |
| **`g:sale_price_effective_date`** | If sale prices are added, a date range improves feed quality. | Set once sale logic is confirmed |
| **`g:product_highlight`** | Short bullet points improve Shopping ad display. | Add 2–5 bullet points per product from `product.features` (currently empty — populate) |
| **`g:age_group` / `g:gender`** | Not present. Jewelry is typically `adult` / `female` or `unisex`. | Add `<g:age_group>adult</g:age_group><g:gender>female</g:gender>` |

### Low Priority

| Gap | Details | Action |
|-----|---------|--------|
| **`g:shipping_weight`** | Not present. Required for calculated shipping; not needed for flat-rate free shipping. | Skip unless Merchant Center requests it |
| **`g:tax`** | Not specified. US default: Merchant Center inherits account-level tax settings. | Configure at account level in Merchant Center; no feed change needed |
| **`g:certification`** | Lab-grown diamond certification (IGI, GIA) is a selling point. | Add as `g:certification` or in `g:description` |

---

## Feed Validation Checklist

- [ ] Submit feed URL in Google Merchant Center → Products → Feeds
- [ ] Run **Feed Rules** to map `g:google_product_category` if Google taxonomy ID is preferred (`166` maps to Jewelry)
- [ ] Check **Diagnostics** tab in Merchant Center for missing attributes and warnings
- [ ] Verify `g:image_link` URLs return 200 and are crawlable (not blocked by auth or robots.txt)
- [ ] Confirm `Disallow: /images/` is NOT present in `robots.txt` — image URLs must be indexable
- [ ] Test via [Google Merchant Center feed preview](https://merchants.google.com)

---

## Keeping the Feed in Sync

The feed is 100% derived from `src/data/productGroups.ts` and the per-category files in `src/data/products/`. Adding or updating a product group automatically updates the feed on the next request — no separate feed file to maintain.
