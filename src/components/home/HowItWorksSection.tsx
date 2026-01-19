import { Link } from "react-router-dom";
import { PlayCircle, FolderOpen, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: PlayCircle,
    step: "01",
    title: "Узнайте",
    description: "Смотрите короткие видео и читайте статьи о правах жителей МКД, работе УК и проведении собраний",
    link: "/lectorium",
    linkText: "Перейти в Лекторий",
  },
  {
    icon: FolderOpen,
    step: "02",
    title: "Подготовьте",
    description: "Создавайте документы для ОСС, обращения в инстанции и заявления с помощью интерактивных форм",
    link: "/documents",
    linkText: "Открыть Генератор",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Действуйте",
    description: "Подавайте обращения, контролируйте УК, фиксируйте нарушения и защищайте свои права",
    link: "/memo",
    linkText: "Скачать Памятку",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Как это работает
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Три простых шага к решению ваших вопросов по ЖКХ
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div 
              key={item.step}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8 flex h-8 items-center justify-center rounded-full bg-primary px-3 text-sm font-bold text-primary-foreground">
                {item.step}
              </div>

              {/* Icon */}
              <div className="mb-6 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent transition-colors group-hover:bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Link */}
              <Button asChild variant="ghost" className="group/btn p-0 h-auto font-medium text-primary hover:text-primary hover:bg-transparent">
                <Link to={item.link} className="flex items-center gap-2">
                  {item.linkText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>

              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
