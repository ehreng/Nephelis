# Comms link v0 — CubeSat relay

**Status:** Architecture estimate — **not** a closed link budget  
**Date:** 2026-11-16  
**Source of truth:** `site/content/data/comms-link.json`  
**Public:** `/#relay`  
**Tasks:** `comms-arch-review`, `cubesat-relay-baseline` (in progress)

## Architecture

```
Cloudseeker (50–55 km)  --UHF 4–16 kbps-->  3U CubeSat (Venus orbit)
                                                    |
                                            store-and-forward
                                                    |
                                            X-band 1–32 kbps
                                                    v
                                              Earth (34 m class)
```

- CubeSat is a **separate orbiter**. Never on the sphere. ~4–6 kg, 3U, Iris/MarCO-class X-band + UHF proximity.
- Probe baseline is **not** direct-to-Earth. Descope path: carrier radio or hybrid DTE if a partner flies a larger dish.
- No NASA affiliation. MarCO/Iris numbers are **heritage class**, not a hardware pick.

## Why Earth is the bottleneck

UHF probe → orbiter, three ~8 min contacts/day at 8 kbps, is several megabytes a day — enough. The CubeSat then has to talk across 0.3–1.7 AU.

MarCO (DESCANSO 18): ~1 kbps cruise typical to a 34 m; 8 kbps at Mars to a 70 m; 16 kbps when geometry allowed. Iris RF ~4 W. Venus range vs Mars:

| Geometry | AU | X-band used here | Pass | **MB/day to Earth** |
|----------|---:|-----------------:|-----:|--------------------:|
| Close (inferior) | ~0.3 | 32 kbps | 40 min | **~9.6** |
| Typical | ~1.0 | 8 kbps | 30 min | **~1.8** |
| Far | ~1.7 | 2 kbps | 20 min | **~0.3** |

Superior conjunction: days to weeks of little or no X-band. Both ends store.

## Time to download (at typical 8 kbps)

1 kB/s. Minutes = `size_mb × 1000 / 60`.

| Product | Size | Typical | Close | Far |
|---------|-----:|--------:|------:|----:|
| Health (day) | 0.05 MB | <1 min | instant | ~3 min |
| Met time-series (day) | 0.15 MB | ~3 min | <1 min | ~10 min |
| AFN + TLS + MS (day) | 1.2 MB | **~20 min** | ~5 min | ~80 min |
| One 1080p still | 0.8 MB | **~13 min** | ~3 min | ~53 min |
| One 4K still | 4.0 MB | **~67 min** | ~17 min | ~4.4 h |
| 10 s 1080p clip | 10 MB | **~2.8 h** | ~42 min | ~11 h |
| 10 s 4K clip | 25 MB | **~7 h** | ~1.7 h | ~28 h |

Queue: health → met → chemistry → 1080p stills → 4K stills → clips. Video is a closest-approach luxury. The unique science (30–90 d time-series) is the small packets, and those fit.

## What this is not

- Not a CubeSat demo (later comms gate).
- Not DSN time booked.
- Not “high-bandwidth.” Typical return is **about two megabytes a day**.
