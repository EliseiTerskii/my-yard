import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {EventCard} from "@/components/events/EventCard";
import {useEvents, useUpcomingEvents} from "@/hooks/useEvents.ts";
import {Loader} from "@/components/ui/loader.tsx";
import eventsHero from "@/assets/events-hero.png";
import {CalendarDays, MapPin, Users} from "lucide-react";

const Events = () => {
    const {data: upcomingEvents, isLoading: isUpcomingLoading} = useUpcomingEvents();
    const {data: eventsData, isLoading: isEventsLoading} = useEvents();

    const pastEvents = eventsData?.pages?.flatMap(news => news.data);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header/>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-[400px] md:min-h-[500px] overflow-hidden">
                    {/* Background Illustration */}
                    <div className="absolute inset-0">
                        <img
                            src={eventsHero}
                            alt=""
                            className="w-full h-full object-cover object-center"
                            aria-hidden="true"
                        />
                        {/* Gradient overlay for text readability */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"/>
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"/>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto max-w-7xl relative z-10 h-full">
                        <div className="flex items-center min-h-[400px] md:min-h-[500px] py-12">
                            <div className="max-w-xl space-y-6 animate-fade-in">
                                {/* Badge */}
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                                    <CalendarDays className="h-4 w-4"/>
                                    Встречи и обсуждения
                                </div>

                                {/* Heading */}
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                                        Мероприятия{" "}
                                        <span className="text-primary">проекта</span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-md">
                                        Присоединяйтесь к живым встречам, вебинарам и обсуждениям
                                        по управлению многоквартирными домами.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-6 pt-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <Users className="h-4 w-4 text-primary"/>
                                        </div>
                                        <span>Эксперты ЖКХ</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <MapPin className="h-4 w-4 text-primary"/>
                                        </div>
                                        <span>Онлайн и офлайн</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                <CalendarDays className="h-5 w-5 text-primary"/>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                Ближайшие мероприятия
                            </h2>
                        </div>
                        <div className="max-w-2xl">
                            {!upcomingEvents?.length && !isUpcomingLoading ? (
                                <div className="text-center py-12 bg-muted/30 rounded-xl border border-border/50">
                                    <CalendarDays className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4"/>
                                    <p className="text-muted-foreground">
                                        Пока нет запланированных мероприятий
                                    </p>
                                </div>
                            ) : isUpcomingLoading ?
                                <Loader/>
                                :
                                (
                                    upcomingEvents.map((event, index) => (
                                        <div
                                            key={event.id}
                                            className="animate-fade-in-up"
                                            style={{animationDelay: `${index * 100}ms`}}
                                        >
                                            <EventCard upcomingEvent={event}/>
                                        </div>
                                    ))
                                )}
                        </div>
                    </div>
                </section>

                {/* Past Events */}
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container max-w-7xl px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                            Прошедшие мероприятия
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {!pastEvents?.length && !isEventsLoading ? (
                                <div className="text-center py-12 bg-muted/30 rounded-xl border border-border/50">
                                    <CalendarDays className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4"/>
                                    <p className="text-muted-foreground">
                                        Не найдены прощедшие мероприятия
                                    </p>
                                </div>
                            ) : isEventsLoading ?
                                <Loader/>
                                :
                                (
                                    pastEvents?.map((event, index) => (
                                        <div
                                            key={event.id}
                                            className="animate-fade-in-up"
                                            style={{animationDelay: `${index * 50}ms`}}
                                        >
                                            <EventCard event={event}/>
                                        </div>
                                    ))
                                )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
};

export default Events;
