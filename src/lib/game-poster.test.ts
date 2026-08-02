import { describe, expect, it } from 'vitest'

import { getKeywordItems, getPosterFileName } from '#/lib/game-poster'

describe('game poster helpers', () => {
  it('normalizes keywords from supported separators', () => {
    expect(getKeywordItems('RPG, Action，冒险、Retro; Arcade | Co-op / Online')).toEqual([
      'RPG',
      'Action',
      '冒险',
      'Retro',
      'Arcade',
      'Co-op',
      'Online',
    ])
  })

  it('creates a safe poster file name with a stable fallback', () => {
    expect(getPosterFileName('Super Mario Bros. 3')).toBe('super-mario-bros-3')
    expect(getPosterFileName('超级马里奥')).toBe('game-poster')
  })
})
