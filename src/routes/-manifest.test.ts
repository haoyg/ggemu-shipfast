import { describe, expect, it } from 'vitest'

import { buildManifest } from './manifest[.]webmanifest'

describe('web manifest', () => {
  it('ignores user-controlled branding fields from query params', () => {
    const manifest = buildManifest(
      new Request(
        'https://pokopie.com/manifest.webmanifest?locale=en&name=Fake&description=Fake&start_url=https://evil.example/app',
      ),
    )

    expect(manifest.name).toBe('POKOPIE')
    expect(manifest.short_name).toBe('POKOPIE')
    expect(manifest.description).not.toBe('Fake')
    expect(manifest.start_url).toBe('/en')
    expect(manifest.id).toBe('/en')
  })

  it('uses a supported locale from the referer when no locale query is present', () => {
    const manifest = buildManifest(
      new Request('https://pokopie.com/manifest.webmanifest', {
        headers: {
          referer: 'https://pokopie.com/ja/games/demo',
        },
      }),
    )

    expect(manifest.lang).toBe('ja')
    expect(manifest.start_url).toBe('/ja')
  })
})
