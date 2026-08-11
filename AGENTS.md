# AGENTS.md — Nephelis Industries / Project AETHER

Instructions for AI agents (Grok, CI bots, volunteers using agent loops) working in this repository.

## Mission

Build and operate **Project AETHER** (Cloudseeker): a lean, private Venus cloud-layer aerostat probe targeting ~55 km, launch window **Q4 2027**, with public crowdfunding and open collaboration.

**Operating system:** **AETHER OS** — see [`docs/AETHER_OS_Architecture_v1.md`](./docs/AETHER_OS_Architecture_v1.md).

## Repo map

| Path | Role |
|------|------|
| `site/` | Next.js site (Vercel root directory) |
| `site/content/data/` | **Source of truth** for public mission numbers |
| `aether-os/` | OS runtime: briefs, loops, contributions, progress |
| `docs/` | Architecture, CONOPS, requirements, SOPs |
| `site/content/updates/` | MDX mission logs |
| `research/` | Living knowledge base |
| `automation/` | Loop scripts, prompts, social drafts |
| `decks/` | Auto-generated one-pagers / press kit |

## Golden rules

1. **Data first** — change JSON/MDX before hardcoding copy in React.
2. **Agents propose, humans merge** research and public claims.
3. **No invented partners, contracts, or science results.**
4. **Validate** after data edits: `cd site && pnpm validate:content`.
5. **Prefer PRs** for research; site deploys from `main` via Vercel.
6. **AETHER OS loops** follow DETECT → PLAN → EXECUTE → VERIFY; log verified work in `aether-os/CONTRIBUTIONS.md`.
7. **Founder Emeritus** (Ehren) can pause/override any loop; escalate P0 blockers.

## AETHER OS — start of session

```bash
# 1. Architecture + loop registry
#    docs/AETHER_OS_Architecture_v1.md
#    aether-os/loops/registry.json

# 2. Daily Mission Loop
npx tsx automation/scripts/evolve.ts daily

# 3. Review brief
#    aether-os/briefs/latest.md

# 4. Open claimable issues from the brief (L1–L3 templates)
# 5. Verify completions → aether-os/CONTRIBUTIONS.md
```

## Standard loops

```bash
# From repo root
npx tsx automation/scripts/evolve.ts daily          # AETHER OS Daily Mission Brief
npx tsx automation/scripts/evolve.ts digest         # MCC + partners + social-from-digest
npx tsx automation/scripts/evolve.ts research       # research brief scaffold
npx tsx automation/scripts/evolve.ts watch          # competitor keyword checklist
npx tsx automation/scripts/evolve.ts telemetry      # sync telemetry from checklist
npx tsx automation/scripts/evolve.ts env            # Stripe mode / env drift
npx tsx automation/scripts/evolve.ts partners       # stale pipeline
npx tsx automation/scripts/evolve.ts social-digest  # social without new MDX
npx tsx automation/scripts/evolve.ts digest-email   # email digest (needs RESEND_*)
npx tsx automation/scripts/evolve.ts full           # daily + most scaffolds
cd site && pnpm validate:content && pnpm check:mass
```

## When asked to “update the mission”

1. Run `evolve.ts daily` (or read `aether-os/briefs/latest.md`).
2. Read `tasks.json`, `risks.json`, `partners.json`, `mission-control.json`.
3. Make the smallest factual edit set.
4. Run `pnpm validate:content` in `site/`.
5. Refresh digest/metrics/press/kb if data changed.
6. Append progress if material; summarize for the human.

## Contribution tiers

- **L1** Anyone · **L2** Skilled · **L3** Trusted/gated  
- Templates: `.github/ISSUE_TEMPLATE/`  
- Claim with comment: `claiming`

## Prompts

- `automation/prompts/research-update.md`
- `automation/prompts/mission-ops.md`
- `automation/prompts/risk-review.md`
- `automation/prompts/partner-outreach.md`
- `automation/prompts/visual-brief.md`

## Secrets

Never commit `.env`. See `site/.env.example` and `docs/go-live.md`.
