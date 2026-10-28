import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { BrawlStarsCodeFinder } from './brawl-stars-code-finder'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('BrawlStarsCodeFinder', () => {
  it('filters instantly and shows an empty state', async () => {
    render(<BrawlStarsCodeFinder />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Kairos' } })
    expect(await screen.findByText('KAIROS')).not.toBeNull()
    expect(screen.queryByText('OJ')).toBeNull()

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not-a-code' } })
    expect(await screen.findByText('No creator code found')).not.toBeNull()
  })

  it('copies a code and confirms success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    render(<BrawlStarsCodeFinder />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'KAIROS' } })
    fireEvent.click(await screen.findByRole('button', { name: 'Copy code' }))

    expect(await screen.findByRole('button', { name: 'Copied' })).not.toBeNull()
    expect(writeText).toHaveBeenCalledWith('KAIROS')
  })
})
