'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionPlanner() {
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);  // start pre-launch / early transfer
  const [wetMass, setWetMass] = useState(500);
  const [dryMass, setDryMass] = useState(280);

  // Derived values (rocket equation + demo sim)
  const isp = 320;
  const g0 = 9.81;
  const deltaV = (wetMass > dryMass && wetMass > 0)
    ? Math.round(isp * g0 * Math.log(wetMass / dryMass))
    : 1830;

  // Fake live telemetry based on controls. Launch target: Q4 2027
  const earthDist = Math.max(0, Math.round(12000000 * (1 - progress / 100) + (offset * 12000)));
  const venusDist = Math.round(41000000 * (1 - progress / 100) + Math.abs(offset) * 80000);
  const arrivalMonth = offset > 15 ? 'FEB 2028' : offset < -15 ? 'SEP 2027' : 'DEC 2027';
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

      // Orbit radii
      const earthR = 105;
      const venusR = 62;

      // Draw orbits
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, venusR, 0, Math.PI * 2);
      ctx.stroke();

      // Planet positions (simple circular motion; progress advances probe)
      const earthAngle = -0.6; // fixed-ish for demo
      const venusAngle = 2.1;
      const ex = cx + Math.cos(earthAngle) * earthR;
      const ey = cy + Math.sin(earthAngle) * earthR * 0.65;
      const vx = cx + Math.cos(venusAngle) * venusR;
      const vy = cy + Math.sin(venusAngle) * venusR * 0.65;

      // Draw transfer path (approximate Hohmann arc from Earth to Venus)
      ctx.strokeStyle = '#FF4500';
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      // Simple bezier/arc approximation for transfer
      const midX = cx + 22;
      const midY = cy - 38;
      ctx.quadraticCurveTo(midX, midY, vx, vy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Planet dots
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(ex, ey, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(vx, vy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Probe position along transfer path
      const tx = ex * (1 - t) + vx * t + (midX - (ex + vx) / 2) * Math.sin(t * Math.PI) * 0.6;
      const ty = ey * (1 - t) + vy * t + (midY - (ey + vy) / 2) * Math.sin(t * Math.PI) * 0.6;

      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(tx + offset * 0.8, ty, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText('EARTH', ex + 8, ey + 12);
      ctx.fillText('VENUS', vx + 8, vy + 3);
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
                <span>LEO</span>
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
              <div className="stat-label mb-1">Wet Mass (kg)</div>
              <input
                type="number"
                value={wetMass}
                onChange={(e) => setWetMass(Math.max(100, parseInt(e.target.value) || 100))}
                className="w-full bg-black border border-white/20 text-white font-mono text-sm p-2 focus:border-tech focus:outline-none"
              />
            </div>
            <div>
              <div className="stat-label mb-1">Dry Mass (kg)</div>
              <input
                type="number"
                value={dryMass}
                onChange={(e) => setDryMass(Math.max(50, parseInt(e.target.value) || 50))}
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
            EARTH DISTANCE<br />
            <span className="text-white text-sm tabular-nums">{earthDist.toLocaleString()} km</span>
          </div>
          <div>
            VENUS DISTANCE<br />
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
  );
}
