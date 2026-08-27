export const links = {
  chubbyLive: "https://katyakorr.github.io/Pelmeni/",
  chubbyFigma:
    "https://www.figma.com/design/biyGM1Bhm9rDKmqRHveJcb/%D0%9B%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3-%D0%BF%D0%B5%D0%BB%D1%8C%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9?node-id=635-1113",
  biometryFigma:
    "https://www.figma.com/design/HSp9oTKKQshVoxofhLqwZC/%D0%91%D0%B8%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%8F?node-id=0-1",
  stickers: "https://t.me/addstickers/Hippos76",
  email: "mailto:katya_kor@internet.ru",
  telegram: "https://t.me/katya_kor_tg",
  channel: "https://t.me/katya_kor_channel",
};

export const media = (path) => `/media/${path}`;

export const projects = [
  {
    no: "01",
    title: "Chubby Hippo",
    type: "UI/UX · Адаптивный сайт · Вёрстка",
    href: "/work/chubby-hippo",
    image: media(
      "chubby-hippo/website/apple-responsive-devices-mockup (1).webp",
    ),
    className: "hero-card chubby",
    status: "Сайт работает",
    tags: ["Дизайн-система", "Figma", "HTML/CSS/JS"],
  },
  {
    no: "02",
    title: "Госуслуги Биометрия",
    type: "UX/UI · Мобильный интерфейс · Прототип",
    href: "/work/biometry",
    image: media("gosuslugi/floating-iphones-14-pro-max.webp"),
    className: "hero-card bio",
    tags: [
      "Пользовательские сценарии",
      "Первый запуск",
      "Иммерсивный интерфейс",
    ],
  },
  {
    no: "03",
    title: "Дизайн презентаций",
    type: "PDF · PowerPoint · Визуальная подача",
    href: "/work/presentations",
    image: "/media/presentations/aistickers/page-01.webp",
    className: "small-card presentations",
    tags: ["Презентации", "Композиция"],
  },
  {
    no: "04",
    title: "Графика и иллюстрация",
    type: "Adobe Illustrator · Визуальный дизайн",
    href: "/work/graphic-design",
    image: media("illustrator/trifold-leaflet-mockup.webp"),
    className: "small-card graphic",
    tags: ["Постеры", "Иллюстрация"],
  },
  {
    no: "05",
    title: "AI-стикеры с бегемотом",
    type: "Генеративный ИИ · Система персонажа",
    href: "/work/ai-stickers",
    image: media(
      "ai-stickers/hippo-pancakes.webp",
    ),
    className: "small-card stickers",
    tags: ["100+ стикеров", "Telegram"],
  },
];

export const presentationDecks = [
  {
    title: "AI Stickers",
    type: "PDF · Презентация платформы",
    pages: 15,
    slug: "aistickers",
    file: "/docs/ai-stickers.pdf",
  },
  {
    title: "Типы данных, строки и операторы",
    type: "PDF · Учебная презентация",
    pages: 36,
    slug: "python",
    file: "/docs/python.pdf",
  },
  {
    title: "Диаграмма Карно",
    type: "PDF · Учебная презентация",
    pages: 21,
    slug: "diagramma-karno",
    file: "/docs/karnaugh-map.pdf",
  },
  {
    title: "Chubby Hippo",
    type: "PDF · Презентация сайта",
    pages: 13,
    slug: "prezentaciya-sajta",
    file: "/docs/chubby-hippo.pdf",
  },
];

export const stickerFiles = [
  "20260313_2033_Плачущий Детёныш Бегемота_simple_compose_01kkm44e6ffmzts8qzxmsr91qg.webp",
  "20260329_0020_Image_Generation_simple_compose_01kmv527sbe3q8q3q6c03emrg9.webp",
  "20260322_1223_Image_Generation_simple_compose_01kmadnawqfdsasw4ex6h2f777.webp",
  "20260420_2311_Image Generation_simple_compose_01kpp89dtde9dt2qcywtesd0jd.webp",
  "20260313_2020_Image Generation_simple_compose_01kkm3arc6e6srsvfhd7s6bsjj.webp",
  "20260313_2034_Милого розового бегемотика_simple_compose_01kkm45s9pejfsxzy2tn4n2bw8.webp",
  "hippo-pancakes.webp",
  "20260322_1523_Image_Generation_simple_compose_01kmaqz8nyesjbg59512tm6g9n.webp",
  "20260322_1223_Image_Generation_simple_compose_01kmadmpxgfp3v98n6cab5gazd.webp",
  "hippo-chef.webp",
  "20260314_2304_Image_Generation_simple_compose_01kkpz611wfbp8j89m4b7zbf2e.webp",
  "20260317_2255_Image_Generation_simple_compose_01kkynsx7gfzxak7sb5pr27bm0.webp",
];
