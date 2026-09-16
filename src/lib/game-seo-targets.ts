import type { Locale, PublicGame } from '#/lib/ggemu'

const contraTargetSlug = 'contra-nes-1988'
const geometryDashAdvanceTargetSlug = 'geometry-dash-advance-gba-2025'
const murdokuTargetSlug = 'murdoku-html5-2026'
const onetMasterTargetSlug = 'onet-master-html5'
const pokemonEmeraldTargetSlug = 'pokemon-emerald-gba-2004'
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
    title: 'Play Murdoku Online Free — Murder Mystery Sudoku',
    description:
      'Play Murdoku online free in your browser. Place suspects at the crime scene, solve the Sudoku-style murder mystery, and reveal the killer. No download.',
    keywords:
      'murdoku online, play Murdoku online, Murdoku game, murder mystery Sudoku, free browser puzzle game',
  },
  [onetMasterTargetSlug]: {
    heading: 'Play Onet Master Online Free',
    title: 'Play Onet Master Online Free — Tile Matching Puzzle',
    description:
      'Play Onet Master online free in your browser. Match identical tiles, connect pairs with up to two turns, and clear the board. No download required.',
    keywords:
      'Onet Master, Onet Master online, play Onet Master, tile matching game, pair connect puzzle',
  },
  [pokemonEmeraldTargetSlug]: {
    heading: 'Play Pokémon Emerald Online – Game Boy Advance',
    title: 'Play Pokémon Emerald Online | GBA | POKOPIE',
    description:
      'Play Pokémon Emerald online in your browser. Explore Hoenn, challenge its Gym Leaders, encounter legendary Pokémon, and reach the Battle Frontier.',
    keywords:
      'Pokemon Emerald online, play Pokémon Emerald, Pokémon Emerald GBA, Hoenn game, Battle Frontier',
  },
  'pokemon-ruby-gba-2002': {
    heading: 'Play Pokémon Ruby Online',
    title: 'Play Pokémon Ruby Online | GBA Adventure | POKOPIE',
    description:
      'Play Pokémon Ruby online in your browser. Explore Hoenn, choose Treecko, Torchic or Mudkip, earn Gym Badges and challenge Team Magma.',
    keywords:
      'Pokémon Ruby online, play Pokémon Ruby, Pokémon Ruby GBA, Hoenn Pokémon game, Team Magma',
  },
  'pokemon-leafgreen-game-boy-advance-2004': {
    heading: 'Play Pokémon LeafGreen Online',
    title: 'Play Pokémon LeafGreen Online | GBA Kanto Adventure',
    description:
      'Play Pokémon LeafGreen online in your browser. Explore Kanto, collect Gym Badges, complete the Pokédex and confront Team Rocket.',
    keywords:
      'Pokémon LeafGreen online, play Pokémon LeafGreen, Pokémon LeafGreen GBA, Kanto Pokémon game',
  },
  'fire-emblem-the-blazing-blade-gba-2003': {
    heading: 'Play Fire Emblem: The Blazing Blade Online',
    title: 'Fire Emblem: The Blazing Blade Online | GBA | POKOPIE',
    description:
      'Play Fire Emblem: The Blazing Blade online. Lead Lyn, Eliwood and Hector through tactical GBA battles across the continent of Elibe.',
    keywords:
      'Fire Emblem The Blazing Blade online, play Fire Emblem GBA, Lyn Eliwood Hector, tactical RPG',
  },
  'professor-layton-and-the-curious-village-nds-2007': {
    heading: 'Play Professor Layton and the Curious Village Online',
    title: 'Professor Layton and the Curious Village Online | POKOPIE',
    description:
      'Play Professor Layton and the Curious Village online. Explore St. Mystere, solve logic puzzles and investigate the mystery of the Golden Apple.',
    keywords:
      'Professor Layton and the Curious Village online, play Professor Layton online, St Mystere puzzles, Golden Apple',
  },
  'theme-hospital-dos-1997': {
    heading: 'Play Theme Hospital Online',
    title: 'Play Theme Hospital Online | DOS Management Game',
    description:
      'Play Theme Hospital online in your browser. Build treatment rooms, hire staff, manage queues and run Bullfrog’s classic hospital simulation.',
    keywords:
      'Theme Hospital online, play Theme Hospital, Theme Hospital DOS, Bullfrog hospital game, management simulation',
  },
  'pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005': {
    heading: 'Play Pokémon Mystery Dungeon: Red Rescue Team Online',
    title: 'Pokémon Mystery Dungeon: Red Rescue Team Online | GBA',
    description:
      'Play Pokémon Mystery Dungeon: Red Rescue Team online. Form a rescue team, accept jobs and explore turn-based dungeons on Game Boy Advance.',
    keywords:
      'Pokémon Mystery Dungeon Red Rescue Team online, play Red Rescue Team, Pokémon Mystery Dungeon GBA, rescue team game',
  },
  'jin-yong-qun-xia-zhuan-dos-1996': {
    heading: 'Play Heroes of Jin Yong Online',
    title: 'Play Heroes of Jin Yong Online | DOS Wuxia RPG',
    description:
      'Play Heroes of Jin Yong online in your browser. Explore its open-ended wuxia world, recruit companions and search for fourteen legendary books.',
    keywords:
      'Heroes of Jin Yong online, play Heroes of Jin Yong, Jin Yong DOS game, wuxia RPG, 金庸群侠传',
  },
  'xuan-yuan-sword-dos-1990': {
    heading: 'Play Xuan-Yuan Sword Online',
    title: 'Play Xuan-Yuan Sword Online | 1990 DOS RPG',
    description:
      'Play the original Xuan-Yuan Sword online. Explore Softstar and DOMO Studio’s 1990 DOS RPG inspired by Chinese mythology and fantasy.',
    keywords:
      'Xuan-Yuan Sword online, play Xuan-Yuan Sword, Xuan-Yuan Sword DOS, Softstar RPG, Chinese mythology game',
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
