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

const gamePlatformCollectionPaths: Record<string, string> = {
  arcade: '/en/arcade-games',
  famicom: '/en/nes-games',
  gba: '/en/gba-games',
  genesis: '/en/sega-genesis-games',
  'game boy advance': '/en/gba-games',
  'mega drive': '/en/sega-genesis-games',
  n64: '/en/n64-games',
  nes: '/en/nes-games',
  'nintendo 64': '/en/n64-games',
  'nintendo entertainment system': '/en/nes-games',
  playstation: '/en/ps1-games',
  'playstation 1': '/en/ps1-games',
  ps1: '/en/ps1-games',
  'sega genesis': '/en/sega-genesis-games',
  snes: '/en/snes-games',
  'super famicom': '/en/snes-games',
  'super nintendo': '/en/snes-games',
}

export function getGamePlatformCollectionPath(
  platform: string | undefined,
  locale: Locale,
) {
  const path = gamePlatformCollectionPaths[platform?.trim().toLowerCase() ?? '']

  return path ? getPlatformCollectionPath(path, locale) : undefined
}
