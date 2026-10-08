import { defineConfig } from 'vite'
import path from 'path'
import fs from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import 'vite-react-ssg'

const SITE_ORIGIN = 'https://www.krookedlilly.com'

// Every pre-rendered page as a URL path without a trailing slash ("/" for the
// root), paired with its nested `<path>/index.html` file.
function walkPages(dir: string, base = dir): { url: string; file: string }[] {
  const out: { url: string; file: string }[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkPages(full, base))
    else if (entry.name === 'index.html') {
      const rel = path.relative(base, full).replace(/\\/g, '/')
      out.push({ url: '/' + rel.replace(/\/?index\.html$/, ''), file: full })
    }
  }
  return out
}

const isNoIndex = (file: string) =>
  /<meta[^>]+name="robots"[^>]+noindex/i.test(fs.readFileSync(file, 'utf8'))

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'vendor-router': ['react-router', 'react-router-dom'],
              'vendor-motion': ['motion'],
            },
          },
        },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  ssgOptions: {
    // Must be 'defer', not 'async'. The page sets __VITE_REACT_SSG_HASH__ in an
    // inline script at the end of <body>; an async app script can run before
    // that on fast loads (Googlebot), fetch static-loader-data-manifest-
    // undefined.json, and render "Unexpected Application Error", which Google
    // reported as a soft 404. Deferred scripts run after the HTML is parsed.
    script: 'defer',
    dirStyle: 'nested',
    formatting: 'minify',
    // vite-react-ssg preloads every image in every chunk a page touches. Since
    // the layout chunk carries the home page and catalog data, that was ~70
    // images (20+ MB) on every page, and the preloads go unused anyway
    // (credentials mismatch), so images downloaded twice. Pages already list
    // their <img> tags in the pre-rendered HTML, so the browser finds them
    // without preloads. Strip them.
    onPageRendered(_route: string, html: string) {
      return html.replace(/<link rel="preload" as="image"[^>]*>/g, '')
    },
    onFinished(dir: string) {
      // GitHub Pages serves 404.html for any unresolvable path; copy the shell so the SPA boots and the client router renders NotFound.
      fs.copyFileSync(path.join(dir, 'index.html'), path.join(dir, '404.html'))

      // Canonical URLs have no trailing slash. GitHub Pages 301s /foo to /foo/
      // when only foo/index.html exists, but serves foo.html directly (200) for
      // /foo, even when a foo/ directory sits next to it. So write a flat copy
      // of every page; foo/index.html stays so old /foo/ links keep working,
      // and its canonical tag points search engines at /foo.
      const pages = walkPages(dir)
      for (const { url, file } of pages) {
        if (url !== '/') fs.copyFileSync(file, path.join(dir, `${url.slice(1)}.html`))
      }

      // Sitemap: indexable pages only (robots noindex pages, like legal pages,
      // redirect stubs, and deep-link shells, are left out).
      const urls = pages.filter((p) => !isNoIndex(p.file)).map((p) => p.url).sort()
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((u) => `  <url><loc>${SITE_ORIGIN}${u}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n')
      fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml)
    },
  },
}))
