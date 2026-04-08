import imgScreenshot1 from "figma:asset/c3ba99629f7053b8fed8e68e1e49b4614aad05a9.png";
import imgScreenshot2 from "figma:asset/4a2e80d0d689fab41d9d8ee2de8613c6c378475a.png";
import imgScreenshot3 from "figma:asset/9e61371fb47d6fb2201b04f6bfd55fb63d2a6459.png";
import imgStoreCard from "figma:asset/9362c87bad5ab173663eb59565e2c7b1dca93283.png";
import imgPromo from "figma:asset/84ba996a60e754ebe2b6f595eaea39ba4808bce8.png";
import imgIcon from "figma:asset/18dd14e9d8cc0809f0282381a99cb9d52592d8ab.png";

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
