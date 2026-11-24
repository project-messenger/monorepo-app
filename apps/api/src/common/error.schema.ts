import { z } from 'zod';

/**
 * Machine-readable reasons for an error. The frontend decides by the code what
 * to show and keeps the user-facing (Russian) texts itself; `message` is for
 * developers and logs. Nest 12 puts the code in the body as `errorCode`:
 * `throw new ConflictException('Email is already taken', { errorCode: 'email_taken' })`.
 * A new code goes here, so it reaches the OpenAPI document and the Orval types.
 */
export const ErrorCodeSchema = z
  .enum([
    // 400: the body failed validation; details in `errors`.
    'validation_failed',
    // 409 on register.
    'email_taken',
    // 401 on login: wrong email or password (one code for both).
    'invalid_credentials',
    // 401 from @nestjs/authentication: the request has no session cookie.
    'missing_credentials',
  ])
  .meta({ id: 'ErrorCode' });
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

/**
 * The body of every error response. It is Nest's own shape, so a plain
 * `throw new ConflictException(...)` already answers with it, and so do the
 * errors of `@nestjs/authentication`. `errorCode` is optional: some errors carry
 * none (an expired session, 403 for an untrusted origin, 5xx); the client
 * handles those by `statusCode`.
 */
export const ErrorResponseSchema = z
  .object({
    statusCode: z.number(),
    message: z.string(),
    error: z.string().optional(),
    errorCode: ErrorCodeSchema.optional(),
  })
  .meta({ id: 'ErrorResponse' });
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const FieldErrorSchema = z
  .object({
    /** Dotted path to the field, e.g. `email` or `items.0.name`; `''` for the whole body. */
    path: z.string(),
    /**
     * Why the field is invalid, as Zod names it: `too_small`, `too_big`,
     * `invalid_format`, `invalid_type`, … `custom` when the validator gave none.
     */
    code: z.string(),
    message: z.string(),
  })
  .meta({ id: 'FieldError' });
export type FieldError = z.infer<typeof FieldErrorSchema>;

/** 400 from the validation pipe: one entry per invalid field, so the client can show it next to the input. */
export const ValidationErrorResponseSchema = z
  .object({
    statusCode: z.literal(400),
    message: z.string(),
    error: z.string(),
    errorCode: z.literal('validation_failed'),
    errors: z.array(FieldErrorSchema),
  })
  .meta({ id: 'ValidationErrorResponse' });
export type ValidationErrorResponse = z.infer<
  typeof ValidationErrorResponseSchema
>;
