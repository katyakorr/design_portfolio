# Портфолио Екатерины Королёвой

Production-ready portfolio website на React + Vite. Контент и изображения собраны из реальных материалов в `assets/`; исходные файлы не изменены.

## Локальный запуск

Требуется Node.js 20.19+.

На macOS можно дважды нажать `start-portfolio.command` — launcher сам запустит сервер и откроет браузер. Открытие исходного `index.html` через `file://` не поддерживается React/Vite; вместо пустой страницы он показывает инструкцию по запуску.

```bash
pnpm install
pnpm dev
```

Production-сборка:

```bash
pnpm build
pnpm preview
```

Готовые файлы появятся в `dist/`. Файл `404.html` создаётся автоматически для поддержки прямых SPA-маршрутов на статическом хостинге.

## Структура

- `src/content.js` — централизованные проекты, ссылки и метаданные;
- `src/App.jsx` — страницы и интерактивные компоненты;
- `src/styles.css` — дизайн-токены, сетка и responsive styles;
- `public/media/` — оптимизированные WebP-копии;
- `public/docs/` — презентации для viewer/download;
- `scripts/prepare-assets.py` — повторяемая подготовка WebP и preview страниц PDF.

## Маршруты

- `/`
- `/work/chubby-hippo`
- `/work/biometry`
- `/work/presentations`
- `/work/graphic-design`
- `/work/ai-stickers`
- `/about`
