import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const request = () => new Request('https://pokopie.com/sitemap.xml')
const day = 86_400_000
let fetchMock: ReturnType<typeof vi.fn>

function successfulFetch(input: string) {
  const blog = input.includes('/api/blog-posts')
  return Promise.resolve(Response.json(blog
    ? { success: true, blogPosts: [{ slug: 'guide' }], pagination: { pages: 1 } }
    : { success: true, data: [{ url_slug: 'contra' }], pagination: { pages: 1 } }))
}

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-05T00:00:00Z'))
  fetchMock = vi.fn(successfulFetch)
  vi.stubGlobal('fetch', fetchMock)
  vi.stubGlobal('caches', undefined)
})

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })

describe('sitemap availability', () => {
  it('long-caches only complete successful results and coalesces concurrent refreshes', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const [first, second] = await Promise.all([getSitemapResponse(request()), getSitemapResponse(request())])
    expect(first.status).toBe(200)
    expect(first.headers.get('Cache-Control')).toContain('s-maxage=86400')
    expect(await first.text()).toContain('/en/games/contra')
    expect(await second.text()).toContain('/en/blog/guide')
    await getSitemapResponse(request())
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('returns uncached 503 on a cold failure and recovers after the retry interval', async () => {
    fetchMock.mockRejectedValue(new Error('Offline'))
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const failed = await getSitemapResponse(request())
    expect(failed.status).toBe(503)
    expect(failed.headers.get('Cache-Control')).toBe('no-store')
    expect(failed.headers.get('Retry-After')).toBe('60')
    expect(await failed.text()).not.toContain('<urlset')
    fetchMock.mockImplementation(successfulFetch)
    vi.setSystemTime(Date.now() + 60_001)
    expect((await getSitemapResponse(request())).status).toBe(200)
  })

  it('preserves the complete prior sitemap if either upstream fails', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const original = await (await getSitemapResponse(request())).text()
    vi.setSystemTime(Date.now() + day + 1)
    fetchMock.mockImplementation((input: string) => input.includes('/api/blog-posts')
      ? Promise.reject(new Error('Blog unavailable')) : successfulFetch(input))
    const stale = await getSitemapResponse(request())
    expect(stale.headers.get('Cache-Control')).toBe('public, max-age=60, s-maxage=60')
    expect(await stale.text()).toBe(original)
    fetchMock.mockImplementation(successfulFetch)
    vi.setSystemTime(Date.now() + 60_001)
    expect((await getSitemapResponse(request())).headers.get('Cache-Control')).toContain('s-maxage=86400')
  })

  it('rejects partial pagination instead of publishing missing game pages', async () => {
    fetchMock.mockImplementation((input: string) => {
      if (input.includes('/api/blog-posts')) return successfulFetch(input)
      return Promise.resolve(new URL(input).searchParams.get('page') === '2'
        ? new Response('Unavailable', { status: 502 })
        : Response.json({ success: true, data: [{ url_slug: 'contra' }], pagination: { pages: 2 } }))
    })
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    expect((await getSitemapResponse(request())).status).toBe(503)
  })

  it('accepts a valid empty blog but rejects malformed successful responses', async () => {
    fetchMock.mockImplementation((input: string) => input.includes('/api/blog-posts')
      ? Promise.resolve(Response.json({ success: true, blogPosts: [], pagination: { pages: 0 } }))
      : successfulFetch(input))
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    expect((await getSitemapResponse(request())).status).toBe(200)
    fetchMock.mockResolvedValue(Response.json({ success: false, data: [] }))
    expect((await getSitemapResponse(new Request('https://preview.example/sitemap.xml'))).status).toBe(503)
  })

  it('isolates preview caches and canonicalizes production origins', async () => {
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const canonical = await getSitemapResponse(new Request('http://www.pokopie.com/sitemap.xml'))
    expect(await canonical.text()).toContain('https://pokopie.com/en/games/contra')
    const preview = await getSitemapResponse(new Request('https://preview.example/sitemap.xml'))
    const xml = await preview.text()
    expect(xml).toContain('https://preview.example/en/games/contra')
    expect(xml).not.toContain('https://pokopie.com')
  })

  it('restores an edge snapshot after an isolate restart without overwriting it on failure', async () => {
    const entries = new Map<string, Response>()
    const store = {
      match: vi.fn(async (key: string) => entries.get(key)?.clone()),
      put: vi.fn(async (key: string, response: Response) => { entries.set(key, response.clone()) }),
    }
    vi.stubGlobal('caches', { default: store })
    const firstModule = await import('./sitemap[.]xml')
    const xml = await (await firstModule.getSitemapResponse(request())).text()
    vi.resetModules()
    vi.setSystemTime(Date.now() + day + 1)
    fetchMock.mockRejectedValue(new Error('Offline'))
    const restarted = await import('./sitemap[.]xml')
    expect(await (await restarted.getSitemapResponse(request())).text()).toBe(xml)
    expect(store.put).toHaveBeenCalledTimes(1)
  })

  it('times out a stalled response body, not just the response headers', async () => {
    fetchMock.mockImplementation((_input: string, options: RequestInit) => Promise.resolve({
      ok: true,
      json: () => new Promise((_resolve, reject) => {
        options.signal?.addEventListener('abort', () => reject(new Error('Aborted')))
      }),
    }))
    const { getSitemapResponse } = await import('./sitemap[.]xml')
    const pending = getSitemapResponse(request())
    await vi.advanceTimersByTimeAsync(5_001)
    expect((await pending).status).toBe(503)
  })
})
