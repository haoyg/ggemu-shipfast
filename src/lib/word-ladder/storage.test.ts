import { describe, expect, it } from 'vitest'

import {
  WORD_LADDER_STORAGE_KEY,
  WORD_LADDER_STORAGE_VERSION,
  getDailyStreak,
  loadWordLadderStorage,
  migrateWordLadderStorage,
  saveWordLadderStorage,
} from './storage'

describe('word ladder storage', () => {
  it('recovers safely from corrupt JSON', () => {
    const storage = { getItem: () => '{broken' }
    expect(loadWordLadderStorage(storage).version).toBe(WORD_LADDER_STORAGE_VERSION)
    expect(loadWordLadderStorage(storage).history).toEqual([])
  })

  it('migrates unknown versions while retaining valid records', () => {
    const migrated = migrateWordLadderStorage({
      version: 0,
      unlimitedIndex: 4,
      history: [{
        completedAt: '2026-10-10T00:00:00.000Z',
        date: '2026-10-10',
        hintsUsed: 0,
        mode: 'daily',
        moves: 4,
        optimalMoves: 4,
        puzzleId: 'cold-warm',
      }],
    })
    expect(migrated.version).toBe(1)
    expect(migrated.unlimitedIndex).toBe(4)
    expect(migrated.history).toHaveLength(1)
  })

  it('saves under a stable versioned key', () => {
    const values = new Map<string, string>()
    expect(saveWordLadderStorage({ setItem: (key, value) => values.set(key, value) }, {
      version: 1, history: [], progress: null, unlimitedIndex: 0,
    })).toBe(true)
    expect(values.has(WORD_LADDER_STORAGE_KEY)).toBe(true)
  })

  it('calculates consecutive UTC daily completions', () => {
    const history = ['2026-10-08', '2026-10-09', '2026-10-10'].map((date) => ({
      completedAt: `${date}T12:00:00.000Z`, date, hintsUsed: 0,
      mode: 'daily' as const, moves: 4, optimalMoves: 4, puzzleId: date,
    }))
    expect(getDailyStreak(history, '2026-10-10')).toBe(3)
  })
})
