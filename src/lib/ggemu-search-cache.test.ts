import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    handler: (handler: unknown) => handler,
    validator: () => ({ handler: (handler: unknown) => handler }),
  }),
}))
vi.mock('@tanstack/react-start/server', () => ({ getRequestUrl: () => new URL('https://pokopie.com/zh-CN') }))

const searchResponse = () => Response.json({
  success: true,
  data: [{ _id: 'upstream-id', url_slug: 'upstream-game-nes-1990', name: 'Upstream Game' }],
  pagination: { total: 1, page: 1, limit: 24, pages: 1 },
})

let fetchMock: ReturnType<typeof vi.fn>
const entries = new Map<string, Response>()
const store = {
  match: vi.fn(async (key: string) => entries.get(key)?.clone()),
  put: vi.fn(async (key: string, response: Response) => { entries.set(key, response.clone()) }),
}

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-11-03T00:00:00Z'))
  entries.clear()
  store.match.mockClear()
  store.put.mockClear()
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubGlobal('caches', { default: store })
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

async function search(query = 'upstream') {
  const { searchGames } = await import('./ggemu')
  return searchGames({
    data: { category: '', limit: 24, locale: 'zh-CN', page: 1, platform: '', query, sort: 'popular' },
  })
}

describe('game search edge cache', () => {
  it('restores a list after a Worker isolate restart', async () => {
    fetchMock.mockResolvedValueOnce(searchResponse())
    expect(await search()).toMatchObject({ games: [{ name: 'Upstream Game' }] })
    expect(store.put).toHaveBeenCalledTimes(1)

    vi.resetModules()
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))
    expect(await search()).toMatchObject({ games: [{ name: 'Upstream Game' }] })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('uses a one-day snapshot when a refresh fails after fifteen minutes', async () => {
    fetchMock.mockResolvedValueOnce(searchResponse())
    await search()
    vi.resetModules()
    vi.advanceTimersByTime(15 * 60 * 1000 + 1)
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))

    expect(await search()).toMatchObject({ pagination: { total: 1 } })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('falls back locally without persisting malformed successful responses', async () => {
    fetchMock.mockResolvedValue(Response.json({ success: true, data: null, pagination: {} }))

    await expect(search()).resolves.toMatchObject({ games: [], pagination: { total: 0 } })
    expect(store.put).not.toHaveBeenCalled()
  })

  it('keeps the unfiltered catalog useful when the upstream is unavailable', async () => {
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))

    const result = await search('')

    expect(result.games.map((game) => game.url_slug)).toContain('contra-nes-1988')
    expect(result.pagination.total).toBe(15)
  })
})
