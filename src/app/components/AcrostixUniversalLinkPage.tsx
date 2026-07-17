import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Smartphone, Sparkles } from "lucide-react";
import { PageMeta } from "./PageMeta";
import { detectPlatform, type Platform } from "@/lib/platform";

const APP_STORE_URL = "https://apps.apple.com/us/app/acrostix/id6760374016";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.krookedlilly.acrostix";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function AcrostixUniversalLinkPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!gameId || !platform || platform === "desktop") return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    const id = window.setTimeout(() => {
      window.location.href = `acrostix://semantic-volley/challenge/${gameId}`;
    }, 250);
    return () => window.clearTimeout(id);
  }, [gameId, platform]);

  const showAppStore = platform === "ios" || platform === "desktop" || platform === null;
  const showPlayStore = platform === "android" || platform === "desktop" || platform === null;

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Acrostix Challenge"
        description="Open this Acrostix challenge in the app, or download Acrostix to play along."
        path={gameId ? `/games/acrostix/sv/${gameId}` : "/games/acrostix/sv"}
        noIndex
      />
      <section className="relative pt-6 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(160,92,246,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/games/acrostix"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-teal transition-colors text-sm uppercase tracking-wider mb-10"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            About Acrostix
          </Link>

          <motion.div initial="hidden" animate="visible" className="text-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Sparkles className="w-5 h-5 text-teal -rotate-12" />
              <Sparkles className="w-6 h-6 text-primary rotate-6" />
              <Sparkles className="w-5 h-5 text-lime -rotate-6" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl sm:text-7xl text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
            >
              <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                You've Been Challenged
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-md mx-auto mb-8"
              style={{ fontSize: "1.125rem" }}
            >
              A friend sent you a Semantic Volley round in Acrostix. Open the
              app to play your turn, or download Acrostix to join in.
            </motion.p>

            {gameId && (
              <motion.div variants={fadeUp} custom={3} className="mb-10">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-sm text-muted-foreground text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Game ID
                  <span className="font-mono text-foreground normal-case tracking-normal">
                    {gameId}
                  </span>
                </span>
              </motion.div>
            )}

            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {showAppStore && (
                <a
                  href={APP_STORE_URL}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md border-2 border-primary transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Smartphone className="w-4 h-4" />
                  Download on App Store
                </a>
              )}
              {showPlayStore && (
                <a
                  href={PLAY_STORE_URL}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)] uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Smartphone className="w-4 h-4" />
                  Get it on Google Play
                </a>
              )}
            </motion.div>

            {platform === "desktop" && (
              <motion.p
                variants={fadeUp}
                custom={5}
                className="text-muted-foreground/70 text-sm mt-8 max-w-md mx-auto"
              >
                Acrostix is a mobile game. Open this link on your phone, or
                scan it with your camera, to play.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
