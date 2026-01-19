export interface Event {
  id: string;
  title: string;
  date: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
  isUpcoming: boolean;
}

export const events: Event[] = [
  {
    id: "upcoming-1",
    title: "Следующее мероприятие — скоро",
    date: "Дата уточняется",
    summary: "Следите за обновлениями",
    description: "",
    coverImage: "",
    gallery: [],
    isUpcoming: true,
  },
  {
    id: "event-1",
    title: "Встреча с жителями ЖК «Солнечный»",
    date: "12 января 2026",
    summary: "Обсудили вопросы благоустройства двора и установки детской площадки",
    description: "На встрече присутствовало более 40 жителей. Были рассмотрены три варианта проекта детской площадки, проведено голосование. Жители выбрали вариант с качелями и песочницей. Также обсудили график уборки территории и вопросы парковки.",
    coverImage: "https://images.unsplash.com/photo-1577415124269-fc1140815e6e?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1577415124269-fc1140815e6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    ],
    isUpcoming: false,
  },
  {
    id: "event-2",
    title: "Вебинар: Как провести ОСС правильно",
    date: "28 декабря 2025",
    summary: "Разобрали пошаговый алгоритм проведения общего собрания собственников",
    description: "Онлайн-вебинар для председателей советов домов и активных жителей. Рассмотрели требования закона к уведомлению собственников, формированию повестки дня, подсчёту голосов. Участники получили готовые шаблоны документов.",
    coverImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    ],
    isUpcoming: false,
  },
  {
    id: "event-3",
    title: "Круглый стол с представителями УК",
    date: "15 декабря 2025",
    summary: "Диалог между жителями и управляющими компаниями о качестве услуг",
    description: "Представители трёх управляющих компаний ответили на вопросы жителей. Обсуждались темы: своевременность уборки, качество текущего ремонта, прозрачность начислений. По итогам составлен протокол с обязательствами сторон.",
    coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    ],
    isUpcoming: false,
  },
  {
    id: "event-4",
    title: "Обучение: Контроль капитального ремонта",
    date: "1 декабря 2025",
    summary: "Практический семинар для членов комиссий по приёмке работ",
    description: "Участники узнали, как проверять качество работ по капремонту, какие документы требовать от подрядчика, как фиксировать недостатки. Разобрали реальные случаи из практики, показали типичные нарушения на примерах.",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    ],
    isUpcoming: false,
  },
];

export const getEventById = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const getUpcomingEvents = (): Event[] => {
  return events.filter((event) => event.isUpcoming);
};

export const getPastEvents = (): Event[] => {
  return events.filter((event) => !event.isUpcoming);
};
