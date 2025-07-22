import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";

export default function Home() {
  return (
    <>
      <section className="container">
        <h1 className="text-lime-300 text-3xl">HEllo Worls</h1>
        <Header />
        <EventList />
      </section>
    </>
  );
}
