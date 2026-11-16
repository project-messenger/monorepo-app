# 09. Stories, тесты, документация, финальная проверка, PR

[← к индексу](./README.md) · Статус: ✅ готова (без дополнительных тестов по просьбе; мелочи в [10](./10-known-gaps.md)) · Зависит от: 05–08

## Зачем

Довести работу до состояния, готового к ревью и переиспользованию командой.

## Что сделано

- Stories и тесты написаны вместе с компонентами в подзадачах 05–08 (Button, Input, Textarea, Alert, Select, Search, TaskCard, MetricCard, NavigationItem, WorkspaceSwitcher, StatusSelect).
- Документация: таблицы «роль макета → класс Tailwind» и «токен → назначение» добавлены в `apps/web/docs/stack.md` (раздел UI). Раздел Design system в `apps/web/AGENTS.md` синхронизирован с ADR 0006.
- Hex в `apps/web/src`: остались только 4 брендовых цвета Google в `features/auth/ui/provider-icons.tsx` (не токены интерфейса, оставлены намеренно).
- `MetricCard`: значение метрики переведено на роль `text-heading-auth` вместо произвольного размера.

## Чеклист

- [x] Hex-цветов в компонентах нет (кроме брендовых цветов Google).
- [x] Документация токенов и типографики в `apps/web/docs/stack.md`.
- [x] `pnpm --filter web build` зелёный.
- [x] `pnpm --filter web verify` зелёный: typecheck, ESLint + steiger, Prettier, 126 тестов (23 файла).
- [x] Недочёты и отложенные мелочи записаны в [10-known-gaps.md](./10-known-gaps.md).
- [ ] Дополнительные тесты не писались (по просьбе пользователя), список пробелов в [10](./10-known-gaps.md).
- [ ] Удалить `docs/backlog/ui-kit-figma/` и строку из `docs/backlog/README.md` в PR, когда задача закрыта целиком.
- [ ] Описание PR по шаблону `.github/pull_request_template.md`, заголовок `feat: KAN-17 …`. Коммит и PR только по просьбе пользователя.

## Готово, когда

PR открыт (по просьбе пользователя), проверки зелёные, документация синхронизирована с кодом.

## Не проверено

- Внешний вид в браузере и Storybook (светлая и тёмная темы).
- E2E и Playwright не запускались.