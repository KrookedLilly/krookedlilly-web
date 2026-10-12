import { createElement } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { NotFound } from "./components/NotFound";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    entry: "src/app/components/Layout.tsx",
    children: [
      { index: true, Component: HomePage },
      {
        path: "catalog",
        lazy: () =>
          import("./components/GamesPage").then((m) => ({
            Component: m.GamesPage,
          })),
      },
      {
        path: "games/acrostix",
        lazy: () =>
          import("./components/AcrostixPage").then((m) => ({
            Component: m.AcrostixPage,
          })),
      },
      {
        path: "games/galactic-parcel-service",
        lazy: () =>
          import("./components/GpsPage").then((m) => ({
            Component: m.GpsPage,
          })),
      },
      {
        path: "games/match-fives",
        lazy: () =>
          import("./components/MatchFivesPage").then((m) => ({
            Component: m.MatchFivesPage,
          })),
      },
      {
        path: "games/match-fives/privacy",
        lazy: () =>
          import("./components/MatchFivesPrivacyPage").then((m) => ({
            Component: m.MatchFivesPrivacyPage,
          })),
      },
      {
        path: "games/50-ball-drop",
        lazy: () =>
          import("./components/BallDropPage").then((m) => ({
            Component: m.BallDropPage,
          })),
      },
      {
        path: "games/50-ball-drop/privacy",
        lazy: () =>
          import("./components/BallDropPrivacyPage").then((m) => ({
            Component: m.BallDropPrivacyPage,
          })),
      },
      {
        path: "mods/exfilcraft",
        lazy: () =>
          import("./components/ExfilCraftPage").then((m) => ({
            Component: m.ExfilCraftPage,
          })),
      },
      {
        path: "apps/homunculai",
        lazy: () =>
          import("./components/HomunculAiPage").then((m) => ({
            Component: m.HomunculAiPage,
          })),
      },
      {
        path: "apps/homunculai/terms",
        lazy: () =>
          import("./components/HomunculAiTermsPage").then((m) => ({
            Component: m.HomunculAiTermsPage,
          })),
      },
      {
        path: "apps/homunculai/sales-restrictions",
        lazy: () =>
          import("./components/HomunculAiSalesRestrictionsPage").then((m) => ({
            Component: m.HomunculAiSalesRestrictionsPage,
          })),
      },
      {
        path: "apps/homunculai/what-is-ai",
        lazy: () =>
          import("./components/HomunculAiWhatIsAIPage").then((m) => ({
            Component: m.HomunculAiWhatIsAIPage,
          })),
      },
      {
        path: "about",
        lazy: () =>
          import("./components/AboutPage").then((m) => ({
            Component: m.AboutPage,
          })),
      },
      {
        path: "socials",
        lazy: () =>
          import("./components/SocialsPage").then((m) => ({
            Component: m.SocialsPage,
          })),
      },
      {
        path: "shop",
        lazy: () =>
          import("./components/ShopPage").then((m) => ({
            Component: m.ShopPage,
          })),
      },
      {
        path: "contact",
        lazy: () =>
          import("./components/ContactPage").then((m) => ({
            Component: m.ContactPage,
          })),
      },
      {
        path: "tools/he-keyboards",
        lazy: () =>
          import("./components/HEKeyboardsPage").then((m) => ({
            Component: m.HEKeyboardsPage,
          })),
      },
      {
        path: "apps/snacktray",
        lazy: () =>
          import("./components/SnackTrayPage").then((m) => ({
            Component: m.SnackTrayPage,
          })),
      },
      {
        path: "tools/ui-toolkit",
        lazy: () =>
          import("./components/UiToolkitSuitePage").then((m) => ({
            Component: m.UiToolkitSuitePage,
          })),
      },
      {
        path: "tools/squamojis",
        lazy: () =>
          import("./components/SquamojisPage").then((m) => ({
            Component: m.SquamojisPage,
          })),
      },
      {
        path: "mods/minecraft-mods",
        lazy: () =>
          import("./components/MinecraftModsPage").then((m) => ({
            Component: m.MinecraftModsPage,
          })),
      },
      // Retired UI Toolkit detail pages now consolidated into the suite hub.
      // Keep the old paths alive as redirects for existing inbound links.
      ...[
        "tools/screen-manager",
        "tools/tween-engine",
        "tools/responsive-layout",
        "tools/modal-notifications",
        "tools/focus-navigation",
      ].map((path) => ({
        path,
        lazy: () =>
          import("./components/ToolkitRedirect").then((m) => ({
            Component: m.ToolkitRedirect,
          })),
      })),
      // Products that moved to the prefix matching their catalog category
      // (mods under /mods, apps under /apps). Old path -> [new path, title].
      ...(
        [
          ["games/exfilcraft", "/mods/exfilcraft", "ExfilCraft"],
          ["tools/minecraft-mods", "/mods/minecraft-mods", "Minecraft Mods"],
          ["games/homunculai", "/apps/homunculai", "HomunculAi"],
          ["games/homunculai/terms", "/apps/homunculai/terms", "HomunculAi Terms"],
          [
            "games/homunculai/sales-restrictions",
            "/apps/homunculai/sales-restrictions",
            "HomunculAi Sales Restrictions",
          ],
          ["games/homunculai/what-is-ai", "/apps/homunculai/what-is-ai", "HomunculAi: What is AI"],
          ["tools/snacktray", "/apps/snacktray", "SnackTray"],
        ] as const
      ).map(([path, to, title]) => ({
        path,
        lazy: () =>
          import("./components/PageRedirect").then((m) => ({
            Component: () => createElement(m.PageRedirect, { to, title }),
          })),
      })),
      {
        path: "games/acrostix/privacy",
        lazy: () =>
          import("./components/AcrostixPrivacyPage").then((m) => ({
            Component: m.AcrostixPrivacyPage,
          })),
      },
      {
        path: "games/acrostix/terms",
        lazy: () =>
          import("./components/AcrostixTermsPage").then((m) => ({
            Component: m.AcrostixTermsPage,
          })),
      },
      {
        path: "games/acrostix/sv/:gameId",
        lazy: () =>
          import("./components/AcrostixUniversalLinkPage").then((m) => ({
            Component: m.AcrostixUniversalLinkPage,
          })),
      },
      {
        path: "acrostix",
        lazy: () =>
          import("./components/AcrostixGetPage").then((m) => ({
            Component: m.AcrostixGetPage,
          })),
      },
      {
        path: "press-kits",
        lazy: () =>
          import("./components/PressKitsPage").then((m) => ({
            Component: m.PressKitsPage,
          })),
      },
      { path: "*", Component: NotFound },
    ],
  },
];
