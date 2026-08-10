import { createFileRoute, redirect } from '@tanstack/react-router'

import { getGameDetail } from '#/lib/ggemu'

export const Route = createFileRoute('/games/$gameId')({
  beforeLoad: async ({ params }) => {
    const game = await getGameDetail({ data: { id: params.gameId } }).catch(() => null)
    const gameId = game?.url_slug?.trim() || game?._id?.trim()

    if (!gameId) {
      throw redirect({
        params: { locale: 'en' },
        replace: true,
        to: '/$locale',
      })
    }

    throw redirect({
      params: { gameId, locale: 'en' },
      replace: true,
      to: '/$locale/games/$gameId',
    })
  },
})
