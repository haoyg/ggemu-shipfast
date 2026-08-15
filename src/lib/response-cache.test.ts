import { describe, expect, it } from 'vitest'

import { applyResponseCachePolicy } from './response-cache'

describe('response cache', () => {
  it('keeps successful document cache headers unchanged', () => {
    const response = new Response('ok', {
      headers: {
        'Cloudflare-CDN-Cache-Control': 'public, max-age=300',
      },
    })

    expect(applyResponseCachePolicy(response)).toBe(response)
  })

  it('prevents document errors from entering the edge cache', () => {
    const response = new Response('error', {
      headers: {
        'Cache-Control': 'no-cache',
        'Cloudflare-CDN-Cache-Control': 'public, max-age=300',
      },
      status: 500,
    })
    const protectedResponse = applyResponseCachePolicy(response)

    expect(protectedResponse.status).toBe(500)
    expect(protectedResponse.headers.get('Cache-Control')).toBe('no-store')
    expect(
      protectedResponse.headers.has('Cloudflare-CDN-Cache-Control'),
    ).toBe(false)
  })

  it('does not alter unrelated API errors', () => {
    const response = new Response('error', {
      headers: { 'Cache-Control': 'private' },
      status: 503,
    })

    expect(applyResponseCachePolicy(response)).toBe(response)
  })

  it('prevents implicit caching of server function responses', () => {
    const response = Response.json({ games: [] })
    const protectedResponse = applyResponseCachePolicy(response, {
      isServerFn: true,
    })

    expect(protectedResponse.headers.get('Cache-Control')).toBe('no-store')
  })

  it('preserves explicit server function cache policies', () => {
    const response = Response.json(
      { games: [] },
      { headers: { 'Cache-Control': 'private, max-age=60' } },
    )

    expect(applyResponseCachePolicy(response, { isServerFn: true })).toBe(
      response,
    )
  })
})
