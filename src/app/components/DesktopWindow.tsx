/**
 * DesktopWindow — renders desktop app screenshots/mocks in a consistent
 * window frame. Mirror of PhoneScreenshot but for desktop art.
 *
 * Defaults to a 16:9 aspect ratio. Pass `aspect` (CSS padding-bottom %) to
 * override. Optional `chrome` adds macOS-style traffic lights + title bar.
 *
 * Pass `src` to render an image, or `children` to render placeholder content.
 */

import type { ReactNode } from "react";

interface DesktopWindowProps {
  src?: string;
  alt?: string;
  /** Extra Tailwind classes on the outer wrapper */
  className?: string;
  /** Adds traffic-light dots and a subtle title bar */
  chrome?: boolean;
  /** Text shown in the title bar when chrome is on */
  title?: string;
  /** CSS padding-bottom percentage — "56.25%" = 16:9 (default), "75%" = 4:3, "100%" = square */
  aspect?: string;
  /** object-position override */
  objectPosition?: string;
  /** Placeholder content when src is not provided */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}

export function DesktopWindow({
  src,
  alt = "",
  className = "",
  chrome = true,
  title,
  aspect = "56.25%",
  objectPosition = "center",
  children,
  onClick,
}: DesktopWindowProps) {
  return (
    <div
      className={`inline-block rounded-lg border-[3px] border-white/10 bg-black/60 backdrop-blur-sm shadow-2xl overflow-hidden ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {chrome && (
        /* Windows-style titlebar: title on the left, min/max/close on the right. */
        <div className="flex items-center justify-between pl-3 pr-0 py-1.5 bg-white/[0.04] border-b border-white/10">
          <span
            className="text-[10px] uppercase tracking-wider text-muted-foreground/70 truncate"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            {title ?? ""}
          </span>
          <div className="flex items-center text-muted-foreground/70">
            {/* minimize */}
            <span className="w-8 h-6 flex items-center justify-center text-[11px] leading-none">&#x2013;</span>
            {/* maximize */}
            <span className="w-8 h-6 flex items-center justify-center text-[10px] leading-none">&#x25A1;</span>
            {/* close */}
            <span className="w-8 h-6 flex items-center justify-center text-[11px] leading-none">&#x2715;</span>
          </div>
        </div>
      )}
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: aspect }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition }}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-teal/5 to-lime/10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
