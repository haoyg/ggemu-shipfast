import { describe, expect, it } from 'vitest'

import { buildGameStructuredData } from './$locale.games.$gameId'

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
