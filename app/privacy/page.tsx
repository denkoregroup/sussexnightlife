import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Sussex Nightlife",
  description:
    "What Sussex Nightlife collects (and doesn't) when you visit the site.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Last updated: [DATE — set at actual launch]"
    >
      <LegalSection>
        <p>
          Sussex Nightlife is operated by Denkore Group LLC (&ldquo;we,&rdquo;
          &ldquo;us&rdquo;). This policy covers what happens when you visit
          this site.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          We collect anonymous, aggregate usage data only: which event and
          venue pages are viewed, and when a visitor clicks through to a
          venue&apos;s own website. This data is not tied to your name,
          email, or any other personal identifier — we don&apos;t have
          accounts, logins, or a way to connect this activity to you
          individually.
        </p>
      </LegalSection>

      <LegalSection heading="What we don't collect (yet)">
        <p>
          We do not currently collect email addresses, RSVPs, or any
          personal information from visitors. If that changes in the
          future, this policy will be updated first, and any new data
          collection will be clearly disclosed before it happens — not
          retroactively applied to this version of the site.
        </p>
      </LegalSection>

      <LegalSection heading="Event data">
        <p>
          The events listed on this site are sourced from venues&apos; own
          public postings (their websites, or direct submissions from venue
          owners). We link back to the original source on every listing. We
          don&apos;t control what those third-party sites do with your data
          if you click through — check their own privacy policy once
          you&apos;re there.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This site does not use cookies to identify or track individual
          visitors. Any analytics in use are aggregate-only (page views,
          click counts) with no per-visitor profile.
        </p>
      </LegalSection>

      <LegalSection heading="Your venue's listing">
        <p>
          If you&apos;re a venue owner and want your listing corrected or
          removed, see the{" "}
          <Link
            href="/report"
            className="text-text-primary underline underline-offset-2 hover:text-accent"
          >
            Report an Issue
          </Link>{" "}
          page — that request is handled the same way whether or not
          you&apos;re the one who originally submitted the listing.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy:{" "}
          <a
            href="mailto:hello@denkore.com"
            className="text-text-primary underline underline-offset-2 hover:text-accent"
          >
            hello@denkore.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
