import { envSchema } from './env.schema.js';

describe('envSchema', () => {
  it('uses defaults when variables are not set', () => {
    expect(envSchema.parse({})).toEqual({
      PORT: 3001,
      CORS_ORIGIN: 'http://localhost:3000',
      POSTGRES_HOST: '127.0.0.1',
      POSTGRES_PORT: 5432,
      POSTGRES_DB: 'messenger',
      POSTGRES_USER: 'messenger',
      POSTGRES_PASSWORD: 'messenger_local',
      REDIS_HOST: '127.0.0.1',
      REDIS_PORT: 6379,
      REDIS_DB: 0,
    });
  });

  it('converts PORT from a string to a number', () => {
    expect(envSchema.parse({ PORT: '4000' }).PORT).toBe(4000);
  });

  it.each(['abc', '0', '70000', '30.5'])('rejects PORT=%s', (port) => {
    const result = envSchema.safeParse({ PORT: port });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['PORT']);
  });

  it('accepts CORS_ORIGIN as an origin', () => {
    expect(
      envSchema.parse({ CORS_ORIGIN: 'https://app.example.com' }).CORS_ORIGIN,
    ).toBe('https://app.example.com');
  });

  it('accepts custom service addresses and converts ports and Redis database', () => {
    expect(
      envSchema.parse({
        POSTGRES_HOST: 'db.example.com',
        POSTGRES_PORT: '55432',
        POSTGRES_DB: 'custom_db',
        POSTGRES_USER: 'custom_user',
        POSTGRES_PASSWORD: 'local_test_password',
        REDIS_HOST: 'redis.example.com',
        REDIS_PORT: '56379',
        REDIS_DB: '2',
      }),
    ).toMatchObject({
      POSTGRES_HOST: 'db.example.com',
      POSTGRES_PORT: 55432,
      POSTGRES_DB: 'custom_db',
      POSTGRES_USER: 'custom_user',
      POSTGRES_PASSWORD: 'local_test_password',
      REDIS_HOST: 'redis.example.com',
      REDIS_PORT: 56379,
      REDIS_DB: 2,
    });
  });

  it.each(['POSTGRES_PORT', 'REDIS_PORT'])(
    'rejects invalid %s values',
    (key) => {
      for (const value of ['abc', '', '0', '65536', '30.5']) {
        const result = envSchema.safeParse({ [key]: value });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0]?.path).toEqual([key]);
      }
    },
  );

  it.each(['abc', '-1', '1.5'])('rejects REDIS_DB=%s', (value) => {
    expect(envSchema.safeParse({ REDIS_DB: value }).success).toBe(false);
  });

  it.each([
    'POSTGRES_HOST',
    'POSTGRES_DB',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'REDIS_HOST',
  ])('rejects an empty %s', (key) => {
    const result = envSchema.safeParse({ [key]: '' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual([key]);
  });

  it.each([
    'not-a-url',
    'localhost:3000',
    'ftp://app.example.com',
    'http://localhost:3000/',
    'http://a.com/app',
  ])('rejects CORS_ORIGIN=%s', (origin) => {
    const result = envSchema.safeParse({ CORS_ORIGIN: origin });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['CORS_ORIGIN']);
  });
});
