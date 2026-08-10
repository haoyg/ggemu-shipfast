import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$blogId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      params: { blogId: params.blogId, locale: 'en' },
      replace: true,
      to: '/$locale/blog/$blogId',
    })
  },
})
