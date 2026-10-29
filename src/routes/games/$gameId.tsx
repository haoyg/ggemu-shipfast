import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getGameDetail } from '#/lib/ggemu'
import { getCanonicalGameRouteId, getUpstreamGameRouteId } from '#/lib/game-route-id'

export const Route = createFileRoute('/games/$gameId')({
  beforeLoad: async ({ params }) => {
    const game = await getGameDetail({ data: { id: getUpstreamGameRouteId(params.gameId) } }).catch(() => null)
    const gameId = game && getCanonicalGameRouteId(game)

    if (!gameId) {
      throw notFound()
    }

    throw redirect({
      params: { gameId, locale: 'en' },
      replace: true,
      statusCode: 301,
      to: '/$locale/games/$gameId',
    })
  },
})
