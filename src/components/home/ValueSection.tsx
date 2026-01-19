import { MessageSquare, Wrench, FileCheck, Headphones } from "lucide-react";

const values = [
  {
    icon: MessageSquare,
    title: "Понятный язык",
    description: "Объясняем сложные юридические термины простыми словами",
  },
  {
    icon: Wrench,
    title: "Практические инструменты",
    description: "Не только теория, но и готовые решения для реальных ситуаций",
  },
  {
    icon: FileCheck,
    title: "Шаблоны документов",
    description: "Заполняете форму — получаете готовый документ для подачи",
  },
  {
    icon: Headphones,
    title: "Помощь в ситуациях",
    description: "Пошаговые инструкции для решения типичных проблем с ЖКХ",
  },
];

const ValueSection = () => {
  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Block */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Почему нам доверяют
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы создаём материалы, которые действительно помогают. 
              Наша цель — дать каждому жителю МКД возможность понимать 
              свои права и эффективно их защищать.
            </p>
          </div>

          {/* Value Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((item, index) => (
              <div 
                key={item.title}
                className="flex gap-4 rounded-xl bg-background p-5 shadow-sm border border-border/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
