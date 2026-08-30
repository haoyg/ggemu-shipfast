import { describe, expect, it } from 'vitest'

import { getCanonicalHostRedirect } from './canonical-host'

describe('canonical host redirect', () => {
  it('redirects the www host while preserving the path and query', () => {
    const response = getCanonicalHostRedirect(
      new Request('http://www.pokopie.com:8787/en/games/demo?ref=home'),
    )

    expect(response?.status).toBe(301)
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

  it('redirects both homepage host variants to the English homepage', () => {
    const canonicalResponse = getCanonicalHostRedirect(
      new Request('http://pokopie.com/?ref=home'),
    )
    const legacyResponse = getCanonicalHostRedirect(
      new Request('https://www.pokopie.com/?ref=home'),
    )

    expect(canonicalResponse?.status).toBe(301)
    expect(canonicalResponse?.headers.get('Location')).toBe(
      'https://pokopie.com/en?ref=home',
    )
    expect(legacyResponse?.status).toBe(301)
    expect(legacyResponse?.headers.get('Location')).toBe(
      'https://pokopie.com/en?ref=home',
    )
  })

  it('does not redirect canonical localized pages', () => {
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
    expect(
      getCanonicalHostRedirect(new Request('http://localhost:3000/')),
    ).toBeUndefined()
  })
})
