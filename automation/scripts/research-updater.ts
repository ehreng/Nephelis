/**
 * Research updater — entrypoint used by evolve + manual runs.
 */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

export async function runResearchUpdate() {
  console.log('Running Nephelis research update scaffold...');
  const r = spawnSync('npx', ['tsx', join(__dirname, 'research-weekly.ts')], {
    stdio: 'inherit',
    cwd: join(__dirname, '../..'),
  });
  if (r.status !== 0) {
    throw new Error(`research-weekly failed with status ${r.status}`);
  }
}

const invokedDirectly = process.argv[1]?.includes('research-updater');
if (invokedDirectly) {
  runResearchUpdate().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
