import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Monitor,
  Layout,
  Layers,
  Move,
  Keyboard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  lunchBoxScreenshots,
  lunchBoxLogo,
} from "../assets/lunchbox-screenshots";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 80, damping: 18 },
  }),
};

/* ─── features ─── */
const features = [
  {
    icon: Layout,
    title: "Custom Snap Zones",
    desc: "Draw your own window zones instead of being stuck with whatever Apple thinks you need. Split the screen however you want",
    accent: "primary" as const,
  },
  {
    icon: Monitor,
    title: "Multi-Monitor Support",
    desc: "Different layouts for different monitors. Your ultrawide and your laptop screen don't need to play by the same rules",
    accent: "teal" as const,
  },
  {
    icon: Layers,
    title: "Multiple Layers",
    desc: "Stack layout layers so zones can overlap. Snap a window to the top half, the left third, or some weird shape you invented at 2am",
    accent: "primary" as const,
  },
  {
    icon: Move,
    title: "Drag to Snap",
    desc: "Drag a window to a zone and it snaps into place. No keyboard shortcuts to memorize, no menu diving — just drag",
    accent: "teal" as const,
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    desc: "Record custom shortcuts for any zone. For when dragging feels too slow and you'd rather just slam a hotkey",
    accent: "primary" as const,
  },
  {
    icon: Settings,
    title: "Menu Bar App",
    desc: "Lives in the menu bar, stays out of your way. Edit layouts when you need to, forget it exists the rest of the time",
    accent: "teal" as const,
  },
];

const accentClasses = {
  teal: {
    text: "text-teal",
    border: "border-teal/30",
    bg: "bg-teal",
    hoverBorder: "hover:border-teal/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]",
  },
  primary: {
    text: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary",
    hoverBorder: "hover:border-primary/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.15)]",
  },
};

/* ─── screenshot gallery ─── */
function ScreenshotGallery() {
  const [current, setCurrent] = useState(0);
  const screenshots = lunchBoxScreenshots;

  const next = () => setCurrent((c) => (c + 1) % screenshots.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-3xl">
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
export function LunchBoxPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games & Tools
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <motion.div initial="hidden" animate="visible">
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-muted-foreground rounded-md -rotate-2 border-2 border-white/[0.15] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Clock className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">In Development</span>
                </span>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.5} className="mb-4">
                <ImageWithFallback
                  src={lunchBoxLogo}
                  alt="LunchBox logo"
                  className="w-20 h-20 rounded-sm"
                />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                  LunchBox
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                A macOS menu bar app that lets you create custom window snapping
                layouts across multiple monitors. Draw your zones, snap your
                windows, stop fighting with macOS about where things go
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Built by Krooked. Because the built-in window management made him unreasonably angry
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Monitor className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">macOS</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Layout className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Window Manager</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — hero screenshot */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-teal/15 blur-[80px] rounded-full scale-125" />
                <ImageWithFallback
                  src={lunchBoxScreenshots[0].src}
                  alt="LunchBox layout editor"
                  className="relative w-full rounded-sm border-2 border-white/[0.12] shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
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
                className="text-xs uppercase tracking-[0.25em] text-teal bg-teal/10 px-3 py-1 rounded-sm border border-teal/20"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                How it works
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Draw It. Snap It. Done.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Open the layout editor, draw zones on your screen, and assign
              them names. Drag windows to a zone or hit a shortcut — they
              snap into place. Each monitor gets its own layout with as
              many layers and zones as you want
            </motion.p>
          </motion.div>

          {/* Side-by-side: two editor screenshots */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[lunchBoxScreenshots[0], lunchBoxScreenshots[1]].map(
              (shot, idx) => (
                <motion.div
                  key={shot.id}
                  variants={fadeUp}
                  custom={idx}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative w-full">
                    <div
                      className={`absolute inset-0 ${
                        idx === 0 ? "bg-teal/10" : "bg-primary/10"
                      } blur-[60px] rounded-full scale-110`}
                    />
                    <ImageWithFallback
                      src={shot.src}
                      alt={shot.label}
                      className={`relative w-full rounded-sm border-2 border-white/[0.12] ${
                        idx === 0 ? "-rotate-1" : "rotate-1"
                      } hover:rotate-0 transition-transform duration-500`}
                    />
                  </div>
                  <span
                    className="text-xs text-muted-foreground uppercase tracking-wider"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 500,
                    }}
                  >
                    {shot.label}
                  </span>
                </motion.div>
              )
            )}
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
                className="text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20"
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
              Your Screen, Your Rules
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              macOS window management that doesn't make you want to throw your laptop
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
                  className={`group p-6 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${a.hoverBorder} transition-all hover:-translate-y-2 ${a.shadow} ${tilts[i]} hover:rotate-0 rounded-sm will-change-[transform,opacity]`}
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
                className="text-xs uppercase tracking-[0.25em] text-teal bg-teal/10 px-3 py-1 rounded-sm border border-teal/20"
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
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              The layout editor, zone splitting, and windows snapped across multiple monitors
            </motion.p>
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
              Coming Soon to macOS
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              LunchBox is still in development. Custom window layouts on
              macOS without the headaches — stay tuned
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-wrap justify-center gap-4"
            >
              <div
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                <Monitor className="w-4 h-4 text-teal" />
                <span className="text-sm uppercase tracking-wider">
                  macOS · In Development
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}