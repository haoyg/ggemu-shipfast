import { describe, expect, it } from 'vitest'

import {
  getBlogCoverFallbackLabel,
  getBuiltWithGgEmuLabel,
  getLiveBadgeLabel,
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
    expect(getBuiltWithGgEmuLabel('zh-CN')).toBe('由 GGEMU 提供支持')
    expect(getBuiltWithGgEmuLabel('en')).toBe('Built with GGEMU')
    expect(getBuiltWithGgEmuLabel('ja')).toBe('GGEMU で構築')

    expect(getLiveBadgeLabel('zh-CN')).toBe('直播中')
    expect(getLiveBadgeLabel('en')).toBe('LIVE')
    expect(getLiveBadgeLabel('ja')).toBe('配信中')
  })
})
