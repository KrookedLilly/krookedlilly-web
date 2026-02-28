import imgGameplay1 from "@/assets/balldrop-gameplay1.png";
import imgGameplay2 from "@/assets/balldrop-gameplay2.png";
import imgGameplay3 from "@/assets/balldrop-gameplay3.png";
import imgGameplay4 from "@/assets/balldrop-gameplay4.png";
import imgHomePage from "@/assets/balldrop-home.png";
import imgResults from "@/assets/balldrop-results.png";

export interface BallDropScreenshot {
  src: string;
  label: string;
  id: string;
}

export const ballDropScreenshots: BallDropScreenshot[] = [
  { id: "gameplay1", src: imgGameplay1, label: "Neon Gameplay" },
  { id: "gameplay2", src: imgGameplay2, label: "Beer Pong Mode" },
  { id: "gameplay3", src: imgGameplay3, label: "Basketball Mode" },
  { id: "gameplay4", src: imgGameplay4, label: "Christmas Cosmetics" },
  { id: "home", src: imgHomePage, label: "Home Screen" },
  { id: "results", src: imgResults, label: "Score Screen" },
];

/** Card image for listings */
export const ballDropCardImage = imgHomePage;
