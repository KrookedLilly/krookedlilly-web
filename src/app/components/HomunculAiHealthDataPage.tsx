import { HeartPulse } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import healthData from "../data/legal/health-data.md?raw";

/** Washington My Health My Data Act (RCW 19.373.020): the consumer health data privacy policy, linked from the HomunculAi page. */
export function HomunculAiHealthDataPage() {
  return (
    <LegalShell
      title="Consumer Health Data Privacy Policy"
      metaTitle="HomunculAi Consumer Health Data Privacy Policy"
      description="How HomunculAi handles the only health-related information it creates: on-device crisis-phrase checks and a yearly count, kept on your computer."
      path="/games/homunculai/health-data"
      // Site convention: legal pages stay out of search results.
      noIndex
      icon={<HeartPulse className="w-4 h-4" />}
    >
      <MarkdownSections md={healthData} />
    </LegalShell>
  );
}
