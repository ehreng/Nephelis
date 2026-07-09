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

if (failed > 0) {
  console.error(`\n${failed} file(s) failed validation.`);
  process.exit(1);
}
console.log('\nAll content schemas valid.');
