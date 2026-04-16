import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { NotFound } from "./components/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
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
      { path: "*", Component: NotFound },
    ],
  },
]);