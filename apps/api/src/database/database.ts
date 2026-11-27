import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

/**
 * Type of the database injected with `@InjectDrizzle()`:
 *
 * ```ts
 * constructor(@InjectDrizzle() private readonly db: Database) {}
 * ```
 */
export type Database = NodePgDatabase;
