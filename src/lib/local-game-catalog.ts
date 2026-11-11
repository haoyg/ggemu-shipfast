import type {
  FilterOption,
  GameFilterOptions,
  GameSearchSort,
  PublicGame,
  RelatedGamesData,
} from '#/lib/ggemu'

type LocalGameSearchOptions = {
  category?: string
  limit: number
  page: number
  platform?: string
  query?: string
  sort?: GameSearchSort
}

const platformAliases: ReadonlyArray<ReadonlySet<string>> = [
  new Set(['famicom', 'nes', 'nintendoentertainmentsystem']),
  new Set(['snes', 'superfamicom', 'supernintendo', 'supernintendoentertainmentsystem']),
  new Set(['gba', 'gameboyadvance']),
  new Set(['n64', 'nintendo64']),
  new Set(['ps1', 'playstation', 'playstation1']),
  new Set(['nds', 'nintendods']),
  new Set(['html5', 'browser']),
  new Set(['dos', 'msdos']),
  new Set(['arcade']),
]

const localGames = [
  {
    url_slug: 'contra-nes-1988',
    name: 'Contra',
    description: 'Contra is Konami’s 1988 run-and-gun game for the Nintendo Entertainment System. Fight through side-scrolling stages, use weapon upgrades and coordinate with a second player.',
    how_to_play: 'Move, jump and fire while watching enemy patterns. Open the browser player controls before starting to confirm the mapped direction, attack, jump, Start and Select keys.',
    developer: 'Konami',
    released_year: '1988',
    keywords: 'Contra, Contra online, NES Contra, run and gun game',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Action', 'Shooter', 'Run and Gun'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/blog-art/contra-games-guide.jpg',
  },
  {
    url_slug: 'geometry-dash-advance-gba-2025',
    name: 'Geometry Dash Advance',
    description: 'Geometry Dash Advance is AleFunky’s community-made rhythm platformer for Game Boy Advance. Time jumps to the music, learn each obstacle sequence and use practice features when available.',
    how_to_play: 'Check the browser player mapping, focus the game, then use the mapped action button to jump. Short taps and deliberate practice are more reliable than reacting at the last moment.',
    developer: 'AleFunky',
    released_year: '2025',
    keywords: 'Geometry Dash Advance, GBA rhythm game, Geometry Dash GBA',
    platform: 'Game Boy Advance',
    platform_slug: 'gba',
    categories: ['Action', 'Rhythm', 'Platform'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/blog-art/geometry-dash-advance-guide.jpg',
  },
  {
    url_slug: 'gals-panic-arcade',
    name: 'Gals Panic',
    description: 'Gals Panic is Kaneko’s 1990 arcade area-capture game. Draw lines from a safe boundary, reconnect them to enclose sections of the playfield and avoid enemies while the line is exposed.',
    how_to_play: 'Identify the direction, Draw, credit and Start controls. Leave a boundary, trace a short route through open space and reconnect it to capture an area. The original game contains adult imagery.',
    developer: 'Kaneko',
    released_year: '1990',
    keywords: 'Gals Panic, Gals Panic arcade, area capture game',
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Action', 'Puzzle'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'commandos-dos-1998',
    name: 'Commandos: Behind Enemy Lines',
    description: 'Commandos: Behind Enemy Lines is Pyro Studios’ 1998 real-time tactics game. Coordinate specialists, observe patrol routes and complete stealth, sabotage and rescue objectives.',
    how_to_play: 'Check the browser controls for selection, movement, actions and pause. Study guard routes before moving, then combine each commando’s specialist abilities instead of starting a direct firefight.',
    developer: 'Pyro Studios',
    released_year: '1998',
    keywords: 'Commandos Behind Enemy Lines, play Commandos online, DOS tactics game',
    platform: 'DOS',
    platform_slug: 'dos',
    categories: ['Strategy', 'Real-time Tactics'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'paperboy-n64-1999',
    name: 'Paperboy',
    description: 'Paperboy for Nintendo 64 turns a newspaper route into an arcade challenge. Deliver papers to subscribers, avoid neighborhood hazards and finish each route with customers intact.',
    how_to_play: 'Confirm the mapped steering, acceleration, braking and throw controls. Look ahead for subscribers, line up each delivery early and favor a safe route over optional score targets.',
    developer: 'High Voltage Software',
    released_year: '1999',
    keywords: 'Paperboy online, play Paperboy online, Paperboy N64',
    platform: 'Nintendo 64',
    platform_slug: 'n64',
    categories: ['Action', 'Arcade'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'donkey-kong-nes-1983',
    name: 'Donkey Kong',
    description: 'Donkey Kong for NES is Nintendo’s home-console adaptation of the arcade climbing game. Guide Mario across platforms and ladders, avoid rolling hazards and reach the top.',
    how_to_play: 'Check movement, jump, Start and Select in the browser controls. Watch a barrel’s path before crossing a ladder and use deliberate jumps instead of rushing into a moving hazard.',
    developer: 'Nintendo',
    released_year: '1983',
    keywords: 'Donkey Kong play online, Donkey Kong NES, Donkey Kong online',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Platform', 'Arcade'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'tekken-ps1-1995',
    name: 'Tekken',
    description: 'Tekken is Namco’s 1995 PlayStation version of its early 3D fighting game. Learn the four-limb attack layout, block consistently and test movement before attempting longer combinations.',
    how_to_play: 'Open the player controls and map left punch, right punch, left kick and right kick. Focus the player, confirm Start works and practice one short attack sequence at a time.',
    developer: 'Namco',
    released_year: '1995',
    keywords: 'Tekken online, unblocked Tekken, Tekken PS1',
    platform: 'PlayStation',
    platform_slug: 'ps1',
    categories: ['Fighting'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'pok-mon-heartgold-version-nds-2009',
    name: 'Pokémon HeartGold Version',
    description: 'Pokémon HeartGold Version is a 2009 Nintendo DS adventure through the Johto region. Build a balanced party, challenge Gym Leaders and work toward completing the regional Pokédex.',
    how_to_play: 'Confirm the directional, A, B, Start, Select and touch-screen mappings. Save through the game menu and test browser storage before a long session. Original Pokéwalker and network features are not expected to work.',
    developer: 'Game Freak',
    released_year: '2009',
    keywords: 'Pokemon HeartGold online, play HeartGold online, Pokemon HeartGold browser',
    platform: 'Nintendo DS',
    platform_slug: 'nds',
    categories: ['Role-playing', 'Adventure'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'super-mario-bros-the-lost-levels-enhanced-snes-1993',
    name: 'Super Mario Bros.: The Lost Levels Enhanced',
    description: 'Super Mario Bros.: The Lost Levels is Nintendo’s difficult follow-up to the original Super Mario Bros. This catalog entry is labeled as an enhanced 1993 SNES edition.',
    how_to_play: 'Check movement, jump, run, Start and pause in the player controls. Use short taps near narrow platforms, watch for hidden blocks and identify unfamiliar mushrooms before collecting them.',
    developer: 'Nintendo',
    released_year: '1993',
    keywords: 'Super Mario Lost Levels online, Lost Levels SNES, play Lost Levels',
    platform: 'Super Nintendo Entertainment System',
    platform_slug: 'snes',
    categories: ['Platform'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'murdoku-html5-2026',
    name: 'Murdoku',
    description: 'Murdoku is a deduction puzzle by Manuel Garand. Use the clues to place people in a crime scene, then identify the person who was alone with the victim.',
    how_to_play: 'Read every clue and the scene legend, place each person in a unique row and column, and eliminate impossible squares. Finish the arrangement before identifying the killer.',
    developer: 'Manuel Garand',
    released_year: '2026',
    keywords: 'Murdoku, Murdoku puzzle, deduction puzzle online',
    platform: 'HTML5',
    platform_slug: 'html5',
    categories: ['Puzzle', 'Logic'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 1,
    downloadable: 0,
  },
  {
    url_slug: 'three-wonders-arcade-1991',
    name: 'Three Wonders',
    description: 'Three Wonders is Capcom’s 1991 arcade collection containing Midnight Wanderers, Chariot and Don’t Pull. Choose between platform action, a scrolling shooter and a block-pushing puzzle.',
    how_to_play: 'Add a credit, press Start and choose one of the three games. Check the current arcade mappings because movement and action buttons serve different roles in each game.',
    developer: 'Capcom',
    released_year: '1991',
    keywords: 'Three Wonders online, Midnight Wanderers online, Chariot arcade, Don’t Pull puzzle',
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Action', 'Shooter', 'Puzzle'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/three-wonders.svg',
  },
  {
    url_slug: 'pipi-and-bibis-other-1991',
    name: 'Pipi & Bibi’s',
    description: 'Pipi & Bibi’s, also known as Whoopee!!, is Toaplan’s arcade action game about planting bombs and escaping each building safely. The original includes adult-themed bonus imagery.',
    how_to_play: 'Check movement, attack, credit and Start mappings. Plan an escape route before placing the final bomb, use the Shredder Beam to create space and keep clear of the blast.',
    developer: 'Toaplan',
    released_year: '1992',
    keywords: 'Pipi and Bibis online, Pipi & Bibi’s, Whoopee arcade, Toaplan arcade game',
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Action', 'Arcade'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/pipi-and-bibis.svg',
  },
  {
    url_slug: 'the-king-of-fighters-97-arcade-1997',
    name: "The King of Fighters '97",
    description: "The King of Fighters '97 is SNK’s 1997 team fighting game and the conclusion of the Orochi Saga. Build a three-fighter team and choose the Advanced or Extra battle system.",
    how_to_play: 'Map movement, four attacks, credit and Start before playing. Keep one team order while learning, practice blocking and simple attacks, then add special moves.',
    developer: 'SNK',
    released_year: '1997',
    keywords: "The King of Fighters 97 online, play KOF 97, KOF 97 arcade, SNK fighting game",
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Fighting', 'Action'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/kof-97.svg',
  },
  {
    url_slug: 'super-mario-bros-nes-1985',
    name: 'Super Mario Bros.',
    description: 'Super Mario Bros. is Nintendo’s 1985 NES platform game. Guide Mario or Luigi through the Mushroom Kingdom, avoid enemies, find power-ups and reach each stage flag.',
    how_to_play: 'Confirm movement, jump, run, Start and Select in the player controls. Hold run for longer jumps, use momentum carefully and test the current save-state support before a long session.',
    developer: 'Nintendo',
    released_year: '1985',
    keywords: 'Super Mario Bros online, play Super Mario Bros, Mario NES game, Super Mario online',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Platform', 'Action'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/super-mario-bros.svg',
  },
  {
    url_slug: 'battle-city-nes-1985',
    name: 'Battle City',
    description: 'Battle City is Namco’s 1985 NES tank action game. Defend the eagle base, clear enemy waves, collect power-ups and use the destructible battlefield to control each approach.',
    how_to_play: 'Check movement, fire, Start and Select before beginning. Protect the base opening, avoid destroying useful cover and coordinate lanes when a second local player joins.',
    developer: 'Namco',
    released_year: '1985',
    keywords: 'Battle City online, play Battle City, Tank 1990 online, NES tank game',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Action', 'Shooter'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/battle-city.svg',
  },
] satisfies Array<PublicGame>

const gameBySlug = new Map(
  localGames.map((game) => [game.url_slug, game] as const),
)

function cloneGame(game: PublicGame): PublicGame {
  return {
    ...game,
    categories: game.categories ? [...game.categories] : undefined,
    languages: game.languages ? [...game.languages] : undefined,
  }
}

export function getLocalGame(id: string) {
  const game = gameBySlug.get(id.trim().toLowerCase())

  return game ? cloneGame(game) : undefined
}

export function getLocalGames() {
  return localGames.map(cloneGame)
}

export function searchLocalGames({
  category = '',
  limit,
  page,
  platform = '',
  query = '',
  sort = 'popular',
}: LocalGameSearchOptions) {
  const queryTerms = normalizeSearchText(query).split(' ').filter(Boolean)
  const normalizedCategory = normalizeSearchText(category)
  const filteredGames = localGames.filter((game) => {
    if (platform && !matchesPlatform(game, platform)) return false
    if (normalizedCategory && !(game.categories ?? []).some((value) => normalizeSearchText(value) === normalizedCategory)) return false

    if (queryTerms.length > 0) {
      const searchableText = normalizeSearchText([
        game.name,
        game.description,
        game.developer,
        game.keywords,
        game.platform,
        ...(game.categories ?? []),
      ].filter(Boolean).join(' '))

      if (!queryTerms.every((term) => searchableText.includes(term))) return false
    }

    return true
  })

  const sortedGames = [...filteredGames].sort(getLocalGameComparator(sort))
  const start = (page - 1) * limit

  return {
    games: sortedGames.slice(start, start + limit).map(cloneGame),
    pagination: {
      limit,
      page,
      pages: Math.ceil(sortedGames.length / limit),
      total: sortedGames.length,
    },
  }
}

export function getLocalGameFilterOptions(): GameFilterOptions {
  return {
    platforms: countFilterOptions(localGames.map((game) => game.platform).filter(Boolean)),
    categories: countFilterOptions(localGames.flatMap((game) => game.categories ?? [])),
  }
}

export function getLocalRelatedGames(currentId: string): RelatedGamesData | undefined {
  const current = gameBySlug.get(currentId.trim().toLowerCase())

  if (!current) return undefined

  const currentCategories = new Set(current.categories ?? [])
  const scoredGames = localGames
    .filter((game) => game.url_slug !== current.url_slug)
    .map((game) => ({
      game,
      score:
        (game.platform_slug === current.platform_slug ? 4 : 0)
        + (game.categories ?? []).filter((category) => currentCategories.has(category)).length * 2
        + (game.developer === current.developer ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || (left.game.name ?? '').localeCompare(right.game.name ?? ''))
    .slice(0, 6)
    .map(({ game }) => cloneGame(game))

  return {
    relatedByCategory: scoredGames,
    relatedByDeveloper: [],
  }
}

function normalizeSearchText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function normalizePlatform(value: string) {
  return normalizeSearchText(value).replaceAll(' ', '')
}

function matchesPlatform(game: PublicGame, requestedPlatform: string) {
  const requested = normalizePlatform(requestedPlatform)
  const requestedGroup = platformAliases.find((group) => group.has(requested))
  const candidates = [game.platform, game.platform_slug, game.platformSlug]
    .filter((value): value is string => Boolean(value))
    .map(normalizePlatform)

  return candidates.some((candidate) => (
    requestedGroup ? requestedGroup.has(candidate) : candidate === requested
  ))
}

function getLocalGameComparator(sort: GameSearchSort) {
  if (sort === 'newest') {
    return (left: PublicGame, right: PublicGame) => Number(right.released_year ?? 0) - Number(left.released_year ?? 0)
  }

  if (sort === 'oldest') {
    return (left: PublicGame, right: PublicGame) => Number(left.released_year ?? 0) - Number(right.released_year ?? 0)
  }

  if (sort === 'name_asc') {
    return (left: PublicGame, right: PublicGame) => (left.name ?? '').localeCompare(right.name ?? '')
  }

  return () => 0
}

function countFilterOptions(values: Array<string>): Array<FilterOption> {
  const counts = new Map<string, number>()

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}
