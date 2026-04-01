# Monitoring Setup — bonjoojoo.com

This document covers the full monitoring stack for bonjoojoo in production. Set these up **before launch** to catch issues within minutes.

---

## 1. Uptime Monitoring (UptimeRobot — Free)

### What it checks
The `/api/health` endpoint returns `{ status: 'ok', timestamp, version }` — use this as your check target.

### Step-by-step setup

1. Go to [https://uptimerobot.com](https://uptimerobot.com) and create a free account.
2. Click **Add New Monitor**.
3. Configure:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** `bonjoojoo Production`
   - **URL:** `https://bonjoojoo.com/api/health`
   - **Monitoring Interval:** 5 minutes (free tier)
   - **Alert Contacts:** Add your email and/or Slack webhook
4. Click **Create Monitor**.
5. (Optional) Add a second monitor for the homepage:
   - URL: `https://bonjoojoo.com`
   - Keyword check: `Bonjoojoo`

### Alternative: BetterUptime (Free tier)

1. Sign up at [https://betteruptime.com](https://betteruptime.com).
2. Click **Add Monitor → URL Monitor**.
3. URL: `https://bonjoojoo.com/api/health`
4. Check frequency: 3 minutes
5. Set notification channels (email, Slack, PagerDuty).
6. BetterUptime also provides a public status page — recommended for customer-facing transparency.

---

## 2. Vercel Deployment Notifications

Get notified on every deploy (success or failure).

### Slack webhook (recommended)

1. In your Slack workspace, go to **Apps → Incoming Webhooks → Add to Slack**.
2. Choose the channel (e.g., `#deployments`), click **Authorize** — copy the webhook URL.
3. In Vercel dashboard → **Project → Settings → Git → Deploy Hooks**: add a hook for the `main` branch.
4. For build failure notifications: go to **Settings → Notifications** in Vercel, add your email or Slack integration.

### Email notifications

1. Vercel dashboard → **Account Settings → Notifications**.
2. Enable **Deployment failure** and **Deployment success** emails.

---

## 3. Error Monitoring

### Client-side errors
The app has `src/app/error.tsx` and `src/app/global-error.tsx` as Next.js App Router error boundaries — these catch server component and client render errors. They display a branded error page instead of a blank screen and log to the console.

The `src/components/errors/EnterpriseErrorBoundary.tsx` wraps individual components (product grids, checkout) with per-component recovery UI.

### Recommended: Sentry (Free tier — 5K errors/mo)

1. Sign up at [https://sentry.io](https://sentry.io) and create a Next.js project.
2. Install: `npm install @sentry/nextjs`
3. Run: `npx @sentry/wizard@latest -i nextjs`
4. This auto-creates `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`.
5. Add `SENTRY_DSN` to Vercel environment variables.
6. Set up alert rules in Sentry: **Alerts → Create Alert → Issues** — alert when error frequency > 10/hour.

---

## 4. Performance Monitoring

Vercel Analytics is already integrated via the layout (via `NEXT_PUBLIC_GA4_MEASUREMENT_ID`).

### Core Web Vitals alerts
1. Vercel dashboard → **Analytics → Speed Insights** (enable in project settings).
2. Set thresholds: LCP < 2.5s, FID < 100ms, CLS < 0.1.

### GA4 alerts
1. In GA4 → **Explore → Anomaly Detection** or set up custom **Alerts** for traffic drops > 50%.

---

## 5. Health Endpoint Reference

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

- Returns HTTP 200 when healthy
- Monitor this endpoint every 3–5 minutes
- If it returns non-200 or times out, the site is down

---

## 6. Incident Response

When an alert fires:

| Severity | Action |
|---|---|
| Site down (uptime alert) | Check Vercel deployment logs → rollback if needed |
| High error rate (Sentry) | Check recent deploy → revert via `git revert` + push |
| Slow performance | Check Vercel Functions tab for timeouts; check DB connection pool |
| Deploy failure | Check Vercel build logs; fix and re-push |

Vercel rollback: In Vercel dashboard → **Deployments** → click any previous deployment → **Promote to Production**.

---

## Summary Checklist

- [ ] UptimeRobot or BetterUptime monitor on `https://bonjoojoo.com/api/health`
- [ ] Email/Slack alert configured in uptime tool
- [ ] Vercel deployment Slack webhook set up
- [ ] Vercel failure email notifications enabled
- [ ] (Recommended) Sentry installed and DSN added to Vercel env vars
- [ ] Vercel Speed Insights enabled
