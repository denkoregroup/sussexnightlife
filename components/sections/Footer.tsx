// FR-5 disclaimer + FR-8 Denkore attribution. Low-key by design — no glow,
// no accent border, ordinary muted text. FR-8's optional About/Contact CTA
// and §5.3's "Report incorrect info" / last_verified_at display are skipped
// here: no About/Contact or event-detail page exists yet in this pass.
export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 text-xs text-text-faint">
        <p>
          Event details are sourced from public venue postings. All events
          are subject to change — verify with the venue before attending.
        </p>
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
