import { ShieldCheck } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import privacy from "../data/legal/privacy.md?raw";

export function HomunculAiPrivacyPage() {
  return (
    <LegalShell
      title="Privacy Notice"
      metaTitle="HomunculAi Privacy Notice"
      description="What personal information KrookedLilly receives when you buy, use, or contact us about HomunculAi, and what we do with it."
      path="/games/homunculai/privacy"
      // Stays out of the sitemap until the owner fills the bracketed blanks.
      noIndex
      icon={<ShieldCheck className="w-4 h-4" />}
    >
      <MarkdownSections md={privacy} />
    </LegalShell>
  );
}
