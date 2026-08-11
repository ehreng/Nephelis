'use client';

import Link from 'next/link';
import Update202608 from '../../content/updates/2026-08-aether-os.mdx';
import Update202607 from '../../content/updates/2026-07-competitor-missions.mdx';
import Update202606 from '../../content/updates/2026-06-mission-update.mdx';

/** Newest first — keep in sync with getUpdates() in lib/content.ts */
const UPDATES = [
  {
    date: '2026-08-11',
    title: 'AETHER OS online — August 2026',
    Component: Update202608,
  },
  {
    date: '2026-07-01',
    title: 'Competitor missions update — July 2026',
    Component: Update202607,
  },
  {
    date: '2026-06-01',
    title: 'Mission update — June 2026',
    Component: Update202606,
  },
] as const;

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-void text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-venus hover:underline"
        >
          ← NEPHELIS INDUSTRIES
        </Link>
        <div className="mt-1 text-[10px] text-foreground/50">
          Back to{' '}
          <a href="/#mission" className="underline hover:text-venus">
            Mission
          </a>{' '}
          ·{' '}
          <a href="/#gallery" className="underline hover:text-venus">
            Visuals
          </a>{' '}
          ·{' '}
          <a href="/#funding" className="underline hover:text-venus">
            Sponsor
          </a>{' '}
          ·{' '}
          <Link href="/aether-os" className="underline hover:text-venus">
            AETHER OS
          </Link>
        </div>

        <div className="mb-10 mt-8">
          <div className="mb-2 font-mono text-xs tracking-[3px] text-venus/80">MISSION LOGS</div>
          <h1 className="text-6xl font-semibold tracking-[-1.5px]">Mission Updates</h1>
          <p className="mt-3 max-w-md text-lg text-foreground/70">
            Newest first. Logs from Project AETHER — including AETHER OS automation and open
            contribution calls.
          </p>
        </div>

        <div className="space-y-12">
          {UPDATES.map(({ date, title, Component }) => (
            <article
              key={date}
              className="glass-panel prose prose-invert max-w-none rounded-sm border border-white/10 p-8 prose-headings:font-semibold prose-headings:tracking-tight"
            >
              <div className="mb-4 not-prose">
                <div className="font-mono text-xs text-venus/80">{date}</div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
              </div>
              <Component />
            </article>
          ))}
        </div>

        <div className="mt-12 border-l border-venus pl-3 text-xs text-foreground/50">
          MDX in <code>content/updates/</code> · claim work via GitHub or{' '}
          <a href="/#contribute" className="underline hover:text-venus">
            Contribute
          </a>
          .
        </div>
      </div>
    </div>
  );
}
