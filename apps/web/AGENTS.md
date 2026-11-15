<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

> Frontend rules. They **add to** the root [`AGENTS.md`](../../AGENTS.md) (commands, "done", "don't", git,
> decisions, learning) — read it first. Don't repeat root rules here.
> How the agents setup works — [`docs/ai-agents.md`](../../docs/ai-agents.md).

## Commands

Run from monorepo root, not from `apps/web`:

| Task                                                | Command                                         |
| --------------------------------------------------- | ----------------------------------------------- |
| Check before completing task                        | `pnpm --filter web verify`                      |
| Build (before PR, when changing configs and routes) | `pnpm --filter web build`                       |
| Single test file                                    | `pnpm --filter web exec vitest run <path>`      |
| e2e (Playwright)                                    | `pnpm --filter web test:e2e`                    |
| Regenerate API client (backend must be running)     | `pnpm --filter web generate-api`                |
| UI kit component                                    | `pnpm --filter web exec shadcn add <component>` |
| Dev server                                          | `pnpm dev:web` (port 3000)                      |

`verify` = typecheck + lint (ESLint and steiger/FSD) + Prettier check + tests.

## Done (frontend)

In addition to the root criteria:

1. `pnpm --filter web verify` is green — attach its output.
2. New logic — test next to the code (`*.test.ts(x)`); new `shared/ui` component — story (`*.stories.tsx`).
3. Changed routes or configs — `pnpm --filter web build` is green too.
4. UI changed — say whether you opened the page in a browser; the PR needs a screenshot.

## Don't (frontend)

- Edit `src/shared/api/generated/**` — Orval output, regenerate with `pnpm --filter web generate-api`.
- Write `src/shared/ui` components from scratch or edit Base UI logic — see "Design system".
- Use APIs of old versions (Zod 3, MSW 2, `forwardRef`, Pages Router): this is Next.js 16, React 19, Zod 4, MSW 3.

## Design system (shadcn → Figma)

**Source of truth — code: current shadcn** (preset `base-nova`, Base UI `@base-ui/react`, Tailwind CSS v4, `class-variance-authority`, icons `lucide-react`). Tokens — CSS variables in `src/_app/styles/globals.css` (`:root` / `.dark`, oklch), passed to Tailwind via `@theme inline`. Figma adapts to code, not vice versa.

Figma file: https://www.figma.com/design/6FEyS7TIMuiYKTY6HMIBDr (access via Figma MCP `plugin:design:figma`). Components in it — old community kit (shadcn 2023, slate, 40px buttons): **don't use them as reference** for styles until they're rebuilt to match code.

Variables in Figma (mirror of `globals.css`):

- `Primitives` — Tailwind v4 palette (`neutral/900`, `red/600`, …), hidden from pickers.
- `Theme` — semantic tokens with same names as CSS variables (`primary`, `muted-foreground`, …), code syntax `var(--…)`. Only **Light** mode (Figma Free plan = 1 mode). Dark value of each token is in its description (`dark: neutral/950`) — source for future Dark mode.
- `Radius` (`radius/sm…4xl` from `--radius`), `Spacing` (`spacing/N` = `calc(var(--spacing) * N)`).

### Rules

- **Tokens only.** Use semantic classes (`bg-primary`, `text-muted-foreground`, `border-border`, `rounded-lg`, etc.). No arbitrary hex/rgb/oklch in classes (`bg-[#0f172a]`) and in `style`. Need new color — add token in `:root` **and** `.dark` and in `@theme inline`, then same variable in Figma (`Theme`, with `dark:` in description).
- **Variants — via `cva`.** Visual variants and sizes are described in `cva` (`variant`, `size`, …); names match component properties in Figma. Don't multiply conditional `className` in JSX.
- **Don't edit Base UI primitives.** Don't touch `@base-ui/react` and logic/accessibility (focus, ARIA, keyboard) in `src/shared/ui/*` — only change styles and variants.
  **Exception — shadcn wrapper bug**, where primitive's own behavior doesn't reach it (lost prop, `ref` not connected). Fix such bug minimally: with test next to it (`*.test.tsx`), comment `// Исправление обёртки shadcn: …` (keep this exact Russian marker, it is searched for in code and docs) above the line (so it won't be erased by `shadcn add --overwrite`) and note in PR description. Don't add new behavior on top of primitive.
- **New components — via `shadcn add`.** First `pnpm --filter web exec shadcn add <component>` (when asked about overwriting existing files — "no"), then, if needed, styling per Figma (`get_design_context` / `get_variable_defs`). Don't write `src/shared/ui` components from scratch.
- **Branding — via tokens**, not by editing component classes: change values of `--primary`, `--radius`, etc. in both themes and sync Figma variables.
- Dark theme is set by explicit values in `.dark` (not auto-inversion). When changing light token, update dark one.
- Code from Figma MCP — reference, not ready code: translate to tokens and existing components, absolute positioning — to flex/grid.
- Font — Inter (`--font-sans`, `src/_app/layouts/root-layout.tsx`). Icons — `lucide-react`, default 16px (`size-4`).

## Documentation

Before work, read [README.md](./README.md) and relevant guides from `docs/`: structure and FSD — `docs/architecture.md`,
purpose of each library — `docs/stack.md`, where to store state — `docs/state-and-data.md`, tests — `docs/testing.md`,
linters, CI, Orval — `docs/tooling.md`. Project-wide docs (git, ADR, API contract, backlog) — [`../../docs/`](../../docs/README.md).
If your change affects what's described there (new package, new layer, new command) — update documentation in same PR.

## Architecture: Feature-Sliced Design

Structure — per [FSD guide for Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs). Detailed with examples — `docs/architecture.md`.

- `app/` (root) — **Next routing only**: files `page.tsx` / `layout.tsx` re-export pages and layouts from `src` (`export { LoginPage as default, metadata } from "@/_pages/login"`). Don't write logic and markup here. `instrumentation*.ts` and `middleware.ts` by Next's requirement also live in root.
- `src/` — FSD layers top to bottom: `_app` → `_pages` → `widgets` → `features` → `entities` → `shared`. Layers `app` and `pages` are named `_app` and `_pages` to avoid conflict with Next routing.
  - `_app` — layouts, global styles, providers.
  - `_pages` — pages (`landing`, `login`, `register`).
  - `widgets` — large self-contained blocks (`site-header`, `site-footer`).
  - `features` — user scenarios (`auth`, `theme-toggle`).
  - `entities` — business entities (user, channel, task…), will appear as needed.
  - `shared` — no business logic: `ui` (shadcn), `lib`, `api` (code from Orval — in `shared/api/generated`, don't edit manually).
- Layer imports **only from layers below**. Slices of same layer don't import each other. This is checked by [steiger](https://github.com/feature-sliced/steiger) in `pnpm lint` (config `steiger.config.mjs`).
- Outside, slice is imported **only via public API** — slice's `index.ts` (`@/features/auth`, not `@/features/auth/ui/login-form`). Inside slice — relative imports. In `shared` there are no slices, import by segments: `@/shared/ui/button`.
- Server-only modules (`server-only`, data access) are exported from separate `index.server.ts`, to avoid client bundle.
- Segments inside slice: `ui`, `model` (state, schemas, validation), `api`, `lib`, `config`.
