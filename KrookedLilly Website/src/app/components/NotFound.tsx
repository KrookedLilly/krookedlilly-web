import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        className="text-center px-4"
      >
        <h1
          className="text-8xl sm:text-9xl bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent mb-4 -rotate-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <h2
          className="text-2xl text-foreground mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Uhh... That&apos;s Not a Page
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          You either found a broken link or you're exploring places that don't exist yet. Either way, respect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] border-2 border-primary uppercase tracking-wider text-sm"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 rounded-sm transition-all hover:-translate-y-1 uppercase tracking-wider text-sm"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}