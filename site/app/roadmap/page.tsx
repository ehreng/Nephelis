import type { Metadata } from 'next';
import Link from 'next/link';
import { getMissionControl, getRisks, getTasks, getTimeline } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Public Project AETHER roadmap — milestones, workstreams, risks, and open tasks for the Venus cloud-layer probe.',
};

const statusStyle: Record<string, string> = {
  done: 'text-emerald-400 border-emerald-400/40',
  in_progress: 'text-venus border-venus/40',
  planned: 'text-gray-400 border-white/20',
  blocked: 'text-amber-400 border-amber-400/40',
  cancelled: 'text-gray-600 border-white/10',
  target: 'text-venus border-venus/40',
  current: 'text-sky-400 border-sky-400/40',
  complete: 'text-emerald-400 border-emerald-400/40',
  background: 'text-gray-500 border-white/10',
  future: 'text-gray-400 border-white/20',
};

export default function RoadmapPage() {
  const timeline = getTimeline();
  const tasks = getTasks();
  const mc = getMissionControl();
  const risks = getRisks().filter((r) => r.status === 'open' || r.status === 'mitigating');

  const byQuarter = tasks.reduce<Record<string, typeof tasks>>((acc, t) => {
    (acc[t.quarter] ||= []).push(t);
    return acc;
  }, {});
  const quarters = Object.keys(byQuarter).sort();

  return (
    <div className="bg-void text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-widest text-venus hover:underline"
        >
          ← NEPHELIS INDUSTRIES
        </Link>

        <div className="mt-8 mb-12">
          <div className="font-mono text-xs tracking-[3px] text-venus/80 mb-2">PUBLIC ROADMAP</div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Mission Path</h1>
          <p className="mt-3 max-w-xl text-lg text-foreground/70">
            Driven by structured mission data. Agents and humans update JSON — this page follows.
          </p>
          <p className="mt-2 font-mono text-[10px] text-gray-500">
            {mc.callsign} · {mc.phase} · target {mc.launch_target} · goal $
            {mc.funding_goal_usd.toLocaleString()}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
            Milestones
          </h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 border-l-2 border-venus/40 pl-6 py-1"
              >
                <div className="font-mono w-16 text-venus shrink-0">{item.year}</div>
                <div className="flex-1">
                  <div>{item.event}</div>
                  <span
                    className={`inline-block mt-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${statusStyle[item.status] || statusStyle.planned}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
            Risk register (open)
          </h2>
          <ul className="space-y-2">
            {risks.map((r) => (
              <li
                key={r.id}
                className="border border-white/10 px-4 py-3 bg-white/[0.02] text-sm flex flex-wrap gap-2 items-baseline"
              >
                <span className="font-mono text-venus text-xs w-12">{r.id}</span>
                <span className="flex-1">{r.title}</span>
                <span className="font-mono text-[10px] text-gray-500 uppercase">
                  {r.impact}/{r.likelihood}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            Detail + mitigations in data · concept depth on{' '}
            <Link href="/mission" className="text-venus hover:underline">
              /mission
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
            Active Workstreams
          </h2>
          <div className="space-y-10">
            {quarters.map((q) => (
              <div key={q}>
                <h3 className="font-mono text-sm text-white mb-3">{q}</h3>
                <ul className="space-y-2">
                  {byQuarter[q]
                    .slice()
                    .sort((a, b) => a.priority.localeCompare(b.priority))
                    .map((t) => (
                      <li
                        key={t.id}
                        className="flex flex-wrap items-center gap-3 border border-white/10 px-4 py-3 bg-white/[0.02]"
                      >
                        <span className="font-mono text-[10px] text-gray-500 w-8">{t.priority}</span>
                        <span className="flex-1 text-sm">{t.title}</span>
                        <span className="font-mono text-[10px] text-gray-600 uppercase">
                          {t.area}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${statusStyle[t.status] || statusStyle.planned}`}
                        >
                          {t.status.replace('_', ' ')}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-12 text-xs text-foreground/50 border-l border-venus pl-3">
          Want to help? See <Link href="/#contribute" className="text-venus hover:underline">Contribute</Link> or open a PR against the data files.
        </p>
      </div>
    </div>
  );
}
