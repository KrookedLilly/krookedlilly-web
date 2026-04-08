import imgLogo from "@/assets/lunchbox-logo.png";
import imgEditorCenter from "@/assets/lunchbox-editor-center.png";
import imgEditorZones from "@/assets/lunchbox-editor-zones.png";
import imgDesktopPreview from "@/assets/lunchbox-desktop-preview.png";
import imgDesktopOverview from "@/assets/lunchbox-desktop-overview.png";

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
