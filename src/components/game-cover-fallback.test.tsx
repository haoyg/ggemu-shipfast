import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'

import { GameCoverFallback } from './game-cover-fallback'

afterEach(cleanup)

it('uses the game title and platform in a branded cover placeholder', () => {
  render(<GameCoverFallback lang="en" name="Paperboy" platform="Nintendo 64" />)

  expect(screen.getByRole('img', { name: 'Paperboy cover placeholder' })).not.toBeNull()
  expect(screen.getByText('Paperboy')).not.toBeNull()
  expect(screen.getByText('Nintendo 64')).not.toBeNull()
  expect(screen.getByText('POKOPIE')).not.toBeNull()
})
