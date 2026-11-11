import type { RequestHandler } from "msw";

// Обработчики MSW по умолчанию для тестов (и позже — для Storybook).
// В отдельном тесте переопределяются через server.use(...).
export const handlers: RequestHandler[] = [];
