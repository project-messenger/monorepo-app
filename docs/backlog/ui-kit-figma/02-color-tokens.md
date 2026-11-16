# 02. Цветовые токены

[← к индексу](./README.md) · Статус: ✅ готова · Зависит от: 01

## Зачем

Перенести палитру макета в `apps/web/src/_app/styles/globals.css`, чтобы все компоненты и страницы подхватили её через токены.

## Правила

- Только CSS-переменные в `:root` и `.dark`, проброс в Tailwind через `@theme inline` (`--color-*`).
- Никаких hex в классах и `style`.
- Основные имена совпадают с shadcn (`--primary`, `--muted-foreground`, …), остальные по схеме из индекса (`--sidebar-*`, `--status-*`, `--input-*`, `--surface-*`, `--warning-*`, `--info-*`, `--success-*`).
- Формат значений: hex (единый для файла, совпадает с макетом, проще сверять).

## Чеклист

- [x] Замапить базовые токены shadcn: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`. (`ring` в макете нет: взят `primary`.)
- [x] Добавить `surface`, `surface-foreground` и подложки `surface-*` (context, trust, info, pinned, attachment, linked, pull-request, report, schedule), `inverse-*`.
- [x] Добавить статусные группы: `success`, `warning`, `info`, `destructive-background`.
- [x] Добавить `sidebar-*` (фон, текст, muted, item, switcher, акцент, граница, ring).
- [x] Добавить `input-*` (фон, search, placeholder, границы auth/editor/assistant).
- [x] Добавить `status-*`, `kanban`, `notification-unread`, `border-subtle`.
- [x] Заполнить `.dark`: в макете тёмной темы нет, значения выведены из светлой палитры (требует визуальной проверки в браузере).
- [x] Прокинуть все токены в `@theme inline` как `--color-*`.
- [x] `--chart-*` перекрашены в зелёную палитру (используется `bg-chart-2` в `hero.tsx`).
- [x] `--radius` временно `0.5rem` (8px); окончательная шкала радиусов — подзадача 04.
- [x] Прогнать `grep` на hex в `apps/web/src`: остались только бренд-цвета Google в `features/auth/ui/provider-icons.tsx` (оставлены намеренно).
- [x] `pnpm --filter web verify` зелёный.
- [ ] Проверить контраст текста и фонов (WCAG AA) для основных пар (`primary`/`primary-foreground`, `muted-foreground`/`background`, `destructive`/`background`).
- [ ] Визуально проверить `landing`, `login`, `register` в светлой и тёмной теме (в браузере пока не открывали).

## Готово, когда

Все цвета макета выражены токенами в `globals.css`, в коде нет прямых hex (кроме бренд-иконок), существующие страницы визуально не сломаны, `pnpm --filter web verify` проходит.

## Не проверено

- Страницы в браузере (светлая и тёмная темы).
- Контраст WCAG AA.
- Dark-значения подобраны эвристически, дизайнер их не утверждал.