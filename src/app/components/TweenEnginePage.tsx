import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Waves,
  Play,
  Link2,
  Timer,
  Zap,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageMeta } from "./PageMeta";

/* ─── media (wire these up as assets arrive) ─── */
const pageIcon: string | null = null;
const promoImage: string | null = null;
const screenshots: { id: string; src: string; label: string }[] = [];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─── features ─── */
const features = [
  {
    icon: Waves,
    title: "Easing Library",
    desc: "30+ curves out of the box — quad, cubic, bounce, elastic, back. Or drop in your own AnimationCurve",
    accent: "teal" as const,
  },
  {
    icon: Link2,
    title: "Chainable API",
    desc: "Fluent builder syntax. Tween from A to B, then C, then loop, then callback — all in one line",
    accent: "primary" as const,
  },
  {
    icon: Play,
    title: "Sequences",
    desc: "Play tweens in parallel, in sequence, or a mix. Delays, staggers, and groups built in",
    accent: "teal" as const,
  },
  {
    icon: Timer,
    title: "Timeline Control",
    desc: "Play, pause, reverse, seek. Treat tweens like video — scrub to any point in time",
    accent: "primary" as const,
  },
  {
    icon: Zap,
    title: "Zero GC",
    desc: "Pooled internally so your animations don't trigger garbage collection mid-frame. Smooth all the way down",
    accent: "teal" as const,
  },
  {
    icon: Package,
    title: "Unity Asset Store",
    desc: "Import the package, wire up a tween, see motion. Works with any UI Toolkit property",
    accent: "primary" as const,
  },
];

const accentClasses = {
  teal: {
    text: "text-teal",
    border: "border-teal/30",
    bg: "bg-teal",
    hoverBorder: "hover:border-teal/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]",
    glow: "bg-teal/10",
  },
  primary: {
    text: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary",
    hoverBorder: "hover:border-primary/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.15)]",
    glow: "bg-primary/10",
  },
};

/* ─── screenshot gallery ─── */
function ScreenshotGallery() {
  const [current, setCurrent] = useState(0);
  if (screenshots.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % screenshots.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenshots[current].id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-sm overflow-hidden border-2 border-white/[0.12]">
              <ImageWithFallback
                src={screenshots[current].src}
                alt={screenshots[current].label}
                className="w-full aspect-video object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prev}
          className="absolute left-[-1rem] sm:left-[-2rem] top-1/2 -translate-y-1/2 w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-[-1rem] sm:right-[-2rem] top-1/2 -translate-y-1/2 w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2">
        {screenshots.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-teal w-5" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
      <span
        className="text-xs text-muted-foreground uppercase tracking-wider"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        {screenshots[current].label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function TweenEnginePage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="UI Toolkit: Tween Engine"
        description="UI Toolkit: Tween Engine — a chainable, zero-GC tween library built for Unity's UI Toolkit. Bring motion to static layouts."
        path="/tools/tween-engine"
      />
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(160,92,246,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <motion.div initial="hidden" animate="visible">
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] border-2 border-white/[0.12] text-muted-foreground rounded-md -rotate-2"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">In Development</span>
                </span>
              </motion.div>

              {pageIcon && (
                <motion.div variants={fadeUp} custom={0.5} className="mb-4">
                  <ImageWithFallback
                    src={pageIcon}
                    alt="UI Toolkit: Tween Engine icon"
                    className="w-16 h-16 rounded-sm"
                  />
                </motion.div>
              )}

              <motion.p
                variants={fadeUp}
                custom={0.75}
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-3"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                UI Toolkit
              </motion.p>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                  Tween Engine
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                A chainable tween library purpose-built for UI Toolkit. Fluid easing curves, sequences, timeline scrubbing — and zero garbage while it runs
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Built by Krooked. Coming to the Unity Asset Store
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Package className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">Unity Asset</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Waves className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Animation</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — promo image or placeholder */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="w-full max-w-lg">
                {promoImage ? (
                  <ImageWithFallback
                    src={promoImage}
                    alt="UI Toolkit: Tween Engine — Chainable Motion For UI Toolkit"
                    className="w-full rounded-sm border-2 border-white/[0.12] shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]"
                  />
                ) : (
                  <div className="w-full aspect-video rounded-sm border-2 border-white/[0.12] bg-gradient-to-br from-teal/20 via-white/[0.04] to-primary/20 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
                      <Waves className="w-16 h-16" />
                      <span
                        className="text-xs uppercase tracking-[0.25em]"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        Preview Coming Soon
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT IT DOES ═══════════ */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <span
                className="text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                What it does
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              UI That Moves
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Static UI is a missed opportunity. Tween Engine animates any UI Toolkit property — position, color, opacity, custom USS variables — with a clean chainable API and curves that actually feel good
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <span
                className="text-xs uppercase tracking-[0.25em] text-teal bg-teal/10 px-3 py-1 rounded-sm border border-teal/20"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Features
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Curve You Need
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              A modern tween API that plays nice with UI Toolkit's data binding and USS
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const a = accentClasses[feat.accent];
              const tilts = [
                "-rotate-1",
                "rotate-1",
                "-rotate-2",
                "rotate-2",
                "rotate-1",
                "-rotate-1",
              ];
              return (
                <motion.div
                  key={feat.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`group p-6 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${tilts[i]} hover:rotate-0 rounded-sm will-change-transform`}
                >
                  <div
                    className={`w-12 h-12 ${a.bg} flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:-rotate-6 rounded-sm`}
                  >
                    <feat.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3
                    className="text-foreground mb-2 uppercase tracking-wide"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ SCREENSHOTS GALLERY ═══════════ */}
      {screenshots.length > 0 && (
        <section className="py-24 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
                <span
                  className="text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Screenshots
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-5xl text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                See It In Action
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="flex justify-center"
            >
              <ScreenshotGallery />
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-5xl text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Coming To The Asset Store
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Tween Engine is in active development. Want early access or have feature requests? Reach out
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Get In Touch
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default TweenEnginePage;
