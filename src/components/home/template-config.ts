import type { PublicGame } from '#/lib/ggemu'

import type { FeaturePlatformGames, FeatureSection } from './types'

export const POKI_REQUEST_SIZE = 100
export const POKI_LAYOUT_SEED_DAY_MS = 24 * 60 * 60 * 1000

export const FEATURE_NEW_ARRIVAL_LIMIT = 7
export const FEATURE_PLATFORM_LIMIT = 8
export const FEATURE_PLATFORMS = [
  'Arcade',
  'FLASH',
  'HTML5',
  'Famicom',
  'Game Boy Advance',
] as const
export const FEATURE_SECTION_LIMIT = 10

export function getPokiDailyLayoutSeed(date = new Date()) {
  const utcDayStart = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  )

  return Math.floor(utcDayStart / POKI_LAYOUT_SEED_DAY_MS)
}

export function getFeatureSections({
  newArrival,
  platformGames = [],
}: {
  newArrival: Array<PublicGame>
  platformGames?: Array<FeaturePlatformGames>
}): Array<FeatureSection> {
  return [
    {
      title: 'New Arrival',
      games: newArrival.slice(0, FEATURE_NEW_ARRIVAL_LIMIT),
      hasHeroCard: true,
    },
    ...platformGames.map((platform) => ({
      title: platform.title,
      games: platform.games.slice(0, FEATURE_PLATFORM_LIMIT),
      hasHeroCard: false,
      isSingleRow: true,
    })),
  ]
}
