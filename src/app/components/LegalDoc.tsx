import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { PageMeta } from "./PageMeta";

/**
 * Shared shell and markdown renderer for the HomunculAi legal pages. The text
 * lives in src/app/data/legal/*.md (copied from the approved texts) so the
 * website shows exactly what the app shows. Supports the subset of markdown
 * those files use: ## sections, paragraphs, - lists, | tables, ---, **bold**,
 * *italic*, `code`, and a few auto-linked addresses.
 */

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
  children: ReactNode;
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
        className={`text-xl ${index % 2 === 0 ? "text-teal-light" : "text-primary-light"} mb-3 pb-2 border-b-2 ${index % 2 === 0 ? "border-teal-light/40" : "border-primary-light/40"}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export const linkClass =
  "text-primary-light hover:text-primary-light/80 underline underline-offset-2 break-words";

/** Addresses that become links. Longer patterns come first. */
const AUTO_LINKS: { re: string; to: (m: string) => { href: string; internal?: boolean } }[] = [
  { re: "support@krookedlilly\\.com", to: (m) => ({ href: `mailto:${m}` }) },
  {
    re: "krookedlilly\\.com/(?:apps|games)/homunculai/privacy", // the old address too (moved 2026-11-17)
    to: () => ({ href: "/apps/homunculai/privacy", internal: true }),
  },
  { re: "github\\.com/KrookedLilly/homunculai-releases", to: (m) => ({ href: `https://${m}` }) },
  {
    re: "docs\\.lemonsqueezy\\.com/help/getting-started/supported-countries",
    to: (m) => ({ href: `https://${m}` }),
  },
  { re: "lemonsqueezy\\.com/privacy", to: (m) => ({ href: `https://${m}` }) },
  { re: "findahelpline\\.com", to: () => ({ href: "https://findahelpline.com" }) },
  { re: "krookedlilly\\.com", to: () => ({ href: "https://www.krookedlilly.com" }) },
];

// Owner blanks: [FILL IN: ...] and [CHECK: ...] get a visible highlight.
const PLACEHOLDER = "\\[(?:FILL IN|CHECK)[^\\]]*\\]";
const TOKEN_RE = new RegExp(
  [
    "\\*\\*(.+?)\\*\\*",
    "`([^`]+)`",
    "(?<![\\w*])\\*(?!\\s)([^*]+?)\\*(?![\\w*])",
    `(${PLACEHOLDER})`,
    `(${AUTO_LINKS.map((l) => l.re).join("|")})`,
  ].join("|"),
  "g",
);

function inline(text: string, keyPrefix = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(TOKEN_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const key = `${keyPrefix}-${n++}`;
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="text-foreground">
          {inline(m[1], key)}
        </strong>,
      );
    } else if (m[2] !== undefined) {
      out.push(
        <code key={key} className="text-foreground/80 bg-white/5 px-1 rounded">
          {m[2]}
        </code>,
      );
    } else if (m[3] !== undefined) {
      out.push(<em key={key}>{inline(m[3], key)}</em>);
    } else if (m[4] !== undefined) {
      out.push(
        <mark
          key={key}
          className="bg-amber-400/20 text-amber-300 border border-amber-400/50 rounded-sm px-1 not-italic"
        >
          {m[4]}
        </mark>,
      );
    } else if (m[5] !== undefined) {
      const link = AUTO_LINKS.find((l) => new RegExp(`^(?:${l.re})$`).test(m[5]))!.to(m[5]);
      out.push(
        link.internal ? (
          <Link key={key} to={link.href} className={linkClass}>
            {m[5]}
          </Link>
        ) : (
          <a
            key={key}
            href={link.href}
            className={linkClass}
            {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {m[5]}
          </a>
        ),
      );
    }
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

function blocks(md: string): ReactNode[] {
  const lines = md.split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
    } else if (/^---+\s*$/.test(line)) {
      out.push(<hr key={k++} className="my-6 border-white/[0.08]" />);
      i++;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s|:-]+\|$/.test(lines[i])) rows.push(splitRow(lines[i]));
        i++;
      }
      const [head, ...body] = rows;
      out.push(
        <div key={k++} className="overflow-x-auto mb-4 border border-white/[0.12] rounded-sm">
          <table className="w-full text-sm text-left text-muted-foreground">
            <thead className="text-foreground bg-white/[0.04]">
              <tr>
                {head.map((c, j) => (
                  <th key={j} className="p-3 align-top min-w-[9rem] border-b border-white/[0.12]">
                    {inline(c, `th${j}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-white/[0.08]">
                  {r.map((c, j) => (
                    <td key={j} className="p-3 align-top">
                      {inline(c, `td${ri}-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i])) items.push(lines[i++].slice(2));
      out.push(
        <ul key={k++} className="list-disc pl-6 mb-4 space-y-1.5 text-muted-foreground">
          {items.map((it, j) => (
            <li key={j}>{inline(it, `li${j}`)}</li>
          ))}
        </ul>,
      );
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(- |\||---+\s*$)/.test(lines[i])) {
        para.push(lines[i++]);
      }
      out.push(
        <p key={k++} className="text-muted-foreground mb-4">
          {inline(para.join(" "), `p${k}`)}
        </p>,
      );
    }
  }
  return out;
}

/** Cross-links to every HomunculAi legal page, shown at the bottom of each. */
export const LEGAL_LINKS = [
  { to: "/apps/homunculai/terms", label: "Terms of Use" },
  { to: "/apps/homunculai/privacy", label: "Privacy Notice" },
  { to: "/apps/homunculai/sales-restrictions", label: "Download Restrictions" },
  { to: "/apps/homunculai/what-is-ai", label: "About AI" },
  { to: "/apps/homunculai/safety", label: "Safety" },
  { to: "/apps/homunculai/security", label: "Security" },
];

function LegalLinks() {
  return (
    <nav
      aria-label="HomunculAi legal pages"
      className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-x-5 gap-y-2 text-xs"
    >
      {LEGAL_LINKS.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="text-muted-foreground/80 hover:text-primary-light transition-colors uppercase tracking-wider"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

/** Shell + hero used by every legal page, including the hand-written safety page. */
export function LegalShell({
  title,
  metaTitle,
  description,
  path,
  noIndex,
  icon,
  subtitle,
  children,
}: {
  title: string;
  metaTitle: string;
  description: string;
  path: string;
  noIndex?: boolean;
  icon: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <PageMeta title={metaTitle} description={description} path={path} noIndex={noIndex} />
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/apps/homunculai"
            className="flex w-fit items-center gap-2 text-muted-foreground hover:text-primary-light transition-colors text-sm uppercase tracking-wider mb-6"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HomunculAi
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary-light/40 rounded-sm text-primary-light text-sm mb-4"
          >
            {icon}
            <span
              className="uppercase tracking-wider text-xs"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              HomunculAi
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl text-foreground mb-4 break-words"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm break-words">
            {children}
            <LegalLinks />
          </div>
        </div>
      </section>
    </div>
  );
}

/** Renders a markdown document: text before the first "## " is the intro, each "## " starts a section. */
export function MarkdownSections({ md, startIndex = 1 }: { md: string; startIndex?: number }) {
  const parts = md.replace(/\r\n/g, "\n").split(/^## /m);
  const intro = parts.shift() ?? "";
  return (
    <>
      {intro.trim() && (
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          {blocks(intro)}
        </motion.div>
      )}
      {parts.map((p, idx) => {
        const nl = p.indexOf("\n");
        const title = p.slice(0, nl).trim();
        return (
          <Section key={title} title={title} index={startIndex + idx}>
            {blocks(p.slice(nl + 1))}
          </Section>
        );
      })}
    </>
  );
}
