import { getRisks } from '@/lib/content';

const likelihoodX: Record<string, number> = { low: 1, medium: 2, high: 3 };
const impactY: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };

export default function RiskChart() {
  const risks = getRisks().filter((r) => r.status === 'open' || r.status === 'mitigating');
  const w = 360;
  const h = 220;
  const pad = 36;
  const maxX = 3;
  const maxY = 4;

  function cx(l: string) {
    const v = likelihoodX[l] || 2;
    return pad + ((v - 0.5) / maxX) * (w - pad * 2);
  }
  function cy(i: string) {
    const v = impactY[i] || 2;
    // high impact at top
    return h - pad - ((v - 0.5) / maxY) * (h - pad * 2);
  }

  return (
    <div className="not-prose my-6 border border-white/10 bg-black/40 p-4">
      <div className="font-mono text-[10px] tracking-widest text-venus/80 mb-3">
        RISK MATRIX · OPEN / MITIGATING
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md h-auto" role="img" aria-label="Risk matrix">
        <rect x="0" y="0" width={w} height={h} fill="transparent" />
        {/* grid */}
        {[1, 2, 3].map((x) => (
          <line
            key={`vx${x}`}
            x1={pad + ((x - 0.5) / maxX) * (w - pad * 2)}
            y1={pad}
            x2={pad + ((x - 0.5) / maxX) * (w - pad * 2)}
            y2={h - pad}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        {[1, 2, 3, 4].map((y) => (
          <line
            key={`hy${y}`}
            x1={pad}
            y1={h - pad - ((y - 0.5) / maxY) * (h - pad * 2)}
            x2={w - pad}
            y2={h - pad - ((y - 0.5) / maxY) * (h - pad * 2)}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="rgba(255,255,255,0.2)" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="rgba(255,255,255,0.2)" />
        <text x={w / 2} y={h - 8} textAnchor="middle" fill="#888" fontSize="10" fontFamily="monospace">
          likelihood →
        </text>
        <text
          x={12}
          y={h / 2}
          textAnchor="middle"
          fill="#888"
          fontSize="10"
          fontFamily="monospace"
          transform={`rotate(-90 12 ${h / 2})`}
        >
          impact →
        </text>
        {risks.map((r) => (
          <g key={r.id}>
            <circle
              cx={cx(r.likelihood)}
              cy={cy(r.impact)}
              r={10}
              fill={r.impact === 'critical' ? 'rgba(255,69,0,0.35)' : 'rgba(255,69,0,0.15)'}
              stroke="#ff4500"
              strokeWidth="1"
            />
            <text
              x={cx(r.likelihood)}
              y={cy(r.impact) + 3}
              textAnchor="middle"
              fill="#fff"
              fontSize="7"
              fontFamily="monospace"
            >
              {r.id.replace('R-', '')}
            </text>
          </g>
        ))}
      </svg>
      <ul className="mt-3 space-y-1 text-[11px] text-gray-500 font-mono">
        {risks.map((r) => (
          <li key={r.id}>
            <span className="text-venus">{r.id}</span> {r.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
