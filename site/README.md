# Nephelis Website

Next.js 15 site for Nephelis Industries (Project AETHER).  
**Deploy root on Vercel:** this `site/` directory.

## Development

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Local server |
| `pnpm validate:content` | JSON schema checks |
| `pnpm typecheck` | TypeScript |
| `pnpm lint` | ESLint |
| `pnpm build` | Production build |
| `pnpm ci` | Full local gate |

## Content model

All mission facts that appear on the site should start here:

```
content/data/
  specs.json
  mass-budget.json
  timeline.json
  tasks.json
  risks.json
  partners.json
  mission-control.json
  telemetry.json
  funding.json
  heritage.json
content/schemas/     # ajv schemas (CI)
content/updates/     # MDX mission logs
```

Repo-level automation regenerates decks, digests, and social drafts from these files. See `../automation/README.md` and `../AGENTS.md`.

## APIs

| Route | Role |
|-------|------|
| `POST /api/subscribe` | Crew signals |
| `POST /api/reserve` | Interest-only reserve |
| `POST /api/checkout` | Stripe Checkout |
| `POST /api/webhooks/stripe` | Payment confirmation |
| `GET /api/allocation` | Live tier allocation |
| `POST /api/volunteer` | Volunteer intake |
| `GET /api/ops` | Private ops JSON (`OPS_TOKEN`) |

## Pages

| Path | Data |
|------|------|
| `/` | timeline, heritage, funding UI, telemetry, volunteer |
| `/mission` | specs, mass budget, MCC checklist, risks |
| `/roadmap` | timeline, tasks, risks |
| `/updates` | MDX |
| `/ops` | token dashboard |
| `/sitemap.xml` `/robots.txt` | SEO |

## Env

Copy `.env.example` → Vercel / `.env.local`. Never commit secrets.
