# Nephelis Website

Next.js site for Nephelis Industries (Project AETHER).

## Development

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Local server |
| `pnpm validate:content` | JSON schema checks on `content/data` |
| `pnpm typecheck` | TypeScript |
| `pnpm lint` | ESLint |
| `pnpm build` | Production build |
| `pnpm ci` | Full local CI gate |

## Content model

- `content/data/*.json` — timeline, specs, heritage, tasks, telemetry, funding
- `content/schemas/*.json` — validation schemas
- `content/updates/*.mdx` — mission logs

## APIs

| Route | Role |
|-------|------|
| `POST /api/subscribe` | Crew signals → Resend + auto-reply |
| `POST /api/reserve` | Interest-only reserve |
| `POST /api/checkout` | Stripe Checkout session |
| `POST /api/webhooks/stripe` | Payment confirmation |
| `GET /api/allocation` | Live tier allocation |
| `POST /api/volunteer` | Volunteer intake |
| `GET /api/ops` | Private ops JSON (`OPS_TOKEN`) |

## Pages

- `/` — main mission site
- `/updates` — MDX logs
- `/roadmap` — public roadmap from data
- `/ops` — private dashboard (token)
- `/mission`, `/visuals` — supporting

## Env

See `.env.example`. Never commit secrets.

## Automation

Repo-level docs: `../automation/README.md`
