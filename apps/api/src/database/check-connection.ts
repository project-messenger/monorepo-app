import { sql } from 'drizzle-orm';
import type { Database } from './database.js';

/**
 * Runs `select 1`, so the server stops at startup with a clear message when
 * PostgreSQL is unreachable, not on the first request. Called from main.ts
 * only: e2e tests and `pnpm --filter api openapi` (in CI too) build the app
 * without a database.
 */
export async function checkDatabaseConnection(
  db: Database,
  address: string,
): Promise<void> {
  try {
    await db.execute(sql`select 1`);
  } catch (err) {
    throw new Error(
      `Cannot connect to PostgreSQL at ${address}. Start it with \`pnpm infra:up\` ` +
        'and check POSTGRES_* in the root .env.',
      { cause: err },
    );
  }
}
