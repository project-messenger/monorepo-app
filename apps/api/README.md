# Бэкенд (`apps/api`)

API командного мессенджера на **NestJS 12** (ESM, Vitest). Порт — `3001`.

Это часть монорепы. Общие команды, порты и устройство проекта — в [корневом README](../../README.md) и
[`docs/architecture.md`](../../docs/architecture.md). Правила для ИИ-агентов — в [AGENTS.md](./AGENTS.md).

## Состояние

Пока это заготовка: есть только `GET /`. Ещё не подключены Swagger (OpenAPI для фронтенда), конфигурация,
PostgreSQL + Prisma, Redis, CORS и WebSocket — каждое из этого отдельная задача. Открытые решения, которые
касаются бэкенда, — в [`docs/adr/`](../../docs/adr/README.md).

## Команды

Все команды — **из корня репозитория**:

| Команда                      | Что делает                               |
| ---------------------------- | ---------------------------------------- |
| `pnpm dev:api`               | Dev-сервер с перезапуском на :3001       |
| `pnpm --filter api lint`     | oxlint                                   |
| `pnpm --filter api test`     | Unit-тесты (Vitest, `src/**/*.spec.ts`)  |
| `pnpm --filter api test:e2e` | e2e-тесты (`test/`)                      |
| `pnpm --filter api test:cov` | Покрытие тестами                         |
| `pnpm --filter api build`    | Сборка в `dist/` (заодно проверка типов) |
| `pnpm --filter api format`   | Prettier                                 |

Перед PR: `pnpm --filter api lint && pnpm --filter api test && pnpm --filter api build`.

## Если вы впервые с NestJS

- Документация: https://docs.nestjs.com. Для агентов есть индекс `https://docs.nestjs.com/llms.txt` — по markdown-странице
  на главу; агенту удобно давать ссылку на конкретную главу.
- Основные понятия по порядку: [модули](https://docs.nestjs.com/modules), [контроллеры](https://docs.nestjs.com/controllers),
  [провайдеры и DI](https://docs.nestjs.com/providers), [пайпы и валидация](https://docs.nestjs.com/pipes),
  [гарды](https://docs.nestjs.com/guards), [тестирование](https://docs.nestjs.com/fundamentals/testing).
- Проект на ESM: относительные импорты пишутся с `.js` (`./app.service.js`), а моки в тестах — `vi.fn()`, не `jest.fn()`.
