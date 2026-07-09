# Automation roadmap (mission machine)

Living list of automation we want around Project AETHER. Implemented items move to ✅.

## ✅ In place

- Content-as-data + JSON schemas + CI validate  
- Stripe checkout + webhook + allocation API  
- Resend leads / auto-reply / volunteer intake  
- Weekly research scaffold → PR  
- Social drafts from MDX → PR  
- Metrics one-pager sync  
- Mission digest + KB index + press kit scripts  
- Prod health check + heritage link check workflows  
- Public roadmap, telemetry strip, ops dashboard  
- AGENTS.md + ops prompts  

## 🔜 Next automation goals

### Mission ops
- [ ] Digest → optional email to TEAM_EMAIL via Resend (human-gated weekly)
- [ ] Risk burn-down chart (SVG from risks.json) on `/mission`
- [ ] Mass budget margin calculator (wet vs sum of maxes) in CI
- [ ] Telemetry auto-bump when checklist items flip to `done`

### Growth
- [ ] Stripe live mode checklist automation (env drift detector)
- [ ] Weekly social draft even without new MDX (from digest bullets)
- [ ] Partner pipeline aging alerts (next_step stale > 14 days)

### Knowledge
- [ ] Research brief → auto-suggest heritage/timeline patches (agent PR body)
- [ ] Open-questions resolver: closed Q → science note stub
- [ ] Competitor RSS/watch list file + weekly diff

### Engineering
- [ ] Visual regression (Playwright) on hero + funding
- [ ] Link check expand to MDX + press kit URLs
- [ ] Sandbox e2e: reserve → checkout session created (test keys)

## Cadence reminder

| Day | Automation |
|-----|------------|
| Mon 14:00 UTC | Research scaffold |
| Mon 15:00 UTC | Mission digest |
| Daily 16:00 UTC | Health check |
| Sun 12:00 UTC | Heritage links |
| On push data/ | Metrics / social as configured |
