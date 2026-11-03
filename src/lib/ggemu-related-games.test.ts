import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    handler: (handler: unknown) => handler,
    validator: () => ({ handler: (handler: unknown) => handler }),
  }),
}))
vi.mock('@tanstack/react-start/server', () => ({ getRequestUrl: () => new URL('https://pokopie.com/en') }))

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubGlobal('caches', undefined)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('related game loading', () => {
  it('stops waiting for optional recommendations after two seconds', async () => {
    fetchMock.mockImplementation((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal!.addEventListener('abort', () => reject(new DOMException('Timed out', 'AbortError')))
    }))
    const { getRelatedGamePageData } = await import('./ggemu')
    const pending = getRelatedGamePageData({
      data: {
        category: 'Action',
        currentId: 'contra-nes-1988',
        developer: 'Konami',
        locale: 'en',
      },
    })

    await vi.advanceTimersByTimeAsync(2_000)

    await expect(pending).resolves.toEqual({
      relatedByCategory: [],
      relatedByDeveloper: [],
    })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
