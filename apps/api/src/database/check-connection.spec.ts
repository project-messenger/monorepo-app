import { checkDatabaseConnection } from './check-connection.js';
import type { Database } from './database.js';

function fakeDb(execute: () => Promise<unknown>): Database {
  return { execute } as unknown as Database;
}

describe('checkDatabaseConnection', () => {
  it('passes when the database answers', async () => {
    const execute = vi.fn().mockResolvedValue({ rows: [] });

    await expect(
      checkDatabaseConnection(fakeDb(execute), '127.0.0.1:5432'),
    ).resolves.toBeUndefined();
    expect(execute).toHaveBeenCalledOnce();
  });

  it('names the address and keeps the driver error as the cause', async () => {
    const refused = new Error('connect ECONNREFUSED 127.0.0.1:5432');
    const db = fakeDb(vi.fn().mockRejectedValue(refused));

    const error = await checkDatabaseConnection(db, '127.0.0.1:5432').catch(
      (err: unknown) => err,
    );

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain('127.0.0.1:5432');
    expect((error as Error).message).toContain('pnpm infra:up');
    expect((error as Error).cause).toBe(refused);
  });
});
