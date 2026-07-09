# Nephelis Industries

**Project AETHER**: A super-pressure balloon probe targeting Venus's habitable cloud layer. Launching 2027.

This repository contains the evolving digital presence and operational tooling for Nephelis Industries.

## Structure

```
nephelis/
├── site/                  # The main website (Next.js)
├── assets/                # Visuals, videos, 3D models
├── research/              # Knowledge base (science, competitors, notes)
├── automation/            # AI prompts, scripts, and agent definitions for continuous evolution
├── decks/                 # Pitch materials (auto-updatable)
└── docs/
```

## Getting Started (Website)

```bash
cd site
pnpm install
pnpm dev
```

## Philosophy

- **Content as Data**: Structured data and MDX in `site/content/` and `research/` are the source of truth. Agents edit these → site evolves.
- **Agentic Development**: Use AI loops (research → content → visuals → code → review → deploy) to keep the venture moving forward.
- **Version Everything**: All assets, prompts, research, and code live here.

See `automation/prompts/` for starting agent workflows and `site/README.md` for the website.

## Implementation Status (July 2026)

- [x] Directory structure created
- [x] Next.js 15 site scaffolded with Nephelis branding
- [x] Basic pages + data-driven timeline + specs
- [x] Visuals gallery with real assets + interactive demo
- [x] MDX support + sample updates (research loop demonstrated)
- [x] Starter automation prompts + evolve script
- [x] Content ported/enhanced from 82083 and ehreng.github.io
- [x] Assets partially organized
- [x] First agent research loop run (competitor missions update added)
- [x] Deployed to Vercel under nephelisindustries.com
- [x] CI (lint / typecheck / build / content schemas)
- [x] Lead pipeline (Resend audience + auto-reply + tags)
- [x] Stripe Checkout + webhook + live allocation API
- [x] Weekly research scaffold Action → PR
- [x] Social drafts + metrics one-pager sync Actions
- [x] Living research knowledge base seed
- [x] Public `/roadmap` + telemetry strip + volunteer form + `/ops`
- [ ] Full asset sync + more visuals
- [ ] Configure production secrets (Resend domain, Stripe webhook, OPS_TOKEN)

## Local Development

```bash
cd site
pnpm install
pnpm dev
```

Open http://localhost:3000

## Deploy to Vercel

1. `cd site`
2. `vercel` (or connect GitHub repo containing the nephelis folder)
3. Set custom domain nephelisindustries.com in Vercel dashboard.
4. For subpath or monorepo, configure root directory to `site` if the whole nephelis is the repo.

## Running AI Automation Loops

Use this Grok environment or scripts:

```bash
# In this chat: "Research latest Venus missions and update the site data + create new update post"
# Then use subagent + implement to apply changes.

# Local script
cd site
npx tsx ../automation/scripts/evolve.ts research
```

Full workflow documented in automation/.

To port more from old sites or generate new sections, just ask (we'll use plan/implement/review + subagents).
```

## Contributing

Volunteers and collaborators are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md).

**Quick ways to help:**
- Edit JSON data or add MDX updates (no code required)
- Generate visuals using the prompts
- Improve the site, planner, or add features
- Help run research/automation loops

The project is designed so both humans and AI agents can contribute effectively.

## Agentic Automation & AI Collaboration

This repo is built for continuous, automated evolution:

- `automation/prompts/` – reusable instructions for research, visuals, planning
- `automation/scripts/` – evolve.ts and helpers (run with `npx tsx`)
- Living data in `site/content/data/` + MDX powers the site

**Example workflows:**
- "Research latest Venus cloud missions and update timeline + create MDX post"
- "Generate a new visual brief and suggest new hero assets"
- "Propose next 5 development tasks + implement one"

Agents (and humans) can use plan/implement/review loops. Contributions via PRs are reviewed and merged.

## Roadmap & Next Steps (Living)

See `site/content/data/timeline.json` for milestones.

Open tasks (volunteers + agents encouraged):
- Wire Vercel env vars from `site/.env.example` (Resend, Stripe, OPS_TOKEN)
- Expand visuals gallery + more videos
- Science deep dives, partner logos, press
- Optional visual regression tests
- Fill weekly research PRs as they open

See public roadmap: `/roadmap` (driven by `site/content/data/tasks.json`).

```bash
# Automation scaffolds
npx tsx automation/scripts/evolve.ts full

# Site CI gate
cd site && pnpm ci
```

## Current Status

- Personal brand remains at [82083.net](https://82083.net)
- Dedicated site: [nephelisindustries.com](https://nephelisindustries.com)
- Deployed on Vercel, custom domain active
- Content, styling, and core interactive elements ported from reference designs
