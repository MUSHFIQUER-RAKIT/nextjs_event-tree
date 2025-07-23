import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";

export async function generateMetadata({ params: { id } }) {
  const event = await getEventById(id);

  return {
    title: "Event Tree - " + event?.name,
    description: event?.details || "Details of the event",
    openGraph: {
      images: [event?.imageUrl],
    },
  };
}

export default async function DetailsPage({ params: { id } }) {
  const event = await getEventById(id);
  return (
    <>
      <HeroSection event={event} />
      <section class="container">
        <div class="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={event?.details} swags={event?.swags} />
          <EventVenue location={event?.location} />
        </div>
      </section>
    </>
  );
}
