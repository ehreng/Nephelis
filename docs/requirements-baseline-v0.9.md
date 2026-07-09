# Mission requirements baseline v0.9

**Mission:** Project AETHER / Cloudseeker  
**Status:** Draft baseline — TBDs explicit  
**Date:** 2026-07-09  
**Owner:** Mission systems (Nephelis)  
**Related:** `docs/conops-v0.9.md`, `site/content/data/specs.json`, `mass-budget.json`, task `requirements-baseline`

### Legend

| Tag | Meaning |
|-----|---------|
| **REQ** | Shall (baseline unless waived) |
| **GOAL** | Stretch |
| **TBD** | Required decision before PDR-lite |
| **TBR** | To be refined with analysis/test |

IDs are stable for traceability; do not renumber casually.

---

## 1. Mission objectives

| ID | Statement | Priority |
|----|-----------|----------|
| OBJ-1 | Characterize environment in Venus cloud layer ~50–60 km (T, P, winds proxies, aerosols as instrumented) | REQ |
| OBJ-2 | Return engineering data validating long-duration aerostat float in acid clouds | REQ |
| OBJ-3 | Demonstrate low-cost private path to Venus cloud access (cost/ops lessons) | REQ |
| OBJ-4 | Acquire life-detection-**class** or precursor measurements if mass allows | GOAL |
| OBJ-5 | De-risk future larger aerostats / habitation concepts | GOAL |

---

## 2. Mission success criteria

| ID | Criterion | Level |
|----|-----------|-------|
| MS-1 | Survive entry and complete inflation sequence | **Minimum** |
| MS-2 | ≥1 day float with health telemetry returned | **Minimum** |
| MS-3 | ≥30 days float with recurring science + health data | **Baseline** |
| MS-4 | ≥90 days float | **Goal** |
| MS-5 | Public data release of calibrated products within 6 months of EOM | **Baseline** |

---

## 3. Trajectory & launch

| ID | Requirement | Value / notes | Status |
|----|-------------|-----------------|--------|
| TRAJ-1 | Launch year window | **2027** (target 2027-12-15) | REQ |
| TRAJ-2 | Transfer concept | Direct Venus transfer from LEO-class injection | REQ |
| TRAJ-3 | Design Δv budget (onboard/stage) | ~**2500 m/s** class | TBR |
| TRAJ-4 | Design TOF | ~**140–150 days** order | TBR |
| TRAJ-5 | Launch vehicle class | Rideshare or small dedicated; wet mass fit | REQ |
| TRAJ-6 | Wet mass at launch (allocation) | **≤400 kg** target | REQ |
| TRAJ-7 | TCM capability | ≥1 small TCM capability **or** accept open-loop risk | TBD |
| TRAJ-8 | Entry speed design case | ~**10.7 km/s** class hyperbolic | TBR |

---

## 4. Entry, descent, inflation

| ID | Requirement | Value / notes | Status |
|----|-------------|-----------------|--------|
| EDI-1 | Heatshield | Blunt ablative; protect stowed balloon + gondola | REQ |
| EDI-2 | Peak load / heating | Survive design entry case with margin **TBD %** | TBD |
| EDI-3 | Deploy altitude band | Compatible with inflate near **50–60 km** | REQ |
| EDI-4 | Inflation success | Establish super-pressure float without critical leak in T0–T24h | REQ |
| EDI-5 | Inflation autonomy | Complete without ground loop | REQ |
| EDI-6 | Single-fault tolerance | Partial redundancy on inflation path preferred | GOAL |
| EDI-7 | Decelerator | Parachute or aero-only — **architecture TBD** | TBD |

---

## 5. Float platform (aerostat)

| ID | Requirement | Value / notes | Status |
|----|-------------|-----------------|--------|
| FLT-1 | Platform type | Super-pressure balloon | REQ |
| FLT-2 | Target float altitude | **~55 km** (ops 50–60 km) | REQ |
| FLT-3 | Ambient design T | **0–60 °C** band at ops altitude | REQ |
| FLT-4 | Ambient design P | ~**0.5–1 bar** order | REQ |
| FLT-5 | Acid environment | Function in H₂SO₄ aerosol environment for mission life | REQ |
| FLT-6 | Envelope materials | Fluoropolymer multilayer class | REQ |
| FLT-7 | Balloon scale | ~**6.6 m** / ~**150 m³** design point | TBR |
| FLT-8 | Leak rate | Compatible with ≥30 d super-pressure ops | REQ / TBR |
| FLT-9 | Primary life | **≥30 days** float | REQ |
| FLT-10 | Extended life | **90 days** | GOAL |

---

## 6. Mass budget

| ID | Requirement | Value | Status |
|----|-------------|-------|--------|
| MASS-1 | Total wet mass | **≤400 kg** | REQ |
| MASS-2 | Entry dry stack | **150–200 kg** design band | REQ |
| MASS-3 | Heatshield | **50–60 kg** design band | TBR |
| MASS-4 | Balloon + inflation | **35–45 kg** design band | TBR |
| MASS-5 | Gondola + sensors | **40–55 kg** design band | TBR |
| MASS-6 | Avionics/power/comms | **25–35 kg** design band | TBR |
| MASS-7 | Kick stage wet | **330–380 kg** design band (if used) | TBR |
| MASS-8 | Detailed lines ≤ aggregate | CI enforces hygiene (`pnpm check:mass`) | REQ |
| MASS-9 | Growth | Track mass growth; freeze at CDR-lite | REQ |

Source: `site/content/data/mass-budget.json`.

---

## 7. Power & thermal

| ID | Requirement | Value / notes | Status |
|----|-------------|-----------------|--------|
| PWR-1 | Primary power at float | Solar | REQ |
| PWR-2 | Energy storage | Battery sized for night / duty cycle | REQ |
| PWR-3 | Power budget document | Maintain living table (task `power-budget-v1`) | REQ |
| PWR-4 | Survival | Survive design cold/hot float cases | REQ / TBD |
| PWR-5 | Cruise power | Positive or managed decay to entry | TBR |
| THM-1 | Gondola thermal | Instruments within cal range during float | REQ |
| THM-2 | Cruise thermal | Avionics within limits | REQ |

---

## 8. Communications & data

| ID | Requirement | Value / notes | Status |
|----|-------------|-----------------|--------|
| COM-1 | Architecture | 3U relay and/or DTE hybrid | TBD freeze |
| COM-2 | Store-and-forward | Gondola shall store data across outages | REQ |
| COM-3 | Health telemetry | Heartbeat + critical house-keeping each contact | REQ |
| COM-4 | Science volume | Daily volume **TBD Mb/day** after link study | TBD |
| COM-5 | Uplink | Command capability cruise + float (auth TBD) | REQ |
| COM-6 | Security | Authenticated commanding if uplink enabled | REQ |
| DATA-1 | Onboard storage | ≥ **TBD GB** with overwrite policy | TBD |
| DATA-2 | Formats | Documented packet/schema in repo | REQ |
| DATA-3 | Public release | Policy per task `data-rights-policy` | REQ |

---

## 9. Avionics, GNC, flight software

| ID | Requirement | Value / notes | Status |
|----|-------------|-----------------|--------|
| AV-1 | Flight computer | Selected stack with radiation strategy | TBD |
| AV-2 | Fault protection | Safe modes for cruise + float | REQ |
| AV-3 | Autonomy | Entry + inflate without ground | REQ |
| AV-4 | Timekeeping | Mission elapsed + wall-clock sync when linked | REQ |
| GNC-1 | Cruise pointing | As needed for power/comms/TCM | TBR |
| GNC-2 | Float navigation | Coarse position/velocity estimate for science tag | GOAL |
| FSW-1 | Mode machine | Explicit modes matching CONOPS phases | REQ |
| FSW-2 | Config management | Frozen load before ship | REQ |
| FSW-3 | Watchdog | Hardware/software watchdog | REQ |

---

## 10. Science instruments (envelope)

| ID | Requirement | Notes | Status |
|----|-------------|-------|--------|
| SCI-1 | Imagery | Visible and/or NIR camera | REQ |
| SCI-2 | Meteorology | T, P, and/or humidity proxies | REQ |
| SCI-3 | Atmospheric composition | Spectrometer / mass-spec class | REQ or partner |
| SCI-4 | Aerosols | Nephelometer or equivalent | GOAL |
| SCI-5 | Life-detection class | As mass allows; no overclaim | GOAL |
| SCI-6 | Resource | Fit within gondola mass/power (MASS-5, PWR) | REQ |
| SCI-7 | Calibration | Ground cal plan before flight | REQ |

Instrument list in `specs.json` is conceptual until `sensor-suite-baseline` completes.

---

## 11. Environments & qualification

| ID | Requirement | Notes | Status |
|----|-------------|-------|--------|
| ENV-1 | Qual plan | Written before I&T (task `env-qual-plan`) | REQ |
| ENV-2 | Vibration/shock | Launch environments per LV ICD | REQ |
| ENV-3 | TVAC | Avionics/gondola as accessible | REQ |
| ENV-4 | Acid exposure | Coupon + ideally seam tests | REQ |
| ENV-5 | Inflation test | Full sequence dry run on Earth | REQ |
| ENV-6 | EMI/EMC | As needed for radios | TBR |

---

## 12. Ground segment & ops

| ID | Requirement | Notes | Status |
|----|-------------|-------|--------|
| OPS-1 | Ops playbook | Entry→float daily plan | REQ |
| OPS-2 | Rehearsal | ≥1 tabletop + sim before ship | REQ |
| OPS-3 | Staffing | Named on-console roles for entry/float start | REQ |
| OPS-4 | Anomaly process | Log + decision tree | REQ |
| GND-1 | Downlink path | Identified before launch | REQ |
| GND-2 | Public status | Non-commanding public updates | GOAL |

---

## 13. Program, cost, compliance

| ID | Requirement | Notes | Status |
|----|-------------|-------|--------|
| PROG-1 | Cost posture | Lean; **$500k** crowdfund goal (not hard cap of mission) | GOAL |
| PROG-2 | Funding gates | 25% / 50% / 75% task gates | REQ tracking |
| PROG-3 | Export control | Self-screen parts/partners | REQ |
| PROG-4 | Planetary protection | Screening memo before DNA flight packing | REQ |
| PROG-5 | Configuration | Design data in git (`content/data` + docs) | REQ |
| PROG-6 | Risk register | Maintain `risks.json` | REQ |

---

## 14. Crowdfund payload (secondary)

| ID | Requirement | Notes | Status |
|----|-------------|-------|--------|
| CF-1 | Tier 1 | Name engraving on envelope or designated panel | REQ if sold |
| CF-2 | Tier 2 | DNA/sample **sealed inert** capsule only | REQ if sold |
| CF-3 | No interference | Crowdfund items shall not break MASS/EDI/SCI reqs | REQ |
| CF-4 | Fulfillment SOP | Written before scale marketing | REQ |

---

## 15. Verification matrix (summary)

| Method | Examples |
|--------|----------|
| **Analysis** | Trajectory, entry heating, link budget, mass growth |
| **Test** | Coupons, leak, inflation, vibe, TVAC, FSW hardware-in-loop |
| **Inspection** | ICD compliance, config freezes |
| **Demo** | Comms breadboard, solar power demo |

Full VCRM (verification cross-reference) → add at CDR-lite.

---

## 16. TBD burn-down (must close for PDR-lite)

| TBD | Owner | Needed for |
|-----|-------|------------|
| EDI-7 decelerator architecture | Hardware | Entry design |
| COM-1 relay vs DTE | Comms | Partner & mass |
| COM-4 daily data volume | Comms/Science | Storage & power |
| PWR numbers | Avionics | Solar sizing |
| Inflation gas method | Hardware | Balloon BOM |
| TRAJ ephemeris-based TOF/Δv | Mission | Launch broker talks |
| PP category memo | Program | DNA tier |

---

## 17. Document history

| Ver | Date | Notes |
|-----|------|-------|
| 0.9 | 2026-07-09 | Initial baseline from specs, mass budget, CONOPS, risks |
| 1.0 | TBD | After PDR-lite; TBDs closed or waived |

**Change control:** edit this file via PR; bump version when closing TBDs or changing REQ values.
