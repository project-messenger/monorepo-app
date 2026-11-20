import { z } from 'zod';

/**
 * Environment variables of the backend. ConfigModule validates `process.env` and
 * the root `.env` against this schema at startup: an invalid value stops the app
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
  POSTGRES_HOST: z.string().trim().min(1).default('127.0.0.1'),
  POSTGRES_PORT: z.coerce.number().int().min(1).max(65535).default(5432),
  POSTGRES_DB: z.string().min(1).default('messenger'),
  POSTGRES_USER: z.string().min(1).default('messenger'),
  POSTGRES_PASSWORD: z.string().min(1).default('messenger_local'),
  REDIS_HOST: z.string().trim().min(1).default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().int().min(1).max(65535).default(6379),
  REDIS_DB: z.coerce.number().int().min(0).default(0),
});

export type Env = z.infer<typeof envSchema>;
