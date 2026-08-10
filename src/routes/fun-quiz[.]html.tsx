import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/fun-quiz.html')({
  beforeLoad: () => {
    throw redirect({
      params: { locale: 'en' },
      replace: true,
      to: '/$locale',
    })
  },
})
