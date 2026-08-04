import type { BlogPost, Locale } from '#/lib/ggemu'

export function buildArticleStructuredData({
  blogPost,
  canonicalUrl,
  description,
  locale,
  siteName,
}: {
  blogPost: BlogPost
  canonicalUrl: string
  description: string
  locale: Locale
  siteName: string
}) {
  const origin = new URL(canonicalUrl).origin
  const organizationId = `${origin}/#organization`
  const authorId = `${origin}/#editorial-team`

  return {
    '@context': 'https://schema.org',
    '@id': `${canonicalUrl}#article`,
    '@type': 'Article',
    author: {
      '@id': authorId,
      '@type': 'Organization',
      name: `${siteName} Editorial Team`,
      parentOrganization: { '@id': organizationId },
      url: `${origin}/${locale}/about`,
    },
    dateModified: blogPost.updated_at,
    datePublished: blogPost.created_at,
    description,
    headline: blogPost.title,
    image: blogPost.cover_image_url,
    inLanguage: locale,
    isAccessibleForFree: true,
    mainEntityOfPage: {
      '@id': canonicalUrl,
      '@type': 'WebPage',
    },
    publisher: {
      '@id': organizationId,
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/logo.png`,
      },
      name: siteName,
      url: origin,
    },
    url: canonicalUrl,
  }
}

export function getArticleMetaCopy(locale: Locale, siteName: string) {
  if (locale === 'zh-CN') {
    return {
      author: `${siteName} \u7f16\u8f91\u56e2\u961f`,
      published: '\u53d1\u5e03\u4e8e',
      updated: '\u66f4\u65b0\u4e8e',
    }
  }

  if (locale === 'ja') {
    return {
      author: `${siteName} \u7de8\u96c6\u30c1\u30fc\u30e0`,
      published: '\u516c\u958b',
      updated: '\u66f4\u65b0',
    }
  }

  return {
    author: `${siteName} Editorial Team`,
    published: 'Published',
    updated: 'Updated',
  }
}

export function hasDistinctUpdatedDate(
  publishedAt: string | undefined,
  updatedAt: string | undefined,
) {
  const publishedDate = toIsoDate(publishedAt)
  const updatedDate = toIsoDate(updatedAt)

  return Boolean(publishedDate && updatedDate && publishedDate !== updatedDate)
}

function toIsoDate(value: string | undefined) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}
