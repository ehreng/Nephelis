# Nephelis Industries — Metrics One-Pager

_Auto-generated from `site/content/data/*` · 2026-07-20T16:20:59.343Z_  
**Do not hand-edit** — run `npx tsx automation/scripts/sync-metrics.ts` after data changes.

## Mission snapshot

| Metric | Value |
|--------|-------|
| Program | Project AETHER / Cloudseeker |
| MCC phase | DESIGN · target 2027-12-15 |
| Probe | Super-pressure balloon |
| Target altitude | 50–60 km (float ~55 km) |
| Wet mass | ~400 kg · balloon ~6.6 m |
| Float duration (baseline) | 30+ days (ops goal 30–90) |
| Launch target | 2027 |
| Vehicles | Rideshare, Dedicated small launcher |
| Transfer | Direct to Venus |
| Funding goal | $500,000 |
| Systems status | SYSTEMS NOMINAL (DESIGN) |
| Open risks | 7 (see risks.json) |

## Science goals

- Characterize habitable cloud layer environment
- Search for biosignatures
- Validate floating platform technology
- De-risk future human missions

## Instruments (concept)

- Atmospheric spectrometers
- High-res cameras
- Meteorological suite
- Life detection experiments

## Funding tiers (site)

| Tier | Price | Capacity | Baseline allocated |
|------|------:|---------:|-------------------:|
| Balloon Engraving | $100 | 500 | 0 |
| DNA Capsule | $500 | 100 | 0 |

_Paid counts come from Stripe at runtime; baseline is static marketing/pre-sales offset._

## Timeline

- **2025** (complete): Concept validation, branding, and early partnership development for Project AETHER
- **2026-Q3** (current): Requirements, CONOPS, system ICD, live crowdfund stack, P0 partner outreach (accelerated Phase A/B start)
- **2026-Q4** (target): PDR-lite, materials & balloon prototype tests, sensor/comms baselining, facility access
- **2027-Q1** (target): CDR-lite, flight hardware fab, payload integration, 50% funding milestone
- **2027-Q2** (target): Environmental qual, system I&T, inflation sequence test, launch LOI / rideshare path
- **2027-Q3** (target): Flight software freeze, ops rehearsals, ship prep, funding closeout
- **2027-Q4** (target): Launch campaign + Venus transfer injection (target window ~2027-12-15)
- **2028-H1** (future): Cruise → Venus entry → balloon float ops (30–90 days) + first public data release
- **2028+** (future): Phase II: larger aerostats → habitation tech path (post-flight lessons)
- **2022+** (background): Agency background: NASA aerobot / ESA concepts for 48–60 km variable balloons

## Open tasks (P0/P1)

- [P0] Execute 30-day war board (docs/30-day-war-board.md) — _in_progress_ (2026-Q3)
- [P0] Flip Stripe to live keys + live webhook; real $100 smoke test — _planned_ (2026-Q3)
- [P0] Execute P0 partner outreach: sensor lab + fluoropolymer supplier — _planned_ (2026-Q3)
- [P1] Confirm 2–3 technical advisors (structures, entry, Venus science) with written scope — _planned_ (2026-Q3)
- [P0] CONOPS v1: launch → cruise → entry → inflate → float → end-of-life (v0.9 drafted in docs/) — _in_progress_ (2026-Q3)
- [P0] System architecture + ICD draft (skeleton in docs/system-icd-skeleton.md) — _in_progress_ (2026-Q3)
- [P0] Mission requirements baseline (v0.9 drafted in docs/requirements-baseline-v0.9.md) — _in_progress_ (2026-Q3)
- [P1] Refine transfer Δv / TOF with published ephemeris (not only Hohmann demo) — _planned_ (2026-Q3)
- [P0] Entry corridor & peak heat-rate study for ~10.7 km/s Venus entry class — _planned_ (2026-Q3)
- [P1] Science traceability matrix: goals → instruments → data products — _planned_ (2026-Q3)
- [P1] Planetary protection / DNA-tier legal-regulatory screening memo — _planned_ (2026-Q3)
- [P1] Fill first research brief with cited Venus aerobot / materials sources — _planned_ (2026-Q3)
- [P1] Recruit core volunteer leads: structures, avionics, software, science — _planned_ (2026-Q3)
- [P0] Preliminary design review (lite): freeze interfaces, mass/power books — _planned_ (2026-Q4)
- [P0] Fluoropolymer acid coupon campaign (protocol: docs/materials-coupon-test-protocol.md) — _in_progress_ (2026-Q4)
- [P0] Build subscale super-pressure balloon prototype #1 (Earth ambient) — _planned_ (2026-Q4)
- [P0] Envelope leak / pressure-hold ground test protocol + first run — _planned_ (2026-Q4)
- [P0] Heatshield geometry/material trade (blunt body mass vs peak load) — _planned_ (2026-Q4)
- [P0] Balloon inflation system concept (gas budget, valves, sequence) — _planned_ (2026-Q4)
- [P0] Baseline sensor suite with mass/power/data rates (imagery, MS, met, bio) — _planned_ (2026-Q4)
- [P0] MOU or in-kind LOI with at least one sensor / lab partner — _planned_ (2026-Q4)
- [P0] Receive materials samples + vendor datasheets for envelope film — _planned_ (2026-Q4)
- [P1] Select flight computer / rad-tolerant strategy (COTS + shielding trade) — _planned_ (2026-Q4)
- [P0] Power budget v1: solar at float, battery, duty cycles (v0 data: power-budget.json) — _in_progress_ (2026-Q4)
- [P0] Comms architecture review: direct-to-Earth vs 3U relay vs hybrid — _planned_ (2026-Q4)
- [P1] CubeSat bus/radio partner shortlist (flight heritage preferred) — _planned_ (2026-Q4)
- [P1] Flight software skeleton: modes, fault protection, telemetry schema — _planned_ (2026-Q4)
- [P1] Secure lab/fab access (clean workbench, pressure test, electronics) — _planned_ (2026-Q4)
- [P1] Export control / ITAR-EAR self-screen for parts & partners — _planned_ (2026-Q4)
- [P0] Hit 25% of $500k funding goal (cash + committed in-kind valued) — _planned_ (2026-Q4)
- [P0] Critical design review (lite): drawings, BOMs, test plans signed — _planned_ (2027-Q1)
- [P0] Fabricate flight-intent balloon envelope + inflation hardware — _planned_ (2027-Q1)
- [P0] Fabricate gondola structure + instrument mounts — _planned_ (2027-Q1)
- [P0] Fabricate/procure heatshield + attachment hardware — _planned_ (2027-Q1)
- [P0] Integrate sensor suite into gondola (electrical + mechanical) — _planned_ (2027-Q1)
- [P0] Flight avionics board bring-up + sensor drivers — _planned_ (2027-Q1)
- [P1] Solar + battery power demo at expected float illumination — _planned_ (2027-Q1)
- [P0] Comms breadboard: packet radio / store-and-forward demo — _planned_ (2027-Q1)
- [P0] Baseline CubeSat relay (buy vs partner vs descoped direct link) — _planned_ (2027-Q1)
- [P0] Kick/transfer stage: make vs buy vs rideshare-provided Δv — _planned_ (2027-Q1)
- [P0] Hit 50% of $500k goal (cash + binding in-kind) — _planned_ (2027-Q1)
- [P1] Close first corporate / logo sponsorship above individual tiers — _planned_ (2027-Q1)
- [P1] Instrument calibration plan + ground truth datasets — _planned_ (2027-Q1)
- [P0] Environmental qualification plan signed (TVAC, vibe, shock, thermal) — _planned_ (2027-Q2)
- [P0] Vibration / shock test of integrated stack (or mass model path) — _planned_ (2027-Q2)
- [P0] Thermal-vacuum test of gondola/avionics (or chamber access partner) — _planned_ (2027-Q2)
- [P1] Cold / altitude-chamber or high-altitude balloon analog for envelope — _planned_ (2027-Q2)
- [P0] End-to-end system integration test: power → sensors → store → radio — _planned_ (2027-Q2)
- [P0] Full inflation sequence dry run on Earth (timed, instrumented) — _planned_ (2027-Q2)
- [P0] Flight software fault protection + safe modes verified on hardware — _planned_ (2027-Q2)
- [P0] Launch path LOI / rideshare reservation for 2027 Venus window class — _planned_ (2027-Q2)
- [P0] Sign launch broker or secondary payload agreement (or dedicated option) — _planned_ (2027-Q2)
- [P1] Range safety / payload ICD inputs for launch provider — _planned_ (2027-Q2)
- [P0] Hit 75% of funding goal before integration freeze — _planned_ (2027-Q2)
- [P1] Ground station / data downlink operations plan (partners or commercial) — _planned_ (2027-Q2)
- [P0] Flight software freeze + config management for flight load — _planned_ (2027-Q3)
- [P0] Ops playbook v1: entry through float daily comms windows — _planned_ (2027-Q3)
- [P0] Mission ops rehearsal (tabletop + sim): anomalies and contingencies — _planned_ (2027-Q3)
- [P0] Ship/flight prep: packing, hazardous materials, logistics to launch site — _planned_ (2027-Q3)
- [P1] Freeze Tier-1 engraving list + DNA capsule packing procedure — _planned_ (2027-Q3)
- [P1] Launch press kit + media list + embargo plan — _planned_ (2027-Q3)
- [P0] Close remaining funding / contingency reserve for launch ops — _planned_ (2027-Q3)
- [P0] Final acceptance test of flight stack before ship — _planned_ (2027-Q3)
- [P1] Independent red-team risk review (entry, inflate, comms, power) — _planned_ (2027-Q3)
- [P0] Launch campaign: integration with vehicle, checkouts, go/no-go — _planned_ (2027-Q4)
- [P0] Launch in Q4 2027 Venus transfer window (target 2027-12-15) — _planned_ (2027-Q4)
- [P0] Cruise operations: health checks, TCMs if any, instrument keep-alive — _planned_ (2027-Q4)
- [P0] Venus approach & entry ops: real-time decision tree execution — _planned_ (2028-Q1)
- [P0] Float operations day 1–30: science collection + daily downlink — _planned_ (2028-Q1)
- [P1] Extended float to 90 days if health allows — _planned_ (2028-Q2)
- [P0] Public data release #1 + mission report — _planned_ (2028-Q2)
- [P1] Lessons learned → Phase II larger aerostat / habitat tech roadmap — _planned_ (2028-Q2)

## Top risks

- **R-01** (high): Acid degradation of balloon envelope
- **R-02** (critical): Entry / inflation sequence failure
- **R-03** (high): Comms blackout / insufficient downlink
- **R-04** (high): Launch rideshare slip past 2027 window
- **R-05** (high): Crowdfund / partner capital shortfall

## Pitch talking points

1. Venus cloud layer is the most Earth-like environment off-Earth (pressure/temp/gravity).
2. Lean private probe: crowdfund + partners vs multi-$M class missions.
3. Platform is habitation-relevant (aerostat), not only flyby science.
4. Public, data-driven roadmap + open collaboration (humans + AI agents).

---

Site: https://nephelisindustries.com · Repo: https://github.com/ehreng/Nephelis
