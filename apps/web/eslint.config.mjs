import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Корневая pages/ должна оставаться пустой: иначе Next включит Pages Router.
  // Подробнее — pages/README.md.
  {
    files: ["pages/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program",
          message:
            "Корневая папка pages/ должна оставаться пустой: Next включит Pages Router. Страницы — в src/pages, роутинг — в app/.",
        },
      ],
    },
  },
  // Отключает правила ESLint, которые конфликтуют с Prettier. Должен идти последним.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Артефакты и сгенерированный код:
    "coverage/**",
    "storybook-static/**",
    "src/shared/api/generated/**",
  ]),
]);

export default eslintConfig;
