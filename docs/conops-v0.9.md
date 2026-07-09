# Concept of Operations (CONOPS) v0.9

**Mission:** Project AETHER / Cloudseeker  
**Organization:** Nephelis Industries  
**Document status:** Draft for internal use — not flight-certified  
**Date:** 2026-07-09  
**Target launch:** 2027-12-15 (Q4 2027 window)  
**Related:** `docs/requirements-baseline-v0.9.md`, `site/content/data/*`, tasks `conops-v1`

---

## 1. Mission statement

Deploy a long-duration **super-pressure fluoropolymer balloon** into Venus’s ~**50–60 km** cloud layer (target **~55 km**), operate a compact gondola with imaging, atmospheric, and life-detection-class sensors for **≥30 days** (goal **30–90 days**), and return science + engineering data to Earth via a **store-and-forward / CubeSat-class relay** architecture.

Success is defined as: **controlled entry → successful inflation → sustained float with health + science downlink**, not perfection of every instrument channel.

---

## 2. Architecture snapshot

| Element | Baseline (v0.9) |
|---------|-----------------|
| Total wet mass class | ~**400 kg** |
| Kick / transfer stage (wet) | ~330–380 kg class |
| Entry stack dry (heatshield + balloon + gondola + avionics) | ~150–200 kg class |
| Balloon | Super-pressure, ~**6.6 m** class, ~**150 m³** |
| Float altitude | **~55 km** (ops band 50–60 km) |
| Float life | **≥30 d** requirement; **90 d** goal |
| Transfer | LEO → onboard / stage Δv ~**2.5 km/s** class; TOF ~**140–150 d** order |
| Entry | Hyperbolic ~**10.7 km/s** class; blunt heatshield + decelerator → inflate |
| Comms | Primary: **3U relay or hybrid**; store-and-forward on gondola |

Numbers are design targets in `mass-budget.json` / `specs.json` — refine at PDR-lite.

---

## 3. Mission phases

### Phase 0 — Pre-launch (Earth)

| Item | Description |
|------|-------------|
| **Objective** | Flight stack accepted, software frozen, ops team rehearsed |
| **Actors** | Nephelis + partners + launch provider |
| **Key products** | FAT complete, range/payload ICD inputs, engraving/DNA lists frozen |
| **Go criteria** | Final acceptance test pass; launch LOI/slot confirmed; funding contingency held |
| **No-go** | Critical anomaly open; mass/power out of envelope; unresolved range safety hold |

### Phase 1 — Launch & Earth escape

| Item | Description |
|------|-------------|
| **Objective** | Reach LEO (or direct injection path) then perform Venus transfer injection |
| **Sequence** | Ascent → separation → kick-stage burn(s) → cruise config |
| **Telemetry** | Carrier/vehicle as available; then probe beacon health |
| **Contingencies** | Missed burn window → replan TCM or safe mode + ground analysis |
| **Exit** | Heliocentric transfer trajectory established within Δv/pointing budget |

### Phase 2 — Cruise (~4–5 months)

| Item | Description |
|------|-------------|
| **Objective** | Maintain health; optional TCMs; instrument keep-alive / calibrations |
| **Cadence** | Sparse contacts (TBD: weekly or per link opportunity) |
| **Activities** | Battery/solar checks, thermal, software timers, uplink patches only if essential |
| **Contingencies** | Comms loss → autonomous safe mode; recover next pass |
| **Exit** | Approach phase start (Venus SOI / entry prep epoch) |

### Phase 3 — Approach & entry prep

| Item | Description |
|------|-------------|
| **Objective** | Configure for entry: attitude, timers, final health poll |
| **Sequence** | Uplink final entry parameters if needed → irreversible arming of entry sequence |
| **Go criteria** | Power positive, inflation system status OK, heatshield integrity nominal |
| **No-go / abort** | If entry cannot be supported, options are limited (flyby waste) — **treat as single-shot**; design for autonomy |

### Phase 4 — Atmospheric entry & descent

| Item | Description |
|------|-------------|
| **Objective** | Survive entry heating/loads; decelerate to balloon deploy conditions |
| **Sequence (nominal)** | Atmospheric interface → peak heating → heatshield work → parachute/decelerator (if baselined) → altitude band for inflate |
| **Critical risk** | **R-02** entry/inflation failure |
| **Autonomy** | Primary: **onboard sequence**; ground in the loop only if link exists (assume **not**) |
| **Exit** | Speed/altitude suitable for inflation start |

### Phase 5 — Inflation & float acquisition

| Item | Description |
|------|-------------|
| **Objective** | Inflate super-pressure envelope; establish stable float near ~55 km |
| **Sequence** | Deploy stowed envelope → gas release / chemical gas gen (TBD) → pressurize → cut free from descent gear as designed |
| **Duration** | Minutes to hours (TBD from tests) |
| **Failure modes** | Partial inflate, tear, valve stuck, entanglement — **safe modes limited**; engineering data still valuable if short float |
| **Exit** | Float altitude stable within ops band; solar power online |

### Phase 6 — Float science operations (primary mission)

| Item | Description |
|------|-------------|
| **Objective** | ≥30 days science + engineering telemetry |
| **Orbit/motion** | Ride super-rotating winds; circumnavigation timescale ~**days** order (Venus zonal flow) |
| **Science** | Imagery, met, aerosol/chem proxies, life-detection-class channels as equipped |
| **Comms** | Store onboard → relay via CubeSat/carrier windows; daily target downlink volume **TBD** |
| **Power** | Solar-primary; duty-cycle instruments to energy budget |
| **Health** | Monitor pressure delta, leak rate, thermal, battery SOC |
| **Contingencies** | Low power → science shed; leak → altitude/pressure management if any; comms loss → store until link |

### Phase 7 — Extended mission (goal)

| Item | Description |
|------|-------------|
| **Objective** | Extend to **90 days** if health allows |
| **Criteria** | Envelope integrity, power margin, remaining consumables (if any) |
| **Science** | Long-baseline met / cloud variability |

### Phase 8 — End of mission (EOM)

| Item | Description |
|------|-------------|
| **Objective** | Controlled termination of ops; no planetary protection surprise |
| **Options** | Natural descent after envelope failure; commanded safing; data vault final dump |
| **DNA / payload ethics** | Sealed capsule remains passive; no release mechanisms |
| **Exit** | Final contact or presumed loss; public data release process starts |

---

## 4. Ground segment

| Function | v0.9 approach |
|----------|----------------|
| Mission control | Small team + automated digests; playbooks in repo |
| Tracking / downlink | Partner ground network or commercial / amateur-augmented as available |
| Planning | Weekly ops plan during float; cruise mostly passive |
| Public | Site status strip + MDX updates; no raw unsafe commanding UI |

---

## 5. Decision authorities

| Decision | Authority |
|----------|-----------|
| Launch go/no-go | Ehren + designated systems lead |
| In-flight software patch (cruise) | Systems + software lead concurrence |
| Entry arming | Pre-committed sequence; no real-time “scrub” assumed |
| Science priority table (float) | Science lead with systems power veto |
| Public claims / data release | Ehren |

---

## 6. Timeline (ops-relevant)

| Epoch | Approx |
|-------|--------|
| Launch | 2027-12-15 target |
| Venus arrival | ~2028-05 (≈146 d TOF; refine with ephemeris) |
| Primary float | +0 to +30 d from inflate |
| Extended float | +30 to +90 d |
| Data release #1 | 2028-Q2 target |

---

## 7. Contaminants & planetary protection (placeholder)

- DNA tier: **inert sealed** sample carrier; no active deployment.  
- Full COSPAR/category analysis: **TBD** — task `planetary-protection-screen`.  
- Until memo exists: no public claim of “approved PP category.”

---

## 8. Open questions (block CONOPS v1)

1. Inflation gas source and exact deploy altitude band  
2. Parachute vs pure ballistic + inflate architecture  
3. Relay: dedicated 3U vs host-provided vs DTE-only descope  
4. Contact schedule with real ground assets  
5. Entry sequence timing table from thermal/trajectory analysis  
6. EOM: commanded vs natural  

Track in `research/notes/open-questions.md`.

---

## 9. Document history

| Ver | Date | Notes |
|-----|------|-------|
| 0.9 | 2026-07-09 | First structured CONOPS from site data + war board |
| 1.0 | TBD | After PDR-lite + entry study inputs |

**Next edit triggers:** `entry-corridor-study` results, inflation concept freeze, comms arch review.
