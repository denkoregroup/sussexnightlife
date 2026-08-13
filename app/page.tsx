import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { RightNowStrip } from "@/components/sections/RightNowStrip";
import { EventList } from "@/components/sections/EventList";
import { Footer } from "@/components/sections/Footer";
import { mockEvents, mockVenues } from "@/lib/mock-events";
import type { Region } from "@/lib/types";

export default async function Home(props: PageProps<"/">) {
  const { region: rawRegion } = await props.searchParams;
  const region: Region = rawRegion === "western_sussex" ? "western_sussex" : "coastal";

  const venuesInRegion = mockVenues.filter((v) => v.region === region);
  const eventsInRegion = mockEvents.filter(
    (event) => venuesInRegion.find((v) => v.venue_id === event.venue_id) !== undefined
  );

  return (
    <>
      <Nav region={region} />
      <Hero />
      <RightNowStrip venues={venuesInRegion.slice(0, 4)} />
      <EventList events={eventsInRegion} venues={mockVenues} />
      <Footer />
    </>
  );
}
