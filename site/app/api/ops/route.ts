import { NextRequest, NextResponse } from 'next/server';
import { getAllocation } from '@/lib/allocation';
import { getTasks, getTelemetry, getUpdates } from '@/lib/content';

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
    const [allocation, tasks, telemetry, updates] = await Promise.all([
      getAllocation(),
      Promise.resolve(getTasks()),
      Promise.resolve(getTelemetry()),
      Promise.resolve(getUpdates()),
    ]);

    const envStatus = {
      resend: Boolean(process.env.RESEND_API_KEY),
      resend_audience: Boolean(process.env.RESEND_AUDIENCE_ID),
      stripe: Boolean(process.env.STRIPE_SECRET_KEY),
      stripe_webhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      github_volunteer: Boolean(process.env.GITHUB_TOKEN || process.env.GH_TOKEN),
      volunteer_webhook: Boolean(process.env.VOLUNTEER_WEBHOOK_URL),
      site_url: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    };

    const openTasks = tasks.filter((t) => t.status === 'planned' || t.status === 'in_progress');

    return NextResponse.json({
      generated_at: new Date().toISOString(),
      allocation,
      telemetry,
      open_tasks: openTasks,
      task_counts: {
        planned: tasks.filter((t) => t.status === 'planned').length,
        in_progress: tasks.filter((t) => t.status === 'in_progress').length,
        done: tasks.filter((t) => t.status === 'done').length,
        total: tasks.length,
      },
      recent_updates: updates,
      env: envStatus,
      links: {
        site: process.env.NEXT_PUBLIC_SITE_URL || 'https://nephelisindustries.com',
        github: 'https://github.com/ehreng/Nephelis',
        roadmap: '/roadmap',
      },
    });
  } catch (err) {
    console.error('Ops API error:', err);
    return NextResponse.json({ error: 'Failed to load ops data' }, { status: 500 });
  }
}
