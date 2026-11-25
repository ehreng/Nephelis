import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MissionPlanner from "@/components/MissionPlanner";
import FundingTiers from "@/components/FundingTiers";
import SignupForm from "@/components/SignupForm";
import SystemsStatus from "@/components/SystemsStatus";
import VolunteerForm from "@/components/VolunteerForm";
import { getTimeline, getHeritage, getMassBudget } from "@/lib/content";
import BayCarries from "@/components/BayCarries";
import RelayComms from "@/components/RelayComms";

export default function NephelisHome() {
  const timeline = getTimeline();
  const heritage = getHeritage();
  const mass = getMassBudget();
  const byId = Object.fromEntries(mass.elements.map((e) => [e.id, e]));
  const kg = (id: string) => {
    const el = byId[id];
    return el ? `${el.mass_kg_min}–${el.mass_kg_max} kg` : '—';
  };
  const floatingMin =
    (byId.balloon?.mass_kg_min ?? 0) +
    (byId.gondola?.mass_kg_min ?? 0) +
    (byId.avionics?.mass_kg_min ?? 0);
  const floatingMax =
    (byId.balloon?.mass_kg_max ?? 0) +
    (byId.gondola?.mass_kg_max ?? 0) +
    (byId.avionics?.mass_kg_max ?? 0);

  return (
    <div className="min-h-screen bg-void text-foreground">
      {/* HERO - exact match to live site structure */}
      <section className="relative min-h-screen flex items-center justify-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] opacity-60 mix-blend-screen pointer-events-none">
            <img src="/assets/visuals/venus-orb.jpg" alt="Venus cloud globe" className="w-full h-full object-cover rounded-full shadow-[0_0_100px_rgba(255,69,0,0.3)]" />
          </div>
          <div className="absolute top-[20%] right-[-10%] md:right-[5%] w-[60vw] md:w-[35vw] opacity-90 animate-float pointer-events-none z-10">
            <video 
              src="/assets/visuals/flyingprobe.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto object-contain drop-shadow-2xl brightness-110" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-left w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 border border-venus/30 bg-venus/10 rounded-full px-4 py-1 mb-8 animate-pulse-slow backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-venus"></span>
              <span className="text-venus font-mono text-xs uppercase tracking-widest">
                Target: Venus cloud layer · 50–55 km
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase leading-none drop-shadow-2xl">
              Earth's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-venus via-orange-500 to-yellow-500 text-glow">Twin Sister</span>
            </h1>

            <p className="mt-4 max-w-xl text-xl text-gray-200 font-mono leading-relaxed drop-shadow-md">
              Project AETHER is humanity&apos;s return to the clouds — a long-duration aerostat probe
              for the <span className="text-white font-bold">habitable zone of Venus</span>, where
              Earth-like pressure and temperate skies open a second world to science.
            </p>

            <div className="mt-4 max-w-xl text-sm uppercase tracking-widest text-venus/90 font-mono leading-relaxed">
              Nephelis Industries — builders betting on the clouds. Join the open mission.
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#mission" className="px-8 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider hover:bg-gray-200 transition-colors">
                Mission Brief
              </a>
              <a href="#contribute" className="px-8 py-4 border border-white/20 text-white font-bold font-mono uppercase tracking-wider hover:border-venus hover:text-venus transition-all">
                Join the Crew
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden md:block font-mono text-xs text-gray-400 text-right z-20">
          <p>TARGET: 0.72 AU</p>
          <p>BAND: 50–55 km</p>
          <SystemsStatus compact />
        </div>
      </section>

      <SystemsStatus />

      {/* 01 // THE OBJECTIVE */}
      <section id="mission" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">01 // The Objective</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Cloudseeker: A Floating Laboratory</h3>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                At roughly 50–55 km altitude, Venus has near–1 bar pressure and temperate temperatures —
                a scientifically interesting cloud environment. That fact is well established (VEGA
                balloons in 1985; ongoing NASA/ESA aerobot studies). The hard part is engineering a
                long-duration private mission that survives entry, acid, and float ops.
              </p>
              <p>
                <strong className="text-white">Project AETHER (Cloudseeker)</strong> is a concept for a
                super-pressure fluoropolymer aerostat and optional CubeSat relay. Today the program is
                in <strong className="text-white">pre-hardware</strong>: public documentation, mass and
                risk models, and AETHER OS for open contribution.
              </p>
              <p>
                <strong className="text-white">Near-term (Gates 0–3):</strong> order balloon film,
                run acid tests on it, fly a 1.2 m helium balloon, then a sensor bay that sends a
                data packet.
                That is the first hardware of a $500k flight stack — then avionics, a 3U relay,
                entry, rideshare.{' '}
                <a href="/roadmap" className="text-venus hover:underline">
                  Sequence on /roadmap
                </a>
                .
              </p>
              <p>
                <strong className="text-white">Vision:</strong> a 30–90 day probe is the first private
                station in the only Earth-like band in the inner solar system. Cloud cities come
                later. Cloudseeker is how we get there.
              </p>
              <p>
                <strong className="text-white">$500k all-in.</strong> From first film tests through a
                rideshare-class Venus float. Flagships cost hundreds of millions. Launch prices are
                collapsing; we design a 400 kg COTS-heavy stack to fit inside half a million.
                Rideshare “$80/kg” is the launch term of that bet.
              </p>
              <p>
                Contributors welcome (L1–L3) via{' '}
                <a
                  href="https://github.com/ehreng/Nephelis"
                  className="text-venus hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>{' '}
                and the volunteer form. Founder review is asynchronous during U.S. Army training.
                Open an issue or use the form and keep working.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 border border-white/10 bg-white/5">
                  <div className="text-2xl font-mono text-venus font-bold">PRE-HW</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Program phase</div>
                </div>
                <div className="p-4 border border-white/10 bg-white/5">
                  <div className="text-2xl font-mono text-venus font-bold">50–55km</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Target band (science)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-0 rounded-sm hud-border relative overflow-hidden">
            <div className="relative aspect-[2/3] bg-black">
              <img
                src="/assets/visuals/n4-cool-portrait.jpg"
                alt="Cloudseeker aerostat in the 50–55 km cloud deck — concept art"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
                Probe @ 55 km
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  Concept art
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  n4-cool-portrait
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BayCarries />

      <RelayComms />

      {/* 02 // MISSION CONTROL - full interactive with new React component */}
      <section id="trajectory" className="py-24 bg-void border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">02 // Mission Control</h2>
            <h3 className="text-4xl font-bold text-white">Astrodynamics &amp; Trajectory</h3>
            <p className="text-gray-400 mt-2 font-mono text-sm">
              Interactive trajectory sandbox. Default epoch is a study date — adjust freely. Wet
              mass ~400 kg class; dry mass tunable in the tool.
            </p>
          </div>

          <MissionPlanner />

          <div className="mt-16 max-w-6xl">
            <div className="mb-8">
              <div className="font-mono text-venus text-xs uppercase tracking-[2px] mb-1">
                LAUNCH VEHICLE &amp; ARCHITECTURE (STUDY ONLY)
              </div>
              <h3 className="text-3xl font-bold text-white">Optimistic mass / cost sketch</h3>
              <p className="mt-2 text-gray-400 max-w-prose">
                Concept wet mass ~<span className="text-white font-medium">400 kg</span> for
                rideshare-class vehicles. Figures like{' '}
                <span className="font-mono text-venus">$80/kg → ~$32k</span> are the launch line of
                the $500k stack. Entry and float hardware dominate the rest of the budget.
              </p>
            </div>

            {/* Mass Budget */}
            <div className="glass-panel p-6 mb-8 border-l-2 border-l-venus">
              <div className="font-mono text-xs uppercase tracking-widest text-venus mb-4">High-Level Mass Split</div>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
                <div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-gray-400">Kick / Transfer Stage (wet)</span>
                    <span className="font-mono text-white">{kg('kick_stage')}</span>
                  </div>
                  <div className="pl-3 text-xs text-gray-500">Dry ~80–100 kg + propellant ~250–280 kg (Isp ~290 s storable hypergolic). Mass ratio ~2.4 for 2.5 km/s Δv.</div>
                </div>

                <div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-gray-400">Entry Probe + Stowed Balloon + Gondola/Sensors (dry)</span>
                    <span className="font-mono text-white">{kg('entry_probe')}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pl-1 md:col-span-2 -mt-1 mb-2">
                  • Heatshield / flat dinner-plate base (ablative, blunt body): {kg('heatshield')}<br />
                  • Stowed fluoropolymer super-pressure balloon + inflation: {kg('balloon')}<br />
                  • Gondola + sensor suite (flush bay; science ~8 kg): {kg('gondola')}<br />
                  • Avionics, power, structure, comms: {kg('avionics')}<br />
                  • 3U CubeSat relay (separate orbiter): {kg('cubesat_relay')}
                </div>

                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-gray-400">Margin / Contingency</span>
                  <span className="font-mono text-white">Positive headroom</span>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-gray-500 font-mono">Total wet target: 400 kg. Room for thicker acid protection, extra helium, redundant systems, or slight balloon upsizing.</div>
            </div>

            {/* Balloon Sizing */}
            <div className="mb-8">
              <div className="font-mono text-xs uppercase tracking-widest text-venus mb-2">Balloon Sizing (Lighter Payload Advantage)</div>
              <p className="text-sm text-gray-400">
                Floating mass (balloon + bay + avionics, heatshield jettisoned) is ~{floatingMin}–{floatingMax} kg. At 55 km (ρ_net lift ≈ 0.8 kg/m³), ~<span className="text-white font-medium">{mass.balloon_volume_m3} m³</span> → spherical diameter ~<span className="font-mono">{mass.balloon_diameter_m} m</span>. Design point from mass-budget.json. Envelope life is the Gate 0–1 go/no-go.
              </p>
            </div>

            {/* Trajectory & Ops */}
            <div className="mb-8">
              <div className="font-mono text-xs uppercase tracking-widest text-venus mb-3">Trajectory &amp; Operations</div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="glass-panel p-5">
                  <div className="text-white font-medium mb-1">Launch &amp; Transfer</div>
                  <div className="text-gray-400">LEO insertion via Falcon 9 rideshare or Starship secondary. Onboard burn ~2.5 km/s (gravity assist benefit) for Venus transfer. ~146 day TOF.</div>
                </div>
                <div className="glass-panel p-5">
                  <div className="text-white font-medium mb-1">Entry &amp; Deployment</div>
                  <div className="text-gray-400">Direct entry at ~10.7 km/s. Flat base + parachute decelerates to balloon deployment at ~55 km. 3U CubeSat store-and-forward (typical ~2 MB/day to Earth) or carrier-provided comms as a descope. Autonomous float ops plus AETHER OS on Earth.</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 font-mono">Power/Comms/Thermal: Solar on balloon top + efficient systems. Radiation-hardened avionics. Site comms/day estimator and atmosphere model apply directly.</p>
            </div>

            <div className="glass-panel p-6 border-l-2 border-l-white/20 mb-4">
              <div className="font-mono text-xs uppercase tracking-widest text-venus mb-2">
                Cost sketch
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Launch is the shrinking term.{' '}
                <span className="font-mono text-venus">$80/kg × 400 kg ≈ $32k</span> is the
                rideshare-class launch line of a <strong className="text-white">$500k all-in</strong>{' '}
                stack. Envelope, COTS bay, 3U, and a shop ablative eat the rest. If a line blows,
                descope. The public target stays half a million.
              </p>
            </div>

            <div className="glass-panel p-6 mb-4">
              <div className="font-mono text-xs uppercase tracking-widest text-venus mb-3">
                What we optimize for now
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-400">
                <div>
                  <span className="text-white font-medium block">Ground work</span>
                  Gates 0–3: film acid tests, 1.2 m helium balloon, sensor-bay packet.
                </div>
                <div>
                  <span className="text-white font-medium block">Open engineering</span>
                  Public GitHub, claimable tasks, contribution record.
                </div>
                <div>
                  <span className="text-white font-medium block">Mass discipline</span>
                  ~400 kg wet is a rideshare-class stack. That is how $500k reaches Venus.
                </div>
                <div>
                  <span className="text-white font-medium block">Vision vs execution</span>
                  Cloud cities later. Cloudseeker first: 30–90 days at 50–55 km, 2029 window class.
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 font-mono">
              CONOPS: rideshare-class LEO → transfer → entry → inflate ~50–55 km → 30–90 day float.
              Hardware starts at Gates 0–3.
            </div>
          </div>
        </div>
      </section>

      {/* 03 // THE THESIS - full Twin Paradox + exact table + I/II/III pillars */}
      <section id="thesis" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">03 // The Thesis</h2>
            <h3 className="text-4xl font-bold text-white">Why We Choose The Clouds</h3>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Venus is a compelling science target and a long-horizon industrial idea. Near-term we
              build and test. Cloud cities are the vision.
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
                  <div className="text-3xl font-bold text-white">146 <span className="text-sm text-gray-600">days</span></div>
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
                    <th className="p-4 border-b border-white/10 text-venus bg-venus/5">Venus 55 km</th>
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
                    <td className="p-4 text-venus bg-venus/5 font-bold">
                      ~2600 W/m² TOA
                      <div className="text-[10px] font-normal text-venus/70 mt-1">~200 W/m² elec. at 55 km</div>
                    </td>
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
              <p className="px-4 py-2 text-[10px] font-mono text-gray-500 border-t border-white/10">
                Solar: 2600 W/m² is top-of-atmosphere. Electrical insolation at 55 km is ~200 W/m² after cloud derate (power v1).
              </p>
            </div>
          </div>

          {/* Strategic Pillars I / II / III */}
          <div>
            <div className="uppercase tracking-widest text-xs text-foreground/60 mb-4">PILLARS</div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-white/10 bg-black/40 hover:border-venus/50 transition-colors">
                <div className="h-9 w-9 bg-venus/10 text-venus flex items-center justify-center rounded-sm mb-4 font-bold">I</div>
                <h4 className="text-white font-bold text-lg mb-2">Habitation</h4>
                <p className="font-mono text-[10px] uppercase tracking-wider text-venus/70 mb-2">Long-horizon vision</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  At 50 km, breathable-air habitats (21% O2, 79% N2) would act as lifting gas in dense CO2. No pressurized suits inside.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 hover:border-venus/50 transition-colors">
                <div className="h-9 w-9 bg-venus/10 text-venus flex items-center justify-center rounded-sm mb-4 font-bold">II</div>
                <h4 className="text-white font-bold text-lg mb-2">Resources (ISRU)</h4>
                <p className="font-mono text-[10px] uppercase tracking-wider text-venus/70 mb-2">Long-horizon vision</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The atmosphere is a chemical factory: oxygen and carbon from CO2, sulfuric acid for industry, nitrogen for agriculture. Downstream of a working float.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 hover:border-venus/50 transition-colors">
                <div className="h-9 w-9 bg-venus/10 text-venus flex items-center justify-center rounded-sm mb-4 font-bold">III</div>
                <h4 className="text-white font-bold text-lg mb-2">Astrobiology</h4>
                <p className="font-mono text-[10px] uppercase tracking-wider text-venus/70 mb-2">Near-term science goal</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The cloud layer may host microbial life. Phosphine detection remains controversial. Baseline suite includes AFN / TLS / MS channels for precursors.
                </p>
              </div>
            </div>
          </div>

          {/* Why Venus vs Mars - merged content */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold mb-4">Why Venus vs Mars</h4>
            <p className="text-gray-400 mb-6">
              Venus complements Mars. At 50-55 km it offers near-Earth gravity (0.9g), pressure, and solar flux—superior for long-term human and AI thriving.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-sm mb-6">
              <div>
                <div className="font-mono text-xs text-venus mb-1">KEY ADVANTAGES</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li>Hohmann-class travel ~146 days vs 210+ for Mars</li>
                  <li>Abundant atmospheric resources</li>
                  <li>TOA solar 1.91× Earth; ~200 W/m² electrical at 55 km</li>
                </ul>
              </div>
              <div>
                <div className="font-mono text-xs text-venus mb-1">ATMOSPHERE &amp; RESOURCES</div>
                <p className="text-gray-400">96.5% CO₂ (fuel/plastics), 3.5% N₂ (air), SO₂ &amp; H₂SO₄ (chemical feedstocks). Solar at top of atmosphere is 1.91× Earth; electrical at 55 km is ~200 W/m² after cloud derate. Chemical feedstocks are a long-horizon ISRU path.</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Acid resistance is the Gate 0–1 go/no-go. Floating cities remain long-horizon vision. Near-term: prove a 30–90 day float at 50–55 km.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-void border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="uppercase tracking-[3px] text-xs text-venus/70 mb-2">TECHNOLOGY</div>
          <h3 className="text-3xl font-bold text-white mb-6">Cloudseeker Technology</h3>
          <p className="text-gray-400 mb-8 max-w-prose">
            A 400 kg-class aerostat and 3U relay built to sit at 50–55 km for 30–90 days — time no descent probe gets. Envelope is the novel piece. Everything else is COTS, open, or a partner bus.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="glass-panel p-6 border-l-2 border-l-venus">
              <h4 className="font-mono text-venus mb-2">Acid-Resistant Aerostat</h4>
              <p className="text-gray-400">Multilayer fluoropolymer super-pressure balloon for 30–90 days in sulfuric cloud. Gate 0–1 qualifies the film. That dataset is the mission.</p>
            </div>
            <div className="glass-panel p-6 border-l-2 border-l-venus">
              <h4 className="font-mono text-venus mb-2">Integrated Sensor Suite</h4>
              <p className="text-gray-400">~8 kg science in a ~50 kg flush bay: AFN-class nephelometer, compact TLS, aerosol MS, met, two 4K cameras. Event-driven sampling over 30–90 days. Baseline v0 in git.</p>
            </div>
            <div className="glass-panel p-6 border-l-2 border-l-venus">
              <h4 className="font-mono text-venus mb-2">3U CubeSat Relay</h4>
              <p className="text-gray-400">Separate 3U Venus orbiter (never on the sphere). UHF up, X-band to Earth. Typical ~2 MB/day — time-series first, 4K stills queued, video rare. See /#relay.</p>
            </div>
            <div className="glass-panel p-6 border-l-2 border-l-venus">
              <h4 className="font-mono text-venus mb-2">AI-Optimized Navigation</h4>
              <p className="text-gray-400">Autonomous float ops plus AETHER OS on Earth. First data contract is Gate 3: a live bay packet. The atmosphere is the navigation problem; AI is how we sit in it.</p>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            We need hardware donations, software contributions, and testing facilities. Coders, fabricators, and testers—join the build.
          </p>
        </div>
      </section>

      {/* 05 // MISSION ARCHIVE - full data-driven heritage table */}
      <section id="heritage" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-2">05 // Mission Archive</h2>
              <h3 className="text-4xl font-bold text-white">Standing on the Shoulders of Giants</h3>
              <p className="mt-2 text-gray-400">Government and private missions map and descend Venus. The unique gap is time at 50–55 km — 30–90 days vs VLF ~5 min, DAVINCI ~1 h, VEGA ~46 h. Heritage log of attempts to reach Venus.</p>
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
        </div>
      </section>

      {/* Simulations & Visuals (slim, no separate gallery needed) */}
      <section id="simulations" className="py-24 bg-void border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-venus font-mono text-sm uppercase tracking-widest mb-3">05 // Simulations</h2>
          <h3 className="text-3xl font-bold text-white mb-6">Venus Visions</h3>
        </div>

        {/* Video - 70% width */}
        <div className="mx-auto w-[70%]">
          <div className="glass-panel border border-white/10 overflow-hidden">
            <video
              className="w-full aspect-video object-cover bg-black"
              controls
              muted
              loop
              playsInline
              autoPlay
            >
              <source src="/assets/visuals/flyingprobe.mp4" type="video/mp4" />
            </video>
            <div className="max-w-7xl mx-auto px-4">
              <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/60">
                <div>
                  <div className="font-mono text-sm text-white">Venus Visions</div>
                  <div className="text-xs text-gray-500">Flying probe simulation</div>
                </div>
                <div className="text-xs font-mono text-venus">NEPHELIS.SYS.V2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="glass-panel border border-white/10 overflow-hidden mb-6">
            <img
              src="/assets/visuals/cloudseeker-hero.jpg"
              alt="Cloudseeker in the Venus cloud deck — concept art"
              className="w-full h-auto object-cover bg-black"
            />
            <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-between">
              <div>
                <div className="font-mono text-sm text-white">Cloudseeker on station</div>
                <div className="text-xs text-gray-500">Flyingprobe identity · 50–55 km · concept art</div>
              </div>
              <div className="text-xs font-mono text-tech">PROBE @ 55 km</div>
            </div>
          </div>

          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-venus">Long-horizon vision</div>
              <div className="font-mono text-sm text-white">Future missions and life on Venus</div>
            </div>
            <div className="text-xs font-mono text-gray-500">Long-horizon vision</div>
          </div>

          <div className="glass-panel border border-white/10 overflow-hidden mb-4">
            <img
              src="/assets/visuals/n5-cool-meadow.jpg"
              alt="Inside a Venus cloud-park dome: cattle, a path, another city through the glass"
              className="w-full aspect-[16/8] object-cover bg-black"
            />
            <div className="p-4 border-t border-white/10 bg-black/60">
              <div className="font-mono text-sm text-white">In the park</div>
              <div className="text-xs text-gray-500 mt-1">
                Ground level under the dome. Cattle, a path, another city through the glass.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['n5-cool-bridge.jpg', 'Between cities', 'A glass walkway through the sulfuric ocean. One person, two habitats.', 'Glass pedestrian bridge connecting two Venus cloud habitats'],
              ['n5-cool-lookout.jpg', 'Looking at the tower', 'From a terrace, the stacked garden pods fill the sky.', 'Two people on a terrace looking at a Venus garden tower'],
              ['n5-cool-crops.jpg', 'Agriculture', 'A botanist in a glass farm. The window is the deck.', 'Botanist tending crops in a Venus cloud greenhouse'],
              ['n5-cool-works.jpg', 'The floor', 'ISRU in the weather. A technician and the cloud.', 'Technician at an ISRU plant floating in Venus clouds'],
              ['n5-cool-ops.jpg', 'On station', 'Same crew, inside. Clouds in the window. Long-horizon vision.', 'Two crew in an aerostat ops cabin looking at Venus clouds'],
              ['n5-cool-under.jpg', 'From below', 'The belly of a park-island. Hull lights, silver-blue sea underneath.', 'Underside of a floating Venus park-island habitat'],
            ].map(([file, title, note, alt]) => (
              <div key={file} className="glass-panel border border-white/10 overflow-hidden">
                <img
                  src={`/assets/visuals/${file}`}
                  alt={alt}
                  className="w-full aspect-video object-cover bg-black"
                />
                <div className="p-3 border-t border-white/10 bg-black/60">
                  <div className="font-mono text-sm text-white">{title}</div>
                  <div className="text-xs text-gray-500 mt-1">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data-driven Roadmap (kept from new functionality) */}
      <section className="max-w-5xl mx-auto px-4 py-20 border-b border-white/10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="uppercase tracking-[2px] text-xs text-foreground/60">ROADMAP</div>
            <h3 className="text-3xl font-semibold tracking-tight">Current Milestones</h3>
          </div>
          <Link href="/roadmap" className="font-mono text-xs uppercase tracking-wider text-venus hover:underline">
            Full roadmap →
          </Link>
        </div>
        <div className="space-y-4 pl-1">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 border-l-2 border-venus/40 pl-6 text-[15px]">
              <div className="font-mono w-16 text-venus shrink-0">{item.year}</div>
              <div>{item.event} <span className="text-xs text-foreground/50">({item.status})</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribute / Volunteer section (new for collaboration) */}
      <section id="contribute" className="max-w-4xl mx-auto px-4 py-16 border-b border-white/10 text-center">
        <div className="uppercase tracking-[3px] text-xs text-venus/70 mb-2">BUILD WITH US</div>
        <h3 className="text-3xl font-semibold mb-3">Open project. Human + AI collaboration.</h3>
        <p className="max-w-prose mx-auto text-foreground/70">
          The entire stack (content, visuals, code, research, automation) lives here. Volunteers can edit data/MDX, contribute designs, or help run agent loops.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href="https://github.com/ehreng/Nephelis" target="_blank" className="px-6 py-2 border border-white/30 font-mono text-sm uppercase tracking-wider hover:border-venus hover:text-venus">View on GitHub</a>
          <Link href="/updates" className="px-6 py-2 border border-white/30 font-mono text-sm uppercase tracking-wider hover:border-venus hover:text-venus">Read Updates</Link>
          <Link href="/roadmap" className="px-6 py-2 border border-white/30 font-mono text-sm uppercase tracking-wider hover:border-venus hover:text-venus">Roadmap</Link>
          <a href="https://github.com/ehreng/Nephelis/blob/main/CONTRIBUTING.md" target="_blank" className="px-6 py-2 bg-venus text-black font-mono text-sm uppercase tracking-wider">How to Contribute</a>
        </div>
        <VolunteerForm />
        <p className="mt-4 text-xs text-foreground/50">Agents can propose changes, generate content, and keep the todo list fresh.</p>
      </section>

      {/* FUNDING - Etch Your Name + tiers + initiate sequence form (full port) */}
      <section id="funding" className="py-20 relative">
        <div className="absolute inset-0 bg-venus/5 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-black tracking-[-1px] text-white mb-4 uppercase">Support the work</h2>
            <p className="max-w-xl mx-auto text-xl text-gray-400">
              Crowdfund tiers fund the $500k all-in stack — from first film tests through a
              rideshare-class Venus float. DNA / sample concepts need legal clearance before any
              sale. Prefer to build?
              Contribute on GitHub.
            </p>
          </div>

          <FundingTiers />

          <div className="mt-12">
            <div className="text-center mb-4">
              <div className="uppercase tracking-widest text-xs text-venus/70">CREW SIGNALS</div>
              <div className="text-lg">Stay in the loop. Receive mission updates.</div>
            </div>
            <SignupForm />
          </div>

          <div className="text-center mt-8 text-xs text-foreground/50 font-mono">
            Or email <a href="mailto:ehren@nephelisindustries.com" className="text-venus hover:underline">ehren@nephelisindustries.com</a> for partnership. Mail is read when training allows.
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 text-xs text-center text-foreground/50 font-mono">
        © {new Date().getFullYear()} Nephelis Industries • Project AETHER • 55 km above Venus • EST 2025
      </footer>
    </div>
  );
}
