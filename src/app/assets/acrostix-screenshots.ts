// Dark Mode
import imgDarkHome from "@/assets/IMG_0490-1.PNG";
import imgDarkChallenge from "@/assets/IMG_0495-1.PNG";
import imgDarkResults from "@/assets/scores-dark.png";
import imgDarkStats from "@/assets/IMG_0519.PNG";
import imgDarkAchievements from "@/assets/achievements.webp";

// Light Mode
import imgLightHome from "@/assets/acrostix-light-home.png";
import imgLightChallenge from "@/assets/acrostix-light-challenge.png";
import imgLightResults from "@/assets/acrostix-light-results.png";
import imgLightStats from "@/assets/acrostix-light-stats.png";
import imgLightAchievements from "@/assets/acrostix-light-achievements.png";

// Colorblind Mode
import imgCbHome from "@/assets/acrostix-cb-home.png";
import imgCbChallenge from "@/assets/acrostix-cb-challenge.png";
import imgCbResults from "@/assets/acrostix-cb-results.png";
import imgCbStats from "@/assets/acrostix-cb-stats.png";
import imgCbAchievements from "@/assets/acrostix-cb-achievements.png";

export type ScreenName =
  | "home"
  | "challenge"
  | "results"
  | "stats"
  | "achievements";

export type ThemeMode = "dark" | "light" | "colorblind";

export interface Screenshot {
  src: string;
  screen: ScreenName;
  label: string;
  mode: ThemeMode;
}

const screenshotMap: Record<ThemeMode, Record<ScreenName, string>> = {
  dark: {
    home: imgDarkHome,
    challenge: imgDarkChallenge,
    results: imgDarkResults,
    stats: imgDarkStats,
    achievements: imgDarkAchievements,
  },
  light: {
    home: imgLightHome,
    challenge: imgLightChallenge,
    results: imgLightResults,
    stats: imgLightStats,
    achievements: imgLightAchievements,
  },
  colorblind: {
    home: imgCbHome,
    challenge: imgCbChallenge,
    results: imgCbResults,
    stats: imgCbStats,
    achievements: imgCbAchievements,
  },
};

const screenLabels: Record<ScreenName, string> = {
  home: "Home",
  challenge: "Challenge",
  results: "Results",
  stats: "Stats",
  achievements: "Achievements",
};

const modeLabels: Record<ThemeMode, string> = {
  dark: "Dark Mode",
  light: "Light Mode",
  colorblind: "Colorblind Mode",
};

/** Get a single screenshot by mode and screen */
export function getScreenshot(mode: ThemeMode, screen: ScreenName): Screenshot {
  return {
    src: screenshotMap[mode][screen],
    screen,
    label: `${screenLabels[screen]} — ${modeLabels[mode]}`,
    mode,
  };
}

/** Get all screenshots for a given mode */
export function getScreenshotsByMode(mode: ThemeMode): Screenshot[] {
  return (Object.keys(screenshotMap[mode]) as ScreenName[]).map((screen) =>
    getScreenshot(mode, screen)
  );
}

/** Get all screenshots for a given screen across all modes */
export function getScreenshotsByScreen(screen: ScreenName): Screenshot[] {
  return (Object.keys(screenshotMap) as ThemeMode[]).map((mode) =>
    getScreenshot(mode, screen)
  );
}

/** Get all 18 screenshots */
export function getAllScreenshots(): Screenshot[] {
  return (Object.keys(screenshotMap) as ThemeMode[]).flatMap((mode) =>
    getScreenshotsByMode(mode)
  );
}

/** Convenience re-exports of the most useful card images */
export const acrostixCardImage = imgDarkHome;
export const acrostixHeroImages = {
  dark: imgDarkHome,
  light: imgLightHome,
  colorblind: imgCbHome,
};
