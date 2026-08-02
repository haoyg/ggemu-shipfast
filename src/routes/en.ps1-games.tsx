import { createFileRoute } from '@tanstack/react-router'

import { Ps1GamesPage, ps1Faqs } from '#/components/ps1-games-page'
import { searchGames } from '#/lib/ggemu'
import { getSeoOrigin } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

const title = 'Play PS1 Games Online Free | No Download | POKOPIE'
const description =
  'Play PS1 games online in your browser. Browse classic PlayStation RPGs, racing, action, and fighting games with no separate emulator download.'

export const Route = createFileRoute('/en/ps1-games')({
  loader: async () => {
    const [origin, result] = await Promise.all([
      getSeoOrigin(),
      searchGames({
        data: {
          limit: 24,
          locale: 'en',
          page: 1,
          platform: 'PlayStation 1',
          sort: 'popular',
        },
      }).catch(() => ({
        games: [],
        pagination: { limit: 24, page: 1, pages: 0, total: 0 },
      })),
    ])

    return { origin, ...result }
  },
  head: ({ loaderData }) => {
    const canonicalUrl = `${loaderData?.origin ?? ''}/en/ps1-games`

    return {
      links: loaderData?.origin
        ? [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'en', href: canonicalUrl },
            { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
          ]
        : undefined,
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      scripts: loaderData?.origin
        ? buildStructuredDataScripts(canonicalUrl, loaderData.games)
        : undefined,
    }
  },
  component: Ps1GamesRoute,
})

function Ps1GamesRoute() {
  const { games, pagination } = Route.useLoaderData()

  return <Ps1GamesPage games={games} total={pagination.total} />
}

function buildStructuredDataScripts(
  canonicalUrl: string,
  games: Awaited<ReturnType<typeof searchGames>>['games'],
) {
  const origin = new URL(canonicalUrl).origin
  const itemList = games.slice(0, 18).map((game, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${origin}/en/games/${encodeURIComponent(game.url_slug || game._id || '')}`,
    name: game.name,
  }))

  return [
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Play PS1 Games Online',
        description,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: siteConfig.SITE_NAME,
          url: origin,
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: itemList.length,
          itemListElement: itemList,
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/en`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'PS1 Games',
            item: canonicalUrl,
          },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: ps1Faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    },
  ]
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
