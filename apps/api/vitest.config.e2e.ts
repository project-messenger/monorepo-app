import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Environment variables win over the root .env, so a developer's local
    // .env can't change what the tests expect (CORS tests send this origin).
    env: { CORS_ORIGIN: 'http://localhost:3000' },
  },
});
