/// <reference types="vite/client" />

// `?preset=<name>` imports are resolved by vite-imagetools using IMAGE_PRESETS in vite.config.ts.
// TypeScript allows one `*` per pattern, so each preset is declared by suffix: put `preset=<name>` last in the query.
// When adding a preset to vite.config.ts, add its two declarations here.
interface ResponsiveImageData {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

declare module '*?preset=feature' { const image: ResponsiveImageData; export default image }
declare module '*&preset=feature' { const image: ResponsiveImageData; export default image }
declare module '*?preset=card' { const image: ResponsiveImageData; export default image }
declare module '*&preset=card' { const image: ResponsiveImageData; export default image }
declare module '*?preset=wide' { const image: ResponsiveImageData; export default image }
declare module '*&preset=wide' { const image: ResponsiveImageData; export default image }
declare module '*?preset=portrait' { const image: ResponsiveImageData; export default image }
declare module '*&preset=portrait' { const image: ResponsiveImageData; export default image }
declare module '*?preset=thumb' { const image: ResponsiveImageData; export default image }
declare module '*&preset=thumb' { const image: ResponsiveImageData; export default image }
