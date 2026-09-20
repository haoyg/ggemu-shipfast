import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getBlogPostDetailPageData } from '#/lib/ggemu'

export const Route = createFileRoute('/articles/$articleId')({
  beforeLoad: async ({ params }) => {
    const detail = await getBlogPostDetailPageData({
      data: { id: params.articleId, locale: 'en' },
    }).catch(() => null)
    const blogId = detail?.blogPost.slug?.trim() || detail?.blogPost._id?.trim()

    if (!blogId) {
      throw notFound()
    }

    throw redirect({
      params: { blogId, locale: 'en' },
      replace: true,
      statusCode: 301,
      to: '/$locale/blog/$blogId',
    })
  },
})
