import { describe, expect, it } from 'vitest'

import { getCollectionPriorityGames, seoPriorityGames } from './seo-priority-games'

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
