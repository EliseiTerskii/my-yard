import { Download, FileText, BookOpen, Shield, Phone, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const memoContents = [
  { icon: Shield, text: "Права и обязанности собственника" },
  { icon: FileText, text: "Как взаимодействовать с УК" },
  { icon: CheckCircle, text: "Алгоритмы действий при проблемах" },
  { icon: BookOpen, text: "Контроль работ и услуг" },
  { icon: AlertTriangle, text: "Куда обращаться с жалобами" },
  { icon: Phone, text: "Полезные контакты и ресурсы" },
];

const relatedArticles = [
  { id: "uk-1", title: "Как сменить управляющую компанию" },
  { id: "uk-3", title: "Права собственников при общем собрании" },
  { id: "complaints-1", title: "Куда жаловаться на УК" },
];

const Memo = () => {
  const handleDownload = () => {
    // Placeholder for PDF download
    alert("Скачивание PDF-памятки будет доступно в ближайшее время");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Памятка активного жителя
              </h1>
              <p className="text-lg text-muted-foreground">
                Краткое руководство для жителей многоквартирных домов
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Left Column - Cover Image */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 w-full max-w-sm aspect-[3/4] flex flex-col items-center justify-center border border-border/50">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground text-center mb-2">
                      Памятка активного жителя
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Практическое руководство
                    </p>
                    <div className="mt-6 text-xs text-muted-foreground">
                      PDF • 24 страницы
                    </div>
                  </div>
                </div>

                {/* Right Column - Contents & CTA */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Что внутри
                    </h2>
                    <ul className="space-y-3">
                      {memoContents.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground pt-1">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      onClick={handleDownload}
                      className="w-full sm:w-auto gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Скачать PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Также полезно
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedArticles.map((article) => (
                  <Link key={article.id} to={`/legal/${article.id}`}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground leading-tight">
                            {article.title}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Memo;
