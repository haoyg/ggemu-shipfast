import type { Locale, PublicGame } from '#/lib/ggemu'

type ChineseGameName = {
  en: string
  'zh-CN': string
  'zh-TW': string
  searchAliases?: string[]
}

const chineseGameNames: Readonly<Record<string, ChineseGameName>> = {
  'contra-nes-1988': { en: 'Contra', 'zh-CN': '魂斗罗', 'zh-TW': '魂斗羅' },
  'double-dragon-ii-revenge-nes-1989': { en: 'Double Dragon II: The Revenge', 'zh-CN': '双截龙 II', 'zh-TW': '雙截龍 II', searchAliases: ['双截龙2', '雙截龍2'] },
  'donkey-kong-nes-1983': { en: 'Donkey Kong', 'zh-CN': '大金刚', 'zh-TW': '大金剛' },
  'jackal-nes-1988': { en: 'Jackal', 'zh-CN': '赤色要塞', 'zh-TW': '赤色要塞' },
  'life-force-nes-1988': { en: 'Life Force', 'zh-CN': '沙罗曼蛇', 'zh-TW': '沙羅曼蛇', searchAliases: ['Salamander'] },
  'super-mario-bros-the-lost-levels-enhanced-snes-1993': { en: 'Super Mario Bros.: The Lost Levels', 'zh-CN': '超级马里奥兄弟：失落的关卡', 'zh-TW': '超級瑪利歐兄弟：失落的關卡', searchAliases: ['超级玛丽', '超級瑪利歐'] },
  'super-mario-64-n64-1996': { en: 'Super Mario 64', 'zh-CN': '超级马里奥 64', 'zh-TW': '超級瑪利歐 64', searchAliases: ['超级玛丽64', '超級瑪利歐64'] },
  'new-super-mario-bros-nds-2006': { en: 'New Super Mario Bros.', 'zh-CN': '新超级马里奥兄弟', 'zh-TW': '新超級瑪利歐兄弟', searchAliases: ['新超级玛丽', '新超級瑪利歐'] },
  'the-king-of-fighters-97-arcade-1997': { en: "The King of Fighters '97", 'zh-CN': '拳皇 97', 'zh-TW': '拳皇 97', searchAliases: ['KOF 97', '拳皇97'] },
  'pokemon-emerald-gba-2004': { en: 'Pokémon Emerald', 'zh-CN': '宝可梦 绿宝石', 'zh-TW': '寶可夢 綠寶石', searchAliases: ['口袋妖怪绿宝石', '神奇宝贝绿宝石'] },
  'pokemon-ruby-gba-2002': { en: 'Pokémon Ruby', 'zh-CN': '宝可梦 红宝石', 'zh-TW': '寶可夢 紅寶石', searchAliases: ['口袋妖怪红宝石', '神奇宝贝红宝石'] },
  'pokemon-leafgreen-game-boy-advance-2004': { en: 'Pokémon LeafGreen', 'zh-CN': '宝可梦 叶绿', 'zh-TW': '寶可夢 葉綠', searchAliases: ['口袋妖怪叶绿', '神奇宝贝叶绿'] },
  'pokemon-firered-game-boy-advance-2004': { en: 'Pokémon FireRed', 'zh-CN': '宝可梦 火红', 'zh-TW': '寶可夢 火紅', searchAliases: ['口袋妖怪火红', '神奇宝贝火红'] },
  'theme-hospital-dos-1997': { en: 'Theme Hospital', 'zh-CN': '主题医院', 'zh-TW': '主題醫院' },
  'commandos-dos-1998': { en: 'Commandos: Behind Enemy Lines', 'zh-CN': '盟军敢死队：深入敌后', 'zh-TW': '盟軍敢死隊：深入敵後' },
  'three-wonders-arcade-1991': { en: 'Three Wonders', 'zh-CN': '三个奇迹', 'zh-TW': '三個奇蹟' },
}

export function getReviewedChineseGameName(game: PublicGame, locale: Locale) {
  if (locale !== 'zh-CN' && locale !== 'zh-TW') return null
  const entry = chineseGameNames[getGameNameKey(game)]
  if (!entry) return null

  return {
    displayName: `${entry[locale]}（${entry.en}）`,
    englishName: entry.en,
    localizedName: entry[locale],
    searchAliases: entry.searchAliases ?? [],
  }
}

export function getGameAlternateNames(game: PublicGame, locale: Locale) {
  const entry = getReviewedChineseGameName(game, locale)
  return entry ? [entry.localizedName, entry.englishName, ...entry.searchAliases] : []
}

export function resolveChineseGameSearchQuery(query: string, locale: Locale) {
  const normalized = normalizeSearch(query)
  if (!normalized || (locale !== 'zh-CN' && locale !== 'zh-TW')) return query

  for (const entry of Object.values(chineseGameNames)) {
    const aliases = [entry['zh-CN'], entry['zh-TW'], entry.en, ...(entry.searchAliases ?? [])]
    if (aliases.some((alias) => normalizeSearch(alias) === normalized)) return entry.en
  }

  return query
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[\s：:（）()·.'’_-]+/g, '')
}

function normalizeSlug(value: string | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

function getGameNameKey(game: PublicGame) {
  if (game.url_slug?.trim()) return normalizeSlug(game.url_slug)
  if (game._id === '69cc9932a1f847282b35b6a5') return 'super-mario-64-n64-1996'
  if (game._id === '69d19a43eb21396d6195a021') return 'new-super-mario-bros-nds-2006'
  return ''
}
