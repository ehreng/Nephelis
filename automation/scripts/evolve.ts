/**
 * Nephelis Evolution Runner — single entry for mission automation loops.
 *
 * Usage: npx tsx automation/scripts/evolve.ts <mode>
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
    run('research-weekly.ts');
  },
  visuals() {
    console.log(`VISUALS: read automation/prompts/visual-brief.md → generate → assets/`);
  },
  social() {
    run('social-draft.ts');
  },
  'social-digest'() {
    run('social-from-digest.ts');
  },
  metrics() {
    run('sync-metrics.ts');
  },
  digest() {
    run('mission-digest.ts');
    run('partner-stale.ts');
    run('social-from-digest.ts');
  },
  'digest-email'() {
    run('send-digest-email.ts');
  },
  health() {
    run('health-check.ts');
  },
  env() {
    run('env-check.ts');
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
  partners() {
    run('partner-stale.ts');
  },
  watch() {
    run('competitor-watch.ts');
  },
  telemetry() {
    run('sync-telemetry.ts');
  },
  full() {
    run('research-weekly.ts');
    run('competitor-watch.ts');
    run('mission-digest.ts');
    run('partner-stale.ts');
    run('sync-telemetry.ts');
    run('sync-metrics.ts');
    run('press-kit.ts');
    run('social-draft.ts');
    run('social-from-digest.ts');
    run('kb-index.ts');
    console.log(`
FULL complete. Optional:
  npx tsx automation/scripts/evolve.ts health
  npx tsx automation/scripts/evolve.ts env
  DRY_RUN=1 npx tsx automation/scripts/evolve.ts digest-email
`);
  },
  help() {
    console.log(`Modes:
  research        Research brief + draft MDX
  visuals         Visual generation steps
  social          Social from latest MDX
  social-digest   Social from mission digest
  metrics         decks/metrics-one-pager.md
  digest          Digest + partner stale + social-from-digest
  digest-email    Email LATEST-DIGEST (needs RESEND_API_KEY)
  health          Prod endpoint probes
  env             Env / Stripe mode drift (redacted)
  links           Heritage URL check
  kb              research/INDEX.md
  press           decks/press-kit.md
  partners        Stale partner pipeline report
  watch           Competitor watch checklist
  telemetry       Sync telemetry.json from mission-control
  full            Most scaffolds + telemetry + watch

Examples:
  npx tsx automation/scripts/evolve.ts digest
  npx tsx automation/scripts/evolve.ts env
  DRY_RUN=1 npx tsx automation/scripts/evolve.ts digest-email
`);
  },
};

const fn = modes[mode] || modes.help;
fn();
