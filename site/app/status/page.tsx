import Link from 'next/link';
import type { Metadata } from 'next';
import { getProgress, getTelemetry, getMissionControl } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Honest Status',
  description:
    'What Project AETHER has actually built vs vision. Pre-hardware. No empty authority claims. No committed 2027 launch.',
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
          <div className="mb-2 font-mono text-xs tracking-[3px] text-amber-400/90">
            HONEST STATUS · {progress.updated_at}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            What is real
          </h1>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">{progress.headline}</p>
          <p className="mt-2 font-mono text-sm text-venus">
            {telemetry.overall_status} · {telemetry.mission_phase}
          </p>
        </div>

        <section className="mb-10 rounded-sm border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-400/90">
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
            <p className="mt-2 text-xs text-white/45 leading-relaxed">
              Prior public claim withdrawn: {progress.launch_posture.previous_public_claim}.{' '}
              {progress.launch_posture.note}
            </p>
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
                <div className="text-xs text-white/40 font-mono mt-0.5">{b.evidence}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
            Not yet (honest)
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
          <p className="mt-3 text-sm text-amber-200/70 leading-relaxed">
            {progress.team.authority_claims}
          </p>
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
              className="block border border-white/10 p-4 hover:border-venus/40 transition"
            >
              <div className="font-mono text-venus text-sm">{r.name}</div>
              <div className="text-xs text-white/50 mt-1">{r.role}</div>
            </a>
          ))}
        </section>

        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/aether-os"
            className="border border-venus/50 px-4 py-2 text-venus hover:bg-venus hover:text-black transition"
          >
            AETHER OS
          </Link>
          <Link
            href="/#contribute"
            className="border border-white/20 px-4 py-2 hover:border-white/50 transition"
          >
            Contribute
          </Link>
          <a
            href="https://github.com/ehreng/Nephelis/blob/main/docs/regulatory-path.md"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-4 py-2 hover:border-white/50 transition"
          >
            Regulatory notes
          </a>
        </div>
      </div>
    </div>
  );
}
