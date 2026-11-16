# 06. Select и Alert

[← к индексу](./README.md) · Статус: ✅ готова (осталась визуальная проверка в браузере) · Зависит от: 02, 03, 04

## Зачем

Добавить компоненты, которых нет в `shared/ui`, но есть в макете. Оба есть в shadcn: добавлены через `shadcn add` (подтверждено пользователем).

## Данные макета

- Select: `app` 48 (radius 7, фон `input-background`, граница `border`), `settings` 44 (radius 6); только закрытое состояние с chevron. Открытое меню в макете не показано: стили меню берём из shadcn и токенов.
- Alert: `success` 48 (иконка check), `destructive` 45, `warning` 72.

## Что сделано

| Компонент | Изменение |
| --- | --- |
| `select.tsx` | Создан через `shadcn add`. Триггер переведён на `cva`: `default` (вид shadcn), `app` (h-12, rounded-md, фон `input-background`), `settings` (h-11, rounded-sm). Пункты списка на `text-body`. Экспортируется `selectTriggerVariants`. Chevron из `lucide-react` (из shadcn). |
| `alert.tsx` | Создан через `shadcn add`, переписан на `cva`: `default`, `success` (min-h-12, rounded-lg, `success-background`, текст `primary`), `destructive` (min-h-[45px], rounded-sm, `destructive-background`), `warning` (min-h-[72px], rounded-md, `warning-background`, заголовок `warning-heading`, описание `warning-body`). Типографика `text-body`, `text-body-small`, `text-label-field`. Экспортируется `alertVariants`. |
| `select.stories.tsx`, `alert.stories.tsx` | Stories по всем вариантам. |
| `select.test.tsx`, `alert.test.tsx` | Тесты: отрисовка вариантов Alert, значение и открытие списка Select, классы вариантов, `default` не изменился. |

## Чеклист

- [x] Выполнить `pnpm --filter web exec shadcn add select alert`. Создано 2 файла, `package.json` и `pnpm-lock.yaml` не изменились (единственная «зависимость» `cn` — workspace-алиас), новых npm-пакетов нет.
- [x] Select: высоты 48 и 44, граница, radius, chevron из `lucide-react`.
- [x] Alert: варианты `success`, `destructive`, `warning` через `cva`, цвета из групп токенов `success-*`, `warning-*`, `destructive-*`.
- [x] Stories для обоих компонентов.
- [x] Тесты на отрисовку вариантов Alert и открытие Select (поведение примитива не менялось).
- [x] `pnpm --filter web verify` зелёный: typecheck, ESLint + steiger, Prettier, 97 тестов (было 85).
- [ ] Иконка check в `success` и иконки в других вариантах: в stories не показаны, подключаются потребителем (`lucide-react`).
- [ ] Визуальная проверка в Storybook и браузере (не проводилась).

## Готово, когда

`@/shared/ui/select` и `@/shared/ui/alert` существуют, соответствуют макету и имеют stories и тесты.

## Не проверено

- Внешний вид Select и Alert в браузере и Storybook.
- Открытое меню Select (в макете отсутствует, стили из shadcn с токенами).
- Тёмная тема для новых компонентов.