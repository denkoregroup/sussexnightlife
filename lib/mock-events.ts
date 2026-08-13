import type { Event, Venue } from "@/lib/types";

// Mock data only — no Supabase reads yet (see app/page.tsx).
//
// Coastal venue names are real, public businesses; Western Sussex venue
// names are invented placeholders. Regardless of region, every
// `source_url` below uses a fake `.example.com` subdomain — no source is
// "real" until it clears the §5.1 Source Approval Matrix, and mock data
// shouldn't imply otherwise by pointing at a venue's actual live domain.
//
// `recurrence_rule` grammar is unspecified by SPEC.md §6 — the plain strings
// used below (e.g. "weekly:thursday") are provisional and should be
// formalized once an ingestion/recurrence-expansion job actually needs to
// parse them.

export const mockVenues: Venue[] = [
  // Coastal Corridor (Rehoboth, Dewey, Lewes) — real venue names
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000001",
    name: "The Starboard",
    town: "Dewey Beach",
    region: "coastal",
    address: "2009 Highway One, Dewey Beach, DE",
    source_type: "static_html",
    source_url: "https://starboard.example.com",
    link_status: "active",
    last_checked_at: "2026-08-12T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000002",
    name: "Bottle & Cork",
    town: "Dewey Beach",
    region: "coastal",
    address: "1807 Highway One, Dewey Beach, DE",
    source_type: "static_html",
    source_url: "https://bottleandcork.example.com",
    link_status: "active",
    last_checked_at: "2026-08-12T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000003",
    name: "Rusty Rudder",
    town: "Dewey Beach",
    region: "coastal",
    address: "113 Dickinson St, Dewey Beach, DE",
    source_type: "static_html",
    source_url: "https://rustyrudder.example.com",
    link_status: "active",
    last_checked_at: "2026-08-11T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000004",
    name: "Dogfish Head Brewings & Eats",
    town: "Rehoboth Beach",
    region: "coastal",
    address: "320 Rehoboth Ave, Rehoboth Beach, DE",
    source_type: "json_endpoint",
    source_url: "https://dogfishhead.example.com",
    link_status: "active",
    last_checked_at: "2026-08-12T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000005",
    name: "Crooked Hammock Brewery",
    town: "Lewes",
    region: "coastal",
    address: "16739 Coastal Highway, Lewes, DE",
    source_type: "static_html",
    source_url: "https://crookedhammock.example.com",
    link_status: "active",
    last_checked_at: "2026-08-11T09:00:00Z",
  },
  // Western Sussex (Seaford, Laurel, Delmar, Bridgeville) — placeholder venues
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000006",
    name: "Seaford Tap House",
    town: "Seaford",
    region: "western_sussex",
    address: "412 High St, Seaford, DE",
    source_type: "manual",
    source_url: "https://seafordtaphouse.example.com",
    link_status: "active",
    last_checked_at: "2026-08-10T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000007",
    name: "Laurel Landing Bar & Grill",
    town: "Laurel",
    region: "western_sussex",
    address: "108 W 6th St, Laurel, DE",
    source_type: "manual",
    source_url: "https://laurellanding.example.com",
    link_status: "active",
    last_checked_at: "2026-08-10T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000008",
    name: "Delmar Depot Taproom",
    town: "Delmar",
    region: "western_sussex",
    address: "37 Grove St, Delmar, DE",
    source_type: "manual",
    source_url: "https://delmardepot.example.com",
    link_status: "active",
    last_checked_at: "2026-08-09T09:00:00Z",
  },
  {
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000009",
    name: "Bridgeville Brew Co.",
    town: "Bridgeville",
    region: "western_sussex",
    address: "215 Market St, Bridgeville, DE",
    source_type: "manual",
    source_url: "https://bridgevillebrew.example.com",
    link_status: "active",
    last_checked_at: "2026-08-09T09:00:00Z",
  },
];

export const mockEvents: Event[] = [
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000001",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000001", // The Starboard
    title: "DJ Set on the Deck",
    event_date: "2026-08-13",
    start_time: "21:00",
    category: "dj",
    cover_charge: null,
    summary: "DJ set on the outdoor deck, open to all ages until 9pm.",
    source_url: "https://starboard.example.com/events",
    recurrence_rule: null,
    last_verified_at: "2026-08-12T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000002",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000002", // Bottle & Cork
    title: "Live Band: The Tidewater Sound",
    event_date: "2026-08-14",
    start_time: "20:00",
    category: "live_music",
    cover_charge: 10,
    summary: "Local rock/beach cover band, main stage, doors at 7pm.",
    source_url: "https://bottleandcork.example.com/calendar",
    recurrence_rule: null,
    last_verified_at: "2026-08-12T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000003",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000003", // Rusty Rudder
    title: "Sunset Happy Hour",
    event_date: "2026-08-13",
    start_time: "16:00",
    category: "happy_hour",
    cover_charge: null,
    summary: "Discounted drinks on the deck, riverside view, no cover.",
    source_url: "https://rustyrudder.example.com/happy-hour",
    recurrence_rule: "daily",
    last_verified_at: "2026-08-11T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000004",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000004", // Dogfish Head
    title: "Weekly Trivia Night",
    event_date: "2026-08-15",
    start_time: "19:00",
    category: "trivia",
    cover_charge: null,
    summary: "Team trivia in the brewpub, prizes for top three teams.",
    source_url: "https://dogfishhead.example.com/rehoboth/events",
    recurrence_rule: "weekly:thursday",
    last_verified_at: "2026-08-12T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000005",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000005", // Crooked Hammock
    title: "Karaoke Night",
    event_date: "2026-08-16",
    start_time: "20:00",
    category: "karaoke",
    cover_charge: null,
    summary: "Karaoke in the taproom, sign-ups start at 7:30pm.",
    source_url: "https://crookedhammock.example.com/lewes/events",
    recurrence_rule: null,
    last_verified_at: "2026-08-11T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000006",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000006", // Seaford Tap House
    title: "Acoustic Night with Sam Wexler",
    event_date: "2026-08-14",
    start_time: "19:30",
    category: "live_music",
    cover_charge: 5,
    summary: "Solo acoustic set, indoor stage, seating available.",
    source_url: "https://seafordtaphouse.example.com/events",
    recurrence_rule: null,
    last_verified_at: "2026-08-10T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000007",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000007", // Laurel Landing
    title: "Weekly Trivia Night",
    event_date: "2026-08-14",
    start_time: "18:30",
    category: "trivia",
    cover_charge: null,
    summary: "Team trivia in the back room, free to enter.",
    source_url: "https://laurellanding.example.com/events",
    recurrence_rule: "weekly:friday",
    last_verified_at: "2026-08-10T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000008",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000008", // Delmar Depot Taproom
    title: "DJ Night",
    event_date: "2026-08-15",
    start_time: "21:00",
    category: "dj",
    cover_charge: null,
    summary: "DJ set in the taproom, 21+ after 9pm.",
    source_url: "https://delmardepot.example.com/events",
    recurrence_rule: null,
    last_verified_at: "2026-08-09T09:00:00Z",
    status: "published",
  },
  {
    event_id: "3c9f2a10-0000-4000-8000-000000000009",
    venue_id: "8f14e45f-ceea-4d1e-9d0a-000000000009", // Bridgeville Brew Co.
    title: "Community Chili Cook-Off",
    event_date: "2026-08-17",
    start_time: "12:00",
    category: "community",
    cover_charge: null,
    summary: "Local chili cook-off and tasting, family friendly, all ages.",
    source_url: "https://bridgevillebrew.example.com/events",
    recurrence_rule: null,
    last_verified_at: "2026-08-09T09:00:00Z",
    status: "published",
  },
];
