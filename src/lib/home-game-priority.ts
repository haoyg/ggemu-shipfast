import type { PublicGame } from './ggemu'

const classicPlatforms = new Set([
  'arcade', 'famicom', 'nes', 'nintendoentertainmentsystem',
  'snes', 'supernintendo', 'superfamicom', 'supernintendoentertainmentsystem',
  'gba', 'gameboyadvance', 'gameboy', 'gameboycolor',
  'ps1', 'playstation', 'playstation1', 'n64', 'nintendo64',
  'segagenesis', 'genesis', 'megadrive', 'segamegadrive',
])

export function isClassicRetroGame(game: PublicGame) {
  if (game.is_gcoin_game === 1) return false
  const year = Number(game.released_year)
  if (!Number.isInteger(year) || year < 1970 || year > 2005) return false
  return [game.platform, game.platform_slug, game.platformSlug].some((platform) =>
    classicPlatforms.has(platform?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? ''),
  )
}

// Preserve upstream popularity/date order within each group and retain every game.
export function prioritizeClassicGames(games: PublicGame[]) {
  const classics: PublicGame[] = []
  const others: PublicGame[] = []
  for (const game of games) {
    (isClassicRetroGame(game) ? classics : others).push(game)
  }
  return [...classics, ...others]
}
