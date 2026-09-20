import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/play/$gameId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      params: { gameId: params.gameId, locale: 'en' },
      replace: true,
      to: '/$locale/games/$gameId',
    })
  },
})
