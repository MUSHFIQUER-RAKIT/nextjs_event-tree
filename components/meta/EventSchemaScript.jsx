export default function EventSchemaScript({ event }) {
  const eventName = encodeURIComponent(event?.name);

  const formattedData = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: event?.name,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    description: event?.details,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: event?.link || "https://yourevent.com",
    },
    image: [event?.imageUrl],
    organizer: {
      "@type": "Organization",
      name: "RAKIT",
      url: "https://github.com/MUSHFIQUER-RAKIT",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(formattedData) }}
      />
    </>
  );
}
