import {
  GameCollectionPage,
  type GameCollectionPageConfig,
} from '#/components/game-collection-page'
import type { Locale, PublicGame } from '#/lib/ggemu'

export type PlatformCollectionKey =
  | 'gba'
  | 'n64'
  | 'nes'
  | 'segaGenesis'
  | 'snes'

export type PlatformCollectionConfig = {
  breadcrumbName: string
  description: string
  page: GameCollectionPageConfig
  platform: string
  routePath: string
  schemaName: string
  title: string
}

const localizedPlatformSlugs: Record<PlatformCollectionKey, string> = {
  gba: 'gba-games',
  n64: 'n64-games',
  nes: 'nes-games',
  segaGenesis: 'sega-genesis-games',
  snes: 'snes-games',
}

const localizedPlatformCopy = {
  'zh-CN': {
    gba: {
      title: '在线玩 GBA 游戏 | 免下载 | POKOPIE',
      description: '在浏览器中在线玩 GBA 游戏，浏览动作、RPG、赛车、平台和冒险类 Game Boy Advance 游戏，无需单独下载模拟器。',
      schemaName: '在线玩 GBA 游戏',
      breadcrumbName: 'GBA 游戏',
      heroTitle: '在线玩 GBA 游戏',
      heroDescription: '在浏览器中在线玩 GBA 游戏，重温 Game Boy Advance 上的动作、RPG、赛车、平台和冒险经典。支持的游戏无需单独下载模拟器。',
      ctaLabel: '浏览 GBA 游戏',
      libraryTitle: 'GBA 游戏库',
      libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款 Game Boy Advance 游戏。`,
      unavailableMessage: 'GBA 游戏暂时不可用，请稍后再试。',
      featuredLabel: '精选 GBA 游戏',
      coverAlt: 'GBA 游戏封面',
    },
    n64: {
      title: '在线玩 N64 游戏 | 免下载 | POKOPIE',
      description: '在浏览器中在线玩 N64 游戏，浏览 Nintendo 64 的平台、赛车、体育、动作和冒险游戏。',
      schemaName: '在线玩 N64 游戏',
      breadcrumbName: 'N64 游戏',
      heroTitle: '在线玩 N64 游戏',
      heroDescription: '在线重温 Nintendo 64 的 3D 平台、赛车、体育、动作和冒险经典，从浏览器直接开始游戏。',
      ctaLabel: '浏览 N64 游戏',
      libraryTitle: 'N64 游戏库',
      libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款 Nintendo 64 游戏。`,
      unavailableMessage: 'N64 游戏暂时不可用，请稍后再试。',
      featuredLabel: '精选 N64 游戏',
      coverAlt: 'N64 游戏封面',
    },
    nes: {
      title: '在线玩 NES 游戏 | 免下载 | POKOPIE',
      description: '在浏览器中在线玩 NES 游戏，浏览经典 Nintendo 动作、平台、益智、体育和冒险游戏，无需单独下载模拟器。',
      schemaName: '在线玩 NES 游戏',
      breadcrumbName: 'NES 游戏',
      heroTitle: '在线玩 NES 游戏',
      heroDescription: '在线重温塑造动作、平台、益智、体育和冒险游戏的 8 位经典作品，支持的游戏可以直接从详情页开始。',
      ctaLabel: '浏览 NES 游戏',
      libraryTitle: 'NES 游戏库',
      libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款 NES 游戏。`,
      unavailableMessage: 'NES 游戏暂时不可用，请稍后再试。',
      featuredLabel: '精选 NES 游戏',
      coverAlt: 'NES 游戏封面',
    },
    segaGenesis: {
      title: '在线玩 Sega Genesis 游戏 | POKOPIE',
      description: '在浏览器中在线玩 Sega Genesis 游戏，浏览动作、平台、赛车、格斗和体育经典，无需单独下载模拟器。',
      schemaName: '在线玩 Sega Genesis 游戏',
      breadcrumbName: 'Sega Genesis 游戏',
      heroTitle: '在线玩 Sega Genesis 游戏',
      heroDescription: '在线重温 Sega Genesis 的动作、平台、赛车、格斗和体育经典，支持的游戏可以直接从浏览器开始。',
      ctaLabel: '浏览 Sega Genesis 游戏',
      libraryTitle: 'Sega Genesis 游戏库',
      libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款 Sega Genesis 游戏。`,
      unavailableMessage: 'Sega Genesis 游戏暂时不可用，请稍后再试。',
      featuredLabel: '精选 Sega Genesis 游戏',
      coverAlt: 'Sega Genesis 游戏封面',
    },
    snes: {
      title: '在线玩 SNES 游戏 | 免下载 | POKOPIE',
      description: '在浏览器中在线玩 SNES 游戏，浏览 Super Nintendo 的 RPG、平台、赛车、动作和冒险经典，无需单独下载模拟器。',
      schemaName: '在线玩 SNES 游戏',
      breadcrumbName: 'SNES 游戏',
      heroTitle: '在线玩 SNES 游戏',
      heroDescription: '在线重温 Super Nintendo 的 16 位 RPG、平台、赛车、动作和冒险经典，支持的游戏可以直接从浏览器开始。',
      ctaLabel: '浏览 SNES 游戏',
      libraryTitle: 'SNES 游戏库',
      libraryDescription: (total: number) => `浏览 POKOPIE 目录中的 ${total} 款 SNES 游戏。`,
      unavailableMessage: 'SNES 游戏暂时不可用，请稍后再试。',
      featuredLabel: '精选 SNES 游戏',
      coverAlt: 'SNES 游戏封面',
    },
  },
  ja: {
    gba: {
      title: 'GBA ゲームをオンラインでプレイ | ダウンロード不要 | POKOPIE',
      description: 'ブラウザーで GBA ゲームをプレイ。専用エミュレーターのダウンロードなしで、アクション、RPG、レースなどを楽しめます。',
      schemaName: 'GBA ゲームをオンラインでプレイ',
      breadcrumbName: 'GBA ゲーム',
      heroTitle: 'GBA ゲームをオンラインでプレイ',
      heroDescription: 'ブラウザーで Game Boy Advance のアクション、RPG、レース、アドベンチャーの名作を楽しめます。対応タイトルは専用エミュレーター不要です。',
      ctaLabel: 'GBA ゲームを見る',
      libraryTitle: 'GBA ゲームライブラリ',
      libraryDescription: (total: number) => `POKOPIE に掲載されている GBA ゲーム ${total} 件を閲覧できます。`,
      unavailableMessage: 'GBA ゲームは一時的に利用できません。後でもう一度お試しください。',
      featuredLabel: 'おすすめ GBA ゲーム',
      coverAlt: 'GBA ゲームのカバー',
    },
    n64: {
      title: 'N64 ゲームをオンラインでプレイ | POKOPIE',
      description: 'ブラウザーで N64 ゲームをプレイ。Nintendo 64 のアクション、レース、スポーツ、アドベンチャーを探せます。',
      schemaName: 'N64 ゲームをオンラインでプレイ',
      breadcrumbName: 'N64 ゲーム',
      heroTitle: 'N64 ゲームをオンラインでプレイ',
      heroDescription: 'Nintendo 64 の 3D プラットフォーム、レース、スポーツ、アクションの名作をブラウザーで楽しめます。',
      ctaLabel: 'N64 ゲームを見る',
      libraryTitle: 'N64 ゲームライブラリ',
      libraryDescription: (total: number) => `POKOPIE に掲載されている N64 ゲーム ${total} 件を閲覧できます。`,
      unavailableMessage: 'N64 ゲームは一時的に利用できません。後でもう一度お試しください。',
      featuredLabel: 'おすすめ N64 ゲーム',
      coverAlt: 'N64 ゲームのカバー',
    },
    nes: {
      title: 'NES ゲームをオンラインでプレイ | ダウンロード不要 | POKOPIE',
      description: 'ブラウザーで NES ゲームをプレイ。専用エミュレーターのダウンロードなしで、Nintendo のアクションやパズルを楽しめます。',
      schemaName: 'NES ゲームをオンラインでプレイ',
      breadcrumbName: 'NES ゲーム',
      heroTitle: 'NES ゲームをオンラインでプレイ',
      heroDescription: 'アクション、プラットフォーム、パズル、スポーツの 8 ビット名作をブラウザーで楽しめます。対応タイトルはゲームページから開始できます。',
      ctaLabel: 'NES ゲームを見る',
      libraryTitle: 'NES ゲームライブラリ',
      libraryDescription: (total: number) => `POKOPIE に掲載されている NES ゲーム ${total} 件を閲覧できます。`,
      unavailableMessage: 'NES ゲームは一時的に利用できません。後でもう一度お試しください。',
      featuredLabel: 'おすすめ NES ゲーム',
      coverAlt: 'NES ゲームのカバー',
    },
    segaGenesis: {
      title: 'Sega Genesis ゲームをオンラインでプレイ | POKOPIE',
      description: 'ブラウザーで Sega Genesis ゲームをプレイ。アクション、レース、格闘、スポーツの名作を探せます。',
      schemaName: 'Sega Genesis ゲームをオンラインでプレイ',
      breadcrumbName: 'Sega Genesis ゲーム',
      heroTitle: 'Sega Genesis ゲームをオンラインでプレイ',
      heroDescription: 'Sega Genesis のアクション、プラットフォーム、レース、格闘、スポーツの名作をブラウザーで楽しめます。',
      ctaLabel: 'Sega Genesis ゲームを見る',
      libraryTitle: 'Sega Genesis ゲームライブラリ',
      libraryDescription: (total: number) => `POKOPIE に掲載されている Sega Genesis ゲーム ${total} 件を閲覧できます。`,
      unavailableMessage: 'Sega Genesis ゲームは一時的に利用できません。後でもう一度お試しください。',
      featuredLabel: 'おすすめ Sega Genesis ゲーム',
      coverAlt: 'Sega Genesis ゲームのカバー',
    },
    snes: {
      title: 'SNES ゲームをオンラインでプレイ | ダウンロード不要 | POKOPIE',
      description: 'ブラウザーで SNES ゲームをプレイ。Super Nintendo の RPG、アクション、レース、アドベンチャーを楽しめます。',
      schemaName: 'SNES ゲームをオンラインでプレイ',
      breadcrumbName: 'SNES ゲーム',
      heroTitle: 'SNES ゲームをオンラインでプレイ',
      heroDescription: 'Super Nintendo の 16 ビット RPG、プラットフォーム、レース、アクションの名作をブラウザーで楽しめます。',
      ctaLabel: 'SNES ゲームを見る',
      libraryTitle: 'SNES ゲームライブラリ',
      libraryDescription: (total: number) => `POKOPIE に掲載されている SNES ゲーム ${total} 件を閲覧できます。`,
      unavailableMessage: 'SNES ゲームは一時的に利用できません。後でもう一度お試しください。',
      featuredLabel: 'おすすめ SNES ゲーム',
      coverAlt: 'SNES ゲームのカバー',
    },
  },
} as const

export const platformCollections = {
  gba: {
    routePath: '/en/gba-games',
    platform: 'Game Boy Advance',
    title: 'Play GBA Games Online Free | No Download | POKOPIE',
    description:
      'Play GBA games online in your browser. Browse Game Boy Advance action, RPG, racing, platform, and adventure games with no separate emulator download.',
    schemaName: 'Play GBA Games Online',
    breadcrumbName: 'GBA Games',
    page: {
      routePath: '/en/gba-games',
      heroTitle: 'Play GBA Games Online',
      heroDescription:
        'Play GBA games online in your browser and revisit Game Boy Advance favorites across action, RPG, racing, platform, and adventure genres. Supported titles start without a separate emulator download.',
      ctaLabel: 'Browse GBA Games',
      libraryTitle: 'GBA Game Library',
      libraryDescription: (total) =>
        `Browse ${total} Game Boy Advance games currently listed in the POKOPIE catalog.`,
      unavailableMessage: 'GBA games are temporarily unavailable. Please check back soon.',
      featuredLabel: 'Featured GBA games',
      coverAlt: 'GBA game cover',
      articleTitle: 'Game Boy Advance Classics, Ready in Your Browser',
      articleParagraphs: [
        'The Game Boy Advance library is known for fast action, colorful platformers, deep RPGs, and portable versions of console-style adventures. POKOPIE groups available GBA titles into one browser-friendly collection.',
        'Use this page as a starting point for discovery, then open any title to see its dedicated game page with cover art, platform details, controls guidance, and related games.',
        'For smoother play, use an up-to-date browser and close unnecessary tabs before launching larger games.',
      ],
      benefits: [
        { icon: 'bolt', title: 'No emulator setup', body: 'Open a supported GBA game page and start from the browser.' },
        { icon: 'gamepad', title: 'Portable classics', body: 'Browse handheld favorites with quick access to playable pages.' },
        { icon: 'grid', title: 'Focused platform library', body: 'Find Game Boy Advance games from one internal hub.' },
        { icon: 'monitor', title: 'Modern browser access', body: 'Play on current desktop or mobile browsers when supported.' },
      ],
      genresTitle: 'Popular GBA Genres',
      genres: [
        { name: 'Action', description: 'Fast-paced handheld games', icon: 'swords' },
        { name: 'RPG', description: 'Story and character progression', icon: 'wand' },
        { name: 'Platform', description: 'Jumping and side-scrolling challenges', icon: 'platform' },
        { name: 'Racing', description: 'Portable speed and competition', icon: 'flag' },
        { name: 'Adventure', description: 'Exploration-focused games', icon: 'compass' },
        { name: 'Puzzle', description: 'Quick-thinking challenges', icon: 'puzzle' },
      ],
      faqs: [
        {
          question: 'Can I play GBA games online without downloading an emulator?',
          answer:
            'Yes. Supported GBA games on POKOPIE open from their game page in a modern browser without a separate emulator installation.',
        },
        {
          question: 'Do GBA games work on mobile browsers?',
          answer:
            'Some games work on mobile browsers, while others are better with a keyboard or controller. Check the individual game page for the best experience.',
        },
        {
          question: 'Can I use a controller for GBA games?',
          answer:
            'Controller support depends on the browser player. Connect your controller before launching a game when gamepad input is supported.',
        },
      ],
    },
  },
  n64: {
    routePath: '/en/n64-games',
    platform: 'Nintendo 64',
    title: 'Play N64 Games Online Free | POKOPIE',
    description:
      'Play N64 games online in your browser. Browse Nintendo 64 platform, racing, sports, action, and adventure games from dedicated POKOPIE game pages.',
    schemaName: 'Play N64 Games Online',
    breadcrumbName: 'N64 Games',
    page: {
      routePath: '/en/n64-games',
      heroTitle: 'Play N64 Games Online',
      heroDescription:
        'Play N64 games online and revisit Nintendo 64 classics across platform, racing, sports, action, and adventure genres from browser-friendly game pages.',
      ctaLabel: 'Browse N64 Games',
      libraryTitle: 'N64 Game Library',
      libraryDescription: (total) =>
        `Browse ${total} Nintendo 64 games currently listed in the POKOPIE catalog.`,
      unavailableMessage: 'N64 games are temporarily unavailable. Please check back soon.',
      featuredLabel: 'Featured N64 games',
      coverAlt: 'N64 game cover',
      articleTitle: 'Nintendo 64 Games with Dedicated Browser Pages',
      articleParagraphs: [
        'Nintendo 64 games brought 3D platforming, racing, sports, and adventure games into a new era. POKOPIE gives available N64 titles a focused collection page for discovery.',
        'Each listed game links to its own page with cover art, platform details, controls guidance, related games, and the browser player when available.',
        'Use this hub to move from broad N64 browsing into individual games without relying on homepage search alone.',
      ],
      benefits: [
        { icon: 'compass', title: '3D-era discovery', body: 'Browse Nintendo 64 platformers, adventures, racers, and sports titles.' },
        { icon: 'gamepad', title: 'Game page first', body: 'Open each title through a dedicated page with context and controls.' },
        { icon: 'monitor', title: 'Modern browser access', body: 'Launch supported games from current desktop or mobile browsers.' },
        { icon: 'grid', title: 'Clear internal hub', body: 'Connect N64 searches to a crawlable platform collection.' },
      ],
      genresTitle: 'Popular N64 Genres',
      genres: [
        { name: 'Platform', description: '3D jumping and exploration', icon: 'platform' },
        { name: 'Racing', description: 'Fast multiplayer-style competition', icon: 'flag' },
        { name: 'Sports', description: 'Arcade and simulation sports', icon: 'ball' },
        { name: 'Action', description: 'Console action challenges', icon: 'swords' },
        { name: 'Adventure', description: 'Explore 3D worlds', icon: 'compass' },
        { name: 'Puzzle', description: 'Retro logic challenges', icon: 'puzzle' },
      ],
      faqs: [
        {
          question: 'Can I play N64 games online on POKOPIE?',
          answer:
            'Supported Nintendo 64 games listed on POKOPIE open from their game pages in a modern browser. Availability can vary by title and device.',
        },
        {
          question: 'Do N64 games need a separate emulator download?',
          answer:
            'No separate emulator download is required for supported titles. Open the game page and use the browser player when available.',
        },
        {
          question: 'Are N64 games better with a controller?',
          answer:
            'Many N64 games are easier with a connected controller, though keyboard support depends on the browser player.',
        },
      ],
    },
  },
  nes: {
    routePath: '/en/nes-games',
    platform: 'Famicom',
    title: 'Play NES Games Online Free | No Download | POKOPIE',
    description:
      'Play NES games online in your browser. Browse classic Nintendo action, platform, puzzle, sports, and adventure games with no separate emulator download.',
    schemaName: 'Play NES Games Online',
    breadcrumbName: 'NES Games',
    page: {
      routePath: '/en/nes-games',
      heroTitle: 'Play NES Games Online',
      heroDescription:
        'Play NES games online and revisit the 8-bit classics that shaped action, platform, puzzle, sports, and adventure games. Supported titles launch directly from their game page.',
      ctaLabel: 'Browse NES Games',
      libraryTitle: 'NES Game Library',
      libraryDescription: (total) =>
        `Browse ${total} NES games currently listed in the POKOPIE catalog.`,
      unavailableMessage: 'NES games are temporarily unavailable. Please check back soon.',
      featuredLabel: 'Featured NES games',
      coverAlt: 'NES game cover',
      articleTitle: '8-Bit NES Games Built for Quick Browser Play',
      articleParagraphs: [
        'NES games are compact, readable, and easy to start, which makes them a strong fit for browser play. POKOPIE organizes available NES titles into one collection page for discovery.',
        'Each game links to a dedicated page with the playable browser view, platform details, controls guidance, and related titles.',
        'Use the library grid to jump from famous classics to lesser-known games across action, platforming, puzzles, and sports.',
      ],
      benefits: [
        { icon: 'bolt', title: 'Quick starts', body: 'Open a supported NES title and start from the browser.' },
        { icon: 'platform', title: 'Classic platforming', body: 'Find side-scrollers and action games from the 8-bit era.' },
        { icon: 'puzzle', title: 'Simple replay value', body: 'Discover short-session puzzle and arcade-style titles.' },
        { icon: 'monitor', title: 'No desktop setup', body: 'Avoid manual emulator configuration for supported games.' },
      ],
      genresTitle: 'Popular NES Genres',
      genres: [
        { name: 'Platform', description: 'Jump, run, and clear stages', icon: 'platform' },
        { name: 'Action', description: 'Classic 8-bit challenges', icon: 'swords' },
        { name: 'Puzzle', description: 'Simple rules and replay value', icon: 'puzzle' },
        { name: 'Adventure', description: 'Explore classic quests', icon: 'compass' },
        { name: 'Sports', description: 'Fast retro competition', icon: 'ball' },
        { name: 'Racing', description: 'Old-school speed', icon: 'flag' },
      ],
      faqs: [
        {
          question: 'Can I play NES games online for free?',
          answer:
            'Supported NES games listed on POKOPIE can be opened from their game pages in a browser. Availability can vary by title.',
        },
        {
          question: 'Do I need to download anything for NES games?',
          answer:
            'No separate emulator download is required for supported titles. Open the game page and use the browser player.',
        },
        {
          question: 'What controls do NES games use?',
          answer:
            'Controls depend on the browser player. Most games support keyboard input, and some may support a connected controller.',
        },
      ],
    },
  },
  segaGenesis: {
    routePath: '/en/sega-genesis-games',
    platform: 'Genesis',
    title: 'Play Sega Genesis Games Online Free | POKOPIE',
    description:
      'Play Sega Genesis games online in your browser. Browse classic action, platform, racing, fighting, and sports games with no separate emulator download.',
    schemaName: 'Play Sega Genesis Games Online',
    breadcrumbName: 'Sega Genesis Games',
    page: {
      routePath: '/en/sega-genesis-games',
      heroTitle: 'Play Sega Genesis Games Online',
      heroDescription:
        'Play Sega Genesis games online and revisit fast action, platform, racing, fighting, and sports classics directly from your browser.',
      ctaLabel: 'Browse Sega Genesis Games',
      libraryTitle: 'Sega Genesis Game Library',
      libraryDescription: (total) =>
        `Browse ${total} Sega Genesis games currently listed in the POKOPIE catalog.`,
      unavailableMessage: 'Sega Genesis games are temporarily unavailable. Please check back soon.',
      featuredLabel: 'Featured Sega Genesis games',
      coverAlt: 'Sega Genesis game cover',
      articleTitle: '16-Bit Sega Genesis Games in One Browser Collection',
      articleParagraphs: [
        'Sega Genesis games are remembered for speed, arcade energy, sports competition, and strong action series. This collection gives those titles a dedicated internal hub on POKOPIE.',
        'Open a title to reach its game page, where the browser player, platform details, controls, and related games are grouped together.',
        'Use this page to move from broad platform discovery to specific games without relying on homepage filters alone.',
      ],
      benefits: [
        { icon: 'bolt', title: 'Fast browser access', body: 'Launch supported Genesis titles from dedicated game pages.' },
        { icon: 'swords', title: 'Action-heavy library', body: 'Find platformers, fighters, and arcade-style games.' },
        { icon: 'flag', title: 'Racing and sports', body: 'Explore competitive 16-bit classics.' },
        { icon: 'grid', title: 'Dedicated platform hub', body: 'Give Sega Genesis games a crawlable internal landing page.' },
      ],
      genresTitle: 'Popular Sega Genesis Genres',
      genres: [
        { name: 'Action', description: 'Fast 16-bit games', icon: 'swords' },
        { name: 'Platform', description: 'Run, jump, and collect', icon: 'platform' },
        { name: 'Racing', description: 'Speed-focused games', icon: 'flag' },
        { name: 'Fighting', description: 'Arcade-style battles', icon: 'boxing' },
        { name: 'Sports', description: 'Competitive retro sports', icon: 'ball' },
        { name: 'Adventure', description: 'Explore classic worlds', icon: 'compass' },
      ],
      faqs: [
        {
          question: 'Can I play Sega Genesis games online without setup?',
          answer:
            'Supported Sega Genesis games on POKOPIE open from their game pages in a modern browser without manual emulator setup.',
        },
        {
          question: 'Which Sega Genesis games are listed here?',
          answer:
            'This collection shows Sega Genesis titles currently available in the POKOPIE catalog. The list can change as the catalog updates.',
        },
        {
          question: 'Do Sega Genesis games support controllers?',
          answer:
            'Controller support depends on the browser player and device. Connect a gamepad before launching when supported.',
        },
      ],
    },
  },
  snes: {
    routePath: '/en/snes-games',
    platform: 'Super Famicom',
    title: 'Play SNES Games Online Free | No Download | POKOPIE',
    description:
      'Play SNES games online in your browser. Browse Super Nintendo RPG, platform, racing, action, and adventure classics with no separate emulator download.',
    schemaName: 'Play SNES Games Online',
    breadcrumbName: 'SNES Games',
    page: {
      routePath: '/en/snes-games',
      heroTitle: 'Play SNES Games Online',
      heroDescription:
        'Play SNES games online and revisit 16-bit Super Nintendo RPGs, platformers, racers, action games, and adventures directly from your browser.',
      ctaLabel: 'Browse SNES Games',
      libraryTitle: 'SNES Game Library',
      libraryDescription: (total) =>
        `Browse ${total} SNES games currently listed in the POKOPIE catalog.`,
      unavailableMessage: 'SNES games are temporarily unavailable. Please check back soon.',
      featuredLabel: 'Featured SNES games',
      coverAlt: 'SNES game cover',
      articleTitle: 'Super Nintendo Classics with Dedicated Game Pages',
      articleParagraphs: [
        'The SNES library is known for polished platformers, deep RPGs, memorable adventures, and strong arcade-style action. POKOPIE turns available SNES games into a crawlable platform hub.',
        'Instead of embedding games on the homepage, each title opens on its own page with context, controls, related titles, and share options.',
        'This structure helps players keep browsing while giving search engines clearer platform and game relationships.',
      ],
      benefits: [
        { icon: 'wand', title: 'RPG and adventure classics', body: 'Browse story-driven 16-bit games from one hub.' },
        { icon: 'platform', title: 'Platform game discovery', body: 'Find side-scrollers and action platformers quickly.' },
        { icon: 'monitor', title: 'Browser-first access', body: 'Use supported game pages without installing a separate emulator.' },
        { icon: 'grid', title: 'Better internal linking', body: 'Connect the homepage, platform page, and game detail pages.' },
      ],
      genresTitle: 'Popular SNES Genres',
      genres: [
        { name: 'RPG', description: 'Classic 16-bit role-playing games', icon: 'wand' },
        { name: 'Platform', description: 'Polished side-scrolling games', icon: 'platform' },
        { name: 'Action', description: 'Fast console action', icon: 'swords' },
        { name: 'Adventure', description: 'Explore memorable worlds', icon: 'compass' },
        { name: 'Racing', description: '16-bit competition', icon: 'flag' },
        { name: 'Puzzle', description: 'Smart retro challenges', icon: 'puzzle' },
      ],
      faqs: [
        {
          question: 'Can I play SNES games online without downloading anything?',
          answer:
            'Yes. Supported SNES games open from their POKOPIE game pages in a modern browser without a separate emulator download.',
        },
        {
          question: 'Are SNES games better on desktop or mobile?',
          answer:
            'Many games work best with a keyboard or controller on desktop, though some may also work on mobile browsers.',
        },
        {
          question: 'How do I find similar SNES games?',
          answer:
            'Open a game detail page and use the related games, platform, and genre information to continue browsing.',
        },
      ],
    },
  },
} satisfies Record<PlatformCollectionKey, PlatformCollectionConfig>

export function getLocalizedPlatformCollection(
  key: PlatformCollectionKey,
  locale: Locale,
): PlatformCollectionConfig {
  const collection = platformCollections[key]

  if (locale === 'en') {
    return collection
  }

  const copy = localizedPlatformCopy[locale][key]
  const routePath = `/${locale}/${localizedPlatformSlugs[key]}`

  return {
    ...collection,
    breadcrumbName: copy.breadcrumbName,
    description: copy.description,
    routePath,
    schemaName: copy.schemaName,
    title: copy.title,
    page: {
      ...collection.page,
      ...copy,
      routePath,
    },
  }
}

export function PlatformGamesPage({
  collection,
  games,
  locale = 'en',
  total,
}: {
  collection: PlatformCollectionConfig
  games: Array<PublicGame>
  locale?: Locale
  total: number
}) {
  const relatedGuide = getRelatedGuide(collection.platform)

  return (
    <GameCollectionPage
      config={{ ...collection.page, relatedGuide }}
      games={games}
      locale={locale}
      total={total}
    />
  )
}

export function getRelatedGuide(platform: string) {
  if (platform === 'Famicom' || platform === 'Super Famicom') {
    return {
      href: '/en/guides/nes-vs-snes-games',
      label: 'Read: NES vs SNES Games',
      description: 'Compare controller layouts, game design, and which library fits the kind of session you want.',
    }
  }

  if (platform === 'Game Boy Advance') {
    return {
      href: '/en/guides/retro-platform-comparison',
      label: 'Read: Retro Platform Comparison',
      description: 'See how GBA sessions and controls compare with home-console classics.',
    }
  }

  if (platform === 'Nintendo 64') {
    return {
      href: '/en/guides/retro-game-controller-guide',
      label: 'Read: Retro Game Controller Guide',
      description: 'Learn why a gamepad and analog controls matter for many Nintendo 64 titles.',
    }
  }

  if (platform === 'Genesis') {
    return {
      href: '/en/guides/browser-retro-gaming-guide',
      label: 'Read: Browser Retro Gaming Guide',
      description: 'Get practical browser, keyboard, and gamepad setup advice before starting a classic session.',
    }
  }

  return undefined
}
