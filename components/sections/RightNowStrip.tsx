import type { Venue } from "@/lib/types";

// CSS-only horizontal scroll (overflow-x + scroll-snap) — no carousel
// library, no JS-driven motion. Every chip's dot glows: this strip's whole
// premise is "what's live right now," so the dot itself is the live/status
// signal the glow-restraint rule carves out.
export function RightNowStrip({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface/50 py-4">
      <div className="mx-auto max-w-5xl px-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-faint">
          Right now
        </p>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {venues.map((venue) => (
            <div
              key={venue.venue_id}
              className="flex shrink-0 snap-start items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm"
            >
              <span
                aria-hidden
                className="glow h-2 w-2 shrink-0 rounded-full bg-accent"
              />
              <span className="text-text-primary">{venue.name}</span>
              <span className="text-text-faint">· {venue.town}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
