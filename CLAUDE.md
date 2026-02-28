# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (tsc + vite build)
- `npm run preview` — Preview production build locally
- `npm run deploy` — Build and deploy to GitHub Pages

## Tech Stack

- React 19 with TypeScript
- Vite 6 with @vitejs/plugin-react
- Tailwind CSS 4 with @tailwindcss/vite
- React Router 7 with createHashRouter (required for GitHub Pages)
- Motion (Framer Motion) for animations
- Lucide React for icons
- Custom fonts: Permanent Marker, Space Grotesk, Inter

## Architecture

- `src/main.tsx` — Entry point
- `src/app/App.tsx` — Root component, renders RouterProvider
- `src/app/routes.ts` — All route definitions (createHashRouter)
- `src/app/components/Layout.tsx` — Shared layout (Navbar, Footer, ambient effects)
- `src/app/components/` — Page and shared components
- `src/app/assets/` — Screenshot data layers and asset re-exports
- `src/assets/` — PNG image assets
- `src/styles/` — CSS (index.css imports fonts.css, tailwind.css, theme.css)

## Deployment

Deployed to GitHub Pages with custom domain (krookedlilly.com). The `public/CNAME` file configures the custom domain. HashRouter (createHashRouter) is used instead of BrowserRouter because GitHub Pages doesn't support server-side routing.
