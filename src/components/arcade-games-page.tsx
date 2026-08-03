import {
  GameCollectionPage,
  type GameCollectionPageConfig,
} from '#/components/game-collection-page'
import type { PublicGame } from '#/lib/ggemu'

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

const arcadePageConfig: GameCollectionPageConfig = {
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

export function ArcadeGamesPage({ games, total }: { games: Array<PublicGame>; total: number }) {
  return <GameCollectionPage config={arcadePageConfig} games={games} total={total} />
}
