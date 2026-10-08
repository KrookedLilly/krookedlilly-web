import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Whether the visitor asked for reduced motion. Reports false while hydrating
 * (matching the pre-rendered HTML, which can't know the setting) and the real
 * preference right after, so reduced-motion visitors don't hit a hydration
 * mismatch that forces React to re-render the whole page.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
