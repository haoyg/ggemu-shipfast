import { describe, expect, it } from 'vitest'

import {
  WORD_LADDER_PUZZLES,
  differsByOneLetter,
  findShortestPath,
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

  it('maps each UTC date deterministically', () => {
    expect(getDailyPuzzle('2026-10-10')).toEqual(getDailyPuzzle('2026-10-10'))
    expect(() => getDailyPuzzle('2026-02-30')).toThrow('invalid')
  })

  it('offers progressively revealing hints', () => {
    expect(getSmartHint('lead', 'gold', 1)?.message).toMatch(/shortest route/i)
    expect(getSmartHint('lead', 'gold', 2)?.message).toMatch(/letter/i)
    expect(getSmartHint('lead', 'gold', 3)?.suggestedWord).toBeTruthy()
  })

  it.each(WORD_LADDER_PUZZLES)('keeps $id solvable with matching difficulty', (puzzle) => {
    const validation = validatePuzzle(puzzle)
    expect(validation.isValid).toBe(true)
    expect(validation.difficulty).toBe(puzzle.difficulty)
  })
})
