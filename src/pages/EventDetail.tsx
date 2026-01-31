import {useParams, Link} from "react-router-dom";
import {ArrowLeft, Calendar} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {api} from "@/api";
import {ApiService} from "@/api/service.ts";
import {Loader} from "@/components/ui/loader.tsx";
import {EventItem} from "@/hooks/useEvents.ts";
import dayjs from "dayjs";
import {Markdown} from "@/components/ui/markdown.tsx";

const EventDetail = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<EventItem | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) {
            setIsLoading(false);
            return;
        }

        const fetchEvent = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await api.get<EventItem>(ApiService.EVENTS.GET(eventId));
                if (response.status === 200) {
                    setEvent(response.data);
                }
            } catch (err) {
                console.error("Ошибка загрузки новости:", err);
                setError("Не удалось загрузить новость. Попробуйте позже.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header/>
                <div className="mt-48">
                    <Loader/>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header/>
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
                <Footer/>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header/>

            <main className="flex-1">
                {/* Header Section */}
                <section className="py-8 md:py-12 bg-secondary/30">
                    <div className="container mx-auto max-w-7xl">
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            Назад к мероприятиям
                        </Link>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                            {event.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                            <Calendar className="w-4 h-4"/>
                            <span>{dayjs(event.publishedAt).format('DD.MM.YYYY')}</span>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-10">
                    <div className="container mx-auto max-w-7xl">
                        <div className="max-w-3xl">
                            <Markdown content={event.content}/>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                {event.gallery && event.gallery.length > 0 && (
                    <section className="py-10 md:py-12 bg-secondary/20">
                        <div className="container mx-auto max-w-7xl">
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
                    <div className="container mx-auto max-w-7xl">
                        <Button variant="outline" asChild>
                            <Link to="/events">
                                <ArrowLeft className="w-4 h-4 mr-2"/>
                                Все мероприятия
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
};

export default EventDetail;
