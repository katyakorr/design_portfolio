import React, { useEffect, useRef, useState } from "react";
import {
  links,
  media,
  projects,
  presentationDecks,
  stickerFiles,
} from "./content.js";

const ext = { target: "_blank", rel: "noopener noreferrer" };
const logoIcon = "/media/logo/ЛогоИконкаВекторЖелтый.svg";
const logoOutline = "/media/logo/ЛогоВектор.svg";

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, []);
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="На главную">
        <img
          src={logoIcon}
          alt=""
          aria-hidden="true"
        />
        <span>EKATERINA KOROLEVA</span>
      </a>
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Меню</span>
      </button>
      <nav
        id="site-nav"
        className={open ? "open" : ""}
        aria-label="Основная навигация"
      >
        <a href="/#work">Работы</a>
        <a href="/about">Обо мне</a>
        <a href="/#contact">Контакты</a>
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img
          className="footer-logo"
          src={logoOutline}
          alt=""
          aria-hidden="true"
        />
        <div>
          <strong>Екатерина Королёва</strong>
          <span>UI/UX-дизайнер</span>
        </div>
      </div>
      <div className="footer-links">
        <a href="/#work">Работы</a>
        <a href="/about">Обо мне</a>
        <a href={links.telegram} {...ext}>
          Telegram ↗
        </a>
      </div>
      <small>© {new Date().getFullYear()}</small>
    </footer>
  );
}
function Layout({ children, className = "" }) {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}
function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((x) => (
        <span key={x}>{x}</span>
      ))}
    </div>
  );
}
function ArrowLink({
  href,
  children,
  external = false,
  download = false,
  className = "",
}) {
  return (
    <a
      className={`arrow-link ${className}`}
      href={href}
      {...(external ? ext : {})}
      download={download || undefined}
    >
      {children}
      <span aria-hidden="true">{download ? "↓" : "↗"}</span>
    </a>
  );
}
function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
function Figure({ src, alt, className = "", eager = false }) {
  return (
    <figure className={`image-frame ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </figure>
  );
}
function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
function ProjectCard({ p }) {
  return (
    <a className={`project-card ${p.className} reveal`} href={p.href}>
      <div className={`project-visual ${p.images ? "project-collage" : ""}`}>
        {(p.images || [p.image]).map((src, index) => (
          <img key={src} src={src} alt="" loading="lazy" data-index={index} />
        ))}
        {p.status && <span className="project-status">● {p.status}</span>}
      </div>
      <div className="project-copy">
        <span className="project-no">{p.no}</span>
        <div>
          <h3>{p.title}</h3>
          <p>{p.type}</p>
          <Tags items={p.tags} />
        </div>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </a>
  );
}
function Contact() {
  return (
    <section className="contact" id="contact">
      <p className="eyebrow">Контакты</p>
      <h2>
        Есть проект или хотите
        <br />
        обсудить работу?
      </h2>
      <ArrowLink href={links.email} className="contact-main">
        Напишите мне
      </ArrowLink>
      <div className="contact-links">
        <a href={links.email}>Email ↗</a>
        <a href={links.telegram} {...ext}>
          Telegram ↗
        </a>
        <a href={links.channel} {...ext}>
          Telegram-канал ↗
        </a>
      </div>
    </section>
  );
}

function HeroWorkCard({ project, className = "" }) {
  const image = project.images?.[1] || project.image;
  return (
    <a className={`hero-work-card ${className}`} href={project.href}>
      <div className="hero-work-card__visual">
        <img src={image} alt={`Превью проекта ${project.title}`} />
      </div>
      <div className="hero-work-card__meta">
        <span>{project.no}</span>
        <strong>{project.title}</strong>
        <i aria-hidden="true">↗</i>
      </div>
    </a>
  );
}

function Home() {
  return (
    <Layout>
      <RevealObserver />
      <section className="portfolio-index-hero">
        <div className="index-hero__topline">
          <p className="eyebrow">Портфолио UI/UX-дизайнера</p>
          <span>Екатерина Королёва · Москва · 2026</span>
        </div>
        <div className="portfolio-word" aria-label="Портфолио">
          <span>ПОРТ</span>
          <span>ФОЛИО</span>
        </div>
        <div className="portfolio-intro">
          <span className="portfolio-intro__number">01—05</span>
          <p>
            Интерфейсы, прототипы, визуальные системы и работающая вёрстка — от
            идеи до готового цифрового продукта.
          </p>
          <a href="#work" className="down-link">
            Все проекты <span>↓</span>
          </a>
        </div>
        <HeroWorkCard
          project={projects[0]}
          className="hero-work-card--featured"
        />
        <HeroWorkCard project={projects[1]} className="hero-work-card--blue" />
        <HeroWorkCard project={projects[2]} className="hero-work-card--pink" />
        <div className="portfolio-count">
          <strong>{String(projects.length).padStart(2, "0")}</strong>
          <span>отобранных проектов</span>
        </div>
      </section>
      <section id="work" className="projects">
        <SectionTitle
          eyebrow="Избранные работы · 2026"
          title="Избранные проекты"
          text="От пользовательского сценария и дизайн-системы до адаптивного интерфейса и работающего кода."
        />
        <div className="featured-grid">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard p={p} key={p.no} />
          ))}
        </div>
        <div className="secondary-grid">
          {projects.slice(2).map((p) => (
            <ProjectCard p={p} key={p.no} />
          ))}
        </div>
      </section>
      <section className="capabilities">
        <p className="eyebrow">Навыки</p>
        <div className="cap-list">
          <span>UI/UX</span>
          <span>Дизайн-системы</span>
          <span>Интерактивные прототипы</span>
          <span>Адаптивные сайты</span>
          <span>Графический дизайн</span>
          <span>Фронтенд</span>
        </div>
      </section>
      <Contact />
    </Layout>
  );
}

function CaseHero({
  index,
  title,
  subtitle,
  tags,
  theme,
  image,
  images,
  meta,
  liveHref,
}) {
  return (
    <section className={`case-hero ${theme}`}>
      <a className="back" href="/#work">
        ← Все проекты
      </a>
      <p className="eyebrow">{index} · Проект</p>
      <h1>{title}</h1>
      <p className="case-subtitle">{subtitle}</p>
      <Tags items={tags} />
      {liveHref && (
        <a className="live-site-callout" href={liveHref} {...ext}>
          <span>
            <strong>● Сайт опубликован</strong>
            <small>Адаптивная версия доступна онлайн</small>
          </span>
          <b>Открыть сайт ↗</b>
        </a>
      )}
      {images ? (
        <div
          className="case-hero-collage"
          aria-label={`Превью проекта ${title}`}
        >
          {images.map((src, position) => (
            <img
              key={src}
              src={src}
              alt=""
              data-position={position}
              loading="eager"
            />
          ))}
        </div>
      ) : (
        <Figure src={image} alt={`Превью проекта ${title}`} eager />
      )}
      <div className="case-meta">
        {meta.map(([k, v]) => (
          <div key={k}>
            <span>{k}</span>
            <p>{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
function NextProject({ href, no, title }) {
  return (
    <a href={href} className="next-project">
      <span>Следующий проект · {no}</span>
      <strong>{title}</strong>
      <i>→</i>
    </a>
  );
}
function StatBlocks({ items }) {
  return (
    <div className="problem-grid">
      {items.map((x, i) => (
        <article className="reveal" key={x[0]}>
          <span>0{i + 1}</span>
          <h3>{x[0]}</h3>
          <p>{x[1]}</p>
        </article>
      ))}
    </div>
  );
}

function Chubby() {
  return (
    <Layout className="case-page chubby-page">
      <RevealObserver />
      <CaseHero
        index="01"
        title="Chubby Hippo"
        subtitle="Адаптивный сайт азиатской пельменной"
        theme="chubby-theme"
        image={media(
          "chubby-hippo/website/apple-responsive-devices-mockup (1).webp",
        )}
        liveHref={links.chubbyLive}
        tags={[
          "UI/UX",
          "Веб-дизайн",
          "Дизайн-система",
          "Адаптивность",
          "Figma",
          "HTML/CSS/JS",
        ]}
        meta={[
          ["Тип", "Учебный проект"],
          [
            "Роль",
            "UI/UX-дизайнер · Визуальный дизайнер · Фронтенд-разработчик",
          ],
          ["Результат", "Адаптивные макеты и работающий сайт"],
        ]}
      />
      <nav className="case-nav" aria-label="Навигация по кейсу">
        <a href="#overview">Обзор</a>
        <a href="#process">Процесс</a>
        <a href="#system">Система</a>
        <a href="#responsive">Адаптивность</a>
        <a href="#prototype">Прототип</a>
      </nav>
      <section id="overview" className="case-section two-col">
        <SectionTitle
          eyebrow="01 · Обзор"
          title="Атмосферный сайт, в котором легко найти главное"
        />
        <div className="body-copy">
          <p>
            Задача — разработать современный адаптивный сайт для азиатской
            пельменной, познакомить с концепцией и меню и обеспечить быстрый
            доступ к информации о заведении и доставке.
          </p>
          <p>
            <strong>Цель:</strong> объединить выразительную визуальную
            айдентику, понятную структуру контента и удобный доступ к меню.
          </p>
        </div>
      </section>
      <section className="case-section audience">
        <p className="eyebrow">
          Предполагаемая аудитория · в рамках учебного проекта
        </p>
        <h2>
          Посетители, которые выбирают заведение или заказывают азиатскую кухню
        </h2>
        <div className="four-notes">
          <span>Быстро изучить меню</span>
          <span>Понять концепцию</span>
          <span>Увидеть блюда</span>
          <span>Найти доставку</span>
        </div>
      </section>
      <section id="process" className="case-section">
        <SectionTitle
          eyebrow="02 · Анализ и референсы"
          title="Визуальная и структурная база"
          text="Анализировались способы представления меню, визуальная иерархия и передача атмосферы на сайтах Maneki и J’PAN. Это анализ референсов, а не полноценное UX-исследование."
        />
        <div className="reference-grid">
          <Figure
            src={media("chubby-hippo/research/manekicafe.ru_.webp")}
            alt="Анализ сайта Maneki"
          />
          <Figure
            src={media("chubby-hippo/research/jpan.moscow_ (1).webp")}
            alt="Анализ сайта J’PAN"
          />
        </div>
      </section>
      <section className="case-section">
        <SectionTitle
          eyebrow="03 · Поиск направления"
          title="От первых концепций к итоговому направлению"
          text="Несколько вариантов главного экрана помогли выбрать более спокойную композицию, приглушённую зелёно-розовую палитру и элементы азиатской эстетики."
        />
        <div className="exploration-grid">
          {[
            ["Frame 6.webp", "01", "Первый вариант"],
            ["Frame 7.webp", "02", "Второй вариант"],
            ["pelmeni.webp", "03", "Выбранное направление"],
          ].map(([file, number, label]) => (
            <figure className="concept-card" key={file}>
              <div className="scroll-window">
                <img
                  src={media(`chubby-hippo/concept/${file}`)}
                  alt={`${label} главной страницы Chubby Hippo`}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span>{number}</span>
                {label}
                <small>Прокрутите макет</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="case-section before-after">
        <div className="compare-intro">
          <div>
            <p className="eyebrow">04 · От прототипа к интерфейсу</p>
            <h2>Одна структура — два уровня проработки</h2>
          </div>
          <p>
            Черновой прототип определил порядок блоков и композицию. Справа — та
            же страница после работы с цветом, типографикой, контентом и
            маскотом.
          </p>
        </div>
        <div className="compare-grid">
          <figure>
            <figcaption>
              <span>01</span> Черновой прототип <small>Прокрутите ↓</small>
            </figcaption>
            <div className="scroll-window">
              <img
                src={media("chubby-hippo/wireframe/ЧерновойПрототип.webp")}
                alt="Черновой прототип Chubby Hippo"
                loading="lazy"
              />
            </div>
          </figure>
          <figure>
            <figcaption>
              <span>02</span> Финальный интерфейс <small>Прокрутите ↓</small>
            </figcaption>
            <div className="scroll-window">
              <img
                src={media("chubby-hippo/website/lending/Компьютер.webp")}
                alt="Финальный интерфейс Chubby Hippo"
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </section>
      <section id="system" className="case-section system-section">
        <SectionTitle
          eyebrow="05–06 · Визуальная система"
          title="Айдентика и компоненты работают вместе"
          text="Приглушённая зелёно-розовая палитра объединяет интерфейс, а маскот поддерживает характер бренда. Повторяющиеся кнопки, поля и карточки собраны в согласованную систему."
        />
        <div className="brand-showcase">
          <figure className="brand-logo-card">
            <img
              src={media("chubby-hippo/branding/логостекстом.svg")}
              alt="Логотип Chubby Hippo"
              loading="lazy"
            />
            <figcaption>Логотип и фирменное написание</figcaption>
          </figure>
          <figure className="brand-mascot-card">
            <img
              src={media("chubby-hippo/branding/PelmenHippoHero.webp")}
              alt="Маскот Chubby Hippo с пельменем"
              loading="lazy"
            />
            <figcaption>Главный образ маскота</figcaption>
          </figure>
          <figure className="brand-mascot-card delivery-card">
            <img
              src={media("chubby-hippo/branding/СкутерДоставка.webp")}
              alt="Маскот Chubby Hippo на скутере"
              loading="lazy"
            />
            <figcaption>Иллюстрация для доставки</figcaption>
          </figure>
        </div>
        <div className="ui-kit-panel">
          <div>
            <p className="eyebrow">Система компонентов</p>
            <h3>Цвета, типографика и состояния компонентов</h3>
            <p>Макет можно прокрутить внутри блока ↓</p>
          </div>
          <div className="ui-kit-scroll">
            <img
              src={media("chubby-hippo/UI-kit/UI-kit.webp")}
              alt="UI-kit Chubby Hippo: цвета, типографика и компоненты"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="case-section final-ui">
        <SectionTitle
          eyebrow="07 · Финальный интерфейс"
          title="Главная страница и меню"
          text="Два ключевых экрана показаны рядом в одинаковом масштабе. Каждый макет можно прокрутить отдельно."
        />
        <div className="final-ui-grid">
          <figure>
            <figcaption>
              <span>01</span> Главная страница <small>Прокрутите ↓</small>
            </figcaption>
            <div className="scroll-window">
              <img
                src={media("chubby-hippo/website/lending/Компьютер.webp")}
                alt="Главная страница Chubby Hippo"
                loading="lazy"
              />
            </div>
          </figure>
          <figure>
            <figcaption>
              <span>02</span> Меню <small>Прокрутите ↓</small>
            </figcaption>
            <div className="scroll-window">
              <img
                src={media(
                  "chubby-hippo/website/screenshots/_Users_katyakor_Documents_VSCodeProjects_Pelmeni_menu.html.webp",
                )}
                alt="Страница меню Chubby Hippo"
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </section>
      <section id="responsive" className="case-section responsive-show">
        <SectionTitle
          eyebrow="08 · Адаптивный дизайн"
          title="Один стиль на разных устройствах"
          text="Макет адаптирован под разные размеры экранов с изменением сетки, композиции и расположения элементов."
        />
        <div className="responsive-mockups">
          <figure className="responsive-desktop-card">
            <figcaption>
              <span>Большие экраны</span>
              <small>Десктоп · ноутбук · планшет</small>
            </figcaption>
            <img
              src={media(
                "chubby-hippo/website/apple-responsive-devices-mockup (1).webp",
              )}
              alt="Chubby Hippo на компьютере, ноутбуке, планшете и телефоне"
              loading="lazy"
            />
          </figure>
          <figure className="responsive-mobile-card">
            <figcaption>
              <span>Мобильная версия</span>
              <small>Три состояния интерфейса</small>
            </figcaption>
            <img
              src={media(
                "chubby-hippo/website/multiple-three-phone-screens-mockup.webp",
              )}
              alt="Три мобильных экрана Chubby Hippo"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
      <section id="prototype" className="case-section link-panel">
        <div>
          <p className="eyebrow">09 · Интерактивный прототип</p>
          <h2>Сценарий можно пройти в Figma</h2>
        </div>
        <ArrowLink href={links.chubbyFigma} external>
          Открыть прототип в Figma
        </ArrowLink>
      </section>
      <section className="case-section build-flow">
        <SectionTitle
          eyebrow="10 · Дизайн → код"
          title="Макет стал работающим сайтом"
        />
        <div className="pipeline">
          <span>Figma</span>
          <i>→</i>
          <span>HTML / CSS / JavaScript</span>
          <i>→</i>
          <span>Работающий сайт</span>
        </div>
        <ArrowLink href={links.chubbyLive} external>
          Открыть сайт
        </ArrowLink>
      </section>
      <section className="case-section presentation-preview">
        <SectionTitle
          eyebrow="11 · Презентация"
          title="История проекта в 13 слайдах"
        />
        <div className="slide-row">
          {[1, 2, 3].map((n) => (
            <img
              key={n}
              src={`/media/presentations/prezentaciya-sajta/page-${String(n).padStart(2, "0")}.webp`}
              alt={`Презентация Chubby Hippo, слайд ${n}`}
              loading="lazy"
            />
          ))}
        </div>
      </section>
      <section className="case-section result">
        <p className="eyebrow">12 · Итог</p>
        <h2>
          Полный цикл: от анализа референсов и прототипирования до UI-kit,
          адаптивных макетов и реализации на HTML, CSS и JavaScript.
        </h2>
      </section>
      <NextProject href="/work/biometry" no="02" title="Госуслуги Биометрия" />
    </Layout>
  );
}

const flowData = {
  first: [
    ["Запуск приложения", "system"],
    ["Вход через Госуслуги", "important"],
    ["Подтверждение регистрации", "system"],
    ["Создание кода", "important"],
    ["Знакомство с сервисом", "help"],
    ["Выбор обучения", "decision"],
    ["Интерактивное обучение", "help"],
    ["Подготовка к сканированию", "help"],
    ["Сканирование", "important"],
    ["Успешное сканирование", "success"],
    ["Регистрация завершена", "success"],
    ["Главный экран", "system"],
  ],
  returning: [
    ["Запуск", "system"],
    ["Ввод кода", "important"],
    ["Главный экран", "system"],
    ["Выбор действия", "decision"],
    ["Подтверждение / обновление", "system"],
    ["Подготовка", "help"],
    ["Сканирование", "important"],
    ["Результат", "success"],
  ],
  errors: [
    ["Сканирование", "important"],
    ["Ошибка", "error"],
    ["Повторить / Отмена", "decision"],
    ["Плохое соединение", "error"],
    ["Повторить / Перезагрузить", "decision"],
    ["Попытка выхода", "error"],
    ["Продолжить / Выйти", "decision"],
    ["Инструкция и помощь", "help"],
    ["Оценка приложения", "system"],
  ],
};
function FlowDiagram() {
  const [tab, setTab] = useState("first");
  const labels = {
    first: "Первый вход",
    returning: "Повторное использование",
    errors: "Ошибки и альтернативы",
  };
  return (
    <div className="flow-widget">
      <div className="flow-tabs" role="tablist">
        {Object.entries(labels).map(([k, v]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flow" role="tabpanel">
        {flowData[tab].map(([x, c], i) => (
          <React.Fragment key={x + i}>
            <div className={`flow-node ${c}`}>{x}</div>
            {i < flowData[tab].length - 1 && (
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      {tab === "first" && (
        <div className="onboarding-detail">
          <span>Внутри обучения</span>
          <p>Освещение → Аксессуары → Положение руки → Рамка → Масштаб</p>
        </div>
      )}
      <div className="flow-legend">
        <i className="system" />
        Системный шаг
        <i className="important" />
        Действие
        <i className="help" />
        Обучение
        <i className="success" />
        Успех
        <i className="error" />
        Ошибка
      </div>
    </div>
  );
}
function Phone({ name, label }) {
  return (
    <figure className="phone">
      <img
        src={media(`gosuslugi/screenshots/${name}.webp`)}
        alt={label}
        loading="lazy"
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}
function Biometry() {
  return (
    <Layout className="case-page bio-page">
      <RevealObserver />
      <CaseHero
        index="02"
        title={
          <>
            Госуслуги
            <br />
            Биометрия
          </>
        }
        subtitle="Иммерсивный интерфейс регистрации биометрии по рисунку вен ладони"
        theme="bio-theme"
        image={media("gosuslugi/floating-iphones-14-pro-max.webp")}
        tags={[
          "UX/UI",
          "Мобильный интерфейс",
          "Figma",
          "Интерактивный прототип",
          "Пользовательские сценарии",
          "Immersive UI",
        ]}
        meta={[
          ["Тип", "Учебный проект"],
          ["Фокус", "Первый вход · обучение · сканирование · ошибки"],
          ["Результат", "Полный интерактивный прототип"],
        ]}
      />
      <nav className="case-nav" aria-label="Навигация по кейсу">
        <a href="#challenge">Задача</a>
        <a href="#user-flow">Сценарии</a>
        <a href="#onboarding">Обучение</a>
        <a href="#scanning">Сканирование</a>
        <a href="#bio-prototype">Прототип</a>
      </nav>
      <section id="challenge" className="case-section two-col">
        <SectionTitle
          eyebrow="01 · Задача"
          title="Объяснить новую технологию через интерфейс"
        />
        <div className="body-copy">
          <p>
            Задача — разработать полную версию интерактивного иммерсивного
            интерфейса с учётом брендбука и паттернов выбранной ОС.
          </p>
          <p>
            Особое внимание уделено процессу сканирования, понятности новой
            биометрической технологии и состояниям, возникающим по пути.
          </p>
        </div>
      </section>
      <section className="case-section">
        <StatBlocks
          items={[
            [
              "Как это работает?",
              "Новая технология может быть непонятна пользователю.",
            ],
            [
              "Безопасны ли мои данные?",
              "Работа с биометрией требует высокого уровня доверия.",
            ],
            [
              "Правильно ли я всё делаю?",
              "Во время сканирования можно неправильно расположить руку.",
            ],
          ]}
        />
      </section>
      <section className="case-section audience bio-audience">
        <p className="eyebrow">Целевая аудитория</p>
        <h2>Пользователи с разным уровнем цифровой грамотности</h2>
        <div className="four-notes">
          <span>Простота</span>
          <span>Понятные инструкции</span>
          <span>Визуальная обратная связь</span>
          <span>Доступность помощи</span>
        </div>
      </section>
      <section id="user-flow" className="case-section">
        <SectionTitle
          eyebrow="02 · Пользовательские сценарии"
          title="Основные и альтернативные сценарии"
          text="Первый вход содержит обучение, повторный — сразу ведёт к основным действиям. Ошибки и отмена вынесены в отдельные ветки."
        />
        <FlowDiagram />
      </section>
      <section id="onboarding" className="case-section onboarding">
        <SectionTitle
          eyebrow="03 · Интерактивное обучение"
          title="Короткое обучение вместо длинной инструкции"
          text="Перед первым сканированием пользователь проходит последовательность: освещение, аксессуары, положение руки, размещение ладони и расстояние. Решение призвано снизить вероятность ошибок."
        />
        <div className="phone-strip">
          {[
            ["Обучение 2", "Освещение"],
            ["Обучение 3", "Аксессуары"],
            ["Обучение 5", "Положение руки"],
            ["Обучение 7", "Ладонь в рамке"],
            ["Обучение 9", "Масштаб"],
          ].map((x) => (
            <Phone name={x[0]} label={x[1]} key={x[0]} />
          ))}
        </div>
      </section>
      <section id="scanning" className="case-section scanning">
        <SectionTitle
          eyebrow="04 · Иммерсивное сканирование"
          title="Понятная обратная связь на каждом этапе"
        />
        <div className="scan-stages">
          {[
            ["Подготовка", "Подготовка"],
            ["Запуск сканирования", "Сканирование"],
            ["Процесс1", "Обработка"],
            ["Успех", "Успех"],
            ["Ошибка", "Ошибка"],
          ].map((x) => (
            <Phone name={x[0]} label={x[1]} key={x[0]} />
          ))}
        </div>
        <div className="annotations">
          <span>Положение ладони</span>
          <span>Линия сканирования</span>
          <span>Отображение прогресса</span>
          <span>Состояния успеха и ошибки</span>
        </div>
      </section>
      <section className="case-section states">
        <SectionTitle
          eyebrow="05 · Ошибки и альтернативы"
          title="Интерфейс не обрывается при ошибке"
        />
        <div className="phone-strip compact">
          {[
            ["Плохое интернет-соединение", "Нет соединения"],
            ["Отказ от сканирования", "Отмена сканирования"],
            ["Отказ от обучения", "Пропуск обучения"],
            ["Настройки", "Настройки"],
            ["Оценка приложения", "Обратная связь"],
          ].map((x) => (
            <Phone name={x[0]} label={x[1]} key={x[0]} />
          ))}
        </div>
      </section>
      <section id="bio-prototype" className="case-section link-panel bio-link">
        <div>
          <p className="eyebrow">06 · Интерактивный прототип</p>
          <h2>Пройти сценарий целиком</h2>
        </div>
        <ArrowLink href={links.biometryFigma} external>
          Попробовать прототип
        </ArrowLink>
      </section>
      <section className="case-section result">
        <p className="eyebrow">07 · Итог</p>
        <h2>
          Первый и повторный вход, обучение, сканирование, обработка данных,
          успешный результат, ошибки, отмена, отсутствие сети, контекстная
          помощь и обратная связь — в одном интерактивном Figma-прототипе.
        </h2>
      </section>
      <NextProject
        href="/work/presentations"
        no="03"
        title="Дизайн презентаций"
      />
    </Layout>
  );
}

function Modal({ open, onClose, children, label }) {
  const ref = useRef();
  useEffect(() => {
    if (!open) return;
    const key = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    ref.current?.focus();
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", key);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex="-1"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
function PresentationViewer({ deck, onClose }) {
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [deck]);
  if (!deck) return null;
  return (
    <Modal open={!!deck} onClose={onClose} label={`Презентация ${deck.title}`}>
      <div className="viewer-bar">
        <div>
          <strong>{deck.title}</strong>
          <span>
            {String(page).padStart(2, "0")} / {deck.pages}
          </span>
        </div>
        <div>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Предыдущий слайд"
          >
            ←
          </button>
          <button
            onClick={() => setPage(Math.min(deck.pages, page + 1))}
            disabled={page === deck.pages}
            aria-label="Следующий слайд"
          >
            →
          </button>
          <button onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>
      </div>
      <img
        className="viewer-slide"
        src={`/media/presentations/${deck.slug}/page-${String(page).padStart(2, "0")}.webp`}
        alt={`${deck.title}, слайд ${page}`}
      />
    </Modal>
  );
}
function Presentations() {
  const [deck, setDeck] = useState(null);
  return (
    <Layout className="gallery-page">
      <RevealObserver />
      <section className="gallery-hero">
        <a className="back" href="/#work">
          ← Все проекты
        </a>
        <p className="eyebrow">03 · Визуальная подача</p>
        <h1>
          Дизайн
          <br />
          презентаций
        </h1>
        <p>
          Учебные и проектные презентации: визуальная структура, типографика и
          последовательная подача материала.
        </p>
      </section>
      <section className="deck-grid">
        {presentationDecks.map((d) => (
          <button
            className="deck-card reveal"
            key={d.title}
            onClick={() => setDeck(d)}
          >
            <img
              src={`/media/presentations/${d.slug}/page-01.webp`}
              alt=""
              loading="lazy"
            />
            <span>{d.type}</span>
            <h2>{d.title}</h2>
            <p>
              {d.pages} страниц <i>Открыть ↗</i>
            </p>
          </button>
        ))}
        <article className="pptx-card reveal">
          <span>Интерактивный PowerPoint</span>
          <div className="ppt-icon">P</div>
          <h2>Michelangelo («March6»)</h2>
          <p>Интерактивная презентация PowerPoint</p>
          <ArrowLink href="/docs/michelangelo-march6.pptx" download>
            Скачать PPTX
          </ArrowLink>
        </article>
      </section>
      <PresentationViewer deck={deck} onClose={() => setDeck(null)} />
      <NextProject
        href="/work/graphic-design"
        no="04"
        title="Графика и иллюстрация"
      />
    </Layout>
  );
}

const graphicItems = [
  ["illustrator/Работа1Коты.webp", "Коты", "Векторная графика"],
  ["illustrator/Работа43D.webp", "Объёмный эффект", "Графический эффект"],
  ["illustrator/Лефлет/Лефлет1.webp", "Лефлет · сторона 1", "Печатный дизайн"],
  ["illustrator/Лефлет/Лефлет2.webp", "Лефлет · сторона 2", "Печатный дизайн"],
  ["illustrator/ПлакатыВалорант/сага.webp", "Sage", "Серия постеров Valorant"],
  ["illustrator/ПлакатыВалорант/клов.webp", "Clove", "Серия постеров Valorant"],
  ["illustrator/ПлакатыВалорант/айсо.webp", "Iso", "Серия постеров Valorant"],
];
function Lightbox({ index, setIndex }) {
  const item = index !== null ? graphicItems[index] : null;
  useEffect(() => {
    if (!item) return;
    const k = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowLeft")
        setIndex((index - 1 + graphicItems.length) % graphicItems.length);
      if (e.key === "ArrowRight") setIndex((index + 1) % graphicItems.length);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [item, index, setIndex]);
  return (
    <Modal
      open={!!item}
      onClose={() => setIndex(null)}
      label="Просмотр графической работы"
    >
      {item && (
        <>
          <div className="lightbox-bar">
            <div>
              <span>{item[2]}</span>
              <strong>{item[1]}</strong>
            </div>
            <div>
              <button
                onClick={() =>
                  setIndex(
                    (index - 1 + graphicItems.length) % graphicItems.length,
                  )
                }
                aria-label="Предыдущая"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((index + 1) % graphicItems.length)}
                aria-label="Следующая"
              >
                →
              </button>
              <button onClick={() => setIndex(null)} aria-label="Закрыть">
                ×
              </button>
            </div>
          </div>
          <img className="lightbox-image" src={media(item[0])} alt={item[1]} />
        </>
      )}
    </Modal>
  );
}
function Graphic() {
  const [index, setIndex] = useState(null);
  return (
    <Layout className="gallery-page graphic-page">
      <RevealObserver />
      <section className="gallery-hero">
        <a className="back" href="/#work">
          ← Все проекты
        </a>
        <p className="eyebrow">04 · Adobe Illustrator</p>
        <h1>
          Графика и<br />
          иллюстрация
        </h1>
        <p>
          Векторная графика, печатные макеты, визуальные эффекты и серия
          постеров.
        </p>
      </section>
      <section className="graphic-gallery graphic-sections">
        <div className="graphic-section-heading">
          <p className="eyebrow">Вектор и эффекты</p>
          <h2>Разные техники — ясная структура</h2>
        </div>
        <div className="graphic-feature-grid">
          {graphicItems.slice(0, 2).map((x, i) => (
            <button onClick={() => setIndex(i)} key={x[0]}>
              <div className="graphic-canvas">
                <img src={media(x[0])} alt={x[1]} loading="lazy" />
              </div>
              <span>{x[2]}</span>
              <strong>{x[1]}</strong>
            </button>
          ))}
        </div>
        <div className="graphic-section-heading leaflet-heading">
          <p className="eyebrow">Печатный дизайн</p>
          <h2>Лефлет — две стороны одного макета</h2>
        </div>
        <div className="leaflet-grid">
          {graphicItems.slice(2, 4).map((x, i) => (
            <button onClick={() => setIndex(i + 2)} key={x[0]}>
              <div className="graphic-canvas">
                <img src={media(x[0])} alt={x[1]} loading="lazy" />
              </div>
              <span>{x[1]}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="valorant">
        <SectionTitle
          eyebrow="Серия постеров"
          title="Valorant — единый визуальный язык"
          text="Три постера собраны как серия: одинаковый формат и принцип композиции, разные персонажи и цветовые акценты."
        />
        <div>
          {graphicItems.slice(4).map((x, i) => (
            <button onClick={() => setIndex(i + 4)} key={x[0]}>
              <img
                src={media(x[0])}
                alt={`Постер Valorant: ${x[1]}`}
                loading="lazy"
              />
              <span>{x[1]}</span>
            </button>
          ))}
        </div>
      </section>
      <Lightbox index={index} setIndex={setIndex} />
      <NextProject
        href="/work/ai-stickers"
        no="05"
        title="AI-стикеры с бегемотом"
      />
    </Layout>
  );
}

function Stickers() {
  return (
    <Layout className="stickers-page">
      <RevealObserver />
      <section className="stickers-hero">
        <a className="back" href="/#work">
          ← Все проекты
        </a>
        <div>
          <p className="eyebrow">05 · Мини-кейс</p>
          <h1>
            AI Hippo
            <br />
            Stickers
          </h1>
          <p>
            Серия из более чем 100 Telegram-стикеров, созданная с использованием
            генеративных AI-инструментов.
          </p>
          <Tags
            items={[
              "Generative AI",
              "Character Consistency",
              "Illustration",
              "Telegram Stickers",
            ]}
          />
        </div>
        <img
          src={media(`ai-stickers/${stickerFiles[6]}`)}
          alt="Розовый бегемот со стопкой блинов"
        />
      </section>
      <section className="case-section two-col sticker-task">
        <SectionTitle
          eyebrow="Задача"
          title="Один персонаж — множество состояний"
        />
        <div className="body-copy">
          <p>
            Главная задача — сохранить узнаваемость и визуальную целостность
            одного персонажа-бегемота в разных эмоциях, позах и ситуациях.
          </p>
          <p>
            Использование генеративного AI — осознанная часть процесса и
            визуального эксперимента.
          </p>
        </div>
      </section>
      <section className="sticker-grid">
        {stickerFiles.map((x, i) => (
          <figure key={x} style={{ "--i": i }}>
            <img
              src={media(`ai-stickers/${x}`)}
              alt={`AI-стикер с розовым бегемотом, вариант ${i + 1}`}
              loading="lazy"
            />
          </figure>
        ))}
      </section>
      <section className="sticker-cta">
        <p>100+ эмоций, поз и ситуаций</p>
        <ArrowLink href={links.stickers} external>
          Смотреть весь стикерпак
        </ArrowLink>
      </section>
      <NextProject href="/work/chubby-hippo" no="01" title="Chubby Hippo" />
    </Layout>
  );
}

function About() {
  return (
    <Layout className="about-page">
      <RevealObserver />
      <section className="profile-index-hero">
        <div className="index-hero__topline">
          <p className="eyebrow">Профиль дизайнера</p>
          <span>Екатерина Королёва · Страница 02</span>
        </div>
        <div className="profile-word" aria-label="Обо мне">
          <span>ОБО</span>
          <span>МНЕ</span>
        </div>
        <div className="profile-intro">
          <p>
            Я UI/UX-дизайнер и студентка 3 курса РГУ им. А.Н. Косыгина. Учусь
            на направлении «Информационные системы и технологии» и соединяю
            проектирование интерфейсов с пониманием их реализации.
          </p>
        </div>
        <figure className="profile-index-photo">
          <img
            src={media("profile/ProfilePhoto.webp")}
            alt="Екатерина Королёва"
            fetchPriority="high"
          />
          <figcaption>
            <span>Екатерина Королёва</span>
            <span>UI/UX · Frontend</span>
          </figcaption>
        </figure>
        <div className="profile-facts" aria-label="Кратко обо мне">
          <span><b>03</b> курс</span>
          <span><b>Москва</b> Россия</span>
          <span><b>UI / UX</b> основная специализация</span>
          <span><b>HTML / CSS / JS</b> понимание реализации</span>
        </div>
      </section>
      <section className="about-details">
        <div>
          <p className="eyebrow">Подход</p>
          <h2>Учитываю реализацию интерфейса ещё на этапе проектирования</h2>
        </div>
        <p>
          Сочетание дизайн-практики и фронтенд-навыков помогает видеть не только
          визуальную часть, но и поведение компонентов, адаптивность и
          технические ограничения.
        </p>
      </section>
      <section className="toolbox">
        <p className="eyebrow">Инструменты и навыки</p>
        <div>
          {[
            "Figma",
            "Дизайн интерфейсов",
            "Проектирование UX",
            "Интерактивные прототипы",
            "Дизайн-системы",
            "Adobe Illustrator",
            "HTML",
            "CSS",
            "JavaScript",
            "Генеративная графика",
          ].map((x, i) => (
            <span key={x}>
              <i>{String(i + 1).padStart(2, "0")}</i>
              {x}
            </span>
          ))}
        </div>
      </section>
      <Contact />
    </Layout>
  );
}

const routes = {
  "/": Home,
  "/work/chubby-hippo": Chubby,
  "/work/biometry": Biometry,
  "/work/presentations": Presentations,
  "/work/graphic-design": Graphic,
  "/work/ai-stickers": Stickers,
  "/about": About,
};
const titles = {
  "/": "Екатерина Королёва — UI/UX-дизайнер",
  "/work/chubby-hippo": "Chubby Hippo — Екатерина Королёва",
  "/work/biometry": "Госуслуги Биометрия — Екатерина Королёва",
  "/work/presentations": "Дизайн презентаций — Екатерина Королёва",
  "/work/graphic-design": "Графика и иллюстрация — Екатерина Королёва",
  "/work/ai-stickers": "AI-стикеры с бегемотом — Екатерина Королёва",
  "/about": "Обо мне — Екатерина Королёва",
};
export default function App() {
  let path = window.location.pathname.replace(/\/$/, "") || "/";
  const Page = routes[path] || Home;
  useEffect(() => {
    document.title = titles[path] || titles["/"];
  }, [path]);
  return <Page />;
}
