import { LifeBuoy } from "lucide-react";
import { LegalShell, linkClass } from "./LegalDoc";

/** First HomunculAi version that includes the crisis protocol. Set when the release number is known. */
const PROTOCOL_VERSION = "[version]";

export function HomunculAiSafetyPage() {
  return (
    <LegalShell
      title="Crisis resources and safety protocol"
      metaTitle="HomunculAi Crisis Resources and Safety Protocol"
      description="Crisis resources, and how HomunculAi shows them in the chat and discloses that your connected AI is not a human."
      path="/games/homunculai/safety"
      icon={<LifeBuoy className="w-4 h-4" />}
    >
      <div className="text-muted-foreground space-y-4">
        <p>
          If you are thinking about suicide or self-harm, call or text{" "}
          <a href="tel:988" className={linkClass}>988</a> in the US (988 Suicide and Crisis
          Lifeline), or contact local emergency services. In other countries, find a crisis line at{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
            findahelpline.com
          </a>
          .
        </p>
        <p>
          HomunculAi does not include an AI. It shows the AI that you connect. To support people who
          may be at risk, HomunculAi:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            checks the messages you write in HomunculAi’s chat, on your computer, for phrases about
            suicide, self-harm, and eating disorders;
          </li>
          <li>
            when it finds one, shows crisis resources in the chat and tells the connected AI that the
            message may be about one of these topics, so that it can respond with care and share
            crisis resources;
          </li>
          <li>instructs connected AIs never to claim to be human and never to describe methods of self-harm;</li>
          <li>
            shows “This is an AI agent, not a human.” when an AI connects, at least every three hours
            while it stays connected, and whenever the AI writes that it is human.
          </li>
        </ul>
        <p>
          These checks can miss messages, and they can match messages that are not about these topics.
          They do not replace emergency services, a crisis line, or professional help.
        </p>
        <p>
          These checks run only on your computer. HomunculAi does not send chat messages or usage data
          to KrookedLilly, so KrookedLilly cannot count the crisis resource notices shown across all
          copies of HomunculAi. Each copy of HomunculAi shows the number of notices it displayed in the
          previous calendar year and in the current year (Settings → About → Crisis resources).
        </p>
        <p>This protocol is part of HomunculAi {PROTOCOL_VERSION} and later.</p>
      </div>
    </LegalShell>
  );
}
