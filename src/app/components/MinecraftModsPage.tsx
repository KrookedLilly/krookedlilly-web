import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Blocks, ExternalLink } from "lucide-react";
import { PageMeta } from "./PageMeta";
import { CollectionChip, CollectionStatusPill, CountBadge, ExpandableRow } from "./collectionUi";
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

/**
 * Small platform CTA button used twice per row. Each host keeps its own color
 * (CurseForge purple, Modrinth teal) so neither reads as the lesser option.
 */
function PlatformButton({
  href,
  label,
  accent,
}: {
  href: string;
  label: string;
  accent: "primary" | "teal";
}) {
  const styles =
    accent === "primary"
      ? "border-primary-light/70 bg-primary/15 text-primary-light hover:bg-primary/25"
      : "border-teal-light/70 bg-teal/15 text-teal-light hover:bg-teal/25";
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
    <ExpandableRow
      id={mod.slug}
      index={index}
      header={
        <>
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
            <p className="text-muted-foreground text-sm mt-0.5">{mod.blurb}</p>
            <p
              className="text-muted-foreground/60 text-[0.7rem] uppercase tracking-wider mt-1"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              {mod.loaders.join(" · ")} · Minecraft {mod.versions}
            </p>
          </div>
        </>
      }
      aside={
        // platform CTAs: site page (if any), CurseForge primary, Modrinth secondary
        <>
          {mod.detailPath && (
            <Link
              to={mod.detailPath}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 border-lime/40 bg-lime/15 text-lime hover:bg-lime/25 text-xs uppercase tracking-wider transition-colors"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              Details
            </Link>
          )}
          {mod.curseForgeUrl && (
            <PlatformButton href={mod.curseForgeUrl} label="CurseForge" accent="primary" />
          )}
          {mod.modrinthUrl && (
            <PlatformButton href={mod.modrinthUrl} label="Modrinth" accent="teal" />
          )}
        </>
      }
      cover={mod.cover}
      coverAlt={`${mod.name} screenshot`}
      features={mod.features}
      meta={`${mod.loaders.join(" · ")} · Minecraft ${mod.versions} · ${mod.side}`}
    />
  );
}

export function MinecraftModsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Minecraft Mods"
        description="Free Minecraft mods from KrookedLilly on CurseForge and Modrinth: ExfilCraft, Auto Hide HUD, Hall Effect: Analog Keyboard Movement, and Snail Mob."
        path="/tools/minecraft-mods"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-6 pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[180px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.12)_0%,_transparent_70%)]" />
          <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.09)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary-light transition-colors text-sm uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <motion.div initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.25em] text-primary-light mb-3"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              CurseForge · Modrinth · Minecraft
            </motion.p>
            <motion.div variants={fadeUp} custom={1} className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5">
              <h1
                className="text-4xl sm:text-6xl text-foreground"
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.0 }}
              >
                Minecraft Mods
              </h1>
              <CountBadge>{minecraftModCount} mods</CountBadge>
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mb-8"
              style={{ fontSize: "1.075rem" }}
            >
              From a full extraction-survival overhaul to small quality-of-life fixes, these are the
              mods we make for the game we keep coming back to. All free on CurseForge and Modrinth,
              whichever you prefer.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <a
                href={CURSEFORGE_AUTHOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
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
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--teal-rgb)/0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <Blocks className="w-4 h-4" />
                Browse all on Modrinth
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
            <Blocks className="w-4 h-4 text-teal-light" />
            <h2
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              All {minecraftModCount} mods
            </h2>
            <span className="ml-auto text-xs text-muted-foreground/60">Tap a row for details</span>
          </div>

          <div className="bg-white/[0.02] border-2 border-white/[0.08] rounded-sm p-2 divide-y divide-white/[0.06]">
            {minecraftMods.map((mod, i) => (
              <ModRow key={mod.name} mod={mod} index={i} />
            ))}
          </div>

          {/* Same name, different product: the Unity asset has its own page */}
          <p className="mt-12 text-center text-muted-foreground/70 text-sm">
            Also check out our{" "}
            <Link to="/tools/he-keyboards" className="text-teal-light hover:text-teal-light/80 underline underline-offset-2">
              Unity asset for HE Keyboards
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default MinecraftModsPage;
