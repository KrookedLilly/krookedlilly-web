import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Coins,
  Copy,
  ExternalLink,
  Ghost,
  House,
  Server,
  Store,
  Swords,
  Users,
  Newspaper,
} from "lucide-react";
import imgTitle from "@/assets/exfilcraft-title.webp";
import imgHeroBg from "@/assets/exfilcraft-floatingislands.webp";
import imgRaidMap from "@/assets/exfilcraft-raidmap.webp";
import imgSupplyDrops from "@/assets/exfilcraft-supplydrops.webp";
import imgFirstExtract from "@/assets/exfilcraft-firstextract.webp";
import imgMarket from "@/assets/exfilcraft-market.webp";
import imgPlotProgress from "@/assets/exfilcraft-plotprogress.webp";
import imgResidents from "@/assets/exfilcraft-residents.webp";
import imgPlaythrough from "@/assets/exfilcraft-playthrough.webp";
import imgLostKit from "@/assets/exfilcraft-lostkit.webp";
import imgPavilion from "@/assets/exfilcraft-pavilion.webp";
import imgEmptyPlot from "@/assets/exfilcraft-emptyplot.webp";
import imgPortal from "@/assets/exfilcraft-portal.webp";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageMeta } from "./PageMeta";
import { SocialIcon } from "./SocialIcon";
import { JsonLd, ORG_REF, SITE_URL, pageUrl } from "./JsonLd";
import { DISCORD_URL } from "../data/socials";
import { minecraftMods } from "../data/minecraftMods";

const exfilcraft = minecraftMods.find((m) => m.slug === "exfilcraft")!;
const CURSEFORGE_URL = exfilcraft.curseForgeUrl!;
const MODRINTH_URL = exfilcraft.modrinthUrl!;
const WIKI_URL = "https://exfilcraft.dev/";
const SERVER_ADDRESS = "play.exfilcraft.com";
const YOUTUBE_ID = "rfLN7Jkrk2o";
const PATH = "/games/exfilcraft";

const DESCRIPTION =
  "ExfilCraft is a free extraction survival mod for Minecraft. Carry your kit into hostile raid worlds, fight for loot, and survive the extraction channel to bring it home, or die and drop it all.";

/* ─── animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const accentClasses = {
  primary: {
    text: "text-primary-light",
    bg: "bg-primary",
    chip: "text-primary-light bg-primary/10 border-primary-light/40",
    hoverBorder: "hover:border-primary-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]",
  },
  teal: {
    text: "text-teal-light",
    bg: "bg-teal",
    chip: "text-teal-light bg-teal/10 border-teal-light/40",
    hoverBorder: "hover:border-teal-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]",
  },
};

/* ─── content ─── */
const loop = [
  {
    step: "Infil",
    body: "Gear up on your home plot, then deploy through the Plot Trader into a raid world with whatever kit you're willing to lose.",
    image: imgRaidMap,
    alt: "An ExfilCraft raid map showing biomes and points of interest",
    accent: "primary" as const,
  },
  {
    step: "Loot",
    body: "Clear bunkers guarded by bosses, raid camps, chase supply drops delivered by a courier Ghast, and watch out for Mimic chests. Other players are in there too, and killers get marked Wanted.",
    image: imgSupplyDrops,
    alt: "Supply drop beams falling into an ExfilCraft raid world",
    accent: "teal" as const,
  },
  {
    step: "Exfil",
    body: "Find an extraction portal and stand in it until the channel finishes. Make it out and everything comes home with you. Die in a raid and you drop everything you carried in.",
    image: imgFirstExtract,
    alt: "An extraction portal beam rising out of a forest in ExfilCraft",
    accent: "primary" as const,
  },
];

const raidMaps = [
  { name: "Overworld", window: "45 min", size: "2,000 blocks", entry: "Free" },
  { name: "Nether", window: "90 min", size: "1,008 blocks", entry: "Nether Key" },
  { name: "End", window: "90 min", size: "4,000 blocks", entry: "End Key" },
  { name: "Deep Dark", window: "120 min", size: "800 blocks", entry: "Deep Dark Key" },
];

const features = [
  {
    icon: House,
    title: "Your Home Plot",
    desc: "A private, safe plot that's all yours. Die at home and you keep your stuff. Expand it with XP and buy extra plots as you grow",
    accent: "teal" as const,
  },
  {
    icon: Users,
    title: "Residents",
    desc: "Villagers move in and work jobs for you: farming, butchering, herding, fishing, and quarrying",
    accent: "primary" as const,
  },
  {
    icon: Store,
    title: "The Market",
    desc: "A shared safe hub for trading, jobs, factions, and running into everyone else on the server",
    accent: "teal" as const,
  },
  {
    icon: Coins,
    title: "Deals & Auctions",
    desc: "Daily deals, daily quests, and an auction house keep the economy moving between raids",
    accent: "primary" as const,
  },
  {
    icon: Swords,
    title: "Squad Up",
    desc: "Add friends, form a squad, and deploy together. Optional proximity voice chat through Plasmo Voice",
    accent: "teal" as const,
  },
  {
    icon: Ghost,
    title: "New Mobs",
    desc: "About 20 new mobs, including Snow and Fire Creepers, Creenders, Raid Sharks, the Bonecaller, Shadow Walkers, and Cubozoa jellyfish",
    accent: "primary" as const,
  },
];

const gallery = [
  { src: imgMarket, label: "The Market" },
  { src: imgPlotProgress, label: "Plot Progress" },
  { src: imgResidents, label: "Resident Stats" },
  { src: imgPlaythrough, label: "Playthrough Progress" },
  { src: imgLostKit, label: "Lost Kit" },
  { src: imgPavilion, label: "Pavilion" },
  { src: imgEmptyPlot, label: "A Fresh Plot" },
  { src: imgPortal, label: "Extraction Portal" },
];

const requirements = [
  { label: "Minecraft", value: "26.2" },
  { label: "Loader", value: "NeoForge 26.2.0.57+" },
  { label: "Java", value: "25" },
  { label: "Install on", value: "Client & server" },
];

const faqs = [
  {
    q: "What is ExfilCraft?",
    a: "ExfilCraft is a free extraction survival mod for Minecraft made by KrookedLilly. You carry your kit into hostile raid worlds, fight for loot, and survive the extraction channel to bring it home, or die and drop it all. Between raids you build up a safe home base, trade at the Market, and squad up with friends.",
  },
  {
    q: "What do I need to play ExfilCraft?",
    a: "Minecraft 26.2 with NeoForge 26.2.0.57 or newer, and Java 25. ExfilCraft has to be installed on both the client and the server. There's no Fabric or Forge version.",
  },
  {
    q: "Is there an ExfilCraft server I can join?",
    a: `Yes. Connect to ${SERVER_ADDRESS} with NeoForge and the latest version of ExfilCraft installed. You can also run ExfilCraft on your own server; the server settings are documented on the ExfilCraft wiki.`,
  },
  {
    q: "What happens when you die in ExfilCraft?",
    a: "Die in a raid and you drop everything you carried in. Die on your home plot and you keep it. That's the whole gamble: how much kit are you willing to risk for one more chest?",
  },
  {
    q: "Where can I download ExfilCraft?",
    a: "ExfilCraft is free on CurseForge and Modrinth. The ExfilCraft wiki at exfilcraft.dev covers items, mobs, raid maps, house rules, and server configuration.",
  },
];

/* ─── pieces ─── */
function SectionLabel({ children, accent }: { children: string; accent: "primary" | "teal" }) {
  return (
    <span
      className={`text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-sm border ${accentClasses[accent].chip}`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
    >
      {children}
    </span>
  );
}

function DownloadButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={CURSEFORGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
      >
        Get it on CurseForge
        <ExternalLink className="w-4 h-4" />
      </a>
      <a
        href={MODRINTH_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--teal-rgb)/0.4)] uppercase tracking-wider text-sm"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
      >
        Get it on Modrinth
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

function ServerCard() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(SERVER_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="p-6 bg-white/[0.06] border-2 border-white/[0.12] rounded-sm -rotate-1 shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.12)]">
      <div className="flex items-center gap-2 mb-3 text-teal-light">
        <Server className="w-4 h-4" />
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
        >
          Play on our server
        </span>
      </div>
      <button
        onClick={copy}
        className="group w-full flex items-center justify-between gap-3 px-4 py-3 bg-black/40 border-2 border-white/[0.12] hover:border-teal-light/80 rounded-sm transition-colors text-left"
        aria-label={`Copy server address ${SERVER_ADDRESS}`}
      >
        <code className="text-foreground text-base sm:text-lg">{SERVER_ADDRESS}</code>
        <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground group-hover:text-teal-light shrink-0">
          {copied ? <Check className="w-4 h-4 text-lime" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
      <p className="text-muted-foreground text-sm mt-3">
        Needs NeoForge and the latest ExfilCraft installed.
      </p>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 pt-5 border-t border-white/[0.08]">
        {requirements.map((r, i) => (
          <div key={r.label}>
            <dt
              className={`text-[0.65rem] uppercase tracking-[0.18em] ${i % 2 === 0 ? "text-primary-light" : "text-teal-light"}`}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              {r.label}
            </dt>
            <dd className="text-foreground text-sm">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function ExfilCraftPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="ExfilCraft: Extraction Survival Minecraft Mod"
        description="Free extraction survival mod for Minecraft (NeoForge 26.2). Raid hostile worlds for loot, then extract or drop it all. Public server: play.exfilcraft.com"
        path={PATH}
        image="/exfilcraft-og.jpg"
      />
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": `${pageUrl(PATH)}#software`,
              name: "ExfilCraft",
              applicationCategory: "GameApplication",
              applicationSubCategory: "Minecraft mod",
              operatingSystem: "Windows, macOS, Linux",
              softwareRequirements: "Minecraft 26.2, NeoForge 26.2.0.57 or newer, Java 25",
              description: DESCRIPTION,
              url: pageUrl(PATH),
              image: `${SITE_URL}/exfilcraft-og.jpg`,
              downloadUrl: MODRINTH_URL,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              author: ORG_REF,
              publisher: ORG_REF,
              sameAs: [CURSEFORGE_URL, MODRINTH_URL, WIKI_URL],
            },
            {
              "@type": "VideoObject",
              name: "My wife and I created a custom mod and server",
              description: "A quick look at ExfilCraft, the extraction survival Minecraft mod and server from KrookedLilly.",
              thumbnailUrl: `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
              uploadDate: "2026-09-25",
              embedUrl: `https://www.youtube.com/embed/${YOUTUBE_ID}`,
              contentUrl: `https://www.youtube.com/shorts/${YOUTUBE_ID}`,
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.12)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary-light transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          {/* Banner: title art over a sunset raid world */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="relative overflow-hidden rounded-sm border-2 border-white/[0.12] mb-12"
          >
            <ImageWithFallback
              src={imgHeroBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="relative px-6 pt-16 pb-10 sm:pt-24 sm:pb-14 flex flex-col items-center text-center">
              <h1 className="w-full max-w-2xl">
                <span className="sr-only">ExfilCraft: extraction survival Minecraft mod</span>
                <img
                  src={imgTitle}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]"
                />
              </h1>
              <p
                className="mt-6 text-2xl sm:text-3xl text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Infil. Loot. Exfil.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div initial="hidden" animate="visible" className="lg:col-span-3">
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-muted-foreground mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                ExfilCraft is extraction survival for Minecraft. Carry your kit into hostile raid
                worlds, fight for loot, and survive the extraction channel to bring it home, or die
                and drop it all. Build a home base, squad up, and risk it for one more chest.
              </motion.p>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground/60 text-sm mb-8">
                Free on CurseForge and Modrinth. NeoForge only.
              </motion.p>
              <motion.div variants={fadeUp} custom={2}>
                <DownloadButtons />
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
                <a
                  href={WIKI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-light hover:text-teal-light/80 transition-colors uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <BookOpen className="w-4 h-4" />
                  Read the wiki
                </a>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-light hover:text-primary-light/80 transition-colors uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <SocialIcon name="discord" className="w-4 h-4" />
                  Join the Discord
                </a>
                <Link
                  to="/press-kits"
                  className="inline-flex items-center gap-2 text-teal-light hover:text-teal-light/80 transition-colors uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Newspaper className="w-4 h-4" />
                  Press kit
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <ServerCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ THE LOOP ═══════════ */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="teal">How a raid works</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get In. Get Loot. Get Out.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loop.map((s, i) => {
              const a = accentClasses[s.accent];
              return (
                <motion.div
                  key={s.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`overflow-hidden bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} ${a.shadow} transition-[border-color,box-shadow] duration-300 rounded-sm ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} hover:rotate-0`}
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback src={s.image} alt={s.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className={`${a.text} text-sm`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        0{i + 1}
                      </span>
                      <h3 className="text-foreground text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                        {s.step}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{s.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ RAID MAPS ═══════════ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="primary">Raid maps</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pick Your Poison
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-xl mx-auto">
              Every raid runs on a timer. When the window closes, lethal gas floods the map, so
              plan your way out before it does.
            </motion.p>
          </motion.div>

          <div className="overflow-x-auto bg-white/[0.02] border-2 border-white/[0.08] rounded-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-white/[0.08]">
                  {["Map", "Raid window", "Size", "To enter"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 sm:px-5 py-3 text-xs uppercase tracking-[0.15em] ${i % 2 === 0 ? "text-teal-light" : "text-primary-light"}`}
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {raidMaps.map((m) => (
                  <tr key={m.name}>
                    <td className="px-4 sm:px-5 py-3 text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                      {m.name}
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-muted-foreground">{m.window}</td>
                    <td className="px-4 sm:px-5 py-3 text-muted-foreground">{m.size}</td>
                    <td className="px-4 sm:px-5 py-3 text-muted-foreground">{m.entry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground/60 text-xs mt-3 text-center">
            Rebirthed players also unlock Phoenix, an Overworld raid that costs 5 Rebirth Sigils to
            enter and pays double. These are the defaults; server owners can tune every map.
          </p>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="teal">Between raids</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Build Something Worth Protecting
            </motion.h2>
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

      {/* ═══════════ GALLERY ═══════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="primary">Screenshots</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Around the World
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((shot, i) => (
              <motion.a
                key={shot.label}
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i % 4}
                className={`group relative block aspect-video overflow-hidden rounded-sm border-2 border-white/[0.12] ${i % 2 === 0 ? "hover:border-teal-light/70" : "hover:border-primary-light/70"} transition-colors`}
              >
                <ImageWithFallback
                  src={shot.src}
                  alt={`ExfilCraft screenshot: ${shot.label}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span
                  className="absolute bottom-2 left-3 text-white text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {shot.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ VIDEO ═══════════ */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="teal">Made by two people</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Mod. Our Server.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-6">
              We're a husband-and-wife team, and ExfilCraft is our custom mod plus the server we
              run for it. We post raids, new features, and behind-the-scenes clips as we build.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="https://www.youtube.com/@KrookedLilly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-light hover:text-primary-light/80 transition-colors uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <SocialIcon name="youtube" className="w-4 h-4" />
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@krookedlilly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal-light hover:text-teal-light/80 transition-colors uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <SocialIcon name="tiktok" className="w-4 h-4" />
                TikTok
              </a>
            </motion.div>
          </motion.div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[18rem] aspect-[9/16] rounded-sm overflow-hidden border-2 border-white/[0.12] shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)] rotate-1">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
                title="My wife and I created a custom mod and server"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="primary">FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Good Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className={`group p-5 bg-white/[0.04] border-2 border-white/[0.08] ${i % 2 === 0 ? "open:border-teal-light/55" : "open:border-primary-light/55"} rounded-sm`}
              >
                <summary
                  className="cursor-pointer list-none flex items-center justify-between gap-4 text-foreground"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {f.q}
                  <span className={`${i % 2 === 0 ? "text-teal-light" : "text-primary-light"} transition-transform group-open:rotate-45 text-xl leading-none`}>+</span>
                </summary>
                <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              One More Chest?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-8 max-w-md mx-auto">
              Grab ExfilCraft, hop on {SERVER_ADDRESS}, and see how much you're willing to risk.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex justify-center">
              <DownloadButtons />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ExfilCraftPage;
