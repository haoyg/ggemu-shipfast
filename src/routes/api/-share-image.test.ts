import { describe, expect, it } from 'vitest'

import { getImageUrl, isAllowedShareImageUrl } from './share-image'

describe('share image proxy guards', () => {
  it('allows known public image hosts over https', () => {
    expect(isAllowedShareImageUrl(new URL('https://storage.134x.com/games/demo/game_cover.jpg'))).toBe(
      true,
    )
    expect(isAllowedShareImageUrl(new URL('https://storage.ggemu.com/games/demo/game_cover.jpg'))).toBe(
      true,
    )
    expect(isAllowedShareImageUrl(new URL('https://pokopie.com/og.png'))).toBe(true)
    expect(
      isAllowedShareImageUrl(
        new URL('https://thumbnails.libretro.com/Sony%20-%20PlayStation/box.png'),
      ),
    ).toBe(true)
  })

  it('rejects arbitrary, local, and non-https sources', () => {
    expect(isAllowedShareImageUrl(new URL('https://example.com/image.jpg'))).toBe(false)
    expect(isAllowedShareImageUrl(new URL('https://127.0.0.1/image.jpg'))).toBe(false)
    expect(isAllowedShareImageUrl(new URL('http://storage.134x.com/games/demo/game_cover.jpg'))).toBe(
      false,
    )
  })

  it('normalizes valid query urls and drops invalid requests', () => {
    expect(
      getImageUrl(
        new URL(
          'https://pokopie.com/api/share-image?url=https%3A%2F%2Fstorage.134x.com%2Fgames%2Fdemo%2Fgame_cover.jpg',
        ),
      ),
    ).toBe('https://storage.134x.com/games/demo/game_cover.jpg')
    expect(
      getImageUrl(
        new URL(
          'https://pokopie.com/api/share-image?url=https%3A%2F%2Fstorage.ggemu.com%2Fgames%2Fdemo%2Fgame_cover.jpg',
        ),
      ),
    ).toBe('https://storage.ggemu.com/games/demo/game_cover.jpg')
    expect(getImageUrl(new URL('https://pokopie.com/api/share-image?url=https%3A%2F%2Fexample.com'))).toBe(
      '',
    )
    expect(getImageUrl(new URL('https://pokopie.com/api/share-image'))).toBe('')
  })
})
