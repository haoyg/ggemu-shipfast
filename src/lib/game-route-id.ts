import type { PublicGame } from '#/lib/ggemu'

const objectIdPattern = /^[0-9a-f]{24}$/i

const canonicalGameRouteOverrides: Readonly<Record<string, string>> = {
  '69d19027eb21396d61959413': 'crash-bandicoot-ps1-1996',
  '69cda6d55d5e184df7111a2f': 'naruto-konoha-ninpouchou-wsc-2001',
  '69d19a43eb21396d6195a021': 'new-super-mario-bros-nds-2006',
}

const upstreamGameRouteOverrides = Object.fromEntries(
  Object.entries(canonicalGameRouteOverrides).map(([id, routeId]) => [routeId, id]),
)

export function getCanonicalGameRouteId(game: PublicGame) {
  const id = game._id?.trim() ?? ''

  return canonicalGameRouteOverrides[id]
    || game.url_slug?.trim()
    || id
}

export function getUpstreamGameRouteId(routeId: string) {
  return upstreamGameRouteOverrides[routeId] || routeId
}

export function isSitemapGameRouteId(routeId: string) {
  return Boolean(routeId) && !objectIdPattern.test(routeId)
}
