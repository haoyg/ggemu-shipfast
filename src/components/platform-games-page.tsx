import {
  GameCollectionPage,
  type GameCollectionPageConfig,
} from '#/components/game-collection-page'
import type { PublicGame } from '#/lib/ggemu'

export type PlatformCollectionKey =
  | 'gba'
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
  nes: {
    routePath: '/en/nes-games',
    platform: 'NES',
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
    platform: 'Sega Genesis',
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
    platform: 'SNES',
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

export function PlatformGamesPage({
  collection,
  games,
  total,
}: {
  collection: PlatformCollectionConfig
  games: Array<PublicGame>
  total: number
}) {
  return <GameCollectionPage config={collection.page} games={games} total={total} />
}
