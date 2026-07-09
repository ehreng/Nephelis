/**
 * Generate social drafts from the latest mission digest (no MDX required).
 *
 * Usage: npx tsx automation/scripts/social-from-digest.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
const digestPath = join(root, 'research/notes/LATEST-DIGEST.md');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nephelisindustries.com';

if (!existsSync(digestPath)) {
  console.error('Missing research/notes/LATEST-DIGEST.md — run evolve.ts digest first');
  process.exit(1);
}

const raw = readFileSync(digestPath, 'utf8');

function section(title: string): string[] {
  const re = new RegExp(`## ${title}[\\s\\S]*?(?=\\n## |$)`, 'i');
  const m = raw.match(re);
  if (!m) return [];
  return m[0]
    .split('\n')
    .map((l) => l.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim())
    .filter((l) => l && !l.startsWith('#') && !l.startsWith('_') && !l.startsWith('|'));
}

const p0 = section('P0 open work').filter((l) => l.includes('[ ]') || l.match(/^[A-Za-z0-9_-]+/));
const risks = section('Risk radar').slice(0, 3);
const phaseLine =
  raw.match(/Phase \| \*\*([^*]+)\*\*/)?.[1] ||
  raw.match(/PHASE[:\s]+([A-Z0-9]+)/i)?.[1] ||
  'DESIGN';

const bulletP0 = p0
  .slice(0, 2)
  .map((l) => l.replace(/^\[[ x]\]\s*/i, '').replace(/^[^—-]+—\s*/, '').slice(0, 100));

const xPost = [
  `Project AETHER mission pulse — phase ${phaseLine.trim()}.`,
  ``,
  bulletP0[0] ? `• ${bulletP0[0]}` : '• Design & crowdfund path advancing',
  bulletP0[1] ? `• ${bulletP0[1]}` : '• Open risk register tracked in public data',
  ``,
  `Roadmap: ${siteUrl}/roadmap`,
  `Join the crew: ${siteUrl}/#funding`,
  ``,
  `#Venus #Space #Nephelis #ProjectAETHER`,
].join('\n');

const linkedIn = [
  `Mission pulse from Nephelis Industries (Project AETHER).`,
  ``,
  `We're building a lean aerostat probe for Venus's habitable cloud layer — launch window 2027.`,
  ``,
  `This week's focus:`,
  ...bulletP0.map((b) => `• ${b}`),
  risks[0] ? `• Risk watch: ${risks[0].slice(0, 120)}` : null,
  ``,
  `Public roadmap: ${siteUrl}/roadmap`,
  `Sponsor or volunteer: ${siteUrl}`,
]
  .filter(Boolean)
  .join('\n');

const date = new Date().toISOString().slice(0, 10);
const outDir = join(root, 'automation/social-drafts');
mkdirSync(outDir, { recursive: true });

const md = `# Social drafts (from mission digest)

Generated: ${new Date().toISOString()}  
Source: \`research/notes/LATEST-DIGEST.md\`

## X / Twitter

\`\`\`
${xPost}
\`\`\`

## LinkedIn

\`\`\`
${linkedIn}
\`\`\`

**Human gate:** review before posting. Do not auto-post.
`;

writeFileSync(join(outDir, `digest-${date}.md`), md, 'utf8');
writeFileSync(join(outDir, 'latest-from-digest.md'), md, 'utf8');
// Also refresh latest.md if env says so
if (process.env.SOCIAL_OVERWRITE_LATEST === '1') {
  writeFileSync(join(outDir, 'latest.md'), md, 'utf8');
}
console.log('Wrote', join(outDir, `digest-${date}.md`));
console.log('Wrote', join(outDir, 'latest-from-digest.md'));
