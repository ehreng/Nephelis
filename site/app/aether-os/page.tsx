import Link from 'next/link';
import type { Metadata } from 'next';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const metadata: Metadata = {
  title: 'AETHER OS',
  description:
    'AETHER OS — AI-coordinated, adaptive operating system for Project AETHER. Daily mission briefs, contribution tiers, recursive loops.',
};

function loadBriefExcerpt(): string | null {
  try {
    // Repo layout: site/ is Vercel root; aether-os lives one level up in monorepo
    const candidates = [
      join(process.cwd(), '../aether-os/briefs/latest.md'),
      join(process.cwd(), 'aether-os/briefs/latest.md'),
    ];
    for (const p of candidates) {
      if (existsSync(p)) {
        const full = readFileSync(p, 'utf8');
        // First ~40 lines for public surface
        return full.split('\n').slice(0, 48).join('\n');
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

export default function AetherOsPage() {
  const brief = loadBriefExcerpt();

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0]">
      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-venus">
            Project AETHER · Mission OS
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            AETHER OS
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            An AI-coordinated, adaptive, recursive operating system for Cloudseeker — detect needs,
            plan work, execute or assign, verify outcomes, and improve itself. Built for distributed
            humans + agents. Founder Emeritus oversight on high-stakes decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
            <a
              href="https://github.com/ehreng/Nephelis/blob/main/docs/AETHER_OS_Architecture_v1.md"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-venus/50 px-4 py-2 text-venus transition hover:bg-venus hover:text-black"
            >
              Architecture v1.0
            </a>
            <a
              href="https://github.com/ehreng/Nephelis/blob/main/aether-os/briefs/latest.md"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-4 py-2 text-white transition hover:border-white/50"
            >
              Latest Mission Brief
            </a>
            <Link
              href="/#contribute"
              className="border border-white/20 px-4 py-2 text-white transition hover:border-white/50"
            >
              Contribute
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-14">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Loops</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>Daily Mission · DETECT → PLAN → EXECUTE → VERIFY</li>
              <li>Weekly Mission Digest · MCC snapshot</li>
              <li>Website evolution · content &amp; code PRs</li>
              <li>Research · knowledge base</li>
              <li>Hardware / regulatory · gated (L3)</li>
              <li>Meta-loop · recursive self-improvement</li>
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Contribution tiers
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <span className="text-venus">L1</span> — Anyone: content, social, ideas, simple
                graphics
              </li>
              <li>
                <span className="text-venus">L2</span> — Skilled: code, sims, technical writing,
                design
              </li>
              <li>
                <span className="text-venus">L3</span> — Trusted: hardware, regulatory, deep
                engineering
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/45">
              Claim via GitHub Issues (<code className="text-white/60">claiming</code>) or the site
              form. Evidence required. Logged in the contribution record.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Priority order
          </h2>
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-white/75">
            <li>Safety / regulatory blockers</li>
            <li>Critical-path hardware</li>
            <li>High-visibility public progress</li>
            <li>Nice-to-have content</li>
          </ol>
        </div>
      </section>

      {brief && (
        <section className="py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Latest brief (excerpt)
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-white/60 whitespace-pre-wrap">
              {brief}
              {'\n…'}
            </pre>
            <a
              href="https://github.com/ehreng/Nephelis/blob/main/aether-os/briefs/latest.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-xs text-venus hover:underline"
            >
              Full brief on GitHub →
            </a>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-4xl px-4 font-mono text-xs text-white/40 sm:px-6 lg:px-8">
          Founder Emeritus / Strategic Oversight: Ehren Goossens · Daily management offloaded to the
          Agent + system · Not for consumption. For continuation.
        </div>
      </section>
    </div>
  );
}
