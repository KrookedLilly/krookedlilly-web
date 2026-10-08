import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Brush, Layers, Package, Sparkles } from "lucide-react";
import imgStatic from "@/assets/squamojis-static.webp";
import imgAnimated from "@/assets/squamojis-animated.webp";
import imgBundle from "@/assets/squamojis-bundle.webp";
import imgPreview from "@/assets/squamojis-preview.webp";
import imgCloseup from "@/assets/squamojis-closeup.webp";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageMeta } from "./PageMeta";
import { JsonLd, ORG_REF, SITE_URL, pageUrl } from "./JsonLd";

const PATH = "/tools/squamojis";

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
    chip: "text-primary-light bg-primary/10 border-primary-light/40",
    hoverBorder: "hover:border-primary-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]",
    button: "border-primary-light/70 bg-primary/15 text-primary-light hover:bg-primary/25",
  },
  teal: {
    text: "text-teal-light",
    chip: "text-teal-light bg-teal/10 border-teal-light/40",
    hoverBorder: "hover:border-teal-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]",
    button: "border-teal-light/70 bg-teal/15 text-teal-light hover:bg-teal/25",
  },
};

interface Pack {
  id: string;
  name: string;
  image: string;
  summary: string;
  includes: string[];
  stores: { label: string; url: string }[];
  accent: "primary" | "teal";
}

const packs: Pack[] = [
  {
    id: "static",
    name: "Squamojis",
    image: imgStatic,
    summary: "80 original square emoji in 3 styles: color, black-and-white, and outline. 240 icons total.",
    includes: [
      "Editable SVG and layered PSD",
      "PNG at 8 sizes, 512px down to 16px",
      "A sprite per layer plus 3 atlas sheets",
      "Bonus Unity prefabs",
    ],
    stores: [
      { label: "itch.io", url: "https://krookedlilly.itch.io/squamojis-240-static" },
      { label: "GameDevMarket", url: "https://www.gamedevmarket.net/asset/squamojis-2d-square-emoji-icons-2403-styles-svg-psd-png-2" },
    ],
    accent: "teal",
  },
  {
    id: "animated",
    name: "Animated Squamojis",
    image: imgAnimated,
    summary: "The same 80 emoji in 3 styles as 240 seamless looping animations.",
    includes: [
      "Sprite sheet with atlas for every animation",
      "Lottie JSON for every animation",
      "Animated SVG for every animation",
      "Bonus Unity prefabs with clips and controllers",
    ],
    stores: [
      { label: "itch.io", url: "https://krookedlilly.itch.io/squamojis-240-animated" },
      { label: "GameDevMarket", url: "https://www.gamedevmarket.net/asset/animated-squamojis-2d-square-emoji-icons-2403-styles-sprite-sheets-lottie-svg-2-yf8m" },
    ],
    accent: "primary",
  },
  {
    id: "bundle",
    name: "Squamojis Bundle",
    image: imgBundle,
    summary: "Both packs together: every still and every animated squamoji, in all 3 styles.",
    includes: ["Squamojis (still)", "Animated Squamojis", "Every squamoji in one purchase"],
    stores: [
      { label: "GameDevMarket", url: "https://www.gamedevmarket.net/asset/squamojis-bundle-2403-styles-still-animated-emoji" },
    ],
    accent: "teal",
  },
];

const highlights = [
  { icon: Brush, title: "Hand-made", desc: "Drawn by us. No generative AI anywhere in the pack", accent: "primary" as const },
  { icon: Layers, title: "Three styles", desc: "Full color, black-and-white, and outline versions of every face", accent: "teal" as const },
  { icon: Package, title: "Engine-ready", desc: "Sprite sheets, atlases, and Unity prefabs so they drop straight into a project", accent: "primary" as const },
  { icon: Sparkles, title: "Commercial use", desc: "Use them in your games and apps. Licensing per store", accent: "teal" as const },
];

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

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function SquamojisPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Squamojis: 240 Square Emoji Icons for Games"
        description="Squamojis: 80 hand-made square emoji in 3 styles, still or animated. SVG, PSD, PNG, sprite sheets, Lottie, and Unity prefabs on itch.io and GameDevMarket."
        path={PATH}
        image="/squamojis-og.png"
      />
      <JsonLd
        data={{
          "@graph": packs.map((p) => ({
            "@type": "Product",
            "@id": `${pageUrl(PATH)}#${p.id}`,
            name: p.name,
            description: p.summary,
            image: `${SITE_URL}/squamojis-og.png`,
            brand: ORG_REF,
            url: `${pageUrl(PATH)}#packs`,
            sameAs: p.stores.map((s) => s.url),
          })),
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-20">
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
            <motion.div initial="hidden" animate="visible">
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-xs uppercase tracking-[0.25em] text-teal-light mb-3"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                2D Icon Pack · itch.io · GameDevMarket
              </motion.p>
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-7xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
              >
                <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                  Squamojis
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground max-w-md mb-4"
                style={{ fontSize: "1.125rem" }}
              >
                80 square emoji with a lot of personality, each in 3 styles. Grab them still,
                animated, or both, ready for your game's chat, reactions, UI, or anything else
                that needs a face.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="text-muted-foreground/60 text-sm mb-8 max-w-md">
                They're the same squamoji you send as reactions in{" "}
                <Link to="/games/acrostix" className="text-teal-light hover:text-teal-light/80 underline underline-offset-2">
                  Acrostix
                </Link>
                .
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                <a
                  href="#packs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  See the packs
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <ImageWithFallback
                src={imgCloseup}
                alt="A grid of green square emoji faces: tongue out, party horn, glasses, sleepy, and more"
                className="w-full max-w-lg rounded-sm border-2 border-white/[0.12] shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)] rotate-1"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ PACKS ═══════════ */}
      <section id="packs" className="py-20 scroll-mt-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="primary">The packs</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Still, Animated, or Both
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((p, i) => {
              const a = accentClasses[p.accent];
              return (
                <motion.div
                  key={p.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`flex flex-col overflow-hidden bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} ${a.shadow} transition-[border-color,box-shadow] duration-300 rounded-sm ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} hover:rotate-0`}
                >
                  <ImageWithFallback src={p.image} alt={`${p.name} cover art`} className="w-full aspect-[7/4] object-cover" />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-foreground mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}>
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{p.summary}</p>
                    <ul className="space-y-1.5 mb-6 text-sm text-muted-foreground">
                      {p.includes.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className={a.text}>+</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {p.stores.map((s) => (
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 ${a.button} text-xs uppercase tracking-wider transition-colors`}
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                        >
                          {s.label}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-muted-foreground/60 text-xs mt-6 text-center">
            The bundle is on GameDevMarket only.
          </p>
        </div>
      </section>

      {/* ═══════════ WHAT'S INSIDE ═══════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4">
              <SectionLabel accent="teal">What's inside</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-5xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Face, Three Ways
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <ImageWithFallback
              src={imgPreview}
              alt="All 240 Squamojis in Unity: black-and-white, full color, and outline sets side by side"
              className="w-full rounded-sm border-2 border-white/[0.12] shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.12)]"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => {
              const a = accentClasses[h.accent];
              return (
                <motion.div
                  key={h.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`p-6 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} ${a.shadow} transition-[border-color,box-shadow] duration-300 rounded-sm`}
                >
                  <h.icon className={`w-6 h-6 ${a.text} mb-3`} />
                  <h3 className="text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    {h.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{h.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SquamojisPage;
