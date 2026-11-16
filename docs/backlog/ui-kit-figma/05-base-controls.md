# 05. Базовые контролы

[← к индексу](./README.md) · Статус: ✅ готова (осталась визуальная проверка в браузере) · Зависит от: 02, 03, 04

## Зачем

Подогнать существующие компоненты форм под макет: цвета, размеры, радиусы, типографику.

## Компоненты

`button.tsx`, `input.tsx`, `textarea.tsx`, `checkbox.tsx`, `label.tsx`, `field.tsx`, `input-group.tsx`, `password-input.tsx`.

## Данные макета

- Button: варианты `primary`, `surface`, `soft`, `secondary`, `accent`; высоты 40 / 44 / 48 / 50; radius 7–8; иконки plus / arrow.
- Input: `auth` 52, `app` 48, `settings` 44; граница auth `#DCE4DF` отличается от основной.
- Textarea: высота 86, radius 7.
- Checkbox: размер 15, checked / unchecked.

## Правила

- Только токены и `cva`. Base UI примитивы и логику доступности не трогаем.
- Состояния hover / focus / pressed / disabled в макете не показаны: сохраняем из shadcn, перекрашиваем токенами.
- Существующие варианты и размеры (`default`, `outline`, `ghost`, `destructive`, `link`, `xs`, `sm`, `lg`, `icon*`) не меняем: ими пользуются страницы и компоненты. Варианты макета добавляются рядом, поведение по умолчанию сохранено.

## Что сделано

| Компонент | Изменение |
| --- | --- |
| `button.tsx` | Варианты `surface`, `soft`, `accent`; размеры `app` (h-10, rounded-md), `app-lg` (h-11), `landing` (h-12, rounded-lg), `auth` (h-[50px], rounded-lg); типографика `text-label-button`. `primary` макета = существующий `default`. |
| `input.tsx` | Переведён на `cva`: `default` (прежний вид), `auth` (h-[52px], rounded-xl, граница `input-auth-border`, фон `surface`), `app` (h-12, rounded-md, фон `input-background`), `settings` (h-11, rounded-sm). Экспортируется `inputVariants`. |
| `textarea.tsx` | Переведён на `cva`: `default` (прежний вид), `app` (min-h-[86px], rounded-md, фон `input-background`). Экспортируется `textareaVariants`. |
| `input-group.tsx` | Контейнер `InputGroup` на `cva`: `default`, `app` (h-12), `settings` (h-11), те же радиусы и фон, что у Input. |
| `password-input.tsx` | Пробрасывает `variant` в `Input`. |
| `checkbox.tsx` | Размер 15 px, иконка 11 px. |
| `label.tsx`, `field.tsx` | `Label` и `FieldTitle` на `text-label-field`; `FieldDescription` и `FieldError` на `text-body-small`. |

## Чеклист

- [x] Button: варианты `surface`, `soft`, `accent`, размеры `app`, `app-lg`, `landing`, `auth`; обновлены `button.stories.tsx` и `button.test.tsx`.
- [x] Input: варианты `auth`, `app`, `settings`; граница, фон и placeholder из токенов; добавлен `input.test.tsx`.
- [x] Textarea: размер и радиус по макету; добавлен `textarea.test.tsx`.
- [x] Checkbox: размер 15 px (иконка 11 px). Цвета checked/unchecked остаются от токенов `primary` и `input` (в макете чекбокс нарисован глифами, отдельных цветов нет).
- [x] Label и Field: типографика `label-field` и `body-small`, цвет ошибки `destructive`.
- [x] InputGroup и PasswordInput: те же высоты и радиусы, что у Input.
- [x] Тесты рядом с изменённой логикой: 85 тестов (было 65).
- [x] `pnpm --filter web verify` зелёный (typecheck, ESLint + steiger, Prettier, vitest).
- [ ] Проверить визуально страницы `login`, `register`, `landing` в браузере (не проверялось).
- [ ] Добавить stories для `Input`, `Textarea`, `Checkbox` (делается в подзадаче 09).
- [ ] Радиус Checkbox оставлен `rounded-[4px]`: в макете точного значения нет.

## Готово, когда

Контролы форм визуально соответствуют разделам Button / Input / Textarea / Checkbox макета.

## Не проверено

- Внешний вид форм `login`, `register` и `landing` в браузере: изменились радиусы (подзадача 04) и типографика подписей полей.
- Hover / focus / pressed новых вариантов Button (в макете их нет, взяты по аналогии с `default`).
