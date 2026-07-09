# Nephelis Automation & AI Loops

Tools, prompts, and scheduled workflows that keep Project AETHER’s site and research moving.

## Loops

| Loop | Trigger | Output |
|------|---------|--------|
| **Research** | Mondays (GH Action) or `evolve.ts research` | `research/notes/*-brief.md` + draft MDX → PR |
| **Social** | Push to `site/content/updates/**` | `automation/social-drafts/latest.md` → PR |
| **Metrics** | Push to `site/content/data/**` | `decks/metrics-one-pager.md` → PR |
| **CI** | Every PR/push | schema validate + typecheck + lint + build |
| **Leads** | Site forms | Resend audience + team email + auto-reply |
| **Payments** | Stripe Checkout + webhook | Paid tags + live allocation counts |

## Local commands

```bash
# From repo root
npx tsx automation/scripts/evolve.ts research
npx tsx automation/scripts/evolve.ts social
npx tsx automation/scripts/evolve.ts metrics
npx tsx automation/scripts/evolve.ts full

# Site quality gate
cd site && pnpm validate:content && pnpm typecheck && pnpm lint && pnpm build
```

## Prompts

- `prompts/research-update.md` — research agent instructions
- `prompts/visual-brief.md` — consistent mission visuals

## Production env (Vercel)

Copy `site/.env.example` into Vercel project settings. Minimum for live ops:

1. `RESEND_API_KEY` + verified domain sender (`RESEND_FROM_EMAIL`)
2. `RESEND_AUDIENCE_ID` for list storage
3. `STRIPE_SECRET_KEY` + webhook endpoint `https://<domain>/api/webhooks/stripe` → `STRIPE_WEBHOOK_SECRET`
4. `NEXT_PUBLIC_SITE_URL`
5. `OPS_TOKEN` for `/ops`

Optional: `GITHUB_TOKEN` (volunteer → issue), `VOLUNTEER_WEBHOOK_URL`, Stripe Price IDs.

## Stripe webhook

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Events: `checkout.session.completed`

Allocation API (`GET /api/allocation`) counts completed sessions with `metadata.tier` ∈ `legacy` | `dna`, plus `baseline_allocated` from `funding.json`.

## Human gates (by design)

- Research PRs are never auto-merged
- Social drafts are never auto-posted
- Agents propose; humans merge and post
