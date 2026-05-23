import { motion } from "motion/react";
import { Link } from "react-router-dom";
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

export function AcrostixPrivacyPage() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="Acrostix Privacy Policy"
        description="Privacy policy for the Acrostix iOS app."
        path="/games/acrostix/privacy"
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
            Acrostix Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Effective Date: May 23, 2026
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
                the choices you have. We are committed to protecting your
                privacy and being transparent about our data practices.
              </p>
              <p className="text-muted-foreground mb-3">
                Acrostix is primarily a single-player game. Features such as
                Semantic Volley multiplayer, the friends list, and
                cross-platform leaderboards are optional and require
                lightweight, pseudonymous account data to function. We do not
                require you to provide your real name or email address to play
                or to use any of these features.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground">
                Acrostix does not require you to share personally identifiable
                information to play, and we do not sell your personal
                information. Your use of Acrostix is also governed by our{" "}
                <Link
                  to="/games/acrostix/terms"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  Terms of Service
                </Link>
                .
              </div>
            </Section>

            <Section title="Information We Collect" index={1}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Local Gameplay Data
                </strong>
                <br />
                Your campaign progress, high scores, collectibles, in-game
                inventory, and user preferences are stored locally on your
                device in an on-device database. This data does not leave your
                device unless you opt in to a feature that requires it (such as
                cloud sync, leaderboards, or multiplayer).
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Anonymous Player Account
                </strong>
                <br />
                When you first launch Acrostix, the app creates an anonymous
                account through Firebase Authentication and assigns your
                install a randomly generated user identifier (a "UID"). This
                UID is not linked to your name, email address, phone number, or
                any other personal information by default. It is used to keep
                your multiplayer games, friends list, and player profile
                consistent across launches on the same device. If you uninstall
                and reinstall the app, a new UID is generated.
              </p>
              <p className="text-muted-foreground mb-3">
                You may optionally choose to link your anonymous account to a
                Google Account or Apple ID. Linking serves two purposes: it
                keeps your Acrostix identity stable across reinstalls and
                across devices, and it enables cross-platform syncing of
                your gameplay data so that signing in with the same linked
                account on a different device (including across iOS and
                Android) restores your profile, progress, friends, and
                multiplayer history. The cross-device sync is mediated by
                Firebase Authentication and Cloud Firestore using your
                stable Acrostix account. We do not store your Google or
                Apple email address on our servers beyond what Firebase
                Authentication retains for sign-in purposes.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Player Profile &amp; Display Identity
                </strong>
                <br />
                If you use a feature that interacts with other players (such
                as multiplayer or friends), Acrostix maintains a public player
                profile in our cloud database that may include: your chosen
                display name, a display title, customization choices for your
                player card (background, tile color, letter border style, and
                equipped sticker), your friend code, your platform (iOS or
                Android), the date your profile was created, and your
                preferences for matchmaking and friend requests. Display
                names are not free-form text — you assemble one by combining
                two words from a curated word pool that we maintain, so they
                cannot contain personal information, contact details, or
                arbitrary text.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Multiplayer Game Data
                </strong>
                <br />
                When you play a Semantic Volley multiplayer match, we
                store a record of the match in our cloud database so that both
                players can resume and review it. A match record may include:
                the target word, each turn's word and score, scoring metadata,
                the mode and difficulty, timestamps, any in-game reactions
                (such as squamoji) you send, and a snapshot of each
                participant's display identity (display name and player card
                customizations) at the time the match was played. Both players
                can see each other's submissions for matches you've both
                participated in.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Friends</strong>
                <br />
                If you use the friends feature, we store a list of friendships
                (pairs of UIDs), pending friend requests, and the 6-character
                friend code we generate for your account. A friend code lookup
                returns only your public player profile (display name, title,
                card customizations) — never your underlying UID, email
                address, or contact info. You can disable incoming friend
                requests in the app's settings.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Push Notifications</strong>
                <br />
                If you grant notification permission, Acrostix registers a push
                notification token issued by Apple Push Notification service
                (iOS) or Firebase Cloud Messaging (Android) through the Expo
                push service. We store this token on your player profile so we
                can send you gameplay notifications (such as "It's your turn"
                in multiplayer). You can revoke notification permission at any
                time in your device settings; the token is then no longer
                usable.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Device Attestation</strong>
                <br />
                To protect multiplayer fairness and prevent abuse of features
                such as friend lookup and game submission, Acrostix uses
                Apple's App Attest (iOS) and Google's Play Integrity API
                (Android). These services generate a cryptographic token that
                confirms requests are coming from a genuine, unmodified copy of
                the app on a real device. The attestation token does not
                identify you personally. A randomly generated device identifier
                may be sent alongside the token for rate-limiting purposes;
                this identifier is not linked to your name or contact
                information.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Score &amp; Telemetry Submissions
                </strong>
                <br />
                When you complete levels, scoring data is sent to our servers
                to help us improve the scoring engine, level design, and game
                balance. These submissions include:
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
                Single-player score submissions are pseudonymous: they are
                not linked to your player profile, display name, or any
                personally identifying information, although they are
                associated with a randomly generated device identifier as
                described under "Cloud-Based Scoring" below. Multiplayer
                turns are stored alongside the match record described above
                and are visible to your opponent for that match.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Cloud-Based Scoring
                </strong>
                <br />
                Acrostix uses a hybrid scoring engine. Most scoring runs
                entirely on your device using data we ship inside the App.
                However, whenever a word in your sentence is not present in
                our pre-scored data — which is common — the App sends that
                word, the target word, and (for grammar scoring) the
                surrounding sentence text to our scoring backend hosted on
                Cloudflare so that the missing score can be computed in real
                time. This applies to all players, not only premium
                subscribers; the premium subscription only affects daily
                usage quotas, not whether this path is used.
              </p>
              <p className="text-muted-foreground mb-3">
                Our backend in turn calls Anthropic's Claude API — a
                third-party large-language-model service — to produce the
                score. Anthropic processes the submitted text under its
                contractual commitments to us as an API customer and under{" "}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anthropic's privacy policy
                </a>
                . We do not provide Anthropic with your name, contact
                information, Acrostix account identifier, or any other
                directly identifying information.
              </p>
              <p className="text-muted-foreground mb-3">
                For performance and operational logging, our scoring backend
                stores the following in a Cloudflare D1 database:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-1">
                <li>
                  The target word, the individual words scored, and the
                  normalized sentence text
                </li>
                <li>
                  The scores returned and an indication of which model
                  produced them
                </li>
                <li>
                  A randomly generated, pseudonymous device identifier and
                  game identifier
                </li>
                <li>
                  Cache hit/miss statistics and token-usage counts for the
                  request
                </li>
                <li>
                  A label indicating whether the request originated from
                  single-player or multiplayer mode
                </li>
              </ul>
              <p className="text-muted-foreground mb-3">
                The device identifier is generated by the App on first
                launch and is not linked to your name, email address,
                Apple/Google sign-in, or Acrostix display name. We retain
                this scoring cache so that repeat scoring of the same word
                or sentence does not require another call to the
                language-model provider.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  You can opt out of cloud-based scoring entirely
                </strong>{" "}
                by denying Acrostix network access in your device settings.
                Acrostix is designed to work offline: the base
                single-player game will continue to function using only the
                on-device scoring engine. The trade-off is that words not
                present in the pre-scored data shipped with the App will
                receive a lower fallback score, which may reduce your
                overall scoring accuracy. Multiplayer, friends, push
                notifications, leaderboards, and cloud sync also require
                network access and are unavailable while offline.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Advertising Data</strong>
                <br />
                Acrostix displays banner ads on certain non-gameplay screens
                and offers optional rewarded ads (which you may choose to watch
                in exchange for in-game rewards). Both types are served by
                Google AdMob. AdMob may collect certain device information,
                including your device's advertising identifier (IDFA on iOS,
                GAID on Android) and other technical signals, to serve and
                measure ads. On iOS, Acrostix will present Apple's App Tracking
                Transparency prompt the first time it is appropriate; if you
                deny tracking, non-personalized ads will be served instead.
                Advertising data is collected by Google and is governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google's Privacy Policy
                </a>
                . We do not have access to advertising identifiers.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Cloud Sync Data</strong>
                <br />
                Acrostix offers two options for syncing your gameplay data
                across devices. (1) <strong>Platform cloud storage:</strong>{" "}
                If you enable platform-cloud sync, your single-player
                gameplay data (campaign progress, high scores, and
                collectibles) is stored in your own Apple iCloud (iOS) or
                Google Drive (Android) account and governed by the
                respective platform's privacy policies; we do not operate
                our own server for this option. (2) <strong>Cross-platform
                sync via a linked account:</strong> If you have linked a
                Google or Apple account to your Acrostix account (see
                "Anonymous Player Account" above), your gameplay data syncs
                across all devices and platforms where you sign in with
                that linked account using Firebase Cloud Firestore. This
                cross-platform option works between iOS and Android. You
                may use either option, both, or neither.
              </p>
            </Section>

            <Section title="Information We Do Not Collect" index={2}>
              <p className="text-muted-foreground mb-3">
                We want to be clear about the data we do not collect:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  We do not require or collect your real name, email address,
                  phone number, or any other personal contact information
                  through the app.
                </li>
                <li>
                  We do not collect your device's advertising identifier
                  ourselves — only Google AdMob does, and only as described
                  above.
                </li>
                <li>We do not collect location data.</li>
                <li>
                  We do not use our own third-party analytics or behavioral
                  tracking services.
                </li>
                <li>
                  We do not collect payment or financial information — all
                  purchases are processed entirely by the Apple App Store or
                  Google Play Store.
                </li>
                <li>
                  We do not access your device contacts, photos, microphone, or
                  camera.
                </li>
              </ul>
            </Section>

            <Section
              title="Multiplayer &amp; Friends — What's Visible to Others"
              index={3}
            >
              <p className="text-muted-foreground mb-3">
                When you use Acrostix's social features, the following
                information may be visible to other players:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  <strong className="text-foreground">Opponents:</strong> Your
                  display name, display title, and player card customizations
                  are shown to anyone you are matched with in Semantic
                  Volley. The words and scores you submit during a match
                  are visible to your opponent for that match.
                </li>
                <li>
                  <strong className="text-foreground">Friends:</strong> Anyone
                  you add as a friend (or who adds you) can see your display
                  name, title, and player card customizations, and can invite
                  you to matches.
                </li>
                <li>
                  <strong className="text-foreground">Friend Lookup:</strong>{" "}
                  Anyone who knows your 6-character friend code can look up
                  your public player profile. They cannot see your UID, linked
                  Google/Apple account, email address, or contact information.
                </li>
                <li>
                  <strong className="text-foreground">Leaderboards:</strong>{" "}
                  Your platform leaderboard name (set in Apple Game Center or
                  Google Play Games) is visible to other players on those
                  leaderboards. For cross-platform leaderboards, only your
                  initials and score are shown to players on the other
                  platform.
                </li>
                <li>
                  <strong className="text-foreground">Match Invites:</strong>{" "}
                  Multiplayer invite links you share (for example, via your
                  device's share sheet) contain a match identifier that anyone
                  with the link can use to join that match.
                </li>
              </ul>
              <p className="text-muted-foreground mt-3">
                You can change your display name and customizations, opt out
                of random matchmaking, require friend requests for new
                connections, or delete your account at any time from the
                in-app settings.
              </p>
            </Section>

            <Section title="Third-Party Services" index={4}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Firebase (Google)
                </strong>
                <br />
                Acrostix uses Firebase Authentication, Cloud Firestore, and
                Cloud Functions for its multiplayer, friends, and player
                profile features. These services store your anonymous account,
                player profile, multiplayer match records, and push
                notification token. Firebase is provided by Google and is
                governed by{" "}
                <a
                  href="https://firebase.google.com/support/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase's Privacy and Security policies
                </a>
                .
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Google &amp; Apple Sign-In (Optional)
                </strong>
                <br />
                If you choose to link your anonymous Acrostix account to a
                Google Account or Apple ID, that sign-in is handled by Google
                or Apple. Their respective privacy policies apply to the
                sign-in itself.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Apple Push Notification Service &amp; Firebase Cloud
                  Messaging
                </strong>
                <br />
                If you enable notifications, push tokens issued by APNs (iOS)
                or FCM (Android) are used to deliver gameplay notifications.
                Token registration is handled through the Expo push service.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Apple App Attest &amp; Google Play Integrity
                </strong>
                <br />
                Used solely to verify that requests originate from a genuine,
                unmodified copy of the app. These services do not provide us
                with personal information.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Advertising (Google AdMob)
                </strong>
                <br />
                Acrostix includes banner ads on certain screens and optional
                rewarded ads, both served by Google AdMob. Rewarded ads are
                never forced — you may choose to watch an ad in exchange for
                in-game rewards. AdMob may use your device's advertising
                identifier and other device information to serve and measure
                ads. For more information, see{" "}
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
                Acrostix integrates with Apple Game Center (iOS) and Google
                Play Games Services (Android) to provide leaderboard
                functionality. Your use of these services is governed by their
                respective privacy policies. Participation in leaderboards
                requires you to sign in to these platform services, which is
                handled entirely by Apple or Google.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">In-App Purchases</strong>
                <br />
                Acrostix offers a premium subscription that unlocks additional
                content. All subscription transactions are processed entirely
                by Apple (App Store) or Google (Google Play). We do not
                receive, process, or store any payment details. Subscription
                validation is performed on-device.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Cloud Sync</strong>
                <br />
                You may sync your single-player gameplay data via Apple
                iCloud or Google Drive (in which case the data is stored in
                your personal cloud account and subject to Apple's or
                Google's privacy policies; we do not operate a server for
                this option) and/or via Firebase Cloud Firestore using a
                linked Google or Apple account, which enables cross-platform
                syncing between iOS and Android as described above.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Anthropic (Claude API)
                </strong>
                <br />
                When real-time scoring requires a language-model call (see
                "Cloud-Based Scoring" above), our scoring backend forwards
                the relevant words and sentence text to Anthropic's Claude
                API. Anthropic is a sub-processor of player-submitted
                scoring content and processes that content under{" "}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anthropic's privacy policy
                </a>{" "}
                and its contractual commitments to us as an API customer.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Scoring Data Updates
                </strong>
                <br />
                Acrostix periodically checks for updated scoring data to
                improve gameplay accuracy. These requests are authenticated
                with an app-level token but do not include any user data,
                device identifiers, or personal information.
              </p>

              <p className="text-muted-foreground">
                <strong className="text-foreground">
                  App Store Services
                </strong>
                <br />
                Apple and Google may independently collect crash reports,
                diagnostics, and usage statistics through their respective app
                store platforms. This data collection is managed by Apple and
                Google under their own privacy policies and is not controlled
                by us.
              </p>
            </Section>

            <Section title="Sharing Your Score" index={5}>
              <p className="text-muted-foreground">
                Acrostix includes a "Share Score" feature that uses your
                device's native share sheet. When you choose to share your
                score, you control where and how that information is shared.
                We do not access, track, or store any information about your
                sharing activity.
              </p>
            </Section>

            <Section title="Data Retention &amp; Deletion" index={6}>
              <p className="text-muted-foreground mb-3">
                Your local gameplay data remains on your device until you
                delete the app or clear the app's data. Single-player score
                submissions that we receive for level design purposes are
                stored without any identifier linking them to your account.
              </p>
              <p className="text-muted-foreground mb-3">
                Your player profile, friends list, push token, and multiplayer
                match records are retained in our cloud database for as long
                as your account remains active. You can delete your player
                profile from the in-app settings; doing so removes your
                profile, friends, friend requests, and push token. For
                fairness to opponents, completed multiplayer match records
                may be retained in a redacted form so the other participant
                can continue to view the match in their own history.
              </p>
              <p className="text-muted-foreground">
                If you use the cloud sync feature, your synced data is
                retained in your personal iCloud or Google Drive account and
                can be managed through your platform's storage settings.
              </p>
            </Section>

            <Section title="Children's Privacy" index={7}>
              <p className="text-muted-foreground mb-3">
                Acrostix is rated for all ages and is not specifically
                directed at children under the age of 13. We do not knowingly
                collect personal information from children. The app includes
                banner and optional rewarded ads served by Google AdMob;
                these are configured to comply with applicable regulations
                and, where required, are served as non-personalized ads.
              </p>
              <p className="text-muted-foreground">
                If you are a parent or guardian and believe your child has
                somehow provided us with personal information, please contact
                us at{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>{" "}
                and we will promptly address the matter.
              </p>
            </Section>

            <Section title="Data Security" index={8}>
              <p className="text-muted-foreground">
                We take reasonable measures to protect the limited data we
                collect. Requests to our servers are sent over HTTPS, sensitive
                multiplayer endpoints require device attestation, and access
                to backend data is restricted. However, no method of
                electronic transmission or storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="Your Rights and Choices" index={9}>
              <p className="text-muted-foreground mb-3">
                You have control over your data in the following ways:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>
                  <strong className="text-foreground">Local Data:</strong> You
                  can delete all local gameplay data by uninstalling the app
                  or clearing its data through your device settings.
                </li>
                <li>
                  <strong className="text-foreground">Offline Play:</strong>{" "}
                  You can deny Acrostix network access in your device
                  settings to prevent any cloud-based scoring, multiplayer
                  activity, or other network use by the App. The base
                  single-player game continues to work offline, with the
                  trade-off that words not in the App's pre-scored data
                  will receive a lower fallback score.
                </li>
                <li>
                  <strong className="text-foreground">
                    Account Deletion:
                  </strong>{" "}
                  You can delete your player profile, friends list, friend
                  requests, and push token from the in-app settings at any
                  time.
                </li>
                <li>
                  <strong className="text-foreground">
                    Profile &amp; Display Name:
                  </strong>{" "}
                  You can change your display name, title, and player card
                  customizations at any time in the in-app settings.
                </li>
                <li>
                  <strong className="text-foreground">
                    Friends &amp; Matchmaking:
                  </strong>{" "}
                  You can require approval for new friend requests, opt out
                  of random matchmaking, and remove existing friends from the
                  in-app settings.
                </li>
                <li>
                  <strong className="text-foreground">Notifications:</strong>{" "}
                  You can revoke notification permission at any time in your
                  device settings. The associated push token will then no
                  longer be usable.
                </li>
                <li>
                  <strong className="text-foreground">Advertising:</strong>{" "}
                  You can limit ad tracking or reset your advertising
                  identifier through your device's privacy settings. On iOS,
                  you can disable the IDFA via Settings &gt; Privacy &amp;
                  Security &gt; Tracking. On Android, you can opt out of
                  personalized ads via Settings &gt; Google &gt; Ads.
                </li>
                <li>
                  <strong className="text-foreground">Cloud Sync:</strong> You
                  can disable cloud syncing at any time within the app's
                  settings. You may also manage or delete synced data through
                  your iCloud or Google Drive account.
                </li>
                <li>
                  <strong className="text-foreground">Leaderboards:</strong>{" "}
                  You can opt out of leaderboards by signing out of Game
                  Center or Google Play Games Services in your device
                  settings.
                </li>
              </ul>
            </Section>

            <Section title="Changes to This Privacy Policy" index={10}>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. If we
                make material changes, we will notify you through an in-app
                notice or by updating the effective date at the top of this
                page. We encourage you to review this policy periodically.
              </p>
            </Section>

            <Section title="Contact Us" index={11}>
              <p className="text-muted-foreground mb-3">
                If you have any questions or concerns about this Privacy
                Policy or our data practices, please contact us:
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
