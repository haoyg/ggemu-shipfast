import {
  GameCollectionPage,
  type GameCollectionPageConfig,
} from '#/components/game-collection-page'
import type { Locale, PublicGame } from '#/lib/ggemu'

export const ps1Faqs = [
  {
    question: 'Can I play PS1 games online without downloading anything?',
    answer:
      'Yes. Supported PS1 games on POKOPIE launch directly from their game page in a modern browser, without requiring a separate emulator download.',
  },
  {
    question: 'Which browser works best for online PS1 games?',
    answer:
      'A current version of Chrome, Edge, Firefox, or Safari is recommended. Performance can vary by game, device, browser, and network connection.',
  },
  {
    question: 'Can I use a controller to play PS1 games online?',
    answer:
      'Controller support depends on the game player and browser. Connect your controller before launching a game and review the controls shown in the player.',
  },
  {
    question: 'Are all PlayStation 1 games available to play?',
    answer:
      'Availability changes over time. This page lists the PS1 titles currently available in the POKOPIE catalog.',
  },
]

export const ps1PageConfig: GameCollectionPageConfig = {
  routePath: '/en/ps1-games',
  heroTitle: 'Play PS1 Games Online',
  heroDescription:
    'Play PS1 games online in your browser and revisit classic PlayStation adventures, racers, RPGs, and fighting games. No separate emulator installation is required for supported titles.',
  ctaLabel: 'Browse PS1 Games',
  secondaryCta: {
    href: '/en/ps1-compatibility',
    label: 'Check browser compatibility',
  },
  libraryTitle: 'PS1 Game Library',
  libraryDescription: (total) =>
    `Browse ${total} PlayStation 1 games currently listed in the POKOPIE catalog.`,
  unavailableMessage: 'PS1 games are temporarily unavailable. Please check back soon.',
  featuredLabel: 'Featured PS1 games',
  coverAlt: 'PS1 game cover',
  articleTitle: 'The Best Way to Play PS1 Games in Your Browser',
  articleParagraphs: [
    'The original PlayStation built a library that crossed genres and generations. POKOPIE brings available PS1 titles into a focused browser collection, so you can move from discovery to a playable game page with fewer steps.',
    'Start with a familiar series or explore something new. Each game page includes the title, platform information, controls, and a browser player when that game is available online.',
    'For the most reliable experience, use an up-to-date browser, close unnecessary tabs, and connect a controller before launching the game if you prefer gamepad controls.',
  ],
  benefits: [
    {
      icon: 'bolt',
      title: 'Start in your browser',
      body: 'Open a supported game page and begin without installing a desktop emulator.',
    },
    {
      icon: 'gamepad',
      title: 'Keyboard and controller support',
      body: 'Use the controls provided by each game and browser player.',
    },
    {
      icon: 'grid',
      title: 'A focused PS1 library',
      body: 'Browse PlayStation classics in one dedicated collection.',
    },
    {
      icon: 'monitor',
      title: 'Built for modern browsers',
      body: 'Play on a current desktop or mobile browser when the game supports it.',
    },
  ],
  genresTitle: 'Popular PS1 Genres',
  genres: [
    { name: 'RPG', description: 'Explore a PS1 title', icon: 'wand' },
    { name: 'Racing', description: 'Explore a PS1 title', icon: 'steering' },
    { name: 'Action', description: 'Explore a PS1 title', icon: 'swords' },
    { name: 'Adventure', description: 'Explore a PS1 title', icon: 'compass' },
    { name: 'Fighting', description: 'Explore a PS1 title', icon: 'boxing' },
    { name: 'Sports', description: 'Explore a PS1 title', icon: 'ball' },
  ],
  faqs: ps1Faqs,
}

const localizedPs1Copy = {
  'zh-CN': {
    title: '在线玩 PS1 游戏 | 免下载 | POKOPIE', description: '在浏览器中在线玩 PS1 游戏，浏览经典 PlayStation RPG、赛车、动作和格斗游戏。', heroTitle: '在线玩 PS1 游戏', heroDescription: '在浏览器中重温经典 PlayStation 冒险、赛车、RPG 和格斗游戏，支持的游戏无需单独安装模拟器。', ctaLabel: '浏览 PS1 游戏', libraryTitle: 'PS1 游戏库', libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款 PlayStation 1 游戏。`, unavailableMessage: 'PS1 游戏暂时不可用，请稍后再试。', featuredLabel: '精选 PS1 游戏', coverAlt: 'PS1 游戏封面',
  },
  ja: {
    title: 'PS1 ゲームをオンラインでプレイ | ダウンロード不要 | POKOPIE', description: 'ブラウザーで PS1 ゲームをプレイ。PlayStation の RPG、レース、アクション、格闘の名作を楽しめます。', heroTitle: 'PS1 ゲームをオンラインでプレイ', heroDescription: 'ブラウザーで PlayStation の冒険、レース、RPG、格闘の名作を楽しめます。対応タイトルは専用エミュレーター不要です。', ctaLabel: 'PS1 ゲームを見る', libraryTitle: 'PS1 ゲームライブラリ', libraryDescription: (total: number) => `POKOPIE に掲載されている PlayStation 1 ゲーム ${total} 件を閲覧できます。`, unavailableMessage: 'PS1 ゲームは一時的に利用できません。後でもう一度お試しください。', featuredLabel: 'おすすめ PS1 ゲーム', coverAlt: 'PS1 ゲームのカバー',
  },
} as const

export function getLocalizedPs1PageConfig(locale: Locale): GameCollectionPageConfig {
  if (locale === 'en') return ps1PageConfig
  return { ...ps1PageConfig, ...localizedPs1Copy[locale], routePath: `/${locale}/ps1-games`, secondaryCta: undefined }
}

export function getLocalizedPs1Collection(locale: Locale) {
  const page = getLocalizedPs1PageConfig(locale)
  const copy = locale === 'en' ? null : localizedPs1Copy[locale]
  return { breadcrumbName: locale === 'ja' ? 'PS1 ゲーム' : locale === 'en' ? 'PS1 Games' : 'PS1 游戏', description: copy?.description ?? 'Play PS1 games online in your browser.', page, platform: 'PlayStation 1', routePath: page.routePath, schemaName: page.heroTitle, title: copy?.title ?? 'Play PS1 Games Online Free | No Download | POKOPIE' }
}

export function Ps1GamesPage({ games, total, locale = 'en' }: { games: Array<PublicGame>; total: number; locale?: Locale }) {
  return <GameCollectionPage config={getLocalizedPs1PageConfig(locale)} games={games} locale={locale} total={total} />
}
