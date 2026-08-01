import { describe, expect, it } from 'vitest'

import {
  defaultSeoLocale,
  getAlternateLinksFromCanonical,
  getLocalizedSeoLinks,
} from './seo'

function hasHrefLang(
  link: { href: string; hreflang?: string; rel: string },
  hrefLang: string,
) {
  return link.hreflang === hrefLang
}

describe('seo locale links', () => {
  it('uses zh-CN as the x-default locale', () => {
    expect(defaultSeoLocale).toBe('zh-CN')

    const links = getLocalizedSeoLinks({
      locale: 'en',
      origin: 'https://pokopie.com',
      path: '/games/test-game',
    })
    const xDefault = links.find((link) => hasHrefLang(link, 'x-default'))

    expect(xDefault?.href).toBe('https://pokopie.com/zh-CN/games/test-game')
  })

  it('builds alternate links from a canonical game URL', () => {
    const links = getAlternateLinksFromCanonical(
      'https://pokopie.com/ja/games/test-game',
    )

    expect(links).toContainEqual({
      rel: 'alternate',
      hreflang: 'zh-CN',
      href: 'https://pokopie.com/zh-CN/games/test-game',
    })
    expect(links).toContainEqual({
      rel: 'alternate',
      hreflang: 'x-default',
      href: 'https://pokopie.com/zh-CN/games/test-game',
    })
  })
})
