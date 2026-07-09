import { NextRequest, NextResponse } from 'next/server';
import { getAllocation } from '@/lib/allocation';
import {
  getMassBudget,
  getMissionControl,
  getPartners,
  getRisks,
  getTasks,
  getTelemetry,
  getUpdates,
} from '@/lib/content';

export const dynamic = 'force-dynamic';

function authorized(request: NextRequest) {
  const token = process.env.OPS_TOKEN;
  if (!token) return false;
  const header = request.headers.get('authorization');
  if (header === `Bearer ${token}`) return true;
  const q = request.nextUrl.searchParams.get('token');
  return q === token;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [allocation, tasks, telemetry, updates, risks, partners, mc, mass] = await Promise.all([
      getAllocation(),
      Promise.resolve(getTasks()),
      Promise.resolve(getTelemetry()),
      Promise.resolve(getUpdates()),
      Promise.resolve(getRisks()),
      Promise.resolve(getPartners()),
      Promise.resolve(getMissionControl()),
      Promise.resolve(getMassBudget()),
    ]);

    const stripeKey = process.env.STRIPE_SECRET_KEY || '';
    const stripe_mode = stripeKey.startsWith('sk_live_')
      ? 'live'
      : stripeKey.startsWith('sk_test_')
        ? 'test'
        : stripeKey
          ? 'unknown'
          : 'missing';

    const envStatus = {
      resend: Boolean(process.env.RESEND_API_KEY),
      resend_audience: Boolean(process.env.RESEND_AUDIENCE_ID),
      stripe: Boolean(process.env.STRIPE_SECRET_KEY),
      stripe_webhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      stripe_mode,
      github_volunteer: Boolean(process.env.GITHUB_TOKEN || process.env.GH_TOKEN),
      volunteer_webhook: Boolean(process.env.VOLUNTEER_WEBHOOK_URL),
      site_url: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    };

    const openTasks = tasks.filter((t) => t.status === 'planned' || t.status === 'in_progress');
    const openRisks = risks.filter((r) => r.status === 'open' || r.status === 'mitigating');
    const staleDays = 14;
    const now = Date.now();
    const stalePartners = partners.filter((p) => {
      if (['closed', 'won', 'paused'].includes(p.status)) return false;
      if (p.priority !== 'P0' && p.priority !== 'P1') return false;
      const touched = (p as { last_touched?: string }).last_touched || '';
      if (!touched) return true;
      return (now - new Date(touched).getTime()) / 86400000 > staleDays;
    });

    return NextResponse.json({
      generated_at: new Date().toISOString(),
      allocation,
      telemetry,
      mission_control: {
        phase: mc.phase,
        launch_target: mc.launch_target,
        funding_goal_usd: mc.funding_goal_usd,
        checklist_open: mc.checklist.filter((c) => c.status !== 'done' && c.status !== 'cancelled')
          .length,
      },
      mass: { wet_mass_kg: mass.wet_mass_kg, elements: mass.elements.length },
      open_tasks: openTasks,
      task_counts: {
        planned: tasks.filter((t) => t.status === 'planned').length,
        in_progress: tasks.filter((t) => t.status === 'in_progress').length,
        done: tasks.filter((t) => t.status === 'done').length,
        total: tasks.length,
      },
      risks: {
        open: openRisks.length,
        critical_or_high: openRisks.filter((r) => r.impact === 'critical' || r.impact === 'high')
          .length,
      },
      partners: {
        active: partners.filter((p) => !['closed', 'won'].includes(p.status)).length,
        stale_p0_p1: stalePartners.map((p) => p.id),
      },
      recent_updates: updates,
      env: envStatus,
      links: {
        site: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nephelisindustries.com',
        github: 'https://github.com/ehreng/Nephelis',
        roadmap: '/roadmap',
        mission: '/mission',
      },
    });
  } catch (err) {
    console.error('Ops API error:', err);
    return NextResponse.json({ error: 'Failed to load ops data' }, { status: 500 });
  }
}
