import Link from 'next/link';
import { getProgress } from '@/lib/content';

const statusStyle: Record<string, string> = {
  blocked: 'text-amber-400 border-amber-400/40',
  planned: 'text-gray-400 border-white/20',
  in_progress: 'text-venus border-venus/40',
  done: 'text-emerald-400 border-emerald-400/40',
};

export default function GroundGates() {
  const progress = getProgress();
  const gates = progress.ground_gates ?? [];

  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2">
        First hardware — gates 0–3
      </h2>
      <p className="text-xs text-white/45 leading-relaxed mb-4 max-w-2xl">
        Spend is order-of-magnitude. {progress.budget_posture.flight_estimate_note} Next
        human step: a US ship-to / ground operator so Gate 0 can send.
      </p>
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-sm text-left">
          <thead className="font-mono text-[10px] uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="p-3 w-10">#</th>
              <th className="p-3">Gate</th>
              <th className="p-3 hidden sm:table-cell">Window</th>
              <th className="p-3">Exit KPI</th>
              <th className="p-3 whitespace-nowrap">Spend</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {gates.map((g) => (
              <tr key={g.id} className="border-b border-white/5">
                <td className="p-3 font-mono text-venus">{g.id}</td>
                <td className="p-3 text-white">{g.name}</td>
                <td className="p-3 font-mono text-[11px] text-gray-500 hidden sm:table-cell">
                  {g.window}
                </td>
                <td className="p-3 text-gray-400 text-xs leading-relaxed">{g.kpi}</td>
                <td className="p-3 font-mono text-[11px] text-venus/80 whitespace-nowrap">
                  {g.spend}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${statusStyle[g.status] || statusStyle.planned}`}
                  >
                    {g.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-600">
        Full sequence 0–8:{' '}
        <a
          href="https://github.com/ehreng/Nephelis/blob/main/docs/program-gates.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-venus hover:underline"
        >
          docs/program-gates.md
        </a>{' '}
        · public path{' '}
        <Link href="/roadmap" className="text-venus hover:underline">
          /roadmap
        </Link>
        .
      </p>
    </section>
  );
}
