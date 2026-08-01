import { createFileRoute } from '@tanstack/react-router'

import type { Locale } from '#/lib/ggemu'
import { getI18n, normalizeLocale } from '#/lib/i18n'
import { siteConfig } from '#/lib/site-config'

const manifestCacheMaxAge = 60 * 60

type WebAppManifest = {
  short_name: string
  name: string
  description: string
  lang: string
  icons: Array<{
    src: string
    sizes: string
    purpose: string
    type?: string
  }>
  id: string
  start_url: string
  scope: string
  display: 'standalone'
  theme_color: string
  background_color: string
  prefer_related_applications: false
}

export const Route = createFileRoute('/manifest.webmanifest')({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(JSON.stringify(buildManifest(request)), {
          headers: {
            'Cache-Control': `public, max-age=${manifestCacheMaxAge}`,
            'Content-Type': 'application/manifest+json; charset=utf-8',
          },
        }),
    },
  },
})

function buildManifest(request: Request): WebAppManifest {
  const url = new URL(request.url)
  const locale = getManifestLocale(url, request.headers.get('referer'))
  const name = getSearchValue(url, 'name') || siteConfig.SITE_NAME
  const description =
    getSearchValue(url, 'description') || getI18n(locale).homeSeo.description
  const startUrl = normalizeStartUrl(getSearchValue(url, 'start_url'), locale)

  return {
    short_name: name,
    name,
    description,
    lang: locale,
    icons: buildIcons(),
    id: startUrl,
    start_url: startUrl,
    scope: getScope(startUrl),
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
    prefer_related_applications: false,
  }
}

function buildIcons() {
  return [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      purpose: 'any maskable',
      type: 'image/png',
    },
    {
      src: '/icon-512.png',
      sizes: '512x512',
      purpose: 'any',
      type: 'image/png',
    },
  ]
}

function getSearchValue(url: URL, key: string) {
  return url.searchParams.get(key)?.trim() ?? ''
}

function getManifestLocale(url: URL, referer: string | null): Locale {
  return (
    getLocaleFromPath(url.searchParams.get('start_url')) ||
    getLocaleFromValue(url.searchParams.get('locale')) ||
    getLocaleFromPath(referer) ||
    'zh-CN'
  )
}

function getLocaleFromValue(value: string | null) {
  return value === 'en' || value === 'ja' || value === 'zh-CN'
    ? normalizeLocale(value)
    : undefined
}

function getLocaleFromPath(value: string | null) {
  if (!value) {
    return undefined
  }

  try {
    const url = new URL(value, 'https://pokopie.local')
    const locale = url.pathname.split('/').filter(Boolean)[0]

    return getLocaleFromValue(locale)
  } catch {
    return undefined
  }
}

function normalizeStartUrl(value: string, locale: Locale) {
  if (!value) {
    return `/${locale}`
  }

  try {
    const url = new URL(value, 'https://ggemu.local')

    return `${url.pathname}${url.search}${url.hash}` || '/'
  } catch {
    return '/'
  }
}

function getScope(startUrl: string) {
  const directory = startUrl.endsWith('/')
    ? startUrl
    : startUrl.slice(0, startUrl.lastIndexOf('/') + 1)

  return directory || '/'
}
