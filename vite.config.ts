import { defineConfig } from 'vite'
import path from 'path'
import fs from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import 'vite-react-ssg'

const SITE_ORIGIN = 'https://www.krookedlilly.com'

function walkHtmlFiles(dir: string, base = dir): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkHtmlFiles(full, base))
    else if (entry.name === 'index.html') {
      const rel = path.relative(base, full).replace(/\\/g, '/')
      const url = '/' + rel.replace(/index\.html$/, '').replace(/\/$/, '')
      out.push(url === '/' ? '/' : url)
    }
  }
  return out
}

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
    script: 'async',
    dirStyle: 'nested',
    formatting: 'minify',
    onFinished(dir: string) {
      // GitHub Pages serves 404.html for any unresolvable path; copy the shell so the SPA boots and the client router renders NotFound.
      fs.copyFileSync(path.join(dir, 'index.html'), path.join(dir, '404.html'))

      const urls = walkHtmlFiles(dir).sort()
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
