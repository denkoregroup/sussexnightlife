# Sussex County Events Hub — MVP Spec

**Status:** Draft v0.1 — Spec-Driven Development **Owner:** David Clark / Denkore Group LLC **Cast Pipeline Run:** TBD (assign once build starts)

## 1\. Problem Statement

Nightlife and community event info across Sussex County, DE is fragmented across venue websites, Facebook Pages, and Instagram. No single source lets a user (tourist or local) answer "what's happening tonight?" in one search. This gap is worse in Western Sussex (Seaford, Laurel, Delmar, Bridgeville) than in the beach corridor, where at least fragmented directories exist.

**Two outcomes this product needs to deliver, in priority order:**

1.  A ranking, traffic-generating public utility that answers "events near me" better than anything currently indexed.
2.  A dataset and analytics story David can bring into a room with a local business owner to sell digital services — this is the actual monetization path, not ads.

## 1.1 Competitive Landscape — Confirmed Gap

**Finding (validated):** [visitsoutherndelaware.com/events](https://visitsoutherndelaware.com/events?date_label=all&location=seaford&page=1), built by D3 Corp (the same agency already flagged as low-threat competition in Denkore's market strategy — institutional, template-driven, out of price range for small local venues), returns effectively **zero live events for Seaford** when filtered — just the page shell and an "add your event" submission form. Searching "is anything going on in Seaford/Laurel this weekend" surfaces this page anyway, meaning it's absorbing search intent it can't actually satisfy.

**What this confirms:**

  - The Western Sussex gap isn't hypothetical — the county's own tourism board site can't fill it either, because it depends on manual self-submission from venues that don't have the habit of submitting
  - There's a real opening to outrank an existing, higher-authority .com simply by having *actual content* behind the same search queries
  - Two patterns worth borrowing directly: their disclaimer language ("All events are subject to change. Please contact the event organizer to confirm details.") and their real, published Privacy Policy / Terms of Service pages — both cheap wins for legitimacy and both already in this spec's compliance section

## 2\. Explicit Non-Goals (MVP)

Cutting these keeps the MVP inside the \<10hrs/week budget and avoids the highest-risk compliance surface area on day one.

  - ❌ No Facebook/Instagram scraping in MVP (ToS + CFAA risk — see §5.1)
  - ❌ No RSVP or email capture in MVP (defers CAN-SPAM compliance obligations)
  - ❌ No paid ticketing
  - ❌ No user accounts / login
  - ❌ No native mobile app
  - ❌ No AI-generated event descriptions (avoids misinformation liability — display only what was scraped/verified)

## 3\. Users & Core Use Cases

|  |  |
| :-: | :-: |
| \*\*User\*\* | \*\*Use Case\*\* |
| Tourist / weekend visitor | "What's happening in Rehoboth/Dewey tonight?" — fast, mobile, no clutter |
| Local resident (Western Sussex) | "Is anything going on in Seaford/Laurel this weekend?" — currently near-zero digital coverage |
| David (business dev) | Pull traffic/click data per venue to open a B2B sales conversation |
| Venue owner (future) | Eventually: claim their listing, get a "Boosted" placement (Phase 2 monetization) |

## 4\. Functional Requirements — MVP

**FR-1: Event Aggregation (Ingestion)**

  - Daily scheduled job (off-peak, e.g. 3am) pulls from an approved source list (§5)
  - Each source has a documented ingestion method: static HTML parse, JSON endpoint, or manual entry
  - Extracted fields limited to factual data only (see data model, §6) — never full descriptions or images copied verbatim

**FR-2: Deduplication**

  - Match on venue\_id + event\_date + start\_time before insert
  - Recurring weekly events (e.g. "Trivia Night") get a recurrence\_rule instead of duplicate rows

**FR-3: Public Event Display**

  - Master calendar view (list + card grid)
  - Filter by: date, town/region, category (Live Music, DJ, Karaoke, Trivia, Happy Hour, Community/Festival)
  - Individual event page with: title, venue, date/time, short factual summary (≤2 sentences, no copied marketing copy), cover charge if known, single verified outbound link to source

**FR-4: Link Health Monitoring**

  - Automated daily check on every source\_url before it's rendered live
  - Any link returning 4xx/5xx, or flagged by a safe-browsing check, is auto-hidden pending manual review
  - This directly solves the "suspicious dead link" failure mode you identified in DeweyBeachLife.com

**FR-5: Source Attribution**

  - Every event page displays "Source: \[Venue Name\]" with the outbound link
  - Footer disclaimer: event details sourced from public venue postings; verify with venue before attending

**FR-6: Regional Split**

  - Two geographic zones from day one, structurally: **Coastal Corridor** (Rehoboth, Dewey, Lewes) and **Western Sussex** (Seaford, Laurel, Delmar, Bridgeville)
  - Zones share the same schema/pipeline but are marketed and pitched separately per your existing market strategy

**FR-7: Basic Analytics (for the B2B pitch)**

  - Page views per event and per venue
  - Outbound click-throughs per venue
  - No PII collected in MVP (no accounts, no RSVP) — analytics stays anonymous/aggregate

**FR-8: Denkore Attribution & Cross-Promotion**

  - Footer credit: "Built by Denkore Group" linking to denkore.com — same low-key pattern as the "Website by D3" credit on the competitor site (§1.1), which is a normal, expected convention, not a hard sell
  - Optional subtle CTA on an About/Contact page: something like "Need something like this for your business? →" linking to denkore.com — kept understated so the hub reads as a public utility first, not a lead-gen funnel
  - This is a secondary benefit, not the product's purpose — don't let it shape UX decisions on the events side

## 5\. Compliance & Legal Framework

This is the section that actually determines what's buildable. Treat every source as **guilty until reviewed** — don't scrape first and check later.

### 5.1 Source Approval Matrix (required before any source is added)

For every venue/site, document these before writing a scraper against it:

|  |  |
| :-: | :-: |
| \*\*Check\*\* | \*\*Pass Criteria\*\* |
| robots.txt reviewed | Path is not disallowed for scraping |
| Terms of Service reviewed | No explicit prohibition on automated access/scraping |
| Data extracted is factual only | Dates, times, titles, prices — not copied prose or images |
| Rate limit respected | Max 1 request per source per day, staggered, not concurrent |
| Attribution present | Outbound link + venue name shown on every listing |

**Sources that fail this and are excluded from MVP:**

  - **Facebook / Instagram** — ToS explicitly prohibits automated scraping. This is not a gray area; Meta has successfully enforced this in court (hiQ v. LinkedIn doesn't apply the same way here — Meta's terms are stricter and have been litigated separately). If a venue's *only* event source is Facebook, that venue is a **Phase 2 candidate**, ingested only via the official **Facebook Graph API** with the page owner's explicit permission — which conveniently doubles as your foot-in-the-door B2B conversation.
  - **Any site requiring login to view events** — out of scope entirely.

**Sources cleared for MVP:**

  - Static HTML venue sites and town/municipal pages (Chamber of Commerce, town calendars)
  - Squarespace/Wix sites where a public JSON endpoint exists (network tab inspection, no auth bypass) — this is fetching data the site itself serves publicly, not circumventing any protection
  - Manually-entered events from direct outreach (email/text from venue owner) — zero legal risk, and it's a relationship-building excuse to talk to Western Sussex businesses early

### 5.2 Copyright

  - Never reproduce venue descriptions, flyers, or photos. Factual data (date, time, venue name, price) is not copyrightable — original creative text and images are.
  - If a venue provides its own image directly (Phase 2, opt-in), get explicit written permission first.

### 5.3 Defamation / Accuracy Liability

  - Every listing carries a "details may change — confirm with venue" disclaimer
  - Store and display last\_verified\_at timestamp so stale data is visible, not implied to be current
  - Provide a visible "Report incorrect info" link on every event page

### 5.4 Takedown / Opt-Out Mechanism

  - Any venue can request removal from the index — required even though the underlying data is public/factual, because it removes friction and legal ambiguity, and it's also a sales touchpoint ("since you're here — want a Boosted listing instead?")
  - Simple form or email, documented SLA (e.g., removed within 48 hours)

### 5.5 Data Privacy

**Decided: Privacy Policy and Terms of Use are published at MVP launch, not deferred.** Even though RSVP/email is out of scope until MVP (scrape → review → live post) is working end-to-end, the site still needs real, accurate policy pages from day one because:

  - It's a legitimacy signal (see §1.1 — even D3's thin site has these)
  - It's the natural home for the takedown/opt-out mechanism (§5.4) and link-report flow
  - It sets expectations before any future data collection begins, rather than retrofitting trust after the fact

**MVP-scope Privacy Policy covers only what's actually true at launch:**

  - No accounts, no login, no PII collected from visitors
  - Anonymous, aggregate analytics only (page views, outbound clicks — FR-7)
  - Publicly-sourced event data, with attribution and a correction/removal process

**Deferred until RSVP/email actually ships (Phase 3):**

  - CAN-SPAM Act compliance (physical mailing address in footer, one-click unsubscribe, no misleading subject lines)
  - RSVP PII storage policy (Supabase RLS, retention window, e.g. purge 12 months post-event)
  - Privacy Policy gets a real revision at that point — not written speculatively now for a feature that doesn't exist yet

### 5.6 Age-Sensitivity (Nightlife/Alcohol Context)

  - The site indexes public event info, not alcohol sales — low regulatory risk, but keep marketing language factual/neutral rather than promotional ("Live music at X" not "Get wasted at X")
  - No targeting or design choices aimed at minors; this is a general-audience local information site, which keeps it outside COPPA/alcohol-marketing scrutiny

## 6. Data Model

```
venues
- venue_id (UUID, PK)
- name
- town
- region (coastal | western_sussex)
- address
- source_type (static_html | json_endpoint | manual)
- source_url
- link_status (active | broken | flagged)
- last_checked_at

events
- event_id (UUID, PK)
- venue_id (FK)
- title
- event_date
- start_time
- category (live_music | dj | karaoke | trivia | happy_hour | community)
- cover_charge (nullable numeric)
- summary (≤2 sentences, factual, written/edited by scraper+human review — never copied verbatim)
- source_url
- recurrence_rule (nullable)
- last_verified_at
- status (published | pending_review | hidden)

analytics_events (Phase 1, anonymous)
- id
- event_id (FK, nullable)
- venue_id (FK, nullable)
- event_type (page_view | outbound_click)
- occurred_at
```

## 7\. Technical Architecture (MVP)

Consistent with your existing stack — no new tooling to learn.

\[Approved Sources\]

     │  (static parse / JSON endpoint / manual entry)

     ▼

\[Ingestion Job — Node.js, daily cron\]

     │  dedupe + link health check

     ▼

\[Supabase Postgres\]

     │

     ▼

\[Next.js 16 frontend — Vercel\]

     │

     ▼

\[Public site — no auth, no PII in MVP\]

  - **Frontend:** Next.js 16, Tailwind v4 — reuse Denkore section-component patterns, not Tailark
  - **DB:** Supabase Postgres (matches Barzini Publishing stack, keeps your toolchain consistent)
  - **Ingestion:** Node.js scripts, scheduled via Vercel Cron or a lightweight external scheduler
  - **Hosting cost:** effectively $0/month on free tiers at MVP scale

## 8\. Phased Roadmap

### Phase 0 — Spec & Compliance Foundation (this document + source audit)

  - Finalize this spec
  - Run the Source Approval Matrix (§5.1) against the first \~15–20 Coastal Corridor venues
  - Write and publish Privacy Policy + Terms of Use, MVP-scoped per §5.5 (required before launch, not RSVP-gated)
  - Decide and register domain — separate from denkore.com and separate from nightdeck.live (see §11)

### Phase 1 — MVP Build (target: 4 weeks @ \<10 hrs/week)

**Regions are built in tandem, not sequentially — the platform and schema are shared (FR-6); only the population method differs per region.**

  - Supabase schema (§6)
  - Ingestion scripts for cleared Coastal Corridor sources
  - Manual entry admin (simple form, not a full CMS) — committed for Phase 1, used immediately for Western Sussex outreach as calls happen, in parallel with Coastal scraper development
  - Link health checker
  - Public frontend: calendar, filters, event detail pages, region toggle
  - Denkore attribution footer (see FR-8) driving traffic to denkore.com
  - Launch with both regions live — Coastal populated via scraper, Western Sussex populated with whatever's been manually gathered so far (even a handful of real events beats D3's zero, per §1.1)

### Phase 2 — Expansion + B2B Pitch

  - Continued direct outreach to Western Sussex venues for manual/consented listings
  - Analytics dashboard polished into pitch-ready format (§4 FR-7)
  - First 3–5 B2B conversations using real traffic data
  - Facebook Graph API integration, opt-in only, per venue that grants access

### Phase 3 — Monetization Layer

  - "Boosted listing" paid placement
  - RSVP/email capture (triggers §5.5 compliance work)
  - Venue self-service claim/edit flow

## 9\. Success Metrics

|  |  |
| :-: | :-: |
| \*\*Metric\*\* | \*\*Phase 1 Target\*\* |
| Coastal Corridor venues indexed | 15+ |
| Organic search ranking for "events \\[town\\] this weekend" | Top 10 within 60 days of launch |
| Western Sussex venues (manual outreach) | 5+ |
| B2B conversations opened using traffic data | 3+ |
| Broken/flagged links live on site | 0 (automated check enforces this) |

## 10\. Decision Log

|  |  |
| :-: | :-: |
| \*\*Question\*\* | \*\*Decision\*\* |
| Runs under Denkore Group LLC or separate entity? | \*\*Denkore Group LLC\*\* — also serves as a traffic funnel to denkore.com (FR-8) |
| Build Coastal or Western Sussex first? | \*\*Neither — built in tandem.\*\* Shared platform/schema (FR-6); only the data-population method differs per region, and that's decoupled from the build itself |
| Build manual entry admin now or defer? | \*\*Build now, Phase 1.\*\* It's the on-ramp for Western Sussex outreach and needs to exist before those calls start paying off |
| Publish Privacy Policy/ToS before or after RSVP? | \*\*Before — at MVP launch,\*\* scoped to what's actually collected (§5.5). CAN-SPAM-specific provisions wait for Phase 3 |
| Use nightdeck.live for this? | \*\*No — separate domain:\*\* \*\*sussexnightlife\*\* (§11) |

## 11\. Domain & Brand

**Decided:** **sussexnightlife** — separate from nightdeck.live, separate from denkore.com.

  - Confirm .com availability on Namecheap (matches existing registrar pattern for denkore.com and nightdeck.live) before finalizing — if taken, .live or .co are reasonable fallbacks given the nightlife framing
  - **Repo name should match the domain exactly:** **sussexnightlife****.** This is a recurring pattern to protect against — the existing lesson from denkore.com vs. denkoregroup.com, and ggrmusic.com vs. the ggrmusicgroup repo, is that domain/repo name drift causes real confusion later (OIDC sub claims, deploy configs, documentation). Keep them identical from the start here.
  - New repo lives in the denkoregroup GitHub org directly (not personal dclarktech302, then transferred) — since this is a Denkore Group LLC product from day one, not a client build that gets handed off
