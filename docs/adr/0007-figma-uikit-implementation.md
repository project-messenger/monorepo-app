# 0007. UI-кит реализован по макету Figma

- **Статус:** принято
- **Дата:** 2026-11-16
- **Область:** web
- **Подготовил:** ИИ-агент (opencode) по запросу пользователя
- **Задача:** [KAN-17](https://project-group-11.atlassian.net/browse/KAN-17)

## Контекст

[ADR-0006](./0006-figma-uikit-source-of-truth.md) сделал источником правды макет
`9bp5uwYGyaGIRCt1ycuqz3`. По нему нужно было привести базовые элементы `shared/ui`, токены и типографику
к дизайн-системе, не верстая страницы и виджеты. Работа выполнена в ветке `KAN-17/align-ui-kit-with-figma`.
Промежуточная документация лежала в `docs/backlog/ui-kit-figma/`; задача закрыта, поэтому итог перенесён сюда,
а бэклог-файлы удалены.

## Решение

- **Цвета.** Все 64 токена макета — CSS-переменные в `apps/web/src/_app/styles/globals.css` (`:root`, `.dark`,
  `@theme inline`). Имена совпадают с shadcn, остальные с префиксами (`--sidebar-*`, `--status-*`, `--input-*`,
  `--surface-*`). `ring` в макете нет — взят `primary`. `.dark` выведена из светлой палитры: тёмной темы в макете нет.
- **Типографика.** 17 ролей макета — токены `--text-<роль>` с размером, line-height и весом. Один класс задаёт всё
  (`text-heading-page`, `text-body`, `text-caption`). Компонент `Typography` не создавался. Таблица ролей —
  `apps/web/docs/stack.md`.
- **Размеры.** Радиусы: `sm` 6, `md` 7, `lg` 8, `metric` 9, `xl` 10, `2xl` 12, `3xl` 14, `4xl` 24 px; `--radius` 8 px.
  Высоты контролов — варианты `size` в `cva`, отдельные токены не заводились.
- **Компоненты.** Переведены на токены и роли: Button, Input, Textarea, Checkbox, Label, Field, InputGroup,
  PasswordInput, Card, Badge, Dialog, Sheet, Tabs, Accordion, Command, Calendar, Sonner. Добавлены через `shadcn add`:
  Select, Alert. Собраны вручную по образцу существующих: Search, TaskCard (+ `TaskCardMenuButton`), MetricCard,
  NavigationItem, WorkspaceSwitcher, StatusSelect. Новых npm-пакетов нет.
- **Состояния.** Hover, focus и pressed в макете не показаны — собраны из существующих токенов, без новых цветов.
  Иконки остаются `lucide-react`: в макете это текстовые глифы, векторных SVG нет.
- **Правила.** `apps/web/AGENTS.md` (раздел Design system) синхронизирован с ADR-0006: источник правды — макет,
  токены вместо hex, варианты через `cva`, `shadcn add` или ручное исключение для компонентов вне shadcn.

## Проверки

`pnpm --filter web verify` зелёный: typecheck, ESLint + steiger, Prettier, 126 тестов (23 файла).
`pnpm --filter web build` зелёный. Hex в `shared/ui` не осталось, кроме брендовых цветов Google.

## Последствия и открытые вопросы

- Визуально не проверялись: страницы `login`, `register`, `landing`, Storybook, тёмная тема, новые состояния.
- Значения `.dark` и состояний выведены эвристически — нужно согласовать с дизайнером.
- Произвольные значения сохранены осознанно: заметка 10 px в `TaskCard`, `text-base` в `MetricCard`,
  `text-[0.8rem]` у `Button` `sm`. Старые варианты `xs`/`sm` и `default` у Input, Textarea, Select нужны страницам
  до их миграции на варианты макета.
- Мелочи: радиус Checkbox 4 px (точного значения в макете нет); иконка `more-horizontal` в макете против
  `more-vertical` в коде; иконки `Alert` подключает потребитель; нет stories у Input, Textarea, Checkbox.
- Тесты не писались по просьбе пользователя: Badge, Card, Dialog, Sheet, Command, Accordion, `TaskCardMenuButton`,
  цвета `Sonner`, состояния `SelectItem`, контролируемый `StatusSelect`, `NavigationItem` с `Link`.
- PR не открыт — только по просьбе пользователя.
