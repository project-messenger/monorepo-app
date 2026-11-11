// lint-staged ставится в корне монорепы и для файлов apps/web берёт этот конфиг.
// Задачи lint-staged запускает из корня репозитория, поэтому ESLint и Prettier
// явно вызываются из apps/web: там их конфиги и плагины.
const webDir = import.meta.dirname.replaceAll("\\", "/");

const inWeb = (command, files) =>
  `pnpm --dir "${webDir}" exec ${command} ${files.map((file) => `"${file}"`).join(" ")}`;

const config = {
  "*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}": (files) => [
    inWeb("eslint --fix --no-warn-ignored", files),
    inWeb("prettier --write", files),
  ],
  "*.{json,css,md,yml,yaml}": (files) => inWeb("prettier --write", files),
};

export default config;
