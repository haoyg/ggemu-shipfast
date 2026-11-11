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

    expect(games).toHaveLength(15)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs).toContain('contra-nes-1988')
    expect(slugs).toContain('geometry-dash-advance-gba-2025')
    expect(slugs).toContain('three-wonders-arcade-1991')
    expect(slugs).toContain('battle-city-nes-1985')
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

  it('does not retain upstream image hosts in local catalog data', () => {
    expect(getLocalGames().map((game) => game.game_cover ?? '').join('\n')).not.toContain('ggemu.com')
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

  it('derives resilient filters from the local catalog', () => {
    const options = getLocalGameFilterOptions()

    expect(options.platforms.map((option) => option.name)).toContain('Arcade')
    expect(options.categories.map((option) => option.name)).toContain('Puzzle')
  })
})
