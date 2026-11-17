# Gate 3 telemetry schema

**Status:** Ground mock — not flight software  
**Date:** 2026-11-16  
**Exit (from `docs/ground-test-sequence.md`):** a stored packet with timestamp, sensor ID, and a value an external engineer can plot.

This is the software waiting for the black-bay mockup. It is a slice of `fs-software-skeleton`, not a flight OS.

## Packet (`AETHER-G3/1`)

```json
{
  "v": 1,
  "ts": "2026-11-16T21:04:11.000Z",
  "src": "sim",
  "seq": 42,
  "sensors": [
    { "id": "MET.T", "v": 24.1, "u": "degC" },
    { "id": "MET.P", "v": 1012.4, "u": "hPa" },
    { "id": "RING", "v": 1, "u": "bool" }
  ]
}
```

| Field | Meaning |
|-------|---------|
| `v` | Schema version (1) |
| `ts` | UTC timestamp |
| `src` | `sim` (this mock) or `bay-mock` (Gate 3 hardware) |
| `seq` | Monotonic sequence |
| `sensors[].id` | `SUBSYS.CHANNEL` |
| `sensors[].v` | Number |
| `sensors[].u` | Unit string |

Minimum Gate 3 set: **one environment channel** (`MET.T` or `MET.P`) + **cyan ring** as power-on (`RING`). Camera frames are files, not this packet.

## Live mock

- `GET /api/telemetry/mock?n=24` — JSON array, deterministic from the clock
- UI: `/status` and `/#relay`
- Labelled **simulated**. Not spacecraft telemetry.

When a real bay exists, POST or drop JSONL with `"src": "bay-mock"` and plot the same schema.
