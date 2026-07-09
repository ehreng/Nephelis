/**
 * Generate social post drafts from the latest MDX update(s).
 *
 * Usage:
 *   npx tsx automation/scripts/social-draft.ts
 *   npx tsx automation/scripts/social-draft.ts site/content/updates/2026-07-competitor-missions.mdx
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = join(__dirname, '../..');
const updatesDir = join(root, 'site/content/updates');
const outDir = join(root, 'automation/social-drafts');
mkdirSync(outDir, { recursive: true });

function listMdx(): string[] {
  return readdirSync(updatesDir)
    .filter((f) => f.endsWith('.mdx') && !f.includes('research-draft'))
    .map((f) => join(updatesDir, f))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
}

function stripMdx(src: string): string {
  return src
    .replace(/^export const meta[\s\S]*?;\s*/m, '')
    .replace(/^import .*$/gm, '')
    .replace(/^\s*#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

function firstParagraphs(text: string, n = 2): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
    .slice(0, n);
}

const args = process.argv.slice(2);
const files = args.length ? args.map((a) => (a.startsWith('/') ? a : join(root, a))) : listMdx().slice(0, 1);

if (!files.length) {
  console.error('No MDX updates found');
  process.exit(1);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nephelisindustries.com';
const lines: string[] = [`# Social drafts`, ``, `Generated: ${new Date().toISOString()}`, ``];

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const slug = basename(file, '.mdx');
  const plain = stripMdx(raw);
  const paras = firstParagraphs(plain, 3);
  const title = plain.split('\n')[0]?.slice(0, 120) || slug;
  const url = `${siteUrl}/updates`;

  const xPost = [
    `Clouds over Venus — Project AETHER update.`,
    ``,
    paras[0]?.slice(0, 180) || title,
    ``,
    `Read: ${url}`,
    ``,
    `#Venus #Space #Nephelis`,
  ].join('\n');

  const linkedIn = [
    `Mission update from Nephelis Industries (Project AETHER).`,
    ``,
    paras.slice(0, 2).join('\n\n'),
    ``,
    `Full log: ${url}`,
    ``,
    `We're building a low-cost aerostat probe for Venus's habitable cloud layer. Volunteers and sponsors welcome.`,
  ].join('\n');

  lines.push(`## Source: \`${slug}.mdx\``, ``, `### X / Twitter`, ``, '```', xPost, '```', ``, `### LinkedIn`, ``, '```', linkedIn, '```', ``);
}

const outPath = join(outDir, `latest.md`);
writeFileSync(outPath, lines.join('\n'), 'utf8');
const dated = join(outDir, `${new Date().toISOString().slice(0, 10)}.md`);
writeFileSync(dated, lines.join('\n'), 'utf8');
console.log('Wrote', outPath);
console.log('Wrote', dated);
