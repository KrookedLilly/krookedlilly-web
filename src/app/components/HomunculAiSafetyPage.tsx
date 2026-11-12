import { LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import { LegalShell, linkClass } from "./LegalDoc";

/** First HomunculAi version that includes the crisis protocol. Set when the release number is known. */
const PROTOCOL_VERSION = "[version]";

/**
 * Yearly report (Oregon SB 1546 section 1(5); California SB 243): referrals provided in the previous calendar year
 * and the protocol. KrookedLilly receives no count, so each year's row says so. Add a row every December.
 */
const REPORT_YEARS = [2025];

export function HomunculAiSafetyPage() {
  return (
    <LegalShell
      title="Crisis resources and safety protocol"
      metaTitle="HomunculAi Crisis Resources and Safety Protocol"
      description="Crisis resources, how HomunculAi shows them in the chat, and how it discloses that your connected AI is not a human."
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
          HomunculAi does not include an AI. It shows the AI that you connect. To support people who
          may be at risk, HomunculAi:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            checks the messages you write in HomunculAi’s chat, on your computer, for phrases about
            suicide, self-harm, and eating disorders;
          </li>
          <li>
            when it finds one, shows crisis resources in the chat, with links to the 988 Suicide and
            Crisis Lifeline and findahelpline.com, and shows them again if the messages continue;
          </li>
          <li>
            instructs connected AIs never to claim to be human, to respond with care to messages about
            suicide, self-harm, or eating disorders, and never to describe methods of self-harm;
          </li>
          <li>
            shows “This is an AI agent, not a human.” when an AI connects, at least every three hours
            while it stays connected, and whenever the AI writes that it is human.
          </li>
        </ul>
        <p>
          HomunculAi does not tell KrookedLilly or your AI that a message matched. Your AI sees your
          messages as usual, because you send them to it.
        </p>
        <p>
          These checks can miss messages, and they can match messages that are not about these topics.
          They do not replace emergency services, a crisis line, or professional help.
        </p>
        <p>
          These checks run only on your computer, and HomunculAi keeps no record of them. HomunculAi does
          not send chat messages or usage data to KrookedLilly, so KrookedLilly does not know how many
          times crisis resources were shown. How HomunculAi handles this information is in the{" "}
          <Link to="/games/homunculai/health-data" className={linkClass}>
            Consumer Health Data Privacy Policy
          </Link>
          .
        </p>
        <p>This protocol is part of HomunculAi {PROTOCOL_VERSION} and later.</p>

        <h2 className="text-foreground text-lg pt-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
          Yearly report
        </h2>
        <ul className="list-disc pl-6 space-y-1.5">
          {REPORT_YEARS.map((y) => (
            <li key={y}>
              {y}: KrookedLilly provided no crisis referrals itself and received no count of the crisis
              resource notices that copies of HomunculAi showed on users’ computers. The protocol is
              described above.
            </li>
          ))}
        </ul>
      </div>
    </LegalShell>
  );
}
