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
        path: "games/50-ball-drop",
        lazy: () =>
          import("./components/BallDropPage").then((m) => ({
            Component: m.BallDropPage,
          })),
      },
      {
        path: "games/homunculai",
        lazy: () =>
          import("./components/HomunculAIPage").then((m) => ({
            Component: m.HomunculAIPage,
          })),
      },
      {
        path: "games/homunculai/terms",
        lazy: () =>
          import("./components/HomunculAITermsPage").then((m) => ({
            Component: m.HomunculAITermsPage,
          })),
      },
      {
        path: "games/homunculai/sales-restrictions",
        lazy: () =>
          import("./components/HomunculAISalesRestrictionsPage").then((m) => ({
            Component: m.HomunculAISalesRestrictionsPage,
          })),
      },
      {
        path: "games/homunculai/what-is-ai",
        lazy: () =>
          import("./components/HomunculAIWhatIsAIPage").then((m) => ({
            Component: m.HomunculAIWhatIsAIPage,
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
        path: "tools/lunchbox",
        lazy: () =>
          import("./components/LunchBoxPage").then((m) => ({
            Component: m.LunchBoxPage,
          })),
      },
      {
        path: "games/acrostix/privacy",
        lazy: () =>
          import("./components/AcrostixPrivacyPage").then((m) => ({
            Component: m.AcrostixPrivacyPage,
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
