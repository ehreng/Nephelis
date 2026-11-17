#!/usr/bin/env node
/**
 * Validate structured content JSON against schemas.
 * Usage: node scripts/validate-content.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'content/data');
const schemaDir = join(root, 'content/schemas');

const pairs = [
  ['timeline.json', 'timeline.schema.json'],
  ['specs.json', 'specs.schema.json'],
  ['heritage.json', 'heritage.schema.json'],
  ['tasks.json', 'tasks.schema.json'],
  ['telemetry.json', 'telemetry.schema.json'],
  ['funding.json', 'funding.schema.json'],
  ['mass-budget.json', 'mass-budget.schema.json'],
  ['risks.json', 'risks.schema.json'],
  ['partners.json', 'partners.schema.json'],
  ['mission-control.json', 'mission-control.schema.json'],
  ['competitors-watch.json', 'competitors-watch.schema.json'],
  ['power-budget.json', 'power-budget.schema.json'],
  ['progress.json', 'progress.schema.json'],
  ['sensor-suite.json', 'sensor-suite.schema.json'],
  ['comms-link.json', 'comms-link.schema.json'],
];

const ajv = new Ajv({ allErrors: true, strict: false });
let failed = 0;

for (const [dataFile, schemaFile] of pairs) {
  const dataPath = join(dataDir, dataFile);
  const schemaPath = join(schemaDir, schemaFile);
  try {
    const data = JSON.parse(readFileSync(dataPath, 'utf8'));
    const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
    const validate = ajv.compile(schema);
    const ok = validate(data);
    if (!ok) {
      failed += 1;
      console.error(`FAIL ${dataFile}:`);
      for (const err of validate.errors || []) {
        console.error(`  ${err.instancePath || '/'} ${err.message}`);
      }
    } else {
      console.log(`OK   ${dataFile}`);
    }
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${dataFile}: ${err.message}`);
  }
}

// Ensure data dir only has expected JSON (warn on unknowns)
const known = new Set(pairs.map(([d]) => d));
for (const f of readdirSync(dataDir)) {
  if (f.endsWith('.json') && !known.has(f)) {
    console.warn(`WARN unexpected data file: ${f}`);
  }
}

// Cross-file hygiene for new baselines
try {
  const suite = JSON.parse(readFileSync(join(dataDir, 'sensor-suite.json'), 'utf8'));
  const sumG = (suite.instruments || []).reduce((s, i) => s + (i.mass_g || 0), 0);
  const kg = Math.round((sumG / 1000) * 10) / 10;
  if (Math.abs(kg - suite.gondola.science_sum_kg) > 0.15) {
    failed += 1;
    console.error(
      `FAIL sensor-suite: science sum ${kg} kg != gondola.science_sum_kg ${suite.gondola.science_sum_kg}`
    );
  } else {
    console.log(`OK   sensor-suite science mass ${kg} kg`);
  }
} catch (err) {
  failed += 1;
  console.error(`FAIL sensor-suite hygiene: ${err.message}`);
}

try {
  const comms = JSON.parse(readFileSync(join(dataDir, 'comms-link.json'), 'utf8'));
  const r = comms.relay_to_earth;
  const mb = (kbps, mins) => Math.round(((kbps * mins * 60) / 8 / 1000) * 10) / 10;
  const expect = {
    far: mb(r.rate_kbps_far, r.pass_min_far),
    typical: mb(r.rate_kbps_typical, r.pass_min_typical),
    close: mb(r.rate_kbps_close, r.pass_min_close),
  };
  for (const k of Object.keys(expect)) {
    if (Math.abs(expect[k] - comms.daily_return_mb[k]) > 0.15) {
      failed += 1;
      console.error(
        `FAIL comms-link daily_return_mb.${k}: stored ${comms.daily_return_mb[k]} vs computed ${expect[k]}`
      );
    }
  }
  if (failed === 0 || expect.typical === comms.daily_return_mb.typical) {
    console.log(
      `OK   comms-link daily return ${comms.daily_return_mb.far}/${comms.daily_return_mb.typical}/${comms.daily_return_mb.close} MB`
    );
  }
} catch (err) {
  failed += 1;
  console.error(`FAIL comms-link hygiene: ${err.message}`);
}

if (failed > 0) {
  console.error(`\n${failed} file(s) failed validation.`);
  process.exit(1);
}
console.log('\nAll content schemas valid.');
