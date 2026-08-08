import type { Locale } from '#/lib/ggemu'

type HomeFaq = {
  items: Array<{
    answer: string
    question: string
  }>
}

export function buildBrandedTitle(title: string, siteName: string) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`
}

export function buildHomeStructuredData({
  canonicalUrl,
  description,
  faq,
  locale,
  origin,
  siteEmail,
  siteName,
  title,
}: {
  canonicalUrl: string
  description: string
  faq: HomeFaq
  locale: Locale
  origin: string
  siteEmail: string
  siteName: string
  title: string
}) {
  const organizationId = `${origin}/#organization`
  const websiteId = `${origin}/#website`
  const webpageId = `${canonicalUrl}#webpage`
  const faqId = `${canonicalUrl}#faq`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': organizationId,
        '@type': 'Organization',
        email: siteEmail,
        logo: {
          '@type': 'ImageObject',
          url: `${origin}/logo.png`,
        },
        name: siteName,
        url: origin,
        sameAs: [
          'https://twitter.com/pokopie',
          'https://www.facebook.com/pokopie',
          'https://www.youtube.com/@pokopie',
          'https://www.instagram.com/pokopie',
        ],
      },
      {
        '@id': websiteId,
        '@type': 'WebSite',
        inLanguage: ['zh-CN', 'en', 'ja'],
        name: siteName,
        publisher: { '@id': organizationId },
        url: origin,
      },
      {
        '@id': webpageId,
        '@type': 'WebPage',
        about: { '@id': organizationId },
        description,
        inLanguage: locale,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': faqId },
        name: title,
        url: canonicalUrl,
      },
      {
        '@id': faqId,
        '@type': 'FAQPage',
        inLanguage: locale,
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
          name: item.question,
        })),
      },
    ],
  }
}
