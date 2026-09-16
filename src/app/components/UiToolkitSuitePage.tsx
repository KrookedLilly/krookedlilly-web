import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Layout, Package } from "lucide-react";
import { PageMeta } from "./PageMeta";
import { CollectionChip, CollectionStatusPill } from "./collectionUi";
import {
  unityToolkitAssets,
  unityToolkitCount,
  PUBLISHER_URL,
  type UnityAsset,
} from "../data/unityAssets";

/* ─── animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

function AssetRow({ asset, index }: { asset: UnityAsset; index: number }) {
  return (
    <motion.a
      href={asset.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={fadeUp}
      custom={index}
      className="group flex items-center gap-4 px-4 sm:px-5 py-3.5 rounded-sm border border-transparent hover:border-white/[0.12] hover:bg-white/[0.04] transition-[background-color,border-color] duration-200"
    >
      <CollectionChip name={asset.name} logo={asset.logo} index={index} size="md" />

      {/* name + blurb */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className="text-foreground"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem" }}
          >
            {asset.name}
          </span>
          <CollectionStatusPill status={asset.status} />
        </div>
        <p className="text-muted-foreground text-sm mt-0.5 truncate">{asset.blurb}</p>
      </div>

      {/* CTA */}
      <span
        className="hidden sm:inline-flex items-center gap-1.5 text-muted-foreground group-hover:text-teal transition-colors uppercase tracking-wider text-xs shrink-0"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
      >
        View on Asset Store
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <ArrowUpRight className="sm:hidden w-4 h-4 text-muted-foreground group-hover:text-teal shrink-0" />
    </motion.a>
  );
}

export function UiToolkitSuitePage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="UI Toolkit Suite"
        description="A growing suite of drop-in packages for Unity's UI Toolkit. Screen management, tweening, layout, modals, and navigation, all on the Unity Asset Store."
        path="/tools/ui-toolkit"
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
              Unity Asset Store · UI Toolkit
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-6xl text-foreground mb-5"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.0 }}
            >
              UI Toolkit Suite
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mb-8"
              style={{ fontSize: "1.075rem" }}
            >
              A growing family of ready-to-use packages for Unity's UI Toolkit. Pick the one
              piece you need or grab the whole set. Each ships standalone with its own docs and
              demo scenes.
            </motion.p>
            <motion.a
              variants={fadeUp}
              custom={3}
              href={PUBLISHER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] uppercase tracking-wider text-sm"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              <Package className="w-4 h-4" />
              Browse all on the Unity Asset Store
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ ASSET LIST ═══════════ */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 px-1">
            <Layout className="w-4 h-4 text-teal" />
            <h2
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              All {unityToolkitCount} assets
            </h2>
          </div>

          <div className="bg-white/[0.02] border-2 border-white/[0.08] rounded-sm p-2 divide-y divide-white/[0.06]">
            {unityToolkitAssets.map((asset, i) => (
              <AssetRow key={asset.name} asset={asset} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UiToolkitSuitePage;
