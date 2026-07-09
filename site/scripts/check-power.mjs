#!/usr/bin/env node
/**
 * Sanity-check power-budget.json averages and non-negative loads.
 * Usage: node scripts/check-power.mjs
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const budget = JSON.parse(
  readFileSync(join(__dirname, '../content/data/power-budget.json'), 'utf8')
);

let failed = 0;

console.log('Power budget check (estimates)\n');

for (const mode of budget.modes || []) {
  let avg = 0;
  for (const load of mode.loads || []) {
    if (load.power_w < 0 || load.duty < 0 || load.duty > 1) {
      console.error(`FAIL ${mode.id}/${load.id}: invalid power_w or duty`);
      failed += 1;
    }
    avg += load.power_w * load.duty;
  }
  avg = Math.round(avg * 100) / 100;
  const stored = budget.derived_avg_w?.[mode.id];
  console.log(`  ${mode.id}: avg ${avg} W (n=${mode.loads.length} loads)`);
  if (stored != null && typeof stored === 'number') {
    const drift = Math.abs(stored - avg);
    if (drift > 0.15) {
      console.error(
        `FAIL ${mode.id}: derived_avg_w ${stored} drifts from computed ${avg} by ${drift}`
      );
      failed += 1;
    } else {
      console.log(`         stored derived_avg_w=${stored} OK`);
    }
  }
}

if (budget.generation?.float_solar_w_peak_est == null) {
  console.log('\n  generation.float_solar_w_peak_est: null (TBD — expected for v0)');
}
if (budget.storage?.battery_wh_est == null) {
  console.log('  storage.battery_wh_est: null (TBD — expected for v0)');
}

if (failed > 0) {
  console.error(`\n${failed} power budget error(s).`);
  process.exit(1);
}
console.log('\nOK power budget sanity checks passed.');
