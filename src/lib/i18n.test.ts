import { describe, expect, it } from 'vitest'

import type { PublicGame } from './ggemu'
import {
  buildGameDetailSeo,
  getGameDetailFaqs,
  getI18n,
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
  it('does not include known mojibake markers in zh-CN or ja messages', () => {
    const localizedText = [
      ...collectStrings(getI18n('zh-CN')),
      ...collectStrings(getI18n('ja')),
    ].join('\n')

    expect(localizedText).not.toMatch(mojibakePattern)
  })

  it('builds localized game detail FAQ and SEO text', () => {
    const game = {
      categories: ['Action'],
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
    expect(buildGameDetailSeo(game, 'zh-CN').title).toBe(
      'Pixel Quest 在线玩 | GBA | 2001 | 浏览器免下载',
    )
    expect(buildGameDetailSeo(game, 'ja').title).toBe(
      'Pixel Quest をオンラインでプレイ | GBA | 2001 | ダウンロード不要',
    )
  })
})
