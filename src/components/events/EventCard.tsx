import {Link} from "react-router-dom";
import {Calendar} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import dayjs from "dayjs";
import {EventItem} from "@/hooks/useEvents.ts";

interface EventCardProps {
    upcomingEvent?: EventItem;
    event?: EventItem;
}

export const EventCard = ({upcomingEvent, event}: EventCardProps) => {
    if (upcomingEvent) {
        return <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">{upcomingEvent.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{upcomingEvent.description}</p>
                </div>
            </CardContent>
        </Card>
    }

    if (!event && !upcomingEvent) {
        return (
            <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                <CardContent className="p-6 flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-primary"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Следующее мероприятие: скоро</h3>
                        <p className="text-sm text-muted-foreground mt-1">Информация о предстоящем мероприятии будет
                            опубликована в ближайшее время</p>
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
                        src={event.mainImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{dayjs(event.publishedAt).format('DD.MM.YYYY')}</p>
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
