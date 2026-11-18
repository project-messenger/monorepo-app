import { envSchema } from './env.schema.js';

describe('envSchema', () => {
  it('uses defaults when variables are not set', () => {
    expect(envSchema.parse({})).toEqual({
      PORT: 3001,
      CORS_ORIGIN: 'http://localhost:3000',
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
