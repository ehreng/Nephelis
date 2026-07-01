'use client';

import Link from "next/link";
import Update202606 from "../../content/updates/2026-06-mission-update.mdx";
import Update202607 from "../../content/updates/2026-07-competitor-missions.mdx";

export default function UpdatesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-venus hover:underline">← Back to Nephelis</Link>
      <h1 className="text-5xl font-semibold tracking-tighter mt-6 mb-8">Mission Updates</h1>
      
      <p className="text-lg text-foreground/70 mb-10">
        The latest from Project AETHER. New updates are generated and proposed by our AI research and content agents.
      </p>

      <div className="space-y-12">
        {/* Render the full MDX posts */}
        <article className="border border-void-border rounded-2xl p-8 prose prose-invert max-w-none">
          <Update202606 />
        </article>
        <article className="border border-void-border rounded-2xl p-8 prose prose-invert max-w-none">
          <Update202607 />
        </article>
      </div>

      <p className="mt-10 text-sm text-foreground/60">
        Full MDX support is enabled. Agents can create new .mdx files in content/updates/.
      </p>
    </div>
  );
}
