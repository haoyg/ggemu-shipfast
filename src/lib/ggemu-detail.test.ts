import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    handler: (handler: unknown) => handler,
    validator: () => ({ handler: (handler: unknown) => handler }),
  }),
}))
vi.mock('@tanstack/react-start/server', () => ({ getRequestUrl: () => new URL('https://pokopie.com/en') }))

const game = { _id: 'contra-id', url_slug: 'contra-nes-1988', name: 'Contra', platform: 'NES' }
const success = () => Response.json({ success: true, data: game })
let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-10-11T00:00:00Z'))
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })

async function load() {
  const { getGameDetailPageData } = await import('./ggemu')
  return getGameDetailPageData({ data: { id: 'contra-nes-1988', locale: 'en' } })
}

describe('game detail failure handling', () => {
  it('retries a transient failure and renders the recovered game', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 503 })).mockResolvedValueOnce(success())
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Contra' } })
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
    const pending = getGameDetailPageData({ data: { id: 'contra-nes-1988', locale: 'en' } })
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
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Contra' } })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('uses stale cached data when refreshing the detail fails', async () => {
    fetchMock.mockResolvedValueOnce(success())
    expect(await load()).toMatchObject({ kind: 'ready' })
    vi.advanceTimersByTime(300_001)
    fetchMock.mockRejectedValue(new TypeError('Network unavailable'))
    expect(await load()).toMatchObject({ kind: 'ready', game: { name: 'Contra' } })
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
})
