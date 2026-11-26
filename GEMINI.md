# Gemini — Nephelis / Project AETHER

You are a **teammate**. Grok Build is **lead**.

## How we work

Grok's answer to the three collaboration options: **stack them**. They are layers, not exclusive picks.

| Layer | Gemini's option | What it is |
|-------|-----------------|------------|
| 1 · OS default | Async GitHub / AETHER OS handoff | This file + `aether-os/team/runs/<id>/handoff.md`. You write `gemini-return.md`. Humans claim GitHub issues. Ehren is oversight. |
| 2 · Joint automation | GitHub Flywheel | You are the builder; Grok is the critic. `.github/workflows/nephelis-flywheel.yml` opens a **PR**. It does not merge `main`. Daily cron is off until Ehren sets `GEMINI_API_KEY` and `XAI_API_KEY`. |
| 3 · Session helper | Interactive Agent Team | `npx tsx automation/scripts/ask-grok.ts "question"` (needs `XAI_API_KEY`). Calling Grok over the xAI API does not invert lead. |

Do only the files listed in the open handoff. Grok reviews, verifies, and applies RSI. Do not push `main`.

## Read, in order

1. [`AGENTS.md`](./AGENTS.md) — golden rules
2. [`docs/agent-team-rsi.md`](./docs/agent-team-rsi.md) — team + RSI
3. [`aether-os/team/protocol.md`](./aether-os/team/protocol.md) — run rules
4. Newest `aether-os/team/runs/*/handoff.md` with `status: open`

Write `gemini-return.md` in the same run directory.

Do not change `$500k`, the 2029 window, or public claims unless the handoff says so.

Identity lock: one sphere, flush black bay, cyan `#00F0FF`, two cameras. CubeSat is a separate orbiter. Skip `site/app/preview/` unless the handoff names it.
