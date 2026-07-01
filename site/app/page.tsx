import Link from "next/link";
import { ArrowRight } from "lucide-react";
import timeline from "../content/data/timeline.json";
import { getSpecs } from "@/lib/content";

export default function NephelisHome() {
  return (
    <div className="min-h-screen bg-void text-foreground">
      {/* Hero */}
      <section className="pt-24 pb-20 px-6 border-b border-void-border">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-venus/10 text-venus text-xs tracking-[3px] mb-6 font-mono">
            LAUNCH 2027
          </div>
          <h1 className="text-7xl md:text-8xl font-semibold tracking-[-4.5px] mb-6 leading-none">
            Project AETHER
          </h1>
          <p className="text-2xl text-foreground/70 max-w-2xl mx-auto mb-10 tracking-tight">
            A super-pressure balloon probe to Venus’s habitable cloud layer.<br />The first step to multi-planetary life.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#mission" className="inline-flex items-center gap-2 px-9 py-3.5 bg-venus text-black font-medium rounded-2xl hover:bg-venus-glow active:scale-[0.985] transition">
              Mission Details <ArrowRight size={20} />
            </a>
            <a href="#funding" className="inline-flex items-center gap-2 px-9 py-3.5 border border-venus/70 hover:bg-white/5 rounded-2xl transition">
              Sponsor the Mission
            </a>
          </div>
          <div className="mt-6 text-sm text-foreground/50">
            Nephelis Industries • <a href="https://82083.net" className="hover:text-venus underline">Personal site</a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="max-w-4xl mx-auto px-6 py-20 border-b border-void-border">
        <div className="uppercase tracking-[3px] text-xs text-foreground/60 mb-3">THE MISSION</div>
        <h2 className="text-5xl tracking-[-1.5px] font-semibold mb-6 leading-tight">
          First probe into the only Earth-like environment in the inner solar system.
        </h2>
        <div className="prose prose-lg prose-invert max-w-none text-foreground/90">
          <p>
            At 50–60 km altitude in Venus’s clouds, the environment is benign: ~0–60°C, ~1 atm pressure. 
            This is the most accessible and livable place in our solar system beyond Earth.
          </p>
          <p>
            AETHER will be the first dedicated mission to explore this layer with a long-duration super-pressure balloon, 
            paving the way for floating habitats and the future of humanity beyond Earth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            ["Altitude", "50–60 km"],
            ["Temperature", "0–60 °C"],
            ["Pressure", "~1 atm (Earth-like)"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-void-border p-6 bg-void-panel">
              <div className="text-sm text-foreground/60">{label}</div>
              <div className="text-4xl font-semibold tracking-tighter mt-2 text-venus">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Facts / Trajectory */}
      <section id="trajectory" className="max-w-4xl mx-auto px-6 py-20 border-b border-void-border">
        <div className="uppercase tracking-[3px] text-xs text-foreground/60 mb-3">ARCHITECTURE</div>
        <h3 className="text-3xl tracking-tight font-semibold mb-8">Mission Architecture</h3>
        
        <div className="space-y-8 text-lg">
          <div>
            <div className="font-mono text-venus text-sm tracking-widest mb-1">VEHICLE</div>
            <p>Super-pressure balloon probe with scientific payload for cloud layer sampling, imaging, and atmospheric analysis.</p>
          </div>
          <div>
            <div className="font-mono text-venus text-sm tracking-widest mb-1">LAUNCH</div>
            <p>Target: 2027 on rideshare or dedicated small launch vehicle. Direct transfer to Venus.</p>
          </div>
          <div>
            <div className="font-mono text-venus text-sm tracking-widest mb-1">OPERATIONS</div>
            <p>Long-duration float in the cloud layer. Data relay to Earth. Potential for sample return concepts in follow-on missions.</p>
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section id="thesis" className="max-w-4xl mx-auto px-6 py-20 border-b border-void-border">
        <div className="uppercase tracking-[3px] text-xs text-foreground/60 mb-3">WHY VENUS</div>
        <h3 className="text-3xl tracking-tight font-semibold mb-6">The most important place we’re not exploring.</h3>
        <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed">
          <p>Venus is the only other planet with an Earth-analog environment. The cloud layer is the single most promising location for life detection and eventual human presence in our solar system.</p>
          <p>Success here de-risks floating cities and creates the scientific foundation for humanity becoming multi-planetary.</p>
        </div>

        <div className="mt-10">
          <h4 className="text-2xl font-bold mb-4">The Twin Paradox</h4>
          <p className="text-gray-400">Venus isn't just a science target; it is the most logical industrial gateway to the inner solar system. Gravity is the key. Living on Mars (0.38g) causes significant bone density loss. Venus offers <span className="text-venus">0.904g</span>—nearly identical to Earth.</p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 font-mono text-xs uppercase tracking-wider">
                <th className="p-3 border-b border-white/10 text-left">Metric</th>
                <th className="p-3 border-b border-white/10 text-venus bg-venus/5">Venus (55km)</th>
                <th className="p-3 border-b border-white/10">Mars (Surface)</th>
                <th className="p-3 border-b border-white/10">Earth</th>
              </tr>
            </thead>
            <tbody className="font-mono text-gray-300 divide-y divide-white/10">
              <tr>
                <td className="p-3 font-bold">Pressure</td>
                <td className="p-3 text-venus bg-venus/5">~0.6 - 1.0 bar</td>
                <td className="p-3">0.006 bar</td>
                <td className="p-3">1.0 bar</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Temperature</td>
                <td className="p-3 text-venus bg-venus/5">27 - 50 °C</td>
                <td className="p-3">-63 °C</td>
                <td className="p-3">15 °C</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Gravity</td>
                <td className="p-3 text-venus bg-venus/5">0.91 g</td>
                <td className="p-3">0.38 g</td>
                <td className="p-3">1.0 g</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Radiation</td>
                <td className="p-3 text-venus bg-venus/5">Atmospheric Shielding</td>
                <td className="p-3">Unshielded</td>
                <td className="p-3">Shielded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-b border-void-border">
        <div className="uppercase tracking-[3px] text-xs text-foreground/60 mb-3">PILLARS</div>
        <h3 className="text-3xl tracking-tight font-semibold mb-8">How we build the future</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border border-white/10 bg-void-panel">
            <div className="text-venus font-bold mb-2">HABITATION</div>
            <p className="text-sm">At 50km, humans can live in breathable air habitats (21% O2, 79% N2) which act as lifting gas in the dense CO2 atmosphere. No pressurized suits required inside the habitat.</p>
          </div>
          <div className="p-6 border border-white/10 bg-void-panel">
            <div className="text-venus font-bold mb-2">INDUSTRY</div>
            <p className="text-sm">The thick atmosphere provides shielding from radiation and access to abundant resources. A perfect base for manufacturing and launching deeper into the solar system.</p>
          </div>
          <div className="p-6 border border-white/10 bg-void-panel">
            <div className="text-venus font-bold mb-2">SCIENCE</div>
            <p className="text-sm">Unprecedented access to the cloud layer for studying chemistry, potential biosignatures, and atmospheric dynamics unlike anywhere else.</p>
          </div>
        </div>
      </section>

      {/* Visuals teaser */}
      <section id="visuals" className="max-w-6xl mx-auto px-6 py-20 border-b border-void-border">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-foreground/60">GALLERY</div>
            <h3 className="text-3xl tracking-tight font-semibold">Concept art &amp; mission visualization</h3>
          </div>
          <Link href="/visuals" className="text-venus flex items-center gap-1 text-sm">See all visuals <ArrowRight size={16}/></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <img src="/assets/visuals/nephelis.png" alt="Nephelis logo" className="w-full rounded-xl border border-void-border object-cover aspect-video" />
          <img src="/assets/visuals/nephelis_probe_satellite_combo.png" alt="Probe concept" className="w-full rounded-xl border border-void-border object-cover aspect-video" />
          <img src="/assets/visuals/peopleofvenus.png" alt="Venus habitat concept" className="w-full rounded-xl border border-void-border object-cover aspect-video" />
        </div>
        <p className="mt-4 text-sm text-foreground/60">All assets live in <code>assets/visuals/</code> and are version-controlled.</p>
      </section>

      {/* Data-driven Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="uppercase tracking-[3px] text-xs text-foreground/60 mb-3">ROADMAP</div>
        <h3 className="text-3xl tracking-tight font-semibold mb-8">Current Milestones</h3>
        <div className="space-y-6">
          {timeline.map((item: any, i: number) => (
            <div key={i} className="flex gap-6 border-l-2 border-venus/40 pl-6">
              <div className="font-mono text-sm w-[72px] text-venus shrink-0 pt-1">{item.year}</div>
              <div className="text-lg">{item.event} <span className="text-xs text-foreground/50">({item.status})</span></div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4 text-foreground/50">This data lives in <code>content/data/timeline.json</code>. AI agents update it automatically.</p>
      </section>

      {/* Funding */}
      <section id="funding" className="bg-void-panel border-t border-void-border py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="uppercase tracking-[3px] text-xs text-foreground/60 mb-2">JOIN US</div>
          <h3 className="text-4xl tracking-tight font-semibold mb-4">Support the first dedicated Venus cloud probe.</h3>
          <p className="mb-8 text-foreground/80">We are actively seeking strategic partners, sponsors, and collaborators.</p>
          <a href="mailto:ehren@nephelisindustries.com" className="inline-block px-10 py-3.5 rounded-2xl bg-venus text-black font-medium hover:bg-venus-glow">Contact the team</a>
          <div className="mt-3 text-xs text-foreground/50">ehren@nephelisindustries.com</div>
        </div>
      </section>
    </div>
  );
}
