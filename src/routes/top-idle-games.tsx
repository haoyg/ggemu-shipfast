import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/top-idle-games')({
  beforeLoad: () => {
    throw redirect({
      params: { locale: 'en' },
      replace: true,
      to: '/$locale/blog',
    })
  },
})
