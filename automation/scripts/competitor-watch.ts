/**
 * Emit a competitor/research watch checklist from competitors-watch.json.
 * Does not scrape the web (agents do that) — produces a ready agent brief.
 *
 * Usage: npx tsx automation/scripts/competitor-watch.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
const data = JSON.parse(
  readFileSync(join(root, 'site/content/data/competitors-watch.json'), 'utf8')
) as {
  watches: {
    id: string;
    name: string;
    keywords: string[];
    notes_path: string;
    priority: string;
  }[];
};

const date = new Date().toISOString().slice(0, 10);
const lines = [
  `# Competitor / topic watch — ${date}`,
  ``,
  `> Auto-generated from \`competitors-watch.json\`. Run web_search / X search per keyword, then update notes paths.`,
  ``,
  `## Agent checklist`,
  ``,
];

for (const w of data.watches.sort((a, b) => a.priority.localeCompare(b.priority))) {
  lines.push(`### ${w.priority} · ${w.name} (\`${w.id}\`)`);
  lines.push(``);
  lines.push(`Notes: \`${w.notes_path}\``);
  lines.push(``);
  lines.push(`Search queries:`);
  for (const k of w.keywords) {
    lines.push(`- [ ] \`${k}\``);
  }
  lines.push(``);
  lines.push(`Findings:`);
  lines.push(`1. `);
  lines.push(`2. `);
  lines.push(``);
  lines.push(`Suggested site impact: none / timeline / MDX / risks`);
  lines.push(``);
}

lines.push(`## After research`);
lines.push(``);
lines.push('```bash');
lines.push('npx tsx automation/scripts/evolve.ts digest');
lines.push('npx tsx automation/scripts/evolve.ts kb');
lines.push('cd site && pnpm validate:content');
lines.push('```');
lines.push(``);

const outDir = join(root, 'research/notes');
mkdirSync(outDir, { recursive: true });
const md = lines.join('\n');
writeFileSync(join(outDir, `${date}-competitor-watch.md`), md, 'utf8');
writeFileSync(join(outDir, 'LATEST-COMPETITOR-WATCH.md'), md, 'utf8');
console.log('Wrote research/notes/' + `${date}-competitor-watch.md`);
