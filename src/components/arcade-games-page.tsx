import {
  GameCollectionPage,
  type GameCollectionPageConfig,
} from '#/components/game-collection-page'
import type { Locale, PublicGame } from '#/lib/ggemu'

export const arcadeFaqs = [
  {
    question: 'Can I play classic arcade games online without downloading anything?',
    answer:
      'Yes. Supported arcade games on POKOPIE open from their game page in a modern browser, so you do not need to install a separate emulator.',
  },
  {
    question: 'Are these classic arcade games free to play?',
    answer:
      'Games listed in this collection can be opened online from POKOPIE. Availability and browser support can vary by title.',
  },
  {
    question: 'Can I play arcade games with a keyboard or controller?',
    answer:
      'Control support depends on the game player. Review the controls on each game page and connect a compatible controller before launching when gamepad input is supported.',
  },
  {
    question: 'Do classic arcade games work on mobile devices?',
    answer:
      'Some games work on current mobile browsers, while others are better suited to a desktop keyboard or controller. Support is shown on the individual game page.',
  },
]

export const arcadePageConfig: GameCollectionPageConfig = {
  routePath: '/en/arcade-games',
  heroTitle: 'Play Classic Arcade Games Online',
  heroDescription:
    'Play classic arcade games online in your browser, from fighting and shoot ’em up favorites to puzzle, racing, and platform games. Supported titles need no separate emulator download.',
  ctaLabel: 'Browse Arcade Games',
  libraryTitle: 'Classic Arcade Game Library',
  libraryDescription: (total) =>
    `Browse ${total} arcade games currently listed in the POKOPIE catalog.`,
  unavailableMessage: 'Arcade games are temporarily unavailable. Please check back soon.',
  featuredLabel: 'Featured classic arcade games',
  coverAlt: 'classic arcade game cover',
  articleTitle: 'Classic Arcade Games, Ready in Your Browser',
  articleParagraphs: [
    'Arcade games were designed around quick starts, clear goals, and one-more-run momentum. POKOPIE brings available classics into one browser collection, making it easier to find a game and reach its playable page.',
    'Explore head-to-head fighters, scrolling shooters, beat ’em ups, puzzle challenges, and score-driven racers. Each listing includes platform information, controls, and a browser player when that title is available online.',
    'For smoother play, use an up-to-date browser, close unnecessary tabs, and connect your controller before launching a game when you prefer gamepad controls.',
  ],
  benefits: [
    {
      icon: 'bolt',
      title: 'Quick browser access',
      body: 'Open a supported arcade game page without installing a separate emulator.',
    },
    {
      icon: 'gamepad',
      title: 'Keyboard and gamepad controls',
      body: 'Use the controls provided by each title and browser player.',
    },
    {
      icon: 'trophy',
      title: 'Score-driven classics',
      body: 'Discover games built for fast rounds, mastery, and replay value.',
    },
    {
      icon: 'monitor',
      title: 'Modern browser support',
      body: 'Play on a current desktop or mobile browser when the title supports it.',
    },
  ],
  genresTitle: 'Popular Arcade Game Types',
  genres: [
    {
      name: 'Fighting',
      description: 'One-on-one battles and martial arts',
      icon: 'boxing',
    },
    {
      name: 'Shoot ’em up',
      description: 'Fast scrolling arcade shooters',
      icon: 'rocket',
      matchTerms: ['Shoot', 'Shooter', 'Shmup'],
    },
    {
      name: 'Beat ’em up',
      description: 'Brawlers built around powerful combos',
      icon: 'dumbbell',
      matchTerms: ['Beat', 'Brawler', 'Action'],
    },
    {
      name: 'Puzzle',
      description: 'Quick-thinking classic challenges',
      icon: 'puzzle',
    },
    {
      name: 'Racing',
      description: 'High-speed arcade competition',
      icon: 'flag',
    },
    {
      name: 'Platform',
      description: 'Jump, run, and overcome obstacles',
      icon: 'platform',
    },
  ],
  faqs: arcadeFaqs,
}

const localizedArcadeCopy = {
  'zh-CN': {
    title: '在线玩经典街机游戏 | POKOPIE', description: '在浏览器中在线玩经典街机游戏，浏览格斗、射击、益智、赛车和平台游戏。', heroTitle: '在线玩经典街机游戏', heroDescription: '在浏览器中重温经典街机游戏，支持的游戏无需单独下载模拟器。', ctaLabel: '浏览街机游戏', libraryTitle: '经典街机游戏库', libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款街机游戏。`, unavailableMessage: '街机游戏暂时不可用，请稍后再试。', featuredLabel: '精选经典街机游戏', coverAlt: '经典街机游戏封面',
  },
  ja: {
    title: 'クラシックアーケードゲームをオンラインでプレイ | POKOPIE', description: 'ブラウザーでクラシックアーケードゲームをプレイ。格闘、シューティング、パズル、レースなどを楽しめます。', heroTitle: 'クラシックアーケードゲームをオンラインでプレイ', heroDescription: 'ブラウザーで名作アーケードゲームを楽しめます。対応タイトルは専用エミュレーター不要です。', ctaLabel: 'アーケードゲームを見る', libraryTitle: 'クラシックアーケードゲームライブラリ', libraryDescription: (total: number) => `POKOPIE に掲載されているアーケードゲーム ${total} 件を閲覧できます。`, unavailableMessage: 'アーケードゲームは一時的に利用できません。後でもう一度お試しください。', featuredLabel: 'おすすめアーケードゲーム', coverAlt: 'クラシックアーケードゲームのカバー',
  },
} as const

export function getLocalizedArcadePageConfig(locale: Locale): GameCollectionPageConfig {
  if (locale === 'en') return arcadePageConfig
  return { ...arcadePageConfig, ...localizedArcadeCopy[locale], routePath: `/${locale}/arcade-games` }
}

export function getLocalizedArcadeCollection(locale: Locale) {
  const page = getLocalizedArcadePageConfig(locale)
  const copy = locale === 'en' ? null : localizedArcadeCopy[locale]
  return { breadcrumbName: locale === 'ja' ? 'アーケードゲーム' : locale === 'en' ? 'Arcade Games' : '街机游戏', description: copy?.description ?? 'Play classic arcade games online in your browser.', page, platform: 'Arcade', routePath: page.routePath, schemaName: page.heroTitle, title: copy?.title ?? 'Play Classic Arcade Games Online Free | POKOPIE' }
}

export function ArcadeGamesPage({ games, total, locale = 'en' }: { games: Array<PublicGame>; total: number; locale?: Locale }) {
  return <GameCollectionPage config={getLocalizedArcadePageConfig(locale)} games={games} locale={locale} total={total} />
}
