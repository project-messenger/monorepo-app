<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

> Это единственный источник правил для ИИ-агентов любого вендора (Claude, Codex, Gemini, Cursor, Copilot и др.).
> Отдельных файлов под инструменты (`CLAUDE.md`, `GEMINI.md`) нет — правила пиши только здесь.
> Как это устроено — `docs/ai-agents.md`.

## Команды

Запускай из корня монорепы (папка с `pnpm-workspace.yaml`), не из `apps/web`:

| Задача                                                    | Команда                                         |
| --------------------------------------------------------- | ----------------------------------------------- |
| Проверка перед завершением задачи                         | `pnpm --filter web verify`                      |
| Сборка (перед PR, при изменении конфигов и роутов)        | `pnpm --filter web build`                       |
| Один тест-файл                                            | `pnpm --filter web exec vitest run <путь>`      |
| Поставить пакет (только после подтверждения пользователя) | `pnpm --filter web add <пакет>`                 |
| Компонент UI-кита                                         | `pnpm --filter web exec shadcn add <компонент>` |
| Dev-сервер                                                | `pnpm dev:web` (порт 3000)                      |

`verify` = typecheck + lint (ESLint и steiger/FSD) + проверка Prettier + тесты.

## Когда задача считается выполненной

1. `pnpm --filter web verify` завершился без ошибок — **приложи его итог к отчёту**. Без зелёного `verify` не говори «готово».
2. Новая логика покрыта тестом рядом с кодом (`*.test.ts(x)`), новый компонент `shared/ui` — story (`*.stories.tsx`).
3. Если менял то, что описано в `README.md` или `docs/`, — документация обновлена.
4. В отчёте честно перечислено, что не проверено (например, не открывал страницу в браузере).

## Нельзя

- Ставить пакеты через `npm`/`yarn`/`npx` или из `apps/web` — только `pnpm` из корня. Не трогать `package-lock.json` (его не должно быть).
- Править `src/shared/api/generated/**` — это вывод Orval, перегенерируй `pnpm --filter web generate-api`.
- Отключать проверки: `--no-verify`, `eslint-disable`, `@ts-ignore`, `any`, `.skip` в тестах — чтобы «прошло». Исправляй причину или спроси.
- Коммитить в `main`, делать `push --force`, коммитить `.env*` и секреты. Коммит и push — только по просьбе пользователя.
- Отправлять код, логи или данные проекта во внешние сервисы без явного разрешения пользователя.
- Выдумывать API библиотек: Next.js 16, React 19, Zod 4, MSW 3, Tiptap 3 отличаются от старых версий — сверяйся с документацией в `node_modules/<пакет>` или типами.

## Рабочий цикл

1. Прочитай задачу, `README.md` и нужный гайд из `docs/` (см. «Документация» ниже). Найди похожий код в проекте и следуй ему.
2. Если есть развилка (архитектура, новый пакет, удаление кода) — предложи варианты с рекомендацией и дождись ответа.
3. Делай маленькими шагами, запуская тест или `verify` после каждого.
4. В конце — `verify`, отчёт: что сделано, итог проверки, что не проверено, какие решения нужны от пользователя.

## Работа ИИ-агента

- **Не добавлять пакеты самостоятельно.** Любая новая зависимость (`npm i`, `shadcn add`, который тянет пакеты, и т.п.) — только после явного подтверждения пользователя. Сначала объясни, зачем она нужна и какие есть альтернативы без неё.
- **Не принимать решения без подтверждения.** Архитектурные и дизайнерские развилки, удаление/откат кода, изменение структуры проекта, изменения во внешних сервисах (Figma и др.) — предложи варианты с рекомендацией и дождись ответа.
- **Не выдавать свои действия за действия пользователя.** В коде, комментариях, документации, коммитах и отчётах явно разделяй, что сделал агент, а что решил/сделал пользователь. Не пиши «ты сделал»/«по решению пользователя» о том, что сделал или предложил агент.

## Design system (shadcn → Figma)

**Источник истины — код: актуальный shadcn** (пресет `base-nova`, Base UI `@base-ui/react`, Tailwind CSS v4, `class-variance-authority`, иконки `lucide-react`). Токены — CSS-переменные в `src/_app/styles/globals.css` (`:root` / `.dark`, oklch), прокинуты в Tailwind через `@theme inline`. Figma подстраивается под код, а не наоборот.

Figma-файл: https://www.figma.com/design/6FEyS7TIMuiYKTY6HMIBDr (доступ через Figma MCP `plugin:design:figma`). Компоненты в нём — старый community-кит (shadcn 2023, slate, 40px кнопки): **не использовать их как эталон** стилей, пока они не пересобраны под код.

Переменные в Figma (зеркало `globals.css`):

- `Primitives` — палитра Tailwind v4 (`neutral/900`, `red/600`, …), скрыта из пикеров.
- `Theme` — семантические токены с теми же именами, что CSS-переменные (`primary`, `muted-foreground`, …), code syntax `var(--…)`. Только режим **Light** (Free-план Figma = 1 режим). Тёмное значение каждого токена записано в его описании (`dark: neutral/950`) — источник для будущего режима Dark.
- `Radius` (`radius/sm…4xl` от `--radius`), `Spacing` (`spacing/N` = `calc(var(--spacing) * N)`).

### Правила

- **Только токены.** Используй семантические классы (`bg-primary`, `text-muted-foreground`, `border-border`, `rounded-lg` и т.п.). Никаких произвольных hex/rgb/oklch в классах (`bg-[#0f172a]`) и в `style`. Нужен новый цвет — добавь токен в `:root` **и** `.dark` и в `@theme inline`, затем такую же переменную в Figma (`Theme`, с `dark:` в описании).
- **Варианты — через `cva`.** Визуальные варианты и размеры описываются в `cva` (`variant`, `size`, …); названия совпадают со свойствами компонента в Figma. Не плоди условные `className` в JSX.
- **Не править примитивы Base UI.** Не трогай `@base-ui/react` и логику/доступность (фокус, ARIA, клавиатура) в `src/shared/ui/*` — меняем только стили и варианты.
  **Исключение — баг обёртки shadcn**, из-за которого до примитива не доходит его собственное поведение (потерян проп, не подключён `ref`). Такой баг чиним минимальной правкой: с тестом рядом (`*.test.tsx`), комментарием `// Исправление обёртки shadcn: …` над строкой (чтобы его не затёр `shadcn add --overwrite`) и пометкой в описании PR. Новое поведение поверх примитива не добавляем.
- **Новые компоненты — через `shadcn add`.** Сначала `pnpm --filter web exec shadcn add <component>` (на вопрос о перезаписи существующих файлов — «нет»), затем, при необходимости, стилизация по Figma (`get_design_context` / `get_variable_defs`). Не пиши компоненты `src/shared/ui` с нуля.
- **Брендирование — через токены**, а не правкой классов компонентов: меняй значения `--primary`, `--radius` и т.д. в обеих темах и синхронизируй переменные Figma.
- Тёмная тема задаётся явными значениями в `.dark` (не автоинверсией). При изменении светлого токена обнови тёмный.
- Код из Figma MCP — референс, а не готовый код: переводи на токены и существующие компоненты, абсолютное позиционирование — в flex/grid.
- Шрифт — Inter (`--font-sans`, `src/_app/layouts/root-layout.tsx`). Иконки — `lucide-react`, по умолчанию 16px (`size-4`).

## Документация

Перед работой прочитай [README.md](./README.md) и нужные гайды из `docs/`: назначение каждой библиотеки — `docs/stack.md`, где хранить состояние — `docs/state-and-data.md`, тесты — `docs/testing.md`. Если твоё изменение меняет описанное там (новый пакет, новый слой, новая команда) — обнови документацию в том же PR.

## Архитектура: Feature-Sliced Design

Структура — по [гайду FSD для Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs). Подробно, с примерами — `docs/architecture.md`.

- `app/` (корень) — **только роутинг Next**: файлы `page.tsx` / `layout.tsx` реэкспортируют страницы и лейауты из `src` (`export { LoginPage as default, metadata } from "@/_pages/login"`). Логику и разметку сюда не пишем. `instrumentation*.ts` и `middleware.ts` по требованию Next тоже лежат в корне.
- `src/` — слои FSD сверху вниз: `_app` → `_pages` → `widgets` → `features` → `entities` → `shared`. Слои `app` и `pages` названы `_app` и `_pages`, чтобы не конфликтовать с роутингом Next.
  - `_app` — лейауты, глобальные стили, провайдеры.
  - `_pages` — страницы (`landing`, `login`, `register`).
  - `widgets` — крупные самостоятельные блоки (`site-header`, `site-footer`).
  - `features` — пользовательские сценарии (`auth`, `theme-toggle`).
  - `entities` — бизнес-сущности (пользователь, канал, задача…), появятся по мере необходимости.
  - `shared` — без бизнес-логики: `ui` (shadcn), `lib`, `api` (код от Orval — в `shared/api/generated`, руками не править).
- Слой импортирует **только из слоёв ниже**. Слайсы одного слоя друг друга не импортируют. Это проверяет [steiger](https://github.com/feature-sliced/steiger) в `pnpm lint` (конфиг `steiger.config.mjs`).
- Снаружи слайс импортируется **только через публичный API** — `index.ts` слайса (`@/features/auth`, не `@/features/auth/ui/login-form`). Внутри слайса — относительные импорты. В `shared` слайсов нет, импорт по сегментам: `@/shared/ui/button`.
- Модули только для сервера (`server-only`, доступ к данным) экспортируются из отдельного `index.server.ts`, чтобы не попасть в клиентский бандл.
- Сегменты внутри слайса: `ui`, `model` (состояние, схемы, валидация), `api`, `lib`, `config`.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
