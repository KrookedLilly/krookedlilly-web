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

// Pre-render a glow sprite for each unique color into an offscreen canvas
function createGlowCache(colors: string[], maxGlowSize: number, dpr: number): Map<string, HTMLCanvasElement> {
  const cache = new Map<string, HTMLCanvasElement>();
  const size = Math.ceil(maxGlowSize * 2 * dpr);
  for (const color of colors) {
    if (cache.has(color)) continue;
    const oc = document.createElement("canvas");
    oc.width = size;
    oc.height = size;
    const octx = oc.getContext("2d");
    if (!octx) continue;
    const center = size / 2;
    const radius = maxGlowSize * dpr;
    const gradient = octx.createRadialGradient(center, center, 0, center, center, radius);
    gradient.addColorStop(0, `rgba(${color},0.4)`);
    gradient.addColorStop(1, `rgba(${color},0)`);
    octx.fillStyle = gradient;
    octx.fillRect(0, 0, size, size);
    cache.set(color, oc);
  }
  return cache;
}

export function GlassParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GlassParticle[]>([]);
  const animRef = useRef<number>(0);
  const dims = useRef({ w: 0, h: 0 });
  const glowCacheRef = useRef<Map<string, HTMLCanvasElement>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxGlowSize = 3.4 * (2.5 + 3); // max size * max glow multiplier

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
      glowCacheRef.current = createGlowCache(COLORS, maxGlowSize, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let hidden = false;

    const onVisibility = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (hidden) return;

      const { w, h } = dims.current;
      if (w === 0 || h === 0) return;
      time += 0.005;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle drift
        p.x += Math.cos(p.angle) * p.speed * 0.5;
        p.y += Math.sin(p.angle) * p.speed * 0.3;
        p.angle += Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.01;

        // Wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Opacity pulse
        const pulsed = Math.max(
          0.1,
          p.baseOpacity + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.12
        );

        // Draw pre-cached glow sprite
        if (p.glowSize > 0) {
          const sprite = glowCacheRef.current.get(p.color);
          if (sprite) {
            const drawSize = p.glowSize * 2;
            ctx.globalAlpha = pulsed;
            ctx.drawImage(sprite, p.x - p.glowSize, p.y - p.glowSize, drawSize, drawSize);
            ctx.globalAlpha = 1;
          }
        }

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${pulsed})`;
        ctx.fill();
      }
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}