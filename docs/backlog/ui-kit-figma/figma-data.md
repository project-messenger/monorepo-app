# KAN-17: данные, снятые из Figma

[← к индексу](./README.md)

Снимок значений из макета `9bp5uwYGyaGIRCt1ycuqz3` (страница `2004:2`). Нужен, чтобы не тратить лимит Figma MCP повторно. Всё, что отмечено «нужно уточнить», дочитывается из макета перед реализацией соответствующей подзадачи.

## Цвета (секция `2004:233`, 64 токена, Light)

### База (имена как в shadcn)

| Токен | Hex | Роль |
| --- | --- | --- |
| `background` | `#F7F9F8` | Фон всех экранов |
| `foreground` | `#172D29` | Основной текст |
| `card` | `#FFFFFF` | Карточки |
| `card-foreground` | `#172D29` | |
| `popover` | `#FFFFFF` | |
| `popover-foreground` | `#172D29` | |
| `primary` | `#236A50` | Основные действия, ссылки, успех |
| `primary-foreground` | `#FFFFFF` | Текст на primary |
| `secondary` | `#E8EEE9` | Кнопка GitHub на экранах авторизации |
| `secondary-foreground` | `#172D29` | |
| `muted` | `#F5F7F4` | |
| `muted-foreground` | `#62736D` | Вспомогательный текст |
| `accent` | `#D8F59A` | Лаймовые маркеры и активные акценты |
| `accent-foreground` | `#172D29` | |
| `destructive` | `#A6473F` | Удаление, ошибки |
| `border` | `#DFE6E1` | Основные границы |
| `input` | `#DFE6E1` | Граница полей |
| `surface` | `#FFFFFF` | Белые панели и заголовки |
| `surface-foreground` | `#172D29` | Текст на поверхностях |
| `ring` | нужно уточнить | В макете не выделен, предложение: `primary` с прозрачностью |

### Состояния

| Токен | Hex |
| --- | --- |
| `success/background` | `#E9F3E6` |
| `warning/foreground` | `#A06420` |
| `warning/background` | `#FFF5E7` |
| `warning/heading` | `#946328` |
| `warning/body` | `#806B4C` |
| `warning/action-background` | `#F7EEE8` |
| `info/background` | `#E9F2FF` |
| `info/foreground` | `#426389` |
| `destructive/background` | `#FFF0EB` |

### Поля ввода

| Токен | Hex |
| --- | --- |
| `input/auth-border` | `#DCE4DF` |
| `input/editor-border` | `#CBD9CF` |
| `input/assistant-border` | `#D4DFD6` |
| `input/background` | `#F7F9F6` |
| `input/search` | `#F3F6F2` |
| `input/placeholder` | `#8A9790` |
| `input/project-placeholder` | `#8EA6A2` |
| `input/project-placeholder-precise` | `#8EA6A2` (дубль, использовать один) |

### Поверхности

| Токен | Hex |
| --- | --- |
| `surface/context` | `#EDF4E6` |
| `surface/trust` | `#E6EDE8` |
| `surface/info` | `#E8EEE7` |
| `surface/pinned` | `#F1F5ED` |
| `surface/attachment` | `#EDF1EF` |
| `surface/linked` | `#EAF1E6` |
| `surface/pull-request` | `#F2F5EF` |
| `surface/report` | `#F3F6F0` |
| `surface/schedule` | `#F4F7F1` |
| `inverse/surface` | `#244338` |
| `inverse/foreground` | `#BCD1C5` |
| `inverse/muted-foreground` | `#B8CEC1` |
| `border/subtle` | `#E6ECE7` |
| `notification/unread` | `#EFF4EA` |

### Sidebar

| Токен | Hex |
| --- | --- |
| `sidebar/background` | `#172D29` |
| `sidebar/foreground` | `#E2EBE5` |
| `sidebar/muted-foreground` | `#91AD9E` |
| `sidebar/item-foreground` | `#C9DCD0` |
| `sidebar/accent` | `#365647` |
| `sidebar/accent-foreground` | `#D8F59A` |
| `sidebar/switcher` | `#274137` |
| `sidebar/demo-foreground` | `#D9E7DF` |

### Kanban и статусы

| Токен | Hex |
| --- | --- |
| `kanban/background` | `#ECF0EB` |
| `status/todo` | `#E4EAE5` |
| `status/in-progress` | `#E8F0D9` |
| `status/review` | `#E9E8F5` |
| `status/review-foreground` | `#665A9B` |
| `status/done` | `#E4EFE8` |

## Типографика (секция `2004:234`)

Шрифт: Inter. Всего 70 стилей: 17 семантических ролей и «observed» (сырые измерения экранов, 10–76 px, веса regular/medium/semi-bold/bold, line-height 140% или 145%). Значения ролей сняты точно из узла `2004:234` (REST API), line-height везде 145% от размера (кроме `caption/small` и `caption/task-id`: 16 px).

| Роль в Figma | Утилита | Размер, px | Line-height, px | Вес |
| --- | --- | --- | --- | --- |
| `Sync/display/hero` | `text-display-hero` | 64 | 89.6 | 600 |
| `Sync/display/auth` | `text-display-auth` | 48 | 69.6 | 600 |
| `Sync/heading/page` | `text-heading-page` | 28 | 40.6 | 600 |
| `Sync/heading/section` | `text-heading-section` | 24 | 34.8 | 600 |
| `Sync/heading/subsection` | `text-heading-subsection` | 17 | 24.7 | 600 |
| `Sync/heading/panel` | `text-heading-panel` | 20 | 29 | 600 |
| `Sync/heading/auth` | `text-heading-auth` | 36 | 52.2 | 600 |
| `Sync/body/default` | `text-body` | 14 | 20.3 | 400 |
| `Sync/body/small` | `text-body-small` | 13 | 18.9 | 400 |
| `Sync/label/button` | `text-label-button` | 15 | 21.8 | 600 |
| `Sync/label/field` | `text-label-field` | 13 | 18.9 | 500 |
| `Sync/label/sidebar-section` | `text-label-sidebar-section` | 10 | 14.5 | 600 |
| `Sync/caption/default` | `text-caption` | 12 | 17.4 | 400 |
| `Sync/caption/small` | `text-caption-small` | 11 | 16 | 400 |
| `Sync/caption/task-id` | `text-caption-task-id` | 11 | 16 | 500 |
| `Sync/brand/app` | `text-brand-app` | 29 | 42.1 | 700 |
| `Sync/brand/auth` | `text-brand-auth` | 34 | 49.3 | 700 |

Letter-spacing у всех ролей 0. В макете нет роли для `text-xs`/`text-sm`-подобных промежуточных размеров: при подгонке компонентов использовать ближайшую роль, а не произвольные значения.

Observed-стили (`Sync/observed/*`) в код не переносим: это сырые измерения экранов. Используем только семантические роли. Если для какого-то экрана нужен размер вне ролей, это вопрос к дизайнеру, а не повод плодить токены.

## Размеры (секция `2004:235`)

| Группа | Значения (px) |
| --- | --- |
| `space` | 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 24, 26, 28, 29, 32, 40, 51, 54, 64 |
| `radius` | 4, 5, 6, 7, 8, 9, 10, 12, 14, 24 |
| `border` | 1, 1.5 |
| `size` | 34, 36, 40, 44, 45, 48, 50, 52, 72, 86, 123, 126, 158, 240, 252, 272, 480, 634 |

Нужно выбрать из этих значений шкалу `--radius-*` и `--spacing`. Предложение: базовый `--radius: 8px` (самый частый у компонентов), остальные по шкале shadcn.

## Компоненты (секция `2004:236`)

| Семейство | Варианты и размеры | Радиус и заметки |
| --- | --- | --- |
| Button | `primary`, `surface`, `soft`, `secondary`, `accent`; высоты 40 (`app`), 44 (`app`), 48 (`landing`), 50 (`auth`) | radius 7 или 8; иконки plus, arrow |
| Input | `auth` 52, `app` 48, `settings` 44; filled, empty | Auth-граница `#DCE4DF` отличается от основной |
| Textarea | `app` 690×86, empty | radius 7 |
| Select | `app` 48, `settings` 44; только закрытое состояние, chevron | Открытое меню в макете не показано |
| Alert | `success` 48, `destructive` 45, `warning` 72 | success с иконкой check |
| Search | `global` 634×36, radius 6, подсказка `⌘ K` | Лупы нет |
| TaskCard | `standard`, `blocked`, `review` (highlighted); 252×158, radius 8, inset 14/12 | иконка more |
| Card | `feature` 420×123, radius 10 | карточка лендинга |
| MetricCard | `accent`, `surface`; 364×126, radius 9 | |
| NavigationItem | `project` 216×34; default (прозрачный), selected | на тёмной панели |
| WorkspaceSwitcher | `workspace` 208×50, radius 8 | chevron |
| StatusSelect | `review` 194×40, фиолетовый | |
| Checkbox | `task` 15 px; checked и unchecked | в макете это глифы ☑ / ☐ |

В макете для состояний hover, focus, pressed, disabled данных нет: «Default наблюдается». Эти состояния сохраняем из shadcn.

## Чего в макете нет (подтверждено секцией «07 / MCP handoff», `2004:238`)

В макете явно не найдены: тёмная тема, `ring`, визуальные hover / focus / pressed / disabled / input-error, открытые Select и popover, мобильные макеты, breakpoints, motion, отдельный SVG-набор иконок (иконки в макете это текстовые глифы). Эти состояния берём из shadcn и перекрашиваем токенами, `.dark` выводим из светлой палитры, иконки остаются `lucide-react`.

## Источники данных и статус

- Копии макета с тем же набором узлов (`2004:2` и секции `2004:232 … 2004:238`): оригинал `9bp5uwYGyaGIRCt1ycuqz3`, копия `JJlwqYSTdNfUNxLMkgAjNz`. Файл `6FEyS7TIMuiYKTY6HMIBDr` это старый community-кит shadcn, узла `2004:234` в нём нет.
- Типографика, цвета, компоненты (размеры, радиусы, отступы, стили текста) сняты полностью. Дочитывать из Figma больше ничего не нужно.
- [x] Секция `2004:234`: размер, вес и line-height для 17 ролей.
- [x] Секция `2004:236`: внутренние отступы, радиусы, цвета и стили текста по 13 семействам (детали в разборе при реализации подзадачи 05 и 08).
- [x] `ring` и состояние ошибки Input: в макете отсутствуют, решение выше.