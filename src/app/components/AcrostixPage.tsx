import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Smartphone,
  Trophy,
  BarChart3,
  Eye,
  Sparkles,
  Puzzle,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PhoneScreenshot } from "./PhoneScreenshot";
import {
  getScreenshot,
  getScreenshotsByMode,
  type ThemeMode,
  type ScreenName,
} from "../assets/acrostix-screenshots";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const floatPhone = {
  hidden: { opacity: 0, y: 50, rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

/* ─── gameplay flow data ─── */
const gameplaySteps: {
  screen: ScreenName;
  title: string;
  description: string;
  accent: "teal" | "primary" | "lime";
}[] = [
  {
    screen: "home",
    title: "Pick Your Word",
    description:
      "Jump into a daily challenge, explore campaign islands, or grab a random word. Each one is a blank canvas — your launchpad into whatever your brain comes up with",
    accent: "teal",
  },
  {
    screen: "challenge",
    title: "Make It Yours",
    description:
      "You get a word. Each letter starts a line. What you write is entirely up to you — build a sentence, tell a story, go completely unhinged. The game scores you on grammar, word complexity, and how well it all ties back to the word",
    accent: "primary",
  },
  {
    screen: "results",
    title: "See Your Score",
    description:
      "Grammar, creativity, relevance — it all gets broken down. Compare with your best runs, chase higher scores, or just admire whatever weird thing you wrote",
    accent: "teal",
  },
];

/* ─── visual modes ─── */
const modes: { key: ThemeMode; label: string; emoji: string; description: string }[] = [
  {
    key: "dark",
    label: "Dark Mode",
    emoji: "🌙",
    description: "Easy on the eyes for late-night word sessions",
  },
  {
    key: "light",
    label: "Light Mode",
    emoji: "☀️",
    description: "Bright and crisp for daytime creativity",
  },
  {
    key: "colorblind",
    label: "Colorblind Mode",
    emoji: "👁️",
    description: "Designed for accessibility, no compromises",
  },
];

/* ─── features list ─── */
const features = [
  {
    icon: Puzzle,
    title: "Your Words, Your Way",
    desc: "Given a word, you craft sentences where each line starts with the next letter. There's no right answer — just your creativity and whatever chaos comes out",
    accent: "teal" as const,
  },
  {
    icon: Clock,
    title: "Daily Challenges",
    desc: "A fresh word every day. Build your streak, compare your scores, or just enjoy your morning brain warmup",
    accent: "primary" as const,
  },
  {
    icon: BarChart3,
    title: "Detailed Stats",
    desc: "Track your scores, streaks, and how your writing evolves over time. The numbers don't lie (but they're very encouraging)",
    accent: "teal" as const,
  },
  {
    icon: Trophy,
    title: "Achievements",
    desc: "Unlock milestones as you play. Some are easy, some are... not. Good luck with those",
    accent: "primary" as const,
  },
  {
    icon: Eye,
    title: "Accessibility Modes",
    desc: "Dark, Light, and Colorblind themes — because word games should be for everybody",
    accent: "teal" as const,
  },
  {
    icon: Star,
    title: "Campaign Mode",
    desc: "Themed islands with related words — Animals, Sports, and more. We're building it out as we go, with plans to keep expanding if people are into it",
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
  lime: {
    text: "text-lime",
    border: "border-lime/30",
    bg: "bg-lime",
    hoverBorder: "hover:border-lime/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(132,204,22,0.15)]",
    glow: "bg-lime/10",
  },
};

/* ─── screenshot gallery with swipe ─── */
function ScreenshotGallery({ mode }: { mode: ThemeMode }) {
  const screenshots = getScreenshotsByMode(mode);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % screenshots.length);
  const prev = () => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 sm:w-56">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenshots[current].screen}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <PhoneScreenshot
              src={screenshots[current].src}
              alt={screenshots[current].label}
              bezel
              className="w-full"
            />
          </motion.div>
        </AnimatePresence>
        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Dots */}
      <div className="flex gap-2">
        {screenshots.map((s, i) => (
          <button
            key={s.screen}
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
export function AcrostixPage() {
  const [activeMode, setActiveMode] = useState<ThemeMode>("dark");

  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Back nav ── */}
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              initial="hidden"
              animate="visible"
            >
              {/* Coming Soon badge */}
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-black rounded-md -rotate-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Coming Soon</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                  Acrostix
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                A creative word game where you build sentences from acrostic
                words — then get scored on grammar, complexity, and how well
                it all ties together. Your words, your rules
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Designed by Lilly. Built by Krooked. Powered by an unhealthy obsession with word games
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Smartphone className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">iOS & Android</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Puzzle className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Creative Word Game</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — hero phone */}
            <motion.div
              className="flex justify-center lg:justify-end"
              variants={floatPhone}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                {/* Soft glow behind phone */}
                <div className="absolute inset-0 bg-teal/15 blur-[80px] rounded-full scale-125" />
                <PhoneScreenshot
                  src={getScreenshot("dark", "home").src}
                  alt="Acrostix Home Screen"
                  bezel
                  className="relative w-56 sm:w-64 md:w-72"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT IS ACROSTIX ═══════════ */}
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
                What is it?
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Not Your Average Word Game
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              You get a word. Each letter becomes the start of a new line. What
              you write is completely up to you — form a sentence, tell a micro-story,
              go weird with it. The game scores you on grammar, word complexity, and
              how well your creation ties back to the original word. It's creative
              writing meets word play, and it's way more fun than it has any right to be
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ GAMEPLAY FLOW ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
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
              className="text-3xl sm:text-5xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Word. Write. Score.
            </motion.h2>
          </motion.div>

          <div className="space-y-28">
            {gameplaySteps.map((step, idx) => {
              const screenshot = getScreenshot("dark", step.screen);
              const isEven = idx % 2 === 0;
              const a = accentClasses[step.accent];
              const rotations = ["-rotate-2", "rotate-2", "-rotate-1"];
              return (
                <motion.div
                  key={step.screen}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    isEven ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Phone */}
                  <motion.div
                    variants={fadeUp}
                    custom={0}
                    className={`flex justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 ${a.glow} blur-[80px] rounded-full scale-125`} />
                      <PhoneScreenshot
                        src={screenshot.src}
                        alt={screenshot.label}
                        bezel
                        className={`relative w-48 sm:w-56 ${rotations[idx]} hover:rotate-0 transition-transform duration-500`}
                      />
                    </div>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    variants={fadeUp}
                    custom={1}
                    className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    {/* Step number */}
                    <div
                      className={`inline-flex items-center gap-3 mb-4`}
                    >
                      <span
                        className={`w-10 h-10 ${a.bg} text-black flex items-center justify-center rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]`}
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.25rem",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`text-xs uppercase tracking-[0.2em] ${a.text}`}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        Step {idx + 1}
                      </span>
                    </div>

                    <h3
                      className="text-foreground mb-4"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-muted-foreground max-w-md"
                      style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ VISUAL MODES ═══════════ */}
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
                className="text-xs uppercase tracking-[0.25em] text-lime bg-lime/10 px-3 py-1 rounded-sm border border-lime/20"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Accessibility
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Style, Your Game
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Three visual modes so everyone gets a great experience.
              Because puzzles should be for everybody
            </motion.p>
          </motion.div>

          {/* Mode switcher */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-2 p-1.5 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
              {modes.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveMode(m.key)}
                  className={`px-5 py-2.5 rounded-sm transition-all text-xs uppercase tracking-wider ${
                    activeMode === m.key
                      ? "bg-teal text-black shadow-[2px_2px_0px_0px_rgba(34,211,238,0.4)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <span className="mr-1.5">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery + description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="flex justify-center"
            >
              <ScreenshotGallery mode={activeMode} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              {modes.map((m) => (
                <AnimatePresence key={m.key} mode="wait">
                  {activeMode === m.key && (
                    <motion.div
                      key={m.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="text-4xl mb-4 block">{m.emoji}</span>
                      <h3
                        className="text-foreground mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.75rem",
                        }}
                      >
                        {m.label}
                      </h3>
                      <p
                        className="text-muted-foreground max-w-md"
                        style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                      >
                        {m.description}
                      </p>
                      <div className="mt-6 flex gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-xs text-muted-foreground uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
                        >
                          <Eye className="w-3 h-3" />
                          6 Screens
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-xs text-muted-foreground uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
                        >
                          Swipe to browse
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </motion.div>
          </div>
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
              Packed With Good Stuff
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              It's a word game, but it's also kind of a whole thing
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const a = accentClasses[feat.accent];
              const tilts = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-1", "-rotate-1"];
              return (
                <motion.div
                  key={feat.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`group p-6 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${tilts[i]} hover:rotate-0 rounded-sm will-change-transform`}
                >
                  <div
                    className={`w-12 h-12 ${a.bg} flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:-rotate-6 rounded-sm`}
                  >
                    <feat.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3
                    className="text-foreground mb-2 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem" }}
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

      {/* ═══════════ STATS + ACHIEVEMENTS PREVIEW ═══════════ */}
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
                Progress
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Track Your Journey
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Every word you play tells a different story. Stats, streaks, and achievements
              — all yours to obsess over
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12"
          >
            <motion.div variants={fadeUp} custom={0} className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-125" />
              <PhoneScreenshot
                src={getScreenshot("dark", "stats").src}
                alt="Stats Screen"
                bezel
                className="relative w-44 sm:w-52 -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <span
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs uppercase tracking-wider rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] rotate-2"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Stats
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="relative">
              <div className="absolute inset-0 bg-teal/10 blur-[60px] rounded-full scale-125" />
              <PhoneScreenshot
                src={getScreenshot("dark", "achievements").src}
                alt="Achievements Screen"
                bezel
                className="relative w-44 sm:w-52 rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <span
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal text-black text-xs uppercase tracking-wider rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] -rotate-2"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Achievements
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/8 rounded-full blur-[160px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-teal -rotate-12" />
              <Puzzle className="w-6 h-6 text-primary rotate-12" />
              <Sparkles className="w-5 h-5 text-lime -rotate-6" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to Get Wordy?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground mb-8 max-w-lg mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Acrostix is coming soon to iOS and Android. We're putting the
              finishing touches on it right now and honestly can't wait for you
              to try it. Stay tuned
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Sparkles className="w-4 h-4" />
                Get Notified
              </Link>
              <Link
                to="/games"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 hover:border-white/40 rounded-md transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}