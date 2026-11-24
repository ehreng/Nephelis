# AETHER OS — Runtime State

Operational state for the AI-coordinated mission OS.  
Architecture: [`docs/AETHER_OS_Architecture_v1.md`](../docs/AETHER_OS_Architecture_v1.md)

```
aether-os/
├── README.md              # This file
├── PROGRESS.md            # Human-readable progress log
├── CONTRIBUTIONS.md       # Attributed contribution record
├── LEGAL_STATUS.md        # Non-binding legal path notes
├── loops/
│   └── registry.json      # Active loops + status
├── briefs/                # Daily Mission Briefs (YYYY-MM-DD.md)
└── newsletter/            # Monthly draft stubs
```

**Public:** [nephelisindustries.com/aether-os](https://www.nephelisindustries.com/aether-os)  
**Latest brief:** [`briefs/latest.md`](./briefs/latest.md) (2026-11-24)

## Daily operator (agent)

```bash
npx tsx automation/scripts/evolve.ts daily
```

Produces:

1. `aether-os/briefs/YYYY-MM-DD.md` — Mission Brief  
2. `aether-os/briefs/latest.md` — symlink-style copy of latest  
3. Append to `aether-os/PROGRESS.md`  
4. Optional social draft under `automation/social-drafts/`  

## Public resources

| Resource | Path |
|----------|------|
| Live probe / bay | https://www.nephelisindustries.com/#bay |
| CubeSat relay | https://www.nephelisindustries.com/#relay |
| Status | https://www.nephelisindustries.com/status |
| Visuals | https://www.nephelisindustries.com/visuals |
| Sensor suite | [`docs/sensor-suite-baseline.md`](../docs/sensor-suite-baseline.md) |
| Power v1 | [`docs/power-budget-v1.md`](../docs/power-budget-v1.md) |
| Comms / CubeSat | [`docs/comms-link-v0.md`](../docs/comms-link-v0.md) |
| Gate 3 packets | [`docs/gate3-telemetry-schema.md`](../docs/gate3-telemetry-schema.md) |
| Practical brief | [`docs/practical-requirements-brief.md`](../docs/practical-requirements-brief.md) |
| Visual bible | [`docs/visual-bible-cloudseeker.md`](../docs/visual-bible-cloudseeker.md) |
| Program gates | [`docs/program-gates.md`](../docs/program-gates.md) |
| Gate 0 film RFQ | [`docs/gate0-film-rfq.md`](../docs/gate0-film-rfq.md) |
| Gate 2 He-float BOM | [`docs/gate2-he-float-bom.md`](../docs/gate2-he-float-bom.md) |
| Ground tests | [`docs/ground-test-sequence.md`](../docs/ground-test-sequence.md) |
| Competitors | [`research/competitors/`](../research/competitors/) |

## Contribution log format

See header in `CONTRIBUTIONS.md`. Every verified claim should leave a row.
