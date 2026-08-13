-- Phase 1a: initial schema for venues, events, analytics_events
-- Source of truth: SPEC.md §6 (Data Model)
--
-- NOT applied automatically by any tooling in this repo — paste this into the
-- Supabase SQL editor yourself.

-- ============================================================================
-- venues
-- ============================================================================
create table if not exists public.venues (
  venue_id        uuid primary key default gen_random_uuid(),
  name            text not null,
  town            text not null,
  region          text not null check (region in ('coastal', 'western_sussex')),
  address         text not null,
  source_type     text not null check (source_type in ('static_html', 'json_endpoint', 'manual')),
  source_url      text not null,
  link_status     text not null default 'active' check (link_status in ('active', 'broken', 'flagged')),
  last_checked_at timestamptz
);

create index if not exists venues_region_idx on public.venues (region);

-- ============================================================================
-- events
-- ============================================================================
create table if not exists public.events (
  event_id         uuid primary key default gen_random_uuid(),
  venue_id         uuid not null references public.venues (venue_id) on delete cascade,
  title            text not null,
  event_date       date not null,
  start_time       time not null,
  category         text not null check (
                     category in ('live_music', 'dj', 'karaoke', 'trivia', 'happy_hour', 'community')
                   ),
  cover_charge     numeric(6, 2),
  summary          text not null,
  source_url       text not null,
  recurrence_rule  text,
  last_verified_at timestamptz,
  status           text not null default 'pending_review' check (
                     status in ('published', 'pending_review', 'hidden')
                   )
);

-- FR-2 dedupe: match on venue_id + event_date + start_time before insert.
create unique index if not exists events_dedupe_key on public.events (venue_id, event_date, start_time);

-- FR-3 filtering (date / region-via-venue / category) and public-list scoping.
create index if not exists events_event_date_idx on public.events (event_date);
create index if not exists events_category_idx on public.events (category);
create index if not exists events_status_idx on public.events (status);

-- ============================================================================
-- analytics_events (Phase 1, anonymous)
-- ============================================================================
create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid references public.events (event_id) on delete set null,
  venue_id    uuid references public.venues (venue_id) on delete set null,
  event_type  text not null check (event_type in ('page_view', 'outbound_click')),
  occurred_at timestamptz not null default now()
);

-- ============================================================================
-- Row Level Security
-- ============================================================================
-- venues / events: public read, scoped to the rows that are actually meant to
-- be publicly visible (matches FR-4 link health + the events.status workflow).
-- analytics_events: RLS enabled with NO policies — fully locked down until a
-- later phase deliberately wires an anonymous-insert policy for real
-- client-side tracking. Do not add a public policy here without discussing
-- the actual write path first (§5.5 Data Privacy).

alter table public.venues enable row level security;
alter table public.events enable row level security;
alter table public.analytics_events enable row level security;

create policy "Public can read active venues"
  on public.venues
  for select
  using (link_status = 'active');

create policy "Public can read published events"
  on public.events
  for select
  using (status = 'published');
