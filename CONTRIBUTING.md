# Contributing to Nephelis Industries (Project AETHER)

Thank you for your interest in helping humanity's return to the clouds.

We welcome contributions from engineers, scientists, designers, writers, and anyone passionate about Venus exploration.

## Ways to Contribute

### 1. Content & Research (easiest for most volunteers)
- Update `site/content/data/timeline.json` or `specs.json`
- Add new MDX updates in `site/content/updates/`
- Improve research notes in `research/`
- Submit facts, sources, or competitor analysis

### 2. Visuals & Design
- Generate new concept art using the prompts in `automation/prompts/visual-brief.md`
- Add images/videos to `assets/visuals/` then sync to `site/public/assets/visuals/`
- Suggest or create better icons, diagrams, or CSS tweaks

### 3. Code & Features
- The site is Next.js 15 + TypeScript + Tailwind
- Improve interactivity (planner, forms, telemetry)
- Add pages or components (`/mission`, `/visuals`, etc.)
- Enhance performance, accessibility, or mobile experience

### 4. Automation & AI Loops
- Improve scripts in `automation/scripts/`
- Write or refine prompts
- Help build agent workflows that keep the project moving (research → content → visuals → deploy)

## Development Setup

```bash
cd site
pnpm install
pnpm dev
```

Open http://localhost:3000

Build: `pnpm build`

## Pull Request Process

1. Fork the repo (or work in a branch).
2. Make focused changes.
3. Update relevant data files (JSON/MDX) when possible instead of hardcoding.
4. Test locally (`pnpm dev` + build).
5. Open PR with clear description. Reference any related research or issue.
6. AI-assisted reviews and implementation are encouraged.

## Agentic AI Workflow (for humans + agents)

We use a combination of human direction + AI agents to accelerate progress.

**Typical loop:**
1. Research (web + X tools or manual)
2. Update data or create MDX
3. Generate or curate visuals
4. Implement code changes (plan → implement → review)
5. Commit + push → Vercel deploys

See `automation/README.md` and the prompts folder.

Example prompt to an agent:
"Run a research update on recent Venus missions and prepare changes for the site and a new updates post."

We maintain a living set of next steps. See below + `docs/` and site content.

## Code of Conduct

Be excellent. Focus on mission success. Credit sources.

## Questions?

- Open an issue
- Email ehren@nephelisindustries.com
- X: @NephelisCo

Thank you for building the future with us.
