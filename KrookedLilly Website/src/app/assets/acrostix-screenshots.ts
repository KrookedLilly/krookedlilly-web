// Dark Mode
import imgDarkAchievements from "figma:asset/421b8a240214506604a8f01d2bab622bcd81b61b.png";
import imgDarkHome from "figma:asset/4a6e044b799dbe8ac33028ac0edba5dde3db6f53.png";
import imgDarkChallenge from "figma:asset/8262318d0db1dc7299425376edee2e3cfa5916a9.png";
import imgDarkResults from "figma:asset/11429e82c824745a7d5efd9d59773fa6e0234e0b.png";
import imgDarkSettings from "figma:asset/fd8ee275de9be884ed6ca274afdc03c637c0c136.png";
import imgDarkStats from "figma:asset/773aae1b9deae035c672724cf3bf27d169484715.png";

// Light Mode
import imgLightAchievements from "figma:asset/f0ccff765e43c432a14380a0085b6137a17f769f.png";
import imgLightHome from "figma:asset/3d8d85b1ccf03299472f8779fb800af45cae8d8c.png";
import imgLightChallenge from "figma:asset/7f68b5d9e4bf7c0442a15a9910283539c4b1427c.png";
import imgLightResults from "figma:asset/2c7e3f47aee48bc0a8fb8b994e22c9b618b3a0d7.png";
import imgLightSettings from "figma:asset/79ccbe6368a42338b1482fb1cfa7846a9168852b.png";
import imgLightStats from "figma:asset/b889093f30449fecc332f8df5599f862aecd60a1.png";

// Colorblind Mode
import imgCbAchievements from "figma:asset/46bc802e19d38a79f12f5c9e59452aaec5cf39af.png";
import imgCbHome from "figma:asset/1e74434f56094702f738e02ee857ffa0ffd585f6.png";
import imgCbChallenge from "figma:asset/16aa593f7b2671436c37d462de857634bda45e0d.png";
import imgCbResults from "figma:asset/b5f45df0fc14ed419b86f9a493dfc56f42abf25f.png";
import imgCbSettings from "figma:asset/dc5d62baace1f758c3609c60b58299a6c54a14c3.png";
import imgCbStats from "figma:asset/85db7d3da2fec0647adc35bd1122bb8d646d5bce.png";

export type ScreenName =
  | "home"
  | "challenge"
  | "results"
  | "stats"
  | "achievements"
  | "settings";

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
    settings: imgDarkSettings,
  },
  light: {
    home: imgLightHome,
    challenge: imgLightChallenge,
    results: imgLightResults,
    stats: imgLightStats,
    achievements: imgLightAchievements,
    settings: imgLightSettings,
  },
  colorblind: {
    home: imgCbHome,
    challenge: imgCbChallenge,
    results: imgCbResults,
    stats: imgCbStats,
    achievements: imgCbAchievements,
    settings: imgCbSettings,
  },
};

const screenLabels: Record<ScreenName, string> = {
  home: "Home",
  challenge: "Challenge",
  results: "Results",
  stats: "Stats",
  achievements: "Achievements",
  settings: "Settings",
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