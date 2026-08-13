import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Report Incorrect Info / Request a Takedown — Sussex Nightlife",
  description:
    "Flag a wrong listing or request your venue be corrected or removed.",
};

export default async function ReportPage(props: PageProps<"/report">) {
  const { event: eventTitle } = await props.searchParams;
  const reportedEvent = Array.isArray(eventTitle) ? eventTitle[0] : eventTitle;

  return (
    <LegalPage title="Report Incorrect Info / Request a Takedown">
      {reportedEvent ? (
        <LegalSection>
          <p className="rounded-lg border border-border bg-surface px-4 py-3 text-text-primary">
            Reporting: <strong>{reportedEvent}</strong> — describe the issue
            in your email below and we&apos;ll take it from there.
          </p>
        </LegalSection>
      ) : null}

      <LegalSection heading="If you're a visitor and something looks wrong">
        <p>
          Use the &ldquo;Report incorrect info&rdquo; link on any event page,
          or email{" "}
          <a
            href="mailto:hello@denkore.com"
            className="text-text-primary underline underline-offset-2 hover:text-accent"
          >
            hello@denkore.com
          </a>{" "}
          with the event name, venue, and what&apos;s wrong. We&apos;ll
          review it — flagged listings are hidden pending review, not left
          live while we investigate.
        </p>
      </LegalSection>

      <LegalSection heading="If you're a venue owner">
        <p>
          You can request that your venue be removed from Sussex Nightlife
          entirely, corrected, or updated — no reason required. Email{" "}
          <a
            href="mailto:hello@denkore.com"
            className="text-text-primary underline underline-offset-2 hover:text-accent"
          >
            hello@denkore.com
          </a>{" "}
          with your venue name and what you&apos;d like changed.
        </p>
      </LegalSection>

      <LegalSection heading="Response time">
        <p>Requests are handled within 48 hours.</p>
      </LegalSection>

      <LegalSection>
        <p className="text-text-faint italic">
          Since you&apos;re already reaching out — if you&apos;d rather have
          your events actively managed and promoted here instead of removed,
          ask about a Boosted listing.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
