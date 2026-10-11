import { describe, expect, it } from 'vitest'

import { getLocalizedPlatformCollection, getRelatedGuide } from './platform-games-page'
import { getLocalizedArcadePageConfig } from './arcade-games-page'

describe('platform guide links', () => {
  it.each(['nes', 'snes'] as const)('localizes the complete Chinese %s editorial sections', (key) => {
    const page = getLocalizedPlatformCollection(key, 'zh-CN').page
    expect(page.articleTitle).toContain('在线玩')
    expect(page.genres.every((genre) => genre.matchTerms?.length)).toBe(true)
    expect(page.faqs.some((faq) => faq.question.includes('保存') || faq.question.includes('存档'))).toBe(true)
    expect(getLocalizedPlatformCollection(key, 'en').page.faqs).not.toEqual(page.faqs)
  })

  it('provides Chinese arcade coin, input and multiplayer guidance', () => {
    const page = getLocalizedArcadePageConfig('zh-CN')
    expect(page.articleTitle).toContain('投币')
    expect(page.faqs.some((faq) => faq.question.includes('在线联机'))).toBe(true)
    expect(page.genres.find((genre) => genre.name === '射击')?.matchTerms).toContain('Shoot')
  })

  it('provides Chinese GBA editorial content while preserving the English collection', () => {
    const chinese = getLocalizedPlatformCollection('gba', 'zh-CN')
    const english = getLocalizedPlatformCollection('gba', 'en')
    expect(chinese.routePath).toBe('/zh-CN/gba-games')
    expect(chinese.page.routePath).toBe(chinese.routePath)
    expect(chinese.page.articleTitle).toContain('GBA 游戏在线玩')
    expect(chinese.page.faqs.some((faq) => faq.question.includes('保存进度'))).toBe(true)
    expect(chinese.page.genres.find((genre) => genre.name === '动作')?.matchTerms).toContain('Action')
    expect(english.page.articleTitle).not.toBe(chinese.page.articleTitle)
    expect(english.page.faqs[0].question).toContain('GBA')
  })

  it('connects each supported platform collection to a relevant guide', () => {
    expect(getRelatedGuide('Game Boy Advance')?.href).toBe('/en/guides/retro-platform-comparison')
    expect(getRelatedGuide('Nintendo 64')?.href).toBe('/en/guides/retro-game-controller-guide')
    expect(getRelatedGuide('Famicom')?.href).toBe('/en/guides/nes-vs-snes-games')
    expect(getRelatedGuide('Super Famicom')?.href).toBe('/en/guides/nes-vs-snes-games')
    expect(getRelatedGuide('Genesis')?.href).toBe('/en/guides/browser-retro-gaming-guide')
  })
})
