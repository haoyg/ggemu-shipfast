import type { Locale, PublicGame } from '#/lib/ggemu'

const contraTargetSlug = 'contra-nes-1988'
const geometryDashAdvanceTargetSlug = 'geometry-dash-advance-gba-2025'
const murdokuTargetSlug = 'murdoku-html5-2026'
const onetMasterTargetSlug = 'onet-master-html5'
const shonenJumpOnePieceTargetSlug = 'shonen-jump-s-one-piece-gba-2005'
const taikoWebTargetSlug = 'taiko-no-tatsujin-taiko-web-html5-2011'

const targetedGameSeoBySlug = {
  'three-wonders-arcade-1991': {
    heading: 'Play Three Wonders Online',
    title: 'Three Wonders Online - Midnight Wanderers & More | POKOPIE',
    description: 'Explore Three Wonders in your browser: Midnight Wanderers, Chariot and Don’t Pull. Read the arcade controls and choose an action, shooter or puzzle game.',
    keywords: 'Three Wonders online, Midnight Wanderers online, Chariot arcade, Don’t Pull puzzle, Capcom arcade',
  },
  'pipi-and-bibis-other-1991': {
    heading: 'Play Pipi and Bibis Online',
    title: 'Pipi and Bibis Online - Whoopee!! Arcade Game | POKOPIE',
    description: 'Play Pipi and Bibis, also known as Whoopee!!, in your browser. Learn the bomb-planting objective, Shredder Beam controls and escape strategy.',
    keywords: 'Pipi and Bibis online, Pipi & Bibi’s, Whoopee arcade, Toaplan arcade game',
  },
  [contraTargetSlug]: {
    heading: 'Play Contra Game Online Free',
    title: 'Play Contra Game Online Free | NES Classic | POKOPIE',
    description:
      'Play Contra game online free in your browser. Start the classic NES run-and-gun game with keyboard or controller support and no separate emulator download.',
    keywords:
      'play contra game online free, Contra online, play Contra online, Contra NES game, free browser games',
  },
  [geometryDashAdvanceTargetSlug]: {
    heading: 'Play Geometry Dash Advance Online',
    title: 'Geometry Dash Advance - Play the GBA Demake Online | POKOPIE',
    description:
      'Play Geometry Dash Advance online in your browser. Explore AleFunky’s GBA demake, read the control and practice-mode guide, and learn how it differs from the mobile game.',
    keywords:
      'Geometry Dash Advance, Geometry Dash Advance online, play Geometry Dash Advance, GBA demake, rhythm platform game',
  },
  [murdokuTargetSlug]: {
    heading: 'Play Murdoku Online Free',
    title: 'Murdoku Online - Play Free Murder Mystery Sudoku | POKOPIE',
    description:
      'Play Murdoku online free in your browser. Place suspects at the crime scene, solve the Sudoku-style murder mystery, and reveal the killer. No download.',
    keywords:
      'murdoku online, play Murdoku online, Murdoku game, murder mystery Sudoku, free browser puzzle game',
  },
  [onetMasterTargetSlug]: {
    heading: 'Play Onet Master Online Free',
    title: 'Onet Master Online - Play Free Tile Matching Game | POKOPIE',
    description:
      'Play Onet Master online free in your browser. Match identical tiles, connect pairs with up to two turns, and clear the board. No download required.',
    keywords:
      'Onet Master, Onet Master online, play Onet Master, tile matching game, pair connect puzzle',
  },
  [shonenJumpOnePieceTargetSlug]: {
    heading: "Play Shonen Jump's One Piece Online",
    title: 'Play One Piece Online - Shonen Jump GBA Game | POKOPIE',
    description:
      "Play Shonen Jump's One Piece online in your browser. Guide Luffy through the 2005 GBA action game with keyboard or controller support and no download.",
    keywords:
      "play One Piece online, Shonen Jump's One Piece, One Piece GBA game, Luffy game online, anime action game",
  },
  [taikoWebTargetSlug]: {
    heading: 'Play Taiko Web Online',
    title: 'Taiko Web - Play Taiko no Tatsujin Online | POKOPIE',
    description:
      'Play Taiko Web online free in your browser. Hit red and blue drum notes to the beat, choose songs and difficulties, and check the keyboard controls before starting.',
    keywords:
      'Taiko Web, Taiko Web online, play Taiko Web, Taiko no Tatsujin online, browser rhythm game',
  },
} as const

export function getTargetedGameSeo(game: PublicGame, locale: Locale) {
  if (locale !== 'en') {
    return null
  }

  const slug = normalizeGameSlug(game)
  return targetedGameSeoBySlug[slug as keyof typeof targetedGameSeoBySlug] ?? null
}

export function isContraSeoTarget(game: PublicGame, locale: Locale) {
  return locale === 'en' && normalizeGameSlug(game) === contraTargetSlug
}

function normalizeGameSlug(game: PublicGame) {
  return game.url_slug?.trim().toLowerCase() ?? ''
}
