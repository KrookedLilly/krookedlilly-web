import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { GamesPage } from "./components/GamesPage";
import { AboutPage } from "./components/AboutPage";
import { ShopPage } from "./components/ShopPage";
import { ContactPage } from "./components/ContactPage";
import { AcrostixPage } from "./components/AcrostixPage";
import { GpsPage } from "./components/GpsPage";
import { MatchFivesPage } from "./components/MatchFivesPage";
import { BallDropPage } from "./components/BallDropPage";
import { NotFound } from "./components/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "games", Component: GamesPage },
      { path: "games/acrostix", Component: AcrostixPage },
      { path: "games/galactic-parcel-service", Component: GpsPage },
      { path: "games/match-fives", Component: MatchFivesPage },
      { path: "games/50-ball-drop", Component: BallDropPage },
      { path: "about", Component: AboutPage },
      { path: "shop", Component: ShopPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFound },
    ],
  },
]);