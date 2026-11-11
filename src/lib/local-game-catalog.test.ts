import { describe, expect, it } from 'vitest'

import {
  getLocalGame,
  getLocalGameFilterOptions,
  getLocalGames,
  getLocalRelatedGames,
  searchLocalGames,
} from './local-game-catalog'

describe('local game catalog', () => {
  it('keeps stable unique slugs for the reviewed independent catalog batches', () => {
    const games = getLocalGames()
    const slugs = games.map((game) => game.url_slug)

    expect(games).toHaveLength(30)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs).toContain('contra-nes-1988')
    expect(slugs).toContain('geometry-dash-advance-gba-2025')
    expect(slugs).toContain('three-wonders-arcade-1991')
    expect(slugs).toContain('battle-city-nes-1985')
    expect(slugs).toContain('crash-bandicoot-2-cortex-strikes-back-ps1-1997')
    expect(slugs).toContain('theme-hospital-dos-1997')
    expect(slugs).toContain('pokemon-emerald-gba-2004')
    expect(slugs).toContain('rhythm-heaven-nds-2008')
    expect(slugs).toContain('onet-master-html5')
    expect(slugs).toContain('lilo-stitch-trouble-in-paradise-ps1-2002')
  })

  it('returns defensive copies instead of mutable catalog records', () => {
    const first = getLocalGame('contra-nes-1988')
    const second = getLocalGame('contra-nes-1988')

    first!.name = 'Changed'
    first!.categories!.push('Changed')

    expect(second?.name).toBe('Contra')
    expect(second?.categories).not.toContain('Changed')
  })

  it('builds related games locally without returning the current game', () => {
    const result = getLocalRelatedGames('contra-nes-1988')
    const slugs = result?.relatedByCategory.map((game) => game.url_slug)

    expect(slugs?.length).toBeGreaterThan(0)
    expect(slugs).not.toContain('contra-nes-1988')
    expect(result?.relatedByDeveloper).toEqual([])
  })

  it('uses reviewed GGEMU covers for games whose artwork is copyright-cleared by the site owner', () => {
    const games = getLocalGames()
    const coverFor = (slug: string) => games.find((game) => game.url_slug === slug)?.game_cover

    expect(coverFor('pokemon-emerald-gba-2004')).toBe(
      'https://storage.ggemu.com/games/6a70351cd46a19a590dfeb9b/game_cover.jpg',
    )
    expect(coverFor('pokemon-ruby-gba-2002')).toBe(
      'https://storage.ggemu.com/games/6a7034c3d46a19a590dfe86c/game_cover.jpg',
    )
    expect(coverFor('pokemon-leafgreen-game-boy-advance-2004')).toBe(
      'https://storage.ggemu.com/games/69df9bc5b3f31da225db8579/game_cover.jpg',
    )
    expect(coverFor('rhythm-tengoku-japan-gba-2006')).toBe(
      'https://storage.ggemu.com/games/69be85146d8635af26570216/game_cover.jpg',
    )
    expect(coverFor('three-wonders-arcade-1991')).toBe(
      'https://storage.ggemu.com/games/69be82146d8635af2657019b/game_cover.jpg',
    )
    expect(coverFor('rhythm-heaven-nds-2008')).toBe(
      'https://emulatorgamer.com/covers/nds/rhythm-heaven.webp',
    )
    expect(coverFor('onet-master-html5')).toBe(
      'https://storage.ggemu.com/games/69e01ed7b3f31da225dda726/game_cover.jpg',
    )
    expect(coverFor('romance-of-the-three-kingdoms-iv-dos-1994')).toBe(
      'https://storage.ggemu.com/games/69bc124cf8bfc155e8aec31f/game_cover.jpeg',
    )
  })

  it('searches names and keyword variants from local data', () => {
    const result = searchLocalGames({
      limit: 20,
      page: 1,
      query: 'unblocked tekken',
    })

    expect(result.games.map((game) => game.url_slug)).toEqual(['tekken-ps1-1995'])
  })

  it('matches common platform aliases for collection pages', () => {
    const nes = searchLocalGames({ limit: 20, page: 1, platform: 'Famicom' })
    const snes = searchLocalGames({ limit: 20, page: 1, platform: 'Super Famicom' })

    expect(nes.games.map((game) => game.url_slug)).toEqual(expect.arrayContaining([
      'contra-nes-1988',
      'donkey-kong-nes-1983',
      'super-mario-bros-nes-1985',
      'battle-city-nes-1985',
    ]))
    expect(snes.games.map((game) => game.url_slug)).toContain('super-mario-bros-the-lost-levels-enhanced-snes-1993')
  })

  it('finds the new arcade batch by common search aliases', () => {
    const kof = searchLocalGames({ limit: 20, page: 1, query: 'KOF 97' })
    const whoopee = searchLocalGames({ limit: 20, page: 1, query: 'Whoopee' })

    expect(kof.games.map((game) => game.url_slug)).toEqual([
      'the-king-of-fighters-97-arcade-1997',
    ])
    expect(whoopee.games.map((game) => game.url_slug)).toEqual([
      'pipi-and-bibis-other-1991',
    ])
  })

  it('finds the second batch from editorial search intent', () => {
    const hogwarts = searchLocalGames({ limit: 20, page: 1, query: 'explore Hogwarts' })
    const hospital = searchLocalGames({ limit: 20, page: 1, query: 'hospital management' })

    expect(hogwarts.games.map((game) => game.url_slug)).toEqual([
      'harry-potter-and-the-philosopher-s-stone-ps1-2001',
    ])
    expect(hospital.games.map((game) => game.url_slug)).toEqual([
      'theme-hospital-dos-1997',
    ])
  })

  it('finds the GBA and DS discovery batch locally', () => {
    const emerald = searchLocalGames({ limit: 25, page: 1, query: '口袋妖怪绿宝石' })
    const rhythm = searchLocalGames({ limit: 25, page: 1, query: 'rhythm game' })

    expect(emerald.games.map((game) => game.url_slug)).toEqual(['pokemon-emerald-gba-2004'])
    expect(rhythm.games.map((game) => game.url_slug)).toEqual(expect.arrayContaining([
      'rhythm-tengoku-japan-gba-2006',
      'rhythm-heaven-nds-2008',
    ]))
  })

  it('finds the browser-native and long-tail batch locally', () => {
    const onet = searchLocalGames({ limit: 30, page: 1, query: 'connect pairs game' })
    const taiko = searchLocalGames({ limit: 30, page: 1, query: '太鼓网页' })
    const rtk = searchLocalGames({ limit: 30, page: 1, query: '三国志4' })

    expect(onet.games.map((game) => game.url_slug)).toEqual(['onet-master-html5'])
    expect(taiko.games.map((game) => game.url_slug)).toEqual([
      'taiko-no-tatsujin-taiko-web-html5-2011',
    ])
    expect(rtk.games.map((game) => game.url_slug)).toEqual([
      'romance-of-the-three-kingdoms-iv-dos-1994',
    ])
  })

  it('derives resilient filters from the local catalog', () => {
    const options = getLocalGameFilterOptions()

    expect(options.platforms.map((option) => option.name)).toContain('Arcade')
    expect(options.categories.map((option) => option.name)).toContain('Puzzle')
  })
})
