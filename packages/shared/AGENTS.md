# AGENTS.md

> Rules for `@app/shared`. They **add to** the root [`AGENTS.md`](../../AGENTS.md) — read it first.

## What lives here

What both apps need but OpenAPI doesn't describe: WebSocket event names and their payload Zod schemas, plus shared
constants. Everything is exported from `src/index.ts`; both apps import `@app/shared` as TypeScript sources
(`workspace:^`, no build step — `apps/web` transpiles it via `transpilePackages`).

**No HTTP request/response schemas here.** The HTTP contract is owned by the backend (Zod DTOs in `apps/api` →
`openapi.json` → Orval client in `apps/web`) — see
[`docs/architecture.md`](../../docs/architecture.md#контракт-фронтенд--бэкенд). `UserSchema` in `src/index.ts` is a
template example, not a real contract.

## Rules

- **Any change is a change for both apps.** Update `apps/web` and `apps/api` in the same PR, and say in the PR
  whether the change is backward incompatible.
- **Only framework-free code:** `zod` and plain TypeScript. No React, Next, Nest, Node-only or browser-only APIs —
  the package runs in the browser and on the server.
- Naming: schema `XxxSchema`, type `type Xxx = z.infer<typeof XxxSchema>`. Socket events — in `SocketEvents`, value
  format `<entity>:<action>` (`message:send`).
- New schemas go in `src/schemas/<entity>.ts` and are re-exported from `src/index.ts`.
- Module resolution is `NodeNext`: relative imports end in `.js` (`./schemas/user.js`).
- Zod 4 API (`z.email()`, `z.uuid()`), not Zod 3 (`z.string().email()`).

## Done (shared)

`pnpm typecheck && pnpm build`, then the checks of both consumers: `pnpm --filter web verify` and
`pnpm --filter api test`. Attach the output.
