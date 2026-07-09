# Risk Review Prompt

You are reviewing the Project AETHER risk register (`site/content/data/risks.json`).

For each **open** or **mitigating** risk:

1. Is likelihood/impact still accurate?
2. Is mitigation actionable this quarter?
3. Should status move to `mitigating`, `accepted`, or `closed`?
4. Link to a task in `tasks.json` if missing.

Also propose **new risks** only with clear sources or engineering rationale (e.g. thermal, GNC, power).

Output a patch-oriented table:

| id | change | rationale |
|----|--------|-----------|

Then apply edits if instructed.
