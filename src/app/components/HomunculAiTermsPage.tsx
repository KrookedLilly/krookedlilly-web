import { FileText } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import terms from "../data/legal/terms.md?raw";

/** Effective date of Terms v4. Set to the release date of the build that ships it. */
const TERMS_EFFECTIVE = "[release date]";

export function HomunculAiTermsPage() {
  return (
    <LegalShell
      title="Terms of Use"
      metaTitle="HomunculAi Terms of Use"
      description="Terms of Use for HomunculAi, the desktop app that gives your AI a body: license, what your AI can do, local data, refunds, and consumer rights."
      path="/games/homunculai/terms"
      // Site convention: legal pages stay out of search results (as before v4).
      noIndex
      icon={<FileText className="w-4 h-4" />}
      subtitle={<>Version 4 &middot; Effective {TERMS_EFFECTIVE} &middot; Publisher: KrookedLilly, Spokane, Washington, USA</>}
    >
      <MarkdownSections md={terms} />
    </LegalShell>
  );
}
