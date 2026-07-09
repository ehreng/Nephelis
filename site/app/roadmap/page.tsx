import type { Metadata } from 'next';
import Link from 'next/link';
import { getMissionControl, getRisks, getTasks, getTimeline } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Project AETHER accelerated roadmap — design, build, test, launch, and float ops through 2028.',
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

const areaOrder = [
  'mission',
  'hardware',
  'avionics',
  'comms',
  'science',
  'software',
  'partners',
  'growth',
  'program',
  'ops',
  'site',
  'content',
];

function quarterSortKey(q: string): string {
  // 2026-Q3, 2027-Q4, 2028-H1, 2028-Q2
  return q;
}

export default function RoadmapPage() {
  const timeline = getTimeline();
  const tasks = getTasks();
  const mc = getMissionControl();
  const risks = getRisks().filter((r) => r.status === 'open' || r.status === 'mitigating');

  const openTasks = tasks.filter((t) => t.status === 'planned' || t.status === 'in_progress');
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const byQuarter = openTasks.reduce<Record<string, typeof tasks>>((acc, t) => {
    (acc[t.quarter] ||= []).push(t);
    return acc;
  }, {});
  const quarters = Object.keys(byQuarter).sort((a, b) =>
    quarterSortKey(a).localeCompare(quarterSortKey(b))
  );

  const byArea = openTasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.area] = (acc[t.area] || 0) + 1;
    return acc;
  }, {});

  const p0Open = openTasks.filter((t) => t.priority === 'P0').length;

  return (
    <div className="bg-void text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-widest text-venus hover:underline"
        >
          ← NEPHELIS INDUSTRIES
        </Link>

        <div className="mt-8 mb-10">
          <div className="font-mono text-xs tracking-[3px] text-venus/80 mb-2">PUBLIC ROADMAP</div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Mission Path</h1>
          <p className="mt-3 max-w-2xl text-lg text-foreground/70">
            Accelerated private probe timeline: design → prototype → build → qualify → launch →
            float. Compressed relative to flagship missions, but still follows the same logical gates
            (requirements, PDR/CDR-lite, I&T, launch ops).
          </p>
          <p className="mt-2 font-mono text-[10px] text-gray-500">
            {mc.callsign} · {mc.phase} · target {mc.launch_target} · goal $
            {mc.funding_goal_usd.toLocaleString()}
          </p>
        </div>

        {/* Snapshot */}
        <section className="mb-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'OPEN TASKS', value: String(openTasks.length) },
            { label: 'P0 OPEN', value: String(p0Open) },
            { label: 'DONE', value: String(doneCount) },
            { label: 'OPEN RISKS', value: String(risks.length) },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 bg-white/[0.02] px-3 py-3">
              <div className="font-mono text-[10px] text-gray-500 tracking-wider">{s.label}</div>
              <div className="text-2xl font-mono text-venus mt-1">{s.value}</div>
            </div>
          ))}
        </section>

        <section className="mb-14">
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-3">
            Work by domain (open)
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(byArea)
              .sort((a, b) => b[1] - a[1])
              .map(([area, n]) => (
                <span
                  key={area}
                  className="font-mono text-[10px] uppercase tracking-wider border border-white/15 px-2 py-1 text-gray-400"
                >
                  {area} <span className="text-venus">{n}</span>
                </span>
              ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
            Program milestones
          </h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 border-l-2 border-venus/40 pl-6 py-1">
                <div className="font-mono w-20 text-venus shrink-0 text-sm">{item.year}</div>
                <div className="flex-1">
                  <div className="text-sm md:text-base">{item.event}</div>
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
            MCC checklist
          </h2>
          <ul className="space-y-2">
            {mc.checklist.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap gap-2 items-baseline border border-white/10 px-4 py-2.5 text-sm bg-white/[0.02]"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border ${statusStyle[c.status] || statusStyle.planned}`}
                >
                  {c.status.replace('_', ' ')}
                </span>
                <span className="flex-1">{c.item}</span>
                <span className="font-mono text-[10px] text-gray-600">{c.phase}</span>
                {c.due && <span className="font-mono text-[10px] text-venus/70">{c.due}</span>}
              </li>
            ))}
          </ul>
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
            Mitigations on{' '}
            <Link href="/mission" className="text-venus hover:underline">
              /mission
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2">
            Detailed workstreams
          </h2>
          <p className="text-xs text-gray-600 mb-8 max-w-xl">
            Open and in-progress only. Completed site/automation work is tracked in data but hidden
            here for clarity. Source: <code className="text-venus">tasks.json</code>.
          </p>

          <div className="space-y-12">
            {quarters.map((q) => {
              const qTasks = byQuarter[q].slice().sort((a, b) => {
                const pr = a.priority.localeCompare(b.priority);
                if (pr !== 0) return pr;
                const ai = areaOrder.indexOf(a.area);
                const bi = areaOrder.indexOf(b.area);
                return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
              });

              const areasInQ = [...new Set(qTasks.map((t) => t.area))];

              return (
                <div key={q}>
                  <h3 className="font-mono text-sm text-white mb-4 border-b border-white/10 pb-2">
                    {q}{' '}
                    <span className="text-gray-600 text-xs">
                      · {qTasks.length} open · {qTasks.filter((t) => t.priority === 'P0').length} P0
                    </span>
                  </h3>

                  {areasInQ
                    .sort((a, b) => {
                      const ai = areaOrder.indexOf(a);
                      const bi = areaOrder.indexOf(b);
                      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
                    })
                    .map((area) => (
                      <div key={area} className="mb-6">
                        <div className="font-mono text-[10px] uppercase tracking-[2px] text-venus/70 mb-2">
                          {area}
                        </div>
                        <ul className="space-y-2">
                          {qTasks
                            .filter((t) => t.area === area)
                            .map((t) => (
                              <li
                                key={t.id}
                                className="flex flex-wrap items-center gap-3 border border-white/10 px-4 py-3 bg-white/[0.02]"
                              >
                                <span className="font-mono text-[10px] text-gray-500 w-8">
                                  {t.priority}
                                </span>
                                <span className="flex-1 text-sm">{t.title}</span>
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
              );
            })}
          </div>
        </section>

        <p className="mt-12 text-xs text-foreground/50 border-l border-venus pl-3">
          Want to own a workstream?{' '}
          <Link href="/#contribute" className="text-venus hover:underline">
            Volunteer intake
          </Link>{' '}
          or open a PR against <code className="text-venus">site/content/data/tasks.json</code>.
        </p>
      </div>
    </div>
  );
}
