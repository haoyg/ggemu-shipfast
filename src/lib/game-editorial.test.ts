import { describe, expect, it } from 'vitest'
import { getGameEditorial } from './game-editorial'
import { getBrowserPlayGuide, getGameDescriptionParagraphs, getGameFaqs, getGameHowToPlayParagraphs, getGameSidebarContent } from './game-detail-content'
import { getTargetedGameSeo } from './game-seo-targets'
import { getGameSeoInternalLinks } from './game-seo-links'

const slugs = ['murdoku-html5-2026', 'onet-master-html5', 'geometry-dash-advance-gba-2025', 'three-wonders-arcade-1991', 'pipi-and-bibis-other-1991', 'taiko-no-tatsujin-taiko-web-html5-2011']

describe('reviewed English game content', () => {
  it.each(slugs)('replaces inaccurate upstream copy consistently for %s', (url_slug) => {
    const game = { url_slug, description: 'Incorrect upstream description', how_to_play: 'Incorrect upstream guide' }
    const editorial = getGameEditorial(game, 'en')!
    expect(getGameDescriptionParagraphs(game, 'en')).toEqual([editorial.summary, ...editorial.description])
    expect(getGameHowToPlayParagraphs(game, 'en')).toEqual(editorial.howToPlay)
    expect(getGameSidebarContent(game, 'en').tips).toEqual(editorial.tips)
    expect(getGameFaqs(game, 'en')).toEqual(editorial.faq)
    expect(getBrowserPlayGuide('en', game).paragraphs).toEqual(expect.arrayContaining(editorial.tips))
    expect(getTargetedGameSeo(game, 'en')).not.toBeNull()
    expect(editorial.sources.length).toBeGreaterThan(0)
    expect(editorial.sources.every((source) => new URL(source.href).protocol === 'https:')).toBe(true)
  })

  it('preserves other games and untranslated content', () => {
    expect(getGameEditorial({ url_slug: 'unrelated-game' }, 'en')).toBeUndefined()
    for (const locale of ['ja', 'zh-CN'] as const) {
      const game = { url_slug: slugs[0], description: 'Original localized copy', how_to_play: 'Original localized instructions' }
      expect(getGameEditorial(game, locale)).toBeUndefined()
      expect(getGameDescriptionParagraphs(game, locale)[0]).toBe(game.description)
      expect(getGameHowToPlayParagraphs(game, locale)[0]).toBe(game.how_to_play)
      expect(getGameFaqs(game, locale)).not.toEqual([])
    }
  })

  it('distinguishes the Three Wonders modes and the Onet connection rule', () => {
    const three = getGameEditorial({ url_slug: 'three-wonders-arcade-1991' }, 'en')!
    expect(three.description.join(' ')).toContain('Chariot is the scrolling flying shooter')
    expect(three.description.join(' ')).toContain('Don’t Pull is the block-pushing puzzle game')
    const onet = getGameEditorial({ url_slug: 'onet-master-html5' }, 'en')!
    expect(onet.description.join(' ')).toContain('three straight segments')
    expect(onet.description.join(' ')).toContain('two turns')
  })

  it('adds reciprocal links without linking a game to itself', () => {
    for (const url_slug of [slugs[0], slugs[1], slugs[3], slugs[4]]) {
      const links = getGameSeoInternalLinks({ url_slug }, 'en')
      expect(links).toHaveLength(1)
      expect(links[0].slug).not.toBe(url_slug)
      expect(getGameSeoInternalLinks({ url_slug: links[0].slug }, 'en').map((link) => link.slug)).toContain(url_slug)
    }
  })
})
