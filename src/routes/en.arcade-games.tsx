import { createFileRoute } from '@tanstack/react-router'

import { ArcadeGamesPage, arcadeFaqs } from '#/components/arcade-games-page'
import { searchGames } from '#/lib/ggemu'
import { getSeoOrigin } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

const title = 'Play Classic Arcade Games Online Free | POKOPIE'
const description =
  'Play classic arcade games online in your browser. Browse fighting, shoot ’em up, beat ’em up, puzzle, racing, and platform games with no separate emulator download.'

export const Route = createFileRoute('/en/arcade-games')({
  loader: async () => {
    const [origin, result] = await Promise.all([
      getSeoOrigin(),
      searchGames({
        data: {
          limit: 24,
          locale: 'en',
          page: 1,
          platform: 'Arcade',
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
    const canonicalUrl = `${loaderData?.origin ?? ''}/en/arcade-games`

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
  component: ArcadeGamesRoute,
})

function ArcadeGamesRoute() {
  const { games, pagination } = Route.useLoaderData()

  return <ArcadeGamesPage games={games} total={pagination.total} />
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
        name: 'Play Classic Arcade Games Online',
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
            name: 'Arcade Games',
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
        mainEntity: arcadeFaqs.map((faq) => ({
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
