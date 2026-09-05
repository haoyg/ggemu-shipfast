import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GameEmbedCard, GameShareActions } from './game-share-actions'
import { getI18n } from '#/lib/i18n'
import { createPosterDataUrl } from '#/lib/game-poster'

vi.mock('#/lib/game-poster', () => ({ createPosterDataUrl: vi.fn() }))
const labels = getI18n('en').detail
const props = { canonicalUrl: 'https://pokopie.com/en/games/contra', embedUrl: 'https://pokopie.com/embed/en/games/contra', labels }

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.resetAllMocks() })

describe('share failure feedback', () => {
  it('reports a denied clipboard write instead of claiming the embed code was copied', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('Denied')) } })
    render(<GameEmbedCard {...props} title="Contra" />)
    fireEvent.click(screen.getByText(labels.copyEmbedCode))
    expect(await screen.findByText(labels.copyFailed)).not.toBeNull()
    expect(screen.queryByText(labels.embedCodeCopied)).toBeNull()
  })

  it('reports unavailable clipboard access in the system share fallback', async () => {
    vi.stubGlobal('navigator', {})
    render(<GameShareActions {...props} game={{ name: 'Contra' }} />)
    fireEvent.click(screen.getByText(labels.systemShare))
    expect(await screen.findByText(labels.copyFailed)).not.toBeNull()
  })

  it('only confirms copying after the clipboard write succeeds', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    render(<GameEmbedCard {...props} title="Contra" />)
    fireEvent.click(screen.getByText(labels.copyEmbedCode))
    expect(await screen.findByText(labels.embedCodeCopied)).not.toBeNull()
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining(props.embedUrl))
  })

  it('generates posters only on demand and allows retry after failure', async () => {
    vi.mocked(createPosterDataUrl).mockRejectedValueOnce(new Error('Canvas failed')).mockResolvedValueOnce('data:image/png;base64,dGVzdA==')
    render(<GameShareActions {...props} game={{ name: 'Contra' }} />)
    expect(createPosterDataUrl).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText(labels.generatePoster))
    expect(await screen.findByText(labels.posterFailed)).not.toBeNull()
    fireEvent.click(screen.getByText(labels.generatePoster))
    await waitFor(() => expect(screen.getByRole('dialog')).not.toBeNull())
    expect(screen.queryByText(labels.posterFailed)).toBeNull()
  })
})
