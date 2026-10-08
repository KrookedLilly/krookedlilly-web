import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Bell, Check, Heart, Radio } from "lucide-react";
import { PageMeta } from "./PageMeta";
import { SocialIcon, type SocialIconName } from "./SocialIcon";
import { socials, DISCORD_URL, JENN_TWITCH_URL } from "../data/socials";
import { useFormspree, FORM_ERROR_MESSAGE } from "../../hooks/useFormspree";

const TWITCH_URL = "https://www.twitch.tv/krookedlilly";
const YOUTUBE_URL = "https://www.youtube.com/@KrookedLilly";
/** Opens YouTube's subscribe confirmation for the channel. */
const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_URL}?sub_confirmation=1`;
/** The channel's auto-generated uploads playlist (channel id with UC -> UU). */
const YOUTUBE_UPLOADS_EMBED = "https://www.youtube-nocookie.com/embed/videoseries?list=UUWW6hF5FobSsFIUoMJySmaw";
/** Twitch only plays embeds on the domains listed as parents. */
const TWITCH_EMBED = `https://player.twitch.tv/?channel=krookedlilly&parent=www.krookedlilly.com&parent=krookedlilly.com&parent=localhost&autoplay=false&muted=true`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

type Accent = "primary" | "teal";
const accent = {
  primary: {
    text: "text-primary-light",
    chip: "text-primary-light bg-primary/10 border-primary-light/40",
    hoverBorder: "hover:border-primary-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]",
    button: "border-primary-light/70 bg-primary/15 text-primary-light hover:bg-primary/25",
    iconBg: "bg-primary",
  },
  teal: {
    text: "text-teal-light",
    chip: "text-teal-light bg-teal/10 border-teal-light/40",
    hoverBorder: "hover:border-teal-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]",
    button: "border-teal-light/70 bg-teal/15 text-teal-light hover:bg-teal/25",
    iconBg: "bg-teal",
  },
};

/** What people will find on each profile, and the call to action. */
const extras: Record<string, { blurb: string; cta: string; url?: string }> = {
  YouTube: { blurb: "Shorts from ExfilCraft raids, dev clips, and past streams.", cta: "Subscribe", url: YOUTUBE_SUBSCRIBE_URL },
  Twitch: { blurb: "Live dev sessions and games. Come chat with us while we build.", cta: "Follow" },
  TikTok: { blurb: "Quick clips and behind-the-scenes bits.", cta: "Follow" },
  Instagram: { blurb: "Art, screenshots, and whatever we're making this week.", cta: "Follow" },
  Bluesky: { blurb: "Updates, announcements, and the occasional bad joke.", cta: "Follow" },
  X: { blurb: "Updates and announcements.", cta: "Follow" },
  Reddit: { blurb: "Posts and discussion about what we're building.", cta: "Follow" },
  "Ko-fi": { blurb: "Our tip jar. Every coffee goes straight back into making stuff.", cta: "Support" },
};

const profiles: { label: string; handle: string; url: string; icon: SocialIconName; blurb: string; cta: string }[] = [
  ...socials.map((s) => ({ ...s, blurb: extras[s.label]?.blurb ?? "", cta: extras[s.label]?.cta ?? "Follow", url: extras[s.label]?.url ?? s.url })),
  { label: "Discord", handle: "KrookedLilly server", url: DISCORD_URL, icon: "discord", blurb: "Announcements, ExfilCraft, and hanging out with us and the community.", cta: "Join" },
];

function SectionLabel({ children, tone }: { children: string; tone: Accent }) {
  return (
    <span
      className={`text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-sm border ${accent[tone].chip}`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
    >
      {children}
    </span>
  );
}

function BigButton({ href, icon, children, tone }: { href: string; icon: SocialIconName; children: string; tone: Accent | "lime" }) {
  const styles =
    tone === "primary"
      ? "bg-primary hover:bg-primary/90 border-primary-light hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)]"
      : tone === "teal"
        ? "bg-teal hover:bg-teal/90 border-teal-light hover:shadow-[4px_4px_0px_0px_rgb(var(--teal-rgb)/0.4)]"
        : "bg-lime hover:bg-lime/90 border-lime hover:shadow-[4px_4px_0px_0px_rgba(132,204,22,0.4)]";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-black rounded-md border-2 transition-all hover:-translate-y-1 uppercase tracking-wider text-sm ${styles}`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
    >
      <SocialIcon name={icon} className="w-5 h-5" />
      {children}
    </a>
  );
}

function SmallButton({ href, tone, children }: { href: string; tone: Accent; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 ${accent[tone].button} text-xs uppercase tracking-wider transition-colors`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const { status, submit } = useFormspree("Socials page: newsletter signup");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && (await submit({ email }, "KrookedLilly newsletter: new signup (Socials page)"))) setEmail("");
  };
  if (status === "sent") {
    return (
      <p className="flex items-center gap-2 text-lime" role="status">
        <Check className="w-4 h-4" />
        You're on the list. We'll let you know when something drops.
      </p>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className="flex-1 min-w-0 px-4 py-3 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal-light/80"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black rounded-sm border-2 border-primary-light uppercase tracking-wider text-xs whitespace-nowrap transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
        >
          <Bell className="w-4 h-4" />
          {status === "sending" ? "Sending..." : "Notify me"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {FORM_ERROR_MESSAGE}
        </p>
      )}
    </>
  );
}

export function SocialsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Follow KrookedLilly: Twitch, YouTube & More"
        description="Watch KrookedLilly live on Twitch, subscribe on YouTube, and follow along on TikTok, Instagram, Bluesky, X, and Reddit. Join the Discord or tip us on Ko-fi."
        path="/socials"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-16 pb-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 right-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.10)_0%,_transparent_70%)]" />
        </div>
        <motion.div initial="hidden" animate="visible" className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Come Hang Out
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto mb-8" style={{ fontSize: "1.075rem" }}>
            We stream dev sessions and games on Twitch, post clips and shorts on YouTube, and share
            what we're making everywhere else. Follow along, say hi in chat, and catch new stuff first.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <BigButton href={TWITCH_URL} icon="twitch" tone="primary">Follow on Twitch</BigButton>
            <BigButton href={YOUTUBE_SUBSCRIBE_URL} icon="youtube" tone="teal">Subscribe on YouTube</BigButton>
            <BigButton href={DISCORD_URL} icon="discord" tone="lime">Join the Discord</BigButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ WATCH ═══════════ */}
      <section className="py-16 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel tone="primary">Watch</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Live &amp; Latest
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Twitch */}
            <div className="bg-white/[0.06] border-2 border-white/[0.12] rounded-sm overflow-hidden -rotate-[0.4deg] shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]">
              <div className="aspect-video bg-black">
                <iframe
                  src={TWITCH_EMBED}
                  title="KrookedLilly on Twitch"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 ${accent.primary.iconBg} rounded-sm flex items-center justify-center text-black`}>
                    <SocialIcon name="twitch" className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>KrookedLilly on Twitch</div>
                    <div className="text-muted-foreground text-sm flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-primary-light" />
                      Live here when we're streaming
                    </div>
                  </div>
                </div>
                <SmallButton href={TWITCH_URL} tone="primary">Follow</SmallButton>
              </div>
            </div>

            {/* YouTube */}
            <div className="bg-white/[0.06] border-2 border-white/[0.12] rounded-sm overflow-hidden rotate-[0.4deg] shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]">
              <div className="aspect-video bg-black">
                <iframe
                  src={YOUTUBE_UPLOADS_EMBED}
                  title="Latest KrookedLilly videos on YouTube"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 ${accent.teal.iconBg} rounded-sm flex items-center justify-center text-black`}>
                    <SocialIcon name="youtube" className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>KrookedLilly on YouTube</div>
                    <div className="text-muted-foreground text-sm">Our latest uploads, newest first</div>
                  </div>
                </div>
                <SmallButton href={YOUTUBE_SUBSCRIBE_URL} tone="teal">Subscribe</SmallButton>
              </div>
            </div>
          </div>

          {/* Lilly's channel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={0}
            className="mt-8 p-5 sm:p-6 bg-white/[0.04] border-2 border-dashed border-white/[0.15] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 shrink-0 ${accent.teal.iconBg} rounded-sm flex items-center justify-center text-black`}>
                <SocialIcon name="twitch" className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>Lilly's channel</span>
                  <span className="text-muted-foreground text-sm">twitch.tv/deathlilly522</span>
                  <span
                    className="px-2 py-0.5 text-[0.6rem] uppercase tracking-wider rounded-sm border border-white/20 text-muted-foreground"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    Mature
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Lilly's own variety streams: games, art, sarcasm, and mayhem, plus plenty of KrookedLilly dev along the way.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <SmallButton href={JENN_TWITCH_URL} tone="teal">Follow Lilly</SmallButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ EVERYWHERE ═══════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel tone="teal">Find us everywhere</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Pick Your Platform
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((p, i) => {
              const tone: Accent = i % 2 === 0 ? "primary" : "teal";
              const a = accent[tone];
              return (
                <motion.div
                  key={p.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i % 3}
                  className={`group relative flex flex-col p-6 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} ${a.shadow} transition-[border-color,box-shadow] duration-300 hover:-translate-y-1 rounded-sm ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} hover:rotate-0`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-11 h-11 ${a.iconBg} rounded-sm flex items-center justify-center text-black transition-transform group-hover:-rotate-6`}>
                      <SocialIcon name={p.icon} className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem" }}>{p.label}</div>
                      <div className={`${a.text} text-sm`}>{p.handle}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5 flex-1">{p.blurb}</p>
                  <div>
                    <SmallButton href={p.url} tone={tone}>{p.cta}</SmallButton>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ SUPPORT + NOTIFY ═══════════ */}
      <section className="py-16 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel tone="primary">Support us</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Buy Us a Coffee
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-6">
              We're two people making things we love. If something we made made your day better, a tip on
              Ko-fi helps us keep going.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <a
                href="https://ko-fi.com/krookedlilly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Heart className="w-4 h-4" />
                Support on Ko-fi
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel tone="teal">Never miss a drop</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Get Notified
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-6">
              Not on socials? Leave your email and we'll let you know when we launch something new.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <NotifyForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default SocialsPage;
