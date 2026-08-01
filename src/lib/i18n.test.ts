import { describe, expect, it } from 'vitest'

import type { PublicGame } from './ggemu'
import {
  buildGameDetailSeo,
  getGameDetailHowToPlay,
  getGameDetailKeywordText,
  getGameDetailSummary,
  getGameDetailFaqs,
  getI18n,
  getLocalizedBlogPostExcerpt,
  getLocalizedCategoryLabels,
  isSupportedLocale,
} from './i18n'

const mojibakePattern = /涓|鏃|漏|銈|鍏|鐜|瑾|俙|锛焋/

function collectStrings(value: unknown): Array<string> {
  if (typeof value === 'string') {
    return [value]
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings)
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectStrings)
  }

  return []
}

describe('i18n messages', () => {
  it('recognizes only supported route locales', () => {
    expect(isSupportedLocale('zh-CN')).toBe(true)
    expect(isSupportedLocale('en')).toBe(true)
    expect(isSupportedLocale('ja')).toBe(true)
    expect(isSupportedLocale('x')).toBe(false)
    expect(isSupportedLocale('fr')).toBe(false)
  })

  it('does not include known mojibake markers in zh-CN or ja messages', () => {
    const localizedText = [
      ...collectStrings(getI18n('zh-CN')),
      ...collectStrings(getI18n('ja')),
    ].join('\n')

    expect(localizedText).not.toMatch(mojibakePattern)
  })

  it('localizes the site tagline used in the header', () => {
    expect(getI18n('zh-CN').layout.tagline).toBe('在 POKOPIE 玩复古游戏')
    expect(getI18n('en').layout.tagline).toBe('Play Retro Games on POKOPIE')
    expect(getI18n('ja').layout.tagline).toBe(
      'POKOPIEでレトロゲームをプレイ',
    )
  })

  it('builds localized game detail FAQ and SEO text', () => {
    const game = {
      categories: ['Action'],
      description:
        'A side-scrolling action game with high-speed motorcycle sequences.',
      how_to_play:
        'Use quick attacks and special moves to clear each side-scrolling stage.',
      keywords: 'action, movie game, motorcycle',
      developer: 'POKOPIE Studio',
      name: 'Pixel Quest',
      platform: 'GBA',
      released_year: '2001',
    } as PublicGame

    expect(getGameDetailFaqs(game, 'zh-CN')[0]?.question).toBe(
      'Pixel Quest 可以在线玩吗？',
    )
    expect(getGameDetailFaqs(game, 'ja')[0]?.question).toBe(
      'Pixel Quest はオンラインで遊べますか？',
    )
    expect(getGameDetailFaqs(game, 'zh-CN')[2]?.answer).toContain('动作')
    expect(getGameDetailFaqs(game, 'zh-CN')[2]?.answer).not.toContain('Action')
    expect(buildGameDetailSeo(game, 'zh-CN').title).toBe(
      'Pixel Quest 在线玩 | GBA | 2001 | 浏览器免下载',
    )
    expect(buildGameDetailSeo(game, 'ja').title).toBe(
      'Pixel Quest をオンラインでプレイ | GBA | 2001 | ダウンロード不要',
    )
    expect(buildGameDetailSeo(game, 'zh-CN').description).toContain(
      '在线游玩 Pixel Quest',
    )
    expect(buildGameDetailSeo(game, 'zh-CN').description).not.toContain(
      'side-scrolling',
    )
    expect(getGameDetailSummary(game, 'ja')).toContain(
      'Pixel Quest（GBA）は2001年発売のレトロゲームです',
    )
    expect(getGameDetailHowToPlay(game, 'zh-CN')).toContain(
      '点击“开始游戏”即可在浏览器中启动 Pixel Quest',
    )
    expect(getGameDetailHowToPlay(game, 'zh-CN')).not.toContain('quick attacks')
    expect(getGameDetailKeywordText(game, 'ja')).toContain(
      'Pixel Quest オンライン',
    )
    expect(getGameDetailKeywordText(game, 'ja')).not.toContain('movie game')
    expect(buildGameDetailSeo(game, 'zh-CN').keywords).toContain('动作')
    expect(buildGameDetailSeo(game, 'zh-CN').keywords).not.toContain('Action')
    expect(getLocalizedCategoryLabels(game.categories, 'ja')).toEqual([
      'アクション',
    ])
  })

  it('uses localized fallbacks for blog excerpts that do not match the page locale', () => {
    const blogPost = {
      excerpt: 'Play classic games directly in your browser with no download.',
      title: 'Browser Retro Games',
    }

    expect(getLocalizedBlogPostExcerpt(blogPost, 'zh-CN')).toContain(
      '阅读 POKOPIE',
    )
    expect(getLocalizedBlogPostExcerpt(blogPost, 'zh-CN')).not.toContain(
      'Play classic games',
    )
    expect(getLocalizedBlogPostExcerpt(blogPost, 'ja')).toContain('POKOPIEの')
    expect(getLocalizedBlogPostExcerpt(blogPost, 'en')).toBe(blogPost.excerpt)
  })

  it('cleans markdown and legacy branding from localized blog excerpts', () => {
    const blogPost = {
      excerpt:
        '经典游戏介绍。 ## 1. 推荐 ![Image](https://example.com/a.jpg) 在 GGEMU.com 免费畅玩 **动作游戏**。 ![Image](ht...',
      title: '经典游戏',
    }
    const excerpt = getLocalizedBlogPostExcerpt(blogPost, 'zh-CN')

    expect(excerpt).toContain('POKOPIE')
    expect(excerpt).not.toContain('GGEMU')
    expect(excerpt).not.toContain('![Image]')
    expect(excerpt).not.toContain('##')
    expect(excerpt).not.toContain('**')
  })
})
