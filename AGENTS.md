<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Jagoron Show Client

Next.js 16.4.3 App Router + React 19 + TypeScript (strict), Tailwind v4, and shadcn `base-nova` UI. Use npm (`package-lock.json`); Node 22+ is required by the `cn` package.

## Layout and entrypoints

- `src/app/layout.tsx` is the root layout; it wraps every route with `NavBer` and `Footer` and loads global CSS.
- Routes live in `src/app/`; the home route is `src/app/page.tsx`.
- `@/*` resolves to `src/*` (`tsconfig.json`).
- Shared chrome is in `src/components/Shared/` (existing spelling: `NavBer.tsx`), shadcn primitives in `src/components/ui/`.
- `src/app/page.tsx` is still empty; the shared navbar and footer are implemented. Non-home links point to placeholder routes that do not exist yet, and `README.md` is still create-next-app boilerplate that incorrectly points to `app/page.tsx`.
- Theme switching uses `next-themes` (`attribute="class"`, default light) through `src/components/providers/ThemeProvider.tsx` and `src/components/Shared/ThemeToggle.tsx`.
- Static assets are in `public/Images/`; filenames contain spaces (`Jagoron Social Impact Logo.png`, `Footer-Background.png`).

## Commands

Run in this order before finishing:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

- There is no test suite or `test`/`typecheck` script. Do not invent one; `next build` also runs TypeScript and prerendering.
- Lint one file with `npx eslint src/app/page.tsx`.
- `npm ci` for a clean install; `npm run dev` starts Turbopack on port 3000.

## Framework and UI quirks

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`: PPR/static shells are the default, and uncached dynamic data must be handled with Suspense/`use cache` or the build fails. Read `node_modules/next/dist/docs/` for this exact Next version before using framework APIs; do not add `runtime = "edge"` (unsupported with Cache Components).
- React Compiler is enabled; avoid adding unnecessary manual memoization.
- Tailwind v4 is CSS-first: `src/app/globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`. There is no `tailwind.config.*`; do not add PostCSS or webpack config. CSS is compiled by the `@tailwindcss/turbopack` loader configured in `next.config.ts`.
- Add UI primitives with `npx shadcn@latest add <component>` so they match `components.json` (`base-nova`, Base UI rather than Radix). Do not hand-roll replacements in `src/components/ui/`.
- `cn` (the shadcn class-merging package) is the project's merge utility; `src/lib/utils.ts` re-exports it. Generated components may import `cn` directly from the package, which is intentional.

## AGENTS.md maintenance

The `nextjs-agent-rules` block at the top is managed by `next dev` and rewritten on every run. Keep it intact and put project guidance below it.
