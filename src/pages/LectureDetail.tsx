import {useParams, Link} from "react-router-dom";
import {ArrowLeft, Clock, FileText, CheckCircle2, ArrowRight} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {useEffect, useState} from "react";
import {Lecture} from "@/hooks/useLectures.ts";
import {api} from "@/api";
import {ApiService} from "@/api/service.ts";
import {Loader} from "@/components/ui/loader.tsx";
import {downloadFile} from "@/lib/utils.ts";
import {useToast} from "@/hooks/use-toast.ts";

const LectureDetail = () => {
    const {lectureId} = useParams<{ lectureId: string }>();
    const [lecture, setLecture] = useState<Lecture | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {toast} = useToast();

    useEffect(() => {
        if (!lectureId) {
            setIsLoading(false);
            return;
        }

        const fetchLecture = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await api.get<Lecture>(ApiService.LECTURES.GET(lectureId));
                if (response.status === 200) {
                    setLecture(response.data);
                }
            } catch (err) {
                console.error("Ошибка загрузки новости:", err);
                setError("Не удалось загрузить новость. Попробуйте позже.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLecture();
    }, [lectureId]);

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

    if (!lecture) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header/>
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground mb-4">
                            Лекция не найдена
                        </h1>
                        <Link to="/lectorium">
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2"/>
                                Вернуться к лекторию
                            </Button>
                        </Link>
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
                {/* Back Navigation */}
                <div className="border-b bg-secondary/30">
                    <div className="container py-4 mx-auto max-w-7xl">
                        <Link
                            to="/lectorium"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            Назад к лекторию
                        </Link>
                    </div>
                </div>

                <div className="container py-8 md:py-12 mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Video Player */}
                            <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    src={lecture.rutubeUrl}
                                    title={lecture.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Lecture Info */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4"/>
                                        {lecture.duration}
                                    </div>
                                    {lecture.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                    {lecture.title}
                                </h1>

                                <p className="text-muted-foreground leading-relaxed">
                                    {lecture.description}
                                </p>
                            </div>

                            {/* What You'll Learn */}
                            <Card className="border-primary/20 bg-primary/5">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary"/>
                                        Что вы узнаете
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {lecture.learnings.map((learning, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"/>
                                                <span className="text-foreground">{learning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Materials */}
                            {lecture.materials && lecture.materials.length > 0 && (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-primary"/>
                                            Материалы
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {lecture.materials.map((material, index) => (
                                            <button
                                                key={index}
                                                onClick={async () => {
                                                    try {
                                                        await downloadFile(material.url)
                                                    } catch (error) {
                                                        toast({
                                                            title: "Ошибка",
                                                            description: 'Не удалось скачать презентацию',
                                                            variant: "destructive",
                                                        });
                                                    }
                                                }
                                                }
                                                className="block p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                                            >
                        <span className="text-sm font-medium text-foreground">
                          {material.name}
                        </span>
                                            </button>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Next Lecture */}
                            {lecture.nextLecture && (
                                <Card className="overflow-hidden">
                                    <CardHeader className="pb-3 bg-secondary/30">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">
                                            Следующая лекция
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <Link to={`/lectorium/${lecture.nextLecture.id}`}>
                                            <div className="group">
                                                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                                                    {lecture.nextLecture.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {lecture.nextLecture.description}
                                                </p>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Смотреть
                                                    <ArrowRight className="w-4 h-4 ml-2"/>
                                                </Button>
                                            </div>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Back to Lectorium */}
                            <Link to="/lectorium" className="block">
                                <Button variant="ghost" className="w-full">
                                    <ArrowLeft className="w-4 h-4 mr-2"/>
                                    Все лекции
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default LectureDetail;
