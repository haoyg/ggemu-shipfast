import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/articles/$articleId')({
  beforeLoad: () => {
    throw redirect({
      params: { locale: 'en' },
      replace: true,
      to: '/$locale/blog',
    })
  },
})
