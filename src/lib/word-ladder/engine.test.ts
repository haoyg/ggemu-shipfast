import { describe, expect, it } from 'vitest'

import {
  WORD_LADDER_PUZZLES,
  differsByOneLetter,
  findShortestPath,
  getDailyChallengeNumber,
  getDailyPuzzle,
  getSmartHint,
  isValidWord,
  validatePuzzle,
} from './engine'

describe('word ladder engine', () => {
  it('validates dictionary words and one-letter moves', () => {
    expect(isValidWord(' COLD ')).toBe(true)
    expect(isValidWord('zzqx')).toBe(false)
    expect(differsByOneLetter('cold', 'cord')).toBe(true)
    expect(differsByOneLetter('cold', 'card')).toBe(false)
    expect(differsByOneLetter('cold', 'cold')).toBe(false)
  })

  it('finds a shortest path with BFS', () => {
    const path = findShortestPath('lead', 'gold')
    expect(path[0]).toBe('lead')
    expect(path.at(-1)).toBe('gold')
    expect(path).toHaveLength(4)
    expect(path.slice(1).every((word, index) => differsByOneLetter(path[index], word))).toBe(true)
  })

  it('returns no path for invalid or unsolvable endpoints', () => {
    expect(findShortestPath('cold', 'zzzz')).toEqual([])
    expect(findShortestPath('nope', 'gold')).toEqual([])
  })

  it('maps each UTC date deterministically', () => {
    expect(getDailyPuzzle('2026-10-10')).toEqual(getDailyPuzzle('2026-10-10'))
    expect(() => getDailyPuzzle('2026-02-30')).toThrow('invalid')
  })

  it('assigns a stable sequential daily challenge number', () => {
    expect(getDailyChallengeNumber('2026-10-10')).toBe(1)
    expect(getDailyChallengeNumber('2026-10-11')).toBe(2)
  })

  it('offers progressively revealing hints', () => {
    expect(getSmartHint('lead', 'gold', 1)?.message).toMatch(/shortest route/i)
    expect(getSmartHint('lead', 'gold', 2)?.suggestedWord).toBeTruthy()
    expect(getSmartHint('lead', 'gold', 3)?.path?.at(-1)).toBe('gold')
  })

  it.each(WORD_LADDER_PUZZLES)('keeps $id solvable with matching difficulty', (puzzle) => {
    const validation = validatePuzzle(puzzle)
    expect(validation.isValid).toBe(true)
    expect(validation.difficulty).toBe(puzzle.difficulty)
  })
})
