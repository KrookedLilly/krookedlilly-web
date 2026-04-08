import imgLogo from "figma:asset/bd601154b8e4d442bba1091b314f0c91c2818507.png";
import imgEditorCenter from "figma:asset/2c80d1559e8a8cd46aeb7989582a59502804d8e9.png";
import imgEditorZones from "figma:asset/6323574e7747d28fbb686793e25bb4c32345e6a5.png";
import imgDesktopPreview from "figma:asset/63ad5414f87936bdbb01927312b6439eeee9231e.png";
import imgDesktopOverview from "figma:asset/a50e861a525bf4bf8137c2083007d4b029623fc8.png";

export interface LunchBoxScreenshot {
  id: string;
  src: string;
  label: string;
}

export const lunchBoxScreenshots: LunchBoxScreenshot[] = [
  { id: "lb-editor-center", src: imgEditorCenter, label: "Layout Editor — Center Zone" },
  { id: "lb-editor-zones", src: imgEditorZones, label: "Layout Editor — Zone Splitting" },
  { id: "lb-desktop-preview", src: imgDesktopPreview, label: "Snapped Windows on Desktop" },
  { id: "lb-desktop-overview", src: imgDesktopOverview, label: "Multi-Monitor Layout Overview" },
];

export const lunchBoxLogo = imgLogo;
export const lunchBoxCardImage = imgDesktopPreview;
