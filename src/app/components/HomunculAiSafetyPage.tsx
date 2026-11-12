import { LifeBuoy } from "lucide-react";
import { LegalShell, linkClass } from "./LegalDoc";

/** First HomunculAi version without the in-app chat (it displays the AI only). Set when the release number is known. */
const PROTOCOL_VERSION = "[version]";

export function HomunculAiSafetyPage() {
  return (
    <LegalShell
      title="Crisis resources and safety"
      metaTitle="HomunculAi Crisis Resources and Safety"
      description="Crisis resources, and how HomunculAi discloses that the AI you connect is not a human."
      path="/games/homunculai/safety"
      // Site convention: legal pages stay out of search results (as before v4).
      noIndex
      icon={<LifeBuoy className="w-4 h-4" />}
    >
      <div className="text-muted-foreground space-y-4">
        <p>
          If you are thinking about suicide or self-harm, call or text{" "}
          <a href="tel:988" className={linkClass}>988</a> in the US (988 Suicide and Crisis Lifeline,{" "}
          <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className={linkClass}>
            988lifeline.org
          </a>
          ), or contact local emergency services. In other countries, find a crisis line at{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
            findahelpline.com
          </a>
          .
        </p>
        <p>HomunculAi is for adults 18 and older. AI chatbots, including AI companions, may not be suitable for some minors.</p>
        <p>
          HomunculAi does not include an AI, and you do not write to your AI in HomunculAi. You talk to your
          AI in your own AI app, under that app’s safety features. HomunculAi only shows what your AI does:
          its avatar, its expressions, and its speech and thought bubbles. HomunculAi does not read, check,
          or store anything you write to your AI.
        </p>
        <p>To keep it clear that you are dealing with an AI, HomunculAi:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            shows “This is an AI agent, not a human.” in the avatar window, under the AI’s name, when an AI connects, at least every three hours while
            it stays connected, and whenever the AI writes that it is human;
          </li>
          <li>instructs connected AIs never to claim to be human;</li>
          <li>lists these crisis resources in the app (Settings → About → Crisis resources).</li>
        </ul>
        <p>These measures do not replace emergency services, a crisis line, or professional help.</p>
        <p>This applies to HomunculAi {PROTOCOL_VERSION} and later.</p>
      </div>
    </LegalShell>
  );
}
