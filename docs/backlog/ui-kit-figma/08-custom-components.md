# 08. Компоненты, которых нет в shadcn

[← к индексу](./README.md) · Статус: ✅ готова (осталась визуальная проверка в браузере) · Зависит от: 05, 06

## Зачем

В макете есть компоненты без аналога в shadcn. Собираем их вручную **по образцу существующих** (`cva`, `cn`, токены, Base UI примитивы там, где нужна интерактивность), без бизнес-логики, в `apps/web/src/shared/ui`. Это исключение из правила «не писать `shared/ui` с нуля» подтверждено пользователем. Оформляется в ADR 0006.

## Компоненты и данные макета

| Компонент | Размер, радиус | Варианты |
| --- | --- | --- |
| `search.tsx` | 634×36, radius 6, подсказка `⌘ K`, без иконки лупы | `global` |
| `task-card.tsx` | 252×158, radius 8, padding 10/14/6/14, gap 6 | `standard`, `blocked`, `review` |
| `metric-card.tsx` | 364×126, radius 9 | `accent`, `surface` |
| `navigation-item.tsx` | 216×34, на тёмной панели | `default`, `selected` |
| `workspace-switcher.tsx` | 208×50, radius 8, chevron | `workspace` |
| `status-select.tsx` | 194×40, radius 7, цвета статусов | `todo`, `in-progress`, `review`, `done` |

## Правила

- Только презентационные компоненты: данные приходят пропсами, запросов и состояния домена внутри нет.
- Интерактивные части (dropdown у `status-select`) строятся на уже установленных примитивах (`select`), новых пакетов не добавляем.
- Каждый компонент: `cva`-варианты, токены, `data-slot`, story и тест на рендер вариантов.

## Что сделано

| Компонент | Реализация |
| --- | --- |
| `search.tsx` | `Search` на `cva` (`global`: h-9, rounded-sm, фон `input-search`), нативный `input` + `kbd` с подсказкой (по умолчанию `⌘ K`, отключается `shortcut={null}`). Экспортирует `searchVariants`. |
| `task-card.tsx` | `TaskCard` на `cva` (`standard`, `blocked`, `review` с рамкой 1.5 px `primary`) + слоты `TaskCardHeader`, `TaskCardId`, `TaskCardTitle`, `TaskCardMeta`, `TaskCardPriority` (`normal`/`high`), `TaskCardDetails`, `TaskCardNote` (`destructive`/`success`). Типографика: `caption-task-id`, `label-button`, `caption-small`. Заметка 10/14.5 задана произвольным значением: роли для 10 px в макете нет. |
| `metric-card.tsx` | `MetricCard` на `cva` (`accent`, `surface`, `rounded-metric` 9 px) + слоты `Value`, `Body`, `Label`, `Context`. |
| `navigation-item.tsx` | `NavigationItem` на `cva` (`default`, `selected`, `aria-current="page"`), поддерживает `render` (Base UI `useRender`) для `Link`. Цвета из `sidebar-*`. |
| `workspace-switcher.tsx` | Кнопка-триггер h-[50px], rounded-lg, фон `sidebar-switcher`, chevron из `lucide-react`. Меню за пределами компонента. |
| `status-select.tsx` | Обёртка над `Select`: статусы `todo`, `in-progress`, `review`, `done`; цвет триггера из токенов `status-*` (варианты `status-*` добавлены в `selectTriggerVariants`). Контролируемый и неконтролируемый режимы. |
| `*.stories.tsx`, `*.test.tsx` | Stories и тесты для всех шести компонентов. |

## Чеклист

- [x] `search`: поле поиска с подсказкой `⌘ K`, нативный `input` внутри контейнера.
- [x] `task-card`: варианты `standard`, `blocked`, `review`, слоты для ID, заголовка, метаданных, приоритета, заметки.
- [x] `metric-card`: варианты `accent`, `surface`, слоты значения и подписи.
- [x] `navigation-item`: состояния `default` и `selected`; иконка через вложенный `svg` (`[&>svg]:size-4`).
- [x] `workspace-switcher`: кнопка-триггер с chevron.
- [x] `status-select`: на базе `select`, цвета из токенов `status-*`.
- [x] Stories для всех шести компонентов.
- [x] Тесты для всех шести компонентов.
- [x] `pnpm --filter web verify` зелёный: typecheck, ESLint + steiger, Prettier, 126 тестов (23 файла).
- [ ] Меню «more» у `TaskCard` (⋮) не реализовано: слот `TaskCardHeader`, кнопка действий подставляется потребителем.
- [ ] Визуальная проверка в Storybook и браузере (не проводилась).

## Готово, когда

Все компоненты семейств TaskCard, MetricCard, NavigationItem, WorkspaceSwitcher, StatusSelect, Search есть в `shared/ui`, не содержат бизнес-логики и покрыты stories и тестами.

## Не проверено

- Внешний вид компонентов в браузере и Storybook.
- Тёмная тема (значения токенов выведены эвристически).