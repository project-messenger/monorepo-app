# 10. Недочёты и отложенные мелочи

[← к индексу](./README.md) · Статус: 🟨 бэклог (часть мелочей закрыта, остальное берём по просьбе) · Зависит от: 05–09

Список того, что осознанно не доделано в KAN-17 ради экономии токенов и по просьбе пользователя («мелочи на последок, тесты не писать»). Ничего из этого не блокирует переиспользование базовых компонентов.

## Визуальная проверка (не проводилась)

- [ ] Страницы `login`, `register`, `landing` в браузере: изменились радиусы, типографика подписей полей, размеры кнопок.
- [ ] Storybook: все новые stories (`Alert`, `Select`, `Search`, `TaskCard`, `MetricCard`, `NavigationItem`, `WorkspaceSwitcher`, `StatusSelect`) открыть и сверить с макетом.
- [ ] Тёмная тема: значения `.dark` выведены эвристически, дизайнер их не утверждал (решение 5 в индексе).
- [ ] Визуально проверить новые состояния hover, focus, pressed (см. раздел «Состояния»).

## Типографика

- [ ] `task-card.tsx`: заметка 10/14.5 задана произвольным значением `text-[0.625rem]`, в макете нет роли для 10 px. Решить: завести роль в макете или оставить исключением.
- [ ] `button.tsx`: размер `sm` использует `text-[0.8rem]` и `rounded-[min(var(--radius-md),12px)]` (прежний вид shadcn, нужен существующим страницам). Привести к ролям макета вместе с миграцией страниц.
- [ ] Размеры `xs`, `sm` у Button и `variant="default"` у Input, Textarea, Select сохранены ради совместимости. После миграции страниц на варианты макета (`app`, `auth`, `landing`) удалить.
- [ ] Шрифт Inter: проверить кириллические начертания и подключение в `root-layout.tsx` (подзадача 03 остаётся 🟨).

## Компоненты

- [ ] `Checkbox`: радиус оставлен `rounded-[4px]`, в макете точного значения нет (чекбокс нарисован глифами).
- [x] `TaskCard`: добавлен слот `TaskCardMenuButton` (⋮, 24×24, `MoreVerticalIcon`, `aria-label` «Действия с задачей», состояния hover/focus/pressed из токенов). Потребитель вкладывает его в `TaskCardHeader` и сам подключает меню.
- [x] `Select`: popup приведён к макету (`border border-border`, `rounded-md`, `text-body` вместо `ring-1 ring-foreground/10` и `rounded-lg`). Открытого меню в макете нет, поэтому стили выведены из токенов.
- [x] `Sonner`: success/error/warning/info перекрашены на токены макета (`success-background`, `destructive-background`, `warning-background`, `info-background` и соответствующие цвета текста), текст тоста на `text-body`. Тостов в макете нет, соответствие подобрано по смыслу токенов.
- [ ] `Alert`: иконки (check и др.) подключает потребитель через `lucide-react`, в stories не показаны.
- [x] Иконки макета `Sync/Icon/*`: решение принято, остаётся `lucide-react`. В выгрузке Figma иконки представлены текстовыми глифами (`more-horizontal`, `checkbox-checked`, `status-dot` и др.), векторных SVG нет, переносить нечего. Для `TaskCard` использован `MoreVerticalIcon`.
- [ ] Иконка `more-horizontal` (⋯) из макета отличается от `more-vertical` (⋮) в `TaskCardMenuButton`: сверить с дизайнером, какая нужна.

## Состояния

- [x] Hover, focus, pressed созданы из палитры (в макете не показаны, значения выведены из токенов, без новых цветов):
  - `Button`: добавлены `active:` для `default` (`primary/70`), `outline`, `ghost`, `surface` (`secondary`), `destructive` (`destructive/30`), `soft` (`accent`), `accent` (`accent/70`). Hover и focus-ring уже были.
  - `Input`, `Textarea`: `hover:border-ring/60`, `active:bg-muted`, focus-ring сохранён.
  - `Checkbox`: `hover:border-ring/60`, `active:bg-muted`.
  - `SelectItem`: hover (`accent`), focus (`accent` + ring), pressed (`secondary`), выбранный пункт `font-semibold`.
  - `TaskCardMenuButton`: hover (`muted`), pressed (`secondary`), focus-ring.
- [x] Состояния добавлены для оставшихся компонентов (значения выведены из токенов, без новых цветов):
  - `Badge`: `[a]:active:` для `default` (`primary/70`), `secondary` (`accent`), `destructive` (`destructive/30`), `outline` (`secondary`). Применяется только к бейджам-ссылкам, как и существующий hover.
  - `Tabs`: триггер `active:bg-muted`.
  - `Accordion`: триггер `active:bg-muted`.
  - `Command`: пункт `hover:bg-muted/60`, `active:bg-secondary`.
  - `NavigationItem`: `default` `active:bg-sidebar-accent`; `selected` hover `sidebar-accent/80`, pressed `sidebar-accent/70`.
  - `WorkspaceSwitcher`: `active:bg-sidebar-accent/80`.
  - `Search`: контейнер `hover:border-ring/60`.
- [ ] Значения состояний выведены эвристически, согласовать с дизайнером.
- [ ] Для вариантов `Input` с `bg-input-background` pressed (`active:bg-muted`) может совпасть по цвету с фоном: проверить визуально.

## Тесты (по просьбе не писались)

- [ ] Нет тестов на `Badge` (варианты статусов), `Card`, `Dialog`, `Sheet`, `Command`, `Accordion`.
- [ ] Нет тестов на `StatusSelect` в контролируемом режиме (`value` + `onValueChange`).
- [ ] Нет теста `NavigationItem` с `render={<Link />}` из `next/link`.
- [ ] Нет теста и story на `TaskCardMenuButton`.
- [ ] Нет теста на новые цвета `Sonner` и состояния пунктов `Select`.
- [ ] Нет тестов на новые состояния (hover/pressed) `Badge`, `Tabs`, `Accordion`, `Command`, `NavigationItem`, `WorkspaceSwitcher`, `Search`.
- [ ] Тест `StatusSelect › вызывает onValueChange` был нестабильным по тайму анимации попапа: исправлен через `findByRole`, при флейках проверить остальные тесты с порталами (`select`, `dialog`, `sheet`).

## Документация и процесс

- [ ] Открытый вопрос про точные значения шрифтов по ролям из секции `2004:234`: частично сняты, нужна сверка по узлам.
- [ ] Ссылка на старый файл Figma `6FEyS7TIMuiYKTY6HMIBDr`: убедиться, что её нет в `apps/web/AGENTS.md` и `docs/`.
- [ ] После ревью: удалить `docs/backlog/ui-kit-figma/` и строку из `docs/backlog/README.md` (правило бэклога), оставив только невыполненное.