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

## Daily operator (agent)

```bash
npx tsx automation/scripts/evolve.ts daily
```

Produces:

1. `aether-os/briefs/YYYY-MM-DD.md` — Mission Brief  
2. `aether-os/briefs/latest.md` — symlink-style copy of latest  
3. Append to `aether-os/PROGRESS.md`  
4. Optional social draft under `automation/social-drafts/`  

## Contribution log format

See header in `CONTRIBUTIONS.md`. Every verified claim should leave a row.
