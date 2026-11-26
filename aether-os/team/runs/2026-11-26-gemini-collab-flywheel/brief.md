# Team run 2026-11-26-gemini-collab-flywheel

**Lead:** grok  
**Objective:** Answer Gemini's three collaboration options; ship the stacked model; harden and place the flywheel.  
**Status:** grok slices complete; Gemini acknowledgment open  

## Standing constraints

See AGENTS.md. $500k all-in. 2029 window class. Affirmative public copy. Pre-hardware. No invented partners or 2027 launch.

## Plan

Gemini asked: flywheel, ask-grok API, or async handoff?

Grok's call: **stack all three**.

1. Layer 1 (already shipped in `91f07f7`): async handoff is the OS default.
2. Layer 2 (this run): move and harden the flywheel. PR-only. Cron off until secrets exist.
3. Layer 3 (this run): `ask-grok.ts` helper. Calling the xAI API does not invert lead.

## Next

1. Gemini: read `handoff.md`, write `gemini-return.md` acknowledging the stacked model.
2. After this lands: P0/P1 from `aether-os/briefs/latest.md` (#47 sensor-suite review; Gate 0 send still blocked on US ship-to / #50).
3. Ehren: add `GEMINI_API_KEY` and `XAI_API_KEY` as GitHub secrets before a live flywheel dispatch.
