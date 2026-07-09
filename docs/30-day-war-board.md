# 30-day war board — Project AETHER

**Window:** next ~30 days from 2026-07-09  
**North star:** end the month with (1) money path live, (2) design paper trail started, (3) two partner threads moving, (4) first hardware test path defined.

Source of truth for full list: `site/content/data/tasks.json` · public view: `/roadmap`

---

## Success criteria (day 30)

| # | Outcome | Linked tasks |
|---|---------|----------------|
| 1 | Stripe **live** + one real payment | `stripe-live` |
| 2 | Crowdfund SOP written (fulfillment for Tier 1/2) | `funding-campaign-v1` → **done** `docs/funding-fulfillment-sop.md` |
| 3 | CONOPS v0.9 circulated internally | `conops-v1` → **drafted** `docs/conops-v0.9.md` |
| 4 | System ICD skeleton (even incomplete) | `system-architecture-icd` → **drafted** `docs/system-icd-skeleton.md` |
| 5 | Requirements baseline draft | `requirements-baseline` → **drafted** `docs/requirements-baseline-v0.9.md` |
| 6 | ≥2 sensor labs + ≥2 materials vendors named & contacted | `partner-p0-outreach` |
| 7 | Materials test plan written (coupons ready to order) | `materials-coupon-campaign` → **protocol** `docs/materials-coupon-test-protocol.md` |
| 8 | Weekly public pulse (1 post + optional MDX) | `social-post-cadence` |

Stretch (if capacity): entry corridor literature dig started (`entry-corridor-study`), advisor soft commits (`advisor-board-soft`).

---

## Week 1 — Cash & control (days 1–7)

**Theme:** stop leaking ops energy; make revenue real; freeze “what we’re building.”

| Day focus | Task IDs | Owner default | Done when |
|-----------|----------|---------------|-----------|
| Stripe live flip | `stripe-live` | Ehren | Live webhook 200; real $100 charge (+ refund OK) |
| Funding SOP | `funding-campaign-v1` | Ehren | **Drafted** `docs/funding-fulfillment-sop.md` — human: live Stripe + private sheet |
| CONOPS outline | `conops-v1` | Mission | One-pager: phases, decisions, failure modes (bullet form OK) |
| Requirements skeleton | `requirements-baseline` | Mission | Table: science / mass / power / data / reliability (TBD allowed) |
| Partner list build | `partner-p0-outreach` | Growth | Spreadsheet: 3 labs + 3 film suppliers with emails |

**Week 1 exit review (30 min):** war board checkboxes; update `partners.json` `last_touched` after each send.

---

## Week 2 — Architecture & outreach (days 8–14)

**Theme:** paper interfaces + first conversations.

| Focus | Task IDs | Done when |
|-------|----------|-----------|
| ICD draft v0 | `system-architecture-icd` | Block diagram + interface list (mech/elec/data) in `research/notes/` or `docs/` |
| CONOPS v0.9 | `conops-v1` | Sequence table launch→EOM; open questions listed |
| Requirements v0.9 | `requirements-baseline` | Numbers where known; TBDs owned |
| Send P0 emails | `partner-p0-outreach` | All draft emails in `docs/partner-outreach-drafts.md` sent or scheduled |
| Materials RFQ package | `partner-materials-samples` prep | RFQ body + qty/specs ready (see outreach doc) |
| Social pulse #1 | `social-post-cadence` | Post from `automation/social-drafts/` |

**Optional deep work:** start `entry-corridor-study` lit review (2–3 papers linked in research notes).

---

## Week 3 — Test path & sensors (days 15–21)

**Theme:** path to first physical test; lock instrument thinking.

| Focus | Task IDs | Done when |
|-------|----------|-----------|
| Coupon test plan | `materials-coupon-campaign` | Written protocol: acid %, T, duration, pass/fail |
| Balloon proto plan | `balloon-prototype-1` | Size/scale decision + BOM draft for subscale #1 |
| Leak test protocol | `ground-test-leak` | Procedure doc stub + equipment list |
| Sensor baseline v0 | `sensor-suite-baseline` | Table: instrument, mass g, power W, data rate, TRL guess |
| Follow-ups | partners | Second touch on non-responders; update pipeline status |
| Advisor soft asks | `advisor-board-soft` | 2 people asked for 1h/month advisory |

---

## Week 4 — Close the loop (days 22–30)

**Theme:** freeze enough to enter PDR-lite prep (Q4).

| Focus | Task IDs | Done when |
|-------|----------|-----------|
| ICD + requirements merged | `system-architecture-icd`, `requirements-baseline` | Single “design package” folder or note |
| CONOPS v1 tag | `conops-v1` | Mark task `in_progress`→ keep until Q3 end; ship v1 PDF/MD |
| Power budget sketch | `power-budget-v1` (early) | Order-of-magnitude table only |
| Comms arch questions list | `comms-arch-review` | Decision tree: DTE vs relay vs hybrid |
| Funding narrative live | `funding-campaign-v1` | Site copy + email templates consistent |
| War board retro | — | Update tasks.json statuses; run `evolve.ts digest` |
| Public update | `social-post-cadence` | Week 4 mission pulse |

**Month-end gate (PDR-lite readiness):** can you walk a stranger through mass, sequence, risks, and next test in 10 minutes using only repo docs?

---

## Daily cadence (lightweight)

```
□ 15 min: triage email / partner replies → partners.json last_touched
□ 90–180 min: one war-board deep task (not two)
□ 5 min: tick tasks.json status if moved
```

Friday: `npx tsx automation/scripts/evolve.ts digest` + skim LATEST-DIGEST.

---

## Explicitly NOT in the next 30 days

Avoid scope creep:

- Full CDR / flight fab  
- Launch vehicle contract  
- TVAC / vibe (need hardware first)  
- Perfect science instrument selection  
- Auto-posting social without review  

---

## RACI (default lean team)

| Role | Focus |
|------|--------|
| Ehren | Stripe live, funding SOP, partner sends, final calls |
| Mission/systems (you or volunteer) | CONOPS, requirements, ICD |
| Hardware lead (recruit) | Materials plan, balloon proto plan |
| Science lead (recruit) | Sensor table |
| Agents | Digests, drafts, research briefs — **human merge** |

---

## Commands

```bash
# After status changes
npx tsx automation/scripts/evolve.ts digest
npx tsx automation/scripts/evolve.ts partners
cd site && pnpm validate:content
```

Update this board when week 1 ends — date a new file `docs/30-day-war-board-YYYY-MM.md` if you want history.
