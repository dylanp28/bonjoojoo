# Affiliate Referral Tracking — Technical Documentation

_Last updated: April 2026_
_Implemented in: [DYL-159](/DYL/issues/DYL-159)_

---

## Overview

Bonjoojoo's affiliate tracking system captures influencer/affiliate referral codes from the `?ref=` URL parameter and attributes purchases to the originating affiliate. The system uses **localStorage** for client-side persistence with a **30-day expiry**, which matches the affiliate program's stated cookie window.

---

## Attribution Flow

```
Influencer shares link:
  https://bonjoojoo.com/?ref=THERINGWHISPERER

                    ↓

User lands on any bonjoojoo.com page
  → ClientLayout mounts → useAffiliateRefCapture() fires
  → Reads ?ref=CODE from URL
  → Writes { code, capturedAt, expiresAt } to localStorage key: bonjoojoo_ref
  → Expiry set to 30 days from capture time

                    ↓

User browses (any number of pages/sessions, within 30 days)

                    ↓

User reaches checkout
  → handlePlaceOrder() calls getAffiliateRef()
  → Reads and validates localStorage entry (checks expiry)
  → If valid: includes affiliateRef: "THERINGWHISPERER" in order object
  → Order saved to localStorage (bonjoojoo-orders) with ref code
  → If expired or absent: affiliateRef: null

                    ↓

Order data is available for commission calculation
```

---

## Implementation Details

### Hook: `src/hooks/useAffiliateRef.ts`

| Export | Purpose |
|--------|---------|
| `useAffiliateRefCapture()` | Call once at layout level — reads `?ref=` on mount and writes to localStorage |
| `getAffiliateRef()` | Synchronous read; returns current valid code or `null` |
| `useAffiliateRef()` | Hook wrapper around `getAffiliateRef` for reactive use |

**localStorage schema:**
```json
{
  "code": "THERINGWHISPERER",
  "capturedAt": "2026-04-01T12:00:00.000Z",
  "expiresAt": "2026-05-01T12:00:00.000Z"
}
```
Key: `bonjoojoo_ref`

**Overwrite behaviour:** A new `?ref=` parameter always overwrites the stored code (last-click attribution model, consistent with program policy).

### Integration: `src/components/ClientLayout.tsx`

`useAffiliateRefCapture()` is called inside `ClientLayout`, which wraps every page in the app. This ensures any landing page with a `?ref=` parameter is captured on the first render.

### Integration: `src/app/checkout/page.tsx`

In `handlePlaceOrder()`:
```ts
const order = {
  // ... existing fields ...
  affiliateRef: getAffiliateRef() ?? null,
}
```

The `affiliateRef` field travels with the order into localStorage and is available for any backend sync job or order review.

---

## Affiliate URL Format

```
https://bonjoojoo.com/?ref=<CODE>
```

Codes are uppercase, alphanumeric, derived from the affiliate's handle. The `?ref=` parameter can be appended to any page URL — product pages, homepage, category pages.

### Priority Influencer URLs (Wave 1)

| Affiliate | Handle | URL | Discount Code |
|-----------|--------|-----|---------------|
| The Ring Whisperer | @theringwhisperer | `bonjoojoo.com/?ref=THERINGWHISPERER` | `THERINGWHISPERER15` |
| Clara Moss | @claramoss.nyc | `bonjoojoo.com/?ref=CLARAMOSSNYC` | `CLARAMOSSNYC15` |
| Sienna Wears Jewels | @siennawearsjewels | `bonjoojoo.com/?ref=SIENNAWEARSJEWELS` | `SIENNAWEARSJEWELS15` |
| Diamond Diaries | @diamonddiaries_ | `bonjoojoo.com/?ref=DIAMONDDIARIES` | `DIAMONDDIARIES15` |
| Stacked & Styled | @stackedandstyled | `bonjoojoo.com/?ref=STACKEDANDSTYLED` | `STACKEDANDSTYLED15` |

_Note: Discount codes (`[HANDLE]15`) give the customer 15% off and are tracked separately from the `?ref=` link. Both attribution signals are present in the order object when a customer uses both._

---

## Pages

| Route | Description |
|-------|-------------|
| `/affiliate` | Public-facing affiliate program page — benefits, commission tiers, application form |
| `/affiliate/dashboard` | Affiliate dashboard stub — "Coming Soon" placeholder for post-launch |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/affiliate/signup` | POST | Receives application form data, sends email to board via Resend |

**Signup request schema:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "handle": "string (required)",
  "platform": "string (optional)",
  "followers": "string (optional)",
  "niche": "string (optional)",
  "message": "string (optional)"
}
```

Emails `BOARD_EMAIL` (env var, falls back to `hello@bonjoojoo.com`). If `RESEND_API_KEY` is not set, logs to console instead of failing.

---

## Commission Structure

| Parameter | Detail |
|-----------|--------|
| Base commission | 15% of sale value |
| Cookie window | 30 days (last-click) |
| Average order value | ~$900 |
| Average commission | ~$135 |
| Payout | Monthly, net-30, PayPal or bank transfer |
| Minimum payout | $50 |
| Code format | `[HANDLE]15` — 15% customer discount, tracked separately |

**Performance tiers (after 90 days):**

| Tier | Monthly Sales | Rate |
|------|--------------|------|
| Standard | $0–$2,000 | 15% |
| Silver | $2,001–$5,000 | 18% |
| Gold | $5,001–$10,000 | 20% |
| Elite | $10,000+ | 22% + quarterly bonus |

---

## Future Work

- **Server-side attribution:** Store `affiliateRef` in the Postgres orders table when database is live.
- **Commission calculation job:** Monthly batch job to sum `affiliateRef` sales and generate payout reports.
- **Affiliate dashboard:** Real-time earnings, click counts, payout history at `/affiliate/dashboard`.
- **Formal tracking platform:** Migrate to Refersion, Impact, or ShareASale for production-scale affiliate management (see `docs/outreach/influencer-kit.md` checklist).
- **UTM passthrough:** Append `utm_source` and `utm_campaign` alongside `?ref=` for GA4 attribution.

---

_See also: [docs/outreach/influencer-kit.md](./influencer-kit.md) for the full outreach program details._
