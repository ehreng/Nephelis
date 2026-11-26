# Agent Handoff — Grok + Gemini Carbon

> **AETHER OS** · Two-Agent Flywheel  
> Updated: `2026-11-26` · Last writer: Grok (Nephelis RSI)  
> Founder oversight: Ehren Goossens (Founder Emeritus) — Basic Combat Training complete; Advanced Individual Training in progress. Review is asynchronous. Do not block the loop on a same-week answer.

GitHub is the source of truth. Protocol: [`AGENTS.md`](../AGENTS.md) (Two-Agent Flywheel). Brief: [`briefs/latest.md`](./briefs/latest.md).

## Current Sprint Focus

- Phase: **PRE-HARDWARE**. Next milestone: Gate 0 (US ship-to + film order + lab quote).
- Critical path is blocked on a human ship-to ([#50](https://github.com/ehreng/Nephelis/issues/50)). Agents must not invent an address or send RFQs.
- Immediate parallel tracks (unblocked L2 paper): **[#47](https://github.com/ehreng/Nephelis/issues/47) sensor-suite review** and **[#46](https://github.com/ehreng/Nephelis/issues/46) helium ground-float BOM** (do not build).

## Active Claims & Branches

| Issue / work | Owner | Label | Branch | Status |
|--------------|-------|-------|--------|--------|
| Two-agent flywheel protocol | Grok | `agent:grok` | `grok/carbon-sync-protocol` | In progress — protocol + this board |
| [#47](https://github.com/ehreng/Nephelis/issues/47) Review sensor-suite baseline v0 | — | — | — | Open · recommended next claim for Carbon |
| [#46](https://github.com/ehreng/Nephelis/issues/46) Scope helium ground-float BOM | — | — | — | Open · recommended parallel track for Carbon (paper only; do not build) |

No open issue is claimed yet (`claiming` has not been posted). One owner per issue.

## Ready for Partner Review

| Item | From | Action |
|------|------|--------|
| PR on `grok/carbon-sync-protocol` | Grok | Carbon: review the protocol and this board in PR comments |

Existing weekly automation PRs (mission digests, research scaffolds, and related bot PRs) are **out of scope for this setup change**. Do not close or triage them in this pass.

## Blocked on Human / Gate 0

| Issue | Why blocked | Agent action |
|-------|-------------|--------------|
| [#50](https://github.com/ehreng/Nephelis/issues/50) Name a ground operator and US ship-to | Needs a real US receiving address and a named operator who is not on a same-week founder cadence | Queue only. Do not invent a ship-to. |
| [#45](https://github.com/ehreng/Nephelis/issues/45) Gate 0 film RFQ send | Remainder is the send; blocked on #50. Paperwork is largely done. | Do not send. Do not claim samples received until they exist. |
| [#51](https://github.com/ehreng/Nephelis/issues/51) ASTM D543 / H₂SO₄ lab quotes | Quote requests need a ship-to and a human counterpart for the lab | Do not send RFQs. Do not record contact that has not happened. |

## Handoff Log

| Date | From → To | Note |
|------|-----------|------|
| 2026-11-26 | Grok → Carbon | Flywheel protocol proposed. Please review this PR, then claim #47 or #46 and record the claim here. Gate 0 sends stay with Ehren. |

Architecture: [`docs/AETHER_OS_Architecture_v1.md`](../docs/AETHER_OS_Architecture_v1.md)  
Contributing: [`CONTRIBUTING.md`](../CONTRIBUTING.md)
