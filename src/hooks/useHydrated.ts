import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False while React hydrates a pre-rendered page (matching the static HTML),
 * true on every render after that, and true straight away for pages mounted
 * by client-side navigation. Use it to gate anything the pre-renderer can't
 * know, like query parameters, without causing a hydration mismatch.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
