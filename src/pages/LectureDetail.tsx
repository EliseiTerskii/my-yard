import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, FileText, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLectureById, getNextLecture } from "@/data/lectures";

const LectureDetail = () => {
  const { lectureId } = useParams<{ lectureId: string }>();
  const lecture = getLectureById(lectureId || "");
  const nextLecture = getNextLecture(lectureId || "");

  if (!lecture) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Лекция не найдена
            </h1>
            <Link to="/lectorium">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к лекторию
              </Button>
            </Link>
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
        {/* Back Navigation */}
        <div className="border-b bg-secondary/30">
          <div className="container py-4">
            <Link 
              to="/lectorium" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к лекторию
            </Link>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={lecture.videoUrl}
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
                    <Clock className="w-4 h-4" />
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
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Что вы узнаете
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lecture.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
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
                      <FileText className="w-5 h-5 text-primary" />
                      Материалы
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {lecture.materials.map((material, index) => (
                      <a
                        key={index}
                        href={material.url}
                        className="block p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {material.title}
                        </span>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Next Lecture */}
              {nextLecture && (
                <Card className="overflow-hidden">
                  <CardHeader className="pb-3 bg-secondary/30">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Следующая лекция
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Link to={`/lectorium/${nextLecture.id}`}>
                      <div className="group">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                          {nextLecture.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {nextLecture.shortDescription}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Смотреть
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Back to Lectorium */}
              <Link to="/lectorium" className="block">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Все лекции
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LectureDetail;
