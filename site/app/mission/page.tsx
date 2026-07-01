import Link from "next/link";
import { getSpecs } from "@/lib/content";

export default function MissionPage() {
  const specs = getSpecs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-venus hover:underline">← Back to Nephelis</Link>
      
      <h1 className="text-6xl font-semibold tracking-tighter mt-8 mb-8">Project AETHER</h1>
      
      <div className="prose prose-invert text-[15px] leading-relaxed max-w-3xl">
        <p className="text-xl text-foreground/90">A super-pressure balloon probe to the habitable cloud layer of Venus.</p>

        <h2 className="mt-10">Why the Cloud Layer?</h2>
        <p>
          Between 50 and 60 kilometers above the surface of Venus lies a region with Earth-like temperatures (0–60°C) and pressure (~1 atm). 
          This is the only place in the inner solar system, besides Earth itself, where humans could potentially live without extreme life support.
        </p>

        <h2 className="mt-8">Mission Concept</h2>
        <p>
          AETHER will deploy a long-duration super-pressure balloon carrying a suite of instruments for atmospheric sampling, 
          imaging, and in-situ analysis. The probe will float for weeks or months, providing unprecedented data on this unique environment.
        </p>

        <h3>Probe Specs (data-driven from content/data/specs.json)</h3>
        <ul>
          <li>Type: {specs.probe.type}</li>
          <li>Altitude: {specs.probe.target_altitude_km[0]}–{specs.probe.target_altitude_km[1]} km</li>
          <li>Temperature: {specs.probe.temperature_range_c[0]}–{specs.probe.temperature_range_c[1]} °C</li>
          <li>Instruments: {specs.probe.instruments.join(", ")}</li>
        </ul>

        <p className="mt-6">
          This mission is the critical first step toward understanding Venus as a destination for exploration and eventual settlement in the clouds.
        </p>
      </div>

      <div className="mt-12 text-sm text-foreground/60 border-l-2 border-venus pl-4">
        This content is driven from <code>content/</code> and research notes. AI agents can update specs.json and regenerate pages.
      </div>
    </div>
  );
}
