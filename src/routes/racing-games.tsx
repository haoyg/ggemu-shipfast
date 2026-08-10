import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/racing-games')({
  beforeLoad: () => {
    throw redirect({
      params: { locale: 'en' },
      replace: true,
      to: '/$locale',
    })
  },
})
