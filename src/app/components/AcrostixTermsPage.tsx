import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
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
        className={`text-xl ${index % 2 === 0 ? "text-teal" : "text-primary"} mb-3 pb-2 border-b-2 ${index % 2 === 0 ? "border-teal/20" : "border-primary/20"}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export function AcrostixTermsPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Acrostix Terms of Service"
        description="Terms of service for the Acrostix iOS and Android app."
        path="/games/acrostix/terms"
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
            to="/games/acrostix"
            className="flex w-fit items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider mb-6"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Acrostix
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-sm text-primary text-sm mb-4"
          >
            <FileText className="w-4 h-4" />
            <span
              className="uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              Krookedlilly LLC
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Acrostix Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Effective Date: May 23, 2026 &middot; Publisher: Krookedlilly LLC,
            Spokane, Washington, USA
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
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") apply to your use of the
                Acrostix mobile application ("Acrostix" or the "App") published
                by Krookedlilly LLC ("we," "our," or "us"). By downloading,
                installing, or using Acrostix, you agree to these Terms. If you
                do not agree, please do not use the App.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground mt-4">
                These Terms also serve as the end-user license agreement
                (EULA) for Acrostix. Your purchase of the App and any
                subscriptions through the Apple App Store or Google Play
                Store is additionally subject to the applicable store's
                purchase terms (the Apple Media Services Terms and
                Conditions or the Google Play Terms of Service). Where any
                provision of those store-level purchase terms is mandatory
                and conflicts with these Terms, the store-level terms
                control with respect to the purchase transaction. See
                Section 15 for additional provisions that apply when you
                obtain Acrostix from the Apple App Store.
              </div>
            </motion.div>

            <Section title="1. Eligibility" index={1}>
              <p className="text-muted-foreground mb-3">
                Acrostix is rated for all ages and may be played by anyone who
                is legally permitted to use the App in their jurisdiction.
                However, to use the multiplayer, friends, leaderboard, or
                in-app purchase features, you must be at least 13 years old
                (or the minimum age required to consent to processing of
                personal data in your country, whichever is higher).
              </p>
              <p className="text-muted-foreground">
                If you are under the age of majority in your jurisdiction, you
                may use the App and any optional features only with the
                involvement and consent of a parent or legal guardian.
              </p>
            </Section>

            <Section title="2. Your Account" index={2}>
              <p className="text-muted-foreground mb-3">
                When you first launch Acrostix, the App creates a pseudonymous
                account on your behalf so that your progress, friends, and
                multiplayer matches can be associated with your install. You
                may optionally link this account to a Google or Apple sign-in
                so that it persists across devices and reinstalls. You are
                responsible for keeping any linked sign-in credentials secure
                and for all activity that occurs on your account.
              </p>
              <p className="text-muted-foreground">
                You may delete your player profile at any time from the App's
                in-app settings. See our{" "}
                <Link
                  to="/games/acrostix/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </Link>{" "}
                for details on what data is stored and how to remove it.
              </p>
            </Section>

            <Section
              title="3. Display Name and Player Customization"
              index={3}
            >
              <p className="text-muted-foreground mb-3">
                Your in-game display name is not free-form text. You choose a
                display name by selecting two words from a curated word pool
                that we maintain. This pool is designed so that all possible
                display names are appropriate for general audiences. Similarly,
                player titles, player card customizations, stickers, and
                in-game reactions are limited to options that we provide; you
                cannot upload or submit arbitrary text or images for any of
                these.
              </p>
              <p className="text-muted-foreground">
                We may add, remove, or replace items in the curated pools at
                any time. If a word, title, image, or other element is removed
                from a pool, any display name or customization you have
                selected that uses that element may need to be reselected from
                the current pool.
              </p>
            </Section>

            <Section title="4. Acceptable Use" index={4}>
              <p className="text-muted-foreground mb-3">
                You agree to use Acrostix only for lawful purposes and in a
                way that does not infringe the rights of, restrict, or inhibit
                anyone else's use of the App. Without limiting the foregoing,
                you agree not to:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                <li>
                  Submit sentences in multiplayer matches that contain
                  harassment, threats, hate speech, sexual content involving
                  minors, doxxing, or other content that is unlawful or
                  abusive toward your opponent;
                </li>
                <li>
                  Send friend requests, match invitations, or in-game reactions
                  in a way intended to harass, spam, or abuse another player;
                </li>
                <li>
                  Use the App or any of its features (including friend codes,
                  match invitations, and leaderboards) to impersonate another
                  person or misrepresent your affiliation with any person or
                  entity;
                </li>
                <li>
                  Use any cheat, exploit, automation, bot, scraper, or
                  modified version of the App; attempt to bypass scoring,
                  rate-limiting, anti-tampering, or attestation mechanisms;
                  reverse engineer the App except where such restriction is
                  prohibited by law; or otherwise interfere with the integrity
                  of multiplayer matches or leaderboards;
                </li>
                <li>
                  Attempt to gain unauthorized access to other players'
                  accounts, profiles, or data;
                </li>
                <li>
                  Attempt to disrupt, overload, or impair our servers or any
                  third-party services Acrostix relies on;
                </li>
                <li>
                  Use the App in violation of any applicable export-control,
                  sanctions, consumer-protection, or other law.
                </li>
              </ul>
            </Section>

            <Section title="5. Player Submissions" index={5}>
              <p className="text-muted-foreground mb-3">
                When you play a multiplayer match, the sentences and words you
                submit (your "Submissions") are visible to your opponent for
                that match and are stored on our servers so the match can be
                resumed and reviewed. You retain ownership of your Submissions.
              </p>
              <p className="text-muted-foreground mb-3">
                By submitting a Submission, you grant Krookedlilly LLC a
                worldwide, non-exclusive, royalty-free, transferable license
                to host, store, display, transmit, and process that
                Submission solely for the purposes of (a) operating the App
                and its multiplayer features, (b) showing your Submission to
                the opponent in the match where it was submitted and to you
                for your own review, (c) scoring your Submission through our
                scoring infrastructure, including by forwarding individual
                words and the sentence text to a third-party
                language-model provider (currently Anthropic) when those
                words are not present in the App's pre-scored data, as
                further described in our Privacy Policy, (d) anonymized
                improvement of our scoring engine, level design, and game
                balance, and (e) safety and anti-abuse review. This license
                ends when you delete the relevant data, except to the
                extent we have already used your Submission in anonymized
                or pseudonymized form for scoring improvement or scoring
                cache, in which case the resulting data may be retained.
              </p>
              <p className="text-muted-foreground">
                You represent that you have all rights necessary to grant the
                license above for each Submission you make and that your
                Submissions do not violate Section 4 (Acceptable Use) or any
                law.
              </p>
            </Section>

            <Section title="6. Reporting and Moderation" index={6}>
              <p className="text-muted-foreground mb-3">
                If you encounter a player or Submission that violates these
                Terms, please report it to us at{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>
                . Include enough detail (such as the offending player's
                display name and the approximate date and mode of the match)
                for us to identify the activity.
              </p>
              <p className="text-muted-foreground mb-3">
                Acrostix automatically filters player Submissions against a
                list of prohibited words that we maintain. Submissions that
                match this list are rejected at the point of input and are
                never delivered to your opponent. This automated filter is
                provided as a baseline safeguard and is not exhaustive:
                novel spellings, intentional misspellings, words not on the
                list, or combinations of permitted words may still be
                submitted. We do not manually pre-screen every Submission
                and we are not obligated to monitor multiplayer matches in
                real time.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to investigate reports, review match
                records, update the filter list, and take action under
                Section 7. The friends system also allows you to remove any
                friend, require approval for new friend requests, and opt
                out of random matchmaking from within the App at any time.
              </p>
            </Section>

            <Section title="7. Suspension and Termination" index={7}>
              <p className="text-muted-foreground mb-3">
                We may, at our discretion and without prior notice, suspend or
                terminate your access to the App, your player profile, or any
                of its online features (including multiplayer, friends, and
                leaderboards) if we reasonably believe you have violated these
                Terms or are otherwise misusing the App. Where reasonable, we
                will try to give you notice and an opportunity to address the
                issue first, but we are not required to do so where the
                conduct is serious or ongoing.
              </p>
              <p className="text-muted-foreground">
                You may stop using the App at any time and may delete your
                player profile from the in-app settings. Sections that by
                their nature should survive termination (including Sections 5,
                9, 10, 11, 12, and 14) will survive.
              </p>
            </Section>

            <Section title="8. In-App Purchases and Subscriptions" index={8}>
              <p className="text-muted-foreground mb-3">
                Acrostix offers a premium subscription with monthly and yearly
                options that unlock additional content and features. All
                purchases and subscription transactions are processed by, and
                are subject to the terms of, the Apple App Store (iOS) or
                Google Play Store (Android). We do not receive, process, or
                store your payment information.
              </p>
              <p className="text-muted-foreground">
                Subscriptions auto-renew unless you cancel at least 24 hours
                before the end of the current billing period through your
                platform's subscription management settings. Refunds, billing
                disputes, and subscription management are handled by Apple or
                Google according to the policies of the store you purchased
                through. We cannot issue refunds for App Store or Google Play
                purchases.
              </p>
            </Section>

            <Section title="9. Advertising" index={9}>
              <p className="text-muted-foreground">
                Acrostix displays banner ads on certain screens and offers
                optional rewarded ads (which you may choose to watch in
                exchange for in-game rewards). Both types of ads are served by
                Google AdMob. We do not endorse advertisers or the products
                they advertise, and we are not responsible for the content of
                third-party advertisements or the products or services they
                describe. See our{" "}
                <Link
                  to="/games/acrostix/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </Link>{" "}
                for details on how advertising data is handled.
              </p>
            </Section>

            <Section title="10. Intellectual Property" index={10}>
              <p className="text-muted-foreground mb-3">
                Acrostix, including its software, artwork, sound, music, level
                design, word pools, scoring engine, trademarks, and associated
                materials, is the intellectual property of Krookedlilly LLC
                and is protected by copyright, trademark, and other applicable
                laws. We grant you a personal, non-exclusive, non-transferable,
                revocable license to install and use Acrostix on devices you
                own or control for personal, non-commercial use, subject to
                these Terms. If you obtain Acrostix from the Apple App Store,
                this license is further subject to the Usage Rules in the
                Apple Media Services Terms and Conditions, as described in
                Section 15.
              </p>
              <p className="text-muted-foreground">
                Except as expressly permitted in these Terms, you may not
                copy, redistribute, resell, sublicense, modify, decompile,
                disassemble, or create derivative works of the App or its
                content, except where such restrictions are prohibited by
                law.
              </p>
            </Section>

            <Section title="11. Privacy" index={11}>
              <p className="text-muted-foreground">
                Your use of Acrostix is also governed by our{" "}
                <Link
                  to="/games/acrostix/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                , which explains what information we collect, how we use it,
                and the choices you have. By using the App, you acknowledge
                the data practices described in the Privacy Policy.
              </p>
            </Section>

            <Section title="12. Disclaimer of Warranties" index={12}>
              <p
                className="text-muted-foreground uppercase tracking-wide text-sm"
                style={{ lineHeight: 1.7 }}
              >
                Acrostix is provided "as is" and "as available," with all
                faults and without warranty of any kind, express or implied,
                to the maximum extent permitted by law. Krookedlilly LLC
                disclaims all implied warranties, including merchantability,
                fitness for a particular purpose, accuracy, uninterrupted or
                error-free operation, and non-infringement. We do not warrant
                that the App, multiplayer matchmaking, leaderboards, or any
                feature will always be available, secure, or free of bugs.
                Some jurisdictions do not allow certain warranty disclaimers;
                in those jurisdictions, the warranties you have are limited
                to the minimum required by law.
              </p>
            </Section>

            <Section title="13. Limitation of Liability" index={13}>
              <p
                className="text-muted-foreground uppercase tracking-wide text-sm mb-3"
                style={{ lineHeight: 1.7 }}
              >
                To the maximum extent permitted by law, Krookedlilly LLC will
                not be liable for any indirect, incidental, consequential,
                special, exemplary, or punitive damages, or for any loss of
                data, profits, goodwill, or business interruption, arising
                out of or related to your use of Acrostix, including without
                limitation any interaction with another player, any
                Submission, any advertisement displayed in the App, or any
                outage, delay, or error in the App or its online features.
              </p>
              <p className="text-muted-foreground">
                Krookedlilly LLC's total aggregate liability for any claim
                arising out of or related to Acrostix will not exceed the
                greater of (i) the amount you paid to the applicable app
                store for Acrostix and any associated subscriptions in the
                twelve months before the claim, or (ii) USD $25. Some
                jurisdictions do not allow the exclusion or limitation of
                certain damages; in those jurisdictions, our liability is
                limited to the minimum permitted by law.
              </p>
            </Section>

            <Section title="14. Indemnification" index={14}>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless Krookedlilly
                LLC and its owners, contractors, and affiliates from any
                third-party claim, demand, loss, or expense (including
                reasonable attorneys' fees) arising from (a) your misuse of
                the App, (b) your violation of these Terms or any applicable
                law, (c) any Submission you make, or (d) your interactions
                with other players through the App.
              </p>
            </Section>

            <Section
              title="15. Apple App Store and Google Play Provisions"
              index={15}
            >
              <p className="text-muted-foreground mb-4">
                The following provisions apply when you obtain Acrostix from
                the Apple App Store or the Google Play Store, in addition to
                the rest of these Terms. To the extent any provision of this
                Section conflicts with another provision of these Terms with
                respect to your obligations as an end user of the App
                obtained from the applicable store, the provisions of this
                Section control.
              </p>

              <h3
                className="text-lg text-foreground mt-2 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Apple App Store
              </h3>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Acknowledgement.
                </strong>{" "}
                These Terms are concluded between you and Krookedlilly LLC
                only, and not with Apple Inc. ("Apple"). Krookedlilly LLC,
                not Apple, is solely responsible for Acrostix and the content
                thereof. Your license to use Acrostix is limited to a
                non-transferable license to use Acrostix on any Apple-branded
                device that you own or control and as permitted by the Usage
                Rules set forth in the Apple Media Services Terms and
                Conditions, except that Acrostix may also be accessed and
                used by other accounts associated with you via Family
                Sharing or volume purchasing.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Maintenance and Support.
                </strong>{" "}
                Krookedlilly LLC, not Apple, is solely responsible for
                providing any maintenance and support services with respect
                to Acrostix as specified in these Terms or as required under
                applicable law. You acknowledge that Apple has no obligation
                whatsoever to furnish any maintenance and support services
                with respect to Acrostix.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Warranty.</strong>{" "}
                Krookedlilly LLC is solely responsible for any product
                warranties, whether express or implied by law, to the extent
                not effectively disclaimed in these Terms. In the event of
                any failure of Acrostix to conform to any applicable
                warranty, you may notify Apple, and Apple will refund the
                purchase price for Acrostix to you (if any). To the maximum
                extent permitted by applicable law, Apple will have no other
                warranty obligation whatsoever with respect to Acrostix, and
                any other claims, losses, liabilities, damages, costs, or
                expenses attributable to any failure to conform to any
                warranty will be Krookedlilly LLC's sole responsibility.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Product Claims.</strong>{" "}
                Krookedlilly LLC, not Apple, is responsible for addressing
                any claims by you or any third party relating to Acrostix or
                your possession and/or use of Acrostix, including but not
                limited to: (i) product liability claims; (ii) any claim
                that Acrostix fails to conform to any applicable legal or
                regulatory requirement; and (iii) claims arising under
                consumer-protection, privacy, or similar legislation.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Intellectual Property Rights.
                </strong>{" "}
                In the event of any third-party claim that Acrostix or your
                possession and use of Acrostix infringes that third party's
                intellectual property rights, Krookedlilly LLC, not Apple,
                will be solely responsible for the investigation, defense,
                settlement, and discharge of any such intellectual property
                infringement claim.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Legal Compliance.</strong>{" "}
                You represent and warrant that (i) you are not located in a
                country that is subject to a U.S. Government embargo, or
                that has been designated by the U.S. Government as a
                "terrorist supporting" country, and (ii) you are not listed
                on any U.S. Government list of prohibited or restricted
                parties.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Developer Name and Address.
                </strong>{" "}
                Any questions, complaints, or claims with respect to
                Acrostix should be directed to Krookedlilly LLC at{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>{" "}
                (see Section 19 for full contact details).
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Third-Party Terms of Agreement.
                </strong>{" "}
                You must comply with any applicable third-party terms of
                agreement when using Acrostix (for example, your wireless
                data service agreement).
              </p>

              <p className="text-muted-foreground mb-5">
                <strong className="text-foreground">
                  Third-Party Beneficiary.
                </strong>{" "}
                You and Krookedlilly LLC acknowledge and agree that Apple,
                and Apple's subsidiaries, are third-party beneficiaries of
                these Terms, and that upon your acceptance of these Terms,
                Apple will have the right (and will be deemed to have
                accepted the right) to enforce these Terms against you as a
                third-party beneficiary thereof.
              </p>

              <h3
                className="text-lg text-foreground mt-2 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Google Play Store
              </h3>

              <p className="text-muted-foreground">
                These Terms are concluded between you and Krookedlilly LLC
                only, and not with Google LLC ("Google"). Krookedlilly LLC,
                not Google, is solely responsible for Acrostix and the
                content thereof. Your download and use of Acrostix from the
                Google Play Store is additionally subject to the Google Play
                Terms of Service. Google has no obligation to provide
                maintenance or support for Acrostix, and any product claims,
                warranty issues, or intellectual property claims relating to
                Acrostix are the sole responsibility of Krookedlilly LLC,
                not Google.
              </p>
            </Section>

            <Section title="16. Changes to These Terms" index={16}>
              <p className="text-muted-foreground">
                We may update these Terms from time to time. If we make
                material changes, we will notify you through an in-app notice
                or by updating the effective date at the top of this page.
                Your continued use of the App after the updated Terms take
                effect constitutes acceptance of the updated Terms. If you do
                not agree to the updated Terms, please stop using the App.
              </p>
            </Section>

            <Section title="17. Governing Law and Disputes" index={17}>
              <p className="text-muted-foreground mb-3">
                These Terms are governed by the laws of the State of
                Washington, USA, without regard to conflict-of-law rules. You
                and Krookedlilly LLC agree that any dispute arising out of or
                related to Acrostix or these Terms will be brought
                exclusively in the state or federal courts located in Spokane
                County, Washington, and you consent to personal jurisdiction
                there.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground">
                Nothing in this section waives any non-waivable rights you may
                have under the consumer-protection laws of your home
                jurisdiction or the mandatory consumer-rights rules of the
                platform you obtained the App from. Consumers in the European
                Union, United Kingdom, Australia, and other jurisdictions
                with mandatory consumer-protection regimes may have the right
                to bring claims in the courts of their home jurisdiction to
                the extent required by local law.
              </div>
            </Section>

            <Section title="18. General Provisions" index={18}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Severability.</strong> If
                any provision of these Terms is held invalid or unenforceable,
                that provision will be modified to the minimum extent
                necessary to make it enforceable, or if modification is not
                possible, severed. The remaining provisions will remain in
                full force and effect.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Entire agreement.</strong>{" "}
                These Terms, together with our Privacy Policy and any
                applicable app-store purchase terms that govern your
                transaction, constitute the entire agreement between you
                and Krookedlilly LLC regarding Acrostix.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">No waiver.</strong> Our
                failure to enforce any right or provision of these Terms is
                not a waiver of that right or provision.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Assignment.</strong> You
                may not assign or transfer these Terms without our prior
                written consent. We may assign these Terms, in whole or in
                part, without restriction, including in connection with a
                merger, acquisition, reorganization, or sale of assets.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Language.</strong> The
                authoritative version of these Terms is the English language
                version.
              </p>
            </Section>

            <Section title="19. Contact" index={19}>
              <p className="text-muted-foreground mb-3">
                Questions, reports, or notices regarding these Terms:
              </p>
              <p className="text-foreground">
                Krookedlilly LLC
                <br />
                Email:{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>
              </p>
            </Section>

            <div className="pt-6 border-t border-white/[0.08] text-center text-sm text-muted-foreground">
              &copy; 2026 Krookedlilly LLC. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}