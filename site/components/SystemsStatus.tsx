import { getTelemetry } from '@/lib/content';

const statusColor: Record<string, string> = {
  nominal: 'bg-emerald-400',
  dev: 'bg-sky-400',
  attention: 'bg-amber-400',
  critical: 'bg-red-500',
  offline: 'bg-gray-500',
};

export default function SystemsStatus({ compact = false }: { compact?: boolean }) {
  const telemetry = getTelemetry();

  if (compact) {
    return (
      <div className="font-mono text-xs text-gray-400 text-right">
        <p>
          STATUS: <span className="text-venus">{telemetry.overall_status}</span>
        </p>
        <p className="text-[10px] text-gray-600">PHASE: {telemetry.mission_phase}</p>
      </div>
    );
  }

  return (
    <section
      id="systems"
      className="border-y border-white/10 bg-black/40"
      aria-label="Mission systems status"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[2px] text-venus/80">
              NEPHELIS.SYS // TELEMETRY
            </div>
            <div className="text-sm text-white font-mono">
              {telemetry.overall_status}{' '}
              <span className="text-gray-500">· {telemetry.mission_phase}</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-gray-600">
            UPDATED {new Date(telemetry.updated_at).toISOString().slice(0, 10)}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {telemetry.systems.map((sys) => (
            <div
              key={sys.id}
              className="border border-white/10 bg-white/[0.02] px-3 py-3"
              title={sys.detail}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusColor[sys.status] || 'bg-gray-400'}`}
                />
                <span className="font-mono text-[10px] tracking-wider text-gray-500">
                  {sys.label}
                </span>
              </div>
              <div className="font-mono text-sm text-white">{sys.value}</div>
              <div className="text-[10px] text-gray-600 mt-1 line-clamp-2">{sys.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
