import imgTrainYourBrain from "@/assets/matchfives-train.png";
import imgMatchNumbers from "@/assets/matchfives-match.png";
import imgPlayForHours from "@/assets/matchfives-play.png";
import imgStrategyPuzzle from "@/assets/matchfives-strategy.png";

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
