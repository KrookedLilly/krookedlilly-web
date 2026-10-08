import { useState } from "react";

/** The site's one Formspree form. Submissions are emailed to the account owner. */
const FORMSPREE_URL = "https://formspree.io/f/mzdkwgka";

export type FormStatus = "idle" | "sending" | "sent" | "error";

/**
 * Posts to Formspree and tracks whether it actually went through.
 *
 * Every submission carries a `source` field and a `_subject` (Formspree uses
 * it as the notification email's subject line) so the Shop, footer, and
 * Contact forms can be told apart in the inbox. Status only becomes "sent"
 * once Formspree confirms receipt; network or server failures become "error".
 */
export function useFormspree(source: string) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const submit = async (fields: Record<string, string>, subject: string): Promise<boolean> => {
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, source, _subject: subject }),
      });
      setStatus(res.ok ? "sent" : "error");
      return res.ok;
    } catch {
      setStatus("error");
      return false;
    }
  };

  return { status, submit, reset: () => setStatus("idle") };
}

/** Shown under a form when a submission fails. */
export const FORM_ERROR_MESSAGE =
  "Something went wrong and that didn't send. Try again, or email us at support@krookedlilly.com.";
