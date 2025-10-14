# Repository Guidelines

This repo is a Next.js 15 + TypeScript + Tailwind CSS landing site, synced from v0.app and deployed to Vercel. Use pnpm and the App Router.

## Experimentation & A/B Testing
- Purpose: This site collects data for A/B testing to inform product decisions.
- Variants: Use the built-in experiment helper (`lib/experiment.ts`). Force a variant with `?variant=zen|hybrid` or `NEXT_PUBLIC_VARIANT`. The chosen variant is stored and exposed on `<html data-variant="...">`.
- Analytics: `lib/analytics.ts` automatically attaches `{ test_name: "landing_design", variant }` to events; just call `trackEvent(...)`.
- Next steps: You can later specify which surfaces to test (copy, layout, CTA style, imagery, motion).

### Price Test (15 vs 40)
- Module: `lib/price.ts` with context `components/price-provider.tsx` (wrapped in `app/layout.tsx`).
- Force buckets: `?price=15|40` or `NEXT_PUBLIC_PRICE=15|40`.
- Usage: Access current price via `usePrice().price`; navbar CTA uses it. Exposure is auto-tracked once per session as `ab_test_view` with `test_name: "price_test"` and `variant: "15"|"40"`.

## Design Principles (Zen)
- Minimal, calm UI: plenty of whitespace, 2–3 neutrals, subtle accents.
- Smooth UX: motion is subtle (150–300ms, ease-out), honors `prefers-reduced-motion`.
- Clean typography: balanced headings, readable body (65ch max, `text-balance`/`text-pretty`).
- Friction-free flows: clear hierarchy, generous hit areas, no noisy effects.

## Project Structure & Module Organization
- `app/`: Routes and layouts (App Router). Examples: `app/page.tsx`, `app/themes/page.tsx`, `app/start/loading.tsx`. Global styles in `app/globals.css`.
- `components/`: Reusable UI. Files use kebab-case (e.g., `hero-section.tsx`); components default‑export PascalCase functions.
- `lib/`: Utilities like `analytics.ts`, `animations.ts`, `utils.ts`. Import via alias `@/lib/...` (see `tsconfig.json`).
- `public/`: Static assets (images, icons). Served at `/`.
- Config: `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `components.json` (shadcn/ui + path aliases). Build output `.next/` is ignored.

## Build, Test, and Development Commands
- `pnpm install`: Install dependencies.
- `pnpm dev`: Run dev server (http://localhost:3000).
- `pnpm build`: Production build (`next build`).
- `pnpm start`: Serve the production build.
- `pnpm lint`: Run ESLint (Next rules). Also run strict type‑check with `pnpm exec tsc --noEmit`.
Notes: Vercel PRs create preview deployments. `next.config.mjs` currently ignores TS/ESLint errors in builds—please fix locally before opening PRs.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Path alias `@/*` for absolute imports.
- Indentation: 2 spaces; keep formatting consistent with existing files.
- React: Components in PascalCase; default exports preferred (current pattern). Hooks start with `use...`.
- Files: kebab-case for component files and folders; route files follow Next names: `page.tsx`, `layout.tsx`, `loading.tsx`.
- Styling: Tailwind CSS utilities in markup; keep tokens/global resets in `app/globals.css` only.

## Testing Guidelines
No test suite is configured yet. If adding tests, place unit tests under `__tests__/` with `*.test.ts[x]` and e2e under `e2e/` (e.g., Playwright). Add a `test` script and aim for >80% coverage on new code.

## Commit & Pull Request Guidelines
- Commits: Follow Conventional Commits (e.g., `feat(landing): zen redesign`, `fix: navbar scroll state`).
- PRs: Provide a clear description, link related issues, and include screenshots/GIFs for UI changes. Confirm `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` pass. Note any env changes.

## Security & Configuration Tips
- Env: Use `.env.local`; variables prefixed `NEXT_PUBLIC_` are public—never store secrets there. `.env*` is git‑ignored.
- Images: Remote image domains must be listed in `next.config.mjs` before use.
- Server vs Client: Avoid `window`/`document` in Server Components; add `"use client"` when necessary.
