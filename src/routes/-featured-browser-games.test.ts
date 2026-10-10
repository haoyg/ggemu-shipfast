import { describe, expect, it } from 'vitest'

import { buildExternalBrowserGameHead } from '#/lib/external-browser-game-seo'
import { featuredBrowserGames } from '#/lib/featured-browser-games'

describe('featured browser game SEO', () => {
  it.each(Object.values(featuredBrowserGames))('uses a stable canonical for $id', (game) => {
    const head = buildExternalBrowserGameHead(game, 'https://pokopie.com')
    expect(head.links).toEqual([{ rel: 'canonical', href: `https://pokopie.com${game.canonicalPath}` }])
    expect(head.meta).toContainEqual({ title: expect.stringContaining(game.title) })
    expect(head.meta).toContainEqual({ property: 'og:image', content: `https://pokopie.com${game.imageUrl}` })
    expect(head.meta).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' })
  })

  it.each(Object.values(featuredBrowserGames))('renders readable FAQ data for $id', (game) => {
    const scripts = buildExternalBrowserGameHead(game, 'https://pokopie.com').scripts
    expect(scripts).toHaveLength(2)
    expect(scripts[0].children).toContain('WebPage')
    expect(scripts[1].children).toContain('FAQPage')
  })

  it('keeps externally hosted games on explicit HTTPS origins', () => {
    expect(featuredBrowserGames.quakeOnline.externalUrl).toBe('https://quake.zone/play/librequake/')
    expect(featuredBrowserGames.csSurf.externalUrl).toBe('https://surfd.net/')
  })

  it.each(Object.values(featuredBrowserGames))('provides a practical play sequence for $id', (game) => {
    expect(game.howToPlayIntro.length).toBeGreaterThan(60)
    expect(game.controls.length).toBeGreaterThanOrEqual(6)
    expect(game.controls.every((step) => step.length > 70)).toBe(true)
  })
})
