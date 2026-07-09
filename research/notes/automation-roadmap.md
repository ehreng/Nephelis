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
- [x] Digest → optional email to TEAM_EMAIL via Resend (`evolve.ts digest-email`, human-gated)
- [x] Risk matrix chart (SVG from risks.json) on `/mission`
- [x] Mass budget hygiene check in CI (`pnpm check:mass`)
- [x] Telemetry auto-align from mission-control checklist (`evolve.ts telemetry`)

### Growth
- [x] Stripe mode / env drift detector (`evolve.ts env` + `/api/ops` stripe_mode)
- [x] Weekly social draft from digest (`social-from-digest.ts`)
- [x] Partner pipeline aging alerts (`partner-stale.ts`, Mon workflow)

### Knowledge
- [ ] Research brief → auto-suggest heritage/timeline patches (agent PR body)
- [ ] Open-questions resolver: closed Q → science note stub
- [x] Competitor watch list file + weekly checklist (`competitors-watch.json`)

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
