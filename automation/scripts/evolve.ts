/**
 * Nephelis Evolution Runner
 *
 * Usage:
 *   npx tsx automation/scripts/evolve.ts research
 *   npx tsx automation/scripts/evolve.ts visuals
 *   npx tsx automation/scripts/evolve.ts social
 *   npx tsx automation/scripts/evolve.ts metrics
 *   npx tsx automation/scripts/evolve.ts full
 */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const mode = process.argv[2] || 'help';
const scripts = join(__dirname);

console.log(`[Nephelis Evolve] Running in mode: ${mode}\n`);

function run(script: string) {
  const r = spawnSync('npx', ['tsx', join(scripts, script)], {
    stdio: 'inherit',
    cwd: join(__dirname, '../..'),
  });
  if (r.status !== 0) process.exit(r.status || 1);
}

if (mode === 'research') {
  console.log('Scaffolding weekly research brief + draft MDX…\n');
  run('research-weekly.ts');
  console.log(`
Manual / agent follow-up:
1. web_search + X search for Venus cloud / competitor news
2. Fill research/notes/*-research-brief.md
3. Update research/science or research/competitors
4. Promote draft MDX or edit timeline.json
5. pnpm --dir site validate:content && open PR
`);
}

if (mode === 'visuals') {
  console.log(`Steps for VISUALS loop:
1. Read automation/prompts/visual-brief.md
2. Use image generation with branding (venus orange, dark space, technical)
3. Save to assets/visuals/ and site/public/assets/visuals/
4. Update visuals gallery if needed
`);
}

if (mode === 'social') {
  run('social-draft.ts');
}

if (mode === 'metrics') {
  run('sync-metrics.ts');
}

if (mode === 'full') {
  run('research-weekly.ts');
  run('sync-metrics.ts');
  run('social-draft.ts');
  console.log(`
FULL cycle scaffolded. Next: research fill → content PR → review → merge → Vercel deploy.
Then copy automation/social-drafts/latest.md into X/LinkedIn (human approve).
`);
}

if (mode === 'help' || !['research', 'visuals', 'social', 'metrics', 'full'].includes(mode)) {
  console.log(`Available modes:
  research   - Scaffold research brief + draft MDX
  visuals    - Print visual generation steps
  social     - Draft X/LinkedIn posts from latest MDX
  metrics    - Regenerate decks/metrics-one-pager.md
  full       - research + metrics + social scaffolds

Run: npx tsx automation/scripts/evolve.ts <mode>
`);
}
