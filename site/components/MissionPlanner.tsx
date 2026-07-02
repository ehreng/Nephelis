'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionPlanner() {
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(8);  // LEO 8%
  const FIXED_WET_MASS = 400;
  const [dryMass, setDryMass] = useState(280);

  // Derived values (rocket equation + demo sim)
  const isp = 320;
  const g0 = 9.81;
  const wetMass = FIXED_WET_MASS;
  const deltaV = (wetMass > dryMass && wetMass > 0)
    ? Math.round(isp * g0 * Math.log(wetMass / dryMass))
    : 1830;

  // Fake live telemetry based on controls. Launch target: Q4 2027
  const earthDist = Math.max(0, Math.round(12000000 * (1 - progress / 100) + (offset * 12000)));
  const venusDist = Math.round(41000000 * (1 - progress / 100) + Math.abs(offset) * 80000);

  // Estimated arrival: nominal launch Dec 15 2027 + offset days + 146 day cruise
  const nominalLaunch = new Date('2027-12-15');
  const launchDate = new Date(nominalLaunch.getTime());
  launchDate.setDate(launchDate.getDate() + offset);
  const arrivalDate = new Date(launchDate.getTime());
  arrivalDate.setDate(arrivalDate.getDate() + 146);
  const arrivalMonth = arrivalDate.toLocaleString('en-US', { month: 'short' }).toUpperCase() + ' ' + arrivalDate.getFullYear();

  const progressLabel = `${progress}%`;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Proper Sun-centered solar system + Hohmann transfer trajectory
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = 640;
    const h = canvas.height = 340;
    const cx = w * 0.5;
    const cy = h * 0.5;

    const draw = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      const t = Math.max(0, Math.min(1, progress / 100));

      // Sun at center
      ctx.fillStyle = '#f4a261';
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff7d6';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Orbital sim params
      const earthR = 105;
      const venusR = 62;
      const BASE_EARTH = -0.9;
      const BASE_VENUS = 1.65;
      const OMEGA_E = 0.01721; // rad/day
      const OMEGA_V = 0.02797;
      const FLIGHT_DAYS = 140;

      const tLaunch = offset;
      const elapsedDays = t * FLIGHT_DAYS;
      const tNow = tLaunch + elapsedDays;

      // Current positions of planets (rotate with progress + offset)
      const earthAngle = BASE_EARTH + tNow * OMEGA_E;
      const venusAngle = BASE_VENUS + tNow * OMEGA_V;
      const cex = cx + Math.cos(earthAngle) * earthR;
      const cey = cy + Math.sin(earthAngle) * earthR * 0.62;
      const cvx = cx + Math.cos(venusAngle) * venusR;
      const cvy = cy + Math.sin(venusAngle) * venusR * 0.62;

      // Fixed transfer endpoints for the chosen launch date (offset)
      const earthDepAngle = BASE_EARTH + tLaunch * OMEGA_E;
      const venusArrAngle = BASE_VENUS + (tLaunch + FLIGHT_DAYS) * OMEGA_V;
      const ex = cx + Math.cos(earthDepAngle) * earthR;
      const ey = cy + Math.sin(earthDepAngle) * earthR * 0.62;
      const vx = cx + Math.cos(venusArrAngle) * venusR;
      const vy = cy + Math.sin(venusArrAngle) * venusR * 0.62;

      // Orbits
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, venusR, 0, Math.PI * 2);
      ctx.stroke();

      // Transfer trajectory (sampled arc between launch Earth pos and arrival Venus pos)
      // Uses realistic angle + radius interpolation for Dec 2027 window — does not cross Sun
      ctx.strokeStyle = '#FF4500';
      ctx.setLineDash([2, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const STEPS = 18;
      for (let i = 0; i <= STEPS; i++) {
        const s = i / STEPS;
        const a = earthDepAngle + (venusArrAngle - earthDepAngle) * s;
        let r = earthR + (venusR - earthR) * s;
        r += Math.sin(s * Math.PI) * 9; // gentle inward curve
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r * 0.62;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineWidth = 1;

      // Current planet positions (Earth blue, Venus orange) — move as progress + offset change
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(cex, cey, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cvx, cvy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Probe on the transfer arc (cyan)
      const pa = earthDepAngle + (venusArrAngle - earthDepAngle) * t;
      let pr = earthR + (venusR - earthR) * t + Math.sin(t * Math.PI) * 9;
      const tx = cx + Math.cos(pa) * pr;
      const ty = cy + Math.sin(pa) * pr * 0.62;

      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Labels (on current planet locations)
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText('EARTH', cex + 8, cey + 12);
      ctx.fillText('VENUS', cvx + 8, cvy + 3);
      ctx.fillText('SUN', cx + 14, cy + 3);

      // HUD
      ctx.fillStyle = '#22c55e';
      ctx.fillText('SYS: ACTIVE', 12, 18);
      ctx.fillText('TRK: HOHMANN', 12, 30);
      ctx.fillText('V_INF: 2.7 km/s', 12, 42);
      ctx.fillText(`LAUNCH: Q4 2027`, 12, 54);

      requestAnimationFrame(draw);
    };

    draw();
  }, [progress, offset]);

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-panel p-6 border-l-2 border-l-venus">
          <h4 className="font-mono text-venus text-lg mb-4 flex items-center gap-2">
            Launch Phase
          </h4>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-mono text-gray-500 uppercase block mb-1.5">Launch Offset (Days)</label>
              <input
                type="range"
                min={-30}
                max={30}
                step={1}
                value={offset}
                onChange={(e) => setOffset(parseInt(e.target.value))}
                className="w-full planner-input"
              />
              <div className="flex justify-between mt-1 font-mono text-xs text-tech">
                <span>Early</span>
                <span className="text-white">{offset}</span>
                <span>Late</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-500 uppercase block mb-1.5">Mission Progress</label>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="w-full planner-input"
              />
              <div className="flex justify-between mt-1 font-mono text-xs text-tech">
                <span>LEO 8%</span>
                <span className="text-white">{progressLabel}</span>
                <span>Venus Capture</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 border-l-2 border-l-tech">
          <h4 className="font-mono text-tech text-lg mb-4">Delta-V Budget</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="stat-label mb-1">Wet Mass (kg) <span className="text-[8px] opacity-60">(FIXED)</span></div>
              <div className="w-full bg-black border border-white/10 text-gray-400 font-mono text-sm p-2 tabular-nums">{wetMass}</div>
            </div>
            <div>
              <div className="stat-label mb-1">Dry Mass (kg)</div>
              <input
                type="number"
                value={dryMass}
                onChange={(e) => setDryMass(Math.max(50, Math.min(wetMass - 10, parseInt(e.target.value) || 50)))}
                className="w-full bg-black border border-white/20 text-white font-mono text-sm p-2 focus:border-tech focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-baseline">
            <span className="text-xs font-mono text-gray-400">Available Δv</span>
            <span className="text-2xl font-mono text-tech font-bold tabular-nums">{deltaV} m/s</span>
          </div>
          <div className="text-[10px] text-gray-500 mt-1 font-mono">Isp=320s • Hohmann assumptions</div>
        </div>
      </div>

      {/* Viz + Telemetry */}
      <div className="lg:col-span-8">
        <div className="glass-panel w-full aspect-video relative overflow-hidden bg-black/90 flex items-center justify-center">
          <canvas ref={canvasRef} className="max-w-full h-full" />
          <div className="absolute top-4 left-4 font-mono text-xs text-green-500 bg-black/40 px-2 py-1 rounded">
            SYS: ACTIVE<br />TRK: HOHMANN<br />V_INF: 2.7 km/s
          </div>
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-venus/70">DEMO TRAJECTORY</div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 font-mono text-xs text-center text-gray-500">
          <div>
            RANGE FROM EARTH<br />
            <span className="text-white text-sm tabular-nums">{earthDist.toLocaleString()} km</span>
          </div>
          <div>
            RANGE TO VENUS<br />
            <span className="text-white text-sm tabular-nums">{(venusDist / 1000000).toFixed(0)}M km</span>
          </div>
          <div>
            EST. ARRIVAL<br />
            <span className="text-white text-sm">{arrivalMonth}</span>
          </div>
        </div>

        <button
          onClick={() => {
            alert(`Trajectory locked.\n\nOffset: ${offset} days\nProgress: ${progress}%\nΔv: ${deltaV} m/s\nArrival: ${arrivalMonth}\n\n(Saved to mission log in production.)`);
          }}
          className="mt-3 w-full text-xs font-mono uppercase tracking-widest border border-white/20 py-2 hover:bg-white/5 hover:border-venus/50 transition"
        >
          LOCK IN THIS TRAJECTORY (DEMO)
        </button>
      </div>
    </div>

    {/* Explanations below planner */}
    <div className="mt-8 max-w-6xl text-sm text-gray-400 border-t border-white/10 pt-6">
      <div className="font-mono uppercase tracking-[1.5px] text-venus/80 text-xs mb-3">MISSION PLANNER TERMS &amp; SIGNIFICANCE</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 text-[13px]">
        <div>
          <span className="text-white font-medium block mb-1">Launch Offset (±30 days)</span>
          Shifts the Dec 2027 launch date within the window. Earth and Venus are orbiting the Sun at different speeds, so this changes their relative angles at departure and at arrival. The red transfer arc and planet dots instantly update to show the shortest viable geometry for that specific date.
        </div>
        <div>
          <span className="text-white font-medium block mb-1">Mission Progress (LEO 8% → Venus Capture)</span>
          Drags the cyan probe along the computed transfer path. At the same time, both planets continue rotating around the Sun to their positions at the corresponding mission elapsed time (~140 days total). LEO 8% marks early departure / Earth escape.
        </div>
        <div>
          <span className="text-white font-medium block mb-1">Wet Mass (fixed at 400 kg)</span>
          Total mass at launch: probe structure + full propellant load + payload + systems. Fixed by our rideshare / Starship secondary allocation and overall architecture. Cannot be increased without changing the launch vehicle or mission class.
        </div>
        <div>
          <span className="text-white font-medium block mb-1">Dry Mass (adjustable)</span>
          Mass remaining once all propellant is expended (structure + instruments + avionics). You can reduce it by using lighter materials or flying less payload. Because Δv = Isp·g0·ln(wet/dry), even small drops in dry mass deliver large gains in available velocity change.
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        The visualization uses a Sun-centered frame with proper orbital angular rates. The transfer is an approximated inward Hohmann-style arc timed for the 2027 window (does not intersect the Sun). Real operations add navigation, TCMs, and precise ephemeris.
      </div>
    </div>
    </>
  );
}
