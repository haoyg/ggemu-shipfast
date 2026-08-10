import { createFileRoute, redirect } from '@tanstack/react-router'

const orphanLegacyPlaySlugs = new Set([
  'bubble-shooter-crystal-hunt',
  'energy-factory-idle',
])

export const Route = createFileRoute('/play/$gameId')({
  beforeLoad: ({ params }) => {
    if (orphanLegacyPlaySlugs.has(params.gameId)) {
      throw redirect({
        params: { locale: 'en' },
        replace: true,
        to: '/$locale',
      })
    }

    throw redirect({
      params: { gameId: params.gameId, locale: 'en' },
      replace: true,
      to: '/$locale/games/$gameId',
    })
  },
})
