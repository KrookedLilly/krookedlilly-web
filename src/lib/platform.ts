export type Platform = "ios" | "android" | "desktop";

export function detectPlatform(userAgent: string): Platform {
  if (/iPad|iPhone|iPod/.test(userAgent)) return "ios";
  if (/android/i.test(userAgent)) return "android";
  return "desktop";
}
