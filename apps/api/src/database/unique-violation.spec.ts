import { DrizzleQueryError } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import { isUniqueViolation } from './unique-violation.js';

// The same shape `pg` throws: the error code and constraint come from the server.
function pgError(code: string, constraint?: string): DatabaseError {
  const error = new DatabaseError('duplicate key value', 0, 'error');
  error.code = code;
  error.constraint = constraint;
  return error;
}

function queryError(cause?: Error): DrizzleQueryError {
  return new DrizzleQueryError('insert into "users" ...', [], cause);
}

describe('isUniqueViolation', () => {
  it('detects a unique violation with any constraint', () => {
    expect(
      isUniqueViolation(queryError(pgError('23505', 'users_email_unique'))),
    ).toBe(true);
  });

  it('matches the given constraint name', () => {
    const err = queryError(pgError('23505', 'users_email_unique'));

    expect(isUniqueViolation(err, 'users_email_unique')).toBe(true);
    expect(isUniqueViolation(err, 'messages_user_client_unique')).toBe(false);
  });

  it('ignores other database errors', () => {
    // 23503 — foreign_key_violation
    expect(
      isUniqueViolation(queryError(pgError('23503', 'users_email_unique'))),
    ).toBe(false);
  });

  it('ignores errors that did not come from a query', () => {
    expect(isUniqueViolation(pgError('23505'))).toBe(false);
    expect(isUniqueViolation(new Error('23505'))).toBe(false);
    expect(isUniqueViolation(queryError())).toBe(false);
    expect(isUniqueViolation(undefined)).toBe(false);
  });
});
