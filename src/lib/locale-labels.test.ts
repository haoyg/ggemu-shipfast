import { describe, expect, it } from 'vitest'

import {
  getBlogCoverFallbackLabel,
  getLiveBadgeLabel,
  getPoweredByLabel,
  getRetroCoverFallbackLabel,
} from './locale-labels'

describe('locale labels', () => {
  it('returns localized short fallback labels', () => {
    expect(getRetroCoverFallbackLabel('zh-CN')).toBe('复古')
    expect(getRetroCoverFallbackLabel('en')).toBe('Retro')
    expect(getRetroCoverFallbackLabel('ja')).toBe('レトロ')

    expect(getBlogCoverFallbackLabel('zh-CN')).toBe('博客')
    expect(getBlogCoverFallbackLabel('en')).toBe('Blog')
    expect(getBlogCoverFallbackLabel('ja')).toBe('ブログ')
  })

  it('returns localized footer and live labels', () => {
    expect(getPoweredByLabel('zh-CN')).toBe('游戏播放器由 GGEMU 提供')
    expect(getPoweredByLabel('en')).toBe('Game player powered by GGEMU')
    expect(getPoweredByLabel('ja')).toBe('ゲームプレイヤー提供：GGEMU')

    expect(getLiveBadgeLabel('zh-CN')).toBe('直播中')
    expect(getLiveBadgeLabel('en')).toBe('LIVE')
    expect(getLiveBadgeLabel('ja')).toBe('配信中')
  })
})
