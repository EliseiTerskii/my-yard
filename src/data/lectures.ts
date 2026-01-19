export interface Lecture {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  course: "all" | "basics" | "quality";
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  learnings: string[];
  materials?: { title: string; url: string }[];
}

export const courses = [
  { id: "all", label: "Все лекции" },
  { id: "basics", label: "Азбука ЖКХ" },
  { id: "quality", label: "Контроль качества работ" },
] as const;

export const tags = [
  "ОСС",
  "Управляющая компания",
  "Капремонт",
  "Жалобы",
  "Контроль работ",
  "Договоры",
  "Права жильцов",
] as const;

export const lectures: Lecture[] = [
  {
    id: "what-is-oss",
    title: "Что такое ОСС и зачем оно нужно",
    description: "Общее собрание собственников (ОСС) — это главный орган управления многоквартирным домом. В этой лекции вы узнаете, какие вопросы решает ОСС, кто может участвовать в голосовании и почему важно принимать участие в жизни своего дома.",
    shortDescription: "Основы общего собрания собственников",
    duration: "2:00",
    course: "basics",
    tags: ["ОСС", "Права жильцов"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Что такое ОСС и его правовой статус",
      "Какие вопросы решаются на ОСС",
      "Кто имеет право голосовать",
    ],
    materials: [
      { title: "Чек-лист подготовки к ОСС", url: "#" },
      { title: "Шаблон протокола ОСС", url: "#" },
    ],
  },
  {
    id: "how-to-hold-oss",
    title: "Как провести ОСС: пошаговая инструкция",
    description: "Подробная пошаговая инструкция по организации и проведению общего собрания собственников. От уведомления жильцов до оформления протокола — все этапы понятным языком.",
    shortDescription: "Пошаговое руководство по проведению собрания",
    duration: "2:00",
    course: "basics",
    tags: ["ОСС"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Этапы подготовки к собранию",
      "Как правильно уведомить жильцов",
      "Оформление документов по итогам ОСС",
    ],
    materials: [
      { title: "Шаблон уведомления о собрании", url: "#" },
    ],
  },
  {
    id: "uk-contract",
    title: "Договор с управляющей компанией",
    description: "Разбираем ключевые пункты договора управления многоквартирным домом. На что обратить внимание, какие условия должны быть прописаны и как защитить интересы жильцов.",
    shortDescription: "Ключевые пункты договора управления",
    duration: "2:00",
    course: "basics",
    tags: ["Управляющая компания", "Договоры"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Обязательные условия договора",
      "Права и обязанности сторон",
      "Как расторгнуть договор с УК",
    ],
  },
  {
    id: "capital-repair",
    title: "Капитальный ремонт: ваши права",
    description: "Всё о фонде капитального ремонта, формировании взносов и контроле за проведением работ. Узнайте, как влиять на сроки и качество капремонта в вашем доме.",
    shortDescription: "Фонд капремонта и права собственников",
    duration: "2:00",
    course: "basics",
    tags: ["Капремонт", "Права жильцов"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Как формируется фонд капремонта",
      "Выбор способа накопления средств",
      "Контроль за проведением работ",
    ],
  },
  {
    id: "how-to-complain",
    title: "Как написать эффективную жалобу",
    description: "Практическое руководство по составлению жалоб в УК, ГЖИ и другие инстанции. Шаблоны, примеры и лайфхаки для получения результата.",
    shortDescription: "Шаблоны и примеры обращений",
    duration: "2:00",
    course: "basics",
    tags: ["Жалобы", "Управляющая компания"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Структура эффективной жалобы",
      "Куда и как подавать обращения",
      "Сроки рассмотрения и ответа",
    ],
    materials: [
      { title: "Шаблон жалобы в УК", url: "#" },
      { title: "Шаблон обращения в ГЖИ", url: "#" },
    ],
  },
  {
    id: "quality-control-basics",
    title: "Основы контроля качества работ",
    description: "Введение в контроль качества работ по содержанию и ремонту общего имущества. Какие работы должны выполняться, как проверять их качество.",
    shortDescription: "Как контролировать работу УК",
    duration: "2:00",
    course: "quality",
    tags: ["Контроль работ", "Управляющая компания"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Перечень обязательных работ",
      "Методы контроля качества",
      "Фиксация нарушений",
    ],
  },
  {
    id: "act-of-work",
    title: "Акт выполненных работ: на что смотреть",
    description: "Разбираем акты выполненных работ — как читать, проверять и при необходимости оспаривать. Практические советы для совета дома.",
    shortDescription: "Проверка и оспаривание актов",
    duration: "2:00",
    course: "quality",
    tags: ["Контроль работ", "Договоры"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Структура акта выполненных работ",
      "Типичные нарушения и ошибки",
      "Процедура оспаривания",
    ],
  },
  {
    id: "seasonal-works",
    title: "Сезонные работы: что и когда",
    description: "Какие работы должны выполняться в разные сезоны года. Чек-листы для проверки готовности дома к зиме и лету.",
    shortDescription: "Сезонное обслуживание дома",
    duration: "2:00",
    course: "quality",
    tags: ["Контроль работ"],
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    learnings: [
      "Перечень сезонных работ",
      "Сроки выполнения",
      "Чек-лист проверки",
    ],
    materials: [
      { title: "Чек-лист подготовки к зиме", url: "#" },
    ],
  },
];

export const getLectureById = (id: string): Lecture | undefined => {
  return lectures.find((lecture) => lecture.id === id);
};

export const getNextLecture = (currentId: string): Lecture | undefined => {
  const currentIndex = lectures.findIndex((lecture) => lecture.id === currentId);
  if (currentIndex === -1 || currentIndex === lectures.length - 1) {
    return undefined;
  }
  return lectures[currentIndex + 1];
};

export const filterLectures = (
  courseFilter: string,
  tagFilter: string | null
): Lecture[] => {
  return lectures.filter((lecture) => {
    const matchesCourse = courseFilter === "all" || lecture.course === courseFilter;
    const matchesTag = !tagFilter || lecture.tags.includes(tagFilter);
    return matchesCourse && matchesTag;
  });
};
