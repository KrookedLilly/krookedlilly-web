import { BookOpen } from "lucide-react";
import { LegalShell, MarkdownSections } from "./LegalDoc";
import aboutAi from "../data/legal/about-ai.md?raw";

// The URL keeps its old name (/what-is-ai) because older versions of the app may link to it.
export function HomunculAiWhatIsAIPage() {
  return (
    <LegalShell
      title="About AI"
      metaTitle="HomunculAi: About AI"
      description="What AI is, what it can and cannot do, and how it works with HomunculAi."
      path="/games/homunculai/what-is-ai"
      icon={<BookOpen className="w-4 h-4" />}
      subtitle={<em>What AI is, what it can and cannot do, and how it works with HomunculAi.</em>}
    >
      <MarkdownSections md={aboutAi} startIndex={0} />
    </LegalShell>
  );
}
