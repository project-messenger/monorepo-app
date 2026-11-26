# Клиент API на фронтенде

[← к бэклогу](./README.md) · Jira: —

## Зачем

Orval генерирует клиент из `apps/api/openapi.json` ([ADR-0009](../adr/0009-api-contract-openapi-orval.md)), но в
`apps/web/orval.config.ts` не задан адрес бэкенда. Сгенерированные запросы идут по относительному пути (`/api/health`),
то есть на сам Next.js (`localhost:3000`), а не на бэкенд (`API_URL` из `apps/web/src/shared/config/env.ts`,
`localhost:3001`). Пока это не мешает: сгенерированные хуки нигде не используются. Нашёл CodeRabbit в PR KAN-13.

Вторая проблема: сгенерированный `fetch`-клиент не проверяет `response.ok`, поэтому ответ 404/500 с JSON-телом
возвращается как успешный и TanStack Query не видит ошибку. Нашёл ktlog в ревью PR KAN-13
([комментарий](https://github.com/project-messenger/monorepo-app/pull/14#discussion_r4621665589)). Исправить нужно до
первого использования хуков.

## Решение до начала

- [ ] Как запросы попадают на бэкенд — выбрать один способ для всех сгенерированных запросов:
  - свой `mutator` в Orval, который подставляет `API_URL` (запросы идут напрямую на `:3001`, бэкенд разрешает их
    через CORS);
  - `rewrites` в `next.config.ts` с `/api/:path*` на бэкенд (запросы идут на тот же адрес, CORS не нужен).

## Что сделать

- [ ] Настроить выбранный способ, перегенерировать клиент (`pnpm --filter web generate-api`), закоммитить.
- [ ] Включить `output.override.fetch.forceSuccessResponse: true` в `apps/web/orval.config.ts`: сгенерированный код
      будет проверять `response.ok` и выбрасывать ошибку. Если выбран свой `mutator` — проверить, что ошибка
      выбрасывается и через него.
- [ ] Проверить, что ответ 4xx/5xx попадает в `error` хука, а не в `data`.
- [ ] Проверить первый реальный запрос (например, `GET /api/health`) в браузере на запущенных `web` и `api`.
- [ ] Описать способ в `apps/web/docs/state-and-data.md`.
- [ ] Вход ([ADR-0013](../adr/0013-auth-server-session.md)) держится на cookie сессии. При запросах напрямую на
      `API_URL` в `fetch` нужен `credentials: 'include'` (бэкенд уже отвечает `Access-Control-Allow-Credentials`). При
      `rewrites` запрос идёт на тот же origin, и cookie отправится сама.
- [ ] Ответы 4xx у входа и регистрации несут тело с ошибкой (`ErrorResponse`, у 400 — `BadRequestResponse`: поля
      формы есть, только если `errorCode === 'validation_failed'`): ошибка хука должна давать к нему доступ, чтобы
      форма показала, что не так.
