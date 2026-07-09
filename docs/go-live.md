# Go-live status — Project AETHER site

## Verified working (prod)

- Site + domain (www.nephelisindustries.com)
- Stripe **test** Checkout + allocation counter (paid slots counted)
- Webhook rejects unsigned requests; paid sessions increment `/api/allocation`
- Resend subscribe + volunteer + auto-reply
- CI on `main`
- Automation workflows can open PRs (metrics / social / digests)
- SEO: sitemap.xml + robots.txt
- Mission data model: mass budget, risks, partners, mission-control

## Your remaining checklist

### 1. Stripe live (when ready for real money)

1. Stripe Dashboard → turn **Test mode OFF**
2. New live secret key → Vercel `STRIPE_SECRET_KEY`
3. New live webhook → `https://www.nephelisindustries.com/api/webhooks/stripe`  
   event: `checkout.session.completed` → `STRIPE_WEBHOOK_SECRET`
4. Live Price IDs if used → `STRIPE_PRICE_LEGACY` / `STRIPE_PRICE_DNA`
5. Redeploy Vercel
6. One real $100 smoke test (+ refund if desired)

### 2. Env hygiene

Prefer canonical URL in Vercel:

```
NEXT_PUBLIC_SITE_URL=https://www.nephelisindustries.com
```

Confirm `OPS_TOKEN`, `RESEND_FROM_EMAIL` on verified domain, `TEAM_EMAIL`.

### 3. Growth cadence

- Post from `automation/social-drafts/latest.md` (human approve)
- Monday research PR → fill sources → merge
- Keep `/roadmap` tasks honest

### 4. Optional

- GitHub volunteer token (`GITHUB_TOKEN`) so intake opens issues
- Buffer/Typefully for scheduled social
- Tax registrations when sales volume warrants it
