import { useEffect, useRef } from "react";

/**
 * Lightweight particle overlay for frosted-glass surfaces.
 * Renders bright brand-colored dots on a transparent canvas with
 * mix-blend-mode: screen so only the light adds to the glass —
 * sits ABOVE the backdrop-blur layer, BELOW the text content.
 */

interface GlassParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  angle: number;
  speed: number;
  pulseOffset: number;
  pulseSpeed: number;
  glowSize: number;
}

const COLORS = [
  "160,92,246", // violet
  "160,92,246",
  "34,211,238", // cyan
  "34,211,238",
  "124,58,237", // violet-shade
  "220,220,215", // soft white
];

const PARTICLE_COUNT = 18;

export function GlassParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GlassParticle[]>([]);
  const animRef = useRef<number>(0);
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = (w: number, h: number): GlassParticle[] => {
      const particles: GlassParticle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const size = 1.2 + Math.random() * 2.2;
        const baseOpacity = 0.35 + Math.random() * 0.45;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          opacity: baseOpacity,
          baseOpacity,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          angle: Math.random() * Math.PI * 2,
          speed: 0.08 + Math.random() * 0.18,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.25 + Math.random() * 0.5,
          glowSize: size * (2.5 + Math.random() * 3),
        });
      }
      return particles;
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dims.current = { w, h };
      particlesRef.current = initParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      const { w, h } = dims.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      time += 0.005;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle drift
        p.x += Math.cos(p.angle) * p.speed * 0.5;
        p.y += Math.sin(p.angle) * p.speed * 0.3;
        p.angle += Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.01;

        // Wrap horizontally, bounce vertically within bounds
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Opacity pulse
        const pulsed = Math.max(
          0.1,
          p.baseOpacity + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.12
        );

        // Glow halo
        if (p.glowSize > 0) {
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.glowSize
          );
          gradient.addColorStop(0, `rgba(${p.color},${pulsed * 0.4})`);
          gradient.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${pulsed})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: "screen", filter: "blur(3px)" }}
      aria-hidden="true"
    />
  );
}