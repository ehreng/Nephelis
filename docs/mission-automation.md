# Mission automation architecture

How Nephelis runs as a **content + ops machine** around Project AETHER.

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│  Research KB │────▶│  content/data/* │────▶│  Next.js site│
│  research/   │     │  (source truth) │     │  Vercel     │
└──────────────┘     └────────┬────────┘     └──────────────┘
        ▲                     │
        │              automation/scripts
        │                     │
        └──── digests/press/metrics/social ◀── GitHub Actions
```

## Principles

1. **Single source of numbers** — JSON under `site/content/data/`.
2. **Derived artifacts** — digests, press kit, metrics, social drafts are generated.
3. **Human gates** — science claims and public posts require review.
4. **Fail loud** — CI validates schemas; health check fails if prod breaks.

## Scheduled workflows

| Workflow | Schedule | Purpose |
|----------|----------|---------|
| `research-weekly.yml` | Mon 14:00 UTC | Research scaffold PR |
| `mission-digest.yml` | Mon 15:00 UTC | Digest + KB + press + metrics PR |
| `health-check.yml` | Daily 16:00 UTC | Prod probes |
| `link-check.yml` | Sun + heritage PRs | External link hygiene |
| `ci.yml` | push/PR | Build gate |
| `social-draft.yml` | updates/** push | Social PR |
| `metrics-sync.yml` | data/** push | Metrics PR |

## Agent entrypoints

- Chat: “Run mission digest and update risks”
- CLI: `npx tsx automation/scripts/evolve.ts full`
- Specs: `AGENTS.md`, `automation/prompts/mission-ops.md`

## Adding a new automation

1. Prefer a script in `automation/scripts/` that reads JSON / writes markdown.
2. Wire a mode in `evolve.ts`.
3. Add a workflow only if it should run unattended.
4. Document in `automation/README.md` + `research/notes/automation-roadmap.md`.
5. Keep outputs deterministic and reviewable in git.
