import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { EventList } from "@/components/sections/EventList";
import { Footer } from "@/components/sections/Footer";
import { mockEvents, mockVenues } from "@/lib/mock-events";

// Both regions render in one chronologically-sorted list by default —
// EventList's own filter chips (All / Coastal / Western Sussex) narrow it
// client-side, so the homepage no longer branches on a ?region= param.
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <EventList events={mockEvents} venues={mockVenues} />
      <Footer />
    </>
  );
}
