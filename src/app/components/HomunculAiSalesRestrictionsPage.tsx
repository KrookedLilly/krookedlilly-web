import { Globe } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import restrictions from "../data/legal/sales-restrictions.md?raw";

export function HomunculAiSalesRestrictionsPage() {
  return (
    <LegalShell
      title="Sales Restrictions"
      metaTitle="HomunculAi Sales Restrictions"
      description="The regions and restricted parties where HomunculAi is not sold, licensed, or supported."
      path="/games/homunculai/sales-restrictions"
      icon={<Globe className="w-4 h-4" />}
    >
      <MarkdownSections md={restrictions} />
    </LegalShell>
  );
}
