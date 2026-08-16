import { describe, expect, it } from 'vitest'

import { getCanonicalHostRedirect } from './canonical-host'

describe('canonical host redirect', () => {
  it('redirects the www host while preserving the path and query', () => {
    const response = getCanonicalHostRedirect(
      new Request('http://www.pokopie.com:8787/en/games/demo?ref=home'),
    )

    expect(response?.status).toBe(308)
    expect(response?.headers.get('Location')).toBe(
      'https://pokopie.com/en/games/demo?ref=home',
    )
    expect(response?.headers.get('Cache-Control')).toBe(
      'public, max-age=3600',
    )
    expect(response?.headers.get('Cloudflare-CDN-Cache-Control')).toBe(
      'public, max-age=86400',
    )
  })

  it('does not redirect the canonical host', () => {
    expect(
      getCanonicalHostRedirect(new Request('https://pokopie.com/en')),
    ).toBeUndefined()
  })

  it('does not redirect preview or local hosts', () => {
    expect(
      getCanonicalHostRedirect(
        new Request('https://ggemu-shipfast.workers.dev/en'),
      ),
    ).toBeUndefined()
    expect(
      getCanonicalHostRedirect(new Request('http://localhost:3000/en')),
    ).toBeUndefined()
  })
})
