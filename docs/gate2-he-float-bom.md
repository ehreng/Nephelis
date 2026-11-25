# Gate 2 — Subscale helium float BOM (scoped, not built)

**Status:** Paper only. Do not sew film until Gate 1 Pass / Conditional.  
**Date:** 2026-11-24  
**Gate:** 2 in `docs/program-gates.md` and `docs/ground-test-sequence.md`  
**Issue:** [#46](https://github.com/ehreng/Nephelis/issues/46)  
**Tasks:** `balloon-prototype-1`, `ground-test-leak`

This is an **Earth-ambient** hangar / calm-outdoor demonstrator. Not Venus. Not entry. Not CubeSat. Not Ø 5–6.6 m unless a partner pays.

---

## Scale decision

| Param | Baseline | Notes |
|-------|----------|--------|
| Shape | Sphere | Matches visual lock and super-pressure intent |
| Diameter | **1.2 m** | Hangar-friendly; two people can carry |
| Volume | **0.90 m³** (32 ft³) | 4/3 π r³, r = 0.6 m |
| Surface | **4.52 m²** (49 ft²) | 4 π r² |
| Film order | **~7 m²** | ~50% waste for gores, seams, scrap |
| He fill | **~1 m³** | One small cylinder is enough |
| Static lift (He, STP) | **~1.0 kg** | ~1.1 kg/m³ × 0.9 m³ |
| Envelope mass target | **< 400 g** | 1 mil FEP ≈ 55 g/m² × 4.5 m² ≈ 250 g + tapes |
| Payload | **≤ 400 g** | COTS T/P logger + valve + battery |
| Free lift | residual | Keep ballast option (water bottles) |

Stretch (only if Gate 1 film is cheap and a shop will sew it): Ø 1.5 m (1.77 m³, ~1.9 kg lift). Still not flight scale.

FEP density ~2.15 g/cm³; 1 mil (25.4 µm) ≈ 55 g/m². Catalog hint: CS Hyde lists 0.5 mil × 24 in FEP on the order of ~$11 / linear foot (public page 2026-11-24). **Quote required.** Film for 7 m² of 1 mil is likely hundreds of dollars; **labor to gore and heat-seal is the swing item** ($2–10k if a converter does it, lower if a volunteer seamer exists).

---

## BOM (do not purchase the envelope until Gate 1)

Prices are ROM, 2026 USD, US retail / lab-shop.

| ID | Item | Qty | ROM | Buy vs make | Notes |
|----|------|----:|----:|-------------|-------|
| B-01 | FEP or PFA film, 1 mil, ~7 m² | 1 lot | $300–1,200 | Buy | Same resin that Passed Gate 1 |
| B-02 | Gore pattern / CAD | 1 | $0–400 | AI + volunteer | 8–12 gores; leave this in git |
| B-03 | Heat-seal / weld of sphere | 1 | $2,000–10,000 | Partner converter (Durafilm class) or trained seamer | Do not improvise a first sphere on a kitchen iron |
| B-04 | Load tapes / equatorial ring | 1 | $50–300 | Buy webbing + make | Visual floor: equatorial load ring |
| B-05 | Fill valve, remains on vehicle | 1 | $20–150 | Buy | Plastic bulkhead + check valve; cap after fill |
| B-06 | Helium, ~40–80 scf + regulator | 1 | $50–200 | Buy / rent | One K-cylinder is surplus |
| B-07 | T/P logger (BMP280 or equal) | 1 | $15–40 | COTS | Met channel for the packet |
| B-08 | MCU + SD + USB serial | 1 | $20–80 | COTS | ESP32 / Arduino class. Packet = AETHER-G3/1 subset |
| B-09 | Coin or 1S Li-ion + power switch | 1 | $10–30 | COTS | Hours of hold, not 50 h night |
| B-10 | Soft harness / attachment patches | 1 set | $20–80 | Make | Load-line attachments on the envelope |
| B-11 | Scale, camera, tape, manometer | 1 kit | $50–200 | Buy / borrow | Documentation |
| B-12 | Hangar or gym time | 1 window | $0–1,000 | Borrow | Calm indoor first; outdoor optional |
| B-13 | Shipping / He hazmat if any | — | $50–200 | Buy | |
| **—** | **Subtotal hardware** | | **~$600–3,700** | | Without professional seaming |
| **—** | **With converter seaming** | | **~$3k–15k** | | Matches program-gates Gate 2 low end |
| **—** | **Loaded (contingency, travel, second unit)** | | **$15–60k** | | Program-gates range; second unit + labor |

Minimum visible hardware (from the ground-test sequence): envelope with seams and load-line attachments, equatorial load ring, inflation valve that remains after fill, basic pressure / temperature telemetry.

---

## Leak / pressure-hold procedure (stub)

Task `ground-test-leak`. First run writes the numeric leak limit; v0 is qualitative plus a recorded curve.

### Equipment

- Inflated sphere on a soft pad, indoors, no sharp objects
- Logger (B-07/B-08) sampling P and T at ≤ 1/min
- Independent manometer or second BMP280
- Scale under a hanging point if mass-loss of He is used later
- Camera on a tripod (t+0, t+1 h, t+4 h, t+24 h)

### Steps

1. Photograph envelope, seams, valve, logger. Record film lot and gore count.
2. Weigh dry stack (envelope + valve + logger).
3. Inflate with He to **sphere-full at ambient**, then add superpressure **ΔP = +1 to +3 kPa** (about 10–30 cm H₂O). Record fill mass / cylinder pressure drop.
4. Close valve. Valve **stays on the vehicle**.
5. Hold **4 hours** indoor. Log P, T. Inspect seams by eye and touch (no tools that can puncture).
6. Continue to **24 hours** if the 4 h hold is intact.
7. Optional: short tethered float in the same room (clear ceiling, two handlers).
8. Vent outdoors or per He SOP. Inspect seams. Photograph.

### Pass / fail (Gate 2 exit)

| Result | Meaning |
|--------|---------|
| **Pass** | No catastrophic leak; holds a measurable ΔP for the 4 h window; **telemetry packet received** on the ground (USB, SD file, or radio — document which); seams intact on inspection |
| **Conditional** | Slow leak but recoverable; document rate; repair path |
| **Fail** | Burst, seam split, valve blow-out, or no packet |

Numeric leak % / day is **TBD after the first curve**. Do not invent a flight leak spec from this hangar run.

Copy of sequence exit: *holds pressure for the agreed window; telemetry packet received on the ground; no catastrophic leak.*

---

## Packet

Reuse `docs/gate3-telemetry-schema.md` (AETHER-G3/1) with at least `MET.T` and `MET.P`. A USB serial dump or SD JSONL file counts. Radio is optional at Gate 2.

---

## What this is not

- Not a Venus flight or 50–55 km claim
- Not an entry / heatshield / inflation-after-hypersonic test
- Not a CubeSat relay demo
- First hardware spend of the $500k all-in flight stack, not the whole mission

---

## Related

- Program plan: `docs/program-gates.md`
- Sequence: `docs/ground-test-sequence.md`
- Gate 3 schema: `docs/gate3-telemetry-schema.md`
