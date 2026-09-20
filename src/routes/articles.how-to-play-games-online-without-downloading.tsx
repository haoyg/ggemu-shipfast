import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getBlogPostDetailPageData } from '#/lib/ggemu'

const articleId = 'how-to-play-games-online-without-downloading'

export const Route = createFileRoute('/articles/how-to-play-games-online-without-downloading')({
  beforeLoad: async () => {
    const detail = await getBlogPostDetailPageData({
      data: { id: articleId, locale: 'en' },
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
