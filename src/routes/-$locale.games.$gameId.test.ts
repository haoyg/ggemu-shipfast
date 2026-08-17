import { describe, expect, it } from 'vitest'

import { buildGameStructuredData } from './$locale.games.$gameId'

describe('buildGameStructuredData', () => {
  it('uses the game creation date as the video uploadDate', () => {
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

    expect(videoSchema).toMatchObject({
      '@type': 'VideoObject',
      name: 'Contra - Game Video',
      uploadDate: '2026-03-24',
    })
  })
})
