/**
 * Flag partner pipeline entries with stale next_steps.
 * Reads partners.json; optional last_touched field; falls back to partners.updated_at.
 *
 * Usage: npx tsx automation/scripts/partner-stale.ts
 * Exit 1 if any P0/P1 entry is stale (for CI optional).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
const staleDays = Number(process.env.PARTNER_STALE_DAYS || 14);
const failOnStale = process.env.PARTNER_STALE_FAIL === '1';

type Partner = {
  id: string;
  name: string;
  status: string;
  priority: string;
  next_step: string;
  last_touched?: string;
};

const data = JSON.parse(
  readFileSync(join(root, 'site/content/data/partners.json'), 'utf8')
) as { updated_at: string; pipeline: Partner[] };

const now = Date.now();
const msDay = 86400000;

const active = data.pipeline.filter(
  (p) => !['closed', 'won', 'paused'].includes(p.status) && (p.priority === 'P0' || p.priority === 'P1')
);

const stale = active
  .map((p) => {
    const touched = p.last_touched || data.updated_at;
    const ageDays = (now - new Date(touched).getTime()) / msDay;
    return { ...p, ageDays, touched };
  })
  .filter((p) => p.ageDays > staleDays)
  .sort((a, b) => b.ageDays - a.ageDays);

console.log(`Partner stale check (>${staleDays}d, P0/P1 active)\n`);

if (!stale.length) {
  console.log('OK no stale partners.');
} else {
  for (const p of stale) {
    console.log(
      `STALE  ${p.priority}  ${p.ageDays.toFixed(0)}d  ${p.name}\n       next: ${p.next_step}\n       touched: ${p.touched}`
    );
  }
}

const outDir = join(root, 'research/notes');
mkdirSync(outDir, { recursive: true });
const date = new Date().toISOString().slice(0, 10);
const md = `# Partner stale report — ${date}

Threshold: **${staleDays} days** · active P0/P1 only.

${
  stale.length
    ? stale
        .map(
          (p) =>
            `- **${p.name}** (${p.priority}, ${p.status}) — ${p.ageDays.toFixed(0)}d since ${p.touched}\n  - Next: ${p.next_step}`
        )
        .join('\n')
    : '_None stale._'
}

Update \`last_touched\` (ISO date) on each partner when you advance \`next_step\`.
`;

writeFileSync(join(outDir, `${date}-partner-stale.md`), md, 'utf8');
writeFileSync(join(outDir, 'LATEST-PARTNER-STALE.md'), md, 'utf8');
console.log(`\nWrote research/notes/${date}-partner-stale.md`);

if (failOnStale && stale.length) {
  process.exit(1);
}
