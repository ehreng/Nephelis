'use client';

import { useEffect, useState } from 'react';
import type { Gate3Packet } from '@/lib/telemetry-mock';

type Api = {
  schema: string;
  note: string;
  packets: Gate3Packet[];
};

function series(packets: Gate3Packet[], id: string): number[] {
  return packets.map((p) => p.sensors.find((s) => s.id === id)?.v ?? 0);
}

function Spark({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 100;
  const h = 28;
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 2) - 1;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

export default function MockTelemetry() {
  const [data, setData] = useState<Api | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch('/api/telemetry/mock?n=24')
        .then((r) => r.json())
        .then((j: Api) => {
          if (!cancelled) {
            setData(j);
            setErr(null);
          }
        })
        .catch(() => {
          if (!cancelled) setErr('mock stream offline');
        });
    };
    load();
    const id = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const packets = data?.packets ?? [];
  const latest = packets.at(-1);
  const t = latest ? series(packets, 'MET.T') : [];
  const p = latest ? series(packets, 'MET.P') : [];
  const tNow = latest?.sensors.find((s) => s.id === 'MET.T');
  const pNow = latest?.sensors.find((s) => s.id === 'MET.P');
  const ring = latest?.sensors.find((s) => s.id === 'RING');

  return (
    <div className="border border-white/10 bg-black/40 p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
          Gate 3 mock stream · AETHER-G3/1
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400/80">
          Simulated stream
        </div>
      </div>
      {err && <p className="mt-3 text-xs text-red-400">{err}</p>}
      {latest && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border border-white/10 p-3">
              <div className="font-mono text-[10px] text-white/40">MET.T</div>
              <div className="mt-1 font-mono text-lg text-white">
                {tNow?.v} <span className="text-xs text-white/40">{tNow?.u}</span>
              </div>
              <Spark values={t} color="#00F0FF" />
            </div>
            <div className="border border-white/10 p-3">
              <div className="font-mono text-[10px] text-white/40">MET.P</div>
              <div className="mt-1 font-mono text-lg text-white">
                {pNow?.v} <span className="text-xs text-white/40">{pNow?.u}</span>
              </div>
              <Spark values={p} color="#FF4500" />
            </div>
            <div className="border border-white/10 p-3">
              <div className="font-mono text-[10px] text-white/40">RING</div>
              <div className="mt-1 flex items-center gap-2 font-mono text-lg text-white">
                <span
                  className={`h-2 w-2 rounded-full ${ring?.v ? 'bg-tech shadow-[0_0_8px_#00F0FF]' : 'bg-white/20'}`}
                />
                {ring?.v ? 'ON' : 'OFF'}
              </div>
              <div className="mt-2 font-mono text-[10px] text-white/35">
                seq {latest.seq} · {latest.src}
              </div>
            </div>
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/35">
            {data?.note} GET /api/telemetry/mock · schema in docs/gate3-telemetry-schema.md
          </p>
        </>
      )}
    </div>
  );
}
