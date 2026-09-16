import type { Locale, PublicGame } from './ggemu'

type LocalizedGameOverride = {
  name?: Partial<Record<Locale, string>>
  description?: Partial<Record<Locale, string>>
  howToPlay?: Partial<Record<Locale, string>>
}

const localizedGameOverrides: Record<string, LocalizedGameOverride> = {
  '1942-cn-nes-1985': {
    name: { en: '1942 — Chinese Version' },
  },
  '1943-the-battle-of-midway-cn-nes-1988': {
    name: { en: '1943: The Battle of Midway — Chinese Version' },
  },
  'chinese-paladin-dos-1995': {
    name: { en: 'The Legend of Sword and Fairy' },
  },
  'double-dragon-ii-revenge-nes-1989': {
    name: { en: 'Double Dragon II: The Revenge — Chinese Version' },
  },
  'initial-d-another-stage-cn-gba-2002': {
    name: { en: 'Initial D: Another Stage — Chinese Version' },
  },
  'magic-tower-flash-2000': {
    name: { en: 'Magic Tower 1.1' },
  },
  'mahjong-academy-arcade-1989': {
    name: { en: 'Mahjong Academy' },
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
  'ra2web-html5-2026': {
    name: { en: 'RA2WEB' },
  },
  'rich-man-3-dos-1996': {
    name: { en: 'Richman 3' },
  },
  'richman-2-dos-1993': {
    name: { en: 'Richman 2' },
  },
  'romance-of-the-three-kingdoms-iv-dos-1994': {
    name: { en: 'Romance of the Three Kingdoms IV: Wall of Fire' },
  },
  'san-guo-qun-ying-zhuan-2-html5-1998': {
    name: { en: 'Heroes of the Three Kingdoms 2' },
  },
  'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988': {
    name: { en: 'Saint Seiya: Ougon Densetsu Kanketsu Hen — Chinese Version' },
  },
  'sanguosha-html5-2011': {
    name: { en: 'Sanguosha' },
  },
  'satomi-hakkenden-cn-nes-1989': {
    name: { en: 'Satomi Hakkenden — Chinese Version' },
  },
  'taiko-no-tatsujin-taiko-web-html5-2011': {
    name: { en: 'Taiko Web' },
  },
  'the-killing-blade-arcade-1998': {
    name: { en: 'The Killing Blade' },
  },
  'the-legend-of-sword-and-saber-arcade-2003': {
    name: { en: 'The Gladiator' },
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
