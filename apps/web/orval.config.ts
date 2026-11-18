import { defineConfig } from "orval";

// Схема — файл apps/api/openapi.json (пишет `pnpm --filter api openapi`), бэкенд запускать не нужно.
// Путь вывода совпадает с проверкой в .github/workflows/ci.yml.
export default defineConfig({
  api: {
    input: {
      target: "../api/openapi.json",
    },
    output: {
      mode: "tags-split",
      target: "src/shared/api/generated/endpoints.ts",
      schemas: "src/shared/api/generated/model",
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      formatter: "prettier",
    },
  },
});
