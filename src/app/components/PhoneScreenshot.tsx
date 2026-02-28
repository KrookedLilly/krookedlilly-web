/**
 * PhoneScreenshot — renders any mobile screenshot in a uniform phone-shaped
 * frame with consistent aspect ratio cropping. All screenshots display at
 * exactly the same size regardless of the source image dimensions.
 *
 * The normalized aspect ratio is 9:19.5 (~0.462) which matches a modern
 * phone screen. Images are cropped via object-cover + object-top so the
 * top UI / banner area is always visible.
 */

interface PhoneScreenshotProps {
  src: string;
  alt: string;
  /** Extra Tailwind classes on the outer wrapper */
  className?: string;
  /** If true, renders a subtle phone bezel frame around the image */
  bezel?: boolean;
  /** Object-position override, defaults to "top" */
  objectPosition?: string;
  /** Click handler */
  onClick?: () => void;
}

export function PhoneScreenshot({
  src,
  alt,
  className = "",
  bezel = false,
  objectPosition = "top",
  onClick,
}: PhoneScreenshotProps) {
  const inner = (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      /* 9:19.5 phone aspect ratio via padding-bottom trick */
      style={{ paddingBottom: "216.67%" }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        draggable={false}
      />
    </div>
  );

  if (bezel) {
    return (
      <div
        className={`inline-block rounded-[2rem] border-[6px] border-white/10 bg-black p-[3px] shadow-xl ${className}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="overflow-hidden rounded-[1.5rem]">{inner}</div>
      </div>
    );
  }

  return (
    <div
      className={`inline-block overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {inner}
    </div>
  );
}
