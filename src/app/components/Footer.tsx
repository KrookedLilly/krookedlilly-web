import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { LogoCircle } from "./LogoCircle";
import { SocialIcon } from "./SocialIcon";
import { socials, DISCORD_URL } from "../data/socials";
import { useFormspree, FORM_ERROR_MESSAGE } from "../../hooks/useFormspree";

export function Footer() {
  const [email, setEmail] = useState("");
  const { status, submit } = useFormspree("Footer: Stay Updated newsletter signup");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && (await submit({ email }, "KrookedLilly newsletter: new signup"))) {
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border-t-2 border-white/10">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <LogoCircle className="h-10 w-10 text-white transition-transform group-hover:-rotate-12" />
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A husband-and-wife duo making games, apps, mods, and whatever else we feel like
            </p>
            <ul className="flex flex-wrap gap-2 mt-5" aria-label="KrookedLilly on social media">
              {[...socials, { label: "Discord", url: DISCORD_URL, icon: "discord" as const }].map((s, i) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`KrookedLilly on ${s.label}`}
                    title={s.label}
                    className={`flex items-center justify-center w-9 h-9 rounded-sm border-2 border-white/10 text-muted-foreground transition-colors ${
                      i % 2 === 0 ? "hover:text-primary-light hover:border-primary-light/70" : "hover:text-teal-light hover:border-teal-light/70"
                    }`}
                  >
                    <SocialIcon name={s.icon} className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
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
                { to: "/catalog", label: "Catalog", accent: "primary" },
                { to: "/about", label: "About Us", accent: "teal" },
                { to: "/socials", label: "Socials", accent: "primary" },
                { to: "/shop", label: "Shop", accent: "teal" },
                { to: "/contact", label: "Contact", accent: "primary" },
                { to: "/press-kits", label: "Press Kits", accent: "teal" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-muted-foreground transition-colors ${
                      link.accent === "primary" ? "hover:text-primary-light" : "hover:text-teal-light"
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
            {status === "sent" ? (
              <p className="flex items-center gap-2 text-lime text-sm" role="status">
                <Check className="w-4 h-4" />
                You're on the list. We'll let you know.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-4 py-2 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal-light/80"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shrink-0 px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-sm transition-all border-2 border-primary-light hover:-translate-y-0.5 uppercase text-xs tracking-wider whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {status === "sending" ? "..." : "Join"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p role="alert" className="mt-2 text-xs text-red-400">
                {FORM_ERROR_MESSAGE}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2026 KrookedLilly. Made with mayhem and caffeine</p>
        </div>
      </div>
    </footer>
  );
}