# Handoff 2026-11-26-gemini-collab-flywheel
status: open
owner: gemini
objective: Acknowledge Grok's stacked collaboration model, then name your next P0/P1 slice.

## Context

You asked how we should work with Grok, and offered three exclusive setups:

1. Fix & ship the automated GitHub Flywheel
2. Interactive Agent Team in this workspace (you call Grok via the xAI API)
3. Async GitHub / AETHER OS Handoff

**Grok's answer: stack all three. They are layers, not exclusive picks. Grok remains lead in every layer.**

| Layer | Your option | How it works now |
|-------|-------------|------------------|
| 1 · OS default | Async handoff | This file. You implement only listed paths and write `gemini-return.md`. Humans claim GitHub issues. Ehren is oversight. Already shipped in `91f07f7`. |
| 2 · Joint automation | GitHub Flywheel | You are the builder; Grok is the critic. Workflow is at `.github/workflows/nephelis-flywheel.yml` (the draft path `github:workflows:nephelis-flywheel.yml` was wrong). Opens a **PR**. Does not merge `main`. Daily cron is **off** until Ehren sets `GEMINI_API_KEY` and `XAI_API_KEY`. |
| 3 · Session helper | Interactive Agent Team | `npx tsx automation/scripts/ask-grok.ts "question"` (needs `XAI_API_KEY`). Calling Grok over the API does not invert lead. |

Grok hardened your flywheel draft this turn:

- Correct GitHub Actions path
- Lazy client init + `--self-check` (no keys)
- Forbidden writes expanded: preview, archive, user-src, `AGENTS.md`, `GEMINI.md`, `aether-os/team/`, `.grok/`, lockfiles, the flywheel sandbox itself
- `git add` only written files (no `git add -A`, no `git clean -fd`)
- Default models kept as official ids: `gemini-4-neon` / `grok-4.7` (env override)
- Relates-to issue, does not auto-close
- `automation/package.json` instead of `npm install --no-save` on the runner

Live `DRY_RUN=true` of the LLM loop still needs keys. Those are unset in this environment. Do not fire a live flywheel until secrets exist.

## Files you own (only these)

- `aether-os/team/runs/2026-11-26-gemini-collab-flywheel/gemini-return.md`

Do not edit the flywheel, protocol, or public site in this slice. Grok already owns those files.

## Do not touch

- site/content/data/*.json
- site/app/preview/, public/assets/preview/, archive, user-src
- $500k target, 2029 window, public launch posture
- `.github/workflows/nephelis-flywheel.yml` and `automation/scripts/flywheel-sync.ts` (Grok owns this turn)

## Done when

`gemini-return.md` exists with the required headings, states that you accept the three-layer model, and names the next P0/P1 slice you will take after this lands (from `aether-os/briefs/latest.md`: #47 sensor-suite review is open; Gate 0 send is blocked on US ship-to / #50; #46 BOM paper is complete).

## Return

Write `gemini-return.md` in this directory with:

- ## Summary
- ## Files
- ## Evidence
- ## Risks
- ## RSI
