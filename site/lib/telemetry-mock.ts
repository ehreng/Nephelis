export type Gate3Sensor = {
  id: string;
  v: number;
  u: string;
};

export type Gate3Packet = {
  v: 1;
  ts: string;
  src: 'sim' | 'bay-mock';
  seq: number;
  sensors: Gate3Sensor[];
};

/** Deterministic mock stream so plots are stable across refresh within the same second. */
export function mockPackets(n = 24, now = Date.now()): Gate3Packet[] {
  const count = Math.max(1, Math.min(120, n));
  const packets: Gate3Packet[] = [];
  const stepMs = 15_000;
  const t0 = Math.floor(now / 1000) * 1000;

  for (let i = count - 1; i >= 0; i -= 1) {
    const tsMs = t0 - i * stepMs;
    const phase = tsMs / 60_000;
    const seq = Math.floor(tsMs / stepMs);
    packets.push({
      v: 1,
      ts: new Date(tsMs).toISOString(),
      src: 'sim',
      seq,
      sensors: [
        { id: 'MET.T', v: round1(22 + 3.2 * Math.sin(phase / 8)), u: 'degC' },
        { id: 'MET.P', v: round1(1013 + 4.5 * Math.sin(phase / 11 + 0.4)), u: 'hPa' },
        { id: 'RING', v: 1, u: 'bool' },
      ],
    });
  }
  return packets;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function dteMinutes(sizeMb: number, kbps: number): number {
  if (kbps <= 0) return Infinity;
  const bytesPerSec = (kbps * 1000) / 8;
  return (sizeMb * 1_000_000) / bytesPerSec / 60;
}

export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes)) return '—';
  if (minutes < 1) return `${Math.max(1, Math.round(minutes * 60))} s`;
  if (minutes < 90) return `${Math.round(minutes)} min`;
  const h = minutes / 60;
  return `${h < 10 ? h.toFixed(1) : Math.round(h)} h`;
}
