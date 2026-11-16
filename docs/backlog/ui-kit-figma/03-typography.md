# 03. Шрифт и типографические утилиты

[← к индексу](./README.md) · Статус: 🟨 в работе (токены готовы, осталось применение в компонентах) · Зависит от: 01

## Зачем

Дать разработчикам короткие классы для типографики макета: один класс задаёт размер, высоту строки и вес. Отдельный компонент `Typography` не создаём.

## Как устроено

В `@theme inline` (`apps/web/src/_app/styles/globals.css`) для каждой семантической роли макета заданы токены `--text-<роль>`, `--text-<роль>--line-height` и `--text-<роль>--font-weight`. Tailwind 4.3.5 генерирует из них утилиты `text-<роль>`. Стандартные `text-sm`, `text-lg` и др. остаются рабочими. Значения сняты из Figma (узел `2004:234`), см. [`figma-data.md`](./figma-data.md).

Проверка: временный файл со всеми 17 классами + `pnpm --filter web build` показали, что каждая утилита содержит `font-size`, `line-height` и `font-weight` (например, `.text-heading-page{font-size:1.75rem;line-height:1.45;font-weight:600}`). Файл-проба удалён.

## Чеклист

- [x] Шрифт в макете — Inter, кириллица подключена в `root-layout.tsx` (subsets `latin` + `cyrillic`).
- [x] Размер, вес и line-height для 17 ролей получены из Figma.
- [x] Токены ролей добавлены в `@theme inline`: `display-hero`, `display-auth`, `heading-auth`, `heading-page`, `heading-section`, `heading-panel`, `heading-subsection`, `body`, `body-small`, `label-button`, `label-field`, `label-sidebar-section`, `caption`, `caption-small`, `caption-task-id`, `brand-app`, `brand-auth`.
- [x] Observed-стили (`Sync/observed/*`) в код не переносятся.
- [x] Проверено, что утилиты реально генерируются (все 17).
- [x] `pnpm --filter web verify` и `pnpm --filter web build` зелёные.
- [ ] Проверить, что `html { @apply font-sans }` и `--font-heading` дают Inter в браузере.
- [ ] Заменить в `shared/ui` разрозненные `text-xs/sm/base` и `text-[0.8rem]` на утилиты ролей там, где роль очевидна (делается вместе с подзадачами 05–08, чтобы не раздувать дифф).
- [ ] Описать таблицу «роль → класс» в `apps/web/docs/stack.md` (делается в подзадаче 09).

## Готово, когда

Все роли макета доступны одним коротким классом, в компонентах `shared/ui` нет произвольных значений вида `text-[13px]`.

## Не проверено

- Рендер в браузере (Inter, кириллица, фактические размеры).
