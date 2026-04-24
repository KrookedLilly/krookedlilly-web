import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Globe, ArrowLeft } from "lucide-react";
import { PageMeta } from "./PageMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Section({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.section
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mb-10"
    >
      <h2
        className="text-xl text-primary mb-3 pb-2 border-b-2 border-primary/20"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export function HomunculAiSalesRestrictionsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="HomunculAi Sales Restrictions"
        description="Sales restrictions for HomunculAi."
        path="/games/homunculai/sales-restrictions"
        noIndex
      />
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgba(160,92,246,0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/games/homunculai"
            className="flex w-fit items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider mb-6"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HomunculAi
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-sm text-primary text-sm mb-4"
          >
            <Globe className="w-4 h-4" />
            <span
              className="uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              HomunculAi
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sales Restrictions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Territorial restrictions on the sale and use of HomunculAi. Last updated April 13, 2026.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground mb-4">
                This is not legal advice. This list is maintained by KrookedLilly as a companion to the HomunculAi{" "}
                <Link
                  to="/games/homunculai/terms"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  Terms of Use
                </Link>{" "}
                (Section 11 — Export Controls and Territorial Restrictions). The list is subject to change as applicable laws, distributor policies, and KrookedLilly's business decisions evolve.
              </div>
              <p className="text-muted-foreground">
                HomunculAi is not sold, licensed, or supported in the regions
                listed below. This list is referenced from Section 11 of the
                HomunculAi Terms of Use and may be updated without a Terms
                version bump, as permitted by that section.
              </p>
              <p className="text-muted-foreground mt-3">
                Enforcement is primarily handled by KrookedLilly's authorized
                distributor (currently Lemon Squeezy) through its point-of-sale
                compliance system. Users in restricted regions who obtain
                HomunculAi through any means are not granted a license under the
                Terms of Use (see Section 9 — Intellectual Property and Authorized
                Copies).
              </p>
            </motion.div>

            <Section title="Restricted Regions (U.S. Comprehensive Sanctions)" index={1}>
              <p className="text-muted-foreground mb-3">
                The following regions are subject to comprehensive U.S. economic
                sanctions as administered by the U.S. Department of the
                Treasury's Office of Foreign Assets Control (OFAC). HomunculAi is
                not authorized for sale or use in these regions:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  <strong className="text-foreground">Cuba</strong>
                </li>
                <li>
                  <strong className="text-foreground">Iran</strong> (Islamic
                  Republic of)
                </li>
                <li>
                  <strong className="text-foreground">North Korea</strong>{" "}
                  (Democratic People's Republic of Korea / DPRK)
                </li>
                <li>
                  <strong className="text-foreground">Syria</strong> (Syrian Arab
                  Republic)
                </li>
                <li>
                  <strong className="text-foreground">Crimea region of Ukraine</strong>
                </li>
                <li>
                  <strong className="text-foreground">Donetsk region of Ukraine</strong>{" "}
                  (so-called "Donetsk People's Republic")
                </li>
                <li>
                  <strong className="text-foreground">Luhansk region of Ukraine</strong>{" "}
                  (so-called "Luhansk People's Republic")
                </li>
                <li>
                  <strong className="text-foreground">
                    Any other region subject to U.S. comprehensive sanctions
                  </strong>{" "}
                  as designated from time to time by OFAC
                </li>
              </ul>
            </Section>

            <Section title="Restricted Regions (U.S. Targeted Sanctions / Software Export Controls)" index={2}>
              <p className="text-muted-foreground mb-3">
                The following regions are subject to targeted U.S. sanctions or
                software export controls. Sales are restricted:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Russia</strong> (Russian
                  Federation) — subject to Export Administration Regulations (EAR)
                  restrictions on software exports imposed following 2022 and
                  subsequent updates
                </li>
                <li>
                  <strong className="text-foreground">Belarus</strong> — subject
                  to EAR restrictions paralleling Russia
                </li>
                <li>
                  <strong className="text-foreground">Myanmar</strong> (Burma) —
                  subject to targeted sanctions
                </li>
              </ul>
            </Section>

            <Section title="Restricted Parties" index={3}>
              <p className="text-muted-foreground mb-3">
                HomunculAi is not sold to any individual or entity listed on any
                of the following U.S. government restricted-party lists:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  OFAC's Specially Designated Nationals and Blocked Persons List
                  (SDN List)
                </li>
                <li>Bureau of Industry and Security's Denied Persons List</li>
                <li>Bureau of Industry and Security's Entity List</li>
                <li>Bureau of Industry and Security's Unverified List</li>
                <li>
                  Any other U.S. government list of prohibited or restricted
                  parties
                </li>
              </ul>
            </Section>

            <Section title="Additional Business Restrictions" index={4}>
              <p className="text-muted-foreground mb-3">
                KrookedLilly may, at its discretion, restrict sales to additional
                regions where:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-3">
                <li>
                  Local AI-specific regulatory requirements create compliance
                  obligations KrookedLilly is not equipped to meet as a
                  solo-developer indie publisher;
                </li>
                <li>Distributor policies prohibit sales;</li>
                <li>
                  Other operational, legal, or business considerations make sales
                  impractical.
                </li>
              </ul>
              <p className="text-muted-foreground">
                As of the date of this document, no additional discretionary
                regional restrictions beyond the above are in effect. KrookedLilly
                reserves the right to add or remove discretionary restrictions
                without notice.
              </p>
            </Section>

            <Section title="Enforcement" index={5}>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-3">
                <li>
                  <strong className="text-foreground">Lemon Squeezy</strong>{" "}
                  (direct sales) enforces OFAC sanctions and export-control
                  restrictions at the point of sale through its compliance
                  systems. Sales to restricted regions are automatically blocked.
                </li>
                <li>
                  <strong className="text-foreground">Other distributors</strong>,
                  when added, will be selected in part based on their ability to
                  enforce applicable export controls and sanctions.
                </li>
              </ul>
              <p className="text-muted-foreground">
                If you are located in a restricted region and have obtained a
                copy of HomunculAi through any channel, that copy is unlicensed
                (per Section 9 of the Terms of Use), and KrookedLilly disclaims
                all responsibility for its use. Continued use may violate U.S. or
                local law.
              </p>
            </Section>

            <Section title="Questions" index={6}>
              <p className="text-muted-foreground">
                For questions about territorial restrictions, contact{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>
                .
              </p>
            </Section>

            <div className="pt-6 border-t border-white/[0.08] text-center text-xs text-muted-foreground/70 italic">
              This list is informational. U.S. sanctions and export-control
              regulations are the controlling authority, and any conflict between
              this list and applicable law is resolved in favor of applicable
              law. KrookedLilly is not a substitute for legal or compliance
              advice.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
