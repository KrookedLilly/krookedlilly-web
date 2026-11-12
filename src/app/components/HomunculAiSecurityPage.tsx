import { Lock } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import security from "../data/legal/security.md?raw";

export function HomunculAiSecurityPage() {
  return (
    <LegalShell
      title="Security Policy"
      metaTitle="HomunculAi Security Policy"
      description="How to report a security vulnerability in HomunculAi, which versions receive fixes, and what is in scope."
      path="/games/homunculai/security"
      // Site convention: legal pages stay out of search results (as before v4).
      noIndex
      icon={<Lock className="w-4 h-4" />}
    >
      <MarkdownSections md={security} startIndex={0} />
    </LegalShell>
  );
}
