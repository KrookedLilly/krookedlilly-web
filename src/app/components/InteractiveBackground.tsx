import { useEffect, useRef, useCallback } from "react";

interface Particle {
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  angle: number;
  speed: number;
  pulseOffset: number;
  pulseSpeed: number;
  layer: "back" | "front";
  glowSize: number;
}

// Back layer: dimmer, whiter — distant starfield feel
const BACK_COLORS = [
  "220,220,215", // warm white
  "220,220,215",
  "200,190,230", // faint lavender
  "180,220,230", // faint cyan tint
  "160,92,246",  // violet (rare pop)
  "34,211,238",  // cyan (rare pop)
];

// Front layer: brand-heavy — close floating motes
const FRONT_COLORS = [
  "160,92,246", // violet
  "160,92,246",
  "34,211,238", // cyan
  "34,211,238",
  "124,58,237", // violet-shade accent
  "240,240,232", // white
];

const BACK_COUNT = 60;
const FRONT_COUNT = 20;

// Pre-render glow sprites for front-layer particles
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
    gradient.addColorStop(0, `rgba(${color},0.35)`);
    gradient.addColorStop(1, `rgba(${color},0)`);
    octx.fillStyle = gradient;
    octx.fillRect(0, 0, size, size);
    cache.set(color, oc);
  }
  return cache;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const dimensions = useRef({ w: 0, h: 0 });
  const glowCacheRef = useRef<Map<string, HTMLCanvasElement>>(new Map());

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];

    // ── Back layer: jittered grid layout ──
    // Calculate grid cells to distribute ~BACK_COUNT dots evenly
    const aspect = w / h;
    const cols = Math.round(Math.sqrt(BACK_COUNT * aspect));
    const rows = Math.round(BACK_COUNT / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Position within cell + random jitter (up to 80% of cell size)
        const jitterX = (Math.random() - 0.5) * cellW * 0.8;
        const jitterY = (Math.random() - 0.5) * cellH * 0.8;
        const x = (col + 0.5) * cellW + jitterX;
        const y = (row + 0.5) * cellH + jitterY;

        const baseOpacity = 0.15 + Math.random() * 0.25;
        particles.push({
          baseX: x,
          baseY: y,
          size: 1.0 + Math.random() * 1.8,
          opacity: baseOpacity,
          baseOpacity,
          color: BACK_COLORS[Math.floor(Math.random() * BACK_COLORS.length)],
          angle: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.08,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.15 + Math.random() * 0.4,
          layer: "back",
          glowSize: 0,
        });
      }
    }

    // ── Front layer: random scatter ──
    for (let i = 0; i < FRONT_COUNT; i++) {
      const sizeVar = 0.5 + Math.random() * 0.5; // 0.5–1.0 variation
      const baseOpacity = 0.25 + sizeVar * 0.4;
      const size = 1.3 + sizeVar * 2.4;
      particles.push({
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        size,
        opacity: baseOpacity,
        baseOpacity,
        color: FRONT_COLORS[Math.floor(Math.random() * FRONT_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.3 + Math.random() * 0.7,
        layer: "front",
        glowSize: size * (2.5 + Math.random() * 3), // soft glow radius
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastWidth = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimensions.current = { w, h };
      // Only regenerate particles when width changes (not on mobile address bar show/hide)
      if (w !== lastWidth) {
        lastWidth = w;
        particlesRef.current = initParticles(w, h);
        const maxGlow = 3.7 * (2.5 + 3);
        glowCacheRef.current = createGlowCache(FRONT_COLORS, maxGlow, dpr);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let hidden = false;
    let lastFrame = performance.now();

    const onVisibility = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = (now: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (hidden) { lastFrame = now; return; }

      // Delta-time with cap to prevent burst accumulation during overscroll
      const delta = Math.min(now - lastFrame, 33.33); // cap at ~30fps
      lastFrame = now;
      const dt = delta / 16.667; // normalize to 60fps baseline

      const { w, h } = dimensions.current;
      time += 0.006 * dt;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic drift
        p.baseX += Math.cos(p.angle) * p.speed * 0.4;
        p.baseY += Math.sin(p.angle) * p.speed * 0.4;
        p.angle += Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.008;

        // Wrap edges
        if (p.baseX < -40) p.baseX = w + 40;
        if (p.baseX > w + 40) p.baseX = -40;
        if (p.baseY < -40) p.baseY = h + 40;
        if (p.baseY > h + 40) p.baseY = -40;

        const drawX = p.baseX;
        const drawY = p.baseY;

        // Opacity pulse
        const pulsedOpacity = Math.max(
          0,
          p.baseOpacity +
            Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.05
        );

        if (p.layer === "front" && p.glowSize > 0) {
          // Draw pre-cached glow sprite instead of creating gradient per frame
          const sprite = glowCacheRef.current.get(p.color);
          if (sprite) {
            const drawSize = p.glowSize * 2;
            ctx.globalAlpha = pulsedOpacity;
            ctx.drawImage(sprite, drawX - p.glowSize, drawY - p.glowSize, drawSize, drawSize);
            ctx.globalAlpha = 1;
          }
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${pulsedOpacity})`;
        ctx.fill();
      }
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}