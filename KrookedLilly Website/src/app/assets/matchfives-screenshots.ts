import imgTrainYourBrain from "figma:asset/f8683f5da9aa5461717d17e69b244ee690693e36.png";
import imgMatchNumbers from "figma:asset/3f450c4f5a83d3e44163430eb636b2a5acc68426.png";
import imgPlayForHours from "figma:asset/2dc57496106098452122d8bd84b0ca493a1c62ce.png";
import imgStrategyPuzzle from "figma:asset/593dd656578beb180df23d3ba401787a3666d6e0.png";

export interface MatchFivesScreenshot {
  src: string;
  label: string;
  id: string;
}

export const matchFivesScreenshots: MatchFivesScreenshot[] = [
  { id: "train", src: imgTrainYourBrain, label: "Train Your Brain" },
  { id: "match", src: imgMatchNumbers, label: "Match Numbers" },
  { id: "play", src: imgPlayForHours, label: "Play For Hours" },
  { id: "strategy", src: imgStrategyPuzzle, label: "Strategy Puzzle" },
];

/** Card image for listings */
export const matchFivesCardImage = imgTrainYourBrain;
