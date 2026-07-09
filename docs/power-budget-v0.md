# Power budget v0 (order-of-magnitude)

**Status:** Architecture estimates — **not flight**  
**Date:** 2026-07-09  
**Source of truth:** `site/content/data/power-budget.json`  
**Task:** `power-budget-v1`  
**Requirements:** PWR-* in `docs/requirements-baseline-v0.9.md`

---

## Summary (average load ≈ Σ power × duty)

| Mode | Est. average load | Notes |
|------|------------------:|-------|
| Cruise | **~2.5 W** | Idle + sparse contacts + light thermal duty |
| Float day | **~7.7 W** | Science + relay windows + margin line |
| Float night | **~2.7 W** | Shed science; survival |
| Entry + inflate | **~10.5 W** avg over short window | Peak actuators higher; battery-driven |

**Generation / storage:** not yet sized (`null` in JSON). Next analysis: solar geometry at ~55 km, array area vs gondola mass, night energy, entry pulse.

---

## Design implications (v0)

1. **Float day ~8 W avg** suggests a modest solar array is plausible if peaks and dust/acid derating allow — **must close with real cells**.  
2. **Night ~3 W** drives battery Wh once night duration at latitude/season is modeled.  
3. **Cruise ~3 W** is easier; thermal is the wildcard (heater duty).  
4. **Mass-spec-class channel** at 8 W × 15% duty is a major float term — partner/descope lever.  
5. Entry energy is short but high peak — separate battery peak-current check.

---

## Load tables

See JSON for full IDs. All `estimate: true`.

### Cruise
- Avionics idle 1.5 W @ 100%  
- Heaters 5 W @ 15%  
- RF contact 8 W @ 2%  
- Instrument keep-alive 2 W @ 5%  

### Float day
- Avionics 2.5 W continuous  
- Camera 4 W @ 10%  
- Met 1 W @ 50%  
- Chem/MS 8 W @ 15%  
- Nephelometer 1.5 W @ 20%  
- Comms 10 W @ 8%  
- Margin 2 W continuous  

### Float night
- Avionics 1.5 W  
- Met low 0.5 W @ 30%  
- Comms rare 10 W @ 2%  
- Heater 4 W @ 20%  

---

## How to update

1. Edit `site/content/data/power-budget.json`  
2. Recompute mode averages → `derived_avg_w`  
3. `pnpm check:power` && `pnpm validate:content`  
4. Refresh this doc summary if averages move  

Later: `automation/scripts/sync-power-doc.ts` (optional).

---

## Open work

- [ ] Solar peak W at float (array area trade vs MASS-5/6)  
- [ ] Battery Wh + DoD  
- [ ] Replace MS power with partner datasheet  
- [ ] Link budget ↔ comms duty cycle  
- [ ] Thermal model → heater duty  

---

## History

| Ver | Date | Notes |
|-----|------|-------|
| 0.0 | 2026-07-09 | First structured budget from architecture placeholders |
