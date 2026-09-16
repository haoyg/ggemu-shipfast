import type { Locale, PublicGame } from './ggemu'

type LocalizedGameOverride = {
  name?: Partial<Record<Locale, string>>
  description?: Partial<Record<Locale, string>>
  howToPlay?: Partial<Record<Locale, string>>
  developer?: string | null
  releasedYear?: string | null
}

const localizedGameOverrides: Record<string, LocalizedGameOverride> = {
  '1942-cn-nes-1985': {
    name: { en: '1942 — Chinese Version' },
  },
  '1943-the-battle-of-midway-cn-nes-1988': {
    name: { en: '1943: The Battle of Midway — Chinese Version' },
  },
  '1944-cn-nes-1988': {
    name: { en: '1944 — Unofficial 1943 ROM Hack' },
    developer: 'Unknown (unofficial ROM hack)',
    releasedYear: null,
  },
  'chinese-paladin-dos-1995': {
    name: { en: 'The Legend of Sword and Fairy' },
    developer: 'Softstar Entertainment',
    releasedYear: '1995',
  },
  'chobits-atashi-dake-no-hito-game-boy-advance-2002': {
    name: { en: 'Chobits: Atashi Dake no Hito' },
  },
  'dad-n-me-flash-2005': {
    name: { en: "Dad 'n Me" },
  },
  'double-dragon-ii-revenge-nes-1989': {
    name: { en: 'Double Dragon II: The Revenge — Chinese Version' },
  },
  'doudizhu-gcoin-html5-2013': {
    name: { en: 'Dou Dizhu — GCoin Edition' },
  },
  'doudizhu-html5-2013': {
    name: { en: 'Dou Dizhu' },
  },
  'fire-emblem-the-blazing-blade-gba-2003': {
    name: { en: 'Fire Emblem: The Blazing Blade' },
  },
  'ghost-chaser-densei-snes-1994': {
    name: { en: 'Ghost Chaser Densei' },
  },
  'flame-dragon-knight-2-dos-1995': {
    name: { en: 'Flame Dragon Knights II: Legend of the Golden Castle' },
    developer: 'Han Tang International Information',
    releasedYear: '1995',
  },
  'flame-dragon-knights-seal-of-the-evil-god-dos-1994': {
    name: { en: 'Flame Dragon Knights: Seal of the Evil God' },
    developer: 'Han Tang International Information',
    releasedYear: '1994',
  },
  'hong-kong-mahjong-html5': {
    name: { en: 'Hong Kong Mahjong' },
  },
  'initial-d-another-stage-cn-gba-2002': {
    name: { en: 'Initial D: Another Stage — Chinese Translation' },
    developer: 'Sammy',
    releasedYear: '2002',
  },
  'labrador-and-his-friends-nintendo-ds-2009': {
    name: { en: 'Nintendogs: Labrador & Friends — Chinese Translation' },
    developer: 'Nintendo',
    releasedYear: '2005',
  },
  'light-and-darkness-crystal-conflict-nes-2003': {
    name: { en: 'Final Fantasy IV: The Conflict of Light and Dark Crystals — Unlicensed Demake' },
    developer: 'Nanjing (unlicensed)',
    releasedYear: null,
  },
  'jin-yong-heroes-2-enhanced-flash-2006': {
    name: { en: 'Heroes of Jin Yong 2 — Enhanced Edition' },
  },
  'jin-yong-heroes-3-flash-2009': {
    name: { en: 'Heroes of Jin Yong 3' },
  },
  'jin-yong-qun-xia-zhuan-dos-1996': {
    name: { en: 'Heroes of Jin Yong' },
  },
  'magic-tower-flash-2000': {
    name: { en: 'Magic Tower 1.1' },
  },
  'mahjong-academy-arcade-1989': {
    name: { en: 'Mahjong Academy' },
  },
  'mario-and-luigi-superstar-saga-gba-2003': {
    name: { en: 'Mario & Luigi: Superstar Saga' },
  },
  'maplestory-ds-nds-2010': {
    name: { en: 'MapleStory DS' },
    developer: 'Nexon / Nintendo',
    releasedYear: '2010',
  },
  'metal-gear-2030-cn-gbc': {
    name: { en: 'Metal Gear 2030 — Chinese Translation' },
  },
  'naruto-shippuden-ultimate-impact-psp-2011': {
    name: { en: 'Naruto Shippuden: Ultimate Ninja Impact' },
    developer: 'CyberConnect2',
    releasedYear: '2011',
  },
  'pokemon-emerald-gba-2004': {
    name: { en: 'Pokémon Emerald' },
  },
  'pokemon-firered-game-boy-advance-2004': {
    name: { en: 'Pokémon FireRed' },
    releasedYear: '2004',
  },
  'pokemon-leafgreen-game-boy-advance-2004': {
    name: { en: 'Pokémon LeafGreen' },
  },
  'pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005': {
    name: { en: 'Pokémon Mystery Dungeon: Red Rescue Team' },
  },
  'pokemon-ruby-gba-2002': {
    name: { en: 'Pokémon Ruby' },
  },
  'pokemon-team-rocket-game-boy-advance-2000': {
    name: { en: 'Pokémon Team Rocket — Unofficial ROM Hack' },
    developer: 'Unknown (unofficial ROM hack)',
    releasedYear: null,
  },
  'professor-layton-and-the-curious-village-nds-2007': {
    name: { en: 'Professor Layton and the Curious Village' },
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
  'saiyuki-tang-sanzang-nes-1996': {
    name: { en: 'Zui You Ji: Tang Sanzang — Unlicensed' },
    developer: 'Nanjing (unlicensed)',
    releasedYear: null,
  },
  'sichuan-mahjong-html5': {
    name: { en: 'Sichuan Mahjong: Xue Zhan Dao Di' },
  },
  'taiko-no-tatsujin-taiko-web-html5-2011': {
    name: { en: 'Taiko Web' },
  },
  'taiwan-mahjong-16-tile-html5': {
    name: { en: 'Taiwanese Mahjong — 16 Tiles' },
  },
  'the-killing-blade-arcade-1998': {
    name: { en: 'The Killing Blade' },
  },
  'the-legend-of-sword-and-saber-arcade-2003': {
    name: { en: 'The Gladiator' },
  },
  'theme-hospital-dos-1997': {
    name: { en: 'Theme Hospital' },
  },
  'xian-jian-qi-xia-zhuan-gba-2001': {
    name: { en: 'The Legend of Sword and Fairy — GBA Port' },
  },
  'xuan-yuan-sword-dos-1990': {
    name: { en: 'Xuan-Yuan Sword' },
  },
  'xuan-yuan-sword-ii-dos-1994': {
    name: { en: 'Xuan-Yuan Sword II' },
    developer: 'DOMO Studio / Softstar Entertainment',
    releasedYear: '1994',
  },
  'yan-loong-story-flash-2008': {
    name: { en: 'Yan Loong Legend' },
  },
  'yanlong-chuanshuo-2-erdu-chongji-flash-2009': {
    name: { en: 'Yan Loong Legend 2: 2nd Impact' },
  },
  'yanlong-chuanshuo-2-shuang-long-flash-2009': {
    name: { en: 'Yan Loong Legend 2: The Double Dragon' },
  },
  'yanlong-chuanshuo-3-chifeng-flash-2010': {
    name: { en: 'Yan Loong Legend 3: Phoenix' },
  },
  'yanlong-chuanshuo-3-shuang-yan-flash-2009': {
    name: { en: 'Yan Loong Legend 3: Double Swallow' },
  },
  'chinese-mahjong-html5': {
    name: { en: 'Chinese Standard Mahjong' },
  },
  'naruto-rpg-gba-2003': {
    name: { en: 'Naruto RPG — Chinese Translation V3' },
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
    developer: getMetadataOverride(game.developer, override?.developer),
    released_year: getMetadataOverride(game.released_year, override?.releasedYear),
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

function getMetadataOverride(source: string | undefined, override: string | null | undefined) {
  if (override === undefined) {
    return source
  }

  return override?.trim() || undefined
}

function normalizeSlug(value: string | undefined) {
  return value?.trim().toLowerCase() ?? ''
}
