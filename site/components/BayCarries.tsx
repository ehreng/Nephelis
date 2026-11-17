const science = [
  {
    n: '07a',
    t: 'AFN-class autofluorescence nephelometer',
    track: 'VLF sole instrument. 440 nm laser, scatter + fluorescence of cloud particles.',
    unique:
      'VLF gets ~330 s of particles. We sit in the beam for weeks — size, shape, and organics as a time series.',
  },
  {
    n: '07b',
    t: 'Compact TLS / MEMS gas',
    track: 'DAVINCI VTLS; VLF Habitability concept (NH3, PH3, H2O, O2, SO2).',
    unique:
      'DAVINCI is a one-hour vertical profile. We watch the same 50–55 km slab through day, night, and events.',
  },
  {
    n: '07c',
    t: 'Aerosol / organics MS (LDMS-class)',
    track: 'Morning Star ORIGIN / VLF balloon follow-on. Laser desorption of droplet residue.',
    unique: 'Event-triggered when AFN flags fluorescence. Repeated sampling, not one plunge.',
  },
  {
    n: '07d',
    t: 'Meteorology T / P / wind',
    track: 'VEGA gondola; DAVINCI VASI.',
    unique: 'VEGA lasted 46 h on batteries. Target 30–90 d with solar + CubeSat relay.',
  },
  {
    n: '07e',
    t: 'Event-driven sampling',
    track: 'None of the descent probes can wait.',
    unique:
      'Onboard triage: spike in fluorescence, NH3, or UV-absorber optical depth opens the MS. Dwell is the instrument.',
  },
  {
    n: '06+',
    t: '4K envelope + deck cameras',
    track: 'DAVINCI VenDI looks at the surface on the way down. VLF has no imager.',
    unique:
      'Fixed bay cameras looking up the film (sponsor + gore) and out at the deck. Private imaging path.',
  },
];

const missions = [
  {
    name: 'VEGA 1 & 2',
    who: 'USSR / France / US tracking · 1985',
    platform: '3.54 m Teflon super-pressure balloon, 6.9 kg gondola',
    time: '~46 hours at ~54 km',
    payload: 'T, P, vertical wind, backscatter nephelometer, light, lightning. Battery-limited.',
  },
  {
    name: 'Rocket Lab VLF',
    who: 'Rocket Lab / MIT · Morning Star 1',
    platform: '~20 kg / 40 cm ballistic cone',
    time: '~5 minutes in 48–60 km',
    payload: 'One instrument: autofluorescence nephelometer (440 nm laser). Launch TBC as of late 2026.',
  },
  {
    name: 'NASA DAVINCI',
    who: 'NASA Discovery · early 2030s',
    platform: 'Titanium descent sphere + carrier',
    time: '~1 hour full column; minutes in the cloud band',
    payload:
      'VMS quadrupole MS, VTLS tunable laser, VASI T/P/wind, VenDI NIR surface imager. One vertical profile, then it dies.',
  },
  {
    name: 'JPL Venus aerobot',
    who: 'JPL / Aerostar study · not a committed mission',
    platform: 'Variable-altitude balloon-in-balloon, ~12 m for ~100 kg',
    time: '30–100 d concept, 52–62 km yo-yo',
    payload:
      'Aerosols, met, infrasound. Earth 6.4 m prototype flown 2024–25. Complementary altitude profiling, not our band lock.',
  },
  {
    name: 'Cloudseeker / AETHER',
    who: 'Nephelis · pre-hardware concept',
    platform: '~6.6 m super-pressure fluoropolymer, gondola = flush bay ~50 kg',
    time: '30–90 days at 50–55 km',
    payload:
      'AFN-class + compact TLS + aerosol MS + 4K envelope cameras + met. CubeSat relay off-vehicle. Time-series in the habitable band.',
    us: true,
  },
];

export default function BayCarries() {
  return (
    <section id="bay" className="border-b border-white/10 bg-void">
      <div className="border-b border-amber-700/40 bg-amber-950/40 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400/90">
        Cloudseeker · 50–55 km · concept art · pre-hardware
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
          01b // Time on station
        </div>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">A floating laboratory</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">
          NASA and ESA will map and descend in the early 2030s. VLF samples the clouds for minutes.
          The open measurement is time on station — acid-stable float, in-situ chemistry over 30–90
          days.
        </p>

        <article className="mt-10 overflow-hidden border border-white/10">
          <div className="relative aspect-video bg-black">
            <img
              src="/assets/visuals/n4-cool-twilight.jpg"
              alt="Cloudseeker underside at blue hour in the Venus cloud deck — concept art"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="relative flex h-full flex-col items-center justify-end p-8 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-tech">
                Time in the clouds
              </div>
              <h3 className="mt-3 font-sans text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
                A floating laboratory
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                30–90 days · 50–55 km · pre-hardware
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            Campaign 16:9 · n4-cool-twilight
          </div>
        </article>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="border border-white/10 p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-tech">Orbiters</div>
            <div className="mt-2 text-sm text-white">VERITAS · EnVision</div>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              Radar and IR from orbit. They map. They do not float.
            </p>
          </div>
          <div className="border border-white/10 p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-tech">Descent</div>
            <div className="mt-2 text-sm text-white">VLF · DAVINCI</div>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              One snapshot of the column. AFN in 5 min, or VMS/VTLS in an hour.
            </p>
          </div>
          <div className="border border-venus/40 bg-venus/5 p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-venus">Our gap</div>
            <div className="mt-2 text-sm text-white">Time in the 50–55 km band</div>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              Super-pressure lock at the habitable slab. Chemistry that evolves. Event-driven sampling.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden border border-white/10">
            <div className="relative aspect-[2/3] bg-black">
              <img
                src="/assets/visuals/n4-cool-bay-ports.jpg"
                alt="Cloudseeker sensor bay with two cameras, cyan ring, and compact science ports — concept art"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Bay · science ports · n4-cool-bay-ports
            </div>
          </article>

          <div className="flex flex-col justify-between border border-white/10 p-5 md:p-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
                What the bay carries
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Same flyingprobe face: two cameras, cyan ring. Ports track what other cloud-layer
                probes fly. Suite is conceptual until the sensor baseline is closed. Not flight
                hardware.
              </p>
              <ol className="mt-5 space-y-3">
                {science.map((s) => (
                  <li key={s.n} className="border-l border-white/10 pl-3">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-[10px] text-tech">{s.n}</span>
                      <span className="text-sm font-medium text-white">{s.t}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">
                      <span className="text-white/60">Track. </span>
                      {s.track}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/45">
                      <span className="text-venus/80">Unique. </span>
                      {s.unique}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-6 font-mono text-[10px] leading-relaxed text-white/35">
              We do not copy VenDI (surface imaging) or orbiter radar. We do not claim NASA
              instruments. Class names only.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
            Payload in the 50–55 km band
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white">What other missions put on the probe</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">
            Dated to public sources as of Nov 2026. Orbiters omitted from the table — they never
            enter the clouds. JPL aerobot is a study. Cloudseeker numbers are the site mass-budget
            design point.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  <th className="py-2 pr-3 font-normal">Mission</th>
                  <th className="py-2 pr-3 font-normal">Platform</th>
                  <th className="py-2 pr-3 font-normal">Time in band</th>
                  <th className="py-2 font-normal">In-situ payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {missions.map((m) => (
                  <tr key={m.name} className={m.us ? 'bg-venus/5' : undefined}>
                    <td className="py-3 pr-3 align-top">
                      <div className="font-medium text-white">{m.name}</div>
                      <div className="mt-0.5 text-xs text-white/40">{m.who}</div>
                    </td>
                    <td className="py-3 pr-3 align-top text-white/70">{m.platform}</td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-tech whitespace-nowrap">
                      {m.time}
                    </td>
                    <td className="py-3 align-top text-white/55">{m.payload}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <article className="mt-12 grid overflow-hidden border border-white/10 md:grid-cols-3">
          <div className="relative min-h-[220px] bg-black">
            <img
              src="/assets/visuals/n4-cool-bay.jpg"
              alt="Cloudseeker bay close: two cameras and cyan status ring — concept art"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-void-panel p-6 md:col-span-2">
            <div className="font-sans text-4xl font-black uppercase tracking-tighter text-white">
              Nephelis<span className="text-venus">.</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
              Join the open mission. Acid coupons, a helium ground float, and public logs. Founder
              review is asynchronous during U.S. Army training.
            </p>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
              github.com/ehreng/Nephelis
            </div>
            <a
              href="#contribute"
              className="mt-6 inline-flex w-fit border border-white/20 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:border-venus hover:text-venus"
            >
              Join the crew
            </a>
          </div>
          <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 md:col-span-3">
            Wordmark strip · n4-cool-bay
          </div>
        </article>
      </div>
    </section>
  );
}
