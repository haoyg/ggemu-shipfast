export type SeoPriorityGame = {
  name: string
  platform: string
  slug: string
  collectionPath?: string
}

export const seoPriorityGames: ReadonlyArray<SeoPriorityGame> = [
  {
    name: 'Super Mario Bros.: The Lost Levels',
    platform: 'SNES',
    slug: 'super-mario-bros-the-lost-levels-enhanced-snes-1993',
    collectionPath: '/en/snes-games',
  },
  {
    name: 'Paperboy',
    platform: 'Nintendo 64',
    slug: 'paperboy-n64-1999',
    collectionPath: '/en/n64-games',
  },
  {
    name: 'Pokémon HeartGold',
    platform: 'Nintendo DS',
    slug: 'pok-mon-heartgold-version-nds-2009',
  },
  {
    name: 'Donkey Kong',
    platform: 'NES',
    slug: 'donkey-kong-nes-1983',
    collectionPath: '/en/nes-games',
  },
  {
    name: 'Tekken',
    platform: 'PlayStation',
    slug: 'tekken-ps1-1995',
    collectionPath: '/en/ps1-games',
  },
]

export function getCollectionPriorityGames(routePath: string) {
  return seoPriorityGames.filter((game) => game.collectionPath === routePath)
}
