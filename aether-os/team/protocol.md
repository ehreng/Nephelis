# Agent team protocol

Canonical run rules. Architecture: [`docs/agent-team-rsi.md`](../../docs/agent-team-rsi.md). Roster: [`roster.json`](./roster.json).

## Collaboration layers

Gemini's three options are **layers**, not exclusive picks. Grok is lead in every layer.

| Layer | Mode | Rule |
|-------|------|------|
| 1 | Async handoff | Default. `handoff.md` → Gemini → `gemini-return.md`. Humans via GitHub Issues. |
| 2 | GitHub flywheel | Gemini builder + Grok critic in CI. **PR only.** No daily cron until `GEMINI_API_KEY` and `XAI_API_KEY` exist as repo secrets and Ehren enables the schedule. Workflow: `.github/workflows/nephelis-flywheel.yml`. |
| 3 | Session helper | `npx tsx automation/scripts/ask-grok.ts "question"`. Needs `XAI_API_KEY`. Does not invert lead. |

The flywheel must not write `.github/`, `AGENTS.md`, `GEMINI.md`, `aether-os/team/`, `.grok/`, lockfiles, preview, archive, or `user-src`. It must not merge `main`.

## Before any edit

1. Read `AGENTS.md` and the current Daily Brief `aether-os/briefs/latest.md`.
2. Read `lessons.json` (last 10). Apply standing lessons as if they were rules.
3. Open or reuse a run under `aether-os/team/runs/<id>/`.
4. One owner per file path for the run. Record it in `assignments.json`.

## Assignments

```json
{
  "id": "2026-11-26-gate0-pack",
  "objective": "...",
  "lead": "grok",
  "slices": [
    {
      "id": "s1",
      "owner": "gemini",
      "paths": ["docs/gate0-film-rfq.md"],
      "done_when": "RFQ body filled except ship-to"
    }
  ]
}
```

`owner` is `grok` | `gemini` | `human`.

## Handoff (Grok → Gemini)

`handoff.md` must be self-contained. Gemini has not seen the Grok session.

Required headings:

```
# Handoff <run-id>
status: open
owner: gemini
objective: ...
## Context
## Files you own (only these)
## Do not touch
## Done when
## Return
Write gemini-return.md with: summary, files changed, evidence, residual risks, RSI note.
```

## Return (Gemini → Grok)

`gemini-return.md` headings: `## Summary` `## Files` `## Evidence` `## Risks` `## RSI`.

Grok lead then runs the reviewer on those files. Gemini does not self-merge to `main`.

## Verify

Fail closed.

- Missing evidence = not done.
- Invented partner, contract, NASA affiliation, or 2027 launch = reject.
- Public copy hedges of the form “not X” = rewrite affirmative, then pass.
- `cd site && pnpm validate:content` after JSON/MDX edits.

Write `verify.md` as `pass` | `fail` with a one-line reason per slice.

## RSI (required)

Write `rsi.md` and append `lessons.json`.

Minimum: one lesson. Use `kind: noop` if the protocol held.

Lead applies `applied: false` lessons before the next run, or queues them as a follow-up slice. Do not let the lesson log grow without application.

## Conflict

If two owners would edit the same path: stop, reassign, restart the slice. Do not merge by hand-waving.
