# Sensor suite baseline v0.1

**Status:** Architecture estimates — **not** selected flight hardware  
**Date:** 2026-11-16  
**Source of truth:** `site/content/data/sensor-suite.json`  
**Task:** `sensor-suite-baseline` (closed at v0)  
**Power:** `docs/power-budget-v1.md` · **Comms:** `docs/comms-link-v0.md`

Closes the honesty gap on `/#bay`. Public class names (AFN, TLS, aerosol MS, met, 4K cameras) now have grams, watts, duty, data rate, and a TRL guess.

## Gondola

| Slice | Mass |
|-------|------|
| Science instruments | **7.6 kg** |
| Structure / thermal / UHF / harness | 24–32 kg |
| Contingency | 8–15 kg |
| **Bay total** | **40–55 kg** (mass-budget gondola line) |

The bay is the gondola. It is not a 1 kg pod.

## Instruments

| ID | Class | g | W | Day duty | kb/day | TRL guess |
|----|-------|--:|--:|---------:|-------:|----------:|
| `afn` | AFN-class nephelometer | 1800 | 4.0 | 25% | 400 | 6 |
| `tls` | Compact TLS / MEMS gas | 1200 | 3.5 | 20% | 800 | 5 |
| `ms` | Aerosol / organics MS | 3500 | 8.0 | 8% (event) | 600 | 4 |
| `met` | T / P / wind | 400 | 0.8 | 50% | 150 | 7 |
| `cam_env` | Envelope 4K (up) | 350 | 2.5 | 4% | 8000 queued | 6 |
| `cam_deck` | Deck 4K (out) | 350 | 2.5 | 4% | 8000 queued | 6 |

TRL is a **class guess**, not a flight unit. Image kilobytes are produced; they sit behind science in the downlink queue (`comms-link.json`).

Science day-average load ≈ **3.0 W**. Full float-day bus (avionics + UHF + thermal + margin) ≈ **8.0 W**. See power v1.

## What this is not

- Not a vendor down-select.
- Not NASA instruments. Class names only (VLF AFN, DAVINCI VTLS/VASI, ORIGIN-class LDMS).
- Not VenDI. We do not image the surface.
- Not Gate 3 hardware. Gate 3 is a black-bay mockup that emits a real packet (`docs/gate3-telemetry-schema.md`).

## Next

1. Independent review of the grams/watts (claimable GitHub issue).
2. Named sensor lab still TBD (`partners.json` `p-sensor-lab`).
3. Gate 3 mock: one camera + one T/P channel + cyan ring + one stored packet.
