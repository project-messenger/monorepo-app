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

В `vitest.config.mts` число рабочих процессов ограничено двумя (`maxWorkers: 2`):
при одновременном запуске множества отдельных jsdom-окружений наблюдались нестабильные таймауты
в стандартном прогоне на рабочей машине. Все тесты и изоляция сохраняются, лимиты времени
не увеличены. Это настройка нагрузки тестового раннера, а не изменение поведения компонентов;
точная внутренняя причина задержек не установлена.

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

## Контрольные ширины лендинга

`e2e/viewports.ts` задаёт ровно три ширины браузера в CSS px: desktop 1440, mobile 375,
narrowMobile 320. Это точки проверки исходного desktop-макета и двух узких экранов,
а не CSS breakpoints и не ограничение ширины устройств. `e2e/landing.spec.ts` использует
их для проверки переполнения, геометрии, типографики, юридических ссылок, клавиатурного
фокуса, hover, тёмной темы и открытия регистрации в отдельной вкладке. Скриншоты секций
сохраняются в `test-results/`.

`e2e/link.spec.ts` использует те же ширины для страницы входа: проверяет
полную роль типографики ссылки восстановления пароля, клавиатурный фокус, hover
и отсутствие горизонтального переполнения в светлой и тёмной темах.

`AUTH_VIEWPORTS` в `e2e/viewports.ts` дополняет основные ширины точками 768, 1023, 1024 px,
ноутбуком 1280×800 и desktop 1440×900. `e2e/auth-story.spec.ts` открывает вход и регистрацию
в обеих темах: проверяет отсутствие лишней прокрутки при достаточной высоте окна,
видимость панели на границе `lg`, читаемую ширину формы, клавиатурную навигацию на главную
и мобильный логотип. Скриншоты всех сочетаний сохраняются в `test-results/`.

Для уже запущенного preview задайте `PLAYWRIGHT_BASE_URL` (тогда Playwright не запускает
и не переиспользует dev-сервер). `PLAYWRIGHT_EXECUTABLE_PATH` позволяет использовать
локальный Chromium-совместимый браузер, например Microsoft Edge. Без этих переменных
сохраняется стандартный запуск из `playwright.config.ts`.

## Storybook — каталог компонентов

```bash
pnpm --filter web storybook   # http://localhost:6006
```

Story — файл `*.stories.tsx` рядом с компонентом, где описаны его состояния (варианты, disabled, ошибка, загрузка).
Сюда смотрят дизайнер и ревьюер, чтобы проверить компонент без запуска всего приложения. Пишите stories для
компонентов `shared/ui` и для заметных компонентов `entities` и `widgets`.

Стили Tailwind в Storybook подключены через `@tailwindcss/vite`; глобальные стили — в `.storybook/preview.ts`.
