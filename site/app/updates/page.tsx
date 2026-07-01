import Link from "next/link";
import { getUpdates } from "@/lib/content";
import Update202606 from "./2026-06-mission-update.mdx";

export default function UpdatesPage() {
  const updates = getUpdates();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-venus hover:underline">← Back to Nephelis</Link>
      <h1 className="text-5xl font-semibold tracking-tighter mt-6 mb-8">Mission Updates</h1>
      
      <p className="text-lg text-foreground/70 mb-10">
        The latest from Project AETHER. New updates are generated and proposed by our AI research and content agents.
      </p>

      <div className="space-y-12">
        {/* Render the sample MDX directly */}
        <article className="border border-void-border rounded-2xl p-8 prose prose-invert max-w-none">
          <Update202606 />
        </article>

        {updates.map((update) => (
          <div key={update.slug} className="border border-void-border rounded-2xl p-8">
            <div className="font-mono text-xs text-venus mb-1">{update.date}</div>
            <h2 className="text-2xl tracking-tight font-semibold mb-3">{update.title}</h2>
            <p className="text-foreground/80">{update.excerpt}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-foreground/60">
        Full MDX support is enabled. Agents can create new .mdx files in content/updates/.
      </p>
    </div>
  );
}
