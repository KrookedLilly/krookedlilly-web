import { motion } from "motion/react";
import { Flame, Heart, Sparkles, Target, Zap, Gamepad2 } from "lucide-react";
import { LogoCircle } from "./LogoCircle";
import { PageMeta } from "./PageMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const principles = [
  {
    icon: Flame,
    title: "No Faking It",
    description:
      "If we don't genuinely love what we're making, we scrap it. Life's too short for uninspired work",
    color: "bg-primary",
    tilt: "rotate-1",
    hoverBorder: "hover:border-primary/30",
    shadow: "hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.15)]",
  },
  {
    icon: Heart,
    title: "People > Metrics",
    description:
      "We build for actual humans. Not engagement numbers, not download counts. Just things people actually want to use",
    color: "bg-teal",
    tilt: "-rotate-2",
    hoverBorder: "hover:border-teal/30",
    shadow: "hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.15)]",
  },
  {
    icon: Sparkles,
    title: "Forever Figuring It Out",
    description:
      "Self-taught and proud of it. Every project teaches us something new, and that's the whole point",
    color: "bg-primary",
    tilt: "rotate-2",
    hoverBorder: "hover:border-primary/30",
    shadow: "hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.15)]",
  },
  {
    icon: Target,
    title: "Weird On Purpose",
    description:
      "Normal is boring. We'd rather make something strange that sticks with you than something safe that doesn't",
    color: "bg-teal",
    tilt: "-rotate-1",
    hoverBorder: "hover:border-teal/30",
    shadow: "hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.15)]",
  },
];

const whatWeDo = [
  {
    icon: Gamepad2,
    label: "Games",
    description: "From space delivery sims to word games — if it sounds fun and a bit off-kilter, we're probably building it",
    color: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/10",
  },
  {
    icon: Sparkles,
    label: "Tools",
    description: "Occasionally we build little utilities that make our lives easier — and then share them, in case others find them useful",
    color: "text-lime",
    border: "border-lime/20",
    bg: "bg-lime/10",
  },
  {
    icon: Zap,
    label: "Mods",
    description: "Small quality-of-life tweaks for games we already play. Scratching our own itch, basically",
    color: "text-teal",
    border: "border-teal/20",
    bg: "bg-teal/10",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="About"
        description="About KrookedLilly — the indie studio behind HomunculAI, Acrostix, Galactic Parcel Service, and a handful of sharp tools and mods."
        path="/about"
      />
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[radial-gradient(circle,_rgba(160,92,246,0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-16 left-1/4 w-56 h-56 bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About KrookedLilly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            An indie studio with big ideas, questionable time management, and a dangerous love of making things
          </motion.p>
        </div>
      </section>

      {/* The Studio */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} custom={0} className="relative">
                <div className="flex items-center justify-center -rotate-2 hover:rotate-0 transition-transform">
                  <LogoCircle
                    className="w-64 h-64 lg:w-80 lg:h-80 text-white drop-shadow-[0_0_40px_rgba(160,92,246,0.3)]"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="text-xs uppercase tracking-[0.25em] text-black bg-lime px-3 py-1.5 rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] inline-block rotate-2"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                The Studio
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl text-foreground mt-4 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fueled by{" "}
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Mayhem
                </span>
              </motion.h2>
              <motion.div
                variants={fadeUp}
                custom={2}
                className="space-y-4 text-muted-foreground"
              >
                <p>
                  KrookedLilly is a husband and wife team that makes games, apps, mods, and
                  whatever else we feel like. We started separately in our lives, came
                  together without expecting how well it would work, and now we're here —
                  building things we believe in and hoping other people find them worth
                  their time.
                </p>
                <p>
                  There's no five-year roadmap here. Just hyper-focused late-nights and
                  the kind of stubbornness that turns "What about this...?" into something
                  real.
                </p>
                <p>
                  Making things is the whole reason we do this.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Make */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What We Make
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              A little bit of everything, none of it normal
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeDo.map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`p-6 bg-white/[0.06] border-2 border-white/[0.12] hover:border-white/[0.2] transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 rounded-sm will-change-transform ${
                  i === 0 ? "rotate-1" : i === 1 ? "-rotate-1" : "rotate-2"
                } hover:rotate-0`}
              >
                <div
                  className={`w-12 h-12 ${item.bg} border ${item.border} flex items-center justify-center mb-4 -rotate-6 rounded-sm`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3
                  className="text-foreground mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-5xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How We Roll
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((value, i) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`text-center p-6 bg-white/[0.06] border-2 border-white/[0.12] ${value.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${value.shadow} ${value.tilt} hover:rotate-0 rounded-sm will-change-transform`}
              >
                <div
                  className={`w-12 h-12 ${value.color} flex items-center justify-center mx-auto mb-4 -rotate-6 rounded-sm`}
                >
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-foreground mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}