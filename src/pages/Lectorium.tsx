import {useEffect, useState} from "react";
import {Clock, GraduationCap, Play} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LectureCard from "@/components/lectorium/LectureCard";
import CourseFilter from "@/components/lectorium/CourseFilter";
import TagFilter from "@/components/lectorium/TagFilter";
import {useLectures} from "@/hooks/useLectures.ts";
import {Loader} from "@/components/ui/loader.tsx";
import lectoriumHero from "@/assets/lectorium-hero.png";

const Lectorium = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const useDebounce = (value: any, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => {
            const timer = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(timer);
        }, [value, delay]);
        return debouncedValue;
    };

    const debouncedTagsArray = useDebounce(selectedTags, 500);
    const debouncedTags = debouncedTagsArray.join(',');

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const {data: lectures, isLoading} = useLectures({course: selectedCourse || undefined, tags: debouncedTags})

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header/>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-[400px] md:min-h-[500px] overflow-hidden">
                    {/* Background Illustration */}
                    <div className="absolute inset-0">
                        <img
                            src={lectoriumHero}
                            alt=""
                            className="w-full h-full object-cover object-center"
                            aria-hidden="true"
                        />
                        {/* Gradient overlay for text readability */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"/>
                        <div
                            className="absolute inset-0 bg-gradient-to-tl from-background/60 via-transparent to-transparent"/>
                    </div>

                    {/* Content */}
                    <div className="container z-10 h-full">
                        <div className="flex items-center min-h-[400px] md:min-h-[500px] py-12">
                            <div className="max-w-xl space-y-6 animate-fade-in">
                                {/* Badge */}
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                                    <GraduationCap className="h-4 w-4"/>
                                    Образовательная платформа
                                </div>

                                {/* Heading */}
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                                        Лекторий{" "}
                                        <span className="text-primary">ЖКХ</span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-md">
                                        Короткие видеолекции о ЖКХ, управлении домом и контроле работ.
                                        Каждая лекция — 2 минуты полезной информации.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-6 pt-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <Play className="h-4 w-4 text-primary"/>
                                        </div>
                                        <span>Видеоуроки</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <Clock className="h-4 w-4 text-primary"/>
                                        </div>
                                        <span>По 2 минуты</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="py-6 border-b bg-background top-16 z-40">
                    <div className="container space-y-4 mx-auto max-w-7xl">
                        <CourseFilter
                            selectedCourse={selectedCourse}
                            onCourseChange={setSelectedCourse}
                        />
                        <TagFilter
                            selectedTags={selectedTags}
                            onTagChange={toggleTag}
                        />
                    </div>
                </section>

                {isLoading &&
                  <div className="container py-16 mx-auto max-w-7xl">
                    <Loader/>
                  </div>
                }
                <section className="py-10 md:py-14">
                    <div className="container mx-auto max-w-7xl">
                        {!lectures?.length ? (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground">
                                    Лекции по выбранным фильтрам не найдены
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Найдено лекций: {lectures?.length}
                                </p>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {lectures?.map((lecture) => (
                                        <LectureCard key={lecture.id} lecture={lecture}/>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
};

export default Lectorium;
