# AGENTS.md

> Backend rules. They **add to** the root [`AGENTS.md`](../../AGENTS.md) (commands, "done", "don't", git, decisions,
> learning) — read it first. Don't repeat root rules here.

## Current state

The app is a NestJS 12 skeleton: only `GET /api/health` exists (`src/health/` — follow it as the reference for new
modules). Configuration is set up: `@nestjs/config` reads only the root `.env` and validates it with the Zod schema in
`src/config/env.schema.ts` — read values via `ConfigService<Env, true>`, never `process.env`; a new variable goes into
the schema and root `.env.example`. Loading, precedence and dev startup details are documented in
[README.md](./README.md#переменные-окружения).
App-wide settings (global prefix `/api`, CORS from `CORS_ORIGIN`, Swagger, shutdown
hooks) live in `src/app.setup.ts`, which both `main.ts` and e2e tests call — put new global settings there, not in
`main.ts`. Swagger UI is at `/api/docs`, the OpenAPI JSON at `/api/docs-json`; `pnpm --filter api openapi` writes the
same document to the committed `apps/api/openapi.json` without starting the server (`src/generate-openapi.ts`). Not set
up yet (planned): PostgreSQL, Redis, WebSockets. The ORM is Drizzle v1 (`1.0.0-rc.6`, pinned exactly, `pg` driver,
`@nestjs/drizzle`) — conventions in [ADR-0012](../../docs/adr/0012-orm-drizzle.md); it is an RC newer than most
training data, so use the v1 docs (orm.drizzle.team) and the package types, not 0.x examples; migrations only via
`drizzle-kit generate` + `migrate`, never `push`. **Don't add any of them as a side effect of another task** —
each one is a separate task and, where it is a fork, an ADR (`docs/adr/`). HTTP contract: DTOs are Zod schemas in
`apps/api`, never Drizzle tables; `@nestjs/swagger` builds the OpenAPI document from them for the Orval client — see
[ADR-0009](../../docs/adr/0009-api-contract-openapi-orval.md). Authentication is not decided yet, see
[`docs/architecture.md`](../../docs/architecture.md#авторизация).

## Commands

Run from monorepo root, not from `apps/api`:

| Task                     | Command                                    |
| ------------------------ | ------------------------------------------ |
| Dev server (watch)       | `pnpm dev:api` (port 3001)                 |
| Lint (oxlint)            | `pnpm --filter api lint`                   |
| Unit tests               | `pnpm --filter api test`                   |
| Single test file         | `pnpm --filter api exec vitest run <path>` |
| e2e tests                | `pnpm --filter api test:e2e`               |
| Build (also type-checks) | `pnpm --filter api build`                  |
| Format                   | `pnpm --filter api format`                 |
| Write `openapi.json`     | `pnpm --filter api openapi`                |

## Done (backend)

In addition to the root criteria:

1. `pnpm --filter api lint && pnpm --filter api test && pnpm --filter api build` are green — attach the output.
   Changed HTTP behaviour — `pnpm --filter api test:e2e` too.
2. New service logic — unit test next to it (`*.spec.ts`); new endpoint — e2e test in `test/`.
3. Endpoint or its schema added or changed — run `pnpm --filter api openapi && pnpm --filter web generate-api` and
   commit `openapi.json` and the Orval client (`apps/web/src/shared/api/generated/`), otherwise CI fails; the PR says
   what the frontend has to update (see `docs/architecture.md`).

## Code conventions

- **ESM only.** Nest packages and this project are ESM: relative imports end in `.js`, `__dirname` doesn't exist
  (use `import.meta.dirname`).
- **Tests run on Vitest:** mocks are `vi.fn()`, not `jest.fn()`. Unit tests — `src/**/*.spec.ts`, e2e — `test/`.
- **One domain — one Nest module** in `src/<domain>/` (module, controller, service, their specs next to them). Keep
  controllers thin: HTTP in the controller, logic in the service.
- **Validation** works with Zod (Standard Schema) without classes: `StandardSchemaValidationPipe` with
  `@Body({ schema })` or `@Param('id', { schema })` (https://docs.nestjs.com/application/validation.md). The pipe is
  not bound yet — bind it when the first endpoint with a body or params appears. HTTP request/response schemas (DTOs)
  live here, in `apps/api`: the frontend gets them via OpenAPI + Orval, so never move them to `@app/shared`. Only
  WebSocket event payload schemas live in `@app/shared` — import them, don't duplicate.
- **Responses** are described for Swagger with the same Zod schemas: `@ApiOkResponse({ standardSchema: XSchema })`, the
  return type is `z.infer<typeof XSchema>` (see `src/health/`). Give every DTO schema `.meta({ id: 'X' })`: without an
  id the schema is inlined into the endpoint and has no name in `components.schemas`, so the frontend gets no named type
  for it.
- Formatting — Prettier with single quotes (`.prettierrc`), lint — oxlint (`.oxlintrc.json`).

## NestJS

This app's version of NestJS is likely newer than what you know. https://docs.nestjs.com/llms.txt indexes its
documentation, with a markdown page per chapter. Read the relevant chapter before using an API you are not sure about.

Nest has first-party packages for these, so check them before adding another library or writing your own
(adding any of them still needs user confirmation — root rules):

- Databases: [`@nestjs/typeorm`](https://docs.nestjs.com/data/typeorm.md), [`@nestjs/drizzle`](https://docs.nestjs.com/data/drizzle.md), [`@nestjs/mongoose`](https://docs.nestjs.com/data/mongodb.md), [`@nestjs/sequelize`](https://docs.nestjs.com/data/sequelize.md).
- OpenAPI: [`@nestjs/swagger`](https://docs.nestjs.com/openapi/introduction.md). WebSockets: [`@nestjs/websockets`](https://docs.nestjs.com/websockets/gateways.md).
- Sign-in: [`@nestjs/authentication`](https://docs.nestjs.com/security/authentication.md). Permissions: [`@nestjs/authorization`](https://docs.nestjs.com/security/authorization.md). Rate limiting: [`@nestjs/throttler`](https://docs.nestjs.com/security/rate-limiting.md).
- Configuration: [`@nestjs/config`](https://docs.nestjs.com/application/configuration.md). Caching: [`@nestjs/cache-manager`](https://docs.nestjs.com/data/caching.md). Health checks: [`@nestjs/terminus`](https://docs.nestjs.com/reliability/terminus.md). Events inside the app: [`@nestjs/event-emitter`](https://docs.nestjs.com/application/events.md).
- Files, S3 included: [`@nestjs/storage`](https://docs.nestjs.com/application/file-storage.md). Queues: [`@nestjs/bullmq`](https://docs.nestjs.com/application/queues.md). Scheduled jobs: [`@nestjs/schedule`](https://docs.nestjs.com/application/task-scheduling.md).
- Webhooks (GitHub integration): [`@nestjs/webhooks`](https://docs.nestjs.com/http/webhooks.md). Language models, tools and agents (AI assistant): [`@nestjs/ai`](https://docs.nestjs.com/ai/overview.md).

## Don't (backend)

- Connect production telemetry or deploy tooling (NestJS Observe, Mau, etc.) — not part of the project scope; it
  sends data to external services.
- Return secrets or integration tokens to the client in a response body, or write them (or private message content) to logs.
