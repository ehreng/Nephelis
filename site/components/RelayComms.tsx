import MockTelemetry from '@/components/MockTelemetry';
import { getCommsLink, getSensorSuite } from '@/lib/content';
import { dteMinutes, formatDuration } from '@/lib/telemetry-mock';

function Node({
  kicker,
  title,
  body,
  accent,
}: {
  kicker: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center border p-4 ${
        accent ? 'border-tech/50 bg-tech/5' : 'border-white/10 bg-black/40'
      }`}
    >
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
          accent ? 'text-tech' : 'text-white/40'
        }`}
      >
        {kicker}
      </div>
      <div className="mt-2 text-sm font-medium text-white">{title}</div>
      <p className="mt-1 text-xs leading-relaxed text-white/45">{body}</p>
    </div>
  );
}

function LinkLabel({ top, bot }: { top: string; bot: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 md:py-0">
      <div className="hidden h-px w-full bg-gradient-to-r from-white/10 via-tech/70 to-white/10 md:block" />
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-tech md:mt-1">
        {top}
      </div>
      <div className="font-mono text-[10px] text-white/40">{bot}</div>
      <div className="mt-1 h-6 w-px bg-tech/50 md:hidden" />
    </div>
  );
}

export default function RelayComms() {
  const comms = getCommsLink();
  const suite = getSensorSuite();
  const earth = comms.relay_to_earth;
  const daily = comms.daily_return_mb;
  const uhf = comms.probe_to_relay;

  return (
    <section id="relay" className="border-b border-white/10 bg-void">
      <div className="border-b border-amber-700/40 bg-amber-950/40 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400/90">
        CubeSat relay · architecture estimate · not selected hardware
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
          01c // Store and forward
        </div>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Probe → CubeSat → Earth</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">
          The 3U is a Venus orbiter, never on the sphere. Cloudseeker talks UHF when the orbiter is
          overhead. The CubeSat stores, then X-band to a 34 m-class dish. Typical return is about two
          megabytes a day — enough for the time-series, tight for 4K video. MarCO/Iris numbers are
          heritage class, not a NASA claim.
        </p>

        <div className="mt-10 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          <Node
            kicker="50–55 km"
            title="Cloudseeker"
            body={`Flush bay. UHF ${uhf.rate_kbps_typ} kbps typ (${uhf.rate_kbps_range[0]}–${uhf.rate_kbps_range[1]}). ${uhf.contacts_per_day_typ} contacts/day × ~${uhf.contact_min_typ} min.`}
          />
          <LinkLabel top={`UHF · ${uhf.rate_kbps_typ} kbps`} bot="proximity" />
          <Node
            accent
            kicker="Venus orbit"
            title="3U CubeSat"
            body={`${comms.architecture.cubesat.form} · ${comms.architecture.cubesat.mass_kg_min}–${comms.architecture.cubesat.mass_kg_max} kg · ${comms.architecture.cubesat.radio_class}. Store-and-forward.`}
          />
          <LinkLabel
            top={`X-band · ${earth.rate_kbps_typical} kbps typ`}
            bot={`${earth.range_au.typical} AU class`}
          />
          <Node
            kicker="Ground"
            title="Earth"
            body={`${earth.ground} Typical pass ~${earth.pass_min_typical} min. Conjunction: store.`}
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden border border-white/10">
            <div className="relative aspect-video bg-black">
              <img
                src="/assets/visuals/cubesat-relay.jpg"
                alt="3U CubeSat in Venus orbit above the cloud deck — concept art, separate orbiter"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
                3U · Venus orbit
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Concept art — not flight hardware
              </div>
            </div>
            <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Relay still · cubesat-relay
            </div>
          </article>

          <div className="flex flex-col justify-between border border-white/10 p-5 md:p-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
                Daily return to Earth
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { k: 'Far', au: earth.range_au.far, mb: daily.far, kbps: earth.rate_kbps_far },
                  {
                    k: 'Typical',
                    au: earth.range_au.typical,
                    mb: daily.typical,
                    kbps: earth.rate_kbps_typical,
                    us: true,
                  },
                  {
                    k: 'Close',
                    au: earth.range_au.close,
                    mb: daily.close,
                    kbps: earth.rate_kbps_close,
                  },
                ].map((c) => (
                  <div
                    key={c.k}
                    className={`p-3 ${c.us ? 'border border-tech/40 bg-tech/5' : 'border border-white/10'}`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {c.k} · {c.au} AU
                    </div>
                    <div className="mt-1 font-mono text-xl text-white">{c.mb}</div>
                    <div className="font-mono text-[10px] text-white/45">MB/day · {c.kbps} kbps</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/45">{daily.notes}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/45">{earth.conjunction_note}</p>
            </div>
            <p className="mt-6 font-mono text-[10px] leading-relaxed text-white/35">
              Queue: {(comms.queue || []).join(' → ')}.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
            Time on the X-band
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white">How long to pull a product</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">
            Minutes of Earth pass time at the three rates above. Chemistry time-series fits in a
            typical pass. 4K stills wait. Video is a closest-approach luxury.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  <th className="py-2 pr-3 font-normal">Product</th>
                  <th className="py-2 pr-3 font-normal">Size</th>
                  <th className="py-2 pr-3 font-normal">Far {earth.rate_kbps_far} kbps</th>
                  <th className="py-2 pr-3 font-normal">Typical {earth.rate_kbps_typical} kbps</th>
                  <th className="py-2 font-normal">Close {earth.rate_kbps_close} kbps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comms.products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 pr-3 align-top">
                      <div className="text-white">{p.name}</div>
                      {p.notes && <div className="mt-0.5 text-xs text-white/40">{p.notes}</div>}
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-white/70">
                      {p.size_mb} MB
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-white/55">
                      {formatDuration(dteMinutes(p.size_mb, earth.rate_kbps_far))}
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-tech">
                      {formatDuration(dteMinutes(p.size_mb, earth.rate_kbps_typical))}
                    </td>
                    <td className="py-3 align-top font-mono text-xs text-white/55">
                      {formatDuration(dteMinutes(p.size_mb, earth.rate_kbps_close))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
            What the bay actually weighs
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white">Sensor suite baseline v0</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">
            Science is ~{suite.gondola.science_sum_kg} kg inside a {suite.gondola.total_kg_min}–
            {suite.gondola.total_kg_max} kg flush bay. Class estimates. Not a vendor list.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  <th className="py-2 pr-3 font-normal">Instrument</th>
                  <th className="py-2 pr-3 font-normal">g</th>
                  <th className="py-2 pr-3 font-normal">W</th>
                  <th className="py-2 pr-3 font-normal">Day duty</th>
                  <th className="py-2 pr-3 font-normal">kb/day</th>
                  <th className="py-2 font-normal">TRL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {suite.instruments.map((ins) => (
                  <tr key={ins.id}>
                    <td className="py-3 pr-3 align-top">
                      <div className="text-white">{ins.name}</div>
                      <div className="mt-0.5 text-xs text-white/40">{ins.role}</div>
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-white/70">
                      {ins.mass_g}
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-white/70">
                      {ins.power_w}
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-white/70">
                      {Math.round(ins.duty_float_day * 100)}%
                    </td>
                    <td className="py-3 pr-3 align-top font-mono text-xs text-white/70">
                      {ins.data_kb_day_est}
                    </td>
                    <td className="py-3 align-top font-mono text-xs text-tech">{ins.trl_guess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
          <MockTelemetry />
        </div>
      </div>
    </section>
  );
}
