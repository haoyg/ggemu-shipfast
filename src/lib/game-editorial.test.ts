import { describe, expect, it } from 'vitest'
import { getGameEditorial } from './game-editorial'
import { getBrowserPlayGuide, getGameDescriptionParagraphs, getGameFaqs, getGameHowToPlayParagraphs, getGameSidebarContent } from './game-detail-content'
import { getTargetedGameSeo } from './game-seo-targets'
import { getGameSeoInternalLinks } from './game-seo-links'

const slugs = ['murdoku-html5-2026', 'onet-master-html5', 'geometry-dash-advance-gba-2025', 'three-wonders-arcade-1991', 'pipi-and-bibis-other-1991', 'taiko-no-tatsujin-taiko-web-html5-2011', 'pokemon-ruby-gba-2002', 'pokemon-leafgreen-game-boy-advance-2004', 'fire-emblem-the-blazing-blade-gba-2003', 'professor-layton-and-the-curious-village-nds-2007', 'theme-hospital-dos-1997', 'pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005', 'jin-yong-qun-xia-zhuan-dos-1996', 'xuan-yuan-sword-dos-1990', 'mario-and-luigi-superstar-saga-gba-2003', 'dad-n-me-flash-2005', 'chobits-atashi-dake-no-hito-game-boy-advance-2002', 'labrador-and-his-friends-nintendo-ds-2009', 'ghost-chaser-densei-snes-1994', '1944-cn-nes-1988', 'pokemon-team-rocket-game-boy-advance-2000', 'light-and-darkness-crystal-conflict-nes-2003', 'saiyuki-tang-sanzang-nes-1996', 'chinese-paladin-dos-1995', 'xuan-yuan-sword-ii-dos-1994', 'flame-dragon-knights-seal-of-the-evil-god-dos-1994', 'flame-dragon-knight-2-dos-1995', 'pokemon-firered-game-boy-advance-2004', 'maplestory-ds-nds-2010', 'naruto-shippuden-ultimate-impact-psp-2011', 'initial-d-another-stage-cn-gba-2002', '1942-cn-nes-1985', '1943-the-battle-of-midway-cn-nes-1988', 'double-dragon-ii-revenge-nes-1989', 'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988', 'satomi-hakkenden-cn-nes-1989', 'richman-2-dos-1993', 'rich-man-3-dos-1996', 'romance-of-the-three-kingdoms-iv-dos-1994', 'san-guo-qun-ying-zhuan-2-html5-1998', 'sanguosha-html5-2011', 'the-killing-blade-arcade-1998', 'the-legend-of-sword-and-saber-arcade-2003', 'metal-gear-2030-cn-gbc', 'xian-jian-qi-xia-zhuan-gba-2001', 'naruto-rpg-gba-2003', 'yan-loong-story-flash-2008', 'yanlong-chuanshuo-2-erdu-chongji-flash-2009', 'yanlong-chuanshuo-2-shuang-long-flash-2009', 'yanlong-chuanshuo-3-chifeng-flash-2010', 'yanlong-chuanshuo-3-shuang-yan-flash-2009', 'jin-yong-heroes-2-enhanced-flash-2006', 'jin-yong-heroes-3-flash-2009', 'magic-tower-flash-2000', 'mahjong-academy-arcade-1989', 'doudizhu-gcoin-html5-2013', 'doudizhu-html5-2013', 'hong-kong-mahjong-html5', 'sichuan-mahjong-html5', 'taiwan-mahjong-16-tile-html5']

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

  it('keeps the Taiko control card tied to the upstream guide', () => {
    const taiko = getGameEditorial({ url_slug: 'taiko-no-tatsujin-taiko-web-html5-2011' }, 'en')!
    expect(taiko.quickStart?.entries.map((entry) => entry.keys)).toEqual([
      'F or J',
      'D or K',
      'Shift + ← / →',
      'Shift / Ctrl',
    ])
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
