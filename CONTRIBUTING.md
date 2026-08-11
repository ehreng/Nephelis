# Contributing to Nephelis Industries (Project AETHER)

Thank you for helping humanity's return to the clouds.

This project runs under **AETHER OS** — an AI-coordinated, contribution-first operating system.  
Architecture: [`docs/AETHER_OS_Architecture_v1.md`](./docs/AETHER_OS_Architecture_v1.md) · Task format: [`docs/TASK_TEMPLATE.md`](./docs/TASK_TEMPLATE.md)

## Contribution tiers

| Level | Who | Examples | Gate |
|-------|-----|----------|------|
| **L1** | Anyone | Content, social, ideas, simple graphics | Open |
| **L2** | Skilled | Code, simulations, technical writing, design, automation | PR review |
| **L3** | Trusted | Hardware, regulatory, deep engineering | Invite / explicit review |

### How to claim work

1. Open a **Daily Mission Brief**: `aether-os/briefs/latest.md` (or GitHub Issues labeled `claimable`).
2. File or pick an issue (use templates: L1 / L2 / L3 / Task).
3. Comment: **`claiming`**.
4. Submit a PR or attach evidence (screenshots, paths, URLs, commit SHAs).
5. After verification, a row is added to [`aether-os/CONTRIBUTIONS.md`](./aether-os/CONTRIBUTIONS.md).

Site form: [nephelisindustries.com/#contribute](https://www.nephelisindustries.com/#contribute)

## Ways to contribute

### 1. Content & research (L1–L2)
- Update JSON in `site/content/data/` (`timeline`, `specs`, `tasks`, `risks`, `partners`, `mass-budget`, …)
- Add MDX updates in `site/content/updates/`
- Improve `research/` (see `research/README.md` + `INDEX.md`)
- Agents: follow root `AGENTS.md`

### 2. Visuals & design (L1–L2)
- Prompts: `automation/prompts/visual-brief.md`
- Assets: `assets/visuals/` → sync to `site/public/assets/visuals/`

### 3. Code & features (L2)
- Next.js 15 + TypeScript + Tailwind under `site/`
- Improve planner, forms, telemetry, pages
- After data edits: `cd site && pnpm validate:content`

### 4. Automation & AETHER OS loops (L2)
- Scripts: `automation/scripts/`
- Daily Mission: `npx tsx automation/scripts/evolve.ts daily`
- Improve prompts; fill research PRs from CI

### 5. Hardware / regulatory (L3)
- Only after acknowledgment from Founder Emeritus or designated reviewer
- Log safety/export concerns in the issue

## Development setup

```bash
cd site && pnpm install && pnpm dev
# http://localhost:3000
```

## Principles

- **Transparency over secrecy**
- **Verification over trust alone**
- **No invented partners, contracts, or science results**
- **Agents propose; humans merge** high-impact public claims
- Founder: Ehren Goossens — **Founder Emeritus / Strategic Oversight** (can pause any loop)

## Legal note

Entity structure is evolving toward a 501(c)(3). See `aether-os/LEGAL_STATUS.md` for working notes (non-binding).
