# AETHER OS — Task Template

Use this structure for GitHub Issues and agent-generated work.  
Priority order: **safety/regulatory → critical hardware → public progress → nice-to-have**.

---

## Metadata (YAML frontmatter for issues)

```yaml
level: L1 | L2 | L3
priority: P0 | P1 | P2 | P3
loop: daily-mission | website | hardware | regulatory | newsletter | meta | other
area: ops | content | growth | hardware | science | legal | design
```

---

## Title

`[L#][P#] Short imperative title`

Example: `[L2][P1] Draft envelope material coupon test SOP diagram`

---

## Context

Why this matters for Project AETHER (1–3 sentences). Link CONOPS / requirements / parent issue if any.

## Acceptance criteria

- [ ] Criterion 1 (observable)
- [ ] Criterion 2
- [ ] Criterion 3

## Evidence required

What proves completion?

- [ ] PR link / commit SHA  
- [ ] Screenshot or file path  
- [ ] External URL  
- [ ] Hash or signed attestation (optional)  

## Skills / tier

| Level | Examples |
|-------|----------|
| L1 | Copy, social, ideas, simple graphics |
| L2 | Code, sim, technical writing, design |
| L3 | Hardware, regulatory, deep engineering (invite/review) |

## How to claim

1. Comment: `claiming` on the GitHub issue (or use site form).  
2. Work in a branch / fork.  
3. Submit PR or attach evidence.  
4. Tag `@ehreng` only for L3 or blockers.

## Dependencies

- Blocks: …  
- Blocked by: …  

## Definition of done

Verified by agent or trusted reviewer → logged in `aether-os/CONTRIBUTIONS.md` → issue closed.
