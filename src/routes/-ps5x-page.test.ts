import { describe, expect, it } from 'vitest'

import {
  filterPs5xGames,
  parsePs5xGames,
  parsePs5xUpdates,
  ps5xGames,
  ps5xStatusOrder,
} from '#/lib/ps5x'
import { buildPs5xHead } from './en.ps5-games-on-xbox-series-x'

describe('ps5x game data', () => {
  it('parses every game with required fields and a valid status', () => {
    expect(ps5xGames.length).toBeGreaterThan(0)

    for (const game of ps5xGames) {
      expect(game.id).toBeTruthy()
      expect(game.name).toBeTruthy()
      expect(ps5xStatusOrder).toContain(game.status)
      expect(game.sourceUrl).toMatch(/^https:\/\//)
      expect(game.testDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('marks no title Verified Running without independent evidence', () => {
    expect(ps5xGames.some((game) => game.status === 'verified-running')).toBe(false)
  })

  it('parses malformed payloads defensively', () => {
    expect(parsePs5xGames(null)).toEqual([])
    expect(parsePs5xGames({})).toEqual([])
    expect(parsePs5xGames([{ id: 'x', status: 'bogus' }])[0].status).toBe('not-tested')
    expect(parsePs5xUpdates('nope')).toEqual([])
  })
})

describe('filterPs5xGames', () => {
  it('filters by query and status', () => {
    const quake = filterPs5xGames('quake', 'all')
    expect(quake).toHaveLength(1)
    expect(quake[0].id).toBe('quake-ii')

    const reported = filterPs5xGames('', 'reported-running')
    expect(reported.every((game) => game.status === 'reported-running')).toBe(true)

    expect(filterPs5xGames('zzzz', 'all')).toEqual([])
  })
})

describe('buildPs5xHead', () => {
  it('emits canonical, title, description and WebPage + BreadcrumbList JSON-LD', () => {
    const head = buildPs5xHead('https://pokopie.com')

    expect(head.links).toContainEqual({
      rel: 'canonical',
      href: 'https://pokopie.com/en/ps5-games-on-xbox-series-x',
    })
    expect(head.meta).toContainEqual({
      title: 'PS5 Games Running on Xbox Hardware: What PS5X Can Actually Do',
    })
    expect(head.meta).toContainEqual({ name: 'description', content: expect.any(String) })

    const script = head.scripts?.[0]
    expect(script?.type).toBe('application/ld+json')

    const graph = JSON.parse(String(script?.children)) as {
      '@graph': Array<{ '@type': string }>
    }
    const types = graph['@graph'].map((node) => node['@type'])

    expect(types).toContain('WebPage')
    expect(types).toContain('BreadcrumbList')
    expect(types).not.toContain('FAQPage')
  })
})
