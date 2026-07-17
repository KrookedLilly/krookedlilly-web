import { motion } from "motion/react";
import { Shield } from "lucide-react";
import { PageMeta } from "./PageMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
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

export function MatchFivesPrivacyPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Match Fives Privacy Policy"
        description="Privacy policy for the Match Fives iOS app."
        path="/games/match-fives/privacy"
        noIndex
      />
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgba(160,92,246,0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-sm text-primary text-sm mb-4"
          >
            <Shield className="w-4 h-4" />
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
            Match Fives Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Effective Date: May 2, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            <Section title="Introduction" index={0}>
              <p className="text-muted-foreground mb-3">
                This Privacy Policy describes how Krookedlilly LLC ("we," "us,"
                or "our") collects, uses, and shares information when you play{" "}
                <strong className="text-foreground">Match Fives</strong> (the
                "Game") on iOS or Android devices. By downloading or playing
                the Game, you agree to the practices described here.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground">
                Match Fives does not require an account with us, and we do not
                sell your personal information.
              </div>
            </Section>

            <Section title="Information We Collect" index={1}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Information You Provide
                </strong>
                <br />
                The Game does not require you to create an account with us. If
                you sign in to Apple Game Center or Google Play Games to use
                leaderboards, that sign-in is handled by Apple or Google. We
                do not receive your account password.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Information Collected Automatically
                </strong>
                <br />
                When you play the Game, we and our service providers may
                automatically collect:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-1">
                <li>
                  <strong className="text-foreground">
                    Device and technical data:
                  </strong>{" "}
                  device model, operating system version, language, country,
                  mobile carrier, screen size, advertising identifier (IDFA on
                  iOS, GAID on Android), and crash logs.
                </li>
                <li>
                  <strong className="text-foreground">Usage data:</strong>{" "}
                  session length, frequency of play, in-app screens viewed, ad
                  impressions and clicks, and remote configuration values
                  delivered to your device.
                </li>
                <li>
                  <strong className="text-foreground">Purchase data:</strong>{" "}
                  transaction identifiers and entitlements for in-app purchases
                  (the App Store and Google Play handle payment information; we
                  do not receive your full payment details).
                </li>
              </ul>

              <p className="text-muted-foreground">
                <strong className="text-foreground">
                  Information Stored on Your Device
                </strong>
                <br />
                Most user state (high scores, owned themes, achievements,
                and other progression) is stored locally
                on your device in an on-device database. This data does not
                leave your device unless you sync with Game Center / Google
                Play Games leaderboards or contact us for support.
              </p>
            </Section>

            <Section title="How We Use Information" index={2}>
              <p className="text-muted-foreground mb-3">
                We use the information described above to:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>Operate, maintain, and improve the Game and its features;</li>
                <li>
                  Save your progress and reconcile high scores with platform
                  leaderboards;
                </li>
                <li>
                  Deliver, personalize, measure, and optimize advertising;
                </li>
                <li>
                  Process in-app purchases and grant the corresponding
                  entitlements;
                </li>
                <li>
                  Diagnose crashes, debug issues, and analyze how the Game is
                  used;
                </li>
                <li>
                  Deliver remote configuration changes and live updates without
                  requiring an app update;
                </li>
                <li>
                  Detect, investigate, and prevent fraud, cheating, or other
                  prohibited activity;
                </li>
                <li>Comply with our legal obligations.</li>
              </ul>
            </Section>

            <Section title="Third-Party Services" index={3}>
              <p className="text-muted-foreground mb-3">
                The Game integrates the following third-party SDKs and
                services. Each operates under its own privacy policy, which
                governs how they handle the data they receive:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Unity Ads</strong> serves
                  rewarded and banner advertising.{" "}
                  <a
                    href="https://unity.com/legal/game-player-and-app-user-privacy-policy"
                    className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unity privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-foreground">Unity Analytics</strong>{" "}
                  collects gameplay and usage telemetry.{" "}
                  <a
                    href="https://unity.com/legal/game-player-and-app-user-privacy-policy"
                    className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unity privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-foreground">
                    Unity Remote Config
                  </strong>{" "}
                  delivers configuration updates to the Game.
                </li>
                <li>
                  <strong className="text-foreground">
                    Unity In-App Purchasing
                  </strong>{" "}
                  mediates purchases through the App Store and Google Play.
                </li>
                <li>
                  <strong className="text-foreground">
                    Apple Game Center
                  </strong>{" "}
                  (iOS): leaderboards and achievements.{" "}
                  <a
                    href="https://www.apple.com/legal/privacy/"
                    className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-foreground">
                    Google Play Games Services
                  </strong>{" "}
                  (Android): leaderboards and achievements.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-foreground">
                    VoxelBusters EssentialKit:
                  </strong>{" "}
                  native plugin layer used to access platform features such
                  as Game Center and Google Play Games.
                </li>
                <li>
                  <strong className="text-foreground">
                    Apple App Store / Google Play:
                  </strong>{" "}
                  payment processing and app distribution. We receive only
                  the transaction confirmation and entitlement, not your
                  payment instrument.
                </li>
              </ul>
            </Section>

            <Section title="Advertising and Analytics" index={4}>
              <p className="text-muted-foreground mb-3">
                The Game shows banner advertisements and offers optional
                rewarded video ads in exchange for in-game rewards. Ads are
                served by Unity Ads, which may use your device advertising
                identifier (IDFA / GAID) and limited technical data to deliver
                relevant ads and measure their performance.
              </p>
              <p className="text-muted-foreground mb-3">
                You can limit ad tracking at any time using your device
                settings:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-1">
                <li>
                  <strong className="text-foreground">iOS:</strong> Settings
                  &gt; Privacy &amp; Security &gt; Tracking, and Settings &gt;
                  Privacy &amp; Security &gt; Apple Advertising.
                </li>
                <li>
                  <strong className="text-foreground">Android:</strong>{" "}
                  Settings &gt; Privacy &gt; Ads (the exact path varies by
                  device manufacturer).
                </li>
              </ul>
              <p className="text-muted-foreground">
                If you purchase the "Remove Ads" in-app product, banner and
                interstitial advertising will no longer be shown. Rewarded ads
                remain available as an optional way to earn in-game rewards.
              </p>
            </Section>

            <Section title="In-App Purchases" index={5}>
              <p className="text-muted-foreground">
                The Game offers optional in-app purchases (such as Remove Ads,
                themes, and cosmetics). All purchases are processed by the
                Apple App Store or Google Play. We receive a transaction
                identifier and the entitlement that was purchased; we do not
                receive or store your credit card number, billing address, or
                other payment credentials.
              </p>
            </Section>

            <Section title="Leaderboards and Social Features" index={6}>
              <p className="text-muted-foreground">
                If you sign in to Apple Game Center or Google Play Games
                Services, your high scores will be submitted to the
                corresponding leaderboards under the display name associated
                with your platform account. Your high scores may be visible to
                other players on those leaderboards. We do not control how
                Apple or Google display or share that information; please
                review their privacy policies for details.
              </p>
            </Section>

            <Section title="Data Storage and Retention" index={7}>
              <p className="text-muted-foreground mb-3">
                Most user data (including scores, purchases, unlocks, and
                achievements) is stored locally on your device. Deleting the
                Game from your device will remove this local data. Data
                submitted to Apple Game Center, Google Play Games Services, or
                used by Unity services is retained according to those
                providers' policies.
              </p>
              <p className="text-muted-foreground">
                We retain analytics and crash data for as long as is reasonably
                necessary to operate, debug, and improve the Game.
              </p>
            </Section>

            <Section title="Children's Privacy" index={8}>
              <p className="text-muted-foreground">
                The Game is rated for general audiences and is not directed at
                children under the age of 13 (or the equivalent minimum age in
                your jurisdiction). We recognize that the Game's casual
                gameplay may appeal to younger players, but we do not
                specifically target children, and we do not knowingly collect
                personal information from children. If you are a parent or
                guardian and believe your child has provided us with personal
                information, please contact us at{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>{" "}
                and we will take reasonable steps to delete it.
              </p>
            </Section>

            <Section title="Your Rights and Choices" index={9}>
              <p className="text-muted-foreground mb-3">
                Depending on where you live, you may have rights regarding your
                personal information, including the right to access, correct,
                delete, or port your data, or to object to or restrict certain
                processing. To exercise any of these rights, contact us using
                the details in the Contact Us section below.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  California residents:
                </strong>{" "}
                the California Consumer Privacy Act (CCPA/CPRA) gives you the
                right to know what personal information we collect, request
                deletion, and opt out of the "sale" or "sharing" of personal
                information. We do not sell personal information for money. To
                the extent that sharing data with advertising partners
                constitutes a "sale" or "share" under California law, you may
                opt out by limiting ad tracking in your device settings as
                described in the Advertising and Analytics section, or by
                contacting us.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">
                  EEA / UK residents:
                </strong>{" "}
                our legal bases for processing personal data are (a)
                performance of the contract you enter into when you use the
                Game, (b) our legitimate interests in operating, improving, and
                securing the Game, (c) your consent where required (for
                example, for personalized advertising), and (d) compliance with
                legal obligations. You have the right to lodge a complaint with
                your local data protection authority.
              </p>
            </Section>

            <Section title="Security" index={10}>
              <p className="text-muted-foreground">
                We use reasonable administrative, technical, and physical
                safeguards to protect information against loss, theft, and
                unauthorized access. However, no method of transmission or
                storage is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </Section>

            <Section title="Changes to This Privacy Policy" index={11}>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. When we
                make material changes, we will update the effective date at the
                top of this page and, where appropriate, provide additional
                notice (for example, an in-game message). Your continued use of
                the Game after the new policy takes effect constitutes
                acceptance of the updated policy.
              </p>
            </Section>

            <Section title="Contact Us" index={12}>
              <p className="text-muted-foreground mb-3">
                If you have questions about this Privacy Policy or wish to
                exercise any of your rights, please contact us:
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
