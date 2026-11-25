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
фронтенд генерирует клиент ([ADR-0009](../../docs/adr/0009-api-contract-openapi-orval.md)). PostgreSQL подключён
через Drizzle (см. [«База данных»](#база-данных)), таблиц пока нет. Ещё не подключены Redis и WebSocket — каждое из
этого отдельная задача. Открытые решения, которые касаются бэкенда, — в [`docs/adr/`](../../docs/adr/README.md).

## Переменные окружения

Подготовка корневого `.env` — в [инструкции настройки окружения](../../README.md#настройка-окружения-env).

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

Локальный Redis работает без аутентификации. Запуск сервисов, смена портов и работа с существующими данными —
в [инструкции Docker Compose](../../README.md#локальные-postgresql-и-redis).

Загрузка работает через `pnpm dev:api` и `pnpm dev`. Для `pnpm dev` задача `api#dev` в `turbo.json` разрешает
передачу `PORT`, `CORS_ORIGIN`, `POSTGRES_*` и `REDIS_*` из терминала только в API.
При каждом перезапуске API в watch-режиме корневой `.env` читается заново. Изменение самого `.env` автоматически не
перезапускает Nest: после правки остановите dev-команду через Ctrl+C и запустите снова.

Без `.env` бэкенд тоже запустится — со значениями по умолчанию. Список переменных и проверка — в
[`src/config/env.schema.ts`](./src/config/env.schema.ts): при неверном значении бэкенд не стартует и пишет, какая
переменная не так. В коде значения берите через `ConfigService`, а не из `process.env`. Подробнее —
в [правилах бэкенда](./AGENTS.md#current-state).

Переменные файлов не используют подстановки `${...}`: хост, порт и учётные данные хранятся отдельными полями.

Эти же переменные `POSTGRES_*` читают и API, и `drizzle-kit` (см. [«База данных»](#база-данных)). Redis-клиент
подключается отдельной задачей.

## База данных

PostgreSQL через Drizzle v1 (`1.0.0-rc.6`) и `@nestjs/drizzle`. Почему Drizzle и какие соглашения — в
[ADR-0012](../../docs/adr/0012-orm-drizzle.md). Это RC, поэтому сверяйтесь с
[документацией v1](https://orm.drizzle.team/docs/overview), а не с примерами для 0.x.

- [`src/database/`](./src/database/) — подключение (`DatabaseModule`), тип `Database`, `isUniqueViolation`.
- `src/<домен>/<домен>.table.ts` — таблицы домена. Каждый такой файл добавьте в
  [`src/database/schema.ts`](./src/database/schema.ts), иначе `drizzle-kit` его не увидит.
- [`migrations/`](./migrations/) — миграции, по папке на каждую. Настройки `drizzle-kit` —
  [`drizzle.config.ts`](./drizzle.config.ts).

Сервис получает базу так:

```ts
import { InjectDrizzle } from '@nestjs/drizzle';
import type { Database } from '../database/database.js';

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private readonly db: Database) {}
}
```

При старте API проверяет подключение: если база не запущена, сервер сразу останавливается с ошибкой
`Cannot connect to PostgreSQL…`. Поднимите её: `pnpm infra:up`.

**Новая таблица или изменение схемы:**

1. Опишите таблицу в `src/<домен>/<домен>.table.ts` (имена — явно, в snake_case) и добавьте файл в `schema.ts`.
2. `pnpm --filter api db:generate` — создаст папку миграции. Прочитайте `migration.sql`: этот SQL уйдёт в базу.
3. `pnpm --filter api db:migrate` — применит миграции к локальной базе.
4. Закоммитьте папку миграции целиком. Руками её не правьте, `drizzle-kit push` не используйте.

После `git merge origin/main` запустите `pnpm --filter api db:check` (миграции веток не конфликтуют), затем
`db:migrate`. Если `db:check` нашёл конфликт: удалите папки миграций своей ветки, пересоздайте локальную базу
(`docker compose down -v` удалит все её данные, затем `pnpm infra:up` и `db:migrate`) и снова сделайте `db:generate`.

## Команды

Все команды — **из корня репозитория**:

| Команда                         | Что делает                                              |
| ------------------------------- | ------------------------------------------------------- |
| `pnpm dev:api`                  | Dev-сервер с перезапуском на :3001                      |
| `pnpm --filter api lint`        | oxlint                                                  |
| `pnpm --filter api test`        | Unit-тесты (Vitest, `src/**/*.spec.ts`)                 |
| `pnpm --filter api test:e2e`    | e2e-тесты (`test/`)                                     |
| `pnpm --filter api test:cov`    | Покрытие тестами                                        |
| `pnpm --filter api build`       | Сборка в `dist/` (заодно проверка типов)                |
| `pnpm --filter api format`      | Prettier                                                |
| `pnpm --filter api openapi`     | Записать схему API в `openapi.json` без запуска сервера |
| `pnpm --filter api db:generate` | Создать миграцию по изменениям в таблицах               |
| `pnpm --filter api db:migrate`  | Применить миграции к базе из `POSTGRES_*`               |
| `pnpm --filter api db:check`    | Проверить миграции на конфликты (после merge main)      |

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
