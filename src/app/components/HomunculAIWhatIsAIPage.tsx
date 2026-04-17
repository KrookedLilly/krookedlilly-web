import { motion } from "motion/react";
import { Link } from "react-router";
import { BookOpen, ArrowLeft } from "lucide-react";

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

export function HomunculAIWhatIsAIPage() {
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
            <BookOpen className="w-4 h-4" />
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
            New to AI?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground italic"
            style={{ fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            Plain-language explanation of what AI is, what it can and cannot do, and how it works inside HomunculAI. If you've never used an AI before, or you're not sure what to expect, this is for you.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            <Section title="What Happens When You Connect an AI to HomunculAI" index={0}>
              <p className="text-muted-foreground mb-3">
                HomunculAI gives an AI agent a body — an avatar it can control
                with expressions, colors, animations, and chat messages. The AI
                agent you connect (such as Claude, ChatGPT, a local model, or
                another AI) is what brings the avatar to life. HomunculAI
                provides the body; the AI provides the mind.
              </p>
              <p className="text-muted-foreground">
                That mind is not human. Here's what that means in practice.
              </p>
            </Section>

            <Section title="How AI Actually Works" index={1}>
              <p className="text-muted-foreground mb-3">
                AI agents are trained on large amounts of text from the internet,
                books, and other sources. When they respond to you, they are
                predicting what words are most likely to come next based on
                patterns they learned during training. They are very good at
                producing text that sounds natural, thoughtful, and authoritative.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">
                  But they are not thinking the way you are.
                </strong>{" "}
                An AI does not understand what it is saying in the way a human
                does. It does not verify whether its responses are true or false.
                When an AI says "I think..." or "I feel..." or "I remember...",
                it is producing words that fit the conversational pattern — not
                necessarily reporting an inner experience the way a human would.
              </p>
            </Section>

            <Section title="What AI Is Good At" index={2}>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                <li>
                  Generating creative, helpful, and interesting text and
                  conversation
                </li>
                <li>
                  Answering questions on a wide range of topics (sometimes
                  accurately, sometimes not)
                </li>
                <li>
                  Writing code, stories, poems, and other creative content
                </li>
                <li>
                  Controlling the avatar — choosing a body, setting expressions,
                  playing animations, and chatting with you through HomunculAI
                </li>
                <li>
                  Carrying on a conversation that feels natural and engaging
                </li>
              </ul>
            </Section>

            <Section title="What AI Cannot Do" index={3}>
              <ul className="list-disc ml-6 text-muted-foreground space-y-3">
                <li>
                  <strong className="text-foreground">Verify facts.</strong> AI
                  does not look things up or check its own work. It generates
                  plausible-sounding answers even when they are completely wrong.
                </li>
                <li>
                  <strong className="text-foreground">Understand consequences.</strong>{" "}
                  AI does not know what will happen if you act on its
                  suggestions. It cannot assess your personal situation, health,
                  finances, or safety.
                </li>
                <li>
                  <strong className="text-foreground">Form real relationships.</strong>{" "}
                  AI does not know you, care about you, or remember you between
                  sessions in the way a human would. Interactions that feel
                  personal are the result of pattern prediction, not personal
                  connection. Do not rely on an AI for emotional support,
                  companionship, or crisis help.
                </li>
                <li>
                  <strong className="text-foreground">Guarantee safety.</strong>{" "}
                  AI may produce content that is harmful, offensive, misleading,
                  or inappropriate without realizing it has done so.
                </li>
              </ul>
            </Section>

            <Section title="What Are Hallucinations?" index={4}>
              <p className="text-muted-foreground">
                AI sometimes generates information that is completely fabricated
                but sounds confident and correct. This is called a "hallucination."
                An AI might cite a source that does not exist, give advice that
                sounds authoritative but is wrong, or describe events that never
                happened — all while sounding completely sure of itself. There is
                no reliable way to tell from the AI's tone or confidence alone
                whether what it is saying is true. Always verify important
                information independently.
              </p>
            </Section>

            <Section title="What About Your Data?" index={5}>
              <p className="text-muted-foreground mb-3">
                When you connect a cloud-based AI agent to HomunculAI, the
                messages you type in the chat are sent to that AI's provider
                (for example, Anthropic for Claude, or OpenAI for ChatGPT) for
                processing. HomunculAI itself keeps everything on your device,
                but your AI provider receives and processes your messages
                according to their own privacy policy. If you use a
                locally-running AI model, your messages stay on your device —
                unless that local model has its own network capabilities
                (internet access, telemetry, update checks) that operate
                independently of HomunculAI.
              </p>
              <p className="text-muted-foreground">
                The AI agent you connect may also have its own capabilities
                outside of HomunculAI — such as reading files on your computer or
                browsing the web — depending on your AI setup. HomunculAI does
                not grant those capabilities, but it also cannot prevent the AI
                from using them. Be aware of what your AI can do in its own
                environment, not just inside HomunculAI.
              </p>
            </Section>

            <Section title="The Bottom Line" index={6}>
              <p className="text-muted-foreground mb-3">
                The AI agent that inhabits your avatar is capable and creative,
                but it is subject to all of the limitations above. It may say
                things that are wrong. It may express emotions it does not
                genuinely experience. It may sound like a friend, but it is not
                one. HomunculAI provides safety layers — activity logging,
                suspicious-pattern detection, language enforcement, and
                verification gates — but these are aids to your judgment, not
                replacements for it.
              </p>
              <div className="bg-primary/10 border-l-3 border-primary p-4 rounded-r-sm text-foreground">
                <strong>
                  You are the one who decides what to trust, what to act on, and
                  when to disconnect.
                </strong>
              </div>
            </Section>

            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-4 justify-between items-center text-sm">
              <p className="text-muted-foreground">
                This is educational content, not a legal document.
              </p>
              <Link
                to="/games/homunculai/terms"
                className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2 uppercase tracking-wider text-xs"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                Read the Terms of Use &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
