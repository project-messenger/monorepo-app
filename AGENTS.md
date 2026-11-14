# AGENTS.md

> Rules for AI agents of any vendor (Claude Code, Codex, Cursor, opencode, Copilot, …) for the **whole monorepo**.
> This file is the single source of rules: `CLAUDE.md` files only import it (`@AGENTS.md`), never add their own rules.
> Each package has its own `AGENTS.md` that **adds** package rules on top of this one and never repeats it.
> How this works — [`docs/ai-agents.md`](./docs/ai-agents.md).

## Project

Team messenger: chats, kanban tasks, GitHub integration, AI assistant.
It is a **learning team project**: developers from junior to middle+, part-time — see "Learning project" below.
Tasks live in Jira (`KAN-*`), team docs in Confluence, but **rules for agents live only
in this repository**.

**What we build and why** — [`docs/product.md`](./docs/product.md): features, domain model, cross-cutting behavior
requirements (access checks, no duplicate messages, multiple tabs and backend instances), order of work and open
decisions. Read it to understand how your task fits the product; implement only what the task asks.

| Path              | What                                                                 | Package rules                                              |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `apps/web`        | Frontend: Next.js 16, React 19, Feature-Sliced Design, port 3000     | [`apps/web/AGENTS.md`](./apps/web/AGENTS.md)               |
| `apps/api`        | Backend: NestJS 12 (ESM), port 3001                                  | [`apps/api/AGENTS.md`](./apps/api/AGENTS.md)               |
| `packages/shared` | `@app/shared`: Zod schemas, types, socket events used by web and api | [`packages/shared/AGENTS.md`](./packages/shared/AGENTS.md) |
| `docs/`           | Project-wide docs: architecture, git workflow, ADR, agents setup     | [`docs/README.md`](./docs/README.md)                       |

**Before changing files in a package, read that package's `AGENTS.md`.** Not every tool loads nested files by itself.

## Commands

Run everything from the monorepo root (the folder with `pnpm-workspace.yaml`):

| Task                                    | Command                                                      |
| --------------------------------------- | ------------------------------------------------------------ |
| Install dependencies                    | `pnpm install`                                               |
| Dev: everything / frontend / backend    | `pnpm dev` / `pnpm dev:web` / `pnpm dev:api`                 |
| Whole repo, same as CI                  | `pnpm typecheck && pnpm lint && pnpm build`                  |
| Frontend checks                         | `pnpm --filter web verify`                                   |
| Backend tests                           | `pnpm --filter api test` (e2e: `pnpm --filter api test:e2e`) |
| Add a package (only after confirmation) | `pnpm --filter <web\|api\|@app/shared> add <package>`        |

## When a task is considered complete

1. Checks of **every package you touched** passed — see "Done" in the package's `AGENTS.md`. **Attach the output to
   the report.** Without green checks, don't say "done". Changed `packages/shared` → run checks of `web` and `api` too:
   both consume it.
2. New logic is covered by tests next to the code.
3. If you changed what is described in `README.md` or `docs/` — the docs are updated in the same change.
4. The report honestly lists what was **not** checked (e.g. didn't open the page in a browser, didn't run e2e).

## Don't

- Install packages via `npm`/`yarn`/`npx` or from a package folder — only `pnpm` from the root. `package-lock.json`
  must not exist.
- Disable checks to make them pass: `--no-verify`, `eslint-disable`, `@ts-ignore`, `any`, `.skip` in tests. Fix the
  cause or ask.
- Edit generated code: `apps/web/src/shared/api/generated/**` (Orval). Regenerate it instead.
- Commit to `main`, `push --force`, commit `.env*` or secrets. Commit and push — only on user request.
- Send code, logs or project data to external services without explicit user permission.
- Make up library APIs. Next.js 16, React 19, NestJS 12, Zod 4, MSW 3, Tiptap 3 are newer than most training data:
  check the docs in `node_modules/<package>`, the package types, or the official docs linked in package rules.
- Change the contract in `packages/shared` or API endpoints without updating every consumer in the same PR.

## Working cycle

1. Read the task (Jira key, expected result), this file, the package `AGENTS.md` and the relevant guide from `docs/`.
   Check `docs/adr/` for decisions on the topic. Find similar code in the project and follow it.
2. If there is a fork (architecture, new package, code deletion, structure change) — propose options with a
   recommendation and wait for the answer.
3. Work in small steps, running tests or checks after each.
4. At the end — run the checks, then report: what is done, check output, what is not checked, what decisions are
   needed from the user.

## Decisions and confirmation

- **Don't add packages on your own.** Any new dependency (including `shadcn add` that pulls packages) — only after
  explicit user confirmation. First explain why it is needed and what alternatives exist without it.
- **Don't make decisions without confirmation.** Architectural and design forks, code deletion/rollback, project
  structure changes, changes in external services (Figma, Jira, GitHub settings) — propose options and wait.
- **Record accepted decisions.** If the user accepts an architectural decision that affects more than one task —
  propose an ADR in `docs/adr/` (template and rules — [`docs/adr/README.md`](./docs/adr/README.md)).
- **Don't pass off your actions as the user's.** In code, comments, docs, commits and reports, clearly separate what
  the agent did or proposed from what the user decided or did.

## Learning project

The team is here to learn, not only to ship. So:

- On a non-trivial choice, briefly explain **why** and link the docs you relied on (official docs, `docs/`, ADR).
- Prefer the simplest solution that meets the task. No speculative abstractions: the team is part-time and small.
- Don't produce a large diff in one go. Split work into steps the user can review and understand.
- If the user asks to explain or to learn something, guide them (plan, hints, review of their code) instead of
  writing everything for them.

## Git

Full rules (trunk-based, branches, commits, PR, review) — [`docs/workflow.md`](./docs/workflow.md). Read it before
creating a branch, a commit or a PR.

- Branch from fresh `main`: `<JIRA-KEY>/<short-description>`, e.g. `KAN-7/add-message-list`.
- Commit: `<type>: <JIRA-KEY> <imperative description>`, English, no scope in parentheses, e.g.
  `feat: KAN-7 add virtualized message list`.
- Update a branch with `git merge origin/main`, not rebase. PRs are squash-merged, so the PR title uses the commit
  format. The PR description follows [`.github/pull_request_template.md`](./.github/pull_request_template.md).

## Documentation

| Topic                                        | Where                                            |
| -------------------------------------------- | ------------------------------------------------ |
| Product: features, requirements, order       | [`docs/product.md`](./docs/product.md)           |
| How the monorepo fits together, API contract | [`docs/architecture.md`](./docs/architecture.md) |
| Git, PR, review                              | [`docs/workflow.md`](./docs/workflow.md)         |
| Architecture decisions                       | [`docs/adr/`](./docs/adr/README.md)              |
| How agents are set up                        | [`docs/ai-agents.md`](./docs/ai-agents.md)       |
| Planned technical tasks (read-only context)  | [`docs/backlog/`](./docs/backlog/README.md)      |
| Frontend guides (FSD, stack, state, tests)   | [`apps/web/README.md`](./apps/web/README.md)     |
| Backend guide                                | [`apps/api/README.md`](./apps/api/README.md)     |
