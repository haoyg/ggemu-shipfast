import { describe, expect, it } from 'vitest'

import {
  getCanonicalGameRouteId,
  isSitemapGameRouteId,
} from './game-route-id'

describe('game route ids', () => {
  it('uses a verified equivalent slug for known duplicate records', () => {
    expect(getCanonicalGameRouteId({
      _id: '69d19027eb21396d61959413',
      name: 'Crash Bandicoot',
    })).toBe('crash-bandicoot-ps1-1996')
  })

  it('keeps upstream readable slugs as canonical ids', () => {
    expect(getCanonicalGameRouteId({
      _id: '69bc1506f8bfc155e8aec3ee',
      url_slug: 'kodingergoy-html5',
    })).toBe('kodingergoy-html5')
  })

  it('excludes bare ObjectIds from sitemap submission', () => {
    expect(isSitemapGameRouteId('69d19a43eb21396d6195a021')).toBe(false)
    expect(isSitemapGameRouteId('crash-bandicoot-ps1-1996')).toBe(true)
  })
})
