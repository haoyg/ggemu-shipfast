import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryCardGame } from './memory-card-game'

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers() })

describe('Memory card game', () => {
  it('locks mismatches, hides them after a second, and cancels the old timeout on restart', () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0.999)
    render(<MemoryCardGame />)
    fireEvent.click(screen.getByRole('button', { name: 'Start Memory' }))
    fireEvent.click(screen.getByRole('button', { name: 'Card 1: face down' }))
    fireEvent.click(screen.getByRole('button', { name: 'Card 3: face down' }))
    expect(screen.getByRole('button', { name: 'Card 2: face down' }).hasAttribute('disabled')).toBe(true)
    expect(screen.getByRole('status').textContent).toContain('Moves: 1')
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByRole('button', { name: 'Card 1: face down' }).hasAttribute('disabled')).toBe(false)
    fireEvent.click(screen.getByRole('button', { name: 'Card 1: face down' }))
    fireEvent.click(screen.getByRole('button', { name: 'Card 3: face down' }))
    fireEvent.click(screen.getByRole('button', { name: 'New game' }))
    fireEvent.click(screen.getByRole('button', { name: 'Card 1: face down' }))
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByRole('button', { name: 'Card 1: A♠' })).toBeTruthy()
    expect(screen.getByRole('status').textContent).toBe('Pairs: 0 / 6 · Moves: 0')
  })

  it('keeps pairs revealed, completes a game, and resets the board', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999)
    render(<MemoryCardGame />)
    fireEvent.click(screen.getByRole('button', { name: 'Start Memory' }))
    for (let i = 1; i <= 12; i++) fireEvent.click(screen.getByRole('button', { name: `Card ${i}: face down` }))
    expect(screen.getByRole('status').textContent).toBe('You won in 6 moves!')
    expect(screen.getAllByRole('button', { name: /matched/ })).toHaveLength(12)
    fireEvent.click(screen.getByRole('button', { name: 'New game' }))
    expect(screen.getAllByRole('button', { name: /face down/ })).toHaveLength(12)
    expect(screen.getByRole('status').textContent).toContain('Moves: 0')
  })
})
