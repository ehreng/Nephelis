# AETHER OS — Grok-led agent team and RSI

**Status:** active  
**Parent:** [`AETHER_OS_Architecture_v1.md`](./AETHER_OS_Architecture_v1.md)  
**Runtime:** [`aether-os/team/`](../aether-os/team/)

Grok is the Persistent Mission Agent. Other runtimes (Gemini / Antigravity, humans on GitHub Issues) join as teammates. Recursive self-improvement is a required last phase of every team run: the team improves the protocol, not only the mission artifact.

## Why this exists

AETHER OS already has DETECT → PLAN → EXECUTE → VERIFY. That loop ran as a single Grok session plus human claims. This layer adds:

1. **A named team** with a lead and explicit roles.
2. **A handoff file** so Gemini can work the same repo without sharing a context window.
3. **An RSI phase** that writes lessons back into the OS after every run.

## Authority

| Seat | Who | What they may do |
|------|-----|------------------|
| Lead | Grok Build | Assign work, merge teammate returns, run verify, apply RSI lessons, talk to Ehren |
| Teammate | Gemini (Antigravity) | Implement or review a slice written in `handoff.md`; return `gemini-return.md` |
| Teammate | Human L1–L3 | Claim GitHub issues; evidence in PRs |
| Oversight | Ehren (Founder Emeritus) | Pause or override any loop. Review is asynchronous. Do not block on a same-week answer. |

Grok remains lead even when Gemini writes most of the code. Gemini does not change public claims, funding numbers, or launch posture without Grok applying the change.

## Roles (inside a run)

| Role | Default runtime | Job |
|------|-----------------|-----|
| `scout` | Grok | Read-only: constraints, files, current brief, open lessons |
| `lead` | Grok | Split work. Name owner per slice (grok / gemini / human). Write the run brief |
| `implementer` | Grok and/or Gemini | Do the slice. Stay inside the assignment |
| `reviewer` | Grok (adversarial) | Fail closed. Demand evidence. Reject invented claims |
| `rsi-critic` | Grok | Propose one or more lessons. Patch protocol/prompts only through the lesson log |

Two agents do not edit the same file in the same run. If Gemini owns a slice, Grok waits for `gemini-return.md` or times out to a human queue.

## Run lifecycle

```
team-run.ts start "<objective>"
        ↓
aether-os/team/runs/<id>/
  brief.md           lead plan
  assignments.json   who owns which paths
  handoff.md         Gemini's self-contained brief (if assigned)
  gemini-return.md   Gemini's result (if assigned)
  verify.md          reviewer verdict
  rsi.md             proposed lessons
        ↓
Grok workflow /aether-team  (scout → lead → implement → verify → rsi)
        ↓
Append aether-os/team/lessons.json
Apply accepted lessons (protocol, prompts, roster, skill)
Log aether-os/CONTRIBUTIONS.md
```

Entry points:

```bash
# Scaffold a run directory + optional Gemini conversation
npx tsx automation/scripts/evolve.ts team -- start "Gate 0 RFQ send pack"

# Inside Grok: /aether-team   or   /workflow aether-team
# args.objective = the same sentence
```

## RSI

A run is incomplete until it writes at least one lesson, including `kind: noop` when the protocol held.

Lesson kinds:

| kind | Meaning |
|------|---------|
| `process` | Split, ownership, or sequencing was wrong |
| `prompt` | A role prompt produced garbage; rewrite it |
| `tooling` | A script, workflow, or CLI failed |
| `claim` | A teammate almost shipped an invented public claim |
| `coordination` | Handoff between Grok and Gemini (or human) broke |
| `noop` | Protocol held. Record that. |

Accepted lessons become patches to `protocol.md`, role prompts, `roster.json`, or the Grok skill. The critic proposes; the lead applies.

## Standing constraints (do not restate in every handoff)

Read [`AGENTS.md`](../AGENTS.md). Short form:

- GitHub `ehreng/Nephelis` is SSOT. Public numbers live in `site/content/data/`.
- `$500k` is all-in. Ambitious window is 2029 class. Backup 2030–31.
- Public copy is affirmative. Pre-hardware is the phase word.
- No invented partners, contracts, NASA affiliation, or 2027 launch.
- Do not commit `site/app/preview/`, `public/assets/preview/`, archive, or `user-src`.
- After data edits: `cd site && pnpm validate:content`.

## Gemini join

Repo-root [`GEMINI.md`](../GEMINI.md) is the Antigravity/Gemini project instruction. A teammate that is new to the repo:

1. Reads `GEMINI.md` → `AGENTS.md` → this doc → `aether-os/team/protocol.md`.
2. Picks the newest `aether-os/team/runs/*/handoff.md` with `status: open`.
3. Does only the listed files.
4. Writes `gemini-return.md` in that run directory.

Grok can also start the conversation when Antigravity is running:

```bash
npx tsx automation/scripts/team-run.ts gemini
```
