import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

// Link shared from the app's score card. Sends phones straight to their own
// store; desktop gets both buttons. Lives outside /games/acrostix so Android
// App Links never hand it to the app (the app has no route for it).
export function AcrostixGetPage() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!platform || platform === "desktop") return;
    window.location.replace(platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL);
  }, [platform]);

  const showAppStore = platform === "ios" || platform === "desktop" || platform === null;
  const showPlayStore = platform === "android" || platform === "desktop" || platform === null;

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Get Acrostix"
        description="Acrostix is a word game where every word of your sentence starts with a letter of the target word. Download it on the App Store or Google Play."
        path="/acrostix"
        noIndex
      />
      <section className="relative pt-6 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.10)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/games/acrostix"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-teal-light transition-colors text-sm uppercase tracking-wider mb-10"
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
              <Sparkles className="w-5 h-5 text-teal-light -rotate-12" />
              <Sparkles className="w-6 h-6 text-primary-light rotate-6" />
              <Sparkles className="w-5 h-5 text-lime -rotate-6" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl sm:text-7xl text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
            >
              <span className="bg-gradient-to-r from-teal to-primary bg-clip-text text-transparent">
                Get Acrostix
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-md mx-auto mb-10"
              style={{ fontSize: "1.125rem" }}
            >
              Someone sent you their Acrostix score. Download the game and see
              if you can beat it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {showAppStore && (
                <a
                  href={APP_STORE_URL}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Smartphone className="w-4 h-4" />
                  Download on App Store
                </a>
              )}
              {showPlayStore && (
                <a
                  href={PLAY_STORE_URL}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal hover:bg-teal/90 text-black rounded-md border-2 border-teal-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--teal-rgb)/0.4)] uppercase tracking-wider text-sm"
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
                custom={4}
                className="text-muted-foreground/70 text-sm mt-8 max-w-md mx-auto"
              >
                Acrostix is a mobile game. Open this link on your phone to
                download it.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
