# Nephelis Website

Next.js site for Nephelis Industries.

## Development

```bash
pnpm install
pnpm dev
```

## Content Model

The site is intentionally data-driven so agents can evolve it:

- `content/data/` → JSON specs, timeline, etc.
- `content/updates/` → MDX blog/updates
- All mission facts live in structured files first.

## Automation

See `../automation/` for agent prompts and scripts that keep the site current.

## Deployment

Deploy to Vercel. Connect the `nephelis` repo (or `site` subdirectory).
