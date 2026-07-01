import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MissionPlanner from "@/components/MissionPlanner";
import FundingTiers from "@/components/FundingTiers";
import { getTimeline, getHeritage } from "@/lib/content";

export default function NephelisHome() {
  const timeline = getTimeline();
  const heritage = getHeritage();

  return (
    <div className="min-h-screen bg-void text-foreground">
      {/* HERO - exact match to live site structure */}
      <section className="relative min-h-screen flex items-center justify-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] opacity-60 mix-blend-screen pointer-events-none">
            <img src="/assets/visuals/Venus Visions.png" alt="Venus" className="w-full h-full object-cover rounded-full shadow-[0_0_100px_rgba(255,69,0,0.3)]" />
          </div>
          <div className="absolute top-[20%] right-[-10%] md:right-[5%] w-[60vw] md:w-[35vw] opacity-90 animate-float pointer-events-none z-10">
            <img src="/assets/visuals/probe.jpg" alt="Cloudseeker Probe Render" className="w-full h-auto object-contain drop-shadow-2xl brightness-110" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-left w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 border border-venus/30 bg-venus/10 rounded-full px-4 py-1 mb-8 animate-pulse-slow backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-venus"></span>
              <span className="text-venus font-mono text-xs uppercase tracking-widest">Launch Window: Q4 2027</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase leading-none drop-shadow-2xl">
              Earth's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-venus via-orange-500 to-yellow-500 text-glow">Twin Sister</span>
            </h1>

            <p className="mt-4 max-w-xl text-xl text-gray-200 font-mono leading-relaxed drop-shadow-md">
              Project AETHER is humanity's return to the clouds. <br />
              A long-duration aerostat probe targeting the <span className="text-white font-bold">55km habitable zone</span> of Venus.
            </p>

            <div className="mt-10 flex gap-4">
              <a href="#mission" className="px-8 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider hover:bg-gray-200 transition-colors">
                Mission Brief
              </a>
              <a href="#funding" className="px-8 py-4 border border-white/20 text-white font-bold font-mono uppercase tracking-wider hover:border-venus hover:text-venus transition-all">
                Join Flight Crew
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden md:block font-mono text-xs text-gray-400 text-right z-20">
          <p>T-MINUS: 00:00:00:00</p>
          <p>TARGET: 0.72 AU</p>
          <p>STATUS: SYSTEMS NOMINAL</p>
        </div>
      </section>

      {/* 01 // THE OBJECTIVE */}
      <section id="mission" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">01 // The Objective</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Cloudseeker: A Floating Laboratory</h3>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                While Mars captures the imagination, Venus captures the data. At 50km altitude, Venus boasts Earth-like atmospheric pressure (1 bar) and temperatures (0-50°C). It is the most habitable environment in the solar system outside Earth.
              </p>
              <p>
                <strong className="text-white">Project AETHER</strong> deploys a super-pressure fluoropolymer balloon designed to ride the super-rotating winds of Venus, circling the planet every 4 days while streaming high-bandwidth telemetry via a 3U CubeSat relay.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 border border-white/10 bg-white/5">
                  <div className="text-2xl font-mono text-venus font-bold">30-90d</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Operational Life</div>
                </div>
                <div className="p-4 border border-white/10 bg-white/5">
                  <div className="text-2xl font-mono text-venus font-bold">52km</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Target Altitude</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-sm hud-border relative">
            <div className="absolute top-4 right-4 text-xs font-mono text-venus animate-pulse">LIVE TELEMETRY SIM</div>
            <div className="aspect-video relative flex items-center justify-center bg-black/80 rounded overflow-hidden">
              <img src="/assets/visuals/probe.jpg" alt="AETHER Probe" className="max-h-full object-contain" />
              <div className="absolute bottom-2 left-2 text-xs font-mono text-tech bg-black/50 px-2">AETHER PROBE @ 55km</div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 // MISSION CONTROL - full interactive with new React component */}
      <section id="trajectory" className="py-24 bg-void border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">02 // Mission Control</h2>
            <h3 className="text-4xl font-bold text-white">Astrodynamics &amp; Trajectory</h3>
            <p className="text-gray-400 mt-2 font-mono text-sm">Interactive Mission Planner. Assumptions: Isp=320s, Hohmann Transfer.</p>
          </div>

          <MissionPlanner />
        </div>
      </section>

      {/* 03 // THE THESIS - full Twin Paradox + exact table + I/II/III pillars */}
      <section id="thesis" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">03 // The Thesis</h2>
            <h3 className="text-4xl font-bold text-white">Why We Choose The Clouds</h3>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Venus isn't just a science target; it is the most logical industrial gateway to the inner solar system. We are building the infrastructure for a multi-planetary economy.
            </p>
          </div>

          {/* Twin Paradox stats + table */}
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
            <div>
              <h4 className="text-3xl font-bold text-white mb-6">The Twin Paradox</h4>
              <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
                <p>
                  When we say "Twin Sister," we aren't being poetic. We are talking about the critical physical constants required for human physiology and long-term habitation.
                </p>
                <p>
                  <strong className="text-white">Gravity is the key.</strong> Living on Mars (0.38g) causes significant bone density loss and visual impairment. Venus offers <strong className="text-venus">0.904g</strong>—nearly identical to Earth. It is the only place in the solar system where your body works the way it evolved to.
                </p>
                <p>
                  <strong className="text-white">Atmospheric Shielding.</strong> The thick atmosphere (even at altitude) protects inhabitants from cosmic radiation that sterilizes the surface of Mars. In the clouds of Venus, you are shielded.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="glass-panel p-5 text-center border-t-2 border-venus">
                  <div className="stat-label mb-1">Gravity</div>
                  <div className="text-3xl font-bold text-white">0.91 <span className="text-sm text-gray-600">g</span></div>
                  <div className="text-xs text-venus mt-1">~90% Earth</div>
                </div>
                <div className="glass-panel p-5 text-center border-t-2 border-venus">
                  <div className="stat-label mb-1">Radius</div>
                  <div className="text-3xl font-bold text-white">6,052 <span className="text-sm text-gray-600">km</span></div>
                  <div className="text-xs text-venus mt-1">95% Earth</div>
                </div>
                <div className="glass-panel p-5 text-center border-t-2 border-venus">
                  <div className="stat-label mb-1">Solar Year</div>
                  <div className="text-3xl font-bold text-white">225 <span className="text-sm text-gray-600">days</span></div>
                  <div className="text-xs text-venus mt-1">Closest Planet</div>
                </div>
                <div className="glass-panel p-5 text-center border-t-2 border-venus">
                  <div className="stat-label mb-1">Travel Time</div>
                  <div className="text-3xl font-bold text-white">140 <span className="text-sm text-gray-600">days</span></div>
                  <div className="text-xs text-venus mt-1">vs 210+ for Mars</div>
                </div>
              </div>
            </div>

            {/* Comparison table matching live site exactly */}
            <div className="overflow-x-auto rounded border border-white/10 glass-panel">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-gray-400 font-mono text-xs uppercase tracking-wider">
                    <th className="p-4 border-b border-white/10">Metric</th>
                    <th className="p-4 border-b border-white/10 text-venus bg-venus/5">Venus (55km)</th>
                    <th className="p-4 border-b border-white/10">Mars (Surface)</th>
                    <th className="p-4 border-b border-white/10">Earth (Surface)</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm text-gray-300 divide-y divide-white/10">
                  <tr>
                    <td className="p-4 font-bold text-white">Pressure</td>
                    <td className="p-4 text-venus bg-venus/5 font-bold">~0.6 - 1.0 bar</td>
                    <td className="p-4">0.006 bar</td>
                    <td className="p-4">1.0 bar</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Temperature</td>
                    <td className="p-4 text-venus bg-venus/5 font-bold">27 - 50 °C</td>
                    <td className="p-4">-63 °C (Avg)</td>
                    <td className="p-4">15 °C</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Solar Flux</td>
                    <td className="p-4 text-venus bg-venus/5 font-bold">2600 W/m²</td>
                    <td className="p-4">590 W/m²</td>
                    <td className="p-4">1360 W/m²</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Radiation</td>
                    <td className="p-4 text-venus bg-venus/5 font-bold">Atmospheric Shielding</td>
                    <td className="p-4">Unshielded</td>
                    <td className="p-4">Shielded</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Pillars I / II / III - exact copy from live */}
          <div>
            <div className="uppercase tracking-widest text-xs text-foreground/60 mb-4">PILLARS</div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-white/10 bg-black/40 hover:border-venus/50 transition-colors">
                <div className="h-9 w-9 bg-venus/10 text-venus flex items-center justify-center rounded-sm mb-4 font-bold">I</div>
                <h4 className="text-white font-bold text-lg mb-2">Habitation</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  At 50km, humans can live in breathable air habitats (21% O2, 79% N2) which act as lifting gas in the dense CO2 atmosphere. No pressurized suits required inside the habitat.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 hover:border-venus/50 transition-colors">
                <div className="h-9 w-9 bg-venus/10 text-venus flex items-center justify-center rounded-sm mb-4 font-bold">II</div>
                <h4 className="text-white font-bold text-lg mb-2">Resources (ISRU)</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The atmosphere is a chemical factory. We can extract Oxygen and Carbon from CO2, Sulfuric Acid for industrial processes, and Nitrogen for agriculture.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 hover:border-venus/50 transition-colors">
                <div className="h-9 w-9 bg-venus/10 text-venus flex items-center justify-center rounded-sm mb-4 font-bold">III</div>
                <h4 className="text-white font-bold text-lg mb-2">Astrobiology</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The cloud layer may host microbial life. Phosphine detection remains controversial but compelling. Cloudseeker carries sensors tuned to detect biological precursors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 // MISSION ARCHIVE - full data-driven heritage table */}
      <section id="heritage" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">04 // Mission Archive</h2>
              <h3 className="text-4xl font-bold text-white">Standing on Giants</h3>
              <p className="mt-2 text-gray-400">Comprehensive log of humanity's attempts to reach Venus.</p>
            </div>
          </div>

          <div className="glass-panel border border-white/10 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 grid grid-cols-12 text-xs font-mono text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Year</div>
              <div className="col-span-6">Mission / Agency</div>
              <div className="col-span-4 text-right">Type</div>
            </div>

            <div className="max-h-[420px] overflow-y-auto divide-y divide-white/5 text-sm custom-scrollbar">
              {heritage.map((h, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 px-6 py-3.5 items-center heritage-row ${h.highlight ? 'highlight' : ''}`}
                >
                  <div className={`col-span-2 font-mono ${h.highlight ? 'text-venus' : 'text-gray-500'}`}>{h.year}</div>
                  <div className={`col-span-6 ${h.highlight ? 'font-bold text-white' : 'text-gray-400'}`}>
                    {h.link ? (
                      <a href={h.link} target="_blank" rel="noopener noreferrer" className="hover:text-venus underline decoration-1 underline-offset-2">
                        {h.mission}
                      </a>
                    ) : (
                      h.mission
                    )}
                    {h.note && <span className="text-xs text-red-500 ml-2">{h.note}</span>}
                  </div>
                  <div className={`col-span-4 text-right font-mono text-xs ${h.highlight ? 'text-venus' : 'text-gray-500'}`}>
                    {h.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-foreground/50 mt-3 font-mono">Data: content/data/heritage.json — extendable by agents.</p>
        </div>
      </section>

      {/* 05 // VISUALIZATION - with real videos + schematics */}
      <section id="gallery" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-3">05 // Visualization</h2>
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="text-3xl font-bold text-white">Mission imagery &amp; simulations</h3>
            <Link href="/visuals" className="text-sm text-venus flex items-center gap-1">Full gallery <ArrowRight size={14} /></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Radar / main */}
            <div className="md:col-span-2 relative overflow-hidden border border-white/10 bg-black rounded-sm aspect-video group">
              <img src="/assets/visuals/Venus Atmosphere Profile (80 km to Surface) Temperature, Pressure, and Cloud Layer Highlight.png" alt="Venus atmosphere profile" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90">
                <div className="text-white font-bold">Global Radar Map + Atmosphere Profile</div>
                <div className="text-xs font-mono text-gray-400">Magellan + atmospheric data synthesis</div>
              </div>
            </div>

            {/* Side visuals */}
            <div className="space-y-4">
              <div className="relative overflow-hidden border border-white/10 bg-black rounded-sm aspect-[16/9] group">
                <img src="/assets/visuals/nephelis_probe_satellite_combo.png" alt="Schematic" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-xs font-mono text-white/80">Schematic: Cloudseeker</div>
                </div>
              </div>
              <div className="relative overflow-hidden border border-white/10 bg-black rounded-sm aspect-[16/9] group">
                <img src="/assets/visuals/probe3.png" alt="Probe close" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-xs font-mono text-white/80">Entry vector concept</div>
                </div>
              </div>
            </div>
          </div>

          {/* Videos from assets */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="glass-panel border border-white/10 overflow-hidden">
              <video
                className="w-full aspect-video object-cover bg-black"
                controls
                muted
                loop
                playsInline
                autoPlay
              >
                <source src="/assets/visuals/probe.mp4" type="video/mp4" />
                <source src="/assets/visuals/Venus_Exploration_CGI_Video.mp4" type="video/mp4" />
              </video>
              <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/60">
                <div>
                  <div className="font-mono text-sm text-white">Mission Preview</div>
                  <div className="text-xs text-gray-500">Rendered Simulation of Venus Capture Phase</div>
                </div>
                <div className="text-xs font-mono text-venus">NEPHELIS.SYS.V2</div>
              </div>
            </div>

            <div className="glass-panel border border-white/10 overflow-hidden">
              <video
                className="w-full aspect-video object-cover bg-black"
                controls
                muted
                loop
                playsInline
              >
                <source src="/assets/visuals/Venus_Move_and_Video_Creation.mp4" type="video/mp4" />
              </video>
              <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/60">
                <div>
                  <div className="font-mono text-sm">Atmospheric Flight Visualization</div>
                  <div className="text-xs text-gray-500">Super-rotating winds • 4-day cycle</div>
                </div>
                <div className="text-[10px] text-venus font-mono">● LIVE FEED // SIM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data-driven Roadmap (kept from new functionality) */}
      <section className="max-w-5xl mx-auto px-4 py-20 border-b border-white/10">
        <div className="mb-8">
          <div className="uppercase tracking-[2px] text-xs text-foreground/60">ROADMAP</div>
          <h3 className="text-3xl font-semibold tracking-tight">Current Milestones</h3>
        </div>
        <div className="space-y-4 pl-1">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 border-l-2 border-venus/40 pl-6 text-[15px]">
              <div className="font-mono w-16 text-venus shrink-0">{item.year}</div>
              <div>{item.event} <span className="text-xs text-foreground/50">({item.status})</span></div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-foreground/50 mt-4 font-mono">Live data from content/data/timeline.json — automatically updatable by agents.</p>
      </section>

      {/* FUNDING - Etch Your Name + tiers + initiate sequence form (full port) */}
      <section id="funding" className="py-20 relative">
        <div className="absolute inset-0 bg-venus/5 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-black tracking-[-1px] text-white mb-4 uppercase">Etch Your Name on History</h2>
            <p className="max-w-xl mx-auto text-xl text-gray-400">
              We are crowd-sourcing a portion of the payload. Your name, your DNA, or your company logo can be part of the first private mission to Venus.
            </p>
          </div>

          <FundingTiers />

          <div className="text-center mt-10 text-xs text-foreground/50 font-mono">
            Or email <a href="mailto:ehren@nephelisindustries.com" className="text-venus hover:underline">ehren@nephelisindustries.com</a> directly for partnership.
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 text-xs text-center text-foreground/50 font-mono">
        © {new Date().getFullYear()} Nephelis Industries • Project AETHER • 55 km above Venus • EST 2025
      </footer>
    </div>
  );
}
