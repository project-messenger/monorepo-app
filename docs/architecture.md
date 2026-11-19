# Архитектура монорепы

[← к документации](./README.md)

Командный мессенджер: чаты, канбан-задачи, интеграция с GitHub, ИИ-ассистент. Внутреннее устройство фронтенда
(FSD, слои) — в [`apps/web/docs/architecture.md`](../apps/web/docs/architecture.md).

## Части проекта

```
monorepo-app/
├── apps/web          # фронтенд: Next.js 16, React 19, FSD            → :3000
├── apps/api          # бэкенд: NestJS 12 (ESM)                         → :3001
├── packages/shared   # @app/shared: zod-схемы, типы, события сокетов — общие для web и api
├── docs/             # документация всего проекта (вы здесь)
├── AGENTS.md         # правила для ИИ-агентов (+ AGENTS.md в каждом пакете)
└── .github/          # CI и шаблон PR
```

- **pnpm workspaces** связывают пакеты: `"@app/shared": "workspace:^"` — ссылка на папку, а не пакет из npm.
  Изменили `packages/shared` — оба приложения видят изменения сразу.
- **Turborepo** запускает задачи (`dev`, `build`, `lint`, `typecheck`) во всех пакетах и кэширует результат.
- `@app/shared` отдаёт исходники TypeScript без сборки; во фронтенде он указан в `transpilePackages`.

## Как всё связано

```mermaid
flowchart LR
    Browser["Браузер"] --> Web["apps/web<br/>Next.js :3000"]
    Web -- "HTTP<br/>(клиент от Orval)" --> API["apps/api<br/>NestJS :3001"]
    Web <-- "WebSocket<br/>(socket.io)" --> API
    API --> PG[("PostgreSQL")]
    API --> Redis[("Redis")]
    Shared["packages/shared<br/>события WebSocket"] -. "импорт" .-> Web
    Shared -. "импорт" .-> API
```

PostgreSQL, Redis и WebSocket на бэкенде ещё не подключены — это план, а не текущее состояние.
Для локальной инфраструктуры используется корневой `docker-compose.yml`: PostgreSQL 18.7 и Redis 8.10.3,
порты только на `127.0.0.1`, отдельные именованные volumes, healthcheck и `pnpm infra:up` с ожиданием готовности.
Redis использует AOF с синхронизацией раз в секунду. Решение — [ADR-0010](./adr/0010-local-infrastructure.md).
Команды и хранение данных — в [корневом README](../README.md#локальные-postgresql-и-redis).

## Контракт фронтенд ↔ бэкенд

Решение и его причины — [ADR-0009](./adr/0009-api-contract-openapi-orval.md).

- **HTTP — OpenAPI от бэкенда + Orval.** DTO (описание запросов и ответов) — Zod-схемы в `apps/api`, не модели
  Prisma. Из них `@nestjs/swagger` строит схему, она лежит файлом `apps/api/openapi.json` в репозитории, а фронтенд
  генерирует из неё типы, хуки TanStack Query и Zod-схемы для форм: `pnpm --filter web generate-api` →
  `apps/web/src/shared/api/generated/`. HTTP-схем руками на фронтенде и в `@app/shared` не пишем.
- **WebSocket — `@app/shared`.** Swagger не описывает события socket.io, поэтому их названия и Zod-схемы данных
  лежат в общем пакете и импортируются обеими сторонами.
- **Все HTTP-пути бэкенда начинаются с `/api`**, версии в пути нет. Бэкенд разрешает CORS только для адреса из
  `CORS_ORIGIN`.

Swagger UI — `/api/docs` на запущенном бэкенде, а файл `apps/api/openapi.json` пишет команда `pnpm --filter api openapi`
без запуска сервера; Orval генерирует клиент из этого файла. CI пересоздаёт файл и клиент и падает, если они отличаются
от закоммиченных. Эндпоинты, которые нужны фронтенду, описываем в задаче Jira (метод, путь, запрос, ответ, ошибки)
**до** начала работы, а пока эндпоинта нет — фронтенд работает на моках MSW (`apps/web/src/shared/api/mocks/`).

Изменение контракта — всегда изменение для обеих сторон: в одном PR обновляются `apps/api`, `apps/web` и (для
событий WebSocket) `packages/shared`, в описании PR указано, совместимо ли оно назад. Код такого PR ревьюит второй
бэкендер, а контракт — фронтендер, который будет его использовать: отметьте его в PR.

## Авторизация

Способ входа и хранения сессии **ещё не выбран** — решение будет оформлено ADR. Код входа в
`apps/web/src/features/auth` (кнопки Google/GitHub, формы) — заготовка из шаблона, а не принятый контракт: не
стройте под него бэкенд, пока нет ADR. Что нужно решить — [docs/backlog/auth.md](./backlog/auth.md).

## Переменные окружения

| Где                   | Кто читает                             | Шаблон                                              |
| --------------------- | -------------------------------------- | --------------------------------------------------- |
| `.env` в корне        | Docker Compose (приложения пока не читают) | [`.env.example`](../.env.example)                |
| `apps/web/.env.local` | Next.js (читает только из своей папки) | [`apps/web/.env.example`](../apps/web/.env.example) |
| `apps/api/.env`       | `ConfigModule` из `@nestjs/config`     | [`apps/api/.env.example`](../apps/api/.env.example) |

Бэкенд читает `apps/api/.env` и переменные окружения терминала (они важнее файла) и при старте проверяет их
Zod-схемой [`apps/api/src/config/env.schema.ts`](../apps/api/src/config/env.schema.ts): неверное значение — бэкенд
не запускается и называет переменную. В коде значения берутся через `ConfigService`, а не из `process.env`. Новая
переменная бэкенда — добавить её в схему и в `apps/api/.env.example`.

`.env` в корне пока никто из приложений не читает, а Turborepo не передаёт его в окружение задач.

`.env*` в git не коммитим, шаблоны `.env.example` — коммитим. Подробно — [Процесс работы](./workflow.md#секреты-и-переменные-окружения).

## Проверки

| Где                   | Команда                                            |
| --------------------- | -------------------------------------------------- |
| Вся монорепа (как CI) | `pnpm typecheck && pnpm lint && pnpm build`        |
| Фронтенд              | `pnpm --filter web verify`                         |
| Бэкенд                | `pnpm --filter api lint && pnpm --filter api test` |

CI (`.github/workflows/ci.yml`) пока запускает только typecheck, lint, build и проверку контракта API — тестов и
Prettier в нём нет. Подробнее — [`apps/web/docs/tooling.md`](../apps/web/docs/tooling.md#ci).
