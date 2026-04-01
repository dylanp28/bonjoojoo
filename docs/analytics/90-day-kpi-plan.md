# bonjoojoo — 90-Day Post-Launch KPI Dashboard Plan

**Prepared by:** Data Analyst
**Date:** 2026-04-01
**Objective:** Define the exact metrics to track in the first 90 days to know if bonjoojoo is on track for $5K MRR — and precisely what to do when we're not.

---

## Context

bonjoojoo is a luxury lab-grown diamond jewelry ecommerce store (Next.js). Key reality checks from revenue modeling:

- **Catalog AOV:** $850 (conservative) → $1,200 (base) → $1,800 (premium)
- **Orders needed for $5K MRR:** 3–6/month (not dozens)
- **Traffic needed at 1% CVR:** ~500 sessions/month at $1,200 AOV
- Every single order and visitor matters at this stage — track everything

---

## 1. Primary KPIs (Revenue-Critical — Check Weekly)

These 7 metrics directly determine whether we hit $5K MRR.

| # | KPI | Definition | Target |
|---|-----|-----------|--------|
| 1 | **Weekly Revenue ($)** | Gross sales (before refunds) in the past 7 days | Week 4: $1,250; Month 2: $2,500; Month 3: $5,000 |
| 2 | **Orders** | Completed checkout events | 1–2/week by Week 4; 5–6/month by Month 3 |
| 3 | **Average Order Value (AOV)** | Revenue ÷ Orders | ≥$1,000 (base), target $1,200+ |
| 4 | **Conversion Rate (CVR)** | Orders ÷ Sessions × 100 | ≥1.0% by Month 2; ≥1.5% by Month 3 |
| 5 | **CAC by Channel** | Ad spend ÷ New customers (per channel) | ≤$300 (≤25% of $1,200 AOV) |
| 6 | **Email List Growth** | New subscribers per week | +50/week (launch), +20/week (steady) |
| 7 | **Refund Rate** | Refunds ÷ Orders × 100 | <5% |

**Source:** Stripe (revenue/orders/AOV), GA4 (CVR/sessions), Meta/Google Ads (CAC), Klaviyo/Mailchimp (email), Stripe (refunds)

---

## 2. Secondary KPIs (Diagnostic — Review Weekly, Deep Dive Monthly)

These 6 metrics explain *why* primary KPIs are or aren't hitting targets.

| # | KPI | Definition | Benchmark |
|---|-----|-----------|-----------|
| 1 | **Sessions by Channel** | GA4 source/medium breakdown | Organic: 30%, Paid: 40%, Direct/Email: 30% |
| 2 | **Bounce Rate** | % sessions leaving after 1 page | <65% (luxury traffic is research-heavy) |
| 3 | **Cart Abandonment Rate** | Add-to-cart ÷ Completed checkout | <75% (industry avg is 70–80% for luxury) |
| 4 | **Loyalty Points Issued** | Points awarded per week (if loyalty live) | Track as proxy for repeat engagement |
| 5 | **Reviews Submitted** | Product reviews collected | ≥1 review per 3 orders; target 5 by Month 2 |
| 6 | **Affiliate Clicks/Conversions** | Clicks and orders from affiliate links | Track ROAS; aim for positive CAC vs. direct |

**Source:** GA4 (sessions/bounce/cart abandonment), loyalty platform, review app, affiliate dashboard

---

## 3. Weekly Review Template — Monday Morning (15 minutes)

Run every Monday morning before 9am. Copy this checklist.

```
## bonjoojoo Weekly Review — [Date]

### Revenue Pulse (5 min)
[ ] Last 7 days revenue: $______  (target: $______)
[ ] Orders this week: ____  (target: 1-2)
[ ] AOV this week: $______  (target: $1,200+)
[ ] Month-to-date revenue: $______  (on track for $______/month)

### Traffic & Conversion (5 min)
[ ] Sessions last 7 days: ______  (target: ______)
[ ] CVR: ______%  (target: 1.0%+)
[ ] Top traffic source: ______  | Sessions: ______
[ ] Cart abandonment rate: ______%  (target: <75%)

### Growth Signals (3 min)
[ ] New email subscribers: ______  (target: +20/week)
[ ] New product reviews: ______
[ ] Any refunds/complaints: ______

### Action Item
[ ] One thing to fix or test this week: ______________________

### Notes
______
```

**Tools to have open:** Stripe dashboard (revenue/orders), GA4 (traffic/CVR), Klaviyo (email list)

---

## 4. Milestone Targets — "On Track for $5K MRR" Checkpoints

### Week 1 — Proof of Life
| Metric | Target | What It Signals |
|--------|--------|----------------|
| Sessions | 100–200 | Site is reachable, basic SEO/ads live |
| CVR | >0% (any order) | Checkout works end-to-end |
| Revenue | $0–$1,200 (1 order) | First sale validates funnel |
| Email signups | 25+ | Capture working |
| Bounce rate | <80% | Landing page is relevant |

**Green flag:** Any paying customer. Stripe confirms payment processing.
**Red flag:** Zero sessions after 5 days — check analytics setup.

---

### Month 1 (Days 1–30) — Finding Signal
| Metric | Target | Notes |
|--------|--------|-------|
| Monthly Revenue | $1,000–$2,500 | 1–2 orders at $1,200 AOV |
| Orders | 1–2 | Validate there's demand at price point |
| CVR | 0.5–1.0% | Baseline established |
| CAC (paid) | <$600 | Keep ad spend ≤50% of first order AOV |
| Email list | 100+ subscribers | Foundation for future owned traffic |
| Cart abandonment | Track only | Baseline — do not optimize yet |
| Reviews | 0–1 | Ask first buyers personally |

**On track signal:** At least 1 organic or referral session converting. Any paid channel showing ROAS ≥1.5x.

---

### Month 2 (Days 31–60) — Scaling What Works
| Metric | Target | Notes |
|--------|--------|-------|
| Monthly Revenue | $2,500–$4,000 | 2–3 orders at $1,200+ AOV |
| Orders | 2–3/month | Consistent weekly activity |
| CVR | 1.0–1.5% | Improving with social proof |
| CAC | <$400 | Optimize best-performing channel |
| Email list | 250+ subscribers | Run 1 abandoned cart sequence |
| Cart abandonment | <78% | Recovery emails live |
| Reviews | 3+ reviews on site | Boosts CVR 15–30% |
| Affiliate revenue | First affiliate sale | 1 active affiliate/influencer |

**On track signal:** Repeat traffic from email/retargeting. Month-on-month revenue growing ≥50%.

---

### Month 3 (Days 61–90) — Hit or Miss $5K
| Metric | Target | Notes |
|--------|--------|-------|
| Monthly Revenue | $5,000+ | 5–6 orders at $1,000 AOV (or 3 at $1,800) |
| Orders | 5–6/month | ~1–2/week |
| CVR | 1.5–2.0% | Optimized PDP, reviews, trust signals |
| CAC blended | <$250 | Organic + email reduce blended CAC |
| Email list | 500+ subscribers | Segment by engaged/purchasers |
| LTV signal | Any repeat customer | Even 1 repeat = strong positive signal |
| Refund rate | <5% | Quality + expectation setting dialed in |

**On track signal at Week 10:** Monthly revenue run-rate ≥$3,500, CVR ≥1.0%, at least 1 paid channel ROAS positive.

---

## 5. Free Tool Dashboard Stack

| Tool | What to Track | Setup Time |
|------|--------------|------------|
| **GA4** | Sessions, CVR, traffic sources, bounce rate, cart abandonment, funnel visualization | 30 min (analytics.google.com) |
| **Stripe Dashboard** | Revenue, orders, AOV, refunds, MRR trend, payment method breakdown | 0 min (already in Stripe) |
| **Vercel Analytics** | Real user performance (Core Web Vitals), page load times, geographic traffic | 5 min (enable in Vercel project settings) |
| **Google Search Console** | Organic search impressions, clicks, top queries, index coverage | 15 min (verify site ownership) |
| **Meta Ads Manager** | Paid social CPM, CPC, ROAS, audience reach | Free with Meta ad account |
| **Klaviyo Free Tier** | Email open rates, CTR, revenue per email, list growth | Free up to 250 contacts |

**Priority order for setup:** Stripe (live) → GA4 → Search Console → Vercel Analytics → Klaviyo

---

## 6. Growth Levers Table — "What Do I Do If X is Off?"

### If CVR is Below Target (<1%)

| Root Cause | Signal | Action |
|-----------|--------|--------|
| Weak trust signals | High bounce on PDP | Add customer reviews, "as seen in", secure checkout badges |
| Price friction | High cart abandonment (>85%) | Add payment plans (Affirm/Afterpay), clarify value vs. cost |
| Poor product photos | Low time-on-page | Upgrade hero images, add lifestyle shots, 360° views |
| Unclear returns policy | Checkout drop-off | Make free returns prominent on PDP and checkout |
| Slow site speed | High bounce rate (>75%) | Run Core Web Vitals audit on Vercel; compress images |
| Wrong traffic | Low session duration (<45 sec) | Tighten ad targeting; exclude broad interests |

---

### If CAC is Too High (>$300)

| Root Cause | Signal | Action |
|-----------|--------|--------|
| Broad ad targeting | High CPM, low ROAS | Narrow to intent signals (engagement jewelry, lab grown diamond) |
| No retargeting | All CAC from cold traffic | Set up Meta Pixel retargeting of site visitors and cart abandoners |
| No organic leverage | 0% organic traffic | Publish 2 SEO blog posts/month ("lab grown diamond vs mined") |
| Email not converting | List growing but no sales | Send 3-email welcome sequence with offer on signup |
| Affiliate not performing | Affiliate clicks but no sales | Review affiliate landing page; offer exclusive code for urgency |

---

### If AOV is Low (<$900)

| Root Cause | Signal | Action |
|-----------|--------|--------|
| Customers buying entry items only | Orders concentrated in $485–$695 range | Feature curated bundles (ring + earrings), add "complete the look" |
| No upsell at checkout | Low attachment rate | Add engraving, gift wrap, or complementary piece suggestion |
| Promo code overuse | Many orders at 20%+ discount | Limit discount codes to first purchase only; remove sitewide |
| No premium placement | Premium items rarely viewed | Pin top 3 pieces (Tennis Ring, Tennis Bracelet, Eternity Set) in nav |

---

### If Email List Growth Stalls (<10 new/week)

| Root Cause | Signal | Action |
|-----------|--------|--------|
| No exit-intent popup | Low opt-in rate | Add 10% off popup for first purchase (Klaviyo / Privy) |
| No lead magnet | Direct traffic not converting to list | Create "Diamond Guide" PDF opt-in |
| Social not driving signups | High social followers, low email | Add email signup CTA in Instagram bio and Stories |
| Paid traffic not captured | High paid sessions, low list growth | Add email capture to paid landing page |

---

### If Refund Rate Spikes (>5%)

| Root Cause | Signal | Action |
|-----------|--------|--------|
| Product vs. expectation mismatch | Same SKU getting refunded | Improve product description, add size guide, update photos |
| Shipping damage | Mentions in refund notes | Upgrade packaging; add insurance for orders >$1,000 |
| Sizing issues (rings) | Size-related returns | Add ring sizer tool or link to sizing chart on every PDP |
| Wrong product shipped | Operations error | Implement double-check shipping workflow |

---

## 7. Dashboard Snapshot Template

For a quick Monday morning visual, track this table weekly in a Google Sheet:

| Week | Revenue | Orders | AOV | Sessions | CVR | Email List | CAC | Notes |
|------|---------|--------|-----|----------|-----|------------|-----|-------|
| W1 | | | | | | | | |
| W2 | | | | | | | | |
| W3 | | | | | | | | |
| W4 | | | | | | | | |
| W5 | | | | | | | | |
| W6 | | | | | | | | |
| W7 | | | | | | | | |
| W8 | | | | | | | | |
| W9 | | | | | | | | |
| W10 | | | | | | | | |
| W11 | | | | | | | | |
| W12 | | | | | | | | |

**Copy this sheet →** File > Make a copy in Google Sheets. Share with board.

---

## Quick Reference: The 3 Numbers That Matter Most

At any point in the 90 days, these three numbers tell you everything:

1. **Monthly Revenue Run-Rate** = (Last 14-day revenue) × 2
   → Is it trending toward $5,000?

2. **CVR** = Orders ÷ Sessions
   → Is the site converting visitors? (Target: ≥1%)

3. **CAC vs. AOV Ratio** = CAC ÷ AOV
   → Is paid acquisition profitable? (Target: ≤25%)

If all three are trending right, stay the course. If any one is off, go to Section 6 (Growth Levers) and pick one action.

---

*Last updated: 2026-04-01 | Owner: Data Analyst | Review cadence: Weekly (Monday morning)*
