import type { Locale, PublicGame } from '#/lib/ggemu'
import { getEditorialGameRouteIds, getGameEditorial } from '#/lib/game-editorial'
import { getGameSearchSeo, getGameSeoRouteIds } from '#/lib/game-seo-targets'
import { getReviewedChineseGameRouteIds } from '#/lib/game-name-aliases'

const gameLocales = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'pt', 'fr', 'de', 'it'] as const satisfies ReadonlyArray<Locale>

export function isIndexableGameDetail(game: PublicGame, locale: Locale) {
  return Boolean(getGameEditorial(game, locale) || getGameSearchSeo(game, locale))
}

export function getIndexableGameLocales(game: PublicGame) {
  return gameLocales.filter((locale) => isIndexableGameDetail(game, locale))
}

export function getIndexableGameRouteIds() {
  return Array.from(new Set([
    ...getEditorialGameRouteIds(),
    ...getGameSeoRouteIds(),
    ...getReviewedChineseGameRouteIds(),
  ])).sort()
}
