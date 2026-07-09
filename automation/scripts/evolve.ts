/**
 * Nephelis Evolution Runner — single entry for mission automation loops.
 *
 * Usage:
 *   npx tsx automation/scripts/evolve.ts <mode>
 *
 * Modes: research | visuals | social | metrics | digest | health | links | kb | press | full | help
 */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const mode = process.argv[2] || 'help';
const scripts = join(__dirname);
const root = join(__dirname, '../..');

console.log(`[Nephelis Evolve] mode=${mode}\n`);

function run(script: string, env?: Record<string, string>) {
  const r = spawnSync('npx', ['tsx', join(scripts, script)], {
    stdio: 'inherit',
    cwd: root,
    env: { ...process.env, ...env },
  });
  if (r.status !== 0) process.exit(r.status || 1);
}

const modes: Record<string, () => void> = {
  research() {
    console.log('Scaffolding weekly research brief + draft MDX…\n');
    run('research-weekly.ts');
  },
  visuals() {
    console.log(`VISUALS loop:
1. Read automation/prompts/visual-brief.md
2. Generate with brand constraints (venus orange, dark space, technical)
3. Save to assets/visuals/ + site/public/assets/visuals/
4. Update gallery if needed
`);
  },
  social() {
    run('social-draft.ts');
  },
  metrics() {
    run('sync-metrics.ts');
  },
  digest() {
    run('mission-digest.ts');
  },
  health() {
    run('health-check.ts');
  },
  links() {
    run('link-check.ts');
  },
  kb() {
    run('kb-index.ts');
  },
  press() {
    run('press-kit.ts');
  },
  full() {
    run('research-weekly.ts');
    run('mission-digest.ts');
    run('sync-metrics.ts');
    run('press-kit.ts');
    run('social-draft.ts');
    run('kb-index.ts');
    console.log(`
FULL scaffold complete.
Next: review research brief → update JSON/MDX → PR → human merge.
Then: health check against prod if desired:
  npx tsx automation/scripts/evolve.ts health
`);
  },
  help() {
    console.log(`Modes:
  research  Weekly research brief + draft MDX
  visuals   Print visual generation steps
  social    Social drafts from latest MDX
  metrics   decks/metrics-one-pager.md
  digest    research/notes/*-mission-digest.md
  health    Probe production endpoints
  links     Validate heritage.json URLs
  kb        research/INDEX.md
  press     decks/press-kit.md
  full      research + digest + metrics + press + social + kb

Examples:
  npx tsx automation/scripts/evolve.ts digest
  BASE_URL=https://www.nephelisindustries.com npx tsx automation/scripts/evolve.ts health
`);
  },
};

const fn = modes[mode] || modes.help;
fn();
