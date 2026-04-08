import imgScreenshot1 from "@/assets/hekeyboards-screenshot-1.png";
import imgScreenshot2 from "@/assets/hekeyboards-screenshot-2.png";
import imgScreenshot3 from "@/assets/hekeyboards-screenshot-3.png";
import imgStoreCard from "@/assets/hekeyboards-card.png";
import imgPromo from "@/assets/hekeyboards-promo.png";
import imgIcon from "@/assets/hekeyboards-icon.png";

export interface HEKeyboardsScreenshot {
  id: string;
  src: string;
  label: string;
}

export const heKeyboardsScreenshots: HEKeyboardsScreenshot[] = [
  { id: "he-1", src: imgScreenshot1, label: "Analog Pedal & Steering Values" },
  { id: "he-2", src: imgScreenshot2, label: "Pressure Sensitive Steering" },
  { id: "he-3", src: imgScreenshot3, label: "Analog Throttle & Turning" },
];

export const heKeyboardsCardImage = imgStoreCard;
export const heKeyboardsPromoImage = imgPromo;
export const heKeyboardsIcon = imgIcon;
