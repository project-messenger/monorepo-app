import { LoginRequestSchema, RegisterRequestSchema } from './auth.schema.js';

describe('email normalization', () => {
  it('trims and lowercases the email in register and login alike', () => {
    const register = RegisterRequestSchema.parse({
      name: 'Ann',
      email: '  Ann@Example.COM ',
      password: 'secret-123',
    });
    const login = LoginRequestSchema.parse({
      email: 'ann@EXAMPLE.com\t',
      password: 'x',
    });

    expect(register.email).toBe('ann@example.com');
    expect(login.email).toBe('ann@example.com');
  });

  it('checks the format after normalizing', () => {
    const result = LoginRequestSchema.safeParse({
      email: '  not-an-email ',
      password: 'x',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ['email'],
      code: 'invalid_format',
    });
  });

  it('rejects non-ASCII addresses, so NFC only guards a future wider format', () => {
    // Zod's default email pattern is ASCII-only. If it is ever widened, NFC
    // keeps both spellings of "é" (one character, or "e" + an accent) one
    // account.
    expect(
      LoginRequestSchema.safeParse({
        email: 'cafe\u0301@example.com',
        password: 'x',
      }).success,
    ).toBe(false);
  });
});
