import imgAutoHideHudLogo from "@/assets/autohidehud-logo.png";
import imgCardLabelerLogo from "@/assets/cardlabeler-logo.png";
import { acrostixCardImage } from "../assets/acrostix-screenshots";
import { matchFivesCardImage } from "../assets/matchfives-screenshots";
import { ballDropCardImage } from "../assets/balldrop-screenshots";
import imgStorePageBackground from "@/assets/gps-store-background.png";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Gamepad2, Wrench, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const games = [
  {
    id: "acrostix",
    title: "Acrostix",
    type: "Creative Word Game",
    description:
      "Build sentences from acrostic words and get scored on grammar, complexity, and creativity. Campaign mode with themed islands, endless replayability",
    image: acrostixCardImage,
    imagePosition: "object-top",
    status: "Coming Soon",
    platforms: ["Mobile"],
    accent: "teal" as const,
    rotate: "-rotate-1",
    slug: "/games/acrostix",
  },
  {
    id: "match-fives",
    title: "Match Fives",
    type: "Number Matching",
    description:
      "Match numbers together and chase high scores. Simple to pick up, surprisingly hard to put down",
    image: matchFivesCardImage,
    imagePosition: "object-top",
    status: "Released",
    platforms: ["Mobile"],
    accent: "primary" as const,
    rotate: "rotate-2",
    slug: "/games/match-fives" as string | null,
  },
  {
    id: "50-ball-drop",
    title: "50 Ball Drop",
    type: "Arcade",
    description:
      "Drop balls, watch mayhem unfold, unlock a wild amount of cosmetics. Way more drip than you'd expect",
    image: ballDropCardImage,
    imagePosition: "object-cover",
    status: "Released",
    platforms: ["Mobile"],
    accent: "teal" as const,
    rotate: "-rotate-2",
    slug: "/games/50-ball-drop" as string | null,
  },
];

const mods = [
  {
    title: "AutoHideHud",
    platform: "Minecraft",
    description: "Auto-hides HUD elements to your parameters. See the world, not your hotbar",
    status: "Released",
    accent: "primary" as const,
    rotate: "-rotate-1",
    logo: imgAutoHideHudLogo as string | null,
  },
  {
    title: "Card Labeler",
    platform: "Trello",
    description: "Better labels and sorting for your boards. Organizing cards shouldn't require a PhD",
    status: "Released",
    accent: "primary" as const,
    rotate: "rotate-2",
    logo: imgCardLabelerLogo as string | null,
  },
];

const accentMap = {
  primary: {
    hoverBorder: "hover:border-primary/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.15)]",
    categoryColor: "text-primary",
    statusDot: "bg-primary",
  },
  teal: {
    hoverBorder: "hover:border-teal/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]",
    categoryColor: "text-teal",
    statusDot: "bg-teal",
  },
};

export function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero - GPS Featured */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* GPS Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <Link
              to="/games/galactic-parcel-service"
              className="group block bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] hover:border-primary/40 rounded-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(160,92,246,0.12)] rotate-[0.5deg] hover:rotate-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <ImageWithFallback
                    src={imgStorePageBackground}
                    alt="Galactic Parcel Service"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/60 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 bg-lime text-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] -rotate-3 inline-block rounded-sm"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      Early Access
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span
                    className="text-primary text-xs uppercase tracking-[0.2em] mb-2"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    Simulation · PC & Mobile
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Galactic Parcel Service
                  </h2>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: "1.05rem" }}>
                    Build your S.C.A.M.E.D. fleet and deliver strange packages across randomly generated solar systems. Smuggle contraband, dodge tentacles, mine asteroids, and try not to go broke
                  </p>
                  <p
                    className="text-primary/80 italic mb-6"
                    style={{ fontSize: "0.95rem" }}
                  >
                    "The odds are good, the goods are odd"
                  </p>
                  <div className="flex items-center gap-2 text-lime group-hover:gap-3 transition-all">
                    <span
                      className="uppercase tracking-wider text-sm"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      Check it out
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* More Games */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal flex items-center justify-center -rotate-6 rounded-sm">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl sm:text-4xl text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                More Games
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={1}>
              <Link
                to="/games"
                className="inline-flex items-center gap-2 text-lime hover:text-lime/80 transition-colors uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                See everything
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((game, i) => {
              const accent = accentMap[game.accent];
              return (
                <motion.div
                  key={game.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`group relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${accent.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${accent.shadow} ${game.rotate} hover:rotate-0 rounded-sm will-change-transform ${game.slug ? "cursor-pointer" : ""}`}
                >
                  {game.slug && (
                    <Link
                      to={game.slug}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${game.title} details`}
                    />
                  )}
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={game.image}
                      alt={game.title}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 ${game.imagePosition}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-3 py-1 bg-lime text-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] -rotate-3 inline-block rounded-sm"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                      >
                        {game.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span
                      className={`${accent.categoryColor} text-xs uppercase tracking-wider`}
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {game.type} · {game.platforms.join(" & ")}
                    </span>
                    <h3
                      className="text-foreground mt-1 mb-2"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}
                    >
                      {game.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{game.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mods & Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rotate-6 rounded-sm">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl sm:text-4xl text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Mods & Tools
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={1}>
              <Link
                to="/games"
                className="inline-flex items-center gap-2 text-lime hover:text-lime/80 transition-colors uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                See everything
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mods.map((mod, i) => {
              const accent = accentMap[mod.accent];
              return (
                <motion.div
                  key={mod.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`p-6 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${accent.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${accent.shadow} ${mod.rotate} hover:rotate-0 rounded-sm will-change-transform`}
                >
                  {mod.logo && (
                    <div className="mb-4">
                      <ImageWithFallback
                        src={mod.logo}
                        alt={`${mod.title} logo`}
                        className="w-16 h-16 rounded-sm object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`${accent.categoryColor} text-xs uppercase tracking-wider`}
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {mod.platform}
                    </span>
                    <span
                      className="px-2 py-0.5 bg-white/[0.06] border border-white/[0.12] text-muted-foreground text-xs uppercase tracking-wider rounded-sm"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {mod.status}
                    </span>
                  </div>
                  <h3
                    className="text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}
                  >
                    {mod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{mod.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-5">
              <Sparkles className="w-5 h-5 text-primary -rotate-12" />
              <Sparkles className="w-5 h-5 text-teal rotate-6" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-2xl sm:text-4xl text-foreground mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              More on the way
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-6 max-w-md mx-auto">
              We've always got something cooking. Hit us up if you want to follow along or just say hey
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/games"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Browse everything
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 hover:border-white/40 rounded-md transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Say hi
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;