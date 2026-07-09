# System ICD skeleton v0.1

**Status:** Skeleton for Week 1–2 war board — fill interfaces at PDR-lite  
**Date:** 2026-07-09  
**Related:** `docs/conops-v0.9.md`, `docs/requirements-baseline-v0.9.md`, task `system-architecture-icd`

---

## 1. Segment diagram (logical)

```
[Launch Vehicle]──sep──[Kick/Transfer Stage]──sep──[Entry System]
                                                    │
                                    [Heatshield + Decelerator?]
                                                    │
                                            [Inflation System]
                                                    │
                                            [Super-pressure Balloon]
                                                    │
                                              [Gondola]
                                         ┌──────┼──────┐
                                    [Sensors] [Avionics] [Power]
                                                    │
                                              [Comms RF]
                                                    │
                                         [CubeSat Relay / DTE]
                                                    │
                                              [Ground]
```

---

## 2. Configuration items (CIs)

| CI ID | Name | Owner |
|-------|------|-------|
| CI-KS | Kick / transfer stage | Propulsion/mission |
| CI-HS | Heatshield / entry structure | Structures |
| CI-BAL | Balloon envelope | Structures/materials |
| CI-INF | Inflation assembly | Structures/fluids |
| CI-GON | Gondola structure | Structures |
| CI-SCI | Sensor suite | Science |
| CI-AV | Avionics + FSW | Avionics/software |
| CI-PWR | Solar + battery + PDU | Avionics |
| CI-RF | Radio / antenna | Comms |
| CI-RLY | Relay segment (3U or other) | Comms/partners |
| CI-GND | Ground segment | Ops |

---

## 3. Interface list (to flesh out)

### 3.1 Mechanical

| IF | From → To | Notes / TBD |
|----|-----------|-------------|
| M-01 | KS → Entry stack | Separation mechanism, loads |
| M-02 | HS → Balloon container | Stowed volume, crush |
| M-03 | Balloon → Gondola | Tether/attachment, load paths |
| M-04 | Gondola → sensors | Mount patterns, FOV, contamination |
| M-05 | Gondola → solar | Area, orientation at float |

### 3.2 Electrical / power

| IF | From → To | Notes / TBD |
|----|-----------|-------------|
| E-01 | PWR → AV | Rails, voltages TBD |
| E-02 | PWR → SCI | Switched rails, fault isolation |
| E-03 | PWR → RF | PA power budget |
| E-04 | AV → SCI | Data + discrete controls |
| E-05 | Umbilical / GSE | Pre-launch only |

### 3.3 Data / software

| IF | From → To | Notes / TBD |
|----|-----------|-------------|
| D-01 | SCI → AV | Packet formats, rates |
| D-02 | AV → RF | Telemetry frames |
| D-03 | RF → RLY/GND | Modulation, protocol TBD |
| D-04 | GND → AV | Command authentication |
| D-05 | Time sync | Onboard clock vs ground |

### 3.4 Thermal / fluids

| IF | From → To | Notes / TBD |
|----|-----------|-------------|
| F-01 | INF gas path | Species, pressure, valves |
| T-01 | SCI thermal | Operating range |
| T-02 | AV thermal | Cruise + float |

### 3.5 Environments

| IF | Notes |
|----|-------|
| ENV-LV | Launch vibe/shock/acoustic from LV ICD |
| ENV-VEN | Acid, T, P at float — design to FLT reqs |

---

## 4. ICD artifact checklist (before PDR-lite)

- [ ] One figure: physical stack (stowed + float)  
- [ ] Mass properties table per CI  
- [ ] Power tree  
- [ ] Data flow diagram  
- [ ] Connector pinouts (even draft)  
- [ ] Separation timeline  
- [ ] Command & telemetry dictionary stub  

Store mature ICDs under `docs/icd/` when ready (create folder on first real ICD).

---

## 5. History

| Ver | Date | Notes |
|-----|------|-------|
| 0.1 | 2026-07-09 | Skeleton only |
