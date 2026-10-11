import type { Locale } from '#/lib/ggemu'
import type { PlatformCollectionKey } from '#/components/platform-games-page'

const platformCollectionKeys: Record<string, PlatformCollectionKey> = {
  'gba-games': 'gba',
  'n64-games': 'n64',
  'nes-games': 'nes',
  'sega-genesis-games': 'segaGenesis',
  'snes-games': 'snes',
}

export function getPlatformCollectionKey(slug: string) {
  return platformCollectionKeys[slug]
}

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
