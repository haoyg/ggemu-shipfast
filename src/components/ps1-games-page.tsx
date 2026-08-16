import {
  GameCollectionPage,
  type GameCollectionPageConfig,
} from '#/components/game-collection-page'
import type { PublicGame } from '#/lib/ggemu'

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

const ps1PageConfig: GameCollectionPageConfig = {
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

export function Ps1GamesPage({ games, total }: { games: Array<PublicGame>; total: number }) {
  return <GameCollectionPage config={ps1PageConfig} games={games} total={total} />
}
