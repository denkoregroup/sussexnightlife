import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Event, Venue } from "@/lib/types";

const CATEGORY_LABEL: Record<Event["category"], string> = {
  live_music: "Live Music",
  dj: "DJ",
  karaoke: "Karaoke",
  trivia: "Trivia",
  happy_hour: "Happy Hour",
  community: "Community",
};

export function EventList({
  events,
  venues,
}: {
  events: Event[];
  venues: Venue[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <ul className="flex flex-col gap-3">
        {events.map((event) => {
          const venue = venues.find((v) => v.venue_id === event.venue_id);
          const isLive = isEventLiveToday(event.event_date);
          return (
            <li
              key={event.event_id}
              className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-text-faint">
                  <time dateTime={`${event.event_date}T${event.start_time}`}>
                    {formatEventTime(event.event_date, event.start_time)}
                  </time>
                  <span aria-hidden>·</span>
                  <span className="text-text-muted">
                    {venue?.name ?? "Unknown venue"}
                    {venue?.town ? ` · ${venue.town}` : null}
                  </span>
                </div>
                <p className="text-sm text-text-primary">{event.title}</p>
                <p className="text-sm text-text-muted">{event.summary}</p>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-medium",
                    isLive
                      ? "glow border-accent/40 bg-accent/10 text-accent"
                      : "border-border bg-background text-text-muted"
                  )}
                >
                  {CATEGORY_LABEL[event.category]}
                </span>
                <a
                  href={event.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-text-faint hover:text-text-primary"
                >
                  Source: {venue?.name ?? "venue"}
                  <ExternalLink aria-hidden className="size-3" />
                </a>
                <Link
                  href={`/report?event=${encodeURIComponent(event.title)}`}
                  className="text-xs text-text-faint underline underline-offset-2 hover:text-text-primary"
                >
                  Report incorrect info
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// TODO(Phase 3+): This treats "live" as "event is today." Once ingestion is
// real, add an `end_time` column to `events` (see spec.md §6) and switch this
// to a true timestamp comparison (start_time <= now <= end_time).
function isEventLiveToday(eventDate: string): boolean {
  // "Today" must be computed in America/New_York, not server/UTC default —
  // Vercel functions default to UTC, which would misclassify events near
  // midnight Eastern. en-CA formats as YYYY-MM-DD, matching event_date.
  const todayInEastern = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return eventDate === todayInEastern;
}

function formatEventTime(date: string, time: string) {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const dateLabel = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${dateLabel}, ${hour12}:${minuteStr.padStart(2, "0")} ${period}`;
}
