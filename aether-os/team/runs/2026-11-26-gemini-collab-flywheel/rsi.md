# RSI 2026-11-26-gemini-collab-flywheel

## L-001 coordination (applied)

Gemini offered three exclusive options. Exclusive-pick would have dropped the OS default. Stack them.

## L-002 tooling (applied)

Wrong workflow path, import-time key throw, `git add -A`, missing preview/archive/user-src bans. Hardened in this run.

## L-003 tooling (applied)

Gemini: `npx tsx` from repo root tries the npm registry; `pnpm --dir automation self-check` uses the local binary and works offline. Document that as the self-check command.

## Follow-up

First live flywheel dispatch is #47 sensor-suite review. Needs `GEMINI_API_KEY` and `XAI_API_KEY` as repo secrets.
