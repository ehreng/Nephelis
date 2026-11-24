# Program gates — Project AETHER / Cloudseeker

**Status:** Working plan — spend is order-of-magnitude, not quotes  
**Date:** 2026-11-24  
**SSOT for sequence:** this file + `docs/ground-test-sequence.md`  
**Public milestones:** `site/content/data/timeline.json`  
**Founder review:** asynchronous during U.S. Army training. Do not block a gate on a same-week answer.

Unique value is **time at 50–55 km** (30–90 days vs VLF ~5 min / DAVINCI ~1 h / VEGA ~46 h). That lives or dies on the envelope. Site, visual lock, sensor table, power book, and relay sketch are ahead of hardware.

Public **$500k** funds the ground program through a PDR-lite (Gates 0–5 if spend is tight; comfortably 0–4). Flight-class cost stays **$5–15M+** or a strong partnership. No committed launch date. Earliest class if gates pass: ~2030–2031+.

---

## Sequence

| When | What | Why this order |
|------|------|----------------|
| Now | Envelope coupons (Gates 0–1) | R-01 is the mission-killing materials risk. |
| After a Pass / Conditional film | Subscale He sphere (Gate 2) | Proves seams, valve, leak rate, float. |
| In parallel, cheap | Bay mock + packet (Gate 3) | Confirms the data contract on COTS. |
| After Gate 3 | Avionics breadboard + UHF (Gate 5) | First real electronics stack. |
| After a comms partner exists | 3U bus (Gate 6) | Separate orbiter. Buy a bus; specify the proximity link. |

CubeSat hardware is a later comms gate. Gate 3 is a black-bay mockup that emits a packet. It does not have to fly.

---

## Gates, KPIs, and money

2026 dollars. Ranges assume university / independent-lab rates and COTS, not a prime contractor.

| Gate | Window | Exit KPI | Spend | $500k burn (cum.) |
|------|--------|----------|------:|------------------:|
| **0 Film RFQ + lab** | now → 2027-Q1 | ≥2 vendors quoted; qualified lab named; ship-to exists; coupon matrix frozen | $2–8k | ~$8k |
| **1 Acid coupons** | 2027-H1 | ≥1 film **Pass** on C1–C3, or a written **Conditional** multilayer path. Mass-change table + photos in git. | $5–25k | ~$30k |
| **2 He float (subscale)** | 2027 | ~1.2 m sphere holds pressure for the agreed window; leak rate recorded; telemetry packet received; seams inspected. | $15–60k | ~$80k |
| **3 Bay mock + packet** | 2027–28 | Stored packet `{v, ts, src, seq, sensors[]}` from a real camera + T/P + ring; external engineer can plot it. | $8–30k | ~$110k |
| **4 PDR-lite** | 2028 | Mass/power/comms books with night = 50–60 h; inflation concept; FMEA on envelope / inflate / power; 10-minute walkthrough from repo docs only. | $20–80k | ~$180k |
| **5 Avionics + UHF breadboard** | 2028 | 50 h “night” on a 400 Wh-class pack at ~3.6 W; UHF proximity over km-class range on Earth; imaging cadence vs ~1.8 MB/day queue demonstrated. | $50–150k | ~$300k |
| **6 3U partner path** | 2028–29 | Named bus + radio class; Earth-orbit comms demo or in-kind LOI. | $200k–$1.5M (Earth 3U) | partner or later raise |
| **7 Entry / inflate** | 2029+ | Drop / vac inflation sequence on a packed envelope. | $1–5M+ | flight money |
| **8 Flight stack** | 2030–31+ class | Wet ~400 kg, gondola 40–55 kg, 3U 4–6 kg, acid-qualified envelope. | **$5–15M+** | outside public campaign |

---

## Gate packages

### Gate 0 — Film RFQ + lab

**Package:** `docs/gate0-film-rfq.md` · protocol: `docs/materials-coupon-test-protocol.md`  
**Issues:** #45 (RFQ), ground-operator / ship-to (blocks send)

1. Freeze ship-to (lab or trusted operator).
2. Send RFQ for PTFE / FEP / PFA / multilayer sheets + seam guidance.
3. Pay a lab to run C0–C4. Do not improvise concentrated acid.
4. Decision feeds Gate 1.

**Blocked on:** a human who can receive a package and a lab PO. Ehren in AIT cannot be that person on a same-week cadence.

### Gate 1 — Acid coupons

**Protocol:** `docs/materials-coupon-test-protocol.md`  
**Risk:** R-01

Pass / Conditional / Fail as written. Photos with scale. Summary table in `research/notes/YYYY-MM-DD-materials-test.md`.

If Gate 1 fails, the program stays a documentation project. If it passes, Gate 2 is the first time Nephelis is a hardware org.

### Gate 2 — Helium float (subscale)

**Package:** `docs/gate2-he-float-bom.md`  
**Issue:** #46 (scoped BOM — do not sew until Gate 1)

Earth ambient. Ø **1.2 m** baseline. Not Venus. Not 5 m unless a partner pays.

### Gate 3 — Bay mock + packet

**Schema:** `docs/gate3-telemetry-schema.md` · mock: `GET /api/telemetry/mock`  
Buy: MCU or Pi class, camera, T/P, LED ring, SD logging. Reuse AETHER-G3/1. Flight OBC and CubeSat radios wait for Gates 5–6.

### Gates 4–8

Paper (4) then breadboard (5) then partner 3U (6) then entry/inflate (7) then flight stack (8). See tables above. Do not buy a Venus 3U before Gate 5 closes.

---

## Make vs buy vs AI

| Work | AI / software | Buy / open / COTS | Partner / lab | Novel, keep in-house |
|------|----------------|-------------------|---------------|----------------------|
| Coupon protocol, RFQ, data logs | Most of the paper | Film from distributors | Acid lab + EHS | The **30–90 d acid + crease + seam dataset** and the go/no-go |
| Subscale sphere | CAD, BOM, seaming procedure | He, valves, COTS logger | Balloon / film converter | Sphere **seams and leak rate** on the chosen film |
| Gate 3 bay | Firmware, dashboard, packet schema (done) | Pi / STM32, camera, met, LEDs | — | Visual / mechanical fit of the flush bay |
| Power | Night-duration model (v1 exists) | Cells, 400 Wh pack, MPPT | Solar vendor later | Polar-patch **acid + packing + 50–60 h night** |
| Probe UHF | Link budget, queue | UHF module class | Radio vendor | Antenna and radio **on an acid float** |
| 3U relay | Store-and-forward software | Whole bus + X-band | CubeSat integrator | Proximity protocol and science queue |
| Met / cameras | Cadence vs power / link | COTS 4K + T/P/wind | — | Duty cycle that survives night and ~1.8 MB/day |
| AFN / TLS / MS | Literature, mass/power table (v0 exists) | — | Sensor lab / university | Event-driven sampling over 30–90 d |
| Entry / heatshield | Trades, VEGA / DAVINCI notes | Ablative shop | Entry advisor (none named yet) | Packed-balloon **inflation sequence** |
| FSW / site / AETHER OS | Most of it | Next.js, git, Vercel | — | Claims discipline and SSOT |

**Rough split of Gates 0–5 effort:** ~50% buy/lab, ~25% AI/docs/software, ~15% partner science, **~10% novel hardware** (seams, leak, night energy, acid dataset). After Gate 6 the novel share jumps: inflation after entry is the other mission-killer (R-02).

---

## 12-month KPI board

| KPI | Target | Gate |
|-----|--------|------|
| Film RFQ sent | 2 vendors | 0 |
| Lab under contract | 1 | 0 |
| Coupons completed | C0–C4, n=3, ≥2 films | 1 |
| Pass or Conditional film | 1 named material | 1 |
| Subscale envelope built | 1 | 2 |
| Pressure-hold hours | agreed window, logged | 2 |
| Real telemetry packet | 1 plottable file | 3 |
| Named sensor or materials partner | 1 answering thread | 0–4 |
| Independent review of sensor grams/watts | issue #47 closed | 4 |

---

## People while the founder is in AIT

Minimum 2027 ground team: one operator (part-time), one materials lab (paid), optional balloon seamer, Ehren on async review.

AI can draft RFQs, BOMs, and analysis. It cannot sign a lab PO or handle acid.

Hold Stripe live, advisor names on the site, and a 2027 launch claim. Hold more homepage art. The next photograph that matters is a coupon on a scale bar.

---

## Related

- Ground sequence: `docs/ground-test-sequence.md`
- Gate 0 RFQ: `docs/gate0-film-rfq.md`
- Gate 2 BOM: `docs/gate2-he-float-bom.md`
- Practical brief: `docs/practical-requirements-brief.md`
- Risks: `site/content/data/risks.json` (R-01 envelope, R-02 inflate, R-05 capital)
