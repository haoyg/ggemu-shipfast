import { describe, expect, it } from 'vitest'

import { freedoomGame } from '#/lib/freedoom-game'
import { buildFreedoomHead } from './en.games.freedoom-online'

describe('Freedoom Online SEO', () => {
  it('publishes a stable canonical and social image', () => {
    const head = buildFreedoomHead('https://pokopie.com')

    expect(head.links).toEqual([{ rel: 'canonical', href: 'https://pokopie.com/en/games/freedoom-online' }])
    expect(head.meta).toContainEqual({ title: 'Freedoom Online – Play a Free Browser FPS | POKOPIE' })
    expect(head.meta).toContainEqual({ property: 'og:image', content: 'https://pokopie.com/game-art/freedoom-online.webp' })
  })

  it('describes the playable game and FAQ without claiming proprietary Doom data', () => {
    const scripts = buildFreedoomHead('https://pokopie.com').scripts

    expect(freedoomGame.embedUrl).toBe('https://danborden1.github.io/doom-web/')
    expect(scripts[0].children).toContain('VideoGame')
    expect(scripts[1].children).toContain('FAQPage')
    expect(freedoomGame.faq).toHaveLength(4)
    expect(freedoomGame.description).toContain('no proprietary Doom game data')
  })
})

