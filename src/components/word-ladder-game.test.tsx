import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { WordLadderGame } from './word-ladder-game'
import { findShortestPath, validatePuzzle, type WordLadderPuzzle } from '#/lib/word-ladder/engine'

const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }))
vi.mock('#/lib/analytics', () => ({ trackEvent, trackEventOnce: vi.fn() }))

const puzzle: WordLadderPuzzle = {
  id: 'lead-gold',
  start: 'lead',
  target: 'gold',
  difficulty: 'easy',
}

beforeEach(() => {
  trackEvent.mockClear()
  const values = new Map<string, string>()
  const storage = {
    get length() { return values.size },
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    key: (index: number) => Array.from(values.keys())[index] ?? null,
    removeItem: (key: string) => values.delete(key),
    setItem: (key: string, value: string) => values.set(key, value),
  }
  Object.defineProperty(window, 'localStorage', { configurable: true, value: storage })
})

afterEach(cleanup)

describe('WordLadderGame', () => {
  it('plays a keyboard-submitted ladder and compares the shortest path', async () => {
    render(<WordLadderGame dailyDate="2026-10-10" dailyPuzzle={puzzle} />)
    const form = screen.getByLabelText('Next word').closest('form')
    if (!form) throw new Error('Word entry form missing')

    for (const word of findShortestPath('lead', 'gold').slice(1)) {
      fireEvent.change(screen.getByLabelText('Next word'), { target: { value: word } })
      fireEvent.submit(form)
    }

    expect(await screen.findByText(/Ladder complete!/)).toBeTruthy()
    expect(screen.getByText(/The shortest route uses 3/)).toBeTruthy()
    expect(screen.getByText('Shortest path')).toBeTruthy()
  })

  it('rejects invalid moves and exposes progressive smart hints', () => {
    render(<WordLadderGame dailyDate="2026-10-10" dailyPuzzle={puzzle} />)
    const input = screen.getByLabelText('Next word')
    fireEvent.change(input, { target: { value: 'zzzz' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add word' }))
    expect(screen.getByText(/not in this challenge dictionary/)).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /Hint 1\/3/ }))
    expect(screen.getAllByText(/shortest route needs/i)).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: /Hint 2\/3/ }))
    expect(screen.getAllByText(/useful next word/i)).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: /Hint 3\/3/ }))
    expect(screen.getAllByText(/Shortest path:/i)).toHaveLength(2)
    expect(trackEvent).toHaveBeenCalledWith('hint_used', expect.objectContaining({ hint_level: 3 }))
  })

  it('does not create duplicate Daily results after a practice replay', async () => {
    render(<WordLadderGame dailyDate="2026-10-10" dailyPuzzle={puzzle} />)

    async function solve() {
      const form = screen.getByLabelText('Next word').closest('form')
      if (!form) throw new Error('Word entry form missing')
      for (const word of findShortestPath('lead', 'gold').slice(1)) {
        fireEvent.change(screen.getByLabelText('Next word'), { target: { value: word } })
        fireEvent.submit(form)
      }
      await screen.findByText(/Ladder complete|Practice replay complete/)
    }

    await solve()
    fireEvent.click(screen.getByRole('button', { name: /Restart/ }))
    await solve()

    const stored = JSON.parse(window.localStorage.getItem('pokopie-word-ladder-v1') ?? '{}')
    expect(stored.history).toHaveLength(1)
    expect(screen.getByText(/official result was already saved/i)).toBeTruthy()
  })

  it('shows the stable challenge number and supports restart', () => {
    render(<WordLadderGame dailyDate="2026-10-10" dailyPuzzle={puzzle} />)
    expect(screen.getByRole('heading', { name: /Daily Challenge #1/ })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Restart/ }))
    expect(trackEvent).toHaveBeenCalledWith('game_restart', expect.objectContaining({ mode: 'daily' }))
  })

  it('switches to Unlimited Mode with touch-sized controls', async () => {
    render(<WordLadderGame dailyDate="2026-10-10" dailyPuzzle={puzzle} />)
    fireEvent.click(screen.getByRole('button', { name: 'Unlimited' }))
    expect(screen.getByRole('heading', { name: 'Unlimited Mode' })).toBeTruthy()
    await waitFor(() => expect(window.localStorage.length).toBe(1))
    const modeGroup = screen.getByRole('group', { name: 'Game mode' })
    expect(within(modeGroup).getByRole('button', { name: 'Unlimited' }).className).toContain('btn-secondary')
  })

  it('uses an automatically validated fixture', () => {
    expect(validatePuzzle(puzzle).isValid).toBe(true)
  })
})
