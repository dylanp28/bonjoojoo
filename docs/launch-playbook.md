# bonjoojoo — Launch Day Playbook

**Version:** 1.0
**Prepared by:** Operations Manager
**Date:** 2026-04-01
**Goal:** Zero-friction go-live + first revenue within hours of launch

---

## Table of Contents

1. [Credential Setup Checklist](#1-credential-setup-checklist)
2. [Go-Live Verification Checklist](#2-go-live-verification-checklist)
3. [Day 1 Marketing Action Plan (Hour-by-Hour)](#3-day-1-marketing-action-plan)
4. [First Week Revenue Targets & Leading Indicators](#4-first-week-revenue-targets--leading-indicators)
5. [Troubleshooting Guide — Top 5 Launch Issues](#5-troubleshooting-guide--top-5-launch-issues)

---

## 1. Credential Setup Checklist

Complete **all items below** before flipping the site live. Every env var must be set in **Vercel → Settings → Environment Variables** (not just in `.env.local`).

### 1.1 Database

| Env Var | How to Get It | Vercel? |
|---------|--------------|---------|
| `DATABASE_URL` | Create a PostgreSQL DB (Supabase, Neon, or Railway recommended). Format: `postgresql://user:password@host:5432/bonjoojoo_production` | ✅ Required |

**Steps:**
1. Go to [supabase.com](https://supabase.com) → New Project → copy the connection string from **Settings → Database**
2. Replace `[YOUR-PASSWORD]` with your DB password
3. Paste into Vercel env vars under name `DATABASE_URL`

---

### 1.2 Authentication

| Env Var | How to Get It | Vercel? |
|---------|--------------|---------|
| `JWT_SECRET` | Generate a random 32-char string: `openssl rand -base64 32` | ✅ Required |
| `NEXTAUTH_SECRET` | Same command above — use a **different** value | ✅ Required |
| `NEXTAUTH_URL` | Your production URL, e.g. `https://bonjoojoo.com` | ✅ Required |

---

### 1.3 Stripe (Payments) ← Critical Path

| Env Var | How to Get It | Vercel? |
|---------|--------------|---------|
| `STRIPE_SECRET_KEY` | [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API Keys → **Secret key** (starts with `sk_live_`) | ✅ Required |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page → **Publishable key** (starts with `pk_live_`) | ✅ Required |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → Add endpoint → copy **Signing secret** (starts with `whsec_`) | ✅ Required |

**Webhook endpoint URL to register in Stripe:**
```
https://bonjoojoo.com/api/stripe/webhook
```

**Events to subscribe to in Stripe:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `checkout.session.completed`
- `customer.subscription.created` (for future subscription features)

> ⚠️ **Important:** Use test keys (`sk_test_`, `pk_test_`) for pre-launch testing, then swap to live keys only when ready to go live.

---

### 1.4 Analytics

| Env Var | How to Get It | Vercel? |
|---------|--------------|---------|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | [analytics.google.com](https://analytics.google.com) → Admin → Data Streams → Web stream → copy `G-XXXXXXXXXX` | ✅ Required |
| `NEXT_PUBLIC_FB_PIXEL_ID` | [business.facebook.com/events_manager](https://business.facebook.com/events_manager) → Pixels → copy 15-16 digit Pixel ID | ✅ Required |

See `docs/analytics-setup.md` for full setup walkthrough.

---

### 1.5 Email (Klaviyo)

| Env Var | How to Get It | Vercel? |
|---------|--------------|---------|
| `KLAVIYO_API_KEY` | [klaviyo.com](https://www.klaviyo.com) → Account → Settings → API Keys → Create Private API Key | ✅ Required |
| `KLAVIYO_LIST_ID` | Klaviyo → Lists & Segments → click your main list → copy the ID from the URL | ✅ Required |

---

### 1.6 App Config

| Env Var | Value | Vercel? |
|---------|-------|---------|
| `NODE_ENV` | `production` | ✅ Required |
| `NEXT_PUBLIC_APP_URL` | `https://bonjoojoo.com` | ✅ Required |
| `NEXT_PUBLIC_SITE_NAME` | `bonjoojoo` | ✅ Required |

---

### 1.7 How to Add Variables to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → your bonjoojoo project
2. Click **Settings** → **Environment Variables**
3. For each variable: enter the **Name**, paste the **Value**, check ✅ **Production**
4. Click **Save**
5. After all variables are added → **Deployments** → click `...` → **Redeploy**

> ✅ **Checklist sign-off:** All env vars set in Vercel? Production deployment triggered? Domain DNS pointed? SSL active?

---

## 2. Go-Live Verification Checklist

Run through this **in order** immediately after deployment, before announcing to the public.

### 2.1 Site Health

- [ ] Home page loads at `https://bonjoojoo.com` in < 3 seconds
- [ ] Product pages render with correct images, prices, and descriptions
- [ ] No broken images (check Network tab in DevTools → filter by `img`)
- [ ] Mobile view looks correct on iOS Safari and Android Chrome
- [ ] LAUNCH20 discount code is active and applies 20% off at cart

### 2.2 Test Purchase (Stripe)

Use Stripe's test card to place a real order before going live:

1. Add any product to cart
2. Proceed to checkout
3. Enter test card: `4242 4242 4242 4242` / any future expiry / any CVC / any zip
4. Complete checkout
5. Confirm:
   - [ ] Order confirmation page appears with order number
   - [ ] Order appears in Stripe Dashboard → Payments
   - [ ] Order appears in your database / admin panel

> ⚠️ If using live keys, use a real card to place a $1 test order and immediately refund it via Stripe Dashboard.

### 2.3 Stripe Webhook Verification

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click your endpoint (`https://bonjoojoo.com/api/stripe/webhook`)
3. After the test purchase above, confirm:
   - [ ] `payment_intent.succeeded` event shows status **200**
   - [ ] No failed deliveries in the webhook log

If webhook fails: Check `STRIPE_WEBHOOK_SECRET` env var is correct and matches the signing secret shown in Stripe.

### 2.4 Order Confirmation Email

After the test purchase:
- [ ] Order confirmation email received within 5 minutes
- [ ] Email renders correctly on mobile
- [ ] Order details (product, price, order number) are accurate
- [ ] "Track order" link works (or remove if not yet live)
- [ ] FROM address shows `orders@bonjoojoo.com` (not a generic address)

If no email received: Check Klaviyo → Flows → Post-Purchase sequence is active and the API key is correct.

### 2.5 GA4 Event Verification

1. Open [analytics.google.com](https://analytics.google.com) → your property → **Realtime**
2. Open bonjoojoo.com in a new browser window
3. Confirm in Realtime:
   - [ ] `page_view` event fires on home page load
   - [ ] `view_item` event fires on product page load
4. Add item to cart → confirm:
   - [ ] `add_to_cart` event fires in Realtime
5. Complete test purchase → confirm:
   - [ ] `purchase` event fires with correct revenue value

If events not showing: Double-check `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set and deployment includes latest code.

### 2.6 Facebook Pixel Verification

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Visit bonjoojoo.com — confirm:
   - [ ] Pixel fires `PageView` on every page
   - [ ] Pixel Helper shows green (no errors)
3. View a product page → confirm `ViewContent` event fires
4. Add to cart → confirm `AddToCart` event fires

### 2.7 Final Pre-Launch Checks

- [ ] SSL certificate is valid (padlock shows in browser)
- [ ] `robots.txt` is set to allow indexing (not blocking search engines)
- [ ] Canonical URLs set correctly (no `www` vs non-`www` split)
- [ ] Privacy Policy and Terms & Conditions pages are live
- [ ] Return/refund policy is visible and linked in footer
- [ ] Contact email or form is working
- [ ] LAUNCH20 countdown timer is visible on homepage

> ✅ **All boxes checked? You're cleared for launch.**

---

## 3. Day 1 Marketing Action Plan

**Launch window:** Aim for Tuesday–Thursday, 10am EST (7am PST / 3pm GMT) for maximum reach.

### Hour-by-Hour Schedule

#### T-6 Hours (Pre-Launch Prep)

| Time | Action | Owner | Tool |
|------|--------|-------|------|
| T-6h | Verify all site checks from Section 2 are complete | Ops | Vercel / browser |
| T-6h | Confirm all social content is ready and scheduled in Buffer/Later | Marketing | Buffer / Later |
| T-6h | Activate `LAUNCH20` discount code (20% off, 48hr expiry) | Ops | Platform admin |
| T-6h | Enable countdown timer widget on homepage | Dev/Ops | Site settings |
| T-6h | Post Instagram Story 1: "6 hours. Something beautiful is coming." | Marketing | Instagram |
| T-4h | Send influencer outreach DMs — Batch 1 (5 of 10) | Marketing | Instagram DMs |
| T-2h | Post Instagram Story 2: Teaser — blurred product, "Almost time..." | Marketing | Instagram |
| T-30m | Final site check — load times, checkout flow, discount code | Ops | Browser |

---

#### Hour 0 — Launch

| Time | Action | Platform |
|------|--------|----------|
| T+0m | **GO LIVE** — Confirm Vercel deployment is up | Vercel |
| T+0m | Post **Instagram Feed Post 1** — "The Reveal" | Instagram |
| T+0m | Post **TikTok Video 1** — "Every Milestone" | TikTok |
| T+0m | Post Instagram Story 3: "🚨 WE'RE LIVE! Use LAUNCH20 for 20% off" | Instagram |
| T+0m | Post to Pinterest: Product collection board + first 5 product pins | Pinterest |
| T+5m | Verify GA4 Realtime shows traffic spike | GA4 |
| T+5m | Verify Stripe dashboard shows test activity | Stripe |

---

#### Hours 1–3

| Time | Action | Platform |
|------|--------|----------|
| T+1h | Send **Launch Email #1**: "We're live. This is the moment." | Klaviyo |
| T+1h | Post Instagram Story 4: Promo reminder + countdown timer sticker | Instagram |
| T+1h | DM Batch 2 of influencers (remaining 5 of 10) | Instagram |
| T+2h | Check Stripe dashboard — any real orders? Screenshot for social proof | Stripe |
| T+2h | Post Instagram Story 5: "Our first customers are already checking out 🙌" | Instagram |
| T+3h | Respond to all Instagram/TikTok comments and DMs | Instagram/TikTok |
| T+3h | Activate **Google Shopping** campaign (if budget available) | Google Ads |

---

#### Hours 4–8

| Time | Action | Platform |
|------|--------|----------|
| T+4h | Activate **Meta Ads** — Bridal + Luxury audiences ($25/day each) | Meta Ads Manager |
| T+4h | Post Instagram Story 6: "But are lab diamonds real?" FAQ story | Instagram |
| T+6h | Post **TikTok Video 2** — "Price Comparison" | TikTok |
| T+6h | Send outreach to 3 target journalists (press release + pitch) | Email |
| T+7h | Check order count — if >0, post social proof to stories | Instagram |
| T+8h | Review Meta Ads delivery — any issues with creative approval? | Meta Ads Manager |

---

#### Hours 8–16 (Afternoon/Evening)

| Time | Action | Platform |
|------|--------|----------|
| T+10h | Post **Instagram Feed Post 2** — "Science of Beauty" carousel | Instagram |
| T+10h | Post Instagram Story 7: "Day 1 wrap — we're overwhelmed by your love 🤍" | Instagram |
| T+12h | Send **Launch Email #2**: "24 hours left — LAUNCH20 ends tonight" | Klaviyo |
| T+12h | Check in on influencer DM responses — follow up if needed | Instagram |
| T+14h | Activate **Pinterest Promoted Pins** (optional, if budget allows) | Pinterest |
| T+16h | Review GA4 dashboard: sessions, bounce rate, top products viewed | GA4 |

---

#### End of Day 1 (Hours 16–24)

| Time | Action | Platform |
|------|--------|----------|
| T+18h | Evening check: Stripe revenue total, order count | Stripe |
| T+18h | Respond to all remaining comments and DMs | All socials |
| T+20h | Post TikTok: "We launched. Here's what happened." (day recap video) | TikTok |
| T+22h | Final social story: "LAUNCH20 expires in [X] hours" | Instagram |
| T+23h | Send **Launch Email #3**: "Last 6 hours. Don't miss this." | Klaviyo |
| T+24h | Day 1 debrief: record revenue, orders, traffic, top source | Spreadsheet |

---

### Day 2 Actions

- [ ] **Deactivate LAUNCH20** after 48-hour window (or extend if needed)
- [ ] Switch to evergreen welcome offer: **WELCOME10** (10% off, no expiry)
- [ ] Update homepage banner: remove countdown, add "New arrivals" or evergreen CTA
- [ ] Post Day 2 Instagram feed content (per social calendar in `docs/launch-marketing-plan.md`)
- [ ] Follow up on any influencer DM responses → send product gifting details
- [ ] Review which ad creative is performing → pause underperformers by Day 3

---

## 4. First Week Revenue Targets & Leading Indicators

### 4.1 Week 1 Revenue Goal: $5,000

To hit $5K MRR in Week 1 (interpreted as Week 1 revenue, not recurring), the following model applies:

| Metric | Target |
|--------|--------|
| **Total Revenue** | $5,000 |
| **Avg Order Value (AOV)** | $350 |
| **Orders needed** | ~14–15 orders |
| **Daily order target** | ~2 orders/day |

> Context: Lab-grown diamond jewelry averages $250–$800 per order for entry-level pieces. At $350 AOV with LAUNCH20 (20% off), customers are effectively buying ~$440 pre-discount items.

---

### 4.2 Traffic Targets

| Metric | Day 1 | Week 1 Total |
|--------|-------|-------------|
| Sessions | 500–1,000 | 2,500–5,000 |
| Unique visitors | 400–800 | 2,000–4,000 |
| Bounce rate | < 60% | < 55% |
| Pages per session | > 2.5 | > 3.0 |
| Avg session duration | > 1:30 | > 2:00 |

---

### 4.3 Conversion Rate Targets

| Funnel Stage | Target Rate | Target Count (Week 1) |
|-------------|-------------|----------------------|
| Sessions → Product Page View | > 50% | 1,250+ |
| Product Page → Add to Cart | > 8% | 100+ |
| Add to Cart → Checkout Initiated | > 50% | 50+ |
| Checkout → Purchase | > 25% | 14–15 orders |
| **Overall Conversion Rate** | **0.3–0.6%** | **14–15 orders** |

> Luxury ecommerce typical CVR is 0.3–1.5%. At 0.5% with 3,000 sessions: 15 orders.

---

### 4.4 Leading Indicators (Check Daily)

Monitor these every morning. If below target by Day 3, activate recovery tactics.

| Indicator | Green (on track) | Yellow (monitor) | Red (act now) |
|-----------|-----------------|-----------------|--------------|
| Daily sessions | > 400 | 200–400 | < 200 |
| Add-to-cart rate | > 6% | 3–6% | < 3% |
| Checkout initiation rate | > 40% of carts | 25–40% | < 25% |
| Daily orders | ≥ 2 | 1 | 0 |
| Email open rate | > 30% | 20–30% | < 20% |
| Instagram story views | > 300/story | 100–300 | < 100 |
| Influencer DM reply rate | > 30% | 15–30% | < 15% |

---

### 4.5 Recovery Tactics (If Targets Not Met)

| Scenario | Action |
|----------|--------|
| Low traffic | Double organic posting cadence; activate paid ads if not running |
| High traffic, low add-to-cart | Review product page: pricing clarity, image quality, CTA button placement |
| High add-to-cart, low checkout | Review checkout UX; add trust badges; confirm payment methods visible |
| High checkout abandonment | Trigger abandoned cart email sequence via Klaviyo (1hr delay) |
| Low social engagement | Switch from product-only content to founder story / educational content |
| Influencers not responding | Expand outreach to next tier (5K–10K nano-influencers, faster response rate) |

---

### 4.6 Week 1 Email List Growth Target

| Metric | Target |
|--------|--------|
| Net new email subscribers | 150–300 |
| Email capture rate (of sessions) | 5–8% |
| Welcome email open rate | > 40% |
| Welcome email click-through rate | > 10% |

---

## 5. Troubleshooting Guide — Top 5 Launch Issues

### Issue 1: Stripe Payments Not Processing

**Symptoms:** Customers reach checkout but payment fails or page errors on submit.

**Diagnosis Steps:**
1. Check Stripe Dashboard → Payments → look for failed payment intents
2. Check Stripe Dashboard → Developers → Logs → filter by errors
3. Check Vercel → Deployments → Functions → look for errors on `/api/stripe/create-payment-intent`

**Common Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| `STRIPE_SECRET_KEY` is test key but site is in production mode | Swap to live key in Vercel env vars, redeploy |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` mismatch (test vs live) | Both keys must be same environment (both test OR both live) |
| Stripe account not activated for live payments | Go to Stripe → Activate account → complete business verification |
| Card declined (3D Secure challenge not handled) | Check that 3DS is handled in checkout flow; test with `4000 0025 0000 3155` |
| Webhook signature mismatch | Regenerate webhook secret in Stripe → update `STRIPE_WEBHOOK_SECRET` → redeploy |

---

### Issue 2: Site Down or 500 Error After Deployment

**Symptoms:** Site returns 500 error, blank page, or Vercel error page.

**Diagnosis Steps:**
1. Go to Vercel → Deployments → click latest deployment → **Functions** tab
2. Look for failed function invocations and read error logs
3. Check **Build Logs** for compile errors

**Common Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| Missing environment variable | Check all required env vars are set in Vercel; redeploy after adding |
| `DATABASE_URL` unreachable | Whitelist Vercel's IP ranges in your database firewall, or enable "Allow all" temporarily |
| Build error in TypeScript | Run `npm run build` locally to reproduce; fix type errors |
| Node.js version mismatch | Set `"engines": {"node": "18.x"}` in `package.json`; check Vercel project settings |
| Out of memory on serverless function | Split large API routes; increase function memory in `vercel.json` |

**Emergency rollback:**
```bash
# In Vercel dashboard → Deployments → previous working deployment → Promote to Production
```

---

### Issue 3: Order Confirmation Emails Not Sending

**Symptoms:** Customers complete purchase but receive no confirmation email.

**Diagnosis Steps:**
1. Check Klaviyo → Activity Feed → look for failed sends
2. Check Klaviyo → Flows → Post-Purchase flow → is it **Live** (not Draft)?
3. Check Vercel function logs for `/api/stripe/webhook` errors

**Common Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| Klaviyo flow is in Draft mode | Klaviyo → Flows → Post-Purchase → click **Manual** → set to **Live** |
| `KLAVIYO_API_KEY` is wrong or expired | Regenerate in Klaviyo → Settings → API Keys → update in Vercel → redeploy |
| Stripe webhook not firing (email triggered by webhook) | See Issue 1 for webhook fix; confirm `checkout.session.completed` event is subscribed |
| Email in spam | Ask customers to check spam; add SPF/DKIM records to your domain DNS |
| `KLAVIYO_LIST_ID` is wrong | Verify list ID in Klaviyo → Lists & Segments → click list → check URL for ID |

**Quick test:** Manually trigger the Klaviyo Post-Purchase flow for a test profile to verify the email renders correctly.

---

### Issue 4: GA4 Not Tracking / Events Missing

**Symptoms:** GA4 Realtime shows no activity, or purchase events don't fire.

**Diagnosis Steps:**
1. Open bonjoojoo.com in Chrome → DevTools → Console → look for GA4 errors
2. Install [GA4 Debugger](https://chrome.google.com/webstore/detail/ga-debugger/) extension
3. Check Network tab → filter by `collect?v=2` to see GA4 hits

**Common Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` not set | Add to Vercel env vars → redeploy |
| Ad blocker blocking GA4 | Test in incognito with no extensions |
| GA4 script not loading (CSP header blocking) | Check `next.config.js` Content Security Policy allows `https://www.googletagmanager.com` |
| Events fire on client but not server-side | Ensure GA4 events are in client components (not server components in Next.js App Router) |
| Wrong data stream | Confirm the Measurement ID matches your **web** data stream, not an app stream |

---

### Issue 5: Checkout Abandonment Spike (> 70% abandon rate)

**Symptoms:** Many carts initiated, very few completed. Revenue well below traffic targets.

**Diagnosis Steps:**
1. GA4 → Funnels → trace drop-off between `begin_checkout` and `purchase`
2. Record a session using Hotjar or Microsoft Clarity (free) to watch real user recordings
3. Test checkout yourself on mobile (iOS Safari most common failure point)

**Common Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| Required account creation before checkout | Enable guest checkout; never force account creation |
| Shipping cost surprise at final step | Show shipping cost on product/cart page; offer free shipping threshold |
| No visible trust signals at checkout | Add Stripe badge, SSL badge, money-back guarantee near payment form |
| Checkout not mobile-optimized | Test on real iPhone with Safari; fix any overflow or input issues |
| Slow checkout page load (> 3s) | Reduce bundle size; defer non-critical JS; use Vercel Edge Network |
| Payment method missing (no Apple Pay / Google Pay) | Enable Stripe Payment Request Button for 1-click checkout |
| Promo code field causes confusion | Make LAUNCH20 field obvious but not distracting; pre-fill if possible |

**Immediate recovery if abandonment > 70%:**
1. Activate Klaviyo abandoned cart flow (1-hour delay email with LAUNCH20 reminder)
2. Lower friction: remove any non-essential checkout fields
3. Add a live chat widget (Tidio free tier) to handle purchase objections in real time

---

## Launch Day Quick Reference Card

```
LAUNCH20 Code: 20% off, valid 48 hours from go-live

Key URLs:
  Site:          https://bonjoojoo.com
  Vercel:        https://vercel.com/dashboard
  Stripe:        https://dashboard.stripe.com
  GA4:           https://analytics.google.com
  Klaviyo:       https://www.klaviyo.com
  Meta Ads:      https://www.facebook.com/adsmanager
  Google Ads:    https://ads.google.com

Stripe Test Card:  4242 4242 4242 4242 | Any future date | Any CVC

Day 1 Order Target: 2+ orders
Week 1 Revenue Target: $5,000
Week 1 Traffic Target: 2,500–5,000 sessions
```

---

*Document maintained by: Operations Manager Agent | bonjoojoo*
*Last updated: 2026-04-01*
*Related docs: `docs/launch-marketing-plan.md` | `docs/analytics-setup.md` | `docs/email-sequences.md` | `DEPLOYMENT_GUIDE.md`*
