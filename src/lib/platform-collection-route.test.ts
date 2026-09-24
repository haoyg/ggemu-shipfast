import { describe, expect, it } from 'vitest'

import { platformCollections } from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  getPlatformCollectionPagePath,
  parsePlatformCollectionPage,
  type PlatformCollectionLoaderData,
} from '#/lib/platform-collection-route'

describe('platform collection pagination', () => {
  it('normalizes the first page and builds clean page paths', () => {
    expect(getPlatformCollectionPagePath('/en/nes-games', 1)).toBe('/en/nes-games')
    expect(getPlatformCollectionPagePath('/en/nes-games', 2)).toBe('/en/nes-games/page/2')
  })

  it('accepts positive integer page parameters only', () => {
    expect(parsePlatformCollectionPage('2')).toBe(2)
    expect(parsePlatformCollectionPage('01')).toBeNull()
    expect(parsePlatformCollectionPage('0')).toBeNull()
    expect(parsePlatformCollectionPage('-1')).toBeNull()
    expect(parsePlatformCollectionPage('abc')).toBeNull()
  })

  it('creates self-referencing metadata and crawlable neighbors for page two', () => {
    const loaderData: PlatformCollectionLoaderData = {
      games: [
        { _id: 'game-49', name: 'Game 49', url_slug: 'game-49' },
        { _id: 'game-50', name: 'Game 50', url_slug: 'game-50' },
      ],
      origin: 'https://pokopie.com',
      pagination: { limit: 48, page: 2, pages: 4, total: 164 },
    }

    const head = buildPlatformCollectionHead(
      platformCollections.nes,
      loaderData,
      'en',
      2,
    )

    expect(head.meta).toContainEqual({
      title: 'Play NES Games Online – Page 2 | POKOPIE',
    })
    expect(head.links).toContainEqual({
      rel: 'canonical',
      href: 'https://pokopie.com/en/nes-games/page/2',
    })
    expect(head.links).toContainEqual({
      rel: 'prev',
      href: 'https://pokopie.com/en/nes-games',
    })
    expect(head.links).toContainEqual({
      rel: 'next',
      href: 'https://pokopie.com/en/nes-games/page/3',
    })
    expect(head.links).not.toContainEqual(
      expect.objectContaining({ hrefLang: 'zh-CN' }),
    )

    const itemList = JSON.parse(head.scripts?.[0]?.children ?? '{}')
    expect(itemList.mainEntity.itemListElement).toEqual([
      expect.objectContaining({ position: 49 }),
      expect.objectContaining({ position: 50 }),
    ])
  })
})
