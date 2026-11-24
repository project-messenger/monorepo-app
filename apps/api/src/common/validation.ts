import {
  BadRequestException,
  StandardSchemaValidationPipe,
  type StandardSchemaValidationPipeOptions,
} from '@nestjs/common';
import type { FieldError, ValidationErrorResponse } from './error.schema.js';

/**
 * The issues the pipe reports. Taken from the pipe's own options, so we don't add
 * `@standard-schema/spec` as a dependency just for one type.
 */
type Issues = Parameters<
  NonNullable<StandardSchemaValidationPipeOptions['exceptionFactory']>
>[0];

/** Turns Standard Schema issues into `{ path, code, message }`, `path` dotted. */
export function toFieldErrors(issues: Issues): FieldError[] {
  return issues.map((issue) => ({
    path: (issue.path ?? [])
      .map((segment) =>
        String(typeof segment === 'object' ? segment.key : segment),
      )
      .join('.'),
    code: issueCode(issue),
    message: issue.message,
  }));
}

/**
 * The Standard Schema spec has no `code` in an issue, but Zod puts one there
 * (`too_small`, `invalid_format`, …). Read it if present, else `custom`.
 */
function issueCode(issue: Issues[number]): string {
  return 'code' in issue && typeof issue.code === 'string'
    ? issue.code
    : 'custom';
}

/**
 * Validates `@Body({ schema })`, `@Param(..., { schema })` and `@Query({ schema })`
 * with Zod. Nest's default 400 lists messages as `"path: message"` strings; we
 * answer with `errors: [{ path, code, message }]` instead, so the frontend can map an
 * error to its form field without parsing text.
 */
export function createValidationPipe(): StandardSchemaValidationPipe {
  return new StandardSchemaValidationPipe({
    exceptionFactory: (issues) => {
      const body: ValidationErrorResponse = {
        statusCode: 400,
        message: 'Validation failed',
        error: 'Bad Request',
        errorCode: 'validation_failed',
        errors: toFieldErrors(issues),
      };
      return new BadRequestException(body);
    },
  });
}
