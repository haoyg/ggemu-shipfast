import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { buildSocialShareLinks, SocialShareActions } from './social-share-actions'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('social share actions', () => {
  it('builds encoded platform share links', () => {
    const links = buildSocialShareLinks({
      shareUrl: 'https://pokopie.com/en/games/test-game',
      text: 'Play this & have fun',
      title: 'Test Game',
    })

    expect(links.x).toContain('text=Play%20this%20%26%20have%20fun')
    expect(links.facebook).toContain(encodeURIComponent('https://pokopie.com/en/games/test-game'))
    expect(links.reddit).toContain('title=Test%20Game')
  })

  it('copies Discord-ready text without connecting an account', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    render(
      <SocialShareActions
        canonicalPath="/en/games/test-game"
        gameId="test-game"
        text="Play Test Game online."
        title="Test Game"
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /discord/i }))

    expect(await screen.findByText(/Discord share text copied/i)).not.toBeNull()
    expect(writeText).toHaveBeenCalledWith(
      'Test Game\nPlay Test Game online.\nhttps://pokopie.com/en/games/test-game',
    )
  })

  it('falls back to copying when native sharing is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    render(
      <SocialShareActions
        canonicalPath="/en/games/test-game"
        gameId="test-game"
        text="Play Test Game online."
        title="Test Game"
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Share' }))

    expect(await screen.findByText('Share link copied.')).not.toBeNull()
    expect(writeText).toHaveBeenCalledWith(
      'Play Test Game online.\nhttps://pokopie.com/en/games/test-game',
    )
  })
})
