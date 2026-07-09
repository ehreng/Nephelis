/**
 * Detect env / Stripe mode drift for ops.
 * Safe: never prints secret values.
 *
 * Usage:
 *   npx tsx automation/scripts/env-check.ts
 *   (loads site/.env.local if present via process env only — pass env from shell)
 */
function flag(name: string): boolean {
  return Boolean(process.env[name] && String(process.env[name]).trim());
}

function stripeMode(): 'live' | 'test' | 'missing' | 'unknown' {
  const k = process.env.STRIPE_SECRET_KEY || '';
  if (!k) return 'missing';
  if (k.startsWith('sk_live_')) return 'live';
  if (k.startsWith('sk_test_')) return 'test';
  return 'unknown';
}

const checks: { name: string; ok: boolean; note?: string }[] = [
  { name: 'RESEND_API_KEY', ok: flag('RESEND_API_KEY') },
  { name: 'RESEND_AUDIENCE_ID', ok: flag('RESEND_AUDIENCE_ID'), note: 'optional but recommended' },
  { name: 'RESEND_FROM_EMAIL', ok: flag('RESEND_FROM_EMAIL'), note: 'use verified domain in prod' },
  { name: 'TEAM_EMAIL', ok: flag('TEAM_EMAIL') },
  { name: 'STRIPE_SECRET_KEY', ok: flag('STRIPE_SECRET_KEY') },
  { name: 'STRIPE_WEBHOOK_SECRET', ok: flag('STRIPE_WEBHOOK_SECRET') },
  { name: 'NEXT_PUBLIC_SITE_URL', ok: flag('NEXT_PUBLIC_SITE_URL') },
  { name: 'OPS_TOKEN', ok: flag('OPS_TOKEN') },
  {
    name: 'STRIPE_PRICE_LEGACY',
    ok: flag('STRIPE_PRICE_LEGACY'),
    note: 'optional — dynamic price_data fallback exists',
  },
  {
    name: 'STRIPE_PRICE_DNA',
    ok: flag('STRIPE_PRICE_DNA'),
    note: 'optional',
  },
];

const mode = stripeMode();
const site = process.env.NEXT_PUBLIC_SITE_URL || '';
const preferWww = site.includes('www.nephelisindustries.com');

console.log('Nephelis env check (values redacted)\n');

let missingRequired = 0;
for (const c of checks) {
  const mark = c.ok ? 'OK  ' : 'MISS';
  if (!c.ok && !c.note?.includes('optional')) missingRequired += 1;
  console.log(`${mark}  ${c.name}${c.note ? `  (${c.note})` : ''}`);
}

console.log(`\nStripe mode: ${mode}`);
if (mode === 'test') {
  console.log('  → Test keys active. Flip to sk_live_ + live webhook before real charges.');
}
if (mode === 'live') {
  console.log('  → LIVE keys detected. Confirm webhook endpoint is live mode too.');
}
if (mode === 'missing') {
  missingRequired += 1;
}

console.log(`\nSite URL: ${site || '(unset)'}`);
if (site && !preferWww && site.includes('nephelisindustries.com')) {
  console.log('  WARN prefer https://www.nephelisindustries.com for canonical OG/sitemap');
}

// Lightweight live probe of allocation if site set
async function probe() {
  const base = (site || 'https://www.nephelisindustries.com').replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/api/allocation`);
    const j = await res.json();
    console.log(`\nAllocation @ ${base}: stripe_configured=${j.stripe_configured} paid_legacy=${j.legacy?.paid}`);
  } catch (e) {
    console.log('\nAllocation probe failed', e instanceof Error ? e.message : e);
  }

  if (missingRequired > 0) {
    console.error(`\n${missingRequired} required env flag(s) missing in this shell.`);
    console.error('On Vercel: set via dashboard. Locally: export from site/.env.local');
    // Don't fail hard by default — ops advisory
    if (process.env.ENV_CHECK_STRICT === '1') process.exit(1);
  } else {
    console.log('\nEnv presence check OK for this process.');
  }
}

probe();
