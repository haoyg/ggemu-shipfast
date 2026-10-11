import { describe, expect, it } from 'vitest'
import { applyResponseCachePolicy } from './response-cache'

import { getLocalizedPlatformCollection, platformCollections } from '#/components/platform-games-page'
import {
  buildPlatformCollectionHead,
  getPlatformCollectionHeaders,
  validatePlatformCollectionPage,
  getPlatformCollectionPagePath,
  parsePlatformCollectionPage,
  type PlatformCollectionLoaderData,
} from '#/lib/platform-collection-route'

describe('platform collection pagination', () => {
  it('links Chinese pagination to real Chinese pages without English alternate URLs', () => {
    const data: PlatformCollectionLoaderData = {
      games: [{ _id: 'gba-49', name: 'GBA 49' }],
      origin: 'https://pokopie.com',
      pagination: { limit: 48, page: 2, pages: 4, total: 164 },
    }
    const head = buildPlatformCollectionHead(getLocalizedPlatformCollection('gba', 'zh-CN'), data, 'zh-CN', 2)
    expect(head.meta).toContainEqual({ title: '在线玩 GBA 游戏 – 第 2 页 | POKOPIE' })
    expect(head.links).toContainEqual({ rel: 'canonical', href: 'https://pokopie.com/zh-CN/gba-games/page/2' })
    expect(head.links).toContainEqual({ rel: 'prev', href: 'https://pokopie.com/zh-CN/gba-games' })
    expect(head.links).toContainEqual({ rel: 'next', href: 'https://pokopie.com/zh-CN/gba-games/page/3' })
    expect(head.links).not.toContainEqual(expect.objectContaining({ hrefLang: 'en' }))
  })

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


describe('temporary collection failures', () => {
  const failed: PlatformCollectionLoaderData = {
    games: [], loadFailed: true, origin: 'https://pokopie.com',
    pagination: { limit: 48, page: 2, pages: 0, total: 0 },
  }

  it('keeps upstream failures recoverable instead of treating empty pagination as missing', () => {
    expect(validatePlatformCollectionPage(failed, 2)).toBe(failed)
    expect(() => validatePlatformCollectionPage({ ...failed, loadFailed: false }, 2)).toThrow()
  })

  it('serves failed documents as uncached 503 with a retry interval', () => {
    const response = applyResponseCachePolicy(new Response('Retry', {
      headers: getPlatformCollectionHeaders(failed),
    }))
    expect(response.status).toBe(503)
    expect(response.headers.get('Retry-After')).toBe('60')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.has('X-Robots-Tag')).toBe(false)
    expect(getPlatformCollectionHeaders({ ...failed, loadFailed: false })).toEqual({})
  })

  it('does not publish an empty ItemList as healthy content during an outage', () => {
    const head = buildPlatformCollectionHead(platformCollections.nes, failed, 'en', 2)
    expect(head.scripts).toBeUndefined()
    expect(head.links).toContainEqual({ rel: 'canonical', href: 'https://pokopie.com/en/nes-games/page/2' })
  })
})
