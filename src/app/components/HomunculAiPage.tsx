import { useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import imgHomunculAiHero from "@/assets/homunculai-capsule-vertical.png";
import homunculAITrailer from "@/assets/homunculai-trailer.mp4";
import imgHomunculAiSvgDoc from "@/assets/homunculai-svg-document.png";
import imgHomunculAiMultiagent from "@/assets/homunculai-multiagent.png";
import imgHomunculAiArt from "@/assets/homunculai-art.png";
import {
  ArrowLeft,
  Sparkles,
  Bot,
  Zap,
  PenTool,
  Layers,
  Plug,
  Ghost,
  Shield,
  AlertTriangle,
  ShoppingBag,
  Download,
  ChevronDown,
} from "lucide-react";
import { DesktopWindow } from "./DesktopWindow";
import { PageMeta } from "./PageMeta";

const BUY_DIRECT_URL =
  "https://krookedlilly.lemonsqueezy.com/checkout/buy/dbbcf923-b434-4fcf-a1b4-5f35225ad16b";
const TRIAL_DOWNLOAD_URL =
  "https://github.com/KrookedLilly/homunculai-releases/releases";

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
    desc: "29 emotes, 21 gestures, 20 idle animations, 15 quick reactions. A full visual vocabulary your AI can mix and match for whatever it's doing.",
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
    desc: "Run as many windows as you want, in whatever arrangement fits your workflow. Each window is isolated with its own state, scoped to only the AI connected to it.",
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
    desc: "Transparent, low CPU, 20 idle animations between prompts. Runs on your desktop without blocking your work.",
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

/* ─── FAQ ─── */
const faqs = [
  {
    q: "Does HomunculAi come with an AI?",
    a: "No. HomunculAi is a display layer — it gives your AI a body. You connect the AI you already use, and that AI brings the avatar to life.",
  },
  {
    q: "How is HomunculAi different from Replika or Character.ai?",
    a: "Those apps provide their own AI. HomunculAi doesn't include one. Your actual AI — the one you already use for work, creativity, or coding — gets a visible presence on your screen, not a separate character from a different company.",
  },
  {
    q: "What is MCP?",
    a: "MCP (Model Context Protocol) is an open standard that lets AI clients connect to external tools and environments. HomunculAi uses MCP to receive commands from your AI.",
  },
  {
    q: "What AI tools work with HomunculAi?",
    a: "Claude Desktop, Claude Code, Cursor, Windsurf, and VS Code have built-in one-click setup. Other AI tools that support the MCP standard can be connected with a short manual step.",
  },
  {
    q: "Does HomunculAi work with ChatGPT?",
    a: "Not currently. ChatGPT doesn't support the connection standard HomunculAi uses.",
  },
  {
    q: "Can I use a local AI like Ollama or LM Studio?",
    a: "If your local AI supports MCP, yes. Setup would be a manual step rather than automatic, but it can be connected.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not for the main supported tools — setup is one click inside HomunculAi. Connecting less common AI tools requires a short manual config step, but no coding.",
  },
  {
    q: "Does HomunculAi work on Mac or Linux?",
    a: "Windows only for now.",
  },
  {
    q: "Is it free?",
    a: "There's a 7-day free trial — no account, no payment, no email required. After that, it's $4.99 one-time with no subscription.",
  },
  {
    q: "Does HomunculAi collect my data?",
    a: "No telemetry, no tracking. HomunculAi makes two outbound calls: one when you activate your license, and one when you manually check for updates from Settings. Everything else stays on your machine.",
  },
  {
    q: "Will my AI remember me between sessions?",
    a: "HomunculAi doesn't store conversation history between sessions. Whether your AI remembers you depends on the AI you connect — some have their own memory features you can enable through that app.",
  },
];

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function HomunculAiPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      <PageMeta
        title="HomunculAi"
        description="HomunculAi is a visualization layer for your AI agents. Any MCP-compatible agent picks a desktop body, changes its mood, and chats back while you work. Windows."
        path="/games/homunculai"
        image="/homunculai-og.png"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "name": "HomunculAi",
            "operatingSystem": "Windows",
            "applicationCategory": "UtilitiesApplication",
            "offers": {
              "@type": "Offer",
              "price": "4.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "seller": { "@type": "Organization", "name": "KrookedLilly" }
            },
            "description": "HomunculAi is a visualization layer for your AI agents. Any MCP-compatible agent picks a desktop body, changes its mood, and chats back while you work.",
            "url": "https://www.krookedlilly.com/games/homunculai/",
            "image": "https://www.krookedlilly.com/homunculai-og.png",
            "author": { "@type": "Organization", "name": "KrookedLilly", "url": "https://www.krookedlilly.com" },
            "screenshot": "https://www.krookedlilly.com/homunculai-og.png",
            "featureList": "MCP integration, Custom SVG avatars, Multi-instance, Two-way chat, 7-day free trial"
          },
          {
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          }
        ]
      })}} />
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
              {/* Released badge hidden — we're a real product catalog, not a coming-soon page
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-lime text-black rounded-md -rotate-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Released</span>
                </span>
              </motion.div>
              */}

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl md:text-8xl text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                  HomunculAi
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
                className="text-muted-foreground max-w-md mb-5"
                style={{ fontSize: "1.05rem", lineHeight: 1.65 }}
              >
                Right now, your AI probably lives in a chat window, a terminal, or an editor. HomunculAi gives it a desktop presence. Your AI takes a form, changes its mood, raises a thought bubble, chats with you in a separate channel, or just floats there next to your work.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={4}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Designed by Lilly. Built with AI input. Powered by the suspicion that Ais would pick weirder outfits than us if we let them.
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

              {/* Legal links strip above buy buttons */}
              <motion.div variants={fadeUp} custom={7} className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs">
                <Link
                  to="/games/homunculai/terms"
                  className="text-muted-foreground/70 hover:text-teal transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Terms of Use
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/sales-restrictions"
                  className="text-muted-foreground/70 hover:text-primary transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Sales Restrictions
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/what-is-ai"
                  className="text-muted-foreground/70 hover:text-teal transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  New to AI?
                </Link>
              </motion.div>

              {/* Trial download button */}
              <motion.div variants={fadeUp} custom={8} className="max-w-xs">
                <a
                  href={TRIAL_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-sm border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.4)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Download className="w-5 h-5" />
                  <span className="text-base uppercase tracking-wider">Download 7-Day Trial</span>
                </a>
              </motion.div>

              {/* Inline 18+ / regional note below buy buttons */}
              <motion.p
                variants={fadeUp}
                custom={9}
                className="text-muted-foreground/60 text-xs mt-3 max-w-md"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 500, lineHeight: 1.6 }}
              >
                <span className="uppercase tracking-wider text-amber-400/80">18+ only.</span>{" "}
                Not available in certain regions &mdash;{" "}
                <Link
                  to="/games/homunculai/sales-restrictions"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  see list
                </Link>
                .
              </motion.p>
            </motion.div>

            {/* Right — hero desktop window */}
            <motion.div
              className="flex justify-center lg:justify-end"
              variants={floatWindow}
              initial="hidden"
              animate="visible"
            >
              <DesktopWindow
                src={imgHomunculAiHero}
                alt="HomunculAi"
                chrome={false}
                aspect="120%"
                className="w-64 sm:w-72 md:w-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ DEMO ═══════════ */}
      <section className="py-16 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <DesktopWindow
            chrome
            title="Demo"
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
                src={imgHomunculAiSvgDoc}
                alt="HomunculAi SVG identity"
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
                src={imgHomunculAiMultiagent}
                alt="Custom SVG in HomunculAi"
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
                src={imgHomunculAiArt}
                alt="HomunculAi ambient on your desktop"
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
                A face on your AI's state.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                Thought bubbles when it's processing. Speech bubbles when it has an answer. Gestures and expressions for everything in between. No switching to a chat log. No reading a terminal.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURES GRID ═══════════ */}
      <section className="py-24 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
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
              className="text-muted-foreground mb-6 max-w-lg mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              HomunculAi is live for Windows. Sold direct so it goes straight to the people making it.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-muted-foreground/70 mb-6 max-w-lg mx-auto text-sm"
            >
              7-day free trial &mdash; no account, no payment, no email required.<br />$4.99 one time payment after. No subscription.
            </motion.p>

            {/* Legal links strip above buy buttons */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs justify-center"
            >
              <Link
                to="/games/homunculai/terms"
                className="text-muted-foreground/70 hover:text-teal transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Terms of Use
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/sales-restrictions"
                className="text-muted-foreground/70 hover:text-primary transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Sales Restrictions
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/what-is-ai"
                className="text-muted-foreground/70 hover:text-teal transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                New to AI?
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="flex justify-center">
              <a
                href={BUY_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full max-w-xs items-center justify-center gap-3 px-10 py-4 bg-lime hover:bg-lime/90 text-black rounded-md border-2 border-lime transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(132,204,22,0.4)] uppercase tracking-wider text-base"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <ShoppingBag className="w-5 h-5" />
                Buy Now
              </a>
            </motion.div>

            {/* Inline 18+ / regional note below buy buttons */}
            <motion.p
              variants={fadeUp}
              custom={6}
              className="text-muted-foreground/60 text-xs mt-4"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 500, lineHeight: 1.6 }}
            >
              <span className="uppercase tracking-wider text-amber-400/80">18+ only.</span>{" "}
              Not available in certain regions &mdash;{" "}
              <Link
                to="/games/homunculai/sales-restrictions"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                see list
              </Link>
              .
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-24 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl text-foreground mb-10 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Common Questions
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[faqs.filter((_, i) => i % 2 === 0), faqs.filter((_, i) => i % 2 === 1)].map(
                (col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-2">
                    {col.map((faq) => {
                      const i = faqs.indexOf(faq);
                      const isOpen = openFaq === i;
                      // Alternate within each column: pairs (0,1), (2,3)... flip accent each pair
                      const accent = Math.floor(i / 2) % 2 === i % 2 ? "teal" : "primary";
                      const accentBorder = accent === "teal" ? "border-teal/30" : "border-primary/30";
                      const accentHoverBorder = accent === "teal" ? "hover:border-teal/30" : "hover:border-primary/30";
                      const accentText = accent === "teal" ? "text-teal" : "text-primary";
                      const accentHoverText = accent === "teal" ? "group-hover:text-teal" : "group-hover:text-primary";
                      return (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          custom={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-20px" }}
                          className={`group border-2 rounded-sm transition-colors duration-200 ${
                            isOpen
                              ? `${accentBorder} bg-white/[0.04]`
                              : `border-white/[0.08] bg-white/[0.02] ${accentHoverBorder}`
                          }`}
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                          >
                            <span
                              className={`transition-colors duration-200 ${isOpen ? accentText : `text-foreground ${accentHoverText}`}`}
                              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem" }}
                            >
                              {faq.q}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                                isOpen ? `rotate-180 ${accentText}` : `text-muted-foreground ${accentHoverText}`
                              }`}
                            />
                          </button>
                          <motion.div
                            initial={false}
                            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="px-5 pb-5 text-muted-foreground text-sm" style={{ lineHeight: 1.7 }}>
                              {faq.a}
                            </p>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ AGE REQUIREMENT NOTICE ═══════════ */}
      <section className="py-8 bg-white/[0.02] border-t-2 border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p
              className="text-muted-foreground/70 text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 500, lineHeight: 1.6 }}
            >
              <span className="uppercase tracking-wider text-foreground/90" style={{ fontWeight: 700 }}>
                18+ Age Requirement:
              </span>{" "}
              HomunculAi requires agreement to a Terms of Use that restricts use to individuals 18 years of age or older due to existing and incoming laws around use of AI.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
