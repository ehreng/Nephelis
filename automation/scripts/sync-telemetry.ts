/**
 * Align telemetry.json system statuses with mission-control checklist progress.
 * Conservative: only upgrades/downgrades clear mappings; preserves manual detail text.
 *
 * Usage: npx tsx automation/scripts/sync-telemetry.ts
 *        DRY_RUN=1 npx tsx automation/scripts/sync-telemetry.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
const dry = process.env.DRY_RUN === '1';

type Check = { id: string; item: string; phase: string; status: string };
type Sys = { id: string; label: string; status: string; value: string; detail: string };

const mcPath = join(root, 'site/content/data/mission-control.json');
const telPath = join(root, 'site/content/data/telemetry.json');

const mc = JSON.parse(readFileSync(mcPath, 'utf8')) as {
  phase: string;
  checklist: Check[];
};
const tel = JSON.parse(readFileSync(telPath, 'utf8')) as {
  updated_at: string;
  mission_phase: string;
  overall_status: string;
  systems: Sys[];
};

const byId = Object.fromEntries(mc.checklist.map((c) => [c.id, c]));

function statusFromChecks(ids: string[], doneValue: string, progressValue: string): { status: string; value: string } {
  const items = ids.map((id) => byId[id]).filter(Boolean);
  if (!items.length) return { status: 'dev', value: 'SPEC' };
  if (items.every((c) => c.status === 'done')) return { status: 'nominal', value: doneValue };
  if (items.some((c) => c.status === 'in_progress' || c.status === 'done'))
    return { status: 'dev', value: progressValue };
  if (items.some((c) => c.status === 'blocked')) return { status: 'attention', value: 'BLOCKED' };
  return { status: 'dev', value: 'PLANNED' };
}

const maps: { sysId: string; checkIds: string[]; done: string; progress: string }[] = [
  { sysId: 'balloon', checkIds: ['mc-materials-test', 'mc-design-freeze'], done: 'TESTED', progress: 'DESIGN' },
  { sysId: 'avionics', checkIds: ['mc-sensor-baselined', 'mc-design-freeze'], done: 'BASELINE', progress: 'SPEC' },
  { sysId: 'comms', checkIds: ['mc-comms-arch'], done: 'ARCH OK', progress: 'LINK PLAN' },
  { sysId: 'funding', checkIds: ['mc-funding-50'], done: '50%+', progress: 'OPEN' },
];

let changed = 0;
for (const m of maps) {
  const sys = tel.systems.find((s) => s.id === m.sysId);
  if (!sys) continue;
  const next = statusFromChecks(m.checkIds, m.done, m.progress);
  if (sys.status !== next.status || sys.value !== next.value) {
    console.log(`${m.sysId}: ${sys.status}/${sys.value} → ${next.status}/${next.value}`);
    sys.status = next.status;
    sys.value = next.value;
    changed += 1;
  }
}

// Phase sync
if (tel.mission_phase !== mc.phase) {
  console.log(`mission_phase: ${tel.mission_phase} → ${mc.phase}`);
  tel.mission_phase = mc.phase;
  changed += 1;
}

// Overall: any critical attention?
const hasAttention = tel.systems.some((s) => s.status === 'attention' || s.status === 'critical');
const overall = hasAttention ? 'ATTENTION' : 'SYSTEMS NOMINAL';
if (tel.overall_status !== overall) {
  console.log(`overall_status: ${tel.overall_status} → ${overall}`);
  tel.overall_status = overall;
  changed += 1;
}

if (changed === 0) {
  console.log('Telemetry already aligned with mission-control.');
} else {
  tel.updated_at = new Date().toISOString();
  if (dry) {
    console.log(`DRY_RUN — ${changed} change(s) not written`);
  } else {
    writeFileSync(telPath, JSON.stringify(tel, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${telPath} (${changed} field updates)`);
  }
}
