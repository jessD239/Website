import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const SITE_URL = 'https://peoplewithideas.co.nz'
const STATIC_ROUTES = ['collective']

// GitHub Pages answers unknown paths with a 404 status. Writing a copy of index.html
// per route makes these URLs return 200 and gives each its own canonical.
function staticRoutes(): Plugin {
  let outDir = 'dist'
  return {
    name: 'static-route-html',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const html = readFileSync(resolve(outDir, 'index.html'), 'utf-8')
      for (const route of STATIC_ROUTES) {
        mkdirSync(resolve(outDir, route), { recursive: true })
        writeFileSync(
          resolve(outDir, route, 'index.html'),
          html.replace(
            `<link rel="canonical" href="${SITE_URL}/" />`,
            `<link rel="canonical" href="${SITE_URL}/${route}/" />`,
          ),
        )
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticRoutes()],
})
