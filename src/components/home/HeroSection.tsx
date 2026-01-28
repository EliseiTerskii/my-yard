import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, BookOpen } from "lucide-react";
import heroBuilding from "@/assets/hero-building.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute inset-0">
        <img 
          src={heroBuilding} 
          alt="" 
          className="w-full h-full object-cover object-right"
          aria-hidden="true"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent md:via-background/80 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 h-full mx-auto max-w-7xl">
        <div className="flex items-center min-h-[600px] md:min-h-[700px] py-16">
          <div className="max-w-xl space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Бесплатная платформа для жителей МКД
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Управляйте домом{" "}
                <span className="text-primary">грамотно</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Понятные инструкции, готовые документы и юридическая поддержка 
                для решения любых вопросов ЖКХ.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link to="/lectorium">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Начать обучение
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-medium bg-background/80 backdrop-blur-sm">
                <Link to="/documents">
                  <FileText className="mr-2 h-5 w-5" />
                  Генератор документов
                </Link>
              </Button>
            </div>

            {/* Secondary link */}
            <div className="flex items-center gap-4 pt-2">
              <Link 
                to="/memo" 
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Скачать памятку для жителей
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
