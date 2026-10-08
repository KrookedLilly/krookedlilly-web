/**
 * Brand accent colors for code that can't read CSS variables (the canvas
 * particle and fireworks effects). Everything else uses the CSS variables.
 *
 * Keep in sync with --primary-rgb / --teal-rgb in src/styles/theme.css.
 */
export const BRAND = {
  primary: "#b261fe",
  primaryShade: "#7c3aed",
  teal: "#39ada4",
  lime: "#84cc16",
  warmWhite: "#f0f0e8",
} as const;

/** "#rrggbb" to "r,g,b", for building rgba() strings on a canvas. */
export function rgbTriple(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
