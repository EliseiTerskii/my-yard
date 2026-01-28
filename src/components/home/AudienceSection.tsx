import { User, Users, Building, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const audiences = [
  {
    icon: User,
    title: "Собственники",
    description: "Знайте свои права и обязанности. Контролируйте управление домом.",
  },
  {
    icon: Users,
    title: "Жильцы",
    description: "Разберитесь в начислениях ЖКУ и правилах проживания в МКД.",
  },
  {
    icon: Building,
    title: "Совет дома",
    description: "Эффективно представляйте интересы собственников перед УК.",
  },
  {
    icon: Crown,
    title: "Председатели",
    description: "Получите инструменты для организации ОСС и работы с документами.",
  },
];

const AudienceSection = () => {
  return (
    <section className="px-2 pt-24 md:pt-32 md:px-6 pb-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Для кого эта платформа
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Полезные материалы для всех, кто живёт в многоквартирном доме
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item, index) => (
            <Card 
              key={item.title} 
              className="group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
