import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { EventCard } from "@/components/events/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/data/events";

const Events = () => {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Intro Section */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Мероприятия
            </h1>
            <p className="text-lg text-muted-foreground mt-3">
              Встречи, обсуждения и события проекта
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Ближайшие мероприятия
            </h2>
            <div className="max-w-2xl">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-10 md:py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Прошедшие мероприятия
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
