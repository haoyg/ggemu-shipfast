import type { Locale } from '#/lib/ggemu'

const localizedCollectionPaths = new Set([
  '/en/gba-games',
  '/en/n64-games',
  '/en/nes-games',
  '/en/sega-genesis-games',
  '/en/snes-games',
  '/en/arcade-games',
  '/en/ps1-games',
])

export function getPlatformCollectionPath(path: string, locale: Locale) {
  if (locale === 'en' || !localizedCollectionPaths.has(path)) {
    return path
  }

  return `/${locale}${path.replace(/^\/en/, '')}`
}
