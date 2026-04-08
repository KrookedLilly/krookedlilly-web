import imgGameplay1 from "figma:asset/46118e855915fea58bd6903ee7d1ad8636ad4de3.png";
import imgGameplay2 from "figma:asset/4ae418881c400dfaf93bf89181a59cf8da920340.png";
import imgGameplay3 from "figma:asset/0e38c312a3beba4a29dafeaf51954f157a6a8faa.png";
import imgGameplay4 from "figma:asset/f8d1721101a4385c53a211f3f128ae06f8ab3be8.png";
import imgHomePage from "figma:asset/b6ab974503e2c0e7c9a79228e99febfd43b9fb24.png";
import imgResults from "figma:asset/8bffda3070624cd06b0e95f2afb3c75a4b3a588d.png";

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
