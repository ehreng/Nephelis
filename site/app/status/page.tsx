import Link from 'next/link';
import type { Metadata } from 'next';
import { getProgress, getTelemetry, getMissionControl } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Status',
  description:
    'Project AETHER program status: what is built, what is next, and how to contribute.',
};

export default function StatusPage() {
  const progress = getProgress();
  const telemetry = getTelemetry();
  const mc = getMissionControl();

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-venus hover:underline"
        >
          ← NEPHELIS INDUSTRIES
        </Link>

        <div className="mt-8 mb-10">
          <div className="mb-2 font-mono text-xs tracking-[3px] text-venus/80">
            STATUS · {progress.updated_at}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Program status
          </h1>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">{progress.headline}</p>
          <p className="mt-2 font-mono text-sm text-venus">
            {telemetry.overall_status} · {telemetry.mission_phase}
          </p>
        </div>

        <section className="mb-10 rounded-sm border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-venus/80">
            Next engineering milestone
          </h2>
          <p className="mt-3 text-white leading-relaxed">{progress.next_engineering_milestone}</p>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="border border-white/10 p-5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">Launch</h2>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              {progress.launch_posture.current}
            </p>
            {progress.launch_posture.note && (
              <p className="mt-2 text-xs text-white/45 leading-relaxed">
                {progress.launch_posture.note}
              </p>
            )}
          </div>
          <div className="border border-white/10 p-5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">Budget</h2>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              ${progress.budget_posture.crowdfund_target_usd.toLocaleString()} —{' '}
              {progress.budget_posture.label}
            </p>
            <p className="mt-2 text-xs text-white/45 leading-relaxed">
              {progress.budget_posture.flight_estimate_note}
            </p>
            {mc.funding_goal_label && (
              <p className="mt-2 font-mono text-[10px] text-white/35">{mc.funding_goal_label}</p>
            )}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-emerald-400/80 mb-4">
            Built / published
          </h2>
          <ul className="space-y-3">
            {progress.built.map((b) => (
              <li key={b.item} className="border-l-2 border-emerald-500/40 pl-4 text-sm">
                <div className="text-white">{b.item}</div>
                <div className="mt-0.5 font-mono text-xs text-white/40">{b.evidence}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
            Not yet
          </h2>
          <ul className="space-y-2 text-sm text-white/65">
            {progress.not_yet.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-white/25">—</span>
                {n}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 border border-white/10 p-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">Team</h2>
          <p className="mt-3 text-sm text-white/75 leading-relaxed">{progress.team.public}</p>
        </section>

        <section className="mb-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">
            Repositories
          </h2>
          {progress.repos.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-white/10 p-4 transition hover:border-venus/40"
            >
              <div className="font-mono text-sm text-venus">{r.name}</div>
              <div className="mt-1 text-xs text-white/50">{r.role}</div>
            </a>
          ))}
        </section>

        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/aether-os"
            className="border border-venus/50 px-4 py-2 text-venus transition hover:bg-venus hover:text-black"
          >
            AETHER OS
          </Link>
          <Link
            href="/#contribute"
            className="border border-white/20 px-4 py-2 transition hover:border-white/50"
          >
            Contribute
          </Link>
          <a
            href="https://github.com/ehreng/Nephelis/blob/main/docs/regulatory-path.md"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-4 py-2 transition hover:border-white/50"
          >
            Regulatory notes
          </a>
        </div>
      </div>
    </div>
  );
}
