import { describe, expect, it } from 'vitest'

import { getDocumentHeaders } from './document-headers'

describe('document headers', () => {
  it('keeps HTML out of browser storage while enabling short edge caching', () => {
    const headers = getDocumentHeaders(false)

    expect(headers['Cache-Control']).toBe('no-cache, no-store, must-revalidate')
    expect(headers['Cloudflare-CDN-Cache-Control']).toBe(
      'public, max-age=300, stale-while-revalidate=86400',
    )
  })

  it('prevents regular pages from being embedded', () => {
    const headers = getDocumentHeaders(false)

    expect(headers['Content-Security-Policy']).toBe("frame-ancestors 'self'")
    expect(headers['X-Frame-Options']).toBe('SAMEORIGIN')
  })

  it('leaves embed pages available to third-party frames', () => {
    const headers = getDocumentHeaders(true)

    expect(headers).not.toHaveProperty('Content-Security-Policy')
    expect(headers).not.toHaveProperty('X-Frame-Options')
  })
})
