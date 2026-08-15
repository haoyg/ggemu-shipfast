import { describe, expect, it } from 'vitest'

import {
  defaultSeoLocale,
  getAlternateLinksFromCanonical,
  getLocalizedSeoLinks,
} from './seo'

function hasHrefLang(
  link: { href: string; hrefLang?: string; rel: string },
  hrefLang: string,
) {
  return link.hrefLang === hrefLang
}

describe('seo locale links', () => {
  it('uses English as the x-default locale', () => {
    expect(defaultSeoLocale).toBe('en')

    const links = getLocalizedSeoLinks({
      locale: 'en',
      origin: 'https://pokopie.com',
      path: '/games/test-game',
    })
    const xDefault = links.find((link) => hasHrefLang(link, 'x-default'))

    expect(xDefault?.href).toBe('https://pokopie.com/en/games/test-game')
  })

  it('builds alternate links from a canonical game URL', () => {
    const links = getAlternateLinksFromCanonical(
      'https://pokopie.com/ja/games/test-game',
    )

    expect(links).toContainEqual({
      rel: 'alternate',
      hrefLang: 'zh-CN',
      href: 'https://pokopie.com/zh-CN/games/test-game',
    })
    expect(links).toContainEqual({
      rel: 'alternate',
      hrefLang: 'x-default',
      href: 'https://pokopie.com/en/games/test-game',
    })
  })
})
