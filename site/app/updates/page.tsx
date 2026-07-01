'use client';

import Link from "next/link";
import Update202606 from "../../content/updates/2026-06-mission-update.mdx";
import Update202607 from "../../content/updates/2026-07-competitor-missions.mdx";

export default function UpdatesPage() {
  return (
    <div className="bg-void text-foreground min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <Link href="/" className="text-xs font-mono uppercase tracking-widest text-venus hover:underline">← NEPHELIS INDUSTRIES</Link>

        <div className="mt-8 mb-10">
          <div className="font-mono text-xs tracking-[3px] text-venus/80 mb-2">MISSION LOGS</div>
          <h1 className="text-6xl font-semibold tracking-[-1.5px]">Mission Updates</h1>
          <p className="mt-3 max-w-md text-lg text-foreground/70">
            The latest from Project AETHER. New updates are generated and proposed by our AI research and content agents.
          </p>
        </div>

        <div className="space-y-12">
          <article className="border border-white/10 rounded-sm p-8 glass-panel prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
            <Update202606 />
          </article>
          <article className="border border-white/10 rounded-sm p-8 glass-panel prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
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
