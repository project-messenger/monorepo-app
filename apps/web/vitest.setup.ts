import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "@/shared/api/mocks/node";

// Запрос (или WebSocket), для которого нет обработчика MSW, роняет тест:
// в unit-тестах не должно быть походов в сеть. В MSW 3 опция называется
// onUnhandledFrame (в MSW 2 была onUnhandledRequest).
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));

afterEach(() => {
  server.resetHandlers();
  // Без globals: true RTL не очищает DOM сам.
  cleanup();
});

afterAll(() => server.close());
