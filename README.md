# Nephelis Industries

**Project AETHER**: A super-pressure balloon probe targeting Venus's habitable cloud layer. Launch window **Q4 2027**.

This repository is the **public site + mission ops toolchain** for Nephelis Industries — built so humans and AI agents can advance the mission through structured data, automation loops, and reviewable PRs.

**Live:** [www.nephelisindustries.com](https://www.nephelisindustries.com)

## Structure

```
nephelis/
├── AGENTS.md              # Instructions for AI agents
├── site/                  # Next.js website (Vercel root = site/)
│   └── content/data/      # Source of truth (specs, risks, tasks, …)
├── research/              # Knowledge base (science, competitors, digests)
├── automation/            # Scripts, prompts, social drafts
├── decks/                 # Generated metrics + press kit
├── docs/                  # Runbooks (go-live, mission automation)
└── assets/                # Visuals / media
```

## Quick start

```bash
cd site && pnpm install && pnpm dev
# http://localhost:3000
```

## Philosophy

- **Content as data** — agents edit JSON/MDX; the site renders it.
- **Agentic ops** — research → digest → content → deploy, with human merge gates.
- **Version everything** — prompts, risks, mass budget, and code live in git.

## Automation (high level)

```bash
# From repo root
npx tsx automation/scripts/evolve.ts full     # scaffold most loops
npx tsx automation/scripts/evolve.ts digest   # weekly MCC digest
npx tsx automation/scripts/evolve.ts health   # prod health check
```

| Loop | What it does |
|------|----------------|
| Research (Mon) | Brief + draft MDX → PR |
| Mission digest (Mon) | Tasks/risks/partners snapshot → PR |
| Social | Drafts X/LinkedIn from MDX |
| Metrics / press | One-pagers from JSON |
| Health / links | Prod + heritage URL checks |
| CI | Schema + typecheck + lint + build |
| Stripe + Resend | Payments, allocation, leads |

Details: [`automation/README.md`](./automation/README.md) · architecture: [`docs/mission-automation.md`](./docs/mission-automation.md) · agents: [`AGENTS.md`](./AGENTS.md)

## Mission data

Public numbers live in `site/content/data/`:

| File | Powers |
|------|--------|
| `specs.json` | Probe concept |
| `mass-budget.json` | 400 kg-class stack |
| `timeline.json` / `tasks.json` | `/roadmap` |
| `risks.json` | Risk register |
| `partners.json` | Partner pipeline |
| `mission-control.json` | MCC checklist |
| `telemetry.json` | Systems strip |
| `funding.json` | Sponsor tiers |
| `heritage.json` | Venus archive |

Knowledge base: [`research/`](./research/) (see `research/INDEX.md` after `evolve.ts kb`).

## Site pages

| Path | Role |
|------|------|
| `/` | Mission narrative + funding + volunteer |
| `/mission` | Specs, mass budget, checklist, risks |
| `/roadmap` | Milestones + tasks + risks |
| `/updates` | MDX logs |
| `/ops` | Private ops (token) |

## Status (July 2026)

- [x] Next.js site on Vercel + custom domain  
- [x] Stripe test checkout + live allocation  
- [x] Resend leads / auto-reply / volunteer form  
- [x] CI + content schemas  
- [x] Research / digest / social / metrics automation  
- [x] Health + link checks  
- [x] Mass budget, risks, partners, mission-control data  
- [ ] Stripe **live** mode  
- [ ] Deeper hardware test data + visuals  

Roadmap: [site `/roadmap`](https://www.nephelisindustries.com/roadmap) · go-live: [`docs/go-live.md`](./docs/go-live.md)  
**30-day war board:** [`docs/30-day-war-board.md`](./docs/30-day-war-board.md) · partner drafts: [`docs/partner-outreach-drafts.md`](./docs/partner-outreach-drafts.md)  
**Design package (v0.9):** [`docs/conops-v0.9.md`](./docs/conops-v0.9.md) · [`docs/requirements-baseline-v0.9.md`](./docs/requirements-baseline-v0.9.md) · [`docs/system-icd-skeleton.md`](./docs/system-icd-skeleton.md)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Easiest paths:

1. Edit JSON under `site/content/data/`  
2. Add a research note under `research/`  
3. Open a PR — agents welcome if changes are cited and validated  

```bash
cd site && pnpm validate:content && pnpm ci
```

## Contact

- ehren@nephelisindustries.com  
- [@NephelisCo](https://x.com/NephelisCo)  
- Personal: [82083.net](https://82083.net)
