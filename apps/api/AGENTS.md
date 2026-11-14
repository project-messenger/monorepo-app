# AGENTS.md

> Backend rules. They **add to** the root [`AGENTS.md`](../../AGENTS.md) (commands, "done", "don't", git, decisions,
> learning) — read it first. Don't repeat root rules here.

## Current state

The app is a NestJS 12 skeleton: only `GET /` exists. Not set up yet (planned): `@nestjs/swagger` (OpenAPI for the
Orval client on the frontend), `@nestjs/config`, PostgreSQL + Prisma, Redis, CORS, WebSockets. **Don't add any of
them as a side effect of another task** — each one is a separate task and, where it is a fork, an ADR
(`docs/adr/`). Agreed direction for the HTTP contract (not implemented yet): DTOs are Zod schemas in `apps/api`, never Prisma
models; `@nestjs/swagger` builds `openapi.json` from them for the Orval client — see
[`docs/architecture.md`](../../docs/architecture.md#контракт-фронтенд--бэкенд). Authentication is not decided yet, see
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

## Done (backend)

In addition to the root criteria:

1. `pnpm --filter api lint && pnpm --filter api test && pnpm --filter api build` are green — attach the output.
   Changed HTTP behaviour — `pnpm --filter api test:e2e` too.
2. New service logic — unit test next to it (`*.spec.ts`); new endpoint — e2e test in `test/`.
3. Endpoint added or changed — the frontend contract is described for consumers (see `docs/architecture.md`) and the PR says what
   the frontend has to update.

## Code conventions

- **ESM only.** Nest packages and this project are ESM: relative imports end in `.js`, `__dirname` doesn't exist
  (use `import.meta.dirname`).
- **Tests run on Vitest:** mocks are `vi.fn()`, not `jest.fn()`. Unit tests — `src/**/*.spec.ts`, e2e — `test/`.
- **One domain — one Nest module** in `src/<domain>/` (module, controller, service, their specs next to them). Keep
  controllers thin: HTTP in the controller, logic in the service.
- **Validation** works with Zod (Standard Schema) without classes: `StandardSchemaValidationPipe` with
  `@Body({ schema })` or `@Param('id', { schema })` (https://docs.nestjs.com/application/validation.md). Schemas
  shared with the frontend live in `@app/shared` — don't duplicate them here.
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
