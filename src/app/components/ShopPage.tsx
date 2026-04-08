import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Bell, Sparkles, Package } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const upcomingItems = [
  {
    icon: Sparkles,
    title: "Merch & Stuff",
    description: "We've got some ideas bouncing around — stay tuned to see what lands",
    tilt: "-rotate-1",
    accent: "primary" as const,
  },
  {
    icon: Package,
    title: "Digital Goodies",
    description: "Wallpapers, soundtracks, maybe more — we're still figuring it out",
    tilt: "rotate-2",
    accent: "teal" as const,
  },
];

const itemAccentMap = {
  primary: {
    hoverBorder: "hover:border-primary/30",
    shadow: "hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.1)]",
    iconBg: "bg-primary/10 border-primary/20",
    iconColor: "text-primary",
  },
  teal: {
    hoverBorder: "hover:border-teal/30",
    shadow: "hover:shadow-[4px_4px_0px_0px_rgba(34,211,238,0.1)]",
    iconBg: "bg-teal/10 border-teal/20",
    iconColor: "text-teal",
  },
};

export function ShopPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await fetch("https://formspree.io/f/mzdkwgka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-[radial-gradient(circle,_rgba(160,92,246,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="w-20 h-20 bg-lime flex items-center justify-center mx-auto mb-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] rounded-sm"
          >
            <ShoppingBag className="w-10 h-10 text-black" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Shop{" "}
            <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
              Coming Soon
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-lg mx-auto mb-10"
          >
            We're not totally sure what this will look like yet, but we're working on it.
            Drop your email if you wanna know when something shows up!
          </motion.p>

          {/* Notify Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            {submitted ? (
              <div className="flex items-center justify-center gap-3 p-4 bg-lime/10 border-2 border-lime/30 text-lime rounded-sm">
                <Bell className="w-5 h-5" />
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>Nice! We'll holler when we launch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.4)] border-2 border-primary uppercase tracking-wider text-xs whitespace-nowrap"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  <Bell className="w-4 h-4" />
                  Notify Me
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* What's Coming */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl text-foreground text-center mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ideas Brewing
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {upcomingItems.map((item, i) => {
              const accent = itemAccentMap[item.accent];
              return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`group p-8 bg-white/[0.06] border-2 border-dashed border-white/[0.15] ${accent.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${accent.shadow} text-center ${item.tilt} hover:rotate-0 rounded-sm will-change-transform`}
              >
                <div className={`w-14 h-14 ${accent.iconBg} border flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform rounded-sm`}>
                  <item.icon className={`w-7 h-7 ${accent.iconColor}`} />
                </div>
                <h3
                  className="text-foreground mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaser Section */}
      <section className="py-20 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-2xl sm:text-4xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why a Shop?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-4">
              We like making things. Sometimes those things end up on screens, and sometimes
              maybe they end up on other stuff too. We'll see where it goes
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
              Either way, anything we put here directly supports two weirdos making indie games
              in their spare time
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
