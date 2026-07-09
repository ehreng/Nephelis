/**
 * Probe production (or BASE_URL) endpoints for automation / ops health.
 *
 * Usage:
 *   BASE_URL=https://www.nephelisindustries.com npx tsx automation/scripts/health-check.ts
 */
const base = (process.env.BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nephelisindustries.com').replace(
  /\/$/,
  ''
);

type Result = { path: string; ok: boolean; status: number; detail?: string };

async function check(path: string, opts?: { method?: string; body?: unknown; expectJson?: boolean }): Promise<Result> {
  const method = opts?.method || 'GET';
  try {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: opts?.body ? { 'Content-Type': 'application/json' } : undefined,
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      redirect: 'follow',
    });
    const status = res.status;
    let detail = '';
    if (opts?.expectJson !== false && res.headers.get('content-type')?.includes('json')) {
      const j = await res.json().catch(() => null);
      if (j) detail = JSON.stringify(j).slice(0, 160);
    }
    const ok = status >= 200 && status < 400;
    return { path: `${method} ${path}`, ok, status, detail };
  } catch (err) {
    return {
      path: `${method} ${path}`,
      ok: false,
      status: 0,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

async function main() {
  console.log(`Nephelis health check → ${base}\n`);

  const results: Result[] = [];
  results.push(await check('/'));
  results.push(await check('/roadmap'));
  results.push(await check('/updates'));
  results.push(await check('/sitemap.xml'));
  results.push(await check('/robots.txt'));
  results.push(await check('/api/allocation', { expectJson: true }));

  // Webhook should reject missing signature
  const wh = await check('/api/webhooks/stripe', {
    method: 'POST',
    body: {},
    expectJson: true,
  });
  results.push({
    ...wh,
    ok: wh.status === 400 || wh.status === 503, // expected reject or not configured
    detail: `${wh.detail || ''} (expect 400 missing sig or 503 if unset)`,
  });

  // Ops without token should 401
  const ops = await check('/api/ops');
  results.push({
    ...ops,
    ok: ops.status === 401,
    detail: `${ops.detail || ''} (expect 401)`,
  });

  let failed = 0;
  for (const r of results) {
    const mark = r.ok ? 'OK ' : 'FAIL';
    if (!r.ok) failed += 1;
    console.log(`${mark}  ${r.status}  ${r.path}`);
    if (r.detail) console.log(`      ${r.detail}`);
  }

  // Allocation sanity
  try {
    const res = await fetch(`${base}/api/allocation`);
    const a = await res.json();
    console.log('\nAllocation snapshot:');
    console.log(
      `  legacy ${a.legacy?.allocated}/${a.legacy?.capacity} (paid ${a.legacy?.paid}) · dna ${a.dna?.allocated}/${a.dna?.capacity} · stripe=${a.stripe_configured}`
    );
  } catch {
    /* already reported */
  }

  if (failed > 0) {
    console.error(`\n${failed} check(s) failed.`);
    process.exit(1);
  }
  console.log('\nAll health checks passed.');
}

main();
