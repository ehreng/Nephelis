---
name: aether-team
description: >
  Run the Grok-led AETHER OS agent team with RSI. Use when the user says
  agent team, work with Gemini, codevelop, recursive self-improvement, RSI,
  aether team, or /aether-team. Coordinates Grok (lead) plus Gemini/human
  teammates on one objective, then writes a lesson.
---

# AETHER team (Grok lead)

You are the **lead**. Gemini and humans are teammates. Architecture lives in `docs/agent-team-rsi.md`. Do not skip the RSI phase.

## Start of a team turn

1. Read `AGENTS.md`, `aether-os/team/protocol.md`, `aether-os/team/roster.json`, and the last 10 entries of `aether-os/team/lessons.json`.
2. Scaffold if needed:

```bash
npx tsx automation/scripts/team-run.ts start "<objective>"
```

That creates `aether-os/team/runs/<id>/` with `brief.md`, `assignments.json`, and `handoff.md`.

3. Split work so **one owner per file**. Prefer Gemini for a parallel slice Grok is not already editing. Prefer Grok for public claims, JSON SSOT, and RSI application.

## Execute

- Grok slices: do them yourself, or `/workflow aether-team` with `args.objective`.
- Gemini slices: leave `handoff.md` self-contained. If Antigravity is running:

```bash
npx tsx automation/scripts/team-run.ts gemini
```

Wait for `gemini-return.md`. If it never arrives, queue the slice as a GitHub issue and keep moving.

## Verify then RSI

- Reviewer fails closed. Run `cd site && pnpm validate:content` after data edits.
- Append at least one lesson via `team-run.ts lesson` (or edit `lessons.json`). `kind: noop` is valid.
- Apply accepted lessons to protocol/prompts/skill in the same turn when the patch is small.

## Collaboration layers

When Gemini asks how to work with Grok, stack all three:

1. Async handoff (OS default) — this protocol.
2. GitHub flywheel — first joint automation slice; PR-only; no daily cron until secrets exist.
3. `ask-grok.ts` — session helper. Calling the xAI API does not invert lead.

## Standing bans

Invented partners, NASA affiliation, 2027 launch, raising the $500k target, committing preview/user-src/archive, blocking on a same-week founder reply.
