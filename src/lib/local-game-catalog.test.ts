import { describe, expect, it } from 'vitest'

import { getLocalGame, getLocalGames, getLocalRelatedGames } from './local-game-catalog'

describe('local game catalog', () => {
  it('keeps stable unique slugs for the first independent catalog batch', () => {
    const games = getLocalGames()
    const slugs = games.map((game) => game.url_slug)

    expect(games).toHaveLength(10)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs).toContain('contra-nes-1988')
    expect(slugs).toContain('geometry-dash-advance-gba-2025')
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
})
