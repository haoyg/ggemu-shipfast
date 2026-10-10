import type { FeaturedBrowserGame } from '#/lib/featured-browser-games'

export function buildExternalBrowserGameHead(game: FeaturedBrowserGame, origin?: string) {
  const canonicalUrl = `${origin ?? ''}${game.canonicalPath}`
  const pageTitle = `${game.title} – Play in Your Browser | POKOPIE`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: game.title,
      description: game.description,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: 'POKOPIE', url: origin ?? '' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: game.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return {
    links: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [
      { title: pageTitle },
      { name: 'description', content: game.description },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: game.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: game.description },
    ],
    scripts: structuredData.map((data) => ({
      type: 'application/ld+json',
      children: JSON.stringify(data).replace(/</g, '\\u003c'),
    })),
  }
}
