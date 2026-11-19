# Бэкенд (`apps/api`)

API командного мессенджера на **NestJS 12** (ESM, Vitest). Порт — `3001`.

Это часть монорепы. Общие команды, порты и устройство проекта — в [корневом README](../../README.md) и
[`docs/architecture.md`](../../docs/architecture.md). Правила для ИИ-агентов — в [AGENTS.md](./AGENTS.md).

## Состояние

Пока это заготовка: есть только `GET /api/health` — проверка, что бэкенд запущен. Его модуль
[`src/health/`](./src/health/) — образец для новых: модуль, контроллер, сервис, тесты. Подключены конфигурация (см.
ниже), префикс `/api` у всех путей, CORS для адреса фронтенда и корректная остановка — общие настройки лежат в
[`src/app.setup.ts`](./src/app.setup.ts), их вызывают и `main.ts`, и e2e-тесты. Описание API — Swagger UI на
[`localhost:3001/api/docs`](http://localhost:3001/api/docs) и файл [`openapi.json`](./openapi.json), из которого
фронтенд генерирует клиент ([ADR-0009](../../docs/adr/0009-api-contract-openapi-orval.md)). Ещё не подключены
PostgreSQL + Prisma, Redis и WebSocket — каждое из этого отдельная задача. Открытые решения, которые касаются бэкенда, —
в [`docs/adr/`](../../docs/adr/README.md).

## Переменные окружения

```bash
cp .env.example .env
```

Команда выполняется из корня репозитория. Если корневой `.env` уже создан для Docker Compose, повторно копировать
шаблон не нужно: добавьте недостающие переменные из `.env.example`, сохранив свои значения.

Бэкенд загружает корневой `.env` через существующий `@nestjs/config`. Абсолютный путь в `src/app.module.ts`
работает и из исходников, и из собранного `dist/`, независимо от текущей папки процесса. Приоритет:

1. Переменные окружения терминала.
2. `.env` в корне репозитория.
3. Значения по умолчанию из схемы.

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `PORT` | `3001` | HTTP-порт API |
| `CORS_ORIGIN` | `http://localhost:3000` | Адрес фронтенда без пути и завершающего `/` |
| `POSTGRES_HOST` | `127.0.0.1` | Адрес PostgreSQL для API на компьютере разработчика |
| `POSTGRES_PORT` | `5432` | Опубликованный порт PostgreSQL, общий с Compose |
| `POSTGRES_DB` | `messenger` | База PostgreSQL |
| `POSTGRES_USER` | `messenger` | Пользователь PostgreSQL |
| `POSTGRES_PASSWORD` | `messenger_local` | Открытый пример пароля для локальной базы |
| `REDIS_HOST` | `127.0.0.1` | Адрес Redis для API на компьютере разработчика |
| `REDIS_PORT` | `6379` | Опубликованный порт Redis, общий с Compose |
| `REDIS_DB` | `0` | Номер базы Redis, целое неотрицательное число |

Чтобы изменить порт сервиса, поменяйте `POSTGRES_PORT` или `REDIS_PORT` в корневом `.env`, выполните
`pnpm infra:up` и перезапустите API. Compose и API прочитают один порт; внутри контейнеров порты остаются прежними.
Указанные в примере пользователь, пароль и база должны соответствовать уже созданному volume PostgreSQL.

Загрузка работает через `pnpm dev:api` и `pnpm dev`. Для `pnpm dev` задача `api#dev` в `turbo.json` разрешает
передачу `PORT`, `CORS_ORIGIN`, `POSTGRES_*` и `REDIS_*` из терминала только в API.
При каждом перезапуске API в watch-режиме корневой `.env` читается заново. Изменение самого `.env` автоматически не
перезапускает Nest: после правки остановите dev-команду через Ctrl+C и запустите снова.

Без `.env` бэкенд тоже запустится — со значениями по умолчанию. Список переменных и проверка — в
[`src/config/env.schema.ts`](./src/config/env.schema.ts): при неверном значении бэкенд не стартует и пишет, какая
переменная не так. В коде значения берите через `ConfigService`, а не из `process.env`. Подробнее —
[`docs/architecture.md`](../../docs/architecture.md#переменные-окружения).

Это только конфигурация: ORM, Redis-клиент и подключения к сервисам добавляются отдельными задачами.

## Команды

Все команды — **из корня репозитория**:

| Команда                      | Что делает                                              |
| ---------------------------- | ------------------------------------------------------- |
| `pnpm dev:api`               | Dev-сервер с перезапуском на :3001                      |
| `pnpm --filter api lint`     | oxlint                                                  |
| `pnpm --filter api test`     | Unit-тесты (Vitest, `src/**/*.spec.ts`)                 |
| `pnpm --filter api test:e2e` | e2e-тесты (`test/`)                                     |
| `pnpm --filter api test:cov` | Покрытие тестами                                        |
| `pnpm --filter api build`    | Сборка в `dist/` (заодно проверка типов)                |
| `pnpm --filter api format`   | Prettier                                                |
| `pnpm --filter api openapi`  | Записать схему API в `openapi.json` без запуска сервера |

Перед PR: `pnpm --filter api lint && pnpm --filter api test && pnpm --filter api build`.

Изменили эндпоинт или его схему — запустите `pnpm --filter api openapi && pnpm --filter web generate-api` и
закоммитьте [`openapi.json`](./openapi.json) вместе с клиентом Orval (`apps/web/src/shared/api/generated/`): ревьюер
видит изменение контракта в diff, а CI падает, если файлы не пересозданы.

## Если вы впервые с NestJS

- Документация: https://docs.nestjs.com. Для агентов есть индекс `https://docs.nestjs.com/llms.txt` — по markdown-странице
  на главу; агенту удобно давать ссылку на конкретную главу.
- Основные понятия по порядку: [модули](https://docs.nestjs.com/modules), [контроллеры](https://docs.nestjs.com/controllers),
  [провайдеры и DI](https://docs.nestjs.com/providers), [пайпы и валидация](https://docs.nestjs.com/pipes),
  [гарды](https://docs.nestjs.com/guards), [тестирование](https://docs.nestjs.com/fundamentals/testing).
- Проект на ESM: относительные импорты пишутся с `.js` (`./app.service.js`), а моки в тестах — `vi.fn()`, не `jest.fn()`.
