import type { PublicGame, RelatedGamesData } from '#/lib/ggemu'

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
