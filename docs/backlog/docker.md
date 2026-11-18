# Docker для локальной разработки

[← к бэклогу](./README.md) · Jira: —

## Зачем

ТЗ: «Docker — обязательно для локальной разработки и продакшна», «при деплое — обязательная контейнеризация». В стеке
бэкенда PostgreSQL и Redis — без Docker каждому пришлось бы ставить их локально.

## Что сделать

- [ ] `docker-compose.yml` в корне: PostgreSQL и Redis для разработки (приложения пока можно запускать через
      `pnpm dev`).
- [ ] Переменные подключения — в схему `apps/api/src/config/env.schema.ts` и в `apps/api/.env.example` (без
      настоящих секретов). Бэкенд уже читает `apps/api/.env` через `ConfigModule`.
- [ ] Раздел «Запуск» в `README.md`: `docker compose up -d`, затем `pnpm dev`.
- [ ] Позже: Dockerfile для `web` и `api` — вместе с задачей [Процесс релиза](./release.md).
