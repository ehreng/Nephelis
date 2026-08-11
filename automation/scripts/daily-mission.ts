/**
 * AETHER OS — Daily Mission Loop
 * DETECT → PLAN → EXECUTE → VERIFY
 *
 * Usage: npx tsx automation/scripts/daily-mission.ts
 *        npx tsx automation/scripts/evolve.ts daily
 *
 * Writes:
 *   aether-os/briefs/YYYY-MM-DD.md
 *   aether-os/briefs/latest.md
 *   appends aether-os/PROGRESS.md
 *   automation/social-drafts/mission-YYYY-MM-DD.md
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
const date = process.env.MISSION_DATE || new Date().toISOString().slice(0, 10);
const iso = new Date().toISOString();

function load<T>(rel: string): T {
  return JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;
}

type Task = { id: string; title: string; status: string; priority: string; area: string; quarter?: string };
type Risk = { id: string; title: string; likelihood: string; impact: string; status: string };
type Partner = { id: string; name: string; status: string; priority: string; next_step: string };
type Check = { id: string; item: string; status: string; due?: string };
type Telemetry = {
  overall_status: string;
  mission_phase: string;
  systems: { label: string; status: string }[];
};
type LoopReg = {
  loops: { id: string; name: string; status: string }[];
  meta_loop?: { status: string };
};

// ─── DETECT ───────────────────────────────────────────────
const tasks = load<Task[]>('site/content/data/tasks.json');
const risks = load<{ risks: Risk[] }>('site/content/data/risks.json').risks;
const partners = load<{ pipeline: Partner[] }>('site/content/data/partners.json').pipeline;
const mc = load<{ phase: string; callsign: string; checklist: Check[]; funding_goal_usd: number }>(
  'site/content/data/mission-control.json'
);
const telemetry = load<Telemetry>('site/content/data/telemetry.json');
const mass = load<{ wet_mass_kg: number; target_float_altitude_km: number }>(
  'site/content/data/mass-budget.json'
);
const timeline = load<{ year: string; event: string; status: string }[]>(
  'site/content/data/timeline.json'
);
const loopReg = existsSync(join(root, 'aether-os/loops/registry.json'))
  ? load<LoopReg>('aether-os/loops/registry.json')
  : { loops: [] };

const openTasks = tasks.filter((t) => t.status === 'planned' || t.status === 'in_progress');
const p0 = openTasks.filter((t) => t.priority === 'P0');
const p1 = openTasks.filter((t) => t.priority === 'P1');
const openRisks = risks.filter((r) => r.status === 'open' || r.status === 'mitigating');
const criticalRisks = openRisks.filter((r) => r.impact === 'critical' || r.impact === 'high');
const partnerActions = partners.filter((p) => p.status !== 'closed' && p.status !== 'won');
const checksOpen = mc.checklist.filter((c) => c.status !== 'done' && c.status !== 'cancelled');
const upcoming = timeline.filter((t) => t.status === 'planned' || t.status === 'in_progress').slice(0, 5);
const activeLoops = (loopReg.loops || []).filter((l) => l.status === 'active');

// ─── PLAN (prioritized 3–7 tasks) ─────────────────────────
type MissionTask = {
  rank: number;
  level: 'L1' | 'L2' | 'L3';
  priority: string;
  title: string;
  acceptance: string[];
  evidence: string;
  source?: string;
};

const planned: MissionTask[] = [];
let rank = 1;

function add(
  level: MissionTask['level'],
  priority: string,
  title: string,
  acceptance: string[],
  evidence: string,
  source?: string
) {
  if (planned.length >= 7) return;
  planned.push({ rank: rank++, level, priority, title, acceptance, evidence, source });
}

// Priority: regulatory/safety signals first
if (criticalRisks.length) {
  const r = criticalRisks[0];
  add(
    'L2',
    'P0',
    `Mitigate or document risk: ${r.title}`,
    [
      'Risk entry updated in site/content/data/risks.json with status and mitigation notes',
      'Short note in research/notes or PR description',
    ],
    'PR touching risks.json + comment on issue',
    r.id
  );
}

// Critical path / P0 tasks from board
for (const t of p0.slice(0, 2)) {
  add(
    'L2',
    'P0',
    t.title,
    [`Task \`${t.id}\` status advanced or evidence attached`, 'Linked PR or artifact path'],
    'PR or evidence link on GitHub issue',
    t.id
  );
}

// Public progress / content
add(
  'L1',
  'P1',
  'Amplify today’s Mission Brief on X (or draft if posting gated)',
  [
    'Post or ready-to-post draft in automation/social-drafts/',
    'Link back to nephelisindustries.com and/or this brief',
  ],
  'URL or draft file path'
);

add(
  'L1',
  'P1',
  'Claim one open L1 contribution issue (or file a content fix PR)',
  ['Issue claimed with `claiming` comment', 'PR or evidence within 72h'],
  'Issue comment + PR'
);

// P1 board items
for (const t of p1.slice(0, 2)) {
  add(
    'L2',
    'P1',
    t.title,
    [`Progress on \`${t.id}\` with clear next step`, 'Evidence in PR or note'],
    'PR / note',
    t.id
  );
}

// Partner / growth
if (partnerActions.length) {
  const p = partnerActions[0];
  add(
    'L2',
    'P2',
    `Partner next step: ${p.name} — ${p.next_step || 'update pipeline status'}`,
    ['partners.json updated', 'Outreach draft or log entry if external'],
    'PR on partners.json',
    p.id
  );
}

// Hardware / L3 placeholder when MCC open
if (checksOpen.some((c) => /hardware|envelope|test|material/i.test(c.item))) {
  add(
    'L3',
    'P1',
    'Advance one open hardware/MCC checklist item (trusted contributors)',
    ['Checklist status updated in mission-control.json', 'Test note or photo path logged'],
    'PR + evidence file',
    'mcc'
  );
}

// Fill to at least 3
while (planned.length < 3) {
  add(
    'L1',
    'P2',
    'Improve one sentence of public site copy for clarity (PR)',
    ['Small PR to site/ content or page copy', 'No invented claims'],
    'PR link'
  );
}

// ─── EXECUTE ──────────────────────────────────────────────
const briefsDir = join(root, 'aether-os/briefs');
mkdirSync(briefsDir, { recursive: true });

const brief = `# Daily Mission Brief — ${date}

> **AETHER OS** · Daily Mission Loop  
> Generated: \`${iso}\` · Agent: Grok Build / \`daily-mission.ts\`  
> Founder oversight: Ehren Goossens (Founder Emeritus) — override any loop if required.

---

## 1. DETECT (system status)

| Field | Value |
|-------|-------|
| Callsign | ${mc.callsign} |
| Phase | **${mc.phase}** / telemetry **${telemetry.mission_phase}** |
| Systems | ${telemetry.overall_status} |
| Wet mass / float | ${mass.wet_mass_kg} kg · ~${mass.target_float_altitude_km} km |
| Funding goal | $${mc.funding_goal_usd.toLocaleString()} |
| Open tasks | ${openTasks.length} (P0: ${p0.length}, P1: ${p1.length}) |
| Open risks | ${openRisks.length} (high/critical: ${criticalRisks.length}) |
| Active partners | ${partnerActions.length} |
| MCC open checks | ${checksOpen.length} |
| Active OS loops | ${activeLoops.map((l) => l.id).join(', ') || 'n/a'} |

### Systems

${telemetry.systems.map((s) => `- **${s.label}**: ${s.status}`).join('\n')}

### Critical / high risks

${
  criticalRisks.length
    ? criticalRisks.map((r) => `- **${r.id}** — ${r.title} _(${r.likelihood}/${r.impact})_`).join('\n')
    : '_None flagged high/critical — re-scan risks weekly._'
}

### Upcoming timeline

${upcoming.length ? upcoming.map((t) => `- ${t.year}: ${t.event} (\`${t.status}\`)`).join('\n') : '_See timeline.json_'}

---

## 2. PLAN (prioritized work — claim these)

Priority: **safety/regulatory → hardware → public progress → nice-to-have**.

${planned
  .map(
    (t) => `### ${t.rank}. [${t.level}][${t.priority}] ${t.title}

- **Level:** ${t.level} · **Priority:** ${t.priority}${t.source ? ` · **Source:** \`${t.source}\`` : ''}
- **Acceptance:**
${t.acceptance.map((a) => `  - [ ] ${a}`).join('\n')}
- **Evidence:** ${t.evidence}
- **Claim:** Comment \`claiming\` on a matching GitHub issue, or open one from [\`docs/TASK_TEMPLATE.md\`](../../docs/TASK_TEMPLATE.md)
`
  )
  .join('\n')}

---

## 3. EXECUTE (agent actions this run)

- [x] Wrote this brief to \`aether-os/briefs/${date}.md\`
- [x] Updated \`aether-os/briefs/latest.md\`
- [x] Appended progress line to \`aether-os/PROGRESS.md\`
- [x] Drafted social post seed (see social drafts)
- [ ] **Human / agent follow-up:** Open or label GitHub issues for claimable tasks above
- [ ] **Optional:** Post Mission Brief excerpt to X with link to site

---

## 4. VERIFY (end-of-day checklist)

- [ ] Brief reviewed (no invented partners, contracts, or science)
- [ ] At least one public-facing update (site PR, X draft, or research note)
- [ ] Claimed tasks logged when completed → \`aether-os/CONTRIBUTIONS.md\`
- [ ] Blockers escalated to Founder Emeritus if P0 stuck >48h

---

## Contribution tiers (quick)

| Level | Work |
|-------|------|
| L1 | Content, social, ideas, simple graphics |
| L2 | Code, simulations, technical writing, design |
| L3 | Hardware, regulatory, deep engineering (gated) |

Architecture: [\`docs/AETHER_OS_Architecture_v1.md\`](../../docs/AETHER_OS_Architecture_v1.md)  
Contributing: [\`CONTRIBUTING.md\`](../../CONTRIBUTING.md)

---

*AETHER OS · DETECT → PLAN → EXECUTE → VERIFY · Not for consumption. For continuation.*
`;

const briefPath = join(briefsDir, `${date}.md`);
const latestPath = join(briefsDir, 'latest.md');
writeFileSync(briefPath, brief, 'utf8');
writeFileSync(latestPath, brief, 'utf8');

// Social draft
const socialDir = join(root, 'automation/social-drafts');
mkdirSync(socialDir, { recursive: true });
const social = `# Social draft — Mission Brief ${date}

## X (short)

Project AETHER · Daily Mission Brief ${date}

Phase: ${mc.phase} · Systems: ${telemetry.overall_status}
Today's focus: ${planned[0]?.title || 'mission progress'}

Claim L1–L2 tasks: github.com/ehreng/Nephelis
Join the flight crew: nephelisindustries.com

#Venus #ProjectAETHER #Nephelis #BuildInPublic

## X (thread seed)

1/ AETHER OS daily brief is up for ${date}.
2/ Open P0 work: ${p0.length}. High/critical risks: ${criticalRisks.length}.
3/ Want to contribute? Tiers L1 (anyone) → L3 (trusted). See CONTRIBUTING.md
4/ Architecture: docs/AETHER_OS_Architecture_v1.md in the repo.

_Review before posting. No invented claims._
`;
writeFileSync(join(socialDir, `mission-${date}.md`), social, 'utf8');
writeFileSync(join(socialDir, 'latest-mission.md'), social, 'utf8');

// Progress append
const progressPath = join(root, 'aether-os/PROGRESS.md');
const progressLine = `
## ${date} — Daily Mission Loop

- Brief: \`aether-os/briefs/${date}.md\`
- Planned tasks: ${planned.length} (P0 sources: ${p0.length}, critical risks: ${criticalRisks.length})
- Top priority: ${planned[0]?.title || 'n/a'}
- Social draft: \`automation/social-drafts/mission-${date}.md\`
- Status: **executed** (verify checklist still open for humans)
`;

if (existsSync(progressPath)) {
  const existing = readFileSync(progressPath, 'utf8');
  // Insert after title block
  const marker = '---\n';
  const idx = existing.indexOf(marker);
  if (idx !== -1) {
    const insertAt = idx + marker.length;
    writeFileSync(
      progressPath,
      existing.slice(0, insertAt) + progressLine + existing.slice(insertAt),
      'utf8'
    );
  } else {
    appendFileSync(progressPath, progressLine, 'utf8');
  }
}

console.log(`[AETHER OS] Daily Mission Loop complete for ${date}`);
console.log(`  brief:    aether-os/briefs/${date}.md`);
console.log(`  latest:   aether-os/briefs/latest.md`);
console.log(`  social:   automation/social-drafts/mission-${date}.md`);
console.log(`  tasks:    ${planned.length} planned`);
console.log(`  verify:   complete end-of-day checklist in the brief`);
