import { defineConfig } from "orval";

// Схему отдаёт запущенный бэкенд (apps/api, @nestjs/swagger).
// Путь вывода совпадает с проверкой в .github/workflows/ci.yml.
export default defineConfig({
  api: {
    input: {
      target: process.env.API_SCHEMA_URL ?? "http://localhost:3001/api-json",
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
