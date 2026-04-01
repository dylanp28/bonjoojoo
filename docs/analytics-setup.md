# bonjoojoo — Analytics & Pixel Setup Guide

**GA4 + Facebook Pixel conversion tracking is implemented and ready.**
You just need to fill in the real IDs in your environment variables.

---

## Step 1 — Set Your Environment Variables

Open `.env.local` in the project root and add the following two lines:

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXXXXX
```

Replace the values with your real IDs (see Step 2 and Step 3 below to find them).

> **Important:** Both variables must start with `NEXT_PUBLIC_` so Next.js exposes them to the browser. Never use these for server-side secrets — they are intentionally public.

---

## Step 2 — Get Your GA4 Measurement ID

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select (or create) your **bonjoojoo** GA4 property
3. Click **Admin** (gear icon, bottom left)
4. Under **Property**, click **Data Streams**
5. Click your web stream
6. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`

Paste it as `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in `.env.local`.

---

## Step 3 — Get Your Facebook Pixel ID

1. Go to [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. Select your **bonjoojoo** ad account
3. Click **Connect Data Sources** → **Web**
4. Choose **Facebook Pixel** → **Connect**
5. If you already have a Pixel, click it to view the **Pixel ID** (a 15–16 digit number)
6. Copy the Pixel ID

Paste it as `NEXT_PUBLIC_FB_PIXEL_ID` in `.env.local`.

---

## Step 4 — Redeploy

If you're using Vercel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add both `NEXT_PUBLIC_GA4_MEASUREMENT_ID` and `NEXT_PUBLIC_FB_PIXEL_ID`
3. Redeploy (push to main or trigger manually)

For local development, just restart `npm run dev` after editing `.env.local`.

---

## What's Tracking

Once the IDs are set, the following events fire automatically:

| Event | When | GA4 | FB Pixel |
|-------|------|-----|----------|
| **PageView** | Every page load | `page_view` (auto) | `PageView` |
| **ViewContent** | Product page loaded | `view_item` | `ViewContent` |
| **AddToCart** | Item added to cart | `add_to_cart` | `AddToCart` |
| **Purchase** | Order confirmed at checkout | `purchase` | `Purchase` |

### Purchase event includes:
- Transaction ID (order number)
- Revenue (total, subtotal, shipping, tax)
- Promo/coupon code (if used)
- Line items (product IDs, names, prices, quantities)

---

## Verify It's Working

### GA4
1. Open your site in a browser
2. In GA4, go to **Reports** → **Realtime**
3. You should see your session appear within 30 seconds

### Facebook Pixel
1. Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Open your bonjoojoo site
3. The extension will show a green checkmark and list active events

---

## Files Modified

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Added GA4 `<Script>` and FB Pixel `<Script>` tags |
| `src/lib/analytics/events.ts` | New — lightweight `trackViewContent`, `trackAddToCart`, `trackPurchase` helpers |
| `src/app/product/[id]/page.tsx` | Added `trackViewContent` on product load |
| `src/store/useCart.ts` | Added `trackAddToCart` in `addItem` |
| `src/app/checkout/page.tsx` | Added `trackPurchase` in `handlePlaceOrder` |

---

*Setup guide written by bonjoojoo Marketing Team.*
