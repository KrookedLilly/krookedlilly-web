import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Smartphone,
  Clock,
  Palette,
  Target,
  Gift,
  Snowflake,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PhoneScreenshot } from "./PhoneScreenshot";
import {
  ballDropScreenshots,
} from "../assets/balldrop-screenshots";

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

/* ─── cosmetics / modes showcase ─── */
const cosmeticModes = [
  {
    screenshot: ballDropScreenshots[0],
    title: "Neon",
    description:
      "The default look. Glowing balls, dark background, satisfying catches. Classic arcade vibes",
    accent: "primary" as const,
  },
  {
    screenshot: ballDropScreenshots[1],
    title: "Beer Pong",
    description:
      "Red cups, bouncing balls, and questionable life choices. A whole cosmetic overhaul that changes everything you see",
    accent: "teal" as const,
  },
  {
    screenshot: ballDropScreenshots[2],
    title: "Basketball",
    description:
      "Hoops, hardwood, and basketballs raining from above. Slam dunk your way to a high score",
    accent: "primary" as const,
  },
  {
    screenshot: ballDropScreenshots[3],
    title: "Christmas",
    description:
      "Ornaments, presents, a cat by the fireplace. Seasonal drip for when you're feeling festive",
    accent: "teal" as const,
  },
];

/* ─── features ─── */
const features = [
  {
    icon: Target,
    title: "Drop & Catch",
    desc: "Balls drop from the top. You catch them at the bottom. Miss too many and it's over. Simple enough for anyone, tricky enough to keep you coming back",
    accent: "teal" as const,
  },
  {
    icon: Palette,
    title: "Tons of Cosmetics",
    desc: "Unlock entirely different visual themes that change the balls, the catcher, the background — everything. Way more drip than an arcade game has any right to have",
    accent: "primary" as const,
  },
  {
    icon: Trophy,
    title: "Highscore Hunting",
    desc: "Each round escalates. Catch streaks multiply your score. The game gets faster and more chaotic until you either clutch it or crumble",
    accent: "teal" as const,
  },
  {
    icon: Sparkles,
    title: "Score Multipliers",
    desc: "Build catch streaks to earn multipliers. The longer you go without missing, the bigger your points stack up. One miss resets everything",
    accent: "primary" as const,
  },
  {
    icon: Gift,
    title: "Unlock Everything",
    desc: "New cosmetics unlock as you play — no pay-to-win, no loot boxes. Just play the game and earn your drip",
    accent: "teal" as const,
  },
  {
    icon: Snowflake,
    title: "Seasonal Themes",
    desc: "Holiday-themed cosmetics that transform the whole game. Christmas, and more to come. Each one is a complete visual overhaul",
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
  const screenshots = ballDropScreenshots;

  const next = () => setCurrent((c) => (c + 1) % screenshots.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 sm:w-56">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenshots[current].id}
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
export function BallDropPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(160,92,246,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <motion.div initial="hidden" animate="visible">
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-muted-foreground rounded-md -rotate-2 border-2 border-white/[0.15] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Clock className="w-4 h-4 text-teal" />
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
                  50 Ball Drop
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                An arcade ball-catcher with more cosmetic options than games
                ten times its size. Drop balls, catch them, build streaks,
                and unlock a ridiculous amount of visual themes that completely
                transform the game
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Designed by Lilly. Built by Krooked. Contains more cosmetics than common sense
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Smartphone className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">Mobile</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Arcade</span>
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
              <PhoneScreenshot
                  src={ballDropScreenshots[4].src}
                  alt="50 Ball Drop - Home Screen"
                  bezel
                  className="w-56 sm:w-64 md:w-72"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ COSMETICS SHOWCASE ═══════════ */}
      <section className="py-24 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
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
                Cosmetics
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Way Too Much Drip
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Each cosmetic theme completely transforms the game — balls,
              catchers, backgrounds, effects, all of it. Unlock them by playing.
              No microtransactions, no loot boxes, just earn and equip
            </motion.p>
          </motion.div>

          <div className="space-y-28">
            {cosmeticModes.map((mode, idx) => {
              const isEven = idx % 2 === 0;
              const a = accentClasses[mode.accent];
              const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];
              return (
                <motion.div
                  key={mode.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
                >
                  {/* Phone */}
                  <motion.div
                    variants={fadeUp}
                    custom={0}
                    className={`flex justify-center ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`absolute inset-0 ${a.glow} blur-[80px] rounded-full scale-125`}
                      />
                      <PhoneScreenshot
                        src={mode.screenshot.src}
                        alt={mode.screenshot.label}
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
                    <div className="inline-flex items-center gap-3 mb-4">
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
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                        }}
                      >
                        Theme
                      </span>
                    </div>

                    <h3
                      className="text-foreground mb-4"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                      }}
                    >
                      {mode.title}
                    </h3>
                    <p
                      className="text-muted-foreground max-w-md"
                      style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                    >
                      {mode.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
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
              More Than Just Dropping Balls
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Okay, it's mostly dropping balls. But the rest of it is pretty good too
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

      {/* ═══════════ ALL SCREENSHOTS ═══════════ */}
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
                Gallery
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All The Screenshots
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
              Ready to Drop?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Coming soon to mobile. Free to play,
              free to waste an unreasonable amount of time on
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-wrap justify-center gap-4"
            >
              <div
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                <Smartphone className="w-4 h-4 text-teal" />
                <span className="text-sm uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}