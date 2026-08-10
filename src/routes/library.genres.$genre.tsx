import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/library/genres/$genre')({
  beforeLoad: () => {
    throw redirect({
      params: { locale: 'en' },
      replace: true,
      to: '/$locale',
    })
  },
})
