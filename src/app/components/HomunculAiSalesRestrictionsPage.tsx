import { Globe } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import restrictions from "../data/legal/sales-restrictions.md?raw";

export function HomunculAiSalesRestrictionsPage() {
  return (
    <LegalShell
      title="Download Restrictions"
      metaTitle="HomunculAi Download Restrictions"
      description="The regions and restricted parties where HomunculAi is not offered or supported."
      path="/apps/homunculai/sales-restrictions"
      // Site convention: legal pages stay out of search results (as before v4).
      noIndex
      icon={<Globe className="w-4 h-4" />}
    >
      <MarkdownSections md={restrictions} />
    </LegalShell>
  );
}
