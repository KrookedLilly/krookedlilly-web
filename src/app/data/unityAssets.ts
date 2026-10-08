import imgScreenManager from "@/assets/uitk-screen-manager-icon.png";
import imgTweenEngine from "@/assets/uitk-tween-engine-icon.png";
import imgResponsiveLayout from "@/assets/uitk-responsive-layout-icon.png";
import imgModalNotification from "@/assets/uitk-modal-notification-icon.png";
import imgFocusNavigation from "@/assets/uitk-focus-navigation-icon.png";
import imgDataBinding from "@/assets/uitk-data-binding-icon.png";
import imgThemeSwitcher from "@/assets/uitk-theme-switcher-icon.png";
import imgFormValidation from "@/assets/uitk-form-validation-icon.png";
import imgMotionImporter from "@/assets/uitk-motion-importer-icon.png";
import imgEcsBridge from "@/assets/uitk-ecs-bridge-icon.png";
import imgElementLibrary from "@/assets/uitk-element-library-icon.png";
import imgAudioFeedback from "@/assets/uitk-audio-feedback-icon.png";
import imgVisualStyling from "@/assets/uitk-visual-styling-icon.png";
import imgScreenManagerCover from "@/assets/uitk-screenmanager-cover.webp";
import imgTweenEngineCover from "@/assets/uitk-tweenengine-cover.webp";
import imgResponsiveLayoutCover from "@/assets/uitk-responsivelayout-cover.webp";
import imgModalNotificationCover from "@/assets/uitk-modalnotification-cover.webp";
import imgFocusNavigationCover from "@/assets/uitk-focusnavigation-cover.webp";
import imgDataBindingCover from "@/assets/uitk-databinding-cover.webp";
import imgThemeSwitcherCover from "@/assets/uitk-themeswitcher-cover.webp";
import imgFormValidationCover from "@/assets/uitk-formvalidation-cover.webp";
import imgMotionImporterCover from "@/assets/uitk-motionimporter-cover.webp";
import imgEcsBridgeCover from "@/assets/uitk-ecsbridge-cover.webp";
import imgElementLibraryCover from "@/assets/uitk-elementlibrary-cover.webp";
import imgAudioFeedbackCover from "@/assets/uitk-audiofeedback-cover.webp";
import imgVisualStylingCover from "@/assets/uitk-visualstyling-cover.webp";
import { UNITY_PUBLISHER_URL } from "./socials";

/**
 * Single source of truth for the Unity "UI Toolkit" asset suite.
 *
 * To add an asset: append one entry below. The catalog card's "N assets"
 * count, the suite-card logo cluster, every row on /tools/ui-toolkit, and the
 * page's structured data all derive from this array, so nothing else needs to
 * change. Icons and covers are the Asset Store images, saved locally.
 */
export interface UnityAsset {
  /** Display name; drop the "UI Toolkit:" prefix (it's implied by the suite). */
  name: string;
  /** URL-safe id, used as the row's anchor (/tools/ui-toolkit#<slug>). */
  slug: string;
  /** One line, shown as the row subtitle on the hub. */
  blurb: string;
  status: "Released" | "In Development" | "Coming Soon";
  /** Unity Asset Store listing URL. Opens in a new tab. */
  storeUrl: string;
  /** Optional square logo import. Falls back to a colored initial chip. */
  logo?: string;
  /** Asset Store cover art, shown when the row is expanded. */
  cover?: string;
  /** Key features, shown when the row is expanded. */
  features: string[];
}

/** Shared by every package in the suite. */
export const UNITY_REQUIREMENTS = "Unity 6 · Built-in, URP, and HDRP";

/** Publisher storefront for the "Browse all on the Unity Asset Store" button. */
export const PUBLISHER_URL = UNITY_PUBLISHER_URL;

const STORE = "https://assetstore.unity.com/packages";

export const unityToolkitAssets: UnityAsset[] = [
  {
    name: "Screen Manager",
    slug: "screen-manager",
    blurb: "Stack-based screen navigation: push, pop, replace, transitions, and async lifecycle hooks.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-screen-manager-120169`,
    logo: imgScreenManager,
    cover: imgScreenManagerCover,
    features: [
      "Push, pop, and replace screens on a back stack",
      "5 built-in transitions",
      "6 async lifecycle hooks",
      "Deep links and input blocking during transitions",
      "No dependencies",
    ],
  },
  {
    name: "Tween Engine",
    slug: "tween-engine",
    blurb: "Tweens from one line of C# or declarative USS @keyframes, with 32 easing curves and sequences.",
    status: "Released",
    storeUrl: `${STORE}/tools/utilities/ui-toolkit-tween-engine-365906`,
    logo: imgTweenEngine,
    cover: imgTweenEngineCover,
    features: [
      "One-line tweens from C#",
      "Declarative USS @keyframes, run by the same engine",
      "32 easing curves",
      "Sequences and presets",
      "Automatic cleanup",
    ],
  },
  {
    name: "Responsive Layout",
    slug: "responsive-layout",
    blurb: "Safe areas, breakpoints, orientation, and platform-aware USS classes from one component.",
    status: "Released",
    storeUrl: `${STORE}/tools/utilities/ui-toolkit-responsive-layout-366112`,
    logo: imgResponsiveLayout,
    cover: imgResponsiveLayoutCover,
    features: [
      "Safe-area handling plus a safe-area container element",
      "Breakpoint, orientation, and aspect-ratio classes",
      "Platform-aware USS classes from one component",
      "5 demo scenes",
    ],
  },
  {
    name: "Modal & Notification",
    slug: "modal-notification",
    blurb: "Async alerts, confirms, prompts, toasts, loading overlays, and popup menus with focus trapping.",
    status: "Released",
    storeUrl: `${STORE}/tools/utilities/ui-toolkit-modal-notification-366114`,
    logo: imgModalNotification,
    cover: imgModalNotificationCover,
    features: [
      "Async alert, confirm, prompt, choice, and custom dialogs",
      "Toast notifications",
      "Loading overlays and popup menus",
      "Focus trapping",
      "5 demo scenes",
    ],
  },
  {
    name: "Focus & Navigation",
    slug: "focus-navigation",
    blurb: "Gamepad and keyboard spatial navigation with focus groups, focus memory, and device-aware indicators.",
    status: "Released",
    storeUrl: `${STORE}/tools/utilities/ui-toolkit-focus-navigation-366108`,
    logo: imgFocusNavigation,
    cover: imgFocusNavigationCover,
    features: [
      "Gamepad and keyboard spatial navigation",
      "Focus groups with 4 boundary modes",
      "Focus memory",
      "Device-aware focus indicators",
      "6 demo scenes",
    ],
  },
  {
    name: "Data Binding",
    slug: "data-binding",
    blurb: "One-line bindings, reactive properties, async commands, and computed values on Unity 6 runtime binding.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-data-binding-380142`,
    logo: imgDataBinding,
    cover: imgDataBindingCover,
    features: [
      "One-line bindings on Unity 6 runtime binding",
      "Reactive properties and computed values",
      "Async commands",
      "Automatic cleanup and a diagnostics window",
      "4 demo scenes",
    ],
  },
  {
    name: "Theme Switcher",
    slug: "theme-switcher",
    blurb: "Runtime light, dark, and custom themes that can follow the OS, with crossfades and persistence.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-theme-switcher-380138`,
    logo: imgThemeSwitcher,
    cover: imgThemeSwitcherCover,
    features: [
      "Light, dark, and custom themes at runtime",
      "Single-token overrides",
      "Follows OS dark mode on Windows and macOS",
      "Crossfades and saved preferences",
      "3 demo scenes",
    ],
  },
  {
    name: "Form Validation",
    slug: "form-validation",
    blurb: "14 built-in rules, async checks, cross-field rules, and focus that jumps to the first invalid field.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-form-validation-380140`,
    logo: imgFormValidation,
    cover: imgFormValidationCover,
    features: [
      "14 built-in validation rules",
      "Async checks that ignore out-of-date results",
      "Cross-field rules with cycle detection",
      "Focus jumps to the first invalid field",
      "3 demo scenes",
    ],
  },
  {
    name: "Motion Importer",
    slug: "motion-importer",
    blurb: "Play Lottie files and sprite sheets inside UI Toolkit with a pure C# renderer.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-motion-importer-380144`,
    logo: imgMotionImporter,
    cover: imgMotionImporterCover,
    features: [
      "Lottie playback with a pure C# renderer",
      "Sprite sheet animation",
      "Reads Sprite Editor slices",
      "Tintable by Theme Switcher",
    ],
  },
  {
    name: "ECS Bridge",
    slug: "ecs-bridge",
    blurb: "Reactive bindings from DOTS/ECS data to UI Toolkit. Source-generated, no reflection, Burst-friendly.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-ecs-bridge-380146`,
    logo: imgEcsBridge,
    cover: imgEcsBridgeCover,
    features: [
      "Entity, singleton, and query bindings to UI",
      "Updates only when data changes",
      "Source-generated, no reflection",
      "Burst-friendly",
      "9 demo scenes",
    ],
  },
  {
    name: "Element Library",
    slug: "element-library",
    blurb: "35+ ready-made controls, from steppers and tabs to color pickers and mobile sheets.",
    status: "Released",
    storeUrl: `${STORE}/2d/gui/ui-toolkit-element-library-383820`,
    logo: imgElementLibrary,
    cover: imgElementLibraryCover,
    features: [
      "35+ ready-made controls",
      "Steppers, dropdowns, tabs, accordions, cards, and mobile sheets",
      "Color picker and tag input",
      "Keyboard and gamepad accessible, usable from UXML",
      "Full C# source",
    ],
  },
  {
    name: "Audio & Feedback",
    slug: "audio-feedback",
    blurb: "UI sounds, gamepad rumble, and mobile vibration, wired up once by USS class or element type.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-audio-feedback-384890`,
    logo: imgAudioFeedback,
    cover: imgAudioFeedbackCover,
    features: [
      "Feedback profiles per USS class or element type",
      "UI sounds on hover, click, focus, and toggle",
      "Gamepad rumble",
      "Mobile vibration",
    ],
  },
  {
    name: "Visual Styling",
    slug: "visual-styling",
    blurb: "Gradients, shadows, glows, shapes, and fade masks on any element, no shaders needed.",
    status: "Released",
    storeUrl: `${STORE}/tools/gui/ui-toolkit-visual-styling-384912`,
    logo: imgVisualStyling,
    cover: imgVisualStylingCover,
    features: [
      "Gradients, drop and inset shadows, and glows",
      "Shapes and fade masks",
      "No shaders needed",
      "Theme tokens and animatable properties",
      "One line per element",
    ],
  },
];

/** Count used by the catalog suite card badge and the hub header. */
export const unityToolkitCount = unityToolkitAssets.length;
