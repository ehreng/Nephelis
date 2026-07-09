# AGENTS.md — Nephelis Industries / Project AETHER

Instructions for AI agents (Grok, CI bots, volunteers using agent loops) working in this repository.

## Mission

Build and operate **Project AETHER** (Cloudseeker): a lean, private Venus cloud-layer aerostat probe targeting ~55 km, launch window **Q4 2027**, with public crowdfunding and open collaboration.

## Repo map

| Path | Role |
|------|------|
| `site/` | Next.js site (Vercel root directory) |
| `site/content/data/` | **Source of truth** for public mission numbers (incl. `power-budget.json`) |
| `docs/` | CONOPS, requirements, SOPs, war board, protocols |
| `site/content/updates/` | MDX mission logs |
| `research/` | Living knowledge base (science, competitors, digests) |
| `automation/` | Scripts, prompts, social drafts |
| `decks/` | Auto-generated one-pagers / press kit |
| `docs/` | Human runbooks |

## Golden rules

1. **Data first** — change JSON/MDX before hardcoding copy in React.
2. **Agents propose, humans merge** research and public claims.
3. **No invented partners, contracts, or science results.**
4. **Validate** after data edits: `cd site && pnpm validate:content`.
5. **Prefer PRs** for research; site deploys from `main` via Vercel.

## Standard loops

```bash
# From repo root
npx tsx automation/scripts/evolve.ts digest         # MCC + partners + social-from-digest
npx tsx automation/scripts/evolve.ts research       # research brief scaffold
npx tsx automation/scripts/evolve.ts watch          # competitor keyword checklist
npx tsx automation/scripts/evolve.ts telemetry      # sync telemetry from checklist
npx tsx automation/scripts/evolve.ts env            # Stripe mode / env drift
npx tsx automation/scripts/evolve.ts partners       # stale pipeline
npx tsx automation/scripts/evolve.ts social-digest  # social without new MDX
npx tsx automation/scripts/evolve.ts digest-email   # email digest (needs RESEND_*)
npx tsx automation/scripts/evolve.ts full           # most scaffolds
cd site && pnpm validate:content && pnpm check:mass
```

## When asked to “update the mission”

1. Read `research/notes/LATEST-DIGEST.md` (or generate digest).
2. Read `tasks.json`, `risks.json`, `partners.json`, `mission-control.json`.
3. Make the smallest factual edit set.
4. Run `pnpm validate:content` in `site/`.
5. Refresh digest/metrics/press/kb if data changed.
6. Summarize for the human.

## Prompts

- `automation/prompts/research-update.md`
- `automation/prompts/mission-ops.md`
- `automation/prompts/risk-review.md`
- `automation/prompts/partner-outreach.md`
- `automation/prompts/visual-brief.md`

## Secrets

Never commit `.env`. See `site/.env.example` and `docs/go-live.md`.
