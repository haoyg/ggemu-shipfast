import type { Locale, PublicGame } from '#/lib/ggemu'
import { getGameEditorial } from '#/lib/game-editorial'
import { getGameSearchSeo } from '#/lib/game-seo-targets'

const gameLocales = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'pt', 'fr', 'de', 'it'] as const satisfies ReadonlyArray<Locale>

export function isIndexableGameDetail(game: PublicGame, locale: Locale) {
  return Boolean(getGameEditorial(game, locale) || getGameSearchSeo(game, locale))
}

export function getIndexableGameLocales(game: PublicGame) {
  return gameLocales.filter((locale) => isIndexableGameDetail(game, locale))
}
