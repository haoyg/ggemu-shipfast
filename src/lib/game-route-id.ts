import type { PublicGame } from '#/lib/ggemu'

const objectIdPattern = /^[0-9a-f]{24}$/i

const canonicalGameRouteOverrides: Readonly<Record<string, string>> = {
  '69d19027eb21396d61959413': 'crash-bandicoot-ps1-1996',
}

export function getCanonicalGameRouteId(game: PublicGame) {
  const id = game._id?.trim() ?? ''

  return canonicalGameRouteOverrides[id]
    || game.url_slug?.trim()
    || id
}

export function isSitemapGameRouteId(routeId: string) {
  return Boolean(routeId) && !objectIdPattern.test(routeId)
}
