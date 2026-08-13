// Mirrors SPEC.md §6 (Data Model) field-for-field, in snake_case to match the
// Postgres schema (supabase/migrations/20260812120000_initial_schema.sql)
// exactly. Keeping the same casing avoids a mapping layer that would just
// get rebuilt once a real supabase-js client (which returns snake_case
// columns) is wired in a later phase.

export type Region = "coastal" | "western_sussex";

export type VenueSourceType = "static_html" | "json_endpoint" | "manual";

export type LinkStatus = "active" | "broken" | "flagged";

export type EventCategory =
  | "live_music"
  | "dj"
  | "karaoke"
  | "trivia"
  | "happy_hour"
  | "community";

export type EventStatus = "published" | "pending_review" | "hidden";

export type AnalyticsEventType = "page_view" | "outbound_click";

export interface Venue {
  venue_id: string;
  name: string;
  town: string;
  region: Region;
  address: string;
  source_type: VenueSourceType;
  source_url: string;
  link_status: LinkStatus;
  last_checked_at: string | null;
}

export interface Event {
  event_id: string;
  venue_id: string;
  title: string;
  event_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  category: EventCategory;
  cover_charge: number | null;
  summary: string;
  source_url: string;
  recurrence_rule: string | null;
  last_verified_at: string | null;
  status: EventStatus;
}

export interface AnalyticsEvent {
  id: string;
  event_id: string | null;
  venue_id: string | null;
  event_type: AnalyticsEventType;
  occurred_at: string;
}
