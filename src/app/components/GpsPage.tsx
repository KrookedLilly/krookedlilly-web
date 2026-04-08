import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Rocket,
  Pickaxe,
  Package,
  Shield,
  Map,
  Globe,
  Megaphone,
  Users,
  Skull,
  Sparkles,
  Star,
  Crosshair,
  Clock,
} from "lucide-react";

/* ── asset imports ── */
import imgStorePageBackground from "@/assets/gps-store-background.png";
import imgGpsLogo from "@/assets/gps-logo.png";
import imgTutorialScreenshot from "@/assets/gps-tutorial.png";
import imgNarwhal from "@/assets/gps-narwhal.png";
import imgTentacle from "@/assets/gps-tentacle.png";
import imgPlanet4 from "@/assets/gps-planet4.png";
import imgPlanet6 from "@/assets/gps-planet6.png";
import imgPlanet2 from "@/assets/gps-planet2.png";
import imgDeadPlanet from "@/assets/gps-dead-planet.png";
import imgSolarSystem from "@/assets/gps-solar-system.png";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─── feature data ─── */
const features = [
  {
    icon: Package,
    title: "Deliver Everything",
    desc: "Packages, contraband, hazardous cargo — your clients don't ask questions and neither should you. Contraband gets your ships arrested. Hazardous cargo can blow them up. Build automated routes and pray for the best",
    accent: "teal" as const,
  },
  {
    icon: Pickaxe,
    title: "Mine Asteroids",
    desc: "Crack open asteroids for raw materials to build ships, upgrades, and stations. Some rocks are more generous than others",
    accent: "primary" as const,
  },
  {
    icon: Globe,
    title: "Terraform Planets",
    desc: "Turn dead rocks into thriving worlds. Build moon bases, establish fuel stations, and terraform planets to expand your delivery empire",
    accent: "teal" as const,
  },
  {
    icon: Rocket,
    title: "Build Your Fleet",
    desc: "Your Semi-autonomous Cargo, Attack, Mining, Exploration, and Defense fleet — S.C.A.M.E.D. for short. Yeah, you got scammed into running this thing. Outfit them, automate their routes, and let them do the heavy lifting",
    accent: "primary" as const,
  },
  {
    icon: Map,
    title: "Explore Ship Wrecks",
    desc: "Stumble across derelict ships floating in the void. Search them for maps to hidden solar systems, rare loot, and stories of crews less lucky than you",
    accent: "teal" as const,
  },
  {
    icon: Skull,
    title: "Steal Packages",
    desc: "Why deliver when you can just... take? Intercept cargo, loot your own clients, and sell stolen goods. Morality is optional in space",
    accent: "primary" as const,
  },
  {
    icon: Shield,
    title: "Defend Your Cargo",
    desc: "Enemy ships and space tentacles want your stuff. Arm your fleet, upgrade your defenses, and fight off anything that gets too close",
    accent: "teal" as const,
  },
  {
    icon: Megaphone,
    title: "Grow Your Business",
    desc: "Advertise your services, ferry clients between planets, and build a reputation. Good deliveries mean more customers — and more customers mean more weird packages",
    accent: "primary" as const,
  },
  {
    icon: Users,
    title: "Build Clientele",
    desc: "Planets outside your reach are begging for deliveries. Expand your network, build Hub Stations in new solar systems, and become the galaxy's most reliable (or infamous) courier",
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

export function GpsPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal/8 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back nav */}
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>

          {/* Cinematic banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-sm overflow-hidden border-2 border-white/[0.12] mb-12"
          >
            <div className="relative aspect-[21/9] sm:aspect-[2.5/1]">
              <img
                src={imgStorePageBackground}
                alt="Galactic Parcel Service — space scene with planets and ships"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
            </div>

            {/* Logo + info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                <img
                  src={imgGpsLogo}
                  alt="Galactic Parcel Service logo"
                  className="w-40 sm:w-52 lg:w-64 drop-shadow-2xl"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md -rotate-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">In Development</span>
                  </span>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    <Monitor className="w-4 h-4 text-primary" />
                    <span className="text-sm uppercase tracking-wider">PC</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm text-muted-foreground"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    <Smartphone className="w-4 h-4 text-teal" />
                    <span className="text-sm uppercase tracking-wider">Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tagline + pitch */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-muted-foreground mb-3"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              Build a fleet of automated ships, deliver packages across randomly generated
              solar systems, and try not to get blown up by space tentacles along the way.
              Open-world, play-your-way space delivery — contraband, hazardous cargo, and all
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground/60 text-sm"
            >
              Built by Krooked. Art by Lilly. Fueled by an unreasonable amount of scope creep
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHAT IS GPS ══════════ */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Copy */}
            <div>
              <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
                <span
                  className="text-xs uppercase tracking-[0.25em] text-teal bg-teal/10 px-3 py-1 rounded-sm border border-teal/20"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  The Pitch
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-5xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Space FedEx,<br />But Unhinged
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground mb-4"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                You're a delivery company in space. Planets need their packages, and you're the one
                crazy enough to haul them through asteroid fields, hostile territory, and whatever
                else the galaxy throws at you. Build ships, automate routes, expand your reach —
                or steal everything and go full space pirate. Your call
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground"
                style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                Every solar system is randomly generated, every client has something weird to ship,
                and the more you look, the stranger it gets. But be careful — mismanage your fleet,
                lose too many clients, or blow through your budget, and you'll go broke faster than
                you can say "space bankruptcy." The galaxy doesn't judge, but it doesn't bail you out either
              </motion.p>
            </div>

            {/* Tutorial screenshot */}
            <motion.div variants={fadeUp} custom={2} className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-125" />
                <div className="relative rounded-sm overflow-hidden border-2 border-white/[0.12] rotate-1 hover:rotate-0 transition-transform duration-500 shadow-[6px_6px_0px_0px_rgba(160,92,246,0.2)]">
                  <img
                    src={imgTutorialScreenshot}
                    alt="GPS tutorial gameplay — building routes around a sun with planets"
                    className="w-full max-w-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ THE GOODS ARE ODD ═══════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-lime/5 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <span
                className="text-xs uppercase tracking-[0.25em] text-lime bg-lime/10 px-3 py-1 rounded-sm border border-lime/20"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Tagline
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="bg-gradient-to-r from-primary via-teal to-lime bg-clip-text text-transparent">
                "The Odds Are Good,
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime via-teal to-primary bg-clip-text text-transparent">
                The Goods Are Odd"
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
            >
              Ever wonder what's in all those packages? You'll find out. Clients across the galaxy
              are shipping absurd things from day one — and the more you look into what's actually
              in those boxes, the weirder it gets. Some of it's valuable. Some of it's contraband
              that'll get your ships arrested. Some of it's hazardous enough to blow them up.
              All of it's entertaining
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ RANDOMLY GENERATED WORLDS ═══════════ */}
      <section className="py-24 relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-teal/6 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Procedural Generation
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No Two Worlds Alike
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
            >
              Each new game generates 50+ unique solar systems. Every one has different suns,
              planets, moons, and asteroid fields — and everything moves. Moons orbit planets,
              planets orbit suns, asteroids drift through systems, and entire solar systems orbit
              the center of the map. It's a living galaxy that never plays the same way twice
            </motion.p>
          </motion.div>

          {/* Solar system overview — hero screenshot */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-16 flex justify-center"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="relative max-w-4xl w-full"
            >
              <div className="absolute inset-0 bg-teal/8 blur-[100px] rounded-full scale-110 pointer-events-none" />
              <div className="relative rounded-sm overflow-hidden border-2 border-teal/30 hover:border-teal/50 transition-all hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)] hover:shadow-[8px_8px_0px_0px_rgba(34,211,238,0.25)]">
                <img
                  src={imgSolarSystem}
                  alt="Solar system overview — a glowing blue-white star surrounded by orbiting planets, moons, and asteroids, one of 50+ randomly generated systems per game"
                  className="w-full"
                />
              </div>
              {/* Caption */}
              <motion.p
                variants={fadeUp}
                custom={1}
                className="text-center mt-4 text-muted-foreground/60 text-sm italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                One of 50+ randomly generated solar systems. Every orbit, every planet, every moon — different every game
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Planet showcase */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center"
          >
            {[
              { src: imgPlanet4, alt: "A randomly generated planet with teal oceans and brown landmasses", tilt: "-rotate-3", delay: 0, border: "border-teal/30", hoverBorder: "hover:border-teal/50", shadow: "shadow-[4px_4px_0px_0px_rgba(34,211,238,0.15)]", hoverShadow: "hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.25)]" },
              { src: imgPlanet6, alt: "A randomly generated small planet system with moons", tilt: "rotate-2", delay: 1, border: "border-primary/30", hoverBorder: "hover:border-primary/50", shadow: "shadow-[4px_4px_0px_0px_rgba(160,92,246,0.15)]", hoverShadow: "hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.25)]" },
              { src: imgPlanet2, alt: "A randomly generated purple and magenta planet", tilt: "-rotate-1", delay: 2, border: "border-teal/30", hoverBorder: "hover:border-teal/50", shadow: "shadow-[4px_4px_0px_0px_rgba(34,211,238,0.15)]", hoverShadow: "hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.25)]" },
              { src: imgDeadPlanet, alt: "A dead planet — cracked molten surface glowing with lava, waiting to be terraformed", tilt: "rotate-3", delay: 3, border: "border-primary/30", hoverBorder: "hover:border-primary/50", shadow: "shadow-[4px_4px_0px_0px_rgba(160,92,246,0.15)]", hoverShadow: "hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.25)]" },
            ].map((planet, i) => (
              <motion.div
                key={planet.alt}
                variants={fadeUp}
                custom={planet.delay}
                className={`group relative rounded-sm overflow-hidden border-2 ${planet.border} ${planet.hoverBorder} ${planet.tilt} hover:rotate-0 transition-[border-color,box-shadow] duration-300 hover:-translate-y-3 ${planet.shadow} ${planet.hoverShadow} will-change-transform`}
              >
                <div className="aspect-square bg-black/40">
                  <img
                    src={planet.src}
                    alt={planet.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {i === 3 && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <span
                      className="text-xs text-primary/80 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      Before Terraforming
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
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
              A Whole Galaxy of Stuff To Do
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Deliver, mine, build, steal, terraform, fight — or just vibe in space. It's your empire
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const a = accentClasses[feat.accent];
              const tilts = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-1"];
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

      {/* ═══════════ ENEMIES & THE NARWHAL ═══════════ */}
      <section className="py-24 relative bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal/6 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Wildlife & Threats
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              You're Not Alone Out There
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Space is full of things that want your cargo. And one majestic thing that just wants to swim
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Tentacles */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group"
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="relative rounded-sm overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all -rotate-1 hover:rotate-0 hover:-translate-y-2 shadow-[4px_4px_0px_0px_rgba(160,92,246,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.3)] inline-block bg-black/50"
              >
                <img
                  src={imgTentacle}
                  alt="A weird organic tentacle appendage — pink and cyan, covered in spots, dancing menacingly"
                  className="block max-h-[360px] w-auto"
                />
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    <Crosshair className="w-5 h-5 text-black" />
                  </span>
                  <h3
                    className="text-foreground uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}
                  >
                    Enemy Tentacles
                  </h3>
                </div>
                <p className="text-muted-foreground" style={{ lineHeight: 1.7 }}>
                  They dance. They attack. They want your cargo. Enemy ships and weird
                  organic tentacle appendages are some of the many threats lurking in every solar system.
                  Arm your fleet or watch your deliveries get snatched
                </p>
              </motion.div>
            </motion.div>

            {/* Space Narwhal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group"
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="relative rounded-sm overflow-hidden border-2 border-teal/30 hover:border-teal/50 transition-all rotate-1 hover:rotate-0 hover:-translate-y-2 shadow-[4px_4px_0px_0px_rgba(34,211,238,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.3)]"
              >
                <div className="relative aspect-video bg-black/30">
                  <img
                    src={imgNarwhal}
                    alt="The Space Narwhal — a majestic purple narwhal with cyan accents swimming through space"
                    className="w-full h-full object-contain p-6"
                  />
                  {/* Subtle glow behind */}
                  <div className="absolute inset-0 bg-teal/5 -z-10" />
                </div>
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 bg-teal flex items-center justify-center rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    <Star className="w-5 h-5 text-black" />
                  </span>
                  <h3
                    className="text-foreground uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}
                  >
                    The Space Narwhal
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3" style={{ lineHeight: 1.7 }}>
                  Every so often, a mysterious narwhal swims across your screen. It's beautiful.
                  It's majestic. It may or may not be worth killing
                </p>
                <p
                  className="text-primary/80 text-sm italic"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  (You're a monster for even thinking about it)
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ OPEN WORLD FREEDOM ═══════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[160px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-teal/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Open World
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Play Your Way
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                emoji: "📈",
                title: "The Entrepreneur",
                desc: "Build your delivery empire the honest way. Grow your fleet, expand to new solar systems, and become the galaxy's most reliable courier",
                accent: "teal" as const,
                tilt: "-rotate-1",
              },
              {
                emoji: "🏴‍☠️",
                title: "The Space Pirate",
                desc: "Steal every package. Rob your clients. Sell contraband. The galaxy is your oyster and you've got a crowbar",
                accent: "primary" as const,
                tilt: "rotate-2",
              },
              {
                emoji: "🧭",
                title: "The Explorer",
                desc: "Fly off into the unknown. Search ship wrecks for maps, discover hidden solar systems, and see what's out there. The deliveries can wait",
                accent: "teal" as const,
                tilt: "-rotate-2",
              },
            ].map((style, i) => {
              const a = accentClasses[style.accent];
              return (
                <motion.div
                  key={style.title}
                  variants={fadeUp}
                  custom={i}
                  className={`group p-8 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${style.tilt} hover:rotate-0 rounded-sm text-center will-change-transform`}
                >
                  <span className="text-4xl mb-4 block">{style.emoji}</span>
                  <h3
                    className="text-foreground mb-3 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {style.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{style.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-24 relative bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[160px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-teal/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-6">
              <Rocket className="w-5 h-5 text-primary -rotate-12" />
              <Package className="w-6 h-6 text-teal rotate-12" />
              <Sparkles className="w-5 h-5 text-lime -rotate-6" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to Deliver?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground mb-8 max-w-lg mx-auto"
              style={{ fontSize: "1.05rem" }}
            >
              Galactic Parcel Service is currently in development. Stay tuned as we build
              out the galaxy and shape the game. The galaxy will need couriers soon
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://store.steampowered.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Rocket className="w-4 h-4" />
                Wishlist on Steam
              </a>
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