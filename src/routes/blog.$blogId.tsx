import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$blogId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      params: { blogId: params.blogId, locale: 'en' },
      replace: true,
      statusCode: 301,
      to: '/$locale/blog/$blogId',
    })
  },
})
