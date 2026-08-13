import type { ReactNode } from "react";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

// Shared wrapper for the compliance pages (Privacy, Terms, Report/Takedown).
// Static, long-form content — no glow anywhere here, this isn't a
// live/status signal, it's a document.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <article className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
          {title}
        </h1>
        {updated ? (
          <p className="mt-2 text-xs text-text-faint">{updated}</p>
        ) : null}
        <div className="legal-content mt-8 flex flex-col gap-6 text-sm leading-relaxed text-text-muted">
          {children}
        </div>
      </article>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      {heading ? (
        <h2 className="text-base font-semibold text-text-primary">
          {heading}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
