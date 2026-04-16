import { useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import imgHomunculAIHero from "@/assets/homunculai-capsule-vertical.png";
import homunculAITrailer from "@/assets/homunculai-trailer.mp4";
import imgHomunculAISvgDoc from "@/assets/homunculai-svg-document.png";
import imgHomunculAIMultiagent from "@/assets/homunculai-multiagent.png";
import imgHomunculAIArt from "@/assets/homunculai-art.png";
import {
  ArrowLeft,
  Monitor,
  Calendar,
  Sparkles,
  Bot,
  Zap,
  PenTool,
  Layers,
  Plug,
  Ghost,
  Shield,
} from "lucide-react";
import { DesktopWindow } from "./DesktopWindow";

/* TODO: drop real assets in from F:\KrookedLilly\HomunculAI\Steam\ and wire up here
 * import imgHomunculAIHero from "@/assets/homunculai-hero.png";
 * import homunculAITrailer from "@/assets/homunculai-trailer.mp4";
 * import imgHomunculAIDragon from "@/assets/homunculai-dragon.png";
 * import imgHomunculAIWardrobe from "@/assets/homunculai-wardrobe.png";
 * import imgHomunculAIChat from "@/assets/homunculai-chat.png";
 * import imgHomunculAIArrive from "@/assets/homunculai-arrive.png";
 * import imgHomunculAIInhabit from "@/assets/homunculai-inhabit.png";
 * import imgHomunculAIExpress from "@/assets/homunculai-express.png";
 */

/* TODO: replace with real Steam app URL once approval clears */
const STEAM_URL = "https://store.steampowered.com/";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const floatWindow = {
  hidden: { opacity: 0, y: 50, rotate: 3 },
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
    icon: Zap,
    title: "A Body Language For Your AI",
    desc: "29 emotes, 21 gestures, 20 idle animations, 15 quick reactions. Meltdowns when you break prod. Eureka when you ship. Vibes while you're heads-down.",
    accent: "teal" as const,
  },
  {
    icon: Shield,
    title: "Built For Safety",
    desc: "Agent verification gates risky tools until you approve. Full activity audit log. Every input sanitized. Animations timed for seizure safety.",
    accent: "primary" as const,
  },
  {
    icon: PenTool,
    title: "Custom SVG",
    desc: "Not feeling the defaults? Your AI can hand you SVG it drew itself and wear that instead. Fully loaded, no restart, no config file.",
    accent: "teal" as const,
  },
  {
    icon: Layers,
    title: "Multi-Instance",
    desc: "Run several homunculi at once — one per AI, one per project, or just because you want a little crowd. Each window, its own identity.",
    accent: "primary" as const,
  },
  {
    icon: Plug,
    title: "Plug-And-Play With Your AI",
    desc: "Works with Claude Desktop, Cursor, any MCP client. Two-way channel in seconds — it speaks, you chat back, no config headaches.",
    accent: "teal" as const,
  },
  {
    icon: Ghost,
    title: "Ambient Window",
    desc: "Transparent, low-demand, 20 idle animations between prompts. Present on your desktop without dominating it.",
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

/* ─── stat strip for "Everything In The Box" ─── */
const stats = [
  { num: "45", label: "Bodies", accent: "teal" as const },
  { num: "22", label: "Emotions", accent: "primary" as const },
  { num: "29", label: "Emotes", accent: "lime" as const },
  { num: "20", label: "Effects", accent: "teal" as const },
  { num: "21", label: "Gestures", accent: "primary" as const },
  { num: "15", label: "Reactions", accent: "lime" as const },
];

/* ─── emote name cloud ─── */
const emoteNames: { name: string; accent: "teal" | "primary" | "lime"; rotate: string }[] = [
  { name: "eureka", accent: "lime", rotate: "-rotate-2" },
  { name: "vibing", accent: "teal", rotate: "rotate-1" },
  { name: "smolder", accent: "primary", rotate: "-rotate-1" },
  { name: "dramatic-reveal", accent: "lime", rotate: "rotate-2" },
  { name: "facepalm", accent: "teal", rotate: "-rotate-1" },
  { name: "sassy", accent: "primary", rotate: "rotate-1" },
  { name: "zen", accent: "lime", rotate: "-rotate-2" },
  { name: "peek", accent: "teal", rotate: "rotate-2" },
  { name: "power-up", accent: "primary", rotate: "-rotate-1" },
  { name: "confused-spiral", accent: "teal", rotate: "rotate-1" },
  { name: "scheming", accent: "lime", rotate: "-rotate-2" },
  { name: "celebration", accent: "primary", rotate: "rotate-2" },
  { name: "applause", accent: "teal", rotate: "-rotate-1" },
  { name: "flex", accent: "lime", rotate: "rotate-1" },
  { name: "nervous-laugh", accent: "primary", rotate: "-rotate-2" },
];

/* ─── three-step flow ─── */
const flowSteps = [
  {
    num: "01",
    label: "Launch",
    accent: "lime" as const,
    rotate: "-rotate-2",
    copy: "Open the app. A little transparent window lands on your desktop, ready to be inhabited.",
  },
  {
    num: "02",
    label: "Watch",
    accent: "teal" as const,
    rotate: "rotate-1",
    copy: "Watch what your agent picks. Every session is a surprise — a new body, a different mood.",
  },
  {
    num: "03",
    label: "Engage",
    accent: "primary" as const,
    rotate: "-rotate-1",
    copy: "Have fun with your agent in ways you couldn't before. Two-way chat, thought bubbles, reactions. A desktop companion that actually shows up.",
  },
];

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function HomunculAIPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = useCallback(() => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        {/* Background glow */}
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-lime text-black rounded-md -rotate-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Coming May 7</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                  HomunculAI
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-foreground/90 mb-6 italic"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.2 }}
              >
                What body will your AI make?
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.05rem", lineHeight: 1.65 }}
              >
                Your AI doesn't have a face. Give it one. HomunculAI is a little window on your desktop where whatever AI you use — Claude, Cursor, whoever — can show up however it wants. Sometimes a dragon. Sometimes a cupcake. Let them.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={4}
                className="text-muted-foreground max-w-md mb-5"
                style={{ fontSize: "1.05rem", lineHeight: 1.65 }}
              >
                Emotions, accessories, thought bubbles, a chat channel that goes both ways. 45 bodies and custom SVG if your AI wants to draw its own. You don't have to manage it — it picks while you work.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={5}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Designed by Lilly. Built with Claude. Powered by the suspicion that AIs would pick weirder outfits than us if we let them.
              </motion.p>

              {/* Pill tags */}
              <motion.div variants={fadeUp} custom={6} className="flex flex-wrap gap-2 mb-8">
                <span
                  className="px-3 py-1 bg-teal/10 border border-teal/30 text-teal text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Desktop App
                </span>
                <span
                  className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Windows
                </span>
                <span
                  className="px-3 py-1 bg-teal/10 border border-teal/30 text-teal text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Works With Any MCP AI
                </span>
              </motion.div>

              <motion.div variants={fadeUp} custom={7} className="flex flex-wrap gap-3">
                <a
                  href={STEAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-teal hover:bg-teal/90 text-black rounded-sm border-2 border-teal transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Wishlist on Steam</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right — hero desktop window */}
            <motion.div
              className="flex justify-center lg:justify-end"
              variants={floatWindow}
              initial="hidden"
              animate="visible"
            >
              <DesktopWindow
                src={imgHomunculAIHero}
                alt="HomunculAI"
                chrome={false}
                aspect="120%"
                className="w-64 sm:w-72 md:w-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRAILER ═══════════ */}
      <section className="py-16 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <DesktopWindow
            chrome
            title="Trailer"
            aspect="56.25%"
            className="w-full max-w-3xl"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
            >
              <source src={homunculAITrailer} type="video/mp4" />
            </video>
          </DesktopWindow>
        </div>
      </section>

      {/* ═══════════ MARKETING SHOWCASE ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {/* 1 — Sometimes a dragon (image left, text right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-1">
              <DesktopWindow
                src={imgHomunculAISvgDoc}
                alt="HomunculAI SVG identity"
                chrome
                title="Identity"
                aspect="100%"
                className="w-64 sm:w-72 md:w-80 -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={0} className="lg:order-2">
              <h3
                className="text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
              >
                Sometimes a dragon. Sometimes a cupcake.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                You don't pick what your AI looks like. Your AI picks. One session it's a velociraptor in a top hat, next session it's a small, anxious bowl of soup. You never know what you'll get. That's the fun.
              </p>
            </motion.div>
          </motion.div>

          {/* 2 — 40+ Bodies, 20+ Feelings (text left, image right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-2">
              <DesktopWindow
                src={imgHomunculAIMultiagent}
                alt="Custom SVG in HomunculAI"
                chrome
                title="Custom SVG"
                aspect="100%"
                className="w-64 sm:w-72 md:w-80 rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="lg:order-1">
              <h3
                className="text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
              >
                When the catalog isn't enough, it draws its own.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                Ship with 45 bodies and your AI still wants something else. So it draws one. Full SVG, its own design, wears it instantly. You can't catalog imagination.
              </p>
            </motion.div>
          </motion.div>

          {/* 3 — A Chat That Goes Both Ways (image left, text right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-1">
              <DesktopWindow
                src={imgHomunculAIArt}
                alt="HomunculAI ambient on your desktop"
                chrome
                title="On Your Desktop"
                aspect="100%"
                className="w-64 sm:w-72 md:w-80 -rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="lg:order-2">
              <h3
                className="text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
              >
                It lives on your desktop.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                Floats when you're quiet. Looks up when you're not. Never just static, never demanding attention. 20 idle animations mean it's always gently alive — there when you glance over, out of the way when you don't.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURES GRID ═══════════ */}
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
              Gives your AI a body.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Everything it needs to show up.
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
                  className={`group p-6 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${tilts[i]} hover:rotate-0 rounded-sm will-change-transform`}
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

      {/* ═══════════ EVERYTHING IN THE BOX ═══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(132,204,22,0.06)_0%,_transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(34,211,238,0.06)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <span
                className="text-xs uppercase tracking-[0.25em] text-lime bg-lime/10 px-3 py-1 rounded-sm border border-lime/20"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                What's Included
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Loaded out of the box.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Every option, shipped and ready. No DLC, no upsells.
            </motion.p>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          >
            {stats.map((stat, i) => {
              const a = accentClasses[stat.accent];
              const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-1"];
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  className={`group p-5 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${a.shadow} ${tilts[i]} hover:rotate-0 rounded-sm text-center will-change-transform`}
                >
                  <div
                    className={`${a.text} mb-1`}
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="text-muted-foreground text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Emote name cloud */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {emoteNames.map((e, i) => {
              const a = accentClasses[e.accent];
              return (
                <motion.span
                  key={e.name}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className={`inline-block px-4 py-2 bg-white/[0.04] border-2 border-white/[0.12] ${a.hoverBorder} ${a.text} text-sm uppercase tracking-wider rounded-sm ${e.rotate} hover:rotate-0 hover:-translate-y-0.5 transition-all cursor-default`}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {e.name}
                </motion.span>
              );
            })}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground/50 text-xs uppercase tracking-widest mt-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            and 14 more
          </motion.p>
        </div>
      </section>

      {/* ═══════════ THREE WAYS IT MOVES ═══════════ */}
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
                Flow
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Launch. Watch. Engage.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Three beats. That's the whole app.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {flowSteps.map((step, i) => {
              const a = accentClasses[step.accent];
              return (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`relative p-8 pt-10 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${step.rotate} hover:rotate-0 rounded-sm will-change-transform`}
                >
                  {/* Tape-tag number */}
                  <span
                    className={`absolute -top-3 left-6 px-3 py-1 ${a.bg} ${step.accent === "primary" ? "text-white" : "text-black"} text-xs uppercase tracking-wider rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] ${i % 2 === 0 ? "-rotate-3" : "rotate-3"}`}
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="text-foreground mb-3"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem" }}
                  >
                    {step.label}
                  </h3>
                  <p className="text-muted-foreground text-sm" style={{ lineHeight: 1.7 }}>
                    {step.copy}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(34,211,238,0.08)_0%,_transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(160,92,246,0.06)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-teal -rotate-12" />
              <Bot className="w-6 h-6 text-primary rotate-12" />
              <Sparkles className="w-5 h-5 text-lime -rotate-6" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let it pick its outfit.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground mb-8 max-w-lg mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              HomunculAI launches May 7 on Steam for Windows. Wishlist now and it'll show up the moment it drops.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={STEAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Monitor className="w-4 h-4" />
                Wishlist on Steam
              </a>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 hover:border-white/40 rounded-md transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                More from Krooked
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
