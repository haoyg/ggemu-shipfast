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

  it('targets the English Murdoku landing page with query-aligned metadata', () => {
    const seo = getTargetedGameSeo({ url_slug: 'murdoku-html5-2026' }, 'en')

    expect(seo?.heading).toBe('Play Murdoku Online Free')
    expect(seo?.title).toMatch(/^Murdoku Online/)
    expect(seo?.description).toContain('murder mystery')
    expect(getTargetedGameSeo({ url_slug: 'murdoku-html5-2026' }, 'ja')).toBeNull()
  })

  it('targets the English Onet Master page with intent-aligned metadata', () => {
    const seo = getTargetedGameSeo({ url_slug: 'onet-master-html5' }, 'en')

    expect(seo?.heading).toBe('Play Onet Master Online Free')
    expect(seo?.title).toMatch(/^Onet Master Online/)
    expect(seo?.description).toContain('Match identical tiles')
    expect(getTargetedGameSeo({ url_slug: 'onet-master-html5' }, 'zh-CN')).toBeNull()
  })

  it('targets the English Geometry Dash Advance page', () => {
    const seo = getTargetedGameSeo(
      { url_slug: 'geometry-dash-advance-gba-2025' },
      'en',
    )

    expect(seo?.title).toMatch(/^Geometry Dash Advance/)
    expect(seo?.description).toContain('GBA demake')
  })

  it('targets the English Taiko Web page', () => {
    const seo = getTargetedGameSeo(
      { url_slug: 'taiko-no-tatsujin-taiko-web-html5-2011' },
      'en',
    )

    expect(seo?.title).toMatch(/^Taiko Web/)
    expect(seo?.description).toContain('drum notes')
  })

  it('targets the One Piece GBA page without presenting it as Online 2', () => {
    const seo = getTargetedGameSeo(
      { url_slug: 'shonen-jump-s-one-piece-gba-2005' },
      'en',
    )

    expect(seo?.title).toMatch(/^Play One Piece Online/)
    expect(seo?.description).toContain('2005 GBA action game')
    expect(`${seo?.title} ${seo?.description}`).not.toContain('Online 2')
  })
})
