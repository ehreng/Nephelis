#!/usr/bin/env node
/**
 * Mass budget hygiene + margin reporting.
 * Architecture note: kick (wet) + entry (dry) ranges are design trades;
 * total wet_mass_kg is the rideshare/allocation target, not always sum(max).
 *
 * Fails on data inconsistencies. Warns on tight margins.
 * Usage: node scripts/check-mass-margin.mjs
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const budget = JSON.parse(
  readFileSync(join(__dirname, '../content/data/mass-budget.json'), 'utf8')
);

const wet = budget.wet_mass_kg;
const elements = budget.elements || [];
let failed = 0;

for (const e of elements) {
  if (e.mass_kg_min > e.mass_kg_max) {
    console.error(`FAIL ${e.id}: min (${e.mass_kg_min}) > max (${e.mass_kg_max})`);
    failed += 1;
  }
  if (e.mass_kg_min < 0 || e.mass_kg_max < 0) {
    console.error(`FAIL ${e.id}: negative mass`);
    failed += 1;
  }
}

const kick = elements.find((e) => e.id === 'kick_stage');
const entryAgg = elements.find((e) => e.id === 'entry_probe');
const detailed = elements.filter((e) =>
  ['heatshield', 'balloon', 'gondola', 'avionics'].includes(e.id)
);

const detMin = detailed.reduce((s, e) => s + e.mass_kg_min, 0);
const detMax = detailed.reduce((s, e) => s + e.mass_kg_max, 0);

console.log('Mass budget report');
console.log(`  wet target:          ${wet} kg`);
if (kick) console.log(`  kick stage:          ${kick.mass_kg_min}–${kick.mass_kg_max} kg`);
if (entryAgg) console.log(`  entry aggregate:     ${entryAgg.mass_kg_min}–${entryAgg.mass_kg_max} kg`);
if (detailed.length) console.log(`  entry detailed sum:  ${detMin}–${detMax} kg`);

// Detailed lines should sit inside or near aggregate band
if (entryAgg && detailed.length >= 3) {
  if (detMax > entryAgg.mass_kg_max * 1.15) {
    console.error(
      `FAIL detailed entry max (${detMax}) exceeds aggregate max (${entryAgg.mass_kg_max}) by >15%`
    );
    failed += 1;
  } else if (detMax > entryAgg.mass_kg_max) {
    console.warn(
      `WARN detailed entry max (${detMax}) > aggregate max (${entryAgg.mass_kg_max}) — tighten lines or raise aggregate`
    );
  }
  if (detMin < entryAgg.mass_kg_min * 0.85) {
    console.warn(
      `WARN detailed entry min (${detMin}) well below aggregate min (${entryAgg.mass_kg_min})`
    );
  }
  // Margin within entry stack vs aggregate max
  const entryMargin = entryAgg.mass_kg_max - detMax;
  console.log(`  entry line margin:   ${entryMargin.toFixed(1)} kg (agg max − detailed max)`);
}

// Entry dry mass should be well under wet target
const entryMax = entryAgg?.mass_kg_max ?? detMax;
if (entryMax > wet * 0.5) {
  console.warn(
    `WARN entry max (${entryMax} kg) > 50% of wet (${wet} kg) — unusual for this architecture`
  );
}
if (entryMax > wet) {
  console.error(`FAIL entry max (${entryMax}) exceeds total wet (${wet})`);
  failed += 1;
}

// Report notional stack (informational)
if (kick && entryMax) {
  const notionMax = kick.mass_kg_max + entryMax;
  console.log(`  notional kick+entry: ${notionMax} kg (may exceed wet — propellant trades)`);
  if (notionMax > wet * 1.5) {
    console.warn(`WARN notional stack > 1.5× wet — check overlapping mass definitions`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} mass budget error(s).`);
  process.exit(1);
}
console.log('\nOK mass budget consistency checks passed.');
