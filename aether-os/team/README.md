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
