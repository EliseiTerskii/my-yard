import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, BookOpen, Building2, Users, Scale } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Разбирайтесь в ЖКХ. Действуйте уверенно.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-xl">
                Бесплатная образовательная платформа для жителей многоквартирных домов. 
                Понятные инструкции, готовые документы и юридическая поддержка.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="text-base font-medium">
                <Link to="/lectorium">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Начать обучение
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-medium">
                <Link to="/documents">
                  <FileText className="mr-2 h-5 w-5" />
                  Генератор документов ОСС
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-base font-medium">
                <Link to="/memo">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Скачать памятку
                </Link>
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* Abstract Building Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Main Building */}
                  <div className="relative z-10 flex h-64 w-48 flex-col items-center justify-end rounded-t-3xl bg-primary/10 p-6">
                    <Building2 className="h-20 w-20 text-primary" strokeWidth={1.5} />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="h-4 w-4 rounded-sm bg-primary/30" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -left-16 top-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-lg">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <div className="absolute -right-12 top-20 flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-lg">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div className="absolute -right-8 bottom-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-lg">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Background Decorations */}
                  <div className="absolute -left-24 -top-8 h-32 w-32 rounded-full bg-primary/5" />
                  <div className="absolute -right-20 -bottom-4 h-24 w-24 rounded-full bg-primary/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
