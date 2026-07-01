'use client';

import Link from "next/link";
import * as React from "react";

const visuals = [
  "nephelis.png",
  "nephelis_probe_satellite_combo.png",
  "NephelisIndustries.jpg",
  "probe.jpg",
  "probe3.png",
  "probe4.png",
  "parkvenus.png",
  "peopleofvenus.png",
  "vistavenus.png",
  "venusselfie.png",
  "sportsvenus.png",
  "venusadminbuilding.png",
  "venustable1.png",
  "probecloseup1.png",
];

export default function VisualsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-venus hover:underline">← Back to Nephelis</Link>
      <h1 className="text-5xl font-semibold tracking-tighter mt-6 mb-4">Mission Visuals</h1>
      <p className="text-lg text-foreground/70 max-w-prose mb-10">
        Concept art and generated visuals for Project AETHER. These are version-controlled in the project and can be regenerated or updated via AI agent loops.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visuals.map((file) => (
          <div key={file} className="relative aspect-video overflow-hidden rounded-xl border border-void-border bg-black">
            <img
              src={`/assets/visuals/${file}`}
              alt={file}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3 text-xs font-mono text-white/70 truncate">
              {file}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-sm text-foreground/60">
        More assets (including videos) live in <code>../assets/visuals/</code> and <code>public/assets/visuals/</code>. 
        New generations can be added and the gallery will pick them up (or use a script to sync).
      </div>

      {/* Interactive demo - simple canvas cloud layer explorer */}
      <div className="mt-16">
        <h2 className="text-2xl tracking-tight font-semibold mb-4">Interactive: Cloud Layer Explorer (demo)</h2>
        <p className="text-sm text-foreground/70 mb-4">Drag to simulate floating in the Venus cloud layer. (Built with Canvas + AI-assisted code)</p>
        <CloudExplorer />
      </div>
    </div>
  );
}

function CloudExplorer() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: any[] = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let isDragging = false;

    const resize = () => {
      canvas.width = Math.min(800, window.innerWidth - 100);
      canvas.height = 300;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create cloud particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 40,
        speed: 0.2 + Math.random() * 0.6,
        opacity: 0.3 + Math.random() * 0.5,
        hue: 20 + Math.random() * 30,
      });
    }

    const draw = () => {
      ctx.fillStyle = '#1a0500';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw atmosphere gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(255,69,0,0.1)');
      grad.addColorStop(0.5, 'rgba(40,20,10,0.3)');
      grad.addColorStop(1, '#050505');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = `hsl(${p.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Move based on mouse/drag
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        p.x += dx * 0.002 + (Math.random() - 0.5) * p.speed;
        p.y += dy * 0.002 + (Math.random() - 0.5) * p.speed * 0.5;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', () => { isDragging = true; });
    canvas.addEventListener('mouseup', () => { isDragging = false; });
    canvas.addEventListener('mouseleave', () => { isDragging = false; });

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full border border-void-border rounded-xl bg-black cursor-crosshair" />;
}
