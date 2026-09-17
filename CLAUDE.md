# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (`tsc && vite-react-ssg build`; pre-renders each static route to `dist/<path>/index.html`)
- `npm run preview` — Preview production build locally
- `npm run deploy` — Build and deploy to GitHub Pages

## Tech Stack

- React 19 with TypeScript
- Vite 6 with @vitejs/plugin-react
- Tailwind CSS 4 with @tailwindcss/vite
- React Router 6 with `vite-react-ssg` (BrowserRouter semantics — real path URLs, not hash. Pinned to RR6 until `vite-react-ssg` supports RR7.)
- Motion (Framer Motion) for animations
- Lucide React for icons
- Custom fonts: Permanent Marker, Space Grotesk, Inter

## Architecture

- `src/main.tsx` — Entry point
- `src/app/App.tsx` — Root component
- `src/app/routes.ts` — All route definitions (consumed by `vite-react-ssg` for pre-rendering)
- `src/app/components/Layout.tsx` — Shared layout (Navbar, Footer, ambient effects)
- `src/app/components/` — Page and shared components
- `src/app/assets/` — Screenshot data layers and asset re-exports
- `src/assets/` — PNG image assets
- `src/styles/` — CSS (index.css imports fonts.css, tailwind.css, theme.css)

## Deployment

Deployed to GitHub Pages with custom domain (`www.krookedlilly.com`). `public/CNAME` configures the custom domain. The site uses `vite-react-ssg` to pre-render each static route to `dist/<path>/index.html`, so real path URLs work without server-side routing. `vite.config.ts` copies `index.html` to `404.html` so any unmapped path (e.g. routes with dynamic params like `:gameId`) loads the SPA shell and resolves client-side. `public/.nojekyll` is required so GH Pages serves dotfile paths like `/.well-known/`.

## Dependency audit posture

`npm audit` reports 3 moderate findings, all in the `react-router` /
`react-router-dom` / `@remix-run/router` chain. **Do not "fix" these.** The only
remedy npm offers is `react-router@7`, which is a breaking upgrade blocked by the
RR6 pin above (`vite-react-ssg` does not support RR7 yet). Revisit when
`vite-react-ssg` ships RR7 support.

They are also not reachable in this codebase. The advisories are open-redirect via
`<Link to={...}>` / `useNavigate(...)` and error deserialization during SSR
hydration. This app has no `useNavigate` calls, its only `<Navigate>` is a
hardcoded literal (`ToolkitRedirect.tsx`), and its only user-controlled routing
input (`gameId` in `AcrostixUniversalLinkPage.tsx`) is interpolated after a fixed
`acrostix://` scheme, so the scheme cannot be hijacked. Hydration payloads are
baked at build time from our own source, not attacker-supplied.

Dependabot's alert count on GitHub runs far higher than `npm audit` because it
still carries stale alerts for `krookedlilly-web/package-lock.json`, the nested
CRA/webpack-era manifest deleted in 190fcfe. Those packages (webpack, svgo,
lodash, js-yaml, node-forge, ...) are not in the current tree. Cross-check any
new alert against the real lockfile before acting on it.

Everything else in the audit chain is build-time only: this is a static site with
no Node process in production, so build-tool CVEs (vite, postcss, tar, rollup,
...) are only exposed to inputs we already control.
