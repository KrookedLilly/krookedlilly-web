import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
  Keyboard,
  Gauge,
  Gamepad2,
  Settings,
  Zap,
  Package,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  heKeyboardsScreenshots,
  heKeyboardsPromoImage,
  heKeyboardsIcon,
} from "../assets/hekeyboards-screenshots";

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
    icon: Gauge,
    title: "Analog Key Values",
    desc: "Read exact pressure values from each key — not just on/off. WASD becomes a throttle, not a light switch",
    accent: "primary" as const,
  },
  {
    icon: Gamepad2,
    title: "Racing & Flight Ready",
    desc: "Use your keyboard like analog sticks. Pressure-sensitive steering, throttle, and braking without a controller",
    accent: "teal" as const,
  },
  {
    icon: Settings,
    title: "Easy Integration",
    desc: "Drop it into your Unity project, map your keys, and start reading analog values. Minimal setup, maximum payoff",
    accent: "primary" as const,
  },
  {
    icon: Keyboard,
    title: "Hall Effect Support",
    desc: "Built for Hall Effect keyboards that output analog signals. Finally a reason those fancy switches are worth it",
    accent: "teal" as const,
  },
  {
    icon: Zap,
    title: "Real-Time Input",
    desc: "Live analog readouts with zero perceptible latency. Pressure values update every frame, smooth as butter",
    accent: "primary" as const,
  },
  {
    icon: Package,
    title: "Unity Asset Store",
    desc: "Available on the Unity Asset Store. Import the package, follow the docs, ship your game with analog keyboard support",
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
  const screenshots = heKeyboardsScreenshots;

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
              i === current ? "bg-primary w-5" : "bg-white/20 hover:bg-white/40"
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
export function HEKeyboardsPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(160,92,246,0.10)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(34,211,238,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider mb-8"
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-lime text-black rounded-md -rotate-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Released</span>
                </span>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.5} className="mb-4">
                <ImageWithFallback
                  src={heKeyboardsIcon}
                  alt="HE Keyboards icon"
                  className="w-16 h-16 rounded-sm"
                />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  HE Keyboards
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                A Unity plugin that adds Hall Effect keyboard compatibility to
                your game. Read analog pressure values from individual keys and
                turn a keyboard into a proper analog input device
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Built by Krooked. Available on the Unity Asset Store
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Keyboard className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Unity Asset</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Gauge className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">Analog Input</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — promo image */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="w-full max-w-lg">
                <ImageWithFallback
                  src={heKeyboardsPromoImage}
                  alt="HE Keyboards — Apply Pressure Sensitive Keyboard Inputs To Your Game"
                  className="w-full rounded-sm border-2 border-white/[0.12] shadow-[6px_6px_0px_0px_rgba(160,92,246,0.15)]"
                />
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
                className="text-xs uppercase tracking-[0.25em] text-teal bg-teal/10 px-3 py-1 rounded-sm border border-teal/20"
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
              Your Keyboard, But Analog
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Hall Effect keyboards can detect how far a key is pressed — not
              just whether it's down. HE Keyboards lets Unity games read those
              analog values so players can use pressure-sensitive controls
              without needing a controller
            </motion.p>
          </motion.div>

          {/* Demo image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl mx-auto"
          >
            <ImageWithFallback
              src={heKeyboardsScreenshots[0].src}
              alt="Analog pedal and steering values demo"
              className="w-full rounded-sm border-2 border-white/[0.12] rotate-[0.5deg] hover:rotate-0 transition-transform duration-500"
            />
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
              Pressure Is a Feature
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Everything you need to make Hall Effect keyboards actually useful in your game
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
              Analog pedal and steering values from a Hall Effect keyboard driving a racing demo
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
              Add Analog Keyboard Support
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Available now on the Unity Asset Store. Give your players
              pressure-sensitive keyboard controls with minimal effort
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="https://assetstore.unity.com/packages/tools/utilities/he-keyboard-364800"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Unity Asset Store
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
