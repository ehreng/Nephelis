'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type OpsPayload = {
  generated_at: string;
  allocation: {
    legacy: { allocated: number; capacity: number; paid: number; baseline: number };
    dna: { allocated: number; capacity: number; paid: number; baseline: number };
    stripe_configured: boolean;
    source: string;
  };
  telemetry: {
    overall_status: string;
    mission_phase: string;
    systems: { label: string; status: string; value: string }[];
  };
  open_tasks: { id: string; title: string; status: string; priority: string }[];
  task_counts: { planned: number; in_progress: number; done: number; total: number };
  recent_updates: { title: string; date: string }[];
  env: Record<string, boolean>;
  links: Record<string, string>;
};

export default function OpsPage() {
  const [token, setToken] = useState('');
  const [data, setData] = useState<OpsPayload | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/ops?token=${encodeURIComponent(token)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Unauthorized');
      setData(json);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nephelis_ops_token', token);
      }
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const saved = sessionStorage.getItem('nephelis_ops_token');
    if (saved) {
      setToken(saved);
    }
  }, []);

  return (
    <div className="bg-void text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <Link href="/" className="text-xs font-mono uppercase tracking-widest text-venus hover:underline">
          ← NEPHELIS
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Ops Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">Private · requires OPS_TOKEN</p>

        <form onSubmit={load} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="OPS_TOKEN"
            className="flex-1 bg-black border border-white/20 px-3 py-2 font-mono text-sm focus:outline-none focus:border-venus"
          />
          <button
            type="submit"
            disabled={loading || !token}
            className="px-6 py-2 bg-venus text-black font-mono text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Unlock'}
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {data && (
          <div className="mt-10 space-y-10">
            <div className="text-[10px] font-mono text-gray-600">
              Generated {data.generated_at}
            </div>

            <section>
              <h2 className="font-mono text-xs text-venus tracking-widest mb-3">ALLOCATION</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-white/10 p-4">
                  <div className="text-sm text-white">Tier 1 Legacy</div>
                  <div className="text-2xl font-mono text-venus">
                    {data.allocation.legacy.allocated}/{data.allocation.legacy.capacity}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-1">
                    paid {data.allocation.legacy.paid} + baseline {data.allocation.legacy.baseline}
                  </div>
                </div>
                <div className="border border-white/10 p-4">
                  <div className="text-sm text-white">Tier 2 DNA</div>
                  <div className="text-2xl font-mono text-sky-400">
                    {data.allocation.dna.allocated}/{data.allocation.dna.capacity}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-1">
                    paid {data.allocation.dna.paid} + baseline {data.allocation.dna.baseline}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[10px] font-mono text-gray-600">
                source: {data.allocation.source} · stripe:{' '}
                {data.allocation.stripe_configured ? 'yes' : 'no'}
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs text-venus tracking-widest mb-3">TELEMETRY</h2>
              <p className="text-sm mb-2">
                {data.telemetry.overall_status} · {data.telemetry.mission_phase}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.telemetry.systems.map((s) => (
                  <div key={s.label} className="border border-white/10 px-3 py-2 text-xs font-mono">
                    <div className="text-gray-500">{s.label}</div>
                    <div className="text-white">{s.value}</div>
                    <div className="text-gray-600">{s.status}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-mono text-xs text-venus tracking-widest mb-3">TASKS</h2>
              <p className="text-xs font-mono text-gray-500 mb-3">
                planned {data.task_counts.planned} · in progress {data.task_counts.in_progress} ·
                done {data.task_counts.done} · total {data.task_counts.total}
              </p>
              <ul className="space-y-2">
                {data.open_tasks.map((t) => (
                  <li key={t.id} className="text-sm border-l border-venus/40 pl-3">
                    <span className="font-mono text-[10px] text-gray-500 mr-2">{t.priority}</span>
                    {t.title}{' '}
                    <span className="text-[10px] text-gray-600 font-mono">({t.status})</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-xs text-venus tracking-widest mb-3">ENV KEYS</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(data.env).map(([k, v]) => (
                  <span
                    key={k}
                    className={`text-[10px] font-mono px-2 py-1 border ${
                      v ? 'border-emerald-500/40 text-emerald-400' : 'border-white/10 text-gray-600'
                    }`}
                  >
                    {k}: {v ? 'OK' : '—'}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-mono text-xs text-venus tracking-widest mb-3">UPDATES</h2>
              <ul className="text-sm space-y-1">
                {data.recent_updates.map((u) => (
                  <li key={u.title} className="text-gray-400">
                    <span className="font-mono text-[10px] text-gray-600 mr-2">{u.date}</span>
                    {u.title}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
