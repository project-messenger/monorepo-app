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
| Regenerate API client from `apps/api/openapi.json`  | `pnpm --filter web generate-api`                |
| UI kit component                                    | `pnpm --filter web exec shadcn add <component>` |
| Dev server                                          | `pnpm dev:web` (port 3000)                      |

`verify` = typecheck + lint (ESLint and steiger/FSD) + Prettier check + tests.

## Done (frontend)

In addition to the root criteria:

1. `pnpm --filter web verify` is green — attach its output.
2. New logic — test next to the code (`*.test.ts(x)`); every new `shared/ui` component — story (`*.stories.tsx`) and meaningful tests of its rendered semantics and supported behavior. The story requirement applies to UI components, not utilities, types or other non-UI files in `shared`.
3. Changed routes or configs — `pnpm --filter web build` is green too.
4. UI changed — say whether you opened the page in a browser; the PR needs a screenshot.

## Don't (frontend)

- Edit `src/shared/api/generated/**` — Orval output, regenerate with `pnpm --filter web generate-api`.
- Write `src/shared/ui` components from scratch or edit Base UI logic — see "Design system".
- Use APIs of old versions (Zod 3, MSW 2, `forwardRef`, Pages Router): this is Next.js 16, React 19, Zod 4, MSW 3.

## Design system (shadcn → Figma)

**Source of truth — the Figma design system** ([ADR-0006](../../docs/adr/0006-figma-uikit-source-of-truth.md)): code adapts to the mockup, not vice versa. Stack: shadcn preset `base-nova`, Base UI `@base-ui/react`, Tailwind CSS v4, `class-variance-authority`, icons `lucide-react`. Tokens — CSS variables in `src/_app/styles/globals.css` (`:root` / `.dark`), passed to Tailwind via `@theme inline`.

Figma file: https://www.figma.com/design/9bp5uwYGyaGIRCt1ycuqz3 (page `2004:2`, Light only; access via Figma MCP `https://mcp.figma.com/mcp`). Sections: `2004:233` colors, `2004:234` typography, `2004:235` sizes, `2004:236` components. The Starter plan limits MCP calls, so the implemented values and decisions are recorded in [ADR-0007](../../docs/adr/0007-figma-uikit-implementation.md) — check it before calling MCP.

Never build whole pages or widgets from the mockup: only tokens and base components in `shared/ui`. The logo (`shared/ui/logo.tsx`) is not part of the design-system alignment.

Typography: roles of the mockup are tokens `--text-<role>` in `@theme inline` and give short utilities (`text-heading-page`, `text-body`, `text-caption`). For text with a tag use `Typography` (`shared/ui/typography.tsx`, prop `as`, [ADR-0008](../../docs/adr/0008-typography-component.md)); don't create other typography components.

### Rules

- **Tokens only.** Use semantic classes (`bg-primary`, `text-muted-foreground`, `border-border`, `rounded-lg`, etc.). No arbitrary hex/rgb/oklch in classes (`bg-[#0f172a]`) and in `style`. Need new color — add token in `:root` **and** `.dark` and in `@theme inline`.
- **Dimensions — in `rem`.** Use `rem` for authored widths, heights, spacing and typography. Prefer existing semantic tokens and standard Tailwind utilities that resolve to the required `rem` value; use an exact arbitrary `rem` value when the scale does not fit. Preserve the agreed geometry: `42px` at the default root size is `2.625rem`, not `40px` or `44px`. Rounding requires separate design agreement. This rule does not require changing Figma reference measurements or browser viewport sizes in documentation. Do not mechanically convert unrelated existing code.
- **Shared page layout.** Put a repeated page width into a semantic theme token (`1440px` → `90rem`) instead of repeating `max-w-[1440px]`. When implementing reusable page layout, use a shared `Container` responsible only for width, centering and horizontal padding. Keep section grids, backgrounds and vertical spacing at their call sites; do not turn `Container` into a universal layout engine. This is guidance for future implementation, not a requirement to create the component in every task.
- **Repeated navigation.** Store repeated link data in a navigation array and render it with `map`, following `widgets/site-header/config/nav-links.ts`. When styled links are actually reused, share their presentation in `shared/ui`, with the variants and interaction states needed by existing consumers (including keyboard focus). Preserve link semantics and routing; do not invent hypothetical variants. Extracting a shared link is a separate implementation task when needed.
- **Typography roles are complete.** A role defines font size, line height and weight together. Select a matching `Typography` variant; if the design needs a missing role, add it to the theme and component. Do not override a role's size, line height or weight in a section with `text-*`, `leading-*` or `font-*`. Layout and semantic color classes remain appropriate at the call site. See the [typography guide](./docs/stack.md#типографика-роль-макета--класс-tailwind).
- **Variants — via `cva`.** Visual variants and sizes are described in `cva` (`variant`, `size`, …); names match component properties in Figma. Don't multiply conditional `className` in JSX.
- **Don't edit Base UI primitives.** Don't touch `@base-ui/react` and logic/accessibility (focus, ARIA, keyboard) in `src/shared/ui/*` — only change styles and variants.
  **Exception — shadcn wrapper bug**, where primitive's own behavior doesn't reach it (lost prop, `ref` not connected). Fix such bug minimally: with test next to it (`*.test.tsx`), comment `// Исправление обёртки shadcn: …` (keep this exact Russian marker, it is searched for in code and docs) above the line (so it won't be erased by `shadcn add --overwrite`) and note in PR description. Don't add new behavior on top of primitive.
- **New components — via `shadcn add`.** First `pnpm --filter web exec shadcn add <component>` (when asked about overwriting existing files — "no"), then, if needed, styling per Figma (`get_design_context` / `get_variable_defs`). Don't write `src/shared/ui` components from scratch.
  **Exception — components that exist in the mockup but not in shadcn** (`search`, `task-card`, `metric-card`, `navigation-item`, `workspace-switcher`, `status-select`): build them by hand following existing ones (`cva`, `cn`, tokens, `data-slot`, no business logic, no new packages), with a story and a test.
  **Exception — agreed shared wrappers**: `Container` may be a plain `div` wrapper limited to page width, centering and horizontal padding; `StyledLink` may wrap Next Link to share the presentation needed by existing consumers while preserving its API and link semantics. Use tokens, `cn`, `data-slot`, stories and tests; use `cva` for visual variants. These exceptions do not authorize new Base UI primitives or business logic in `shared/ui`.
- **Branding — via tokens**, not by editing component classes: change values of `--primary`, etc. in both themes. Radius is set by the fixed `--radius-*` values (see [ADR-0007](../../docs/adr/0007-figma-uikit-implementation.md)), not by `--radius`.
- Dark theme is set by explicit values in `.dark` (not auto-inversion). The mockup has no dark theme: values are derived from the light palette. When changing light token, update dark one.
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
  - `widgets` — large self-contained blocks (`site-header`, `footer`).
  - `features` — user scenarios (`auth`, `theme-toggle`).
  - `entities` — business entities (user, channel, task…), will appear as needed.
  - `shared` — no business logic: `ui` (shadcn), `lib`, `api` (code from Orval — in `shared/api/generated`, don't edit manually).
- Layer imports **only from layers below**. Slices of same layer don't import each other. This is checked by [steiger](https://github.com/feature-sliced/steiger) in `pnpm lint` (config `steiger.config.mjs`).
- Outside, slice is imported **only via public API** — slice's `index.ts` (`@/features/auth`, not `@/features/auth/ui/login-form`). Inside slice — relative imports. In `shared` there are no slices, import by segments: `@/shared/ui/button`.
- Server-only modules (`server-only`, data access) are exported from separate `index.server.ts`, to avoid client bundle.
- Segments inside slice: `ui`, `model` (state, schemas, validation), `api`, `lib`, `config`.
