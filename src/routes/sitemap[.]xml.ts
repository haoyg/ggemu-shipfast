import { getCanonicalOrigin } from '#/lib/canonical-host'
import { editorialBlogPosts } from '#/lib/editorial-blog-index'
import { createFileRoute } from '@tanstack/react-router'

import type { BlogPost, Locale, PublicGame } from '#/lib/ggemu'
import { defaultSeoLocale, getAvailableSeoLocales } from '#/lib/seo'
import {
  getCanonicalGameRouteId,
  isSitemapGameRouteId,
} from '#/lib/game-route-id'
import { getIndexableGameLocales, getIndexableGameRouteIds } from '#/lib/game-index-policy'

const locales = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'pt', 'fr', 'de', 'it'] as const satisfies ReadonlyArray<Locale>
const englishCollectionPaths = [
  '/card-games-that-start-with-m',
  '/pickwick-papers-card-game',
  '/ps5-games-on-xbox-series-x',
  '/arcade-games',
  '/gba-games',
  '/n64-games',
  '/nes-games',
  '/ps1-games',
  '/ps1-compatibility',
  '/sega-genesis-games',
  '/snes-games',
] as const
const localizedCollectionPaths = new Set([
  '/gba-games',
  '/n64-games',
  '/nes-games',
  '/sega-genesis-games',
  '/snes-games',
  '/arcade-games',
  '/ps1-games',
  '/ps1-compatibility',
])
const guideSlugs = [
  'browser-retro-gaming-guide',
  'retro-game-controller-guide',
  'nes-vs-snes-games',
  'retro-platform-comparison',
  'how-browser-game-saves-work',
  'wasm-arcade-review',
] as const
const guidesLastModified = '2026-09-06'

type SitemapEntry = {
  alternateLocales?: ReadonlyArray<Locale>
  locale: Locale
  loc: string
  path: string
  changefreq?: 'daily' | 'weekly' | 'monthly'
  lastmod?: string
  priority?: number
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: ({ request }) => getSitemapResponse(request),
    },
  },
})

export async function getSitemapResponse(request: Request) {
  const url = new URL(request.url)
  const origin = getCanonicalOrigin(url)
  const games = getIndexableGameRouteIds().map((url_slug) => ({ url_slug }))
  const xml = buildSitemapXml(buildSitemapEntries(origin, games, editorialBlogPosts))

  return new Response(xml, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

function getGameRouteId(game: PublicGame) {
  return getCanonicalGameRouteId(game)
}

function getBlogPostRouteId(blogPost: BlogPost) {
  return blogPost.slug?.trim() || blogPost._id?.trim() || ''
}

function buildSitemapEntries(
  origin: string,
  games: Array<PublicGame>,
  blogPosts: Array<BlogPost>,
) {
  const entries: Array<SitemapEntry> = []

  for (const path of englishCollectionPaths) {
    if (localizedCollectionPaths.has(path)) {
      for (const locale of locales) {
        entries.push({
          locale,
          loc: toAbsoluteLocalizedUrl(origin, locale, path),
          path,
          changefreq: 'weekly',
          priority: 0.9,
        })
      }
    } else {
      entries.push({
        alternateLocales: ['en'],
        locale: 'en',
        loc: toAbsoluteLocalizedUrl(origin, 'en', path),
        path,
        changefreq: 'weekly',
        priority: 0.9,
      })
    }
  }

  for (const path of [
    '/guides/brawl-stars',
    '/guides/brawl-stars/creator-codes',
    '/guides/brawl-stars/creator-coffins',
  ]) {
    entries.push({
      alternateLocales: [],
      locale: 'en',
      loc: `${origin}${path}`,
      path,
      changefreq: 'weekly',
      lastmod: '2026-10-28',
      priority: 0.8,
    })
  }

  for (const locale of locales) {
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/'),
      path: '/',
      changefreq: 'daily',
      priority: 1,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/about'),
      path: '/about',
      changefreq: 'weekly',
      priority: 0.4,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/privacy-policy'),
      path: '/privacy-policy',
      changefreq: 'weekly',
      priority: 0.3,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/terms-of-service'),
      path: '/terms-of-service',
      changefreq: 'weekly',
      priority: 0.3,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/copyright-removal'),
      path: '/copyright-removal',
      changefreq: 'weekly',
      priority: 0.3,
    })
    entries.push({
      locale,
      loc: toAbsoluteLocalizedUrl(origin, locale, '/blog'),
      path: '/blog',
      changefreq: 'weekly',
      priority: 0.7,
    })
    if (locale === 'en') {
      entries.push({
        alternateLocales: ['en'],
        locale,
        loc: toAbsoluteLocalizedUrl(origin, locale, '/games/word-ladder'),
        path: '/games/word-ladder',
        changefreq: 'daily',
        priority: 0.8,
      })
      for (const path of ['/games/freedoom-online', '/games/quake-online', '/games/cs-surf']) {
        entries.push({
          alternateLocales: ['en'],
          locale,
          loc: toAbsoluteLocalizedUrl(origin, locale, path),
          path,
          changefreq: 'monthly',
          priority: 0.7,
        })
      }
      entries.push({
        alternateLocales: ['en'],
        locale,
        loc: toAbsoluteLocalizedUrl(origin, locale, '/guides'),
        path: '/guides',
        changefreq: 'weekly',
        priority: 0.7,
      })

      for (const guideSlug of guideSlugs) {
        const path = `/guides/${guideSlug}`
        entries.push({
          alternateLocales: ['en'],
          locale,
          loc: toAbsoluteLocalizedUrl(origin, locale, path),
          path,
          changefreq: 'monthly',
          lastmod: guideSlug === 'wasm-arcade-review' ? '2026-10-13' : guidesLastModified,
          priority: 0.7,
        })
      }
    }

    for (const game of games) {
      const routeId = getGameRouteId(game)
      const indexableLocales = getIndexableGameLocales(game)

      if (!isSitemapGameRouteId(routeId) || !indexableLocales.includes(locale)) {
        continue
      }

      const gameId = encodeURIComponent(routeId)
      const path = `/games/${gameId}`

      entries.push({
        alternateLocales: indexableLocales,
        locale,
        loc: toAbsoluteLocalizedUrl(origin, locale, path),
        path,
        changefreq: 'weekly',
        priority: 0.8,
      })
    }

    for (const blogPost of blogPosts) {
      const blogPostId = encodeURIComponent(getBlogPostRouteId(blogPost))
      const path = `/blog/${blogPostId}`

      entries.push({
        locale,
        loc: toAbsoluteLocalizedUrl(origin, locale, path),
        path,
        changefreq: 'weekly',
        lastmod: blogPost.updated_at || blogPost.created_at,
        priority: 0.6,
      })
    }
  }

  return entries.filter(entry => getAvailableSeoLocales(entry.path).includes(entry.locale))
}

function toAbsoluteLocalizedUrl(origin: string, locale: Locale, path: string) {
  return path === '/' ? `${origin}/${locale}` : `${origin}/${locale}${path}`
}

function buildSitemapXml(entries: Array<SitemapEntry>) {
  const urls = entries.map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${formatSitemapAlternateLinks(entry)}${formatOptionalTag('lastmod', entry.lastmod)}${formatOptionalTag('changefreq', entry.changefreq)}${formatOptionalTag('priority', entry.priority)}
  </url>`,
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

function formatSitemapAlternateLinks(entry: SitemapEntry) {
  if (entry.alternateLocales?.length === 0) return ''

  const origin = new URL(entry.loc).origin
  const alternateLocales = getAvailableSeoLocales(entry.path, entry.alternateLocales ?? locales)
  const links = [
    ...alternateLocales.map((locale) => ({
      href: toAbsoluteLocalizedUrl(origin, locale, entry.path),
      hrefLang: locale,
    })),
    {
      href: toAbsoluteLocalizedUrl(origin, defaultSeoLocale, entry.path),
      hrefLang: 'x-default',
    },
  ]

  return links
    .map(
      (link) => `
    <xhtml:link rel="alternate" hreflang="${escapeXml(link.hrefLang)}" href="${escapeXml(link.href)}" />`,
    )
    .join('')
}

function formatOptionalTag(name: string, value: string | number | undefined) {
  if (value === undefined) {
    return ''
  }

  return `
    <${name}>${escapeXml(String(value))}</${name}>`
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
