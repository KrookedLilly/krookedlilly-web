import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Smartphone,
  CheckCircle,
  Clock,
  Brain,
  Grid3X3,
  Timer,
  Trophy,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PhoneScreenshot } from "./PhoneScreenshot";
import {
  matchFivesScreenshots,
} from "../assets/matchfives-screenshots";

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
  hidden: { opacity: 0, y: 50, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

/* ─── features ─── */
const features = [
  {
    icon: Grid3X3,
    title: "Simple Grid, Deep Strategy",
    desc: "Match adjacent numbers on a grid. The bigger the match chains, the higher the numbers climb. One wrong move and you're stuck with a board full of mismatches",
    accent: "primary" as const,
  },
  {
    icon: Brain,
    title: "Easy to Learn",
    desc: "Tap two matching numbers to combine them. That's it. You'll figure it out in about five seconds and then spend the next hour chasing a better score",
    accent: "teal" as const,
  },
  {
    icon: Trophy,
    title: "Highscore Chasing",
    desc: "Every game generates a different board. The fun is in figuring out the optimal move order and watching numbers multiply. Then doing it again because you know you can do better",
    accent: "primary" as const,
  },
  {
    icon: Timer,
    title: "Quick Sessions",
    desc: "A round takes a couple minutes. Perfect for waiting rooms, bus rides, or pretending to be busy in a meeting",
    accent: "teal" as const,
  },
  {
    icon: Zap,
    title: "No Timers, No Pressure",
    desc: "Take your time and think it through, or tap fast and wing it. There's no clock ticking — just you and the numbers",
    accent: "primary" as const,
  },
  {
    icon: CheckCircle,
    title: "Offline Friendly",
    desc: "No internet required. No ads interrupting your flow. Just the game",
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
  const screenshots = matchFivesScreenshots;

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
export function MatchFivesPage() {
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-muted-foreground rounded-md -rotate-2 border-2 border-white/[0.15] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Coming Soon</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Match Fives
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                A number matching puzzle where you combine tiles on a grid to
                build bigger numbers and chase high scores. Simple rules, deep
                strategy, and the kind of "one more round" energy that eats
                your whole afternoon
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Designed by Lilly. Built by Krooked. Best played when you should be doing something else
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-wider">Mobile</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  <Grid3X3 className="w-4 h-4 text-teal" />
                  <span className="text-sm uppercase tracking-wider">Number Matching</span>
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
                src={matchFivesScreenshots[0].src}
                alt="Match Fives - Train Your Brain"
                bezel
                className="w-56 sm:w-64 md:w-72"
              />
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
              Match. Merge. Multiply.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Tap two matching numbers next to each other to merge them into
              one bigger number. Chain matches together to multiply your score.
              The board fills up fast — plan ahead or accept your fate
            </motion.p>
          </motion.div>

          {/* Side-by-side: two screenshots showing before/after */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            {[matchFivesScreenshots[1], matchFivesScreenshots[3]].map(
              (shot, idx) => (
                <motion.div
                  key={shot.id}
                  variants={fadeUp}
                  custom={idx}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-0 ${
                        idx === 0 ? "bg-primary/10" : "bg-teal/10"
                      } blur-[60px] rounded-full scale-125`}
                    />
                    <PhoneScreenshot
                      src={shot.src}
                      alt={shot.label}
                      bezel
                      className={`relative w-44 sm:w-48 ${
                        idx === 0 ? "-rotate-2" : "rotate-2"
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
              Small Game, Big Hooks
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              It's a number puzzle. It shouldn't be this addicting. And yet
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
              Think You Can Beat Your Own Score?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Coming soon to mobile. It's free, it's small, and it will
              absolutely consume more of your time than you planned
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
                <Smartphone className="w-4 h-4 text-primary" />
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