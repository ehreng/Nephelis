# Nephelis Industries

**Project AETHER**: A super-pressure balloon probe targeting Venus's habitable cloud layer. Launch window **2030s**.

This repository is the **public site + mission ops toolchain** for Nephelis Industries — built so humans and AI agents can advance the mission through structured data, automation loops, and reviewable PRs.

**Live:** [www.nephelisindustries.com](https://www.nephelisindustries.com) · **Probe / bay:** [/\#bay](https://www.nephelisindustries.com/#bay) · **Relay:** [/\#relay](https://www.nephelisindustries.com/#relay) · **AETHER OS:** [/aether-os](https://www.nephelisindustries.com/aether-os) · **Status:** [/status](https://www.nephelisindustries.com/status)

## AETHER OS

AI-coordinated mission operating system: **DETECT → PLAN → EXECUTE → VERIFY**, contribution tiers (L1–L3), recursive loops.

| Doc | Path |
|-----|------|
| Architecture v1.0 | [`docs/AETHER_OS_Architecture_v1.md`](./docs/AETHER_OS_Architecture_v1.md) |
| Task template | [`docs/TASK_TEMPLATE.md`](./docs/TASK_TEMPLATE.md) |
| Runtime state | [`aether-os/`](./aether-os/) |
| Daily loop | `npx tsx automation/scripts/evolve.ts daily` |

Founder: **Ehren Goossens** — Founder Emeritus / Strategic Oversight. Currently in U.S. Army training; review is asynchronous.

## Structure

```
nephelis/
├── AGENTS.md              # Instructions for AI agents
├── aether-os/             # OS state: briefs, loops, contributions
├── site/                  # Next.js website (Vercel root = site/)
│   └── content/data/      # Source of truth (specs, risks, tasks, …)
├── research/              # Knowledge base (science, competitors, digests)
├── automation/            # Scripts, prompts, social drafts
├── decks/                 # Generated metrics + press kit
├── docs/                  # Architecture + runbooks
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
npx tsx automation/scripts/evolve.ts daily    # AETHER OS Daily Mission Brief
npx tsx automation/scripts/evolve.ts full     # daily + most loops
npx tsx automation/scripts/evolve.ts digest   # weekly MCC digest
npx tsx automation/scripts/evolve.ts health   # prod health check
```

| Loop | What it does |
|------|----------------|
| **Daily Mission** | Brief + prioritized tasks + social seed → `aether-os/briefs/` |
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
| `sensor-suite.json` | Instrument mass / power / data / TRL |
| `comms-link.json` | CubeSat relay + download times |
| `power-budget.json` | v1 loads, solar, battery |
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
| `/` | Mission narrative + probe/bay + funding |
| `/#bay` | Cloudseeker identity, science suite, payload vs other missions |
| `/#relay` | 3U CubeSat path, MB/day, time-to-download |
| `/visuals` | Concept art gallery |
| `/aether-os` | OS loops, contribution tiers, resource index |
| `/status` | Built vs not yet |
| `/mission` | Specs, mass budget, checklist, risks |
| `/roadmap` | Milestones + tasks + risks |
| `/updates` | MDX logs |
| `/ops` | Private ops (token) |

## Status (November 2026)

- [x] Next.js site on Vercel + custom domain  
- [x] Cloudseeker visual lock on the live homepage (flyingprobe sphere, cool deck, bay suite)  
- [x] Public payload comparison vs VEGA / VLF / DAVINCI  
- [x] Sensor suite baseline v0 + power v1 + CubeSat relay estimate (`/#relay`)  
- [x] Gate 3 mock telemetry (`/api/telemetry/mock`)  
- [x] Stripe test checkout + allocation (live mode **off**)  
- [x] Resend leads / auto-reply / volunteer form  
- [x] CI + content schemas  
- [x] Research / digest / social / metrics automation  
- [x] Mass budget, risks, partners, mission-control data  
- [x] Practical requirements brief, visual bible, ground-test sequence  
- [x] Program gates 0–8 + Gate 0 RFQ package + Gate 2 He-float BOM (paper)  
- [ ] Acid coupons / helium ground float (next engineering; blocked on ship-to)  
- [ ] Stripe **live** mode (do not reopen until asked)  

**Program:** pre-hardware. $500k = ground/community scale, not a Venus flight. No committed launch date (~2030–2031+ class if gates pass).

Roadmap: [site `/roadmap`](https://www.nephelisindustries.com/roadmap) · go-live: [`docs/go-live.md`](./docs/go-live.md)  
**30-day war board:** [`docs/30-day-war-board.md`](./docs/30-day-war-board.md) · partner drafts: [`docs/partner-outreach-drafts.md`](./docs/partner-outreach-drafts.md)  
**Design package:** [`docs/conops-v0.9.md`](./docs/conops-v0.9.md) · [`docs/requirements-baseline-v0.9.md`](./docs/requirements-baseline-v0.9.md) · [`docs/system-icd-skeleton.md`](./docs/system-icd-skeleton.md) · [`docs/power-budget-v0.md`](./docs/power-budget-v0.md) · [`docs/practical-requirements-brief.md`](./docs/practical-requirements-brief.md) · [`docs/visual-bible-cloudseeker.md`](./docs/visual-bible-cloudseeker.md)  
**Program gates:** [`docs/program-gates.md`](./docs/program-gates.md) (KPIs, spend, make-vs-buy)  
**Ground tests:** [`docs/ground-test-sequence.md`](./docs/ground-test-sequence.md) · Gate 0 RFQ: [`docs/gate0-film-rfq.md`](./docs/gate0-film-rfq.md) · Gate 2 BOM: [`docs/gate2-he-float-bom.md`](./docs/gate2-he-float-bom.md) · coupons: [`docs/materials-coupon-test-protocol.md`](./docs/materials-coupon-test-protocol.md)  
**Research:** [`research/competitors/`](./research/competitors/) (VLF, government aerobots; last reviewed 2026-11-14)

Latest brief: [`aether-os/briefs/latest.md`](./aether-os/briefs/latest.md)

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
