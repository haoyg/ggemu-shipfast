import type { Locale, PublicGame } from '#/lib/ggemu'

export type GameSeoInternalLink = {
  label: string
  slug: string
}

const gameSeoLinkClusters: Array<Array<GameSeoInternalLink>> = [
  [
    { label: 'Play Commandos: Behind Enemy Lines online', slug: 'commandos-dos-1998' },
    { label: 'Play Theme Hospital online', slug: 'theme-hospital-dos-1997' },
    { label: 'Play Romance of the Three Kingdoms IV online', slug: 'romance-of-the-three-kingdoms-iv-dos-1994' },
  ],
  [
    { label: 'Try Murdoku deduction puzzles', slug: 'murdoku-html5-2026' },
    { label: 'Try Onet Master tile matching', slug: 'onet-master-html5' },
  ],
  [
    { label: 'Explore Three Wonders arcade games', slug: 'three-wonders-arcade-1991' },
    { label: 'Explore Pipi and Bibis arcade action', slug: 'pipi-and-bibis-other-1991' },
    { label: "Play The King of Fighters '97 online", slug: 'the-king-of-fighters-97-arcade-1997' },
    { label: 'Play Gals Panic online', slug: 'gals-panic-arcade' },
  ],
  [
    {
      label: 'Play Geometry Dash Advance online',
      slug: 'geometry-dash-advance-gba-2025',
    },
    {
      label: 'Play Space is Key online',
      slug: 'space-is-key-flash-2011',
    },
    {
      label: 'Play Rhythm Tengoku online',
      slug: 'rhythm-tengoku-japan-gba-2006',
    },
  ],
  [
    {
      label: 'Play Taiko Web online',
      slug: 'taiko-no-tatsujin-taiko-web-html5-2011',
    },
    {
      label: 'Play Taiko no Tatsujin DS online',
      slug: 'taiko-no-tatsujin-ds-touch-de-dokodon-nds-2005',
    },
    {
      label: 'Play Rhythm Heaven online',
      slug: 'rhythm-heaven-nds-2008',
    },
  ],
  [
    {
      label: "Play Shonen Jump's One Piece online",
      slug: 'shonen-jump-s-one-piece-gba-2005',
    },
    {
      label: 'Play One Piece: Gigant Battle online',
      slug: 'one-piece-gigant-battle-nds-2011',
    },
    {
      label: 'Play One Piece Grand Battle online',
      slug: 'one-piece-grand-battle-swan-colosseum-wsc-2002',
    },
    {
      label: 'Play One Piece Swan Colosseum online',
      slug: 'from-tv-animation-one-piece-grand-battle-swan-colosseum-wsc-2002',
    },
    {
      label: "Play Disney's Lilo & Stitch online",
      slug: 'lilo-stitch-trouble-in-paradise-ps1-2002',
    },
    {
      label: 'Play Prince of Persia: The Sands of Time online',
      slug: 'prince-of-persia-the-sands-of-time-java-2003',
    },
  ],
]

const chineseGameSeoLinkClusters: Array<Array<GameSeoInternalLink>> = [
  [
    { label: '太鼓 Web 网页版玩法', slug: 'taiko-no-tatsujin-taiko-web-html5-2011' },
    { label: '太鼓达人 DS 游戏详情', slug: 'taiko-no-tatsujin-ds-touch-de-dokodon-nds-2005' },
    { label: '节奏天国 DS 游戏详情', slug: 'rhythm-heaven-nds-2008' },
  ],
  [
    { label: '三国群英传 2 在线玩与存档说明', slug: 'san-guo-qun-ying-zhuan-2-html5-1998' },
    { label: '三国志 IV 游戏详情', slug: 'romance-of-the-three-kingdoms-iv-dos-1994' },
    { label: '三国杀网页版游戏详情', slug: 'sanguosha-html5-2011' },
  ],
  [
    { label: '魂斗罗 NES 游戏详情', slug: 'contra-nes-1988' },
    { label: '双截龙 II NES 游戏详情', slug: 'double-dragon-ii-revenge-nes-1989' },
  ],
  [
    { label: '宝可梦绿宝石 GBA 游戏详情', slug: 'pokemon-emerald-gba-2004' },
    { label: '宝可梦红宝石 GBA 游戏详情', slug: 'pokemon-ruby-gba-2002' },
    { label: '宝可梦叶绿 GBA 游戏详情', slug: 'pokemon-leafgreen-game-boy-advance-2004' },
  ],
]

export function getGameSeoInternalLinks(game: PublicGame, locale: Locale) {
  if (locale !== 'en' && locale !== 'zh-CN') {
    return []
  }

  const currentSlug = game.url_slug?.trim().toLowerCase()
  const clusters = locale === 'zh-CN' ? chineseGameSeoLinkClusters : gameSeoLinkClusters
  const cluster = clusters.find((links) =>
    links.some((link) => link.slug === currentSlug),
  )

  return cluster?.filter((link) => link.slug !== currentSlug) ?? []
}
