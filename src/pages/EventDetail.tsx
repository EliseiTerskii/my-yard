import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/data/events";

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = eventId ? getEventById(eventId) : undefined;

  if (!event || event.isUpcoming) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Мероприятие не найдено
            </h1>
            <Button asChild>
              <Link to="/events">Вернуться к мероприятиям</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к мероприятиям
            </Link>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {event.title}
            </h1>
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Что было
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {event.gallery.length > 0 && (
          <section className="py-10 md:py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Фотографии
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={image}
                      alt={`${event.title} - фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Button variant="outline" asChild>
              <Link to="/events">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Все мероприятия
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
