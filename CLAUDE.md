# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm start` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm test` — Run tests in watch mode
- `npm run deploy` — Build and deploy to GitHub Pages

## Tech Stack

- React 19 with TypeScript (CRA / react-scripts 5)
- React Router DOM 7 with HashRouter (required for GitHub Pages static hosting)
- Vanilla CSS (global styles in index.css, component styles in App.css)
- Testing: Jest + React Testing Library

## Architecture

Single-page app with a flat component structure:
- `src/index.tsx` — Entry point, renders App
- `src/App.tsx` — Root component, defines routes via HashRouter
- `src/pages/` — Page components (currently only Home.tsx)
- `src/helpers/functions.ts` — Shared utilities (isStringEmpty, ObjToQueryString)

## Deployment

Deployed to GitHub Pages with custom domain (krookedlilly.com). The `public/CNAME` file configures the custom domain. HashRouter is used instead of BrowserRouter because GitHub Pages doesn't support server-side routing.
