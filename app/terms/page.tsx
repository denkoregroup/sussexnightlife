import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Sussex Nightlife",
  description: "The terms that apply when you use Sussex Nightlife.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="Last updated: [DATE — set at actual launch]"
    >
      <LegalSection>
        <p>By using Sussex Nightlife, you agree to the following:</p>
      </LegalSection>

      <LegalSection heading="Accuracy">
        <p>
          Event details (times, cover charges, whether an event is happening
          at all) are sourced from public venue postings and are subject to
          change without notice. We do our best to keep listings current,
          but{" "}
          <strong className="text-text-primary">
            always confirm directly with the venue before making plans
            around a listing here.
          </strong>{" "}
          Each listing shows when it was last verified.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links">
        <p>
          Every event links to the venue&apos;s own website or event page as
          the original source. We are not responsible for the content,
          accuracy, or availability of third-party sites we link to.
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p>
          This site is provided &ldquo;as is.&rdquo; We make no guarantee
          that any listed event will occur as described, or that the site
          itself will be available without interruption.
        </p>
      </LegalSection>

      <LegalSection heading="Use of content">
        <p>
          Event listings on this site reflect factual information (dates,
          times, venue names, prices) gathered from public sources. This
          site does not claim ownership over venues&apos; own marketing
          materials, descriptions, or images, and does not reproduce them —
          only factual scheduling data.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms as the site evolves (for example, when
          new features like RSVP are added). Continued use of the site
          after an update means you accept the revised terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
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
