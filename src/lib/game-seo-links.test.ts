import { describe, expect, it } from 'vitest'

import { getGameSeoInternalLinks } from './game-seo-links'

describe('game SEO internal links', () => {
  it('links Geometry Dash Advance to related timing and rhythm games', () => {
    const links = getGameSeoInternalLinks(
      { url_slug: 'geometry-dash-advance-gba-2025' },
      'en',
    )

    expect(links.map((link) => link.slug)).toEqual([
      'space-is-key-flash-2011',
      'rhythm-tengoku-japan-gba-2006',
    ])
  })

  it('cross-links the existing English One Piece game pages', () => {
    const links = getGameSeoInternalLinks(
      { url_slug: 'shonen-jump-s-one-piece-gba-2005' },
      'en',
    )

    expect(links).toHaveLength(3)
    expect(links.every((link) => link.slug.includes('one-piece'))).toBe(true)
  })

  it('does not add the English SEO cluster to other locales', () => {
    expect(getGameSeoInternalLinks(
      { url_slug: 'taiko-no-tatsujin-taiko-web-html5-2011' },
      'ja',
    )).toEqual([])
  })
})
