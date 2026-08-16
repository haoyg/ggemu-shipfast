import { describe, expect, it } from 'vitest'

import { getPs1CoverFallback, PS1_COVER_FILE_BY_SLUG } from './ps1-cover-fallbacks'

describe('PS1 cover fallbacks', () => {
  it('covers all PS1 games whose upstream images are blocked', () => {
    expect(Object.keys(PS1_COVER_FILE_BY_SLUG)).toHaveLength(16)
  })

  it('returns an encoded Libretro box-art URL for a mapped game', () => {
    expect(getPs1CoverFallback('jojo-s-bizarre-adventure-ps1-1998')).toBe(
      'https://thumbnails.libretro.com/Sony%20-%20PlayStation/Named_Boxarts/JoJo%27s%20Bizarre%20Adventure%20(USA).png',
    )
  })

  it('does not replace covers for unrelated games', () => {
    expect(getPs1CoverFallback('unknown-game')).toBeUndefined()
    expect(getPs1CoverFallback(undefined)).toBeUndefined()
  })
})
