import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  if (event.isUpcoming) {
    return (
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.summary}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow group h-full">
        <div className="aspect-[3/2] overflow-hidden bg-muted">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {event.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
