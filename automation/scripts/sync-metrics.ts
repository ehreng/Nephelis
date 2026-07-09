/**
 * Sync mission metrics one-pager from structured JSON (site content).
 * Output: decks/metrics-one-pager.md
 *
 * Usage: npx tsx automation/scripts/sync-metrics.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');

function loadJson<T>(rel: string): T {
  return JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;
}

type Specs = {
  probe: {
    type: string;
    target_altitude_km: number[];
    expected_duration_days: number;
    instruments: string[];
  };
  launch: { target_year: number; vehicle_options: string[]; transfer: string };
  science_goals: string[];
};

type Timeline = { year: string; event: string; status: string }[];
type Funding = {
  tiers: Record<
    string,
    { name: string; price_usd: number; capacity: number; baseline_allocated: number }
  >;
};
type Tasks = { id: string; title: string; status: string; priority: string; quarter: string }[];

const specs = loadJson<Specs>('site/content/data/specs.json');
const timeline = loadJson<Timeline>('site/content/data/timeline.json');
const funding = loadJson<Funding>('site/content/data/funding.json');
const tasks = loadJson<Tasks>('site/content/data/tasks.json');
const telemetry = loadJson<{ overall_status: string; mission_phase: string }>(
  'site/content/data/telemetry.json'
);
const mass = loadJson<{ wet_mass_kg: number; balloon_diameter_m: number; target_float_altitude_km: number }>(
  'site/content/data/mass-budget.json'
);
const risks = loadJson<{ risks: { id: string; title: string; impact: string; status: string }[] }>(
  'site/content/data/risks.json'
);
const mc = loadJson<{ phase: string; launch_target: string; funding_goal_usd: number }>(
  'site/content/data/mission-control.json'
);
const openRisks = risks.risks.filter((r) => r.status === 'open' || r.status === 'mitigating');

const generated = new Date().toISOString();

const md = `# Nephelis Industries — Metrics One-Pager

_Auto-generated from \`site/content/data/*\` · ${generated}_  
**Do not hand-edit** — run \`npx tsx automation/scripts/sync-metrics.ts\` after data changes.

## Mission snapshot

| Metric | Value |
|--------|-------|
| Program | Project AETHER / Cloudseeker |
| MCC phase | ${mc.phase} · target ${mc.launch_target} |
| Probe | ${specs.probe.type} |
| Target altitude | ${specs.probe.target_altitude_km[0]}–${specs.probe.target_altitude_km[1]} km (float ~${mass.target_float_altitude_km} km) |
| Wet mass | ~${mass.wet_mass_kg} kg · balloon ~${mass.balloon_diameter_m} m |
| Float duration (baseline) | ${specs.probe.expected_duration_days}+ days (ops goal 30–90) |
| Launch target | ${specs.launch.target_year} |
| Vehicles | ${specs.launch.vehicle_options.join(', ')} |
| Transfer | ${specs.launch.transfer} |
| Funding goal | $${mc.funding_goal_usd.toLocaleString()} |
| Systems status | ${telemetry.overall_status} (${telemetry.mission_phase}) |
| Open risks | ${openRisks.length} (see risks.json) |

## Science goals

${specs.science_goals.map((g) => `- ${g}`).join('\n')}

## Instruments (concept)

${specs.probe.instruments.map((i) => `- ${i}`).join('\n')}

## Funding tiers (site)

| Tier | Price | Capacity | Baseline allocated |
|------|------:|---------:|-------------------:|
${Object.values(funding.tiers)
  .map(
    (t) =>
      `| ${t.name} | $${t.price_usd} | ${t.capacity} | ${t.baseline_allocated} |`
  )
  .join('\n')}

_Paid counts come from Stripe at runtime; baseline is static marketing/pre-sales offset._

## Timeline

${timeline.map((t) => `- **${t.year}** (${t.status}): ${t.event}`).join('\n')}

## Open tasks (P0/P1)

${tasks
  .filter((t) => (t.priority === 'P0' || t.priority === 'P1') && t.status !== 'done')
  .map((t) => `- [${t.priority}] ${t.title} — _${t.status}_ (${t.quarter})`)
  .join('\n')}

## Top risks

${openRisks
  .filter((r) => r.impact === 'critical' || r.impact === 'high')
  .map((r) => `- **${r.id}** (${r.impact}): ${r.title}`)
  .join('\n')}

## Pitch talking points

1. Venus cloud layer is the most Earth-like environment off-Earth (pressure/temp/gravity).
2. Lean private probe: crowdfund + partners vs multi-$M class missions.
3. Platform is habitation-relevant (aerostat), not only flyby science.
4. Public, data-driven roadmap + open collaboration (humans + AI agents).

---

Site: https://nephelisindustries.com · Repo: https://github.com/ehreng/Nephelis
`;

const out = join(root, 'decks/metrics-one-pager.md');
writeFileSync(out, md, 'utf8');
console.log('Wrote', out);
