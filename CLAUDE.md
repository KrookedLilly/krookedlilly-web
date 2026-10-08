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
- `src/app/data/` — Single sources of truth for content:
  - `catalog.ts` — every product, grouped into the four categories (Games, Apps, Mods, Game Dev Assets). Drives the home page rows, `/catalog`, and the Contact support dropdown.
  - `unityAssets.ts` / `minecraftMods.ts` — members of the UI Toolkit Suite and Minecraft mods collections (store links, icons, cover art, features).
  - `socials.ts` — social profiles, Discord, and storefront URLs. Drives the footer, Contact page, and the Organization `sameAs` list.
- `src/app/assets/` — Screenshot data layers and asset re-exports
- `src/assets/` — Image assets (WebP for screenshots and art; see Images below)
- `src/styles/` — CSS (index.css imports fonts.css, tailwind.css, theme.css)

## Deployment

Deployed to GitHub Pages with custom domain (`www.krookedlilly.com`). `public/CNAME` configures the custom domain. The site uses `vite-react-ssg` to pre-render each static route to `dist/<path>/index.html`, and the build also writes a flat `dist/<path>.html` copy so slashless URLs serve without a redirect (see SEO below). `vite.config.ts` copies `index.html` to `404.html` so any unmapped path (e.g. routes with dynamic params like `:gameId`) loads the SPA shell and resolves client-side. `public/.nojekyll` is required so GH Pages serves dotfile paths like `/.well-known/`.

## Prices

Only show prices for things sold directly on krookedlilly.com (currently HomunculAi). Anything sold on another storefront (Unity Asset Store, itch.io, GameDevMarket, CurseForge, Modrinth, app stores) links to that store with no price on the site, in `llms.txt`, or in structured data, so the site never disagrees with the store. "Free" labels are fine.

## Colors

- Brand accents live as RGB triples at the top of `src/styles/theme.css` (`--primary-rgb`, `--teal-rgb`, and their `-light` tints). Every glow, shadow, and Tailwind color reads from them, so changing a triple rethemes the whole site. Canvas effects (particles, click fireworks) can't read CSS variables and use `src/app/data/brandColors.ts`; keep the two in sync.
- Base colors (`bg-primary`, `bg-teal`) are for fills: icon squares, solid buttons, glows. Use the light tints (`text-primary-light`, `border-teal-light`, ...) for text and outlines so they read brighter than fills.
- Purple and teal are tuned to look equally bright, not to measure equal: saturated purple reads brighter than its luminance, so teal sits a little lighter.

## Images

- Add images as WebP (keep transparency where needed), longest side 1600px or less. Screenshots straight from a device or editor are often 2-5 MB as PNG and 30-100 KB as WebP with no visible difference.
- `vite.config.ts` strips the `<link rel="preload" as="image">` tags vite-react-ssg adds; it preloads every image in every chunk a page touches, which was 20+ MB per page.

## SEO and AI discoverability

- **URLs have no trailing slash.** GitHub Pages 301s `/foo` to `/foo/` when only `foo/index.html` exists, which kept pages out of the index. So `onFinished` in `vite.config.ts` also writes a flat `foo.html` for every page; GitHub Pages serves `/foo` from it with a 200 (verified: a flat file wins even when a `foo/` directory sits next to it). `foo/index.html` stays so old `/foo/` links still work, and its canonical points at `/foo`. Canonicals, the sitemap, JSON-LD, `llms.txt`, and internal links all use the slashless form.
- `PageMeta` sets title, description, canonical, Open Graph, and Twitter tags. Pages without an `image` fall back to `public/og-image.png`.
- The sitemap is generated at build time in `vite.config.ts` (`onFinished`); there is no hand-written sitemap. It lists every pre-rendered page except those with a robots `noindex` tag.
- Structured data lives in `JsonLd.tsx`. `SiteJsonLd` (rendered by `Layout`) emits the Organization and WebSite nodes on every page; product pages add their own nodes and reference the studio by `ORG_REF`.
- `public/llms.txt` is a hand-written summary of every product for AI assistants. Update it whenever a product or store link changes.
- IndexNow: after `npm run deploy`, the `postdeploy` script (`scripts/indexnow.mjs`) waits for GitHub Pages to serve the new build, then submits every sitemap URL so Bing (which also feeds ChatGPT search and Copilot) recrawls immediately. The key is the 32-hex `.txt` file in `public/`; keep it.
- Retired URLs redirect via a component that emits a meta refresh plus a canonical to the new page (see `ToolkitRedirect.tsx`), since GitHub Pages can't send real 301s.
- Local `npm run preview` can show "Unexpected Application Error" on load: the async app script can run before the trailing `__VITE_REACT_SSG_HASH__` script on localhost. The live site isn't affected; test with real latency if you need to check hydration.

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
