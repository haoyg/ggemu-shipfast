import { describe, expect, it } from 'vitest'

import { buildGameStructuredData, getRelatedGuideForGame } from './$locale.games.$gameId'

describe('game-related guides', () => {
  it('links verified card games to the directory even when the upstream genre is inaccurate', () => {
    for (const url_slug of ['doudizhu-html5-2013', 'spider-solitaire-gcoin-html5-2012', 'yu-gi-oh-duel-monsters-7-kettou-toshi-densetsu-gba-2001']) {
      expect(getRelatedGuideForGame({ url_slug, platform: 'Game Boy Advance' })?.href).toBe('/en/card-games-that-start-with-m')
    }
  })

  it('preserves platform guides and expands useful guide coverage', () => {
    expect(getRelatedGuideForGame({ url_slug: 'contra-nes-1988', platform: 'Famicom' })?.href).toBe('/en/guides/nes-vs-snes-games')
    expect(getRelatedGuideForGame({ url_slug: 'pokemon-emerald-gba-2004', platform: 'Game Boy Advance' })?.href).toBe('/en/guides/how-browser-game-saves-work')
    expect(getRelatedGuideForGame({ url_slug: 'dead-or-alive-ps1-1998', platform: 'PlayStation 1' })?.href).toBe('/en/guides/retro-platform-comparison')
    expect(getRelatedGuideForGame({ url_slug: 'kof-97', platform: 'Arcade' })?.href).toBe('/en/guides/retro-game-controller-guide')
    expect(getRelatedGuideForGame({ url_slug: 'streets-of-rage-3', platform: 'Genesis' })?.href).toBe('/en/guides/browser-retro-gaming-guide')
    expect(getRelatedGuideForGame({ url_slug: 'web-puzzle', platform: 'HTML5' })?.href).toBe('/en/guides/browser-retro-gaming-guide')
  })
})

describe('buildGameStructuredData', () => {
  it('describes the canonical playable page as a free offer with an update date', () => {
    const canonicalUrl = 'https://pokopie.com/en/games/contra-nes-1988'
    const structuredData = buildGameStructuredData({
      canonicalUrl,
      faqItems: [],
      game: {
        name: 'Contra',
        created_at: '2026-03-24T02:36:45.874Z',
        updated_at: '2026-09-16T03:00:00.000Z',
      },
      locale: 'en',
      seo: {
        description: 'Play Contra online.',
        keywords: 'Contra, NES',
        title: 'Play Contra Online',
      },
    })

    expect(structuredData[0]).toMatchObject({
      '@type': 'VideoGame',
      url: canonicalUrl,
      dateModified: '2026-09-16T03:00:00.000Z',
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    })
  })

  it('does not describe preview media as a watch-page video', () => {
    const structuredData = buildGameStructuredData({
      canonicalUrl: 'https://pokopie.com/en/games/contra-nes-1988',
      faqItems: [],
      game: {
        name: 'Contra',
        game_cover: 'https://storage.ggemu.com/games/contra/game_cover.jpg',
        game_video: 'https://storage.ggemu.com/games/contra/game_video.mp4',
        created_at: '2026-03-24T02:36:45.874Z',
      },
      locale: 'en',
      seo: {
        description: 'Play Contra online.',
        keywords: 'Contra, NES',
        title: 'Play Contra Online',
      },
    })

    const videoSchema = structuredData.find((schema) => {
      return (
        typeof schema === 'object' &&
        schema !== null &&
        '@type' in schema &&
        schema['@type'] === 'VideoObject'
      )
    })

    expect(videoSchema).toBeUndefined()
  })
})
