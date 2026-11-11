import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    handler: (handler: unknown) => handler,
    validator: () => ({ handler: (handler: unknown) => handler }),
  }),
}))
vi.mock('@tanstack/react-start/server', () => ({ getRequestUrl: () => new URL('https://pokopie.com/en') }))

const upstreamSlug = 'upstream-game-nes-1990'
const game = { _id: 'upstream-id', url_slug: upstreamSlug, name: 'Upstream Game', platform: 'NES' }
const success = () => Response.json({ success: true, data: game })
let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-10-11T00:00:00Z'))
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubGlobal('caches', undefined)
})
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })

async function load() {
  const { getGameDetailPageData } = await import('./ggemu')
  return getGameDetailPageData({ data: { id: upstreamSlug, locale: 'en' } })
}

describe('game detail failure handling', () => {
  it('serves a curated local game without requesting GGEMU', async () => {
    const { getGameDetailPageData } = await import('./ggemu')
    const result = await getGameDetailPageData({
      data: { id: 'contra-nes-1988', locale: 'en' },
    })

    expect(result).toMatchObject({
      kind: 'ready',
      canonicalUrl: 'https://pokopie.com/en/games/contra-nes-1988',
      game: { name: 'Contra', url_slug: 'contra-nes-1988' },
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('retries a transient failure and renders the recovered game', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 503 })).mockResolvedValueOnce(success())
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Upstream Game' } })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('returns a temporary error after two network failures', async () => {
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))
    expect(await load()).toEqual({ kind: 'temporary-error' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('bounds two timed-out attempts to eight seconds', async () => {
    fetchMock.mockImplementation((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal!.addEventListener('abort', () => reject(new DOMException('Timed out', 'AbortError')))
    }))
    const { getGameDetailPageData } = await import('./ggemu')
    const pending = getGameDetailPageData({ data: { id: upstreamSlug, locale: 'en' } })
    await vi.advanceTimersByTimeAsync(8_000)
    expect(await pending).toEqual({ kind: 'temporary-error' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it.each([404, 410])('does not retry a confirmed missing game (%s)', async (status) => {
    fetchMock.mockResolvedValue(new Response('', { status }))
    expect(await load()).toEqual({ kind: 'not-found' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not call invalid successful payloads a deleted game', async () => {
    fetchMock.mockImplementation(() => Response.json({ success: true, data: null }))
    expect(await load()).toEqual({ kind: 'temporary-error' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not cache a malformed response and recovers on the next attempt', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: true, data: null })).mockResolvedValueOnce(success())
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Upstream Game' } })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('uses stale cached data when refreshing the detail fails', async () => {
    fetchMock.mockResolvedValueOnce(success())
    expect(await load()).toMatchObject({ kind: 'ready' })
    vi.advanceTimersByTime(300_001)
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Upstream Game' } })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not hide confirmed removal behind stale cached data', async () => {
    fetchMock.mockResolvedValueOnce(success())
    await load()
    vi.advanceTimersByTime(300_001)
    fetchMock.mockResolvedValue(new Response('', { status: 404 }))
    expect(await load()).toEqual({ kind: 'not-found' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('restores a successful detail response after a Worker isolate restart', async () => {
    const entries = new Map<string, Response>()
    const store = {
      match: vi.fn(async (key: string) => entries.get(key)?.clone()),
      put: vi.fn(async (key: string, response: Response) => { entries.set(key, response.clone()) }),
    }
    vi.stubGlobal('caches', { default: store })
    fetchMock.mockResolvedValueOnce(success())
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Upstream Game' } })
    expect(store.put).toHaveBeenCalledTimes(1)

    vi.resetModules()
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Upstream Game' } })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not hide a confirmed removal behind an expired edge snapshot', async () => {
    const entries = new Map<string, Response>()
    const store = {
      match: vi.fn(async (key: string) => entries.get(key)?.clone()),
      put: vi.fn(async (key: string, response: Response) => { entries.set(key, response.clone()) }),
    }
    vi.stubGlobal('caches', { default: store })
    fetchMock.mockResolvedValueOnce(success())
    await load()
    vi.resetModules()
    vi.advanceTimersByTime(6 * 60 * 60 * 1000 + 1)
    fetchMock.mockResolvedValue(new Response('', { status: 404 }))

    expect(await load()).toEqual({ kind: 'not-found' })
  })
})
