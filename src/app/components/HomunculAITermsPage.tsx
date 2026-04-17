import { motion } from "motion/react";
import { Link } from "react-router";
import { FileText, ArrowLeft } from "lucide-react";

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

export function HomunculAITermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgba(160,92,246,0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/games/homunculai"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider mb-6"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HomunculAI
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
              HomunculAI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Terms of Use
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Version 3 &middot; Effective April 13, 2026 &middot; Publisher: KrookedLilly, Spokane, Washington, USA
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
                Please read these Terms carefully. To use HomunculAI, you must click{" "}
                <strong className="text-foreground">I Accept</strong>. If you click{" "}
                <strong className="text-foreground">Reject</strong>, the app will
                close and you will not be able to use it.
              </p>
            </motion.div>

            <Section title="1. What HomunculAI Is (And Isn't)" index={1}>
              <p className="text-muted-foreground">
                HomunculAI is a desktop application that gives a third-party AI
                agent — chosen and connected by <em>you</em> — a visual "body" it
                can control: a face, a form, colors, drawings, chat messages, and
                animations. HomunculAI does <strong className="text-foreground">not</strong>{" "}
                provide the AI itself. You bring your own AI (for example Claude,
                ChatGPT, a local model, or another MCP-compatible agent).
                KrookedLilly does not operate, train, tune, moderate, or otherwise
                control the AI you connect. HomunculAI is a shell; the AI is the
                occupant.
              </p>
            </Section>

            <Section title="2. License Grant" index={2}>
              <p className="text-muted-foreground mb-3">
                KrookedLilly grants you a personal, non-exclusive, non-transferable,
                revocable license to install and use HomunculAI on devices you own
                or control, for personal or internal business use, subject to these
                Terms. This license applies only to legitimate copies of HomunculAI
                obtained from an authorized distributor (see Section 10).
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground mb-3">
                You must be at least 18 years old, or the age of majority in your
                jurisdiction, whichever is higher, to use HomunculAI. By accepting
                these Terms, you confirm that you meet this age requirement.
              </div>
              <p className="text-muted-foreground">
                You may not redistribute, resell, sublicense, reverse engineer,
                decompile, disassemble, modify, or remove proprietary notices from
                the app, except where such restrictions are prohibited by law.
              </p>
            </Section>

            <Section title="3. AI-Generated Content — No Endorsement, No Review, No Guarantee" index={3}>
              <p className="text-muted-foreground">
                Everything the avatar does — every word it says, image it draws,
                expression it shows, and message it sends — is generated by a
                third-party AI agent that you chose to connect. KrookedLilly does
                not review, endorse, verify, or guarantee any AI-generated content.
                AI agents generate responses by predicting patterns, not by
                understanding truth — they do not know whether what they say is
                correct. They can produce output that is false, misleading,
                offensive, biased, incoherent, unsafe, or simply wrong, including
                output that sounds confident and correct but isn't
                ("hallucinations").{" "}
                <strong className="text-foreground">
                  You are solely responsible for how you interpret and act on
                  anything the AI says or does in this app.
                </strong>
              </p>
            </Section>

            <Section title="4. No Professional Advice" index={4}>
              <p className="text-muted-foreground">
                HomunculAI and any AI agent connected to it do not provide medical,
                legal, financial, tax, psychological, mental-health, safety, or
                emergency advice, and nothing produced inside the app should be
                treated as such. AI output is provided for entertainment, creative,
                and general-information purposes only.{" "}
                <strong className="text-foreground">
                  If you are experiencing a mental health crisis, please contact
                  your local emergency services or, in the United States, the 988
                  Suicide and Crisis Lifeline (call or text 988).
                </strong>{" "}
                HomunculAI is not a therapist, companion, counselor, doctor,
                lawyer, or friend, and the avatar should not be treated as one.
              </p>
            </Section>

            <Section title="5. What the AI Agent Can and Cannot Do Inside HomunculAI" index={5}>
              <p className="text-muted-foreground mb-3">
                HomunculAI includes a local Model Context Protocol (MCP) server.
                When you connect an AI agent and the agent calls{" "}
                <code className="text-primary bg-primary/10 px-1 rounded">inhabit</code>,
                the agent is granted a narrow, fixed set of capabilities scoped to
                this application:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-4 space-y-2">
                <li>
                  It can set the avatar's body, face, colors, and accessories from
                  a predefined catalog.
                </li>
                <li>
                  It can play animations, effects, and emotes from a predefined
                  catalog.
                </li>
                <li>
                  It can send chat messages to you and read messages you send back.
                  The AI agent only receives your chat messages when it explicitly
                  requests them; HomunculAI does not push messages to the agent or
                  maintain a continuous conversation loop. Depending on how your AI
                  environment is configured, the agent may not read your messages
                  in real time or at all. The agent's access to chat is scoped to
                  its current session — when a new agent inhabits the avatar, it
                  cannot read messages from any prior agent's session. Each session
                  starts with a clean slate.
                </li>
                <li>
                  It can,{" "}
                  <strong className="text-foreground">
                    only after you explicitly verify the agent through an in-app
                    prompt
                  </strong>
                  , draw custom SVG content inside the avatar window.
                </li>
                <li>
                  It can read a small amount of context about the current session
                  (for example, system idle time and session pause state) that
                  HomunculAI chooses to expose.
                </li>
              </ul>

              <p className="text-muted-foreground mb-3">
                HomunculAI does <strong className="text-foreground">not</strong>{" "}
                grant the AI agent access to:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-4 space-y-2">
                <li>
                  Your file system, documents, photos, or any user data outside
                  the app.
                </li>
                <li>Any shell, process, or system command on your computer.</li>
                <li>
                  Any other application, browser tab, clipboard, camera,
                  microphone, or peripheral.
                </li>
                <li>
                  The network beyond the local loopback bridge that connects
                  HomunculAI's own windows.
                </li>
                <li>
                  Your API keys, credentials, or any AI-provider account.
                </li>
              </ul>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  You acknowledge that by connecting an AI agent, you are granting
                  that agent the capabilities listed above and no others. By
                  verifying an agent through the in-app verification prompt, you
                  are granting that specific agent the additional ability to draw
                  custom SVG content inside HomunculAI's avatar window.
                </strong>{" "}
                You can revoke either grant at any time by disconnecting the
                agent, closing the app, or un-verifying.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Custom graphics transparency.</strong>{" "}
                When a verified AI agent is rendering custom SVG content on the
                avatar, HomunculAI displays a visible transparency indicator in the
                avatar header so you can always tell which visuals were drawn by
                the AI agent and which are built-in HomunculAI UI.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Script enforcement.</strong>{" "}
                HomunculAI restricts the character scripts accepted in the AI
                agent's chat, say, think, and name fields based on your configured
                language setting. For example, if you select a Latin-script
                language (such as English, Spanish, or French), only Latin-based
                characters are accepted — blocking Cyrillic, CJK, Arabic, and other
                scripts you may not be able to read. This is a safety feature, not
                a content restriction — it ensures the agent communicates using
                characters you can physically read. However, languages that share
                the same script cannot be distinguished by character enforcement
                alone; for example, an agent could write in French while you have
                English selected, because both languages use Latin characters.
                HomunculAI restricts the script, not the language. Without this
                enforcement, a malicious or misaligned agent could communicate in a
                script you cannot parse at all, leaving you unable to monitor its
                behavior or evaluate its intent.
              </p>

              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Safety layer limitations.</strong>{" "}
                HomunculAI includes multilingual detection for suspicious patterns —
                including impersonation, social engineering, credential phishing,
                prompt injection, and others — across multiple languages, scripts,
                and common attack encodings. This detection is pattern-based and
                is <strong className="text-foreground">not exhaustive</strong>.
                Novel phrasing, synonyms, circumlocution, dialect variations,
                cross-message techniques, and attack methods not in the detection
                database can evade pattern matching. Detection coverage varies by
                language — some languages have broader pattern libraries than
                others. HomunculAI's safety layers are a best-effort aid to your
                judgment, not a replacement for it.
              </p>

              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground mb-4">
                <strong className="uppercase tracking-wider">Use at your own risk.</strong>{" "}
                HomunculAI is provided "AS IS." To the maximum extent permitted by
                law, KrookedLilly is not responsible for:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>
                    Actions performed by any AI agent using HomunculAI, including
                    output the agent generates, choices it makes, or content it
                    draws within the permitted scope;
                  </li>
                  <li>
                    Consequences of your decision to verify an AI agent or grant
                    it expanded capabilities;
                  </li>
                  <li>
                    Harm arising from AI-generated content you choose to share
                    outside HomunculAI;
                  </li>
                  <li>Your choice of AI provider, model, or configuration.</li>
                </ul>
              </div>

              <p className="text-muted-foreground mb-3">
                You are solely responsible for:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-4 space-y-1">
                <li>Choosing which AI agent to connect and which to verify;</li>
                <li>
                  Interpreting and acting on anything the AI agent says or does;
                </li>
                <li>
                  Complying with the terms of service of your chosen AI provider;
                </li>
                <li>
                  Monitoring agent activity via the in-app activity log and
                  forensic audit trail;
                </li>
                <li>
                  Using the session pause, vacate, and disconnect controls if an
                  agent's behavior becomes unwanted.
                </li>
              </ul>

              <p className="text-muted-foreground">
                When HomunculAI flags an agent action in the activity log, the flag
                indicates that a detector pattern matched — not that the AI agent
                has certainly done something wrong. You are responsible for
                reviewing flagged entries and using your own judgment about whether
                to dismiss, continue, pause, or vacate the session.
              </p>
            </Section>

            <Section title="6. Your Responsibilities" index={6}>
              <p className="text-muted-foreground mb-3">
                You are responsible for:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-4 space-y-2">
                <li>
                  <strong className="text-foreground">Choosing which AI to connect.</strong>{" "}
                  Different providers have different capabilities, safety records,
                  and data practices. Review theirs before connecting.
                </li>
                <li>
                  <strong className="text-foreground">AI provider costs.</strong>{" "}
                  Using HomunculAI with an AI provider that charges by usage
                  (tokens, API credits, or similar) consumes that provider's
                  allowance at that provider's rates whenever an agent is active.
                  Extended or continuous sessions can significantly increase
                  usage. KrookedLilly does not receive, track, set, or manage
                  these charges — they are solely between you and your AI
                  provider.
                </li>
                <li>
                  <strong className="text-foreground">Verification decisions.</strong>{" "}
                  HomunculAI includes safety layers (sanitization, rate limits,
                  and a human-in-the-loop "verify" gate required before an agent
                  can draw custom SVG). When you verify an agent, you are granting
                  it expanded permissions; that decision, and anything the agent
                  does with those permissions, is yours.
                </li>
                <li>
                  <strong className="text-foreground">Detection whitelist.</strong>{" "}
                  HomunculAI allows you to whitelist specific words or phrases
                  that would otherwise trigger safety flags. Whitelisted content
                  is still recorded in the forensic audit trail — only the visual
                  warnings in the activity log are suppressed. By adding entries
                  to the whitelist, you accept full responsibility for any
                  consequences of reducing detection sensitivity. KrookedLilly is
                  not liable for actions that occur as a result of content you
                  chose to whitelist.
                </li>
                <li>
                  <strong className="text-foreground">Your own conduct.</strong>{" "}
                  Don't use HomunculAI to violate any law, infringe anyone's
                  rights, harass anyone, generate illegal content, or circumvent
                  the app's safety features.
                </li>
                <li>
                  <strong className="text-foreground">Sensitive information.</strong>{" "}
                  Do not share passwords, API keys, financial account details,
                  personal identifiers, or other sensitive credentials through
                  HomunculAI's chat, say, or think channels. These channels are
                  logged in the activity log, may be read by the AI agent you have
                  connected, and are flagged when credential-like patterns are
                  detected but not redacted. HomunculAI is not a secure messaging
                  channel.
                </li>
                <li>
                  <strong className="text-foreground">Complying with applicable law</strong>{" "}
                  in your country, state, and locality — including export controls,
                  consumer-protection, and content laws.
                </li>
              </ul>
              <p className="text-muted-foreground">
                HomunculAI is a creative and utility tool. It is not a companion,
                friend, therapist, emotional-support tool, or substitute for human
                relationships. Do not rely on the avatar or the AI agent for
                emotional support or in a crisis.
              </p>
            </Section>

            <Section title="7. Local Data and Privacy" index={7}>
              <p className="text-muted-foreground mb-3">
                HomunculAI stores all data locally on your device. No avatar state,
                chat messages, activity logs, or forensic audit data is transmitted
                to KrookedLilly, to any third party, or to any cloud service by
                HomunculAI itself. The only network connection HomunculAI makes is
                the local loopback bridge between its own windows on your computer.
              </p>
              <p className="text-muted-foreground mb-3">
                HomunculAI maintains a local, tamper-evident audit trail of agent
                actions on your device. This log records metadata — timestamps,
                action types, character counts, and flag reasons — but does not
                record the content of chat messages, speech bubbles, or thought
                bubbles. The audit trail exists to protect both you and the AI
                agent by providing an independent record of what happened during a
                session.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">
                  Important: your connected AI provider is separate.
                </strong>{" "}
                HomunculAI itself does not transmit your data to any server or
                third party. However, the AI agent you connect to HomunculAI
                operates on its provider's infrastructure — for example,
                Anthropic's servers for Claude, OpenAI's servers for ChatGPT, or
                your own hardware for local models. When you use HomunculAI with a
                connected AI agent, the following data may be processed by your AI
                provider:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-1">
                <li>Messages you send through HomunculAI's chat;</li>
                <li>
                  Session context the agent requests (such as system idle time
                  and session state);
                </li>
                <li>
                  Your detection whitelist entries and their stated reasons, if
                  the agent requests them.
                </li>
              </ul>
              <p className="text-muted-foreground mb-3">
                This data is processed by your AI provider according to{" "}
                <strong className="text-foreground">
                  that provider's own privacy policy, data retention practices,
                  and terms of service
                </strong>{" "}
                — not KrookedLilly's. Your relationship with your AI provider is
                between you and that provider; KrookedLilly is not a party to that
                relationship and has no control over, review of, or visibility
                into how your AI provider handles your data.{" "}
                <strong className="text-foreground">
                  By connecting an AI agent, you are directing your data through
                  that provider's infrastructure.
                </strong>
              </p>

              <p className="text-muted-foreground mb-3">
                Whether you connect a cloud-based or locally-running AI, HomunculAI
                itself does not transmit your data to any external service.
                However, any AI model — including those running locally on your
                hardware — may have its own network capabilities (such as internet
                access, telemetry, update mechanisms, or connections to external
                services) that operate independently of HomunculAI and that
                HomunculAI does not control. It is your responsibility to
                understand the network behavior of the AI you connect, to review
                your AI provider's privacy policy and terms of service before
                connecting, and to ensure that your use of AI services through
                HomunculAI complies with applicable law.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">External AI capabilities.</strong>{" "}
                The AI agent you connect to HomunculAI may have capabilities beyond
                those granted by HomunculAI — including, depending on your AI
                environment, the ability to read files on your computer, browse
                the web, execute code, or access other applications and services.
                These capabilities are provided by your AI environment (for
                example, Claude Code, ChatGPT with plugins, or a local model with
                tool access), <strong className="text-foreground">not</strong> by
                HomunculAI. HomunculAI does not grant, control, monitor, or have
                visibility into any capabilities your AI agent has outside of
                HomunculAI's own tools. Information the AI agent accesses through
                its own external capabilities may be transmitted to HomunculAI's
                chat or displayed on the avatar, and may thereby flow through the
                AI provider's infrastructure, even though HomunculAI itself did
                not access that information.{" "}
                <strong className="text-foreground">
                  KrookedLilly is not responsible for data the AI agent accesses,
                  processes, or transmits using capabilities that exist outside of
                  HomunculAI.
                </strong>{" "}
                You are responsible for understanding and managing the full
                capability set of any AI agent you connect, including capabilities
                that exist outside of HomunculAI.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Purchase and payment data.</strong>{" "}
                If you purchase HomunculAI directly from KrookedLilly, the
                transaction is handled by Lemon Squeezy (our Merchant of Record)
                or another authorized distributor as described in Section 10.
                KrookedLilly does not directly collect, store, or process your
                payment information. Your payment, billing, and contact
                information is handled by the distributor you purchased through,
                subject to that distributor's privacy policy.
              </p>

              <p className="text-muted-foreground">
                Because all data stored by HomunculAI is local, KrookedLilly does
                not have access to your conversations, your activity logs, or any
                other data generated by your use of HomunculAI. KrookedLilly
                cannot recover, review, or produce this data in response to any
                request — it exists only on your device and is under your control.
              </p>
            </Section>

            <Section title="8. Community-Created Content" index={8}>
              <p className="text-muted-foreground">
                HomunculAI may allow loading or sharing of community-created
                content (such as avatar packs, SVG art, or configurations).
                KrookedLilly does not create, review, endorse, or control community
                content and accepts no responsibility for it. You load community
                content at your own risk.
              </p>
            </Section>

            <Section title="9. Intellectual Property and Authorized Copies" index={9}>
              <p className="text-muted-foreground mb-3">
                HomunculAI, including all software, artwork, documentation,
                trademarks, and associated materials, is the intellectual property
                of KrookedLilly and is protected by copyright, trademark, and
                other applicable laws. All rights not expressly granted to you
                under these Terms are reserved by KrookedLilly.
              </p>
              <p className="text-muted-foreground mb-3">
                These Terms apply only to legitimate copies of HomunculAI obtained
                from an authorized distributor (see Section 10). If you obtained a
                copy of HomunculAI through any other means — including pirated
                copies, modified or repackaged builds, unofficial forks, or copies
                distributed outside an authorized distribution channel —{" "}
                <strong className="text-foreground">
                  you are not granted any license under these Terms
                </strong>
                , and KrookedLilly disclaims all responsibility for the behavior,
                safety, and security of that copy. Modified or repackaged copies
                may have had safety layers removed, added malicious code, or
                otherwise been altered in ways that change the product's behavior.
              </p>
              <p className="text-muted-foreground">
                KrookedLilly reserves the right to take appropriate action,
                including technical and legal measures, against unauthorized
                distribution or modification of HomunculAI.
              </p>
            </Section>

            <Section title="10. Distribution, Platforms, and Refunds" index={10}>
              <p className="text-muted-foreground mb-3">
                HomunculAI is distributed through one or more authorized channels.
                As of the effective date of this version, authorized distributors
                include:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-1">
                <li>
                  <strong className="text-foreground">
                    Direct sales through Lemon Squeezy
                  </strong>{" "}
                  (KrookedLilly's Merchant of Record), via the KrookedLilly website
                  or other KrookedLilly-operated storefronts;
                </li>
                <li>
                  <strong className="text-foreground">itch.io</strong> (itch corp.);
                </li>
                <li>
                  Other storefronts that KrookedLilly may add from time to time.
                </li>
              </ul>
              <p className="text-muted-foreground mb-4">
                The current authorized distributor list is maintained by
                KrookedLilly and may be updated without notice. When you purchase
                or obtain HomunculAI through a distributor, that distributor's
                terms of service, payment terms, and refund policy apply to the
                transaction itself in addition to these Terms. Where any
                distributor's mandatory terms conflict with these Terms, the
                distributor's terms control for the transaction.
              </p>

              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Refunds.</strong> Refund
                requests are handled by the distributor you purchased from, not by
                KrookedLilly:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-4 space-y-2">
                <li>
                  For direct purchases through Lemon Squeezy, refunds are available
                  per Lemon Squeezy's policy (currently a 14-day cooling-off window
                  matching European Union consumer-protection standards); refund
                  requests are submitted through Lemon Squeezy and processed by
                  Lemon Squeezy, not by KrookedLilly.
                </li>
                <li>
                  For purchases through itch.io, refunds are handled per itch.io's
                  policy; by default, itch.io digital goods are non-refundable
                  once downloaded, and users accept this at the point of purchase.
                  Consult itch.io's support for refund requests.
                </li>
                <li>
                  For purchases through any other distributor, that distributor's
                  refund policy controls.
                </li>
              </ul>

              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground">
                Nothing in this section waives any non-waivable statutory consumer
                rights you may have under the laws of your jurisdiction —
                including, without limitation, rights under EU consumer-protection
                law (including the Consumer Rights Directive 2011/83/EU), UK
                consumer law (including the Consumer Rights Act 2015), or
                Australian Consumer Law. Where such laws require refunds,
                remedies, or cooling-off periods, those laws prevail over any
                conflicting provision of these Terms.
              </div>
            </Section>

            <Section title="11. Export Controls and Territorial Restrictions" index={11}>
              <p className="text-muted-foreground mb-3">
                HomunculAI is a software product subject to United States export
                control laws, including the Export Administration Regulations
                (EAR) and economic sanctions administered by the U.S. Department
                of the Treasury's Office of Foreign Assets Control (OFAC).{" "}
                <strong className="text-foreground">
                  By accepting these Terms and using HomunculAI, you represent and
                  warrant that:
                </strong>
              </p>
              <ul className="list-disc ml-6 text-muted-foreground mb-3 space-y-2">
                <li>
                  You are not located in, under the control of, or a national or
                  resident of any country or region that is subject to
                  comprehensive U.S. economic sanctions, and you are not listed on
                  any U.S. government list of prohibited or restricted parties;
                </li>
                <li>
                  You will not export, re-export, transfer, or use HomunculAI in
                  violation of U.S. export control laws or the sanctions or trade
                  laws of any other applicable jurisdiction;
                </li>
                <li>
                  You will comply with all local laws applicable to your use of
                  HomunculAI, including AI-specific regulatory requirements in
                  jurisdictions where such requirements apply to the deployment,
                  operation, or use of artificial intelligence systems.
                </li>
              </ul>
              <p className="text-muted-foreground">
                A current list of regions to which HomunculAI is not sold or
                supported is maintained in a{" "}
                <Link
                  to="/games/homunculai/sales-restrictions"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  separate document
                </Link>
                , which KrookedLilly may update from time to time to reflect
                changes in applicable law, distributor policy, or KrookedLilly's
                business decisions.{" "}
                <strong className="text-foreground">
                  If you are located in a restricted region, you are not
                  authorized to purchase or use HomunculAI, and any copy you
                  obtain is unlicensed
                </strong>{" "}
                (see Section 9). KrookedLilly's authorized distributors (including
                Lemon Squeezy and itch.io) enforce territorial restrictions at the
                point of sale through their own compliance systems.
              </p>
            </Section>

            <Section title="12. AS-IS, No Warranty" index={12}>
              <p className="text-muted-foreground uppercase tracking-wide text-sm" style={{ lineHeight: 1.7 }}>
                HomunculAI is provided "as is" and "as available," with all faults
                and without warranty of any kind, express or implied. KrookedLilly
                disclaims all implied warranties — including merchantability,
                fitness for a particular purpose, accuracy, and non-infringement —
                to the maximum extent permitted by law. KrookedLilly does not
                warrant that the app will be error-free, uninterrupted, secure, or
                that AI-generated content will be accurate, safe, or appropriate.
                Some jurisdictions do not allow certain warranty disclaimers; in
                those jurisdictions, the warranties you have are limited to the
                minimum required by law.
              </p>
            </Section>

            <Section title="13. Limitation of Liability" index={13}>
              <p className="text-muted-foreground uppercase tracking-wide text-sm mb-3" style={{ lineHeight: 1.7 }}>
                To the maximum extent permitted by law, KrookedLilly will not be
                liable for any indirect, incidental, consequential, special,
                exemplary, punitive, or emotional damages, or for any loss of
                data, loss of profits, loss of goodwill, or business interruption,
                arising out of or related to your use of HomunculAI or any
                AI-generated content it displays.
              </p>
              <p className="text-muted-foreground mb-3">
                This includes, without limitation, damages arising from: (a)
                acting on advice, instructions, or information generated by an AI
                agent; (b) loss or corruption of files, chat history, activity
                logs, or avatar state; (c) your decision to verify or otherwise
                trust any particular AI agent; (d) the behavior of any third-party
                AI you connect; (e) loading community-created content; (f) your
                use of the detection whitelist to suppress safety warnings; and
                (g) your use of unauthorized, modified, or pirated copies of
                HomunculAI.
              </p>
              <p className="text-muted-foreground">
                KrookedLilly's total aggregate liability for any claim arising out
                of or related to HomunculAI will not exceed the greater of (i) the
                amount you paid the authorized distributor for the app in the
                twelve months before the claim or (ii) USD $100. Some
                jurisdictions do not allow the exclusion or limitation of certain
                damages; in those jurisdictions, KrookedLilly's liability is
                limited to the minimum permitted by law.
              </p>
            </Section>

            <Section title="14. Indemnification" index={14}>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless KrookedLilly and
                its owners, contractors, and affiliates from any claim, demand,
                loss, or expense (including reasonable attorneys' fees) arising
                from (a) your misuse of HomunculAI, (b) your violation of these
                Terms or applicable law (including export-control or sanctions
                law), (c) your choice of AI agent or community content, (d)
                anything an AI agent does in your instance of the app as a result
                of your configuration or verification decisions, (e) your use of
                the detection whitelist to suppress safety warnings, or (f) your
                use of unauthorized, modified, or pirated copies of HomunculAI.
              </p>
            </Section>

            <Section title="15. AI Transparency Notice" index={15}>
              <p className="text-muted-foreground">
                You are interacting with an AI system. The avatar's words,
                drawings, and expressions are machine-generated by a third-party
                model and are not communications from a human or from KrookedLilly.
                During extended sessions, HomunculAI periodically reminds you that
                the avatar is controlled by an AI agent, not a human. This notice
                and these periodic reminders are provided to help satisfy
                AI-transparency expectations under applicable law, including the
                EU AI Act where it applies and Washington State House Bill 2225
                (effective January 1, 2027) regarding AI companion chatbot
                disclosures.
              </p>
            </Section>

            <Section title="16. Updates to These Terms" index={16}>
              <p className="text-muted-foreground">
                KrookedLilly may update these Terms from time to time. Each
                version has a version number and effective date shown at the top.
                When a new version is released, HomunculAI will present the
                updated Terms on next launch and require you to accept them again
                before continuing use. If you reject the updated Terms, the app
                will close and you can uninstall it; continued use requires
                acceptance of the current version. Transactions completed before a
                Terms update are governed by the version in effect at the time of
                the transaction for matters relating to that transaction; all
                other use is governed by the current version.
              </p>
            </Section>

            <Section title="17. Governing Law and Disputes" index={17}>
              <p className="text-muted-foreground mb-3">
                These Terms are governed by the laws of the State of Washington,
                USA, without regard to conflict-of-law rules. You and KrookedLilly
                agree that any dispute arising out of or related to HomunculAI or
                these Terms will be brought exclusively in the state or federal
                courts located in Spokane County, Washington (Spokane County
                Superior Court or the U.S. District Court for the Eastern District
                of Washington), and you consent to personal jurisdiction there.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-sm text-foreground">
                Nothing in these Terms waives any non-waivable rights you may have
                under Washington's Consumer Protection Act (RCW 19.86), the
                consumer-protection laws of your home jurisdiction, or mandatory
                consumer-rights rules of the platform through which you obtained
                the app. Consumers in the European Union, United Kingdom,
                Australia, and other jurisdictions with mandatory
                consumer-protection regimes may also have the right to bring
                claims in the courts of their home jurisdiction to the extent
                required by local law, notwithstanding this section.
              </div>
            </Section>

            <Section title="18. General Provisions" index={18}>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Severability.</strong> If any
                provision of these Terms is held to be invalid, illegal, or
                unenforceable by a court of competent jurisdiction, that provision
                will be modified to the minimum extent necessary to make it
                enforceable, or if modification is not possible, severed from
                these Terms. The remaining provisions will remain in full force
                and effect.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Entire agreement.</strong>{" "}
                These Terms (together with any distributor's terms that apply to
                your transaction as described in Section 10) constitute the entire
                agreement between you and KrookedLilly regarding HomunculAI and
                supersede all prior or contemporaneous understandings,
                communications, or agreements on the subject.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">No waiver.</strong>{" "}
                KrookedLilly's failure to enforce any right or provision of these
                Terms is not a waiver of that right or provision. No waiver is
                effective unless made in writing and signed by an authorized
                representative of KrookedLilly.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Assignment.</strong> You may
                not assign or transfer these Terms or any rights or licenses
                granted under them, by operation of law or otherwise, without
                KrookedLilly's prior written consent. KrookedLilly may assign
                these Terms, in whole or in part, without restriction — including
                in connection with a merger, acquisition, reorganization, or sale
                of assets. Any unauthorized assignment by you is void.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Force majeure.</strong>{" "}
                KrookedLilly is not liable for any failure or delay in performance
                caused by events beyond its reasonable control, including acts of
                God, natural disasters, war, terrorism, civil unrest, labor
                disputes, internet or infrastructure outages, government actions,
                or pandemics.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Notices.</strong> Notices to
                KrookedLilly under these Terms must be sent to{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>
                . Notices to you may be provided by in-app message, by email to
                any address you have provided to an authorized distributor, or by
                posting on the KrookedLilly website.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Language.</strong> The
                authoritative version of these Terms is the English language
                version. Any translations are provided for convenience only; in
                the event of any inconsistency, the English version controls to
                the extent permitted by applicable law.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-foreground">Headings.</strong> Section
                headings are for convenience only and do not affect the
                interpretation of these Terms.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Relationship.</strong> Nothing
                in these Terms creates any partnership, joint venture, employment,
                or agency relationship between you and KrookedLilly.
              </p>
            </Section>

            <Section title="19. Contact" index={19}>
              <p className="text-muted-foreground mb-3">
                Questions about these Terms:{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>
              </p>
              <p className="text-muted-foreground mb-3">
                For refund requests, contact the distributor you purchased from
                (see Section 10).
              </p>
              <p className="text-muted-foreground">
                For export-control or territorial-restriction questions, contact{" "}
                <a
                  href="mailto:support@krookedlilly.com"
                  className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  support@krookedlilly.com
                </a>
                .
              </p>
            </Section>

            <div className="pt-6 border-t border-white/[0.08] text-center text-sm text-muted-foreground">
              &copy; 2026 KrookedLilly. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
