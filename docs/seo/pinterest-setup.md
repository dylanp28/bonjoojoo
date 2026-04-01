# Pinterest Catalog & Shopping Setup Guide

Unlock Pinterest as a free, high-intent traffic channel for Bonjoojoo. Pinterest users actively search for jewelry and fashion — a verified catalog unlocks Shoppable Pins, Collections, and Shopping Ads.

---

## Step 1 — Create a Pinterest Business Account

1. Go to [pinterest.com/business/create](https://pinterest.com/business/create).
2. Sign up with the business email (e.g. `hello@bonjoojoo.com`).
3. Select **Jewelry** as the business type and complete the profile (logo, bio, website URL `https://bonjoojoo.com`).
4. If you already have a personal account, convert it: **Settings → Account → Convert to Business**.

---

## Step 2 — Verify the Bonjoojoo Domain

Domain verification proves you own the site and unlocks analytics and catalog features.

### HTML meta tag method (already implemented)

A placeholder meta tag has been added to `src/app/layout.tsx`:

```html
<meta name="p:domain_verify" content="REPLACE_WITH_YOUR_CODE" />
```

1. In Pinterest Business Hub: **Settings → Claimed accounts → Claim website**.
2. Choose **Add HTML tag**.
3. Copy the `content` value from the tag Pinterest shows you.
4. In the repo, open `src/app/layout.tsx` and replace `REPLACE_WITH_YOUR_CODE` with the real value.
5. Deploy the change, then click **Verify** in Pinterest.

---

## Step 3 — Upload the Product Catalog

The feed is served at `https://bonjoojoo.com/pinterest-feed.xml` and auto-generates from the live product database — no manual updates needed.

1. In Pinterest Business Hub: **Catalogs → Add data source**.
2. Select **Scheduled fetch**.
3. Paste the feed URL: `https://bonjoojoo.com/pinterest-feed.xml`
4. Set fetch frequency: **Daily** (the feed has a 24-hour cache).
5. Click **Save and run** to trigger the first ingest.
6. Pinterest will validate the feed (usually within a few hours). Fix any errors flagged in the **Issues** tab.

**Feed fields provided:**

| Field | Notes |
|---|---|
| `g:id` | SKU or `productId-variantId` |
| `g:title` | Product name + variant |
| `g:description` | Product description |
| `g:link` | Product page URL |
| `g:image_link` | Primary variant image |
| `g:price` | USD, two decimal places |
| `g:availability` | `in stock` / `out of stock` |
| `g:brand` | `Bonjoojoo` |
| `g:product_type` | `Jewelry > Lab-Grown Diamond Jewelry` |
| `g:google_product_category` | `Apparel & Accessories > Jewelry` |
| `g:material` | Metal type (gold, platinum, etc.) |
| `g:item_group_id` | Groups variants of same product |

---

## Step 4 — Enable Pinterest Shopping Ads (Optional)

Once the catalog is verified and products are approved:

1. Go to **Ads → Create campaign → Shopping**.
2. Select the Bonjoojoo catalog as the product group.
3. Set a daily budget and target keywords (see tips below).
4. Shopping ads display product images, prices, and titles directly in the feed.

---

## Step 5 — Create Shoppable Pins

Shoppable Pins link directly to product pages and show real-time pricing.

1. When creating a new Pin, click **Add product link**.
2. Search your catalog and attach the relevant product.
3. Pins with product tags show a price badge and a direct shop button.

---

## 5 Pinterest-Specific Tips for Jewelry

### 1. Board Strategy
Create themed boards that map to buyer intent, not just product categories:
- **"Engagement Ring Ideas"** — high-search, high-intent
- **"Ethical Diamond Jewelry"** — sustainability angle, lower competition
- **"Lab-Grown Diamond Gifts"** — seasonal gift traffic
- **"Diamond Bracelet Stacks"** — trend-driven, repinnable

Maintain 3–5 active boards with at least 20 pins each. Pinterest rewards consistent, topical boards with greater distribution.

### 2. Pin Format — Vertical Images Win
Pinterest's algorithm heavily favors **2:3 ratio images (1000 × 1500 px)**. Use:
- Clean white or soft-grey background for product shots
- Lifestyle images of jewelry worn on real people
- Text overlay with USP ("IGI Certified", "Free Shipping", "Lab-Grown")

The existing product images are square/landscape — consider generating Pinterest-optimized crops for the top 10 SKUs first.

### 3. Keyword Optimization for Jewelry
Pinterest SEO works like Google — keywords in pin titles, descriptions, and board names drive discovery.

High-volume jewelry keywords to target:
- `lab grown diamond ring` / `lab created diamond ring`
- `ethical engagement ring`
- `diamond tennis bracelet`
- `gold diamond necklace`
- `moissanite vs lab diamond`

Add 3–5 keywords naturally into pin descriptions. Use Pinterest's **Keyword Planner** (under Ads) to discover search volume for jewelry terms.

### 4. Consistent Posting Cadence
Pinterest rewards fresh content over time, not spikes. Aim for:
- **5–10 pins per day** during the first 90 days (use a scheduler like Tailwind)
- Repin top-performing seasonal content 4–6 weeks before peak seasons (Valentine's Day, Mother's Day, holiday gifting)

### 5. Rich Pins for Products
Once the catalog is verified, Pinterest automatically enables **Product Rich Pins** for catalog items. These show live price and availability directly in the feed — no extra setup required. Make sure product pages include proper Open Graph tags (already implemented in `layout.tsx`) so Rich Pin data stays accurate.

---

## Tracking

- **Pinterest Analytics**: available in Business Hub after domain verification
- **UTM parameters**: add `?utm_source=pinterest&utm_medium=social&utm_campaign=catalog` to product links in the feed (optional — update `link` generation in `src/app/pinterest-feed.xml/route.ts`)
- **Google Analytics**: Pinterest traffic appears under `Social > Pinterest` once UTM tagging is active

---

## Checklist

- [ ] Create Pinterest Business account
- [ ] Verify domain (replace `REPLACE_WITH_YOUR_CODE` in `layout.tsx` and deploy)
- [ ] Upload catalog at `https://bonjoojoo.com/pinterest-feed.xml`
- [ ] Resolve any catalog ingestion errors
- [ ] Create 3–5 themed boards
- [ ] Schedule first 30 pins
- [ ] (Optional) Launch Shopping Ads campaign
