/**
 * Generate a press / partner one-sheet from structured data.
 * Output: decks/press-kit.md
 *
 * Usage: npx tsx automation/scripts/press-kit.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
function load<T>(rel: string): T {
  return JSON.parse(readFileSync(join(root, rel), 'utf8')) as T;
}

const specs = load<{
  probe: { type: string; target_altitude_km: number[]; expected_duration_days: number; instruments: string[] };
  launch: { target_year: number; vehicle_options: string[] };
  science_goals: string[];
}>('site/content/data/specs.json');
const mass = load<{
  wet_mass_kg: number;
  balloon_diameter_m: number;
  target_float_altitude_km: number;
  delta_v_m_s: number;
}>('site/content/data/mass-budget.json');
const funding = load<{
  tiers: Record<string, { name: string; price_usd: number; description: string }>;
}>('site/content/data/funding.json');
const mc = load<{ phase: string; launch_target: string; funding_goal_usd: number }>(
  'site/content/data/mission-control.json'
);
const timeline = load<{ year: string; event: string; status: string }[]>(
  'site/content/data/timeline.json'
);

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nephelisindustries.com';
const generated = new Date().toISOString();

const md = `# Nephelis Industries — Press & Partner Kit

_Auto-generated ${generated} from mission data. Re-run: \`npx tsx automation/scripts/press-kit.ts\`_

## Boilerplate (short)

**Nephelis Industries** is building **Project AETHER** (Cloudseeker): a low-cost, crowd-supported super-pressure balloon probe targeting the ~${mass.target_float_altitude_km} km habitable cloud layer of Venus. Launch window **${specs.launch.target_year}**.

## Boilerplate (medium)

While Mars dominates popular attention, Venus’s cloud deck offers near-Earth temperature and pressure, abundant solar energy, and gravity close to Earth’s. Nephelis is a small private team shipping a practical first step: a long-duration aerostat with imaging, atmospheric, and life-detection sensors, relayed via CubeSat-class communications — funded leanly (~$${mc.funding_goal_usd.toLocaleString()} goal) compared to multi-million-dollar class missions.

## Key facts

| | |
|--|--|
| Organization | Nephelis Industries |
| Mission | Project AETHER / Cloudseeker |
| Target | Venus cloud layer ~${specs.probe.target_altitude_km[0]}–${specs.probe.target_altitude_km[1]} km |
| Platform | ${specs.probe.type} |
| Wet mass | ~${mass.wet_mass_kg} kg class |
| Balloon | ~${mass.balloon_diameter_m} m class super-pressure |
| Float life | ${specs.probe.expected_duration_days}+ days (ops goal 30–90) |
| Δv (transfer) | ~${mass.delta_v_m_s} m/s class |
| Launch target | ${mc.launch_target} (${mc.phase} phase) |
| Vehicles | ${specs.launch.vehicle_options.join(', ')} |
| Web | ${site} |
| Contact | ehren@nephelisindustries.com |
| Social | [@NephelisCo](https://x.com/NephelisCo) |

## Science goals

${specs.science_goals.map((g) => `- ${g}`).join('\n')}

## Instruments (concept)

${specs.probe.instruments.map((i) => `- ${i}`).join('\n')}

## Public participation

${Object.values(funding.tiers)
  .map((t) => `- **${t.name}** — $${t.price_usd}: ${t.description}`)
  .join('\n')}

Crew signal list and volunteer intake: ${site}/#contribute · ${site}/#funding

## Timeline (public)

${timeline.map((t) => `- **${t.year}** (${t.status}): ${t.event}`).join('\n')}

## Suggested headlines (for partners / media)

1. Private Venus cloud probe aims for 2027 — crowd-funding the float
2. Why the clouds of Venus may beat Mars for long-term human physiology
3. Open-source mission ops: humans + AI agents building in public

## Assets

- Site visuals: \`site/public/assets/visuals/\`
- Metrics one-pager: \`decks/metrics-one-pager.md\`
- This kit: \`decks/press-kit.md\`

## Not for publication without review

- Exact launch provider contracts (TBD)
- Advisor names beyond verified quotes
- DNA tier regulatory details

---
© Nephelis Industries · Project AETHER
`;

const out = join(root, 'decks/press-kit.md');
writeFileSync(out, md, 'utf8');
console.log('Wrote', out);
