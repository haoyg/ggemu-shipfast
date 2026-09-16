import type { Locale, PublicGame } from './ggemu'

type LocalizedGameOverride = {
  name?: Partial<Record<Locale, string>>
  description?: Partial<Record<Locale, string>>
  howToPlay?: Partial<Record<Locale, string>>
}

const localizedGameOverrides: Record<string, LocalizedGameOverride> = {
  'chinese-paladin-dos-1995': {
    name: { en: 'The Legend of Sword and Fairy' },
  },
  'initial-d-another-stage-cn-gba-2002': {
    name: { en: 'Initial D: Another Stage — Chinese Version' },
  },
  'magic-tower-flash-2000': {
    name: { en: 'Magic Tower 1.1' },
  },
  'maplestory-ds-nds-2010': {
    name: { en: 'MapleStory DS' },
  },
  'metal-gear-2030-cn-gbc': {
    name: { en: 'Metal Gear 2030 — Chinese Translation' },
  },
  'naruto-shippuden-ultimate-impact-psp-2011': {
    name: { en: 'Naruto Shippuden: Ultimate Ninja Impact' },
  },
  'pokemon-emerald-gba-2004': {
    name: { en: 'Pokémon Emerald' },
  },
  'pokemon-firered-game-boy-advance-2004': {
    name: { en: 'Pokémon FireRed' },
  },
  'san-guo-qun-ying-zhuan-2-html5-1998': {
    name: { en: 'Heroes of the Three Kingdoms 2' },
  },
  'sanguosha-html5-2011': {
    name: { en: 'Sanguosha' },
  },
  'taiko-no-tatsujin-taiko-web-html5-2011': {
    name: { en: 'Taiko Web' },
  },
  'the-killing-blade-arcade-1998': {
    name: { en: 'The Killing Blade' },
  },
}

const latinLetterPattern = /\p{Script=Latin}/gu
const hanPattern = /\p{Script=Han}/gu
const kanaPattern = /[\p{Script=Hiragana}\p{Script=Katakana}]/gu
const hangulPattern = /\p{Script=Hangul}/gu

export function localizePublicGame(game: PublicGame, locale: Locale): PublicGame {
  const override = localizedGameOverrides[normalizeSlug(game.url_slug)]

  return {
    ...game,
    name: override?.name?.[locale]?.trim() || game.name,
    description: getLocalizedText(game.description, override?.description?.[locale], locale),
    how_to_play: getLocalizedText(game.how_to_play, override?.howToPlay?.[locale], locale),
    keywords: undefined,
  }
}

export function localizePublicGames(games: Array<PublicGame>, locale: Locale) {
  return games.map((game) => localizePublicGame(game, locale))
}

export function isTextSuitableForLocale(value: string | undefined, locale: Locale) {
  const text = value?.trim()

  if (!text) {
    return false
  }

  const latinCount = countMatches(text, latinLetterPattern)
  const hanCount = countMatches(text, hanPattern)
  const kanaCount = countMatches(text, kanaPattern)
  const hangulCount = countMatches(text, hangulPattern)

  if (locale === 'en') {
    return latinCount >= 10 && latinCount >= (hanCount + kanaCount + hangulCount) * 3
  }

  if (locale === 'ja') {
    return kanaCount >= 2
  }

  return hanCount >= 5 && kanaCount === 0
}

function getLocalizedText(
  source: string | undefined,
  localizedOverride: string | undefined,
  locale: Locale,
) {
  const override = localizedOverride?.trim()

  if (override) {
    return override
  }

  return isTextSuitableForLocale(source, locale) ? source?.trim() : undefined
}

function countMatches(value: string, pattern: RegExp) {
  pattern.lastIndex = 0
  return value.match(pattern)?.length ?? 0
}

function normalizeSlug(value: string | undefined) {
  return value?.trim().toLowerCase() ?? ''
}
