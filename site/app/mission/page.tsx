import Link from "next/link";
import { getSpecs } from "@/lib/content";

export default function MissionPage() {
  const specs = getSpecs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/" className="text-xs uppercase tracking-widest font-mono text-venus hover:underline">← BACK TO NEPHELIS</Link>

      <h1 className="text-6xl font-semibold tracking-tighter mt-8 mb-3">Project AETHER</h1>
      <p className="text-xl text-foreground/90 max-w-prose">A super-pressure balloon probe to the habitable cloud layer of Venus.</p>

      <div className="prose prose-invert mt-10 text-[15px] leading-relaxed">
        <h2>Why the Cloud Layer?</h2>
        <p>
          Between 50 and 60 kilometers above the surface of Venus lies a region with Earth-like temperatures (0–60°C) and pressure (~1 atm). 
          This is the only place in the inner solar system, besides Earth itself, where humans could potentially live without extreme life support.
        </p>

        <h2>Mission Concept</h2>
        <p>
          AETHER will deploy a long-duration super-pressure balloon carrying a suite of instruments for atmospheric sampling, 
          imaging, and in-situ analysis. The probe will float for weeks or months, providing unprecedented data on this unique environment.
        </p>

        <h3>Probe Specs (from content/data/specs.json)</h3>
        <ul>
          <li>Type: {specs.probe.type}</li>
          <li>Altitude: {specs.probe.target_altitude_km[0]}–{specs.probe.target_altitude_km[1]} km</li>
          <li>Temperature: {specs.probe.temperature_range_c[0]}–{specs.probe.temperature_range_c[1]} °C</li>
          <li>Instruments: {specs.probe.instruments.join(", ")}</li>
        </ul>

        <p className="mt-8">This mission is the critical first step toward understanding Venus as a destination for exploration and eventual settlement in the clouds.</p>
      </div>

      <div className="mt-10 text-xs text-foreground/60 font-mono border-l-2 border-venus pl-3">
        Data-driven. Agents can update specs.json.
      </div>
    </div>
  );
}
