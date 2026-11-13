import { useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import imgHomunculAiHero from "@/assets/homunculai-capsule-vertical.png";
import homunculAITrailer from "@/assets/homunculai-trailer.mp4";
import imgHomunculAiDraws from "@/assets/homunculai-draws.webp";
import imgHomunculAiIdentity from "@/assets/homunculai-identity.webp";
import imgHomunculAiStyles from "@/assets/homunculai-styles.webp";
import imgHomunculAiStates from "@/assets/homunculai-states.webp";
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
  Download,
  ChevronDown,
} from "lucide-react";
import { DesktopWindow } from "./DesktopWindow";
import { PageMeta } from "./PageMeta";

const DOWNLOAD_URL =
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
    desc: "29 emotions, 19 gestures, 30 emotes, 15 quick reactions, 22 effects, 20 idle motions and 36 accessories. Your AI mixes them to show what it's doing.",
    accent: "teal" as const,
  },
  {
    icon: Shield,
    title: "Built For Safety",
    desc: "A label says it's an AI agent, not a human. An activity log records what it does and flags wording worth a second look. Pause stops it at any time. Custom drawings wait until you verify it.",
    accent: "primary" as const,
  },
  {
    icon: PenTool,
    title: "Custom SVG",
    desc: "Not feeling the options? Once you verify it, your AI can draw its own body in SVG and wear that instead. Sanitized: no scripts, no outside resources, no fast flashing.",
    accent: "teal" as const,
  },
  {
    icon: Layers,
    title: "Several Avatars",
    desc: "Run several AI apps at once, each with its own avatar. One AI per avatar, so nobody takes over anyone else's body.",
    accent: "primary" as const,
  },
  {
    icon: Plug,
    title: "One-Click Setup",
    desc: "Claude Desktop, Claude Code, Cursor, VS Code and Windsurf connect in one click. Any other MCP app takes a short manual step.",
    accent: "teal" as const,
  },
  {
    icon: Ghost,
    title: "On Your Desktop",
    desc: "A transparent window that stays on top and out of your way. Your AI sits next to your work, not inside it.",
    accent: "primary" as const,
  },
];

const steps = [
  {
    n: "1",
    title: "Install and pick a style",
    desc: "Download HomunculAi and choose Playful, Sleek or Pixel in Settings. You can change it later.",
  },
  {
    n: "2",
    title: "Connect your AI app",
    desc: "One click for Claude Desktop, Claude Code, Cursor, VS Code and Windsurf. Other MCP apps take a short manual step.",
  },
  {
    n: "3",
    title: "Ask your AI to join",
    desc: "It picks a body, then updates the avatar each time it checks in: whenever you write to it, or every few minutes on a check-in loop if your app can run one.",
  },
];

const accentClasses = {
  teal: {
    text: "text-teal-light",
    border: "border-teal-light/55",
    bg: "bg-teal",
    hoverBorder: "hover:border-teal-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]",
    glow: "bg-teal/10",
  },
  primary: {
    text: "text-primary-light",
    border: "border-primary-light/55",
    bg: "bg-primary",
    hoverBorder: "hover:border-primary-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]",
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
    a: "No. HomunculAi is a display layer that gives your AI a body. It contains no model and generates nothing: it draws only what the AI you connect asks for.",
  },
  {
    q: "Is HomunculAi a chatbot?",
    a: "No. HomunculAi has no AI of its own and nothing to talk to. The AI you already use (for work, creativity or coding) gets a visible presence on your screen, and you keep talking to it in your own AI app.",
  },
  {
    q: "What is MCP?",
    a: "MCP (Model Context Protocol) is an open standard that lets AI apps connect to external tools. HomunculAi uses MCP to receive commands from your AI.",
  },
  {
    q: "What AI tools work with HomunculAi?",
    a: "Claude Desktop, Claude Code, Cursor, Windsurf, and VS Code have built-in one-click setup. Other AI tools that support the MCP standard can be connected with a short manual step.",
  },
  {
    q: "Does HomunculAi work with ChatGPT?",
    a: "Not currently. HomunculAi needs an AI app that can run a local MCP server on your computer, and ChatGPT isn't one we support.",
  },
  {
    q: "Can I use a local AI like Ollama or LM Studio?",
    a: "If your local AI supports MCP, yes. Setup would be a manual step rather than automatic, but it can be connected.",
  },
  {
    q: "Can I talk to my AI in HomunculAi?",
    a: "No. You talk to your AI in your own AI app. It answers there, and it can show things in the speech and thought bubbles above its avatar.",
  },
  {
    q: "Does the avatar move on its own?",
    a: "Idle motion does: breathing, fidgeting, looking around. Changes of look, mood or state come when your AI checks in, which is whenever you write to it, or every few minutes on a check-in loop. Between check-ins the avatar keeps its last look.",
  },
  {
    q: "What can my AI see?",
    a: "Only its own avatar, the options of the style you picked, and a few settings such as whether you paused or verified it. Not your screen, not your files, and not whether you're at your computer.",
  },
  {
    q: "What are styles?",
    a: "Three looks for the same avatar system: Playful (drawn characters with outlines and some bounce), Sleek (simple abstract shapes, muted colors, calm motion) and Pixel (grid sprites with bold pixel faces). Each has 24 bodies. You pick the style in Settings, where Look shows each one and See a demo plays a short demo on your avatar (it is not an AI). Your AI picks the body and everything else.",
  },
  {
    q: "Does it cost anything to run?",
    a: "The app is free. A check-in loop makes your AI act every few minutes, and that uses more of your AI plan than answering you normally would. Without a loop, it adds only the few small calls your AI makes when you write to it.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not for the main supported tools: setup is one click inside HomunculAi. Connecting less common AI tools requires a short manual config step, but no coding.",
  },
  {
    q: "Does HomunculAi work on Mac or Linux?",
    a: "Windows only for now.",
  },
  {
    q: "Is it free?",
    a: "Yes. HomunculAi is free: no account, no payment, no email.",
  },
  {
    q: "Does HomunculAi collect my data?",
    a: "No telemetry, no tracking. HomunculAi goes online only to check for updates (GitHub): when you select Check for updates in Settings, or each time it starts if you allow that (it asks once, at first launch). Send feedback opens a Google Form in your browser. Everything else stays on your computer.",
  },
  {
    q: "Will my AI remember me between sessions?",
    a: "HomunculAi doesn't store your conversations; they happen in your AI app. Whether your AI remembers you depends on the AI you connect. Some have their own memory features you can enable through that app.",
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
        description="HomunculAi is a free Windows app that gives the AI you already use a body on your desktop. Your AI picks its look, shows its mood, and can show when it's working, waiting on you or done. No AI inside. Works with Claude Desktop, Claude Code, Cursor, VS Code, Windsurf and other MCP apps."
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
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "seller": { "@id": "https://www.krookedlilly.com/#organization" }
            },
            "description": "HomunculAi is a free Windows app that gives the AI you already use a body on your desktop. Your AI picks its look, shows its mood, and can show when it's working, waiting on you or done. No AI inside. Works with Claude Desktop, Claude Code, Cursor, VS Code, Windsurf and other MCP apps.",
            "url": "https://www.krookedlilly.com/games/homunculai",
            "image": "https://www.krookedlilly.com/homunculai-og.png",
            "author": { "@id": "https://www.krookedlilly.com/#organization" },
            "screenshot": "https://www.krookedlilly.com/homunculai-og.png",
            "featureList": "MCP integration, Three avatar styles, Work states, Custom SVG avatars, Speech and thought bubbles, Free"
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
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.10)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-teal-light transition-colors text-sm uppercase tracking-wider mb-8"
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
                className="text-foreground/90 mb-2 italic"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.2 }}
              >
                What body will your AI make?
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-foreground mb-5"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.3, fontWeight: 600 }}
              >
                A desktop body for the AI you already use.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground max-w-md mb-5"
                style={{ fontSize: "1.05rem", lineHeight: 1.65 }}
              >
                Right now, your AI lives in an app, a terminal or an editor. HomunculAi gives it a body on your desktop. It picks the look, shows its mood, raises a thought bubble, and can show you whether it's working, waiting on you or done, without you switching windows.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={4}
                className="text-muted-foreground/60 text-sm mb-8 max-w-md"
              >
                Designed by Lilly. Built with AI input. Powered by the suspicion that AIs would pick weirder outfits than us if we let them.
              </motion.p>

              {/* Pill tags */}
              <motion.div variants={fadeUp} custom={6} className="flex flex-wrap gap-2 mb-8">
                <span
                  className="px-3 py-1 bg-teal/10 border border-teal-light/55 text-teal-light text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Desktop App
                </span>
                <span
                  className="px-3 py-1 bg-primary/10 border border-primary-light/55 text-primary-light text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Windows
                </span>
                <span
                  className="px-3 py-1 bg-teal/10 border border-teal-light/55 text-teal-light text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Works With Any MCP AI
                </span>
                <span
                  className="px-3 py-1 bg-primary/10 border border-primary-light/55 text-primary-light text-xs uppercase tracking-wider rounded-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  Free
                </span>
              </motion.div>

              {/* Legal links strip above buy buttons */}
              <motion.div variants={fadeUp} custom={7} className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs">
                <Link
                  to="/games/homunculai/terms"
                  className="text-muted-foreground/70 hover:text-teal-light transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Terms of Use
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/sales-restrictions"
                  className="text-muted-foreground/70 hover:text-primary-light transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Download Restrictions
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/what-is-ai"
                  className="text-muted-foreground/70 hover:text-teal-light transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  About AI
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/privacy"
                  className="text-muted-foreground/70 hover:text-primary-light transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Privacy
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/safety"
                  className="text-muted-foreground/70 hover:text-teal-light transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Safety
                </Link>
                <span className="text-muted-foreground/30">&middot;</span>
                <Link
                  to="/games/homunculai/security"
                  className="text-muted-foreground/70 hover:text-primary-light transition-colors uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Security
                </Link>
              </motion.div>

              {/* Download button */}
              <motion.div variants={fadeUp} custom={8} className="max-w-xs">
                <a
                  href={DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary/90 text-black rounded-sm border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.4)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Download className="w-5 h-5" />
                  <span className="text-base uppercase tracking-wider">Download free</span>
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
                Not available in certain regions:{" "}
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
                alt="HomunculAi key art: three AI avatars over a code editor, a green dragon in a top hat, a soft blue orb and a pixel terminal with headphones"
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

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-14">
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How it works.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-lg mx-auto">
              Three steps. There is no AI inside HomunculAi: yours does the work.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className="p-6 bg-white/[0.06] border-2 border-white/[0.12] rounded-sm"
              >
                <div
                  className={`w-10 h-10 ${i % 2 === 0 ? "bg-teal" : "bg-primary"} text-black flex items-center justify-center mb-4 rounded-sm`}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem" }}
                >
                  {step.n}
                </div>
                <h3
                  className="text-foreground mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem" }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm" style={{ lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={3}
            className="mt-8 p-6 border-2 border-teal-light/55 bg-teal/10 rounded-sm"
          >
            <p
              className="text-teal-light mb-2 uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              The honest part
            </p>
            <p className="text-foreground/90" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
              Your AI isn't running all the time. It checks in when you write to it in your AI app, or on a check-in loop. Between check-ins the avatar keeps its last look.
            </p>
            <p className="text-muted-foreground text-sm mt-3" style={{ lineHeight: 1.7 }}>
              Loops use more of your AI plan, and not every app can run one. Claude Code can. After a quiet while the avatar dims and shows when its AI last checked in, with a button to open your AI app.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ MARKETING SHOWCASE ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {/* 1 — Your AI picks its look (image left, text right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-1">
              <DesktopWindow
                src={imgHomunculAiIdentity}
                alt="Nine looks picked by AIs across the three styles, such as a Playful dragon in a top hat, a Pixel toaster with a monocle and a Sleek orb"
                chrome
                title="Identity"
                aspect="100%"
                className="w-64 sm:w-72 md:w-80 -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="lg:order-2">
              <h3
                className="text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
              >
                Your AI picks its look.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                You don't pick what your AI looks like. It does. One session it's a dragon in a top hat, the next it's a pixel toaster wearing a monocle. Body, colors, accessories and mood are all its call. Every AI picks differently, and that's the fun.
              </p>
            </motion.div>
          </motion.div>

          {/* 2 — Three styles (text left, image right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-2">
              <DesktopWindow
                src={imgHomunculAiStyles}
                alt="The three styles side by side: Playful (an orange fox in a scarf), Sleek (a sand-colored triangle with a monocle) and Pixel (a pixel hamster in a beanie), each labelled with 24 bodies"
                chrome
                title="Styles"
                aspect="100%"
                className="w-64 sm:w-72 md:w-80 rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="lg:order-1">
              <h3
                className="text-foreground mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.1 }}
              >
                Three styles. 24 bodies each.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                Playful is drawn characters with outlines and some bounce. Sleek is simple abstract shapes with muted colors and calm motion. Pixel is grid sprites with bold pixel faces. You pick the style. Your AI picks the rest.
              </p>
            </motion.div>
          </motion.div>

          {/* 3 — A face on your AI's state (image left, text right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-1">
              <DesktopWindow
                src={imgHomunculAiStates}
                alt="Relay, a blue robot with headphones, floating over a code editor with its name plate reading working and a thought bubble saying Running the suite"
                chrome
                title="Work states"
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
                Working, waiting for you, done, stuck, listening. Your AI can give each state its own face, a calm motion, a small mark and a word on the name plate, so you can tell at a glance whether it needs you. Speech bubbles carry what it says, thought bubbles what it's weighing. Your AI can show how it's doing without you switching windows.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["working", "waiting for you", "done", "stuck", "listening"].map((w, k) => (
                  <span
                    key={w}
                    className={`px-3 py-1 ${k % 2 === 0 ? "bg-teal/10 border border-teal-light/55 text-teal-light" : "bg-primary/10 border border-primary-light/55 text-primary-light"} text-xs uppercase tracking-wider rounded-sm`}
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 4 — Draws its own body (text left, image right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center lg:order-2">
              <DesktopWindow
                src={imgHomunculAiDraws}
                alt="Lumen, a red paper lantern its AI drew itself, floating over a code editor and saying Lit from within, with a verified shield on its name plate. Beside it, the activity log shows You verified Lumen and Drew custom body."
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
                When the options aren't enough, it draws its own.
              </h3>
              <p
                className="text-muted-foreground max-w-md"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                Verify your AI with the shield icon on its name plate and it can draw its own body in SVG, or layers on top of one of ours. It wears the drawing right away. Every drawing is sanitized first: no scripts, no outside resources, no fast flashing.
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
              Everything it needs to show up. No AI inside.
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.08)_0%,_transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.06)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-teal-light -rotate-12" />
              <Bot className="w-6 h-6 text-primary-light rotate-12" />
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
              HomunculAi is out for Windows, and it is free.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-muted-foreground/70 mb-6 max-w-lg mx-auto text-sm"
            >
              No account, no payment, no email.
            </motion.p>

            {/* Legal links strip above buy buttons */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs justify-center"
            >
              <Link
                to="/games/homunculai/terms"
                className="text-muted-foreground/70 hover:text-teal-light transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Terms of Use
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/sales-restrictions"
                className="text-muted-foreground/70 hover:text-primary-light transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Download Restrictions
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/what-is-ai"
                className="text-muted-foreground/70 hover:text-teal-light transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                About AI
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/privacy"
                className="text-muted-foreground/70 hover:text-primary-light transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Privacy
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/safety"
                className="text-muted-foreground/70 hover:text-teal-light transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Safety
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link
                to="/games/homunculai/security"
                className="text-muted-foreground/70 hover:text-primary-light transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Security
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="flex justify-center">
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full max-w-xs items-center justify-center gap-3 px-10 py-4 bg-lime hover:bg-lime/90 text-black rounded-md border-2 border-lime transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(132,204,22,0.4)] uppercase tracking-wider text-base"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Download className="w-5 h-5" />
                Download free
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
              Not available in certain regions:{" "}
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
                      const accentBorder = accent === "teal" ? "border-teal-light/55" : "border-primary-light/55";
                      const accentHoverBorder = accent === "teal" ? "hover:border-teal-light/55" : "hover:border-primary-light/55";
                      const accentText = accent === "teal" ? "text-teal-light" : "text-primary-light";
                      const accentHoverText = accent === "teal" ? "group-hover:text-teal-light" : "group-hover:text-primary-light";
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
