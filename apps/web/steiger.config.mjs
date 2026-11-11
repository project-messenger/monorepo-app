import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // По гайду FSD для Next.js слои app и pages называются _app и _pages:
    // папку src/pages Next принял бы за Pages Router. Как слои steiger их распознаёт
    // (запрет импортов вверх и между слайсами работает), но считает имена опечаткой.
    files: ["./src/_app/**", "./src/_pages/**"],
    rules: {
      "fsd/typo-in-layer-name": "off",
    },
  },
  {
    ignores: ["./src/shared/api/generated/**"],
  },
]);
