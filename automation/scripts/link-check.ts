/**
 * Validate external links in heritage.json (and optional MD files).
 *
 * Usage: npx tsx automation/scripts/link-check.ts
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '../..');
const heritage = JSON.parse(
  readFileSync(join(root, 'site/content/data/heritage.json'), 'utf8')
) as { mission: string; link?: string | null }[];

const timeoutMs = Number(process.env.LINK_TIMEOUT_MS || 12000);

async function probe(url: string): Promise<{ ok: boolean; status: number; error?: string }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': 'NephelisLinkCheck/1.0' },
    });
    // Some CDNs block HEAD — retry GET
    if (res.status === 405 || res.status === 403) {
      const res2 = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'User-Agent': 'NephelisLinkCheck/1.0' },
      });
      clearTimeout(t);
      return { ok: res2.status >= 200 && res2.status < 400, status: res2.status };
    }
    clearTimeout(t);
    return { ok: res.status >= 200 && res.status < 400, status: res.status };
  } catch (err) {
    clearTimeout(t);
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

async function main() {
  const links = heritage
    .map((h) => ({ mission: h.mission, link: h.link }))
    .filter((h): h is { mission: string; link: string } => Boolean(h.link));

  console.log(`Checking ${links.length} heritage links…\n`);
  let failed = 0;

  for (const { mission, link } of links) {
    const r = await probe(link);
    if (r.ok) {
      console.log(`OK   ${r.status}  ${mission}`);
    } else {
      failed += 1;
      console.log(`FAIL ${r.status}  ${mission}`);
      console.log(`      ${link}`);
      if (r.error) console.log(`      ${r.error}`);
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} link(s) failed. Fix heritage.json or mark link null.`);
    process.exit(1);
  }
  console.log('\nAll heritage links reachable.');
}

main();
