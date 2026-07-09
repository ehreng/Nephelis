# Research knowledge base

Living notes that feed the site, digests, and agent loops. **Structured JSON in `site/content/data/` remains the public source of truth** for numbers shown on the website; this folder holds reasoning, sources, and competitor depth.

## Layout

```
research/
├── INDEX.md              # auto-generated map (run evolve.ts kb)
├── README.md             # this file
├── science/              # atmospheric, materials, instruments
├── competitors/          # Rocket Lab, agency aerobots, etc.
└── notes/                # digests, briefs, open questions
    ├── open-questions.md
    ├── LATEST-DIGEST.md  # pointer to newest mission digest
    └── YYYY-MM-DD-*.md
```

## Cadence

| When | What |
|------|------|
| Monday | Research scaffold PR + mission digest PR |
| After site data change | Metrics + press kit refresh |
| Anytime | Add a dated note; re-run `kb-index` |

## Writing rules

1. Date your last review at the top of competitor/science files.
2. Cite URLs for non-obvious claims.
3. Mark speculation explicitly.
4. When a finding should hit the public site, also update JSON or add MDX under `site/content/updates/`.

## Commands

```bash
npx tsx automation/scripts/evolve.ts digest
npx tsx automation/scripts/evolve.ts research
npx tsx automation/scripts/evolve.ts kb
```
