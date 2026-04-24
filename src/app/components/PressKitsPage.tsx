import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Newspaper, Download, Mail } from "lucide-react";
import { PageMeta } from "./PageMeta";

type PressKit = {
  product: string;
  tagline: string;
  file: string;
  size: string;
};

const kits: PressKit[] = [
  {
    product: "HomunculAi",
    tagline: "Desktop app — Windows",
    file: "/press-kits/homunculai-press-kit.zip",
    size: "32 MB",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function PressKitsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Press Kits"
        description="Press kits for KrookedLilly products. Download logos, screenshots, and fact sheets, or request a custom kit."
        path="/press-kits"
      />

      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgba(160,92,246,0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal/10 border border-teal/20 rounded-sm text-teal text-sm mb-4"
          >
            <Newspaper className="w-4 h-4" />
            <span
              className="uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              KrookedLilly
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Press Kits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Logos, screenshots, and fact sheets for press, reviewers, and creators.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            <motion.h2
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl text-primary mb-5 pb-2 border-b-2 border-primary/20"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Available Press Kits
            </motion.h2>

            <ul className="space-y-4 mb-10">
              {kits.map((kit, i) => (
                <motion.li
                  key={kit.product}
                  variants={fadeUp}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white/[0.03] border border-white/[0.08] rounded-sm"
                >
                  <div>
                    <h3
                      className="text-foreground mb-1"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem" }}
                    >
                      {kit.product}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {kit.tagline} &middot; ZIP &middot; {kit.size}
                    </p>
                  </div>
                  <a
                    href={kit.file}
                    download
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-teal hover:bg-teal/90 text-black rounded-sm border-2 border-teal transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)] uppercase tracking-wider text-xs shrink-0"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={fadeUp}
              custom={kits.length + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-6 border-t border-white/[0.08] text-center"
            >
              <p className="text-muted-foreground text-sm mb-4">
                Need a kit for a product that isn't listed? Let us know what you're
                working on and we'll put one together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 hover:border-primary/40 rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.2)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Mail className="w-4 h-4" />
                Request a Press Kit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
