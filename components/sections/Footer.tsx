import Link from "next/link";

// FR-5 disclaimer + FR-8 Denkore attribution, plus links to the compliance
// pages (§5.5 Privacy Policy / Terms of Use, §5.4 takedown). Low-key by
// design — no glow, no accent border, ordinary muted text. FR-8's optional
// About/Contact CTA is skipped — no About/Contact page exists yet.
export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 text-xs text-text-faint">
        <p>
          Event details are sourced from public venue postings. All events
          are subject to change — verify with the venue before attending.
        </p>
        <nav aria-label="Legal" className="flex gap-4">
          <Link href="/privacy" className="hover:text-text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-text-primary">
            Terms of Use
          </Link>
          <Link href="/report" className="hover:text-text-primary">
            Report an Issue
          </Link>
        </nav>
        <p>
          Built by{" "}
          <a
            href="https://denkore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary"
          >
            Denkore Group
          </a>
        </p>
      </div>
    </footer>
  );
}
