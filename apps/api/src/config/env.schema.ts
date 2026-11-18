import { z } from 'zod';

/**
 * Environment variables of the backend. ConfigModule validates `process.env` and
 * `apps/api/.env` against this schema at startup: an invalid value stops the app
 * with the variable name in the error. Variables with a default are optional.
 */
export const envSchema = z.object({
  // Values in the environment are strings, so numbers are coerced.
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  // The frontend address allowed by CORS. The browser sends it in the `Origin`
  // header without a path or trailing slash, so anything else would never match.
  // `abort: true` stops here on an invalid URL, so `new URL()` below never throws.
  CORS_ORIGIN: z
    .url({ protocol: /^https?$/, abort: true })
    .refine((value) => new URL(value).origin === value, {
      message: 'must be an origin without a path, e.g. http://localhost:3000',
    })
    .default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;
