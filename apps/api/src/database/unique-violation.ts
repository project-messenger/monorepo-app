import { DrizzleQueryError } from 'drizzle-orm';

/** PostgreSQL error code `unique_violation`. */
const UNIQUE_VIOLATION = '23505';

/**
 * True when a query failed because it broke a UNIQUE constraint, e.g. a second
 * user with the same email. Pass the constraint name to tell one unique
 * constraint from another, so an unexpected duplicate is not swallowed by
 * mistake.
 *
 * Drizzle wraps driver errors in `DrizzleQueryError`; the `pg` error with
 * `code` and `constraint` is in its `cause` (ADR-0012).
 *
 * ```ts
 * try {
 *   await this.db.insert(users).values(user);
 * } catch (err) {
 *   if (isUniqueViolation(err, 'users_email_unique')) throw new ConflictException(...);
 *   throw err;
 * }
 * ```
 */
export function isUniqueViolation(err: unknown, constraint?: string): boolean {
  if (!(err instanceof DrizzleQueryError)) return false;
  const cause: unknown = err.cause;
  if (typeof cause !== 'object' || cause === null) return false;
  if (!('code' in cause) || cause.code !== UNIQUE_VIOLATION) return false;
  if (constraint === undefined) return true;
  return 'constraint' in cause && cause.constraint === constraint;
}
