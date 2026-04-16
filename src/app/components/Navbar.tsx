import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LogoCircleIcon } from "./LogoCircleIcon";
import { LogoLong } from "./LogoLong";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const navLinks = [
  { to: "/", label: "Home", accent: "primary" as const },
  { to: "/catalog", label: "Catalog", accent: "teal" as const },
  { to: "/about", label: "About", accent: "primary" as const },
  { to: "/shop", label: "Shop", accent: "teal" as const },
  { to: "/contact", label: "Contact", accent: "primary" as const },
];

const accentStyles = {
  primary: {
    active: "text-primary bg-primary/10",
    indicator: "bg-primary",
    mobileBorder: "border-primary",
    hover: "hover:text-primary",
  },
  teal: {
    active: "text-teal bg-teal/10",
    indicator: "bg-teal",
    mobileBorder: "border-teal",
    hover: "hover:text-teal",
  },
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/[0.02] backdrop-blur-sm border-b-2 border-white/10">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <LogoCircleIcon className="h-9 w-9 text-white block md:hidden transition-transform group-hover:scale-110 group-hover:-rotate-6" />
            <LogoLong className="h-9 hidden md:block transition-transform group-hover:scale-105 group-hover:-rotate-1 text-white" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const styles = accentStyles[link.accent];
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-md transition-all uppercase tracking-wider text-xs ${
                    isActive
                      ? styles.active
                      : `text-muted-foreground ${styles.hover} hover:bg-white/5`
                  }`}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute bottom-0 left-2 right-2 h-[3px] ${styles.indicator} rounded-full`}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 md:hidden overflow-hidden bg-background/70 backdrop-blur-xl border-b-2 border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                const styles = accentStyles[link.accent];
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-md transition-colors uppercase tracking-wider text-sm ${
                      isActive
                        ? `${styles.active} border-l-4 ${styles.mobileBorder}`
                        : `text-muted-foreground ${styles.hover} hover:bg-white/5`
                    }`}
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}