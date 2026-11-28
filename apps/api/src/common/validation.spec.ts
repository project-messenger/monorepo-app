import { z } from 'zod';
import { toFieldErrors } from './validation.js';

describe('toFieldErrors', () => {
  it('joins the path with dots', () => {
    expect(
      toFieldErrors([
        { message: 'Too short', path: ['name'] },
        { message: 'Required', path: ['items', 0, { key: 'title' }] },
      ]).map((e) => e.path),
    ).toEqual(['name', 'items.0.title']);
  });

  it('uses an empty path for an issue with the whole body', () => {
    expect(toFieldErrors([{ message: 'Expected object' }])).toEqual([
      { path: '', code: 'custom', message: 'Expected object' },
    ]);
  });

  it('keeps the code Zod gives each issue', () => {
    const result = z
      .object({ name: z.string().min(2), email: z.email() })
      .safeParse({ name: 'A', email: 'nope' });

    expect(
      toFieldErrors(result.error?.issues ?? []).map(({ path, code }) => ({
        path,
        code,
      })),
    ).toEqual([
      { path: 'name', code: 'too_small' },
      { path: 'email', code: 'invalid_format' },
    ]);
  });
});
