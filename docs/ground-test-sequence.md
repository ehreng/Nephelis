# Ground test sequence — Cloudseeker / Project AETHER

**Status:** Schedule draft — no hardware has run  
**Date:** 2026-11-24  
**Program plan (KPIs, spend, make-vs-buy):** `docs/program-gates.md`  
**Brief:** `docs/practical-requirements-brief.md` §6.4  
**Visual lab:** `/preview/visuals`

Founder review is asynchronous during U.S. Army training. Dates below are program targets from `timeline.json` / `mission-control.json` / `tasks.json`, not commitments.

---

## Sequence (do in order)

Each gate is go / no-go / conditional. Do not skip ahead to a prettier demo. Spend and 12-month KPIs live in `docs/program-gates.md`.

| Gate | Name | Package | Target | Status |
|------|------|---------|--------|--------|
| 0 | Balloon film + lab | `docs/gate0-film-rfq.md` | 2027-Q1 | Order written; **ship-to blocked** |
| 1 | Film acid tests | `docs/materials-coupon-test-protocol.md` | 2027-H1 first samples | Protocol written; no tests yet |
| 2 | Helium float prototype | `docs/gate2-he-float-bom.md` | 2027 | BOM scoped; do not build until Gate 1 |
| 3 | Sensor telemetry demo | `docs/gate3-telemetry-schema.md` | 2027–2028 | Mock API live; hardware mock not built |

---

## Gate 0 — Film RFQ + lab

**Package:** `docs/gate0-film-rfq.md`. Thickness, sample count, vendor shortlist, and lab shortlist are filled. **Ship-to is blocked** until a ground operator names a US address. Do not send the RFQ blank.

---

## Gate 1 — Film acid tests

**Protocol:** `docs/materials-coupon-test-protocol.md`  
**Science note:** `research/science/materials-acid-resistance.md`  
**Risk:** R-01 acid degradation

1. Receive PTFE / FEP / PFA / multilayer samples + datasheets.
2. Run C0–C4 matrix (control, 24 h, 7 d, crease, seam) in a qualified lab. Do not improvise concentrated acid.
3. Record mass change, visual score, flexibility. Photos with scale.
4. Decision: Pass film → baseline for Gate 2. Conditional → multilayer plan. All fail → stop envelope fab, expand suppliers.

**Exit:** at least one film Pass on C1–C3, or a documented Conditional path.

---

## Gate 2 — Helium float prototype

**BOM (paper):** `docs/gate2-he-float-bom.md` — Ø **1.2 m**, ~0.90 m³. Do not sew until Gate 1.

Subscale super-pressure sphere at Earth ambient. Not Venus. Not 5 m unless a partner pays for it.

Minimum visible hardware (matches the visual floor, at subscale):

- Envelope with seams and load-line attachments
- Equatorial load ring
- Inflation valve that remains after fill
- Basic pressure / temperature telemetry

Tests: inflate sequence, leak / pressure-hold (`ground-test-leak`), float duration in a hangar or calm outdoor window, recover, inspect seams.

**Exit:** holds pressure for the agreed window; telemetry packet received on the ground; no catastrophic leak.

---

## Gate 3 — Sensor telemetry demo

A black-bay mockup. Does not have to fly.

Minimum ports exercised:

- At least one camera (science or upward envelope)
- One analog or digital environment channel (T or P)
- Cyan status ring as a power-on indicator
- One uplink of a real packet (serial, radio, or networked — document which)

Optional: mass-spec inlet dummy, nephelometer optical path dummy, UHF stub.

**Exit:** a stored packet with timestamp, sensor ID, and a value that an external engineer can plot. Photograph the mockup in the same visual language as `/preview/visuals`.

---

## What this sequence is not

- Not a Venus flight.
- Not an entry/heatshield test.
- Not a CubeSat relay demo (that is a later comms gate).
- These Earth tests are the first spend of the $500k all-in flight stack, not the whole mission.

After Gate 3, the next honest public milestone is a written PDR-lite (`pdr-lite`) with mass/power books that include imaging cadence and night-side energy. Gates 4–8 (PDR-lite through flight stack) are in `docs/program-gates.md`.
