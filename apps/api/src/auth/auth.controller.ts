import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponseSchema,
  ErrorResponseSchema,
} from '../common/error.schema.js';
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  UserSchema,
  type LoginRequest,
  type RegisterRequest,
  type User,
} from './auth.schema.js';

// Every state-changing request (POST, PUT, PATCH, DELETE) from an origin other
// than CORS_ORIGIN gets 403 from `app.enableCsrfProtection()` (src/app.setup.ts)
// before it reaches a handler. Describe it on every such endpoint.
const CROSS_ORIGIN_REFUSED =
  'The request came from an untrusted origin (not CORS_ORIGIN). Not a user error: the frontend address is misconfigured, or it is a CSRF attempt.';

// A 400 has two shapes, see BadRequestResponseSchema.
const BAD_REQUEST =
  'Invalid fields: `ValidationErrorResponse` with `errorCode: validation_failed` and `errors`. A body that is not valid JSON: `ErrorResponse` without `errorCode`.';

// KAN-51, PR 1: only the contract. Every endpoint validates its body and
// answers 501 until the implementation lands (PR 2, after the database is
// connected). The session is an httpOnly cookie set by the server, see ADR-0013:
// the frontend sends requests with `credentials: 'include'` and never reads it.
@Controller('auth')
export class AuthController {
  @Post('register')
  @ApiCreatedResponse({
    standardSchema: UserSchema,
    description:
      'The account is created and signed in: the session cookie is set.',
  })
  @ApiBadRequestResponse({
    standardSchema: BadRequestResponseSchema,
    description: BAD_REQUEST,
  })
  @ApiConflictResponse({
    standardSchema: ErrorResponseSchema,
    description: 'The email is already taken: `errorCode: email_taken`.',
  })
  @ApiForbiddenResponse({
    standardSchema: ErrorResponseSchema,
    description: CROSS_ORIGIN_REFUSED,
  })
  register(
    @Body({ schema: RegisterRequestSchema }) _body: RegisterRequest,
  ): User {
    throw new NotImplementedException();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    standardSchema: UserSchema,
    description: 'Signed in: the session cookie is set.',
  })
  @ApiBadRequestResponse({
    standardSchema: BadRequestResponseSchema,
    description: BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    standardSchema: ErrorResponseSchema,
    description:
      'Wrong email or password: `errorCode: invalid_credentials`. One answer for both, so it does not reveal which emails are registered.',
  })
  @ApiForbiddenResponse({
    standardSchema: ErrorResponseSchema,
    description: CROSS_ORIGIN_REFUSED,
  })
  login(@Body({ schema: LoginRequestSchema }) _body: LoginRequest): User {
    throw new NotImplementedException();
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description:
      'The session is ended and the cookie is cleared. Also 204 when there was no session.',
  })
  @ApiForbiddenResponse({
    standardSchema: ErrorResponseSchema,
    description: CROSS_ORIGIN_REFUSED,
  })
  logout(): void {
    throw new NotImplementedException();
  }

  @Get('me')
  @ApiOkResponse({
    standardSchema: UserSchema,
    description: 'The signed-in user.',
  })
  @ApiUnauthorizedResponse({
    standardSchema: ErrorResponseSchema,
    description:
      'No session cookie: `errorCode: missing_credentials`. The session has expired or was ended: no `errorCode`.',
  })
  me(): User {
    throw new NotImplementedException();
  }
}
