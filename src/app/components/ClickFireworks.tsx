import { useEffect, useRef } from "react";

/**
 * Click-anywhere firework bursts.
 * Spawns a spray of brand-colored sparks on every mouse click,
 * with gravity, drag, and fadeout. Pure canvas — no DOM clutter.
 */

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  r: number;
  g: number;
  b: number;
  life: number; // 1 → 0
  decay: number;
  gravity: number;
}

const PALETTE = [
  "#a05cf6", // violet
  "#7c3aed", // violet-shade
  "#22d3ee", // cyan
  "#84cc16", // lime pop
  "#f0f0e8", // warm white
  "#a05cf6",
  "#22d3ee",
];

const SPARKS_PER_BURST = 22;

export function ClickFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Spawn burst ──
    const MAX_SPARKS = 66; // Cap at 3 simultaneous bursts

    const spawnBurst = (x: number, y: number) => {
      if (sparksRef.current.length >= MAX_SPARKS) return;
      for (let i = 0; i < SPARKS_PER_BURST; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 1.5 + Math.random() * 2.5,
          color,
          r, g, b,
          life: 1,
          decay: 0.015 + Math.random() * 0.015,
          gravity: 0.06 + Math.random() * 0.04,
        });
      }

      // Kick off animation loop if not already running
      if (!runningRef.current) {
        runningRef.current = true;
        animate();
      }
    };

    // ── Click handler ──
    const handleClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };
    window.addEventListener("click", handleClick);

    // ── Touch support ──
    const handleTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        spawnBurst(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
      }
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });

    // ── Animation loop ──
    const animate = () => {
      const sparks = sparksRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];

        // Physics
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity;
        s.vx *= 0.98; // drag
        s.vy *= 0.98;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Draw glow + dot using pre-computed RGB
        const alpha = s.life;
        const glowRadius = s.size * (2 + s.life * 2);

        // Soft glow
        const gradient = ctx.createRadialGradient(
          s.x, s.y, 0,
          s.x, s.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha})`;
        ctx.fill();
      }

      if (sparks.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Nothing to draw — stop looping to save CPU
        runningRef.current = false;
      }
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99]"
      aria-hidden="true"
    />
  );
}

