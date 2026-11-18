import { z } from 'zod';

/**
 * Environment variables of the backend. ConfigModule validates `process.env` and
 * `apps/api/.env` against this schema at startup: an invalid value stops the app
 * with the variable name in the error. Variables with a default are optional.
 */
export const envSchema = z.object({
  // Values in the environment are strings, so numbers are coerced.
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
});

export type Env = z.infer<typeof envSchema>;
