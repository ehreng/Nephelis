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
- [ ] Full asset sync + more visuals
- [ ] Deployed to Vercel under nephelisindustries.com

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

## Current Status

- Personal brand remains at [82083.net](https://82083.net)
- This is the dedicated professional site for the Nephelis venture (nephelisindustries.com)
