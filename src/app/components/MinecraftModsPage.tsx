import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Blocks, ExternalLink } from "lucide-react";
import { PageMeta } from "./PageMeta";
import { CollectionChip, CollectionStatusPill } from "./collectionUi";
import {
  minecraftMods,
  minecraftModCount,
  CURSEFORGE_AUTHOR_URL,
  MODRINTH_AUTHOR_URL,
  type MinecraftMod,
} from "../data/minecraftMods";

/* ─── animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

/** Small platform CTA button used twice per row (CurseForge + Modrinth). */
function PlatformButton({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "border-primary/40 bg-primary/15 text-primary hover:bg-primary/25"
      : "border-white/15 text-muted-foreground hover:text-foreground hover:border-white/30";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 ${styles} text-xs uppercase tracking-wider transition-colors`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
    >
      {label}
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  );
}

function ModRow({ mod, index }: { mod: MinecraftMod; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={fadeUp}
      custom={index}
      className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 rounded-sm border border-transparent hover:border-white/[0.12] hover:bg-white/[0.04] transition-[background-color,border-color] duration-200"
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <CollectionChip name={mod.name} logo={mod.logo} index={index} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className="text-foreground"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem" }}
            >
              {mod.name}
            </span>
            <CollectionStatusPill status={mod.status} />
          </div>
          <p className="text-muted-foreground text-sm mt-0.5 sm:truncate">{mod.blurb}</p>
        </div>
      </div>

      {/* two platform CTAs — CurseForge primary, Modrinth secondary */}
      <div className="flex items-center gap-2 shrink-0 pl-[3.75rem] sm:pl-0">
        {mod.curseForgeUrl && (
          <PlatformButton href={mod.curseForgeUrl} label="CurseForge" variant="primary" />
        )}
        {mod.modrinthUrl && (
          <PlatformButton href={mod.modrinthUrl} label="Modrinth" variant="secondary" />
        )}
      </div>
    </motion.div>
  );
}

export function MinecraftModsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Minecraft Mods"
        description="A growing set of Minecraft mods from KrookedLilly. Snail Mob, Exfilcraft, Crafter Tweaks, and more, on CurseForge and Modrinth."
        path="/tools/minecraft-mods"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[180px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(160,92,246,0.12)_0%,_transparent_70%)]" />
          <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(34,211,238,0.09)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <motion.div initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.25em] text-primary mb-3"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              CurseForge · Modrinth · Minecraft
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-6xl text-foreground mb-5"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.0 }}
            >
              Minecraft Mods
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mb-8"
              style={{ fontSize: "1.075rem" }}
            >
              A growing set of mods that add creatures, gameplay, and quality-of-life fixes to
              Minecraft. Grab any of them on CurseForge or Modrinth, whichever you prefer.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <a
                href={CURSEFORGE_AUTHOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Blocks className="w-4 h-4" />
                Browse all on CurseForge
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={MODRINTH_AUTHOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 hover:border-white/40 rounded-md transition-all hover:-translate-y-1 uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                On Modrinth
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ MOD LIST ═══════════ */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 px-1">
            <Blocks className="w-4 h-4 text-teal" />
            <h2
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              All {minecraftModCount} mods
            </h2>
          </div>

          <div className="bg-white/[0.02] border-2 border-white/[0.08] rounded-sm p-2 divide-y divide-white/[0.06]">
            {minecraftMods.map((mod, i) => (
              <ModRow key={mod.name} mod={mod} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MinecraftModsPage;
