import { describe, expect, it } from 'vitest'

import { preventErrorResponseCaching } from './response-cache'

describe('response cache', () => {
  it('keeps successful document cache headers unchanged', () => {
    const response = new Response('ok', {
      headers: {
        'Cloudflare-CDN-Cache-Control': 'public, max-age=300',
      },
    })

    expect(preventErrorResponseCaching(response)).toBe(response)
  })

  it('prevents document errors from entering the edge cache', () => {
    const response = new Response('error', {
      headers: {
        'Cache-Control': 'no-cache',
        'Cloudflare-CDN-Cache-Control': 'public, max-age=300',
      },
      status: 500,
    })
    const protectedResponse = preventErrorResponseCaching(response)

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

    expect(preventErrorResponseCaching(response)).toBe(response)
  })
})
