import { envSchema } from './env.schema.js';

describe('envSchema', () => {
  it('uses defaults when variables are not set', () => {
    expect(envSchema.parse({})).toEqual({ PORT: 3001 });
  });

  it('converts PORT from a string to a number', () => {
    expect(envSchema.parse({ PORT: '4000' })).toEqual({ PORT: 4000 });
  });

  it.each(['abc', '0', '70000', '30.5'])('rejects PORT=%s', (port) => {
    const result = envSchema.safeParse({ PORT: port });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['PORT']);
  });
});
