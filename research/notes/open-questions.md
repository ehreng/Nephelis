# Open questions

Living list for humans + agents. Resolve → move to science notes or specs.

## Mission design

Tracked also in `docs/conops-v0.9.md` §8 and `docs/requirements-baseline-v0.9.md` §16.

- [ ] Final heatshield mass and geometry trade
- [ ] Inflation gas budget vs. acid-protection mass
- [x] CubeSat relay vs. carrier-provided comms vs DTE descope — **baseline: 3U store-and-forward** (`docs/comms-link-v0.md`). Carrier/DTE remains a descope, not closed.
- [x] Power budget at float (solar vs duty cycle) with numbers in mass-budget or new power.json — **v1:** ~8 W day / 3.6 W night, 28 W peak patch, 400 Wh battery. Thin dayside margin.
- [ ] Parachute vs aero-only decelerator architecture
- [ ] Entry sequence timing table from thermal/trajectory analysis
- [x] Daily science downlink volume (Mb/day) after link study — **v0 estimate:** ~0.3 / 1.8 / 9.6 MB/day far/typical/close (`comms-link.json`). Not a closed budget.

## Program

- [ ] Primary launch vehicle commitment path (F9 rideshare vs Starship secondary)
- [ ] Regulatory / planetary protection posture for DNA capsule tier
- [ ] Named P0 sensor lab + materials vendor (replace TBD in partners.json)

## Website / growth

- [x] Resend + Stripe test path verified on production
- [ ] Stripe **live** keys + live webhook
- [ ] Canonical `NEXT_PUBLIC_SITE_URL=https://www.nephelisindustries.com`
- [ ] First organic social post from automation drafts

## Research hygiene

- [ ] Date-stamp competitor files monthly
- [ ] Keep phosphine / biosignature claims carefully caveated
- [ ] First materials coupon results logged under research/notes/
