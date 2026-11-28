import { z } from 'zod';

// One rule for register, login and the stored value (PR 2: the unique index is
// on the normalized email): trim → Unicode NFC → lower case, the same rule
// @nestjs/authentication uses. ` Foo@Bar.com ` and `foo@bar.com` are one
// account. The overwrites run in order before `.check(z.email())`; `z.email()`
// as the base type would check the format first and reject the spaces. The
// check keeps `format: email` in OpenAPI (a `.pipe()` would drop it).
// https://zod.dev/packages/core?id=checks
const email = z
  .string()
  .trim()
  .normalize('NFC')
  .toLowerCase()
  .check(z.email())
  .max(254);

export const UserSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
  })
  .meta({ id: 'User' });
export type User = z.infer<typeof UserSchema>;

export const RegisterRequestSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email,
    // Upper bound: hashing a huge string is slow, so a long password is a cheap DoS.
    password: z.string().min(8).max(128),
  })
  .meta({ id: 'RegisterRequest' });
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z
  .object({
    email,
    // No min length here: the length rule is for new passwords only, and a
    // "too short" error would tell an attacker something about the account.
    password: z.string().min(1).max(128),
  })
  .meta({ id: 'LoginRequest' });
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
