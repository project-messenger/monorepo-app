# Тесты и проверка форматирования в CI

[← к бэклогу](./README.md) · Jira: —

## Зачем

ТЗ: «на каждый пул реквест прогоняем линтеры, тесты, билд проекта, typecheck через ts». Сейчас CI запускает только
`typecheck`, `lint` и `build`. Тесты есть у `web` и `api`, но в CI не запускаются, а Prettier проверяется только
локально в `pnpm --filter web verify`.

## Как устроено сейчас

CI вызывает задачи Turborepo из корня (`pnpm typecheck` → `turbo run typecheck`), а Turborepo запускает одноимённый
скрипт в каждом пакете, где он есть. Поэтому заглушки не нужны: добавили пакету скрипт — CI его подхватил.

## Что сделать

- [ ] `turbo.json`: задача `test` (и `format:check`, если делаем через turbo).
- [ ] Корневой `package.json`: скрипты `test` и `format:check` через `turbo run`.
- [ ] `apps/api`: скрипт `format:check` (сейчас есть только `format`).
- [ ] `.github/workflows/ci.yml`: шаги `pnpm test` и `pnpm format:check`.
- [ ] Шаг 8 (проверка Orval) сейчас ничего не проверяет: Swagger на бэкенде не подключён, а ошибка генерации
      глушится `|| true`. Чинится в задаче [Контракт API](./api-contract.md) — до неё шаг можно оставить как есть.
- [ ] e2e (Playwright, e2e бэкенда) — отдельным шагом позже, когда появятся БД в Docker и реальные сценарии.
- [ ] По желанию: `commitlint` в git-хуке `commit-msg` — проверять формат коммита `<тип>: KAN-N …` (сейчас не
      проверяется). Новый пакет — после согласия команды.
- [ ] `lint-staged` сейчас настроен только для `apps/web` (`apps/web/.lintstagedrc.mjs`): добавить конфиг для
      `apps/api` (oxlint + Prettier) и `packages/shared`.
- [ ] Обновить `README.md` (список команд) и `docs/workflow.md`, если меняется список обязательных проверок.

Имя job `Build, Lint & Verify Contract Safety` не менять: оно указано как обязательная проверка в ruleset `main`. Если
переименовать — сначала поправить ruleset, иначе merge заблокируется.
