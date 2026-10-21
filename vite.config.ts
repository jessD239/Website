import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools, type VitePluginOptions } from 'vite-imagetools';
type ImageToolsOptions = Partial<VitePluginOptions>

const SITE_URL = 'https://peoplewithideas.co.nz'
const STATIC_ROUTES: { path: string; title?: string; robots?: string }[] = [
  { path: 'collective' },
  {
    path: 'awards',
    title: ' | People with Ideas',
    robots: 'noindex,follow',
  },
]

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
        mkdirSync(resolve(outDir, route.path), { recursive: true })
        let routeHtml = html.replace(
          `<link rel="canonical" href="${SITE_URL}/" />`,
          `<link rel="canonical" href="${SITE_URL}/${route.path}/" />`,
        )
        if (route.title) {
          routeHtml = routeHtml.replace('<title>PwI - Creative Studio</title>', `<title>${route.title}</title>`)
        }
        if (route.robots) {
          routeHtml = routeHtml.replace(
            `<link rel="canonical" href="${SITE_URL}/${route.path}/" />`,
            `<link rel="canonical" href="${SITE_URL}/${route.path}/" />\n    <meta name="robots" content="${route.robots}" />`,
          )
        }
        writeFileSync(
          resolve(outDir, route.path, 'index.html'),
          routeHtml,
        )
      }
    },
  }
}

// Image presets: `import img from './a.jpg?preset=portrait'` yields { sources, img } (as=picture).
// Widths larger than the cropped master can supply are dropped, so nothing is upscaled.
const IMAGE_PRESETS: Record<string, { aspect: [number, number]; widths: number[] }> = {
  feature: { aspect: [4, 3], widths: [600, 900, 1200, 1600] },
  card: { aspect: [3, 4], widths: [400, 600, 900, 1200] },
  wide: { aspect: [16, 9], widths: [600, 900, 1200, 1600] },
  portrait: { aspect: [5, 7], widths: [240, 360, 480, 600] },
  thumb: { aspect: [5, 7], widths: [180, 270, 360] },
}

function imagePresets(): ImageToolsOptions['defaultDirectives'] {
  return async (url, metadata) => {
    const preset = IMAGE_PRESETS[url.searchParams.get('preset') ?? '']
    if (!preset) return new URLSearchParams()
    const { width = 0, height = 0, format } = await metadata()
    const [aw, ah] = preset.aspect
    const maxWidth = Math.min(width, Math.floor((height * aw) / ah))
    const widths = preset.widths.filter((w) => w <= maxWidth)
    if (!widths.length || maxWidth > widths[widths.length - 1] * 1.15) widths.push(maxWidth)
    return new URLSearchParams({
      w: widths.join(';'),
      aspect: `${aw}:${ah}`,
      format: format === 'png' || format === 'webp' ? 'jpg' : 'jpeg',
      quality: '85',
      as: 'picture',
    })
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticRoutes(), imagetools({ defaultDirectives: imagePresets() })],
})

