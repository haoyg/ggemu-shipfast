import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/articles/how-to-play-games-online-without-downloading')({
  beforeLoad: () => {
    throw redirect({
      params: { locale: 'en' },
      replace: true,
      to: '/$locale/blog',
    })
  },
})
