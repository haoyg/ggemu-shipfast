import type { PublicGame } from '#/lib/ggemu'

// GGEMU names its Traditional Chinese locale zh-HK; our public routes use zh-TW.
export function getGgemuLocale(locale: string) {
  return locale === 'zh-TW' ? 'zh-HK' : locale
}

export function buildGameEmbedSrc({
  embedId,
  isPsp,
  locale,
  refcode,
  theme,
}: {
  embedId: string
  isPsp: boolean
  locale: string
  refcode: string
  theme: string
}) {
  const params = new URLSearchParams({
    r: refcode,
    embed: '1',
    theme,
  })

  if (isPsp) {
    params.set('isolated', '1')
    params.set('autoplay', '1')
  }

  return `https://ggemu.com/${encodeURIComponent(getGgemuLocale(locale))}/game/${encodeURIComponent(embedId)}?${params.toString()}`
}

export function isPspGame(game: Pick<
  PublicGame,
  'platform' | 'platform_slug' | 'platformSlug' | 'url_slug'
>) {
  return [game.platform, game.platform_slug, game.platformSlug, game.url_slug].some((value) =>
    isPspPlatform(value),
  )
}

function isPspPlatform(value: string | undefined) {
  const platform = value?.trim().toLowerCase()

  return (
    platform === 'psp' ||
    platform === 'playstation portable' ||
    platform?.includes('-psp-') ||
    platform?.endsWith('-psp')
  )
}
