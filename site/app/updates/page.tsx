'use client';

import Link from "next/link";
import Update202606 from "../../content/updates/2026-06-mission-update.mdx";
import Update202607 from "../../content/updates/2026-07-competitor-missions.mdx";

// Note: client component — page-level metadata is set in layout or a parent server wrapper if needed.

export default function UpdatesPage() {
  return (
    <div className="bg-void text-foreground min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <Link href="/" className="text-xs font-mono uppercase tracking-widest text-venus hover:underline">← NEPHELIS INDUSTRIES</Link>
        <div className="text-[10px] mt-1 text-foreground/50">Back to <a href="/#mission" className="underline hover:text-venus">Mission</a> · <a href="/#gallery" className="underline hover:text-venus">Visuals</a> · <a href="/#funding" className="underline hover:text-venus">Sponsor</a></div>

        <div className="mt-8 mb-10">
          <div className="font-mono text-xs tracking-[3px] text-venus/80 mb-2">MISSION LOGS</div>
          <h1 className="text-6xl font-semibold tracking-[-1.5px]">Mission Updates</h1>
          <p className="mt-3 max-w-md text-lg text-foreground/70">
            The latest from Project AETHER. New updates are generated and proposed by our AI research and content agents.
          </p>
        </div>

        <div className="space-y-12">
          <article className="border border-white/10 rounded-sm p-8 glass-panel prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
            <div className="mb-4 not-prose">
              <div className="font-mono text-xs text-venus/80">2026-06-01</div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">Mission update — June 2026</h2>
            </div>
            <Update202606 />
          </article>
          <article className="border border-white/10 rounded-sm p-8 glass-panel prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
            <div className="mb-4 not-prose">
              <div className="font-mono text-xs text-venus/80">2026-07-01</div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">Competitor missions update — July 2026</h2>
            </div>
            <Update202607 />
          </article>
        </div>

        <div className="mt-12 text-xs text-foreground/50 border-l border-venus pl-3">
          MDX powered. Agents can drop new files into <code>content/updates/</code> and they appear here automatically.
        </div>
      </div>
    </div>
  );
}
