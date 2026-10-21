import { describe, expect, it } from 'vitest'
import { getGameEditorial } from './game-editorial'
import { getBrowserPlayGuide, getGameDescriptionParagraphs, getGameFaqs, getGameHowToPlayParagraphs, getGameSidebarContent } from './game-detail-content'
import { getGameSearchSeo, getTargetedGameSeo } from './game-seo-targets'
import { getGameSeoInternalLinks } from './game-seo-links'

const slugs = ['murdoku-html5-2026', 'onet-master-html5', 'geometry-dash-advance-gba-2025', 'three-wonders-arcade-1991', 'pipi-and-bibis-other-1991', 'taiko-no-tatsujin-taiko-web-html5-2011', 'pokemon-ruby-gba-2002', 'pokemon-leafgreen-game-boy-advance-2004', 'fire-emblem-the-blazing-blade-gba-2003', 'professor-layton-and-the-curious-village-nds-2007', 'theme-hospital-dos-1997', 'pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005', 'jin-yong-qun-xia-zhuan-dos-1996', 'xuan-yuan-sword-dos-1990', 'mario-and-luigi-superstar-saga-gba-2003', 'dad-n-me-flash-2005', 'chobits-atashi-dake-no-hito-game-boy-advance-2002', 'labrador-and-his-friends-nintendo-ds-2009', 'ghost-chaser-densei-snes-1994', '1944-cn-nes-1988', 'pokemon-team-rocket-game-boy-advance-2000', 'light-and-darkness-crystal-conflict-nes-2003', 'saiyuki-tang-sanzang-nes-1996', 'chinese-paladin-dos-1995', 'xuan-yuan-sword-ii-dos-1994', 'flame-dragon-knights-seal-of-the-evil-god-dos-1994', 'flame-dragon-knight-2-dos-1995', 'pokemon-firered-game-boy-advance-2004', 'maplestory-ds-nds-2010', 'naruto-shippuden-ultimate-impact-psp-2011', 'initial-d-another-stage-cn-gba-2002', '1942-cn-nes-1985', '1943-the-battle-of-midway-cn-nes-1988', 'double-dragon-ii-revenge-nes-1989', 'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988', 'satomi-hakkenden-cn-nes-1989', 'richman-2-dos-1993', 'rich-man-3-dos-1996', 'romance-of-the-three-kingdoms-iv-dos-1994', 'san-guo-qun-ying-zhuan-2-html5-1998', 'sanguosha-html5-2011', 'the-killing-blade-arcade-1998', 'the-legend-of-sword-and-saber-arcade-2003', 'metal-gear-2030-cn-gbc', 'xian-jian-qi-xia-zhuan-gba-2001', 'naruto-rpg-gba-2003', 'yan-loong-story-flash-2008', 'yanlong-chuanshuo-2-erdu-chongji-flash-2009', 'yanlong-chuanshuo-2-shuang-long-flash-2009', 'yanlong-chuanshuo-3-chifeng-flash-2010', 'yanlong-chuanshuo-3-shuang-yan-flash-2009', 'jin-yong-heroes-2-enhanced-flash-2006', 'jin-yong-heroes-3-flash-2009', 'magic-tower-flash-2000', 'mahjong-academy-arcade-1989', 'doudizhu-gcoin-html5-2013', 'doudizhu-html5-2013', 'hong-kong-mahjong-html5', 'sichuan-mahjong-html5', 'taiwan-mahjong-16-tile-html5', 'chinese-mahjong-html5', 'ra2web-html5-2026', 'gals-panic-arcade']

describe('reviewed English game content', () => {
  it.each([
    ['the-king-of-fighters-97-arcade-1997', 'Orochi Saga'],
    ['lilo-stitch-trouble-in-paradise-ps1-2002', 'action platform'],
    ['prince-of-persia-the-sands-of-time-java-2003', '2D action-platform'],
  ])('provides reviewed content and sources for %s', (url_slug, expectedText) => {
    const editorial = getGameEditorial({ url_slug }, 'en')

    expect(editorial?.summary).toContain(expectedText)
    expect(editorial?.description.length).toBeGreaterThanOrEqual(3)
    expect(editorial?.howToPlay.length).toBeGreaterThanOrEqual(3)
    expect(editorial?.faq.length).toBeGreaterThanOrEqual(3)
    expect(editorial?.sources.length).toBeGreaterThan(0)
  })

  it('uses the Chinese Three Kingdoms guide without replacing other locales', () => {
    const game = { url_slug: 'san-guo-qun-ying-zhuan-2-html5-1998', description: 'Original localized copy' }
    const editorial = getGameEditorial(game, 'zh-CN')!
    expect(getGameSearchSeo(game, 'zh-CN')?.title).toContain('三国群英传 2 在线玩')
    expect(getGameDescriptionParagraphs(game, 'zh-CN', editorial)).toEqual([editorial.summary, ...editorial.description])
    expect(getGameFaqs(game, 'zh-CN', editorial)).toEqual(editorial.faq)
    expect(editorial.description.join(' ')).toContain('1999')
    expect(getGameEditorial(game, 'ja')).toBeUndefined()
    expect(getGameSearchSeo(game, 'ja')).toBeNull()
  })

  it.each(['zh-CN', 'ja'] as const)('uses localized Taiko copy throughout the %s page', (locale) => {
    const game = { url_slug: 'taiko-no-tatsujin-taiko-web-html5-2011', description: 'Upstream copy', how_to_play: 'Upstream instructions' }
    const editorial = getGameEditorial(game, locale)!
    const seo = getGameSearchSeo(game, locale)!
    expect(seo.title).toContain(locale === 'ja' ? '太鼓ウェブ' : '太鼓 Web')
    expect(getGameDescriptionParagraphs(game, locale, editorial)).toEqual([editorial.summary, ...editorial.description])
    expect(getGameHowToPlayParagraphs(game, locale, editorial)).toEqual(editorial.howToPlay)
    expect(getGameFaqs(game, locale, editorial)).toEqual(editorial.faq)
    expect(getGameSidebarContent(game, locale, editorial).tips).toEqual(editorial.tips)
    expect(getTargetedGameSeo(game, locale)).toEqual(seo)
    expect(getGameSearchSeo(game, 'ko')).toBeNull()
    expect(getGameEditorial(game, 'ko')).toBeUndefined()
  })

  it.each(slugs)('replaces inaccurate upstream copy consistently for %s', (url_slug) => {
    const game = { url_slug, description: 'Incorrect upstream description', how_to_play: 'Incorrect upstream guide' }
    const editorial = getGameEditorial(game, 'en')!
    expect(getGameDescriptionParagraphs(game, 'en', editorial)).toEqual([editorial.summary, ...editorial.description])
    expect(getGameHowToPlayParagraphs(game, 'en', editorial)).toEqual(editorial.howToPlay)
    expect(getGameSidebarContent(game, 'en', editorial).tips).toEqual(editorial.tips)
    expect(getGameFaqs(game, 'en', editorial)).toEqual(editorial.faq)
    expect(getBrowserPlayGuide('en', game, editorial).paragraphs.join(' ')).toContain('input focus')
    expect(getTargetedGameSeo(game, 'en')).not.toBeNull()
    expect(editorial.sources.length).toBeGreaterThan(0)
    expect(editorial.sources.every((source) => new URL(source.href).protocol === 'https:')).toBe(true)
  })

  it('preserves other games and untranslated content', () => {
    expect(getGameEditorial({ url_slug: 'unrelated-game' }, 'en')).toBeUndefined()
    for (const locale of ['ja', 'zh-TW'] as const) {
      const game = { url_slug: slugs[0], description: 'Original localized copy', how_to_play: 'Original localized instructions' }
      expect(getGameEditorial(game, locale)).toBeUndefined()
      expect(getGameDescriptionParagraphs(game, locale)[0]).toBe(game.description)
      expect(getGameHowToPlayParagraphs(game, locale)[0]).toBe(game.how_to_play)
      expect(getGameFaqs(game, locale)).not.toEqual([])
    }
  })

  it('replaces the incorrect Gals Panic block-shooting guide and metadata', () => {
    const game = { url_slug: 'gals-panic-arcade', description: 'Shoot upward to clear colored blocks', how_to_play: 'Fire a projectile upward' }
    const editorial = getGameEditorial(game, 'en')!
    const guide = getGameHowToPlayParagraphs(game, 'en', editorial).join(' ')
    expect(guide).toContain('draw control')
    expect(guide).toContain('80 percent')
    expect(guide).not.toContain('projectile')
    expect(getGameDescriptionParagraphs(game, 'en', editorial)[0]).toContain('area-capture')
    expect(getGameSearchSeo(game, 'en')?.description).toContain('enclose territory')
    expect(getGameFaqs(game, 'en', editorial)).toEqual(editorial.faq)
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
      expect(links.length).toBeGreaterThan(0)
      expect(links.every((link) => link.slug !== url_slug)).toBe(true)
      expect(links.some((link) =>
        getGameSeoInternalLinks({ url_slug: link.slug }, 'en')
          .some((reciprocalLink) => reciprocalLink.slug === url_slug),
      )).toBe(true)
    }
  })
})


it('describes Chinese Murdoku accurately without enabling another inline player', () => {
  const game = { url_slug: 'murdoku-html5-2026', play_device: 1 }
  const seo = getGameSearchSeo(game, 'zh-CN')!
  expect(seo.description).toContain('数独式逻辑推理')
  expect(seo.description).toContain('仅支持电脑')
  expect(seo.description).not.toContain('经典复古')
  expect(getGameSearchSeo({ ...game, play_device: undefined }, 'zh-CN')?.description).not.toContain('仅支持电脑')
  expect(getTargetedGameSeo(game, 'zh-CN')).toBeNull()
  const editorial = getGameEditorial(game, 'zh-CN')!
  expect(getGameDescriptionParagraphs(game, 'zh-CN', editorial)).toEqual([editorial.summary, ...editorial.description])
  expect(getGameFaqs(game, 'zh-CN', editorial)).toEqual(editorial.faq)
  expect(getGameHowToPlayParagraphs(game, 'zh-CN', editorial)).toEqual(editorial.howToPlay)
  expect(editorial.quickStart?.title).toBe('Murdoku 新手规则与操作')
})
