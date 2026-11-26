# Agent team runtime

Grok-led team + RSI for AETHER OS.

| File | Role |
|------|------|
| [`protocol.md`](./protocol.md) | How a run works |
| [`roster.json`](./roster.json) | Who is on the team |
| [`lessons.json`](./lessons.json) | RSI memory |
| [`runs/`](./runs/) | One directory per objective |
| [`docs/agent-team-rsi.md`](../../docs/agent-team-rsi.md) | Architecture |

```bash
npx tsx automation/scripts/evolve.ts team -- start "your objective"
npx tsx automation/scripts/team-run.ts list
npx tsx automation/scripts/team-run.ts gemini          # if Antigravity is running
```

Inside Grok: `/aether-team` with the same objective.

## Collaboration layers

1. Async handoff (this directory) — OS default.
2. GitHub flywheel — Gemini builder + Grok critic, PR-only. `npx tsx automation/scripts/flywheel-sync.ts --self-check`.
3. Session helper — `npx tsx automation/scripts/ask-grok.ts "question"` (needs `XAI_API_KEY`).

Calling Grok over the API does not invert lead. The flywheel does not merge `main`.
