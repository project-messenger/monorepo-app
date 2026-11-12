# Пустая папка `pages`

Эта папка намеренно содержит только этот файл. **Не удаляйте её и не добавляйте сюда код.**

Next.js при поиске роутеров сначала смотрит `./pages` в корне проекта и только потом `./src/pages`.
У нас роутинг — App Router в корневом `app/`, а `src/pages` — слой Feature-Sliced Design. Без пустой
корневой папки Next примет `src/pages` за Pages Router, и сборка упадёт с ошибкой
«`pages` and `app` directories should be under the same folder».

Любой другой файл здесь Next превратил бы в маршрут Pages Router. Это запрещают:

- тест `tests/structure/root-pages.test.ts` (входит в `pnpm --filter web verify`);
- правило ESLint для `pages/**` в `eslint.config.mjs`.

Подробнее — `docs/architecture.md`, раздел «Почему в корне есть пустая `pages/`».
