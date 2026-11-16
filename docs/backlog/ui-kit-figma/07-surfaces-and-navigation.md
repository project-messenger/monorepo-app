# 07. Поверхности, навигация и оверлеи

[← к индексу](./README.md) · Статус: ✅ готова (осталась визуальная проверка в браузере) · Зависит от: 02, 03, 04

## Зачем

Подогнать остальные компоненты `shared/ui` под палитру, радиусы и типографику макета. Часть из них в макете явно не показана, поэтому они только перекрашиваются токенами без изменения структуры.

## Компоненты

`card.tsx`, `badge.tsx`, `separator.tsx`, `tabs.tsx`, `accordion.tsx`, `sheet.tsx`, `dialog.tsx`, `command.tsx`, `calendar.tsx`, `sonner.tsx`. Логотип (`logo.tsx`) не трогаем.

## Данные макета

- Card (feature): 420×123, radius 10, padding 18/20/29/20, заголовок 18/25.2 w600, описание 14/19.6 w400.
- Фоны блоков: группа `surface-*`, `inverse-*`.
- Остальные компоненты в макете не показаны: перекрашиваются токенами и ролями типографики.

## Что сделано

| Компонент | Изменение |
| --- | --- |
| `card.tsx` | Кольцо `ring-1 ring-foreground/10` заменено на `border border-border`; `text-body` для контента и описания; заголовок на `text-heading-subsection` (17/24.7, ближайшая роль к 18/25.2). Радиус `rounded-xl` = 10 px совпадает с макетом. |
| `badge.tsx` | Добавлены варианты статусов `todo`, `in-progress`, `review`, `done` на токенах `status-*`; базовый размер `text-caption`. Существующие варианты не тронуты. |
| `dialog.tsx` | Кольцо заменено на `border border-border`; `text-body`; заголовок `text-heading-panel`. |
| `sheet.tsx` | `text-body`; заголовок `text-heading-panel`; описание `text-body`. |
| `tabs.tsx` | Триггер на `text-label-field`; контент на `text-body`. |
| `accordion.tsx` | Триггер на `text-label-field`; контент на `text-body`. |
| `command.tsx` | Ввод, пустое состояние и пункты на `text-body`; заголовки групп и шорткаты на `text-caption`. |
| `calendar.tsx` | Подписи на `text-label-field`, `text-body`, `text-body-small`, `text-caption`; произвольное `text-[0.8rem]` убрано. |
| `sonner.tsx` | `--border-radius` привязан к `var(--radius-lg)` (8 px макета). Цвета идут из токенов `popover` и `border`. |
| `separator.tsx` | Без изменений: уже использует `bg-border`. |

## Чеклист

- [x] Card: radius и padding по макету, цвета из токенов.
- [x] Badge: цвета статусов (`status-todo`, `status-in-progress`, `status-review`, `status-done`) как варианты `cva`.
- [x] Separator, Tabs, Accordion: границы и активные состояния на новых токенах.
- [x] Sheet, Dialog, Command: фон, граница, радиус, типографика на токенах и ролях макета.
- [x] Calendar: размеры шрифта на ролях макета (цвета выбранного дня остаются от токенов `primary`).
- [x] Sonner: радиус по шкале макета, цвета из токенов `popover` и `border`.
- [x] Hex в `shared/ui` не осталось. Остаточный аудит `text-xs/sm/base` закрыт, кроме намеренных исключений ниже.
- [x] Тесты `calendar.test.tsx` и `tabs.test.tsx` проходят без изменений (разметка не менялась).
- [x] `pnpm --filter web verify` зелёный: typecheck, ESLint + steiger, Prettier, 97 тестов.
- [ ] Визуальная проверка в Storybook и браузере (не проводилась).
- [ ] Popup у `select.tsx` оставлен с `ring-1 ring-foreground/10` и `rounded-lg`: открытое меню в макете отсутствует.
- [ ] Цвета success/error/warning/info у Sonner не перекрашены отдельно: в макете тостов нет.

## Намеренные исключения

Остались стандартные `text-xs/sm/base` в:

- `button.tsx`: размеры `xs` и `sm`, базовый `text-sm`. Ими пользуются страницы (`site-header`, `landing`), менять не стали, чтобы не сломать существующую вёрстку.
- `input.tsx`, `textarea.tsx`, `select.tsx`: вариант `default` (прежний вид, формы `login` и `register`).
- `input.tsx`: `file:text-sm` и вариант `auth` (`text-base`, 16 px по макету).

## Готово, когда

Все компоненты из списка визуально согласованы с палитрой и размерами макета.

## Не проверено

- Внешний вид компонентов в браузере и Storybook (светлая и тёмная темы).
- Открытые состояния Select, Command, Dialog, Sheet (в макете отсутствуют).
- Тёмная тема: значения выведены эвристически, дизайнер их не утверждал.
