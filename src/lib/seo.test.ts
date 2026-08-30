import { describe, expect, it } from 'vitest'

import {
  defaultSeoLocale,
  getAlternateLinksFromCanonical,
  getLocalizedSeoLinks,
  getSeoLinksFromCanonical,
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

  it('only advertises language versions that exist', () => {
    const links = getSeoLinksFromCanonical(
      'https://pokopie.com/en/ps1-compatibility',
      ['en'],
    )

    expect(links).toEqual([
      {
        rel: 'canonical',
        href: 'https://pokopie.com/en/ps1-compatibility',
      },
      {
        rel: 'alternate',
        hrefLang: 'en',
        href: 'https://pokopie.com/en/ps1-compatibility',
      },
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: 'https://pokopie.com/en/ps1-compatibility',
      },
    ])
  })

  it('always includes a self-referencing hreflang', () => {
    const links = getLocalizedSeoLinks({
      alternateLocales: ['en'],
      locale: 'ja',
      origin: 'https://pokopie.com',
      path: '/games/test-game',
    })

    expect(links).toContainEqual({
      rel: 'alternate',
      hrefLang: 'ja',
      href: 'https://pokopie.com/ja/games/test-game',
    })
  })
})
