import { motion } from "motion/react";
import { Shield } from "lucide-react";

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
        className="text-xl text-primary mb-3 pb-2 border-b-2 border-primary/20"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export function AcrostixPrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-primary/15 rounded-full blur-[100px]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-teal/10 rounded-full blur-[100px]" />
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
            Acrostix Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Effective Date: April 3, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            <Section title="Introduction" index={0}>
              <p className="text-muted-foreground mb-3">
                Krookedlilly LLC ("we," "our," or "us") built Acrostix as a word
                game application available on iOS and Android. This Privacy
                Policy explains what information we collect, how we use it, and
                the choices you have. We are committed to protecting your privacy
                and being transparent about our data practices.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground">
                Acrostix does not require an account to play and does not sell
                your personal information.
              </div>
            </Section>

            <Section title="Information We Collect" index={1}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Gameplay Data</strong>
                <br />
                Your campaign progress, high scores, collectibles, and user
                preferences are stored locally on your device in an on-device
                database.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Score Submissions</strong>
                <br />
                When you complete levels, scoring data is sent to our servers to
                help improve the scoring engine, level design, and game balance.
                These submissions include:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-1">
                <li>The sentence you wrote and the target word</li>
                <li>
                  Your scores and score breakdowns (grammar, complexity,
                  relevance, synergies)
                </li>
                <li>Game metadata (mode, difficulty tier, time spent)</li>
                <li>App version number and platform (iOS or Android)</li>
              </ul>
              <p className="text-muted-foreground mb-3">
                These submissions do not include any device identifiers, account
                information, or any data that could be used to identify you
                personally. We use this data solely to improve the game's scoring
                accuracy and level design.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Advertising Data</strong>
                <br />
                Acrostix displays optional rewarded ads powered by Google AdMob.
                When you choose to watch a rewarded ad, AdMob may collect
                certain device information, including your device's advertising
                identifier (IDFA on iOS, GAID on Android), to serve and measure
                ads. This data is collected by Google and is governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google's Privacy Policy
                </a>
                . We do not have access to this data.
              </p>

              <p className="text-muted-foreground">
                <strong className="text-foreground">Premium Sync Data</strong>
                <br />
                If you are a premium subscriber and choose to enable data
                syncing, your gameplay data (including campaign progress, high
                scores, and collectibles) will be synced through your platform's
                cloud storage service — Apple iCloud on iOS or Google Drive on
                Android. This data is stored in your personal cloud storage
                account and is governed by the respective platform's privacy
                policies.
              </p>
            </Section>

            <Section title="Information We Do Not Collect" index={2}>
              <p className="text-muted-foreground mb-3">
                We want to be clear about the data we do not collect:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  We do not collect your name, email address, or any personal
                  contact information through the app.
                </li>
                <li>
                  We do not collect device identifiers or any information that
                  could be used to identify you — advertising identifiers are
                  collected only by Google AdMob when you watch a rewarded ad.
                </li>
                <li>We do not collect location data.</li>
                <li>We do not use our own analytics or tracking services.</li>
                <li>
                  We do not collect payment or financial information — all
                  purchases are processed entirely by the Apple App Store or
                  Google Play Store.
                </li>
              </ul>
            </Section>

            <Section title="Third-Party Services" index={3}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Advertising (Google AdMob)
                </strong>
                <br />
                Acrostix includes optional rewarded ads served by Google AdMob.
                Rewarded ads are never forced — you may choose to watch an ad in
                exchange for additional daily scores. AdMob may use your device's
                advertising identifier and other device information to serve
                relevant ads and measure ad performance. For more information,
                see{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google's Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://support.google.com/admob/answer/6128543"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  how Google uses data from apps that use their services
                </a>
                .
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Platform Game Services
                </strong>
                <br />
                Acrostix integrates with Apple Game Center (iOS) and Google Play
                Games Services (Android) to provide leaderboard functionality.
                Your use of these services is governed by their respective
                privacy policies. Participation in leaderboards requires you to
                sign in to these platform services, which is handled entirely by
                Apple or Google.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">In-App Purchases</strong>
                <br />
                Acrostix offers a premium subscription that unlocks additional
                content. All subscription transactions are processed entirely by
                Apple (App Store) or Google (Google Play). We do not receive,
                process, or store any payment details. Subscription validation is
                performed on-device.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Cloud Sync (Premium Feature)
                </strong>
                <br />
                Premium users may opt in to sync their gameplay data via Apple
                iCloud or Google Drive. We do not operate our own servers for
                this feature — your data is stored in your personal cloud account
                and subject to Apple's or Google's privacy policies.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Scoring Data Updates
                </strong>
                <br />
                Acrostix periodically checks for updated scoring data to improve
                gameplay accuracy. These requests are authenticated with an
                app-level token but do not include any user data, device
                identifiers, or personal information.
              </p>

              <p className="text-muted-foreground">
                <strong className="text-foreground">App Store Services</strong>
                <br />
                Apple and Google may independently collect crash reports,
                diagnostics, and usage statistics through their respective app
                store platforms. This data collection is managed by Apple and
                Google under their own privacy policies and is not controlled by
                us.
              </p>
            </Section>

            <Section title="Sharing Your Score" index={4}>
              <p className="text-muted-foreground">
                Acrostix includes a "Share Score" feature that uses your device's
                native share sheet. When you choose to share your score, you
                control where and how that information is shared. We do not
                access, track, or store any information about your sharing
                activity.
              </p>
            </Section>

            <Section title="Data Retention" index={5}>
              <p className="text-muted-foreground mb-3">
                Your local gameplay data remains on your device until you delete
                the app or clear the app's data. Score submission data that we
                receive for level design purposes is fully anonymous and cannot
                be linked to any individual user or device.
              </p>
              <p className="text-muted-foreground">
                If you use the premium sync feature, your synced data is retained
                in your personal iCloud or Google Drive account and can be
                managed through your platform's storage settings.
              </p>
            </Section>

            <Section title="Children's Privacy" index={6}>
              <p className="text-muted-foreground mb-3">
                Acrostix is rated for all ages and is not specifically directed
                at children under the age of 13. We do not knowingly collect
                personal information from children. The app includes optional
                rewarded ads served by Google AdMob; these ads are not
                personalized for children and comply with applicable regulations.
              </p>
              <p className="text-muted-foreground">
                If you are a parent or guardian and believe your child has
                somehow provided us with personal information, please contact us
                at{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>{" "}
                and we will promptly address the matter.
              </p>
            </Section>

            <Section title="Data Security" index={7}>
              <p className="text-muted-foreground">
                We take reasonable measures to protect the limited data we
                collect. Score submission data is stored securely and access is
                restricted. However, no method of electronic transmission or
                storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </Section>

            <Section title="Your Rights and Choices" index={8}>
              <p className="text-muted-foreground mb-3">
                You have control over your data in the following ways:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  <strong className="text-foreground">Local Data:</strong> You
                  can delete all local gameplay data by uninstalling the app or
                  clearing its data through your device settings.
                </li>
                <li>
                  <strong className="text-foreground">Advertising:</strong> You
                  can limit ad tracking or reset your advertising identifier
                  through your device's privacy settings. On iOS, you can
                  disable the IDFA via Settings &gt; Privacy &gt; Tracking. On
                  Android, you can opt out of personalized ads via Settings &gt;
                  Google &gt; Ads.
                </li>
                <li>
                  <strong className="text-foreground">Cloud Sync:</strong> You
                  can disable cloud syncing at any time within the app's
                  settings. You may also manage or delete synced data through
                  your iCloud or Google Drive account.
                </li>
                <li>
                  <strong className="text-foreground">Leaderboards:</strong> You
                  can opt out of leaderboards by signing out of Game Center or
                  Google Play Games Services in your device settings.
                </li>
              </ul>
            </Section>

            <Section title="Changes to This Privacy Policy" index={9}>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. If we make
                material changes, we will notify you through an in-app notice or
                by updating the effective date at the top of this page. We
                encourage you to review this policy periodically.
              </p>
            </Section>

            <Section title="Contact Us" index={10}>
              <p className="text-muted-foreground mb-3">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us:
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
