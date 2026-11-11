# Тестирование

[← к README](../README.md)

## Что чем тестировать

| Что проверяем                             | Инструмент                     | Где лежит                                     | Команда                       |
| ----------------------------------------- | ------------------------------ | --------------------------------------------- | ----------------------------- |
| Функции, схемы, хуки без UI               | Vitest                         | рядом с кодом: `schemas.test.ts`              | `pnpm --filter web test`      |
| Компонент: рендер, клики, ввод            | Vitest + React Testing Library | рядом с компонентом: `register-form.test.tsx` | то же                         |
| Запросы к бэкенду в тестах                | MSW                            | обработчики — `src/shared/api/mocks/`         | —                             |
| Сценарий целиком в браузере               | Playwright                     | `e2e/*.spec.ts`                               | `pnpm --filter web test:e2e`  |
| Внешний вид компонента во всех состояниях | Storybook                      | рядом с компонентом: `button.stories.tsx`     | `pnpm --filter web storybook` |

Примеры в проекте, с которых удобно начинать:

- `src/features/auth/model/schemas.test.ts` — тест zod-схемы.
- `src/features/auth/ui/register-form.test.tsx` — тест формы через RTL.
- `src/shared/api/session.test.ts` — тест функции запроса.
- `src/shared/ui/button.stories.tsx` — story компонента.
- `e2e/smoke.spec.ts` — e2e-тест.

## Vitest + React Testing Library

Тест описывает то, **что видит и делает пользователь**, а не внутреннее устройство компонента:

```tsx
it("показывает ошибку пустого email", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.click(screen.getByRole("button", { name: "Войти" }));

  expect(await screen.findByText("Введите email")).toBeInTheDocument();
});
```

- Ищите элементы так, как их находит человек: `getByRole("button", { name: "Войти" })`, `getByLabelText("Email")`,
  `getByText(...)`. `querySelector` и `data-testid` — в крайнем случае.
- Действия — через `userEvent` (печатает по символу и кликает как настоящий пользователь), а не `fireEvent`.
- То, что появляется после действия, ищите через `findBy…` — он дождётся.
- Матчеры вроде `toBeInTheDocument()`, `toBeDisabled()` — из `@testing-library/jest-dom`, подключены в `vitest.setup.ts`.

### Частая ловушка: хуки Next.js

Вне Next.js `useSearchParams()`, `useRouter()` и т. п. не работают (`useSearchParams` возвращает `null`).
Если компонент их использует — замокайте модуль в тесте:

```ts
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("returnTo=/chats"),
}));
```

Пример — `src/features/auth/ui/oauth-buttons.test.tsx`.

## MSW — подмена бэкенда

[MSW](https://mswjs.io/) перехватывает запросы `fetch` в тестах и отвечает тем, что вы описали. Он уже запущен
для всех тестов (`vitest.setup.ts`) и настроен строго: **запрос без обработчика роняет тест** — в unit-тестах не
должно быть походов в сеть.

```ts
import { http, HttpResponse } from "msw";
import { server } from "@/shared/api/mocks/node";

it("показывает имя пользователя", async () => {
  server.use(
    http.get("http://localhost:3001/auth/me", () =>
      HttpResponse.json({ id: "…", email: "you@company.ru", name: "Иван" }),
    ),
  );
  // ...рендер и проверки
});
```

- `server.use(...)` действует до конца теста — после каждого теста обработчики сбрасываются.
- Обработчики, нужные многим тестам, кладите в `src/shared/api/mocks/handlers.ts`.
- В проекте MSW версии 3: опция строгого режима называется `onUnhandledFrame` (в старых статьях — `onUnhandledRequest`).

## Playwright — e2e

Настоящий браузер открывает настоящие страницы. Конфиг — `playwright.config.ts`: он сам поднимает
`pnpm dev`, если фронтенд ещё не запущен.

```bash
pnpm --filter web test:e2e:install   # один раз: скачать Chromium
pnpm --filter web test:e2e
```

Для мессенджера Playwright особенно полезен: в одном тесте можно открыть **два браузерных контекста** —
двух пользователей — и проверить, что сообщение доходит, а после переподключения пропущенные сообщения
догружаются. ТЗ требует такой прототип ещё до основной разработки.

```ts
test("сообщение доходит до второго пользователя", async ({ browser }) => {
  const alice = await (await browser.newContext()).newPage();
  const bob = await (await browser.newContext()).newPage();
  // ...
});
```

## Storybook — каталог компонентов

```bash
pnpm --filter web storybook   # http://localhost:6006
```

Story — файл `*.stories.tsx` рядом с компонентом, где описаны его состояния (варианты, disabled, ошибка, загрузка).
Сюда смотрят дизайнер и ревьюер, чтобы проверить компонент без запуска всего приложения. Пишите stories для
компонентов `shared/ui` и для заметных компонентов `entities` и `widgets`.

Стили Tailwind в Storybook подключены через `@tailwindcss/vite`; глобальные стили — в `.storybook/preview.ts`.
