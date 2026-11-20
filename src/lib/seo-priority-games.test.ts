import { describe, expect, it } from 'vitest'

import { getChinesePlatformPlayNote, getCollectionPriorityGames, seoPriorityGames } from './seo-priority-games'

describe('SEO priority games', () => {
  it('keeps the five current ranking opportunities on the English homepage', () => {
    expect(seoPriorityGames.map((game) => game.slug)).toEqual([
      'super-mario-bros-the-lost-levels-enhanced-snes-1993',
      'paperboy-n64-1999',
      'pok-mon-heartgold-version-nds-2009',
      'donkey-kong-nes-1983',
      'tekken-ps1-1995',
    ])
  })

  it('maps each supported collection to its relevant priority game', () => {
    expect(getCollectionPriorityGames('/en/n64-games').map((game) => game.slug)).toEqual([
      'paperboy-n64-1999',
    ])
    expect(getCollectionPriorityGames('/en/gba-games')).toEqual([])
  })
})
it.each(['/zh-CN/gba-games', '/zh-CN/ps1-games', '/zh-CN/nes-games'])('links three games with play notes from %s', (path) => {
  const picks = getCollectionPriorityGames(path)
  expect(picks).toHaveLength(3)
  for (const game of picks) {
    expect(game.description).toBeTruthy()
    expect(getChinesePlatformPlayNote(game.slug)).toBeTruthy()
  }
})
