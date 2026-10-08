import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Layout, Package } from "lucide-react";
import { PageMeta } from "./PageMeta";
import { JsonLd, ORG_REF, pageUrl } from "./JsonLd";
import { CollectionChip, CollectionStatusPill, CountBadge, ExpandableRow } from "./collectionUi";
import {
  unityToolkitAssets,
  unityToolkitCount,
  PUBLISHER_URL,
  UNITY_REQUIREMENTS,
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

/** Store link button; teal or purple to keep the accent rotating row to row. */
function StoreButton({ href, index, children }: { href: string; index: number; children: React.ReactNode }) {
  const accent =
    index % 2 === 0
      ? "border-teal-light/70 bg-teal/15 text-teal-light hover:bg-teal/25"
      : "border-primary-light/70 bg-primary/15 text-primary-light hover:bg-primary/25";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 ${accent} text-xs uppercase tracking-wider transition-colors`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  );
}

function AssetRow({ asset, index }: { asset: UnityAsset; index: number }) {
  return (
    <ExpandableRow
      id={asset.slug}
      index={index}
      header={
        <>
          <CollectionChip name={asset.name} logo={asset.logo} index={index} size="md" />
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
            <p className="text-muted-foreground text-sm mt-0.5">{asset.blurb}</p>
          </div>
        </>
      }
      aside={
        <StoreButton href={asset.storeUrl} index={index}>
          Asset Store
        </StoreButton>
      }
      cover={asset.cover}
      coverAlt={`UI Toolkit: ${asset.name} cover art`}
      features={asset.features}
      meta={`${UNITY_REQUIREMENTS} · On the Unity Asset Store`}
    />
  );
}

export function UiToolkitSuitePage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="UI Toolkit Suite for Unity"
        description={`${unityToolkitCount} drop-in packages for Unity UI Toolkit: screens, tweens, layout, modals, navigation, data binding, theming, forms, Lottie, ECS, 35+ controls, and more.`}
        path="/tools/ui-toolkit"
      />
      <JsonLd
        data={{
          "@type": "ItemList",
          name: "KrookedLilly UI Toolkit Suite",
          url: pageUrl("/tools/ui-toolkit"),
          numberOfItems: unityToolkitCount,
          itemListElement: unityToolkitAssets.map((asset, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: `UI Toolkit: ${asset.name}`,
              description: asset.blurb,
              brand: ORG_REF,
              url: asset.storeUrl,
            },
          })),
        }}
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
              Unity Asset Store · UI Toolkit · Unity 6
            </motion.p>
            <motion.div variants={fadeUp} custom={1} className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5">
              <h1
                className="text-4xl sm:text-6xl text-foreground"
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.0 }}
              >
                UI Toolkit Suite
              </h1>
              <CountBadge>{unityToolkitCount} assets</CountBadge>
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mb-8"
              style={{ fontSize: "1.075rem" }}
            >
              A growing family of ready-to-use packages for Unity's UI Toolkit. Pick the pieces
              you need. Each one ships standalone with its own docs and demo scenes, and they
              switch on integrations with each other from a shared setup window when you own
              more than one.
            </motion.p>
            <motion.a
              variants={fadeUp}
              custom={3}
              href={PUBLISHER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
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
            <Layout className="w-4 h-4 text-teal-light" />
            <h2
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              All {unityToolkitCount} assets
            </h2>
            <span className="ml-auto text-xs text-muted-foreground/60">Tap a row for details</span>
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
