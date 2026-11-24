import type { Metadata } from 'next';
import Link from 'next/link';
import RiskChart from '@/components/RiskChart';
import { getMassBudget, getMissionControl, getRisks, getSpecs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Mission',
  description:
    'Project AETHER mission concept, mass budget, and control checklist for the Venus cloud-layer aerostat.',
};

export default function MissionPage() {
  const specs = getSpecs();
  const mass = getMassBudget();
  const mc = getMissionControl();
  const risks = getRisks().filter((r) => r.status === 'open' || r.status === 'mitigating').slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs uppercase tracking-widest font-mono text-venus hover:underline">
        ← BACK TO NEPHELIS
      </Link>

      <h1 className="text-6xl font-semibold tracking-tighter mt-8 mb-3">Project AETHER</h1>
      <p className="text-xl text-foreground/90 max-w-prose">
        A super-pressure balloon probe concept for the 50–55 km cloud layer of Venus. Pre-hardware.
      </p>
      <p className="mt-2 font-mono text-xs text-venus/80">
        {mc.callsign} · PHASE {mc.phase} · {mc.launch_target}
      </p>

      <div className="prose prose-invert mt-10 text-[15px] leading-relaxed max-w-none">
        <h2>Why the Cloud Layer?</h2>
        <p>
          Between 50 and 60 km above the surface of Venus lies a region with Earth-like temperatures
          (0–60°C) and pressure (~1 atm). Cloudseeker targets the 50–55 km float band. The unique
          engineering gap is time in that slab — 30–90 days versus VLF ~5 min, DAVINCI ~1 h, VEGA
          ~46 h. Long-horizon habitation ideas stay labeled vision.
        </p>

        <h2>Mission Concept</h2>
        <p>
          AETHER is a concept for a long-duration super-pressure balloon with a flush sensor bay
          (imaging, meteorology, in-situ chemistry) and a separate 3U CubeSat relay. The program is
          pre-hardware: documentation, mass/power/comms books, and ground gates. Target float is
          ≥{specs.probe.expected_duration_days} days (goal{' '}
          {specs.probe.duration_goal_days ?? 90} days) at 50–55 km. Flight architecture waits until
          those gates pass.
        </p>

        <h3>Probe specs</h3>
        <ul>
          <li>Type: {specs.probe.type}</li>
          <li>
            Target altitude: {specs.probe.target_altitude_km[0]}–{specs.probe.target_altitude_km[1]} km
          </li>
          <li>
            Temperature: {specs.probe.temperature_range_c[0]}–{specs.probe.temperature_range_c[1]} °C
          </li>
          <li>
            Float: ≥{specs.probe.expected_duration_days} d requirement ·{' '}
            {specs.probe.duration_goal_days ?? 90} d goal
          </li>
          <li>Instruments: {specs.probe.instruments.join(', ')}</li>
          <li>Wet mass class: ~{mass.wet_mass_kg} kg · balloon ~{mass.balloon_diameter_m} m</li>
        </ul>

        <h3>Mass budget (summary)</h3>
        <div className="not-prose overflow-x-auto border border-white/10 my-4">
          <table className="w-full text-sm text-left">
            <thead className="font-mono text-[10px] uppercase text-gray-500 border-b border-white/10">
              <tr>
                <th className="p-3">Element</th>
                <th className="p-3">Mass (kg)</th>
              </tr>
            </thead>
            <tbody>
              {mass.elements.map((el) => (
                <tr key={el.id} className="border-b border-white/5">
                  <td className="p-3 text-gray-300">{el.name}</td>
                  <td className="p-3 font-mono text-venus">
                    {el.mass_kg_min}–{el.mass_kg_max}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">{mass.contingency}</p>

        <h3>Mission control checklist</h3>
        <ul className="not-prose space-y-2 my-4">
          {mc.checklist.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap gap-2 items-baseline border border-white/10 px-3 py-2 text-sm"
            >
              <span className="font-mono text-[10px] text-gray-500 uppercase w-24">{c.status}</span>
              <span className="flex-1 text-gray-300">{c.item}</span>
              {c.due && <span className="font-mono text-[10px] text-venus/70">{c.due}</span>}
            </li>
          ))}
        </ul>

        <h3>Top open risks</h3>
        <RiskChart />
        <ul>
          {risks.map((r) => (
            <li key={r.id}>
              <strong className="text-venus font-mono text-sm">{r.id}</strong> {r.title}{' '}
              <span className="text-gray-500 text-sm">
                ({r.impact}/{r.likelihood}) — {r.mitigation}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          Full register in data · public roadmap at <Link href="/roadmap">/roadmap</Link>.
        </p>
      </div>

      <div className="mt-10 text-sm border border-white/10 p-4 bg-white/[0.02]">
        <div className="font-mono text-[10px] tracking-widest text-venus/80 mb-2">DESIGN PACKAGE (REPO)</div>
        <ul className="text-gray-400 text-xs space-y-1 font-mono">
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/program-gates.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Program gates 0–8
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/conops-v0.9.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              CONOPS v0.9
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/requirements-baseline-v0.9.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Requirements baseline
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/power-budget-v1.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Power budget v1
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/sensor-suite-baseline.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sensor suite baseline v0
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/comms-link-v0.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comms / CubeSat relay v0
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/gate3-telemetry-schema.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gate 3 telemetry schema
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/materials-coupon-test-protocol.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Materials coupon protocol
            </a>
          </li>
          <li>
            <a
              className="text-venus hover:underline"
              href="https://github.com/ehreng/Nephelis/blob/main/docs/funding-fulfillment-sop.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Funding fulfillment SOP
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-6 text-xs text-foreground/60 font-mono border-l-2 border-venus pl-3">
        Data-driven from mass-budget.json, mission-control.json, risks.json, specs.json, power-budget.json.
      </div>
    </div>
  );
}
