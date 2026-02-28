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
  depth: number;
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

const BACK_COUNT = 110;
const FRONT_COUNT = 35;
const BACK_PARALLAX = 28;
const FRONT_PARALLAX = 85;
const LERP_FACTOR = 0.04;

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const dimensions = useRef({ w: 0, h: 0 });

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
          depth: Math.random() * 0.3, // shallow depth range
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.15 + Math.random() * 0.4,
          layer: "back",
          glowSize: 0,
        });
      }
    }

    // ── Front layer: random scatter ──
    for (let i = 0; i < FRONT_COUNT; i++) {
      const depth = 0.5 + Math.random() * 0.5; // 0.5–1.0 depth range
      const baseOpacity = 0.25 + depth * 0.4;
      const size = 1.3 + depth * 2.4;
      particles.push({
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        size,
        opacity: baseOpacity,
        baseOpacity,
        color: FRONT_COLORS[Math.floor(Math.random() * FRONT_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.3,
        depth,
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
      // Regenerate particles to fill new viewport
      particlesRef.current = initParticles(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseTarget.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouse);

    // Touch support
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseTarget.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: e.touches[0].clientY / window.innerHeight,
        };
      }
    };
    window.addEventListener("touchmove", handleTouch, { passive: true });

    let time = 0;

    const animate = () => {
      const { w, h } = dimensions.current;
      time += 0.006;

      ctx.clearRect(0, 0, w, h);

      // Smooth lerp toward target mouse
      mouseCurrent.current.x +=
        (mouseTarget.current.x - mouseCurrent.current.x) * LERP_FACTOR;
      mouseCurrent.current.y +=
        (mouseTarget.current.y - mouseCurrent.current.y) * LERP_FACTOR;

      const mx = (mouseCurrent.current.x - 0.5) * 2; // -1 to 1
      const my = (mouseCurrent.current.y - 0.5) * 2;

      const particles = particlesRef.current;

      // Draw back layer first, then front layer (painters order)
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

        // Layer-specific parallax
        const maxP = p.layer === "back" ? BACK_PARALLAX : FRONT_PARALLAX;
        const parallaxX = mx * p.depth * maxP;
        const parallaxY = my * p.depth * maxP;

        const drawX = p.baseX + parallaxX;
        const drawY = p.baseY + parallaxY;

        // Opacity pulse
        const pulsedOpacity = Math.max(
          0,
          p.baseOpacity +
            Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.05
        );

        if (p.layer === "front" && p.glowSize > 0) {
          // Front layer: draw soft glow halo behind the dot
          const gradient = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.glowSize
          );
          gradient.addColorStop(
            0,
            `rgba(${p.color},${pulsedOpacity * 0.35})`
          );
          gradient.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${pulsedOpacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
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