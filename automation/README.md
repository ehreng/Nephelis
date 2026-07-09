# Nephelis Automation & AI Loops

Tools, prompts, and scheduled workflows that keep Project AETHER’s site, research, and mission ops moving.

Agents: start at root [`AGENTS.md`](../AGENTS.md). Knowledge map: [`research/INDEX.md`](../research/INDEX.md).

## Loops

| Loop | Trigger | Output |
|------|---------|--------|
| **Research** | Mon 14:00 UTC / `evolve.ts research` | `research/notes/*-brief.md` + draft MDX → PR |
| **Mission digest** | Mon 15:00 UTC / `evolve.ts digest` | digest + stale partners + watch + social-from-digest + telemetry → PR |
| **Partner stale** | Mon 13:00 UTC / `evolve.ts partners` | stale P0/P1 report → PR |
| **Social** | Push to updates MDX / `evolve.ts social` | `automation/social-drafts/` → PR |
| **Social from digest** | With digest / `evolve.ts social-digest` | posts even without new MDX |
| **Metrics** | Push to `content/data/**` / `evolve.ts metrics` | `decks/metrics-one-pager.md` |
| **Health** | Daily 16:00 UTC / `evolve.ts health` | Prod endpoint probes (fail CI if down) |
| **Links** | Sun / heritage PR / `evolve.ts links` | Validates `heritage.json` URLs |
| **CI** | Every PR/push | schemas + typecheck + lint + build |
| **Leads** | Site forms | Resend audience + team email + auto-reply |
| **Payments** | Stripe Checkout + webhook | Paid tags + live allocation |

## Local commands

```bash
# From repo root
npx tsx automation/scripts/evolve.ts help
npx tsx automation/scripts/evolve.ts digest
npx tsx automation/scripts/evolve.ts full
npx tsx automation/scripts/evolve.ts health   # uses www by default
npx tsx automation/scripts/evolve.ts links
npx tsx automation/scripts/evolve.ts kb
npx tsx automation/scripts/evolve.ts press

cd site && pnpm validate:content && pnpm ci
```

## Scripts

| Script | Purpose |
|--------|---------|
| `evolve.ts` | CLI router for all modes |
| `research-weekly.ts` | Research brief + draft MDX scaffold |
| `mission-digest.ts` | MCC snapshot from tasks/risks/partners/telemetry |
| `partner-stale.ts` | P0/P1 pipeline aging |
| `social-from-digest.ts` | Social drafts from digest |
| `send-digest-email.ts` | Email digest via Resend (opt-in) |
| `env-check.ts` | Env presence + Stripe test/live mode |
| `sync-telemetry.ts` | Align telemetry with MCC checklist |
| `competitor-watch.ts` | Agent search checklist from watch list |
| `sync-metrics.ts` | Investor/metrics one-pager |
| `press-kit.ts` | Press & partner boilerplate |
| `social-draft.ts` | X / LinkedIn drafts from MDX |
| `kb-index.ts` | `research/INDEX.md` |
| `health-check.ts` | Production API/page probes |
| `link-check.ts` | Heritage link reachability |

## Prompts

| Prompt | Use when |
|--------|----------|
| `prompts/research-update.md` | Science / competitor scan |
| `prompts/mission-ops.md` | Status updates across JSON |
| `prompts/risk-review.md` | Risk register pass |
| `prompts/partner-outreach.md` | Pipeline emails |
| `prompts/visual-brief.md` | Image/video generation |

## Mission data (site/content/data)

| File | Meaning |
|------|---------|
| `specs.json` | Probe & science goals |
| `mass-budget.json` | Wet mass breakdown |
| `timeline.json` | Public milestones |
| `tasks.json` | Workstreams → `/roadmap` |
| `risks.json` | Risk register |
| `partners.json` | Partner pipeline |
| `mission-control.json` | MCC checklist / phase |
| `telemetry.json` | Systems strip |
| `funding.json` | Tiers & capacity |
| `heritage.json` | Venus mission archive |

## Production env (Vercel)

See `site/.env.example` and `docs/go-live.md`.

Minimum: `RESEND_*`, `STRIPE_*`, `NEXT_PUBLIC_SITE_URL`, `OPS_TOKEN`.

## Human gates (by design)

- Research claims: **never auto-merge without read**
- Social: **never auto-post**
- Payments / pricing: **human only**
- Agents update data + open PRs; founders merge
