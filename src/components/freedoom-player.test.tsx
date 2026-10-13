import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('#/lib/analytics', () => ({ trackEvent: vi.fn() }))

import { FreedoomPlayer } from './freedoom-player'

describe('FreedoomPlayer', () => {
  it('does not load the large player until the visitor opts in', () => {
    const { container } = render(<FreedoomPlayer />)

    expect(container.querySelector('iframe')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /load game/i }))
    expect(screen.getByTitle('Freedoom Online').getAttribute('src')).toBe('https://danborden1.github.io/doom-web/')
  })
})

