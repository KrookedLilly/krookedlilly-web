import { Link } from "react-router";
import { LogoCircle } from "./LogoCircle";
import { GlassParticles } from "./GlassParticles";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background/40 backdrop-blur-xl border-t-2 border-white/10">
      {/* Screen-blended particle overlay — above blurred bg, below text */}
      <GlassParticles />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <LogoCircle className="h-10 w-10 text-white transition-transform group-hover:-rotate-12" />
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A husband-and-wife duo making games, apps, and whatever else we feel like.
              No corporate energy here - just vibes
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-foreground mb-4 uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/games", label: "Games & Tools", accent: "primary" },
                { to: "/about", label: "About Us", accent: "teal" },
                { to: "/shop", label: "Shop", accent: "primary" },
                { to: "/contact", label: "Contact", accent: "teal" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-muted-foreground transition-colors ${
                      link.accent === "primary" ? "hover:text-primary" : "hover:text-teal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-foreground mb-4 uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              Stay Updated
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Get notified when we drop something new. No spam, we promise
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50"
              />
              <button
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all border-2 border-primary hover:-translate-y-0.5 uppercase text-xs tracking-wider whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2026 KrookedLilly. Made with mayhem and caffeine</p>
        </div>
      </div>
    </footer>
  );
}