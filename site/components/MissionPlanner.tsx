'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionPlanner() {
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(35);
  const [wetMass, setWetMass] = useState(500);
  const [dryMass, setDryMass] = useState(280);

  // Derived values (rocket equation + demo sim)
  const isp = 320;
  const g0 = 9.81;
  const deltaV = (wetMass > dryMass && wetMass > 0)
    ? Math.round(isp * g0 * Math.log(wetMass / dryMass))
    : 1830;

  // Fake live telemetry based on controls
  const earthDist = Math.max(0, Math.round(12000000 * (1 - progress / 100) + (offset * 12000)));
  const venusDist = Math.round(41000000 * (1 - progress / 100) + Math.abs(offset) * 80000);
  const arrivalMonth = offset > 10 ? 'JAN 2028' : offset < -10 ? 'OCT 2027' : 'DEC 2027';
  const progressLabel = `${progress}%`;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple orbit canvas sim (inspired by original)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = 640;
    const h = canvas.height = 340;
    let frame = 0;

    const draw = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // Sun
      ctx.fillStyle = '#f4a261';
      ctx.beginPath();
      ctx.arc(w * 0.22, h * 0.5, 9, 0, Math.PI * 2);
      ctx.fill();

      // Earth orbit
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(w * 0.42, h * 0.5, 78, 52, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Venus orbit (inner)
      ctx.beginPath();
      ctx.ellipse(w * 0.42, h * 0.5, 46, 31, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Transfer trajectory hint
      ctx.strokeStyle = '#FF4500';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(w * 0.42 + 78, h * 0.5);
      ctx.quadraticCurveTo(w * 0.62, h * 0.28, w * 0.42 + 46, h * 0.5 - 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Progress position on transfer
      const t = Math.max(0, Math.min(1, progress / 100));
      const tx = w * 0.42 + 78 * (1 - t) + 46 * t;
      const ty = h * 0.5 - 18 * Math.sin(t * Math.PI);

      // Probe dot
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(tx + offset * 0.6, ty, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText('EARTH', w * 0.42 + 68, h * 0.5 + 18);
      ctx.fillText('VENUS', w * 0.42 + 36, h * 0.5 - 22);

      // HUD overlay text
      ctx.fillStyle = '#22c55e';
      ctx.fillText(`SYS: ACTIVE`, 14, 20);
      ctx.fillText(`TRK: HOHMANN`, 14, 34);
      ctx.fillText(`V_INF: 2.7 km/s`, 14, 48);

      frame++;
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
