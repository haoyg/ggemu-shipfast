import { describe, expect, it } from 'vitest'

import { buildGameEmbedSrc, isPspGame } from './game-embed'
import { getTargetedGameSeo } from './game-seo-targets'

describe('game embed helpers', () => {
  it('builds the standard embedded game URL', () => {
    const url = new URL(buildGameEmbedSrc({
      embedId: 'contra id',
      isPsp: false,
      locale: 'en',
      refcode: 'ref code',
      theme: 'pokopie',
    }))

    expect(url.pathname).toBe('/en/game/contra%20id')
    expect(url.searchParams.get('embed')).toBe('1')
    expect(url.searchParams.get('r')).toBe('ref code')
    expect(url.searchParams.get('theme')).toBe('pokopie')
    expect(url.searchParams.has('autoplay')).toBe(false)
  })

  it('keeps PSP isolation parameters in the shared builder', () => {
    const url = new URL(buildGameEmbedSrc({
      embedId: 'psp-game',
      isPsp: true,
      locale: 'en',
      refcode: 'ref',
      theme: 'dark',
    }))

    expect(url.searchParams.get('isolated')).toBe('1')
    expect(url.searchParams.get('autoplay')).toBe('1')
    expect(isPspGame({ platform: 'PSP' })).toBe(true)
  })

  it('targets only the primary English Contra landing page', () => {
    expect(getTargetedGameSeo({ url_slug: 'contra-nes-1988' }, 'en')?.heading)
      .toBe('Play Contra Game Online Free')
    expect(getTargetedGameSeo({ url_slug: 'contra-1987-arcade-1987' }, 'en')).toBeNull()
    expect(getTargetedGameSeo({ url_slug: 'contra-nes-1988' }, 'ja')).toBeNull()
  })
})
