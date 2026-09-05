import { describe, expect, it } from 'vitest'
import { isClassicRetroGame, prioritizeClassicGames } from './home-game-priority'

describe('classic home recommendations', () => {
  it('recognizes platform aliases and excludes modern remakes, unknown years and GCoin titles', () => {
    expect(isClassicRetroGame({ platform: 'Famicom', released_year: '1988' })).toBe(true)
    expect(isClassicRetroGame({ platform_slug: 'super-famicom', released_year: '1994' })).toBe(true)
    expect(isClassicRetroGame({ platform: 'HTML5', released_year: '1995' })).toBe(false)
    expect(isClassicRetroGame({ platform: 'GBA', released_year: '2025' })).toBe(false)
    expect(isClassicRetroGame({ platform: 'Arcade', released_year: '1997', is_gcoin_game: 1 })).toBe(false)
    expect(isClassicRetroGame({ platform: 'NES' })).toBe(false)
  })

  it('keeps other games available and preserves ordering without mutating search results', () => {
    const web = { name: 'Web game', platform: 'HTML5', released_year: '2026' }
    const contra = { name: 'Contra', platform: 'Famicom', released_year: '1988' }
    const arcade = { name: 'Arcade game', platform: 'Arcade', released_year: '1997' }
    const games = [web, contra, arcade]
    expect(prioritizeClassicGames(games)).toEqual([contra, arcade, web])
    expect(games).toEqual([web, contra, arcade])
  })
})
