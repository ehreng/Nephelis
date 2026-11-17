# Power budget v1

**Status:** Architecture estimates — **not flight**  
**Date:** 2026-11-16  
**Source of truth:** `site/content/data/power-budget.json`  
**Task:** `power-budget-v1` (closed at v1)  
**Sensors:** `docs/sensor-suite-baseline.md`

v0 left generation and storage `null`. v1 fills them from the sensor baseline and a Venus-night fact: at 55 km the balloon circumnavigates in ~4–5 Earth days, so **night is ~50–60 hours**, not 12.

## Averages (`Σ power × duty`)

| Mode | Avg load | Notes |
|------|--------:|-------|
| Cruise | **2.51 W** | Idle + sparse contacts |
| Float day | **8.04 W** | Science + UHF windows + margin |
| Float night | **3.60 W** | Shed science; met + survival |
| Entry + inflate | **10.5 W** | Short, battery-driven |

## Generation / storage

| Item | v1 | Notes |
|------|---:|-------|
| Polar patch peak | **28 W** | ~0.25 m², IMM-class, cloud-deck derate ~200 W/m² electrical |
| Dayside average | **~14 W** | Cosine ~0.5 on the peak |
| Cruise body-mount peak | **12 W** | Entry stack |
| Battery | **400 Wh** | 50% DoD. Night 55 h × 3.6 W ≈ 198 Wh usable |

Day need: 8 W load + ~4 W to recharge the night (~198 Wh / 55 h / 0.85) ≈ **12 W**. Closes against ~14 W average with **thin margin**. Acid, packing, and pointing are the next knobs — not a prettier homepage.

JPL IMM cells have been reported at 34 mW/cm² at 51.5 km in a lab spectrum. That is an **upper literature point**. This budget uses a more conservative ~200 W/m² electrical at 55 km.

## Design implications

1. Night duration, not noon flux, sizes the battery.
2. Mass-spec stays event-driven (8% day duty) or the day load blows the patch.
3. 4K cameras are burst (4% duty). Continuous video does not close power **or** the link.
4. Polar patch area is a visual-lock item (bible) and a power item. Do not shrink it in art.

`pnpm check:power` in `site/` recomputes averages and requires generation/storage once `version` is `1.x`.
