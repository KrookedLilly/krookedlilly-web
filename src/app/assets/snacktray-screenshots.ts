import imgLogo from "@/assets/snacktray-logo.png";
import imgEditorCenter from "@/assets/snacktray-editor-center.png";
import imgEditorZones from "@/assets/snacktray-editor-zones.png";
import imgDesktopPreview from "@/assets/snacktray-desktop-preview.png";
import imgDesktopOverview from "@/assets/snacktray-desktop-overview.png";

export interface SnackTrayScreenshot {
  id: string;
  src: string;
  label: string;
}

export const snackTrayScreenshots: SnackTrayScreenshot[] = [
  { id: "st-editor-center", src: imgEditorCenter, label: "Layout Editor: Center Zone" },
  { id: "st-editor-zones", src: imgEditorZones, label: "Layout Editor: Zone Splitting" },
  { id: "st-desktop-preview", src: imgDesktopPreview, label: "Snapped Windows on Desktop" },
  { id: "st-desktop-overview", src: imgDesktopOverview, label: "Multi-Monitor Layout Overview" },
];

export const snackTrayLogo = imgLogo;
export const snackTrayCardImage = imgDesktopPreview;
