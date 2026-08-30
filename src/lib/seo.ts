import { createServerFn } from '@tanstack/react-start'
import { getRequestUrl } from '@tanstack/react-start/server'

import type { Locale } from '#/lib/ggemu'
import { normalizeLocale } from '#/lib/i18n'

export const seoLocales = ['zh-CN', 'en', 'ja'] as const satisfies ReadonlyArray<Locale>
export const defaultSeoLocale = 'en' satisfies Locale

export const getSeoOrigin = createServerFn({ method: 'GET' }).handler(() => {
  return getRequestUrl({ xForwardedHost: true }).origin
})

export function getDocumentLang(pathname: string) {
  const [, locale] = pathname.split('/')

  return normalizeLocale(locale)
}

export function getLocalizedSeoLinks({
  alternateLocales = seoLocales,
  locale,
  origin,
  path,
}: {
  alternateLocales?: ReadonlyArray<Locale>
  locale: Locale
  origin: string
  path: string
}) {
  const canonicalUrl = toAbsoluteLocalizedUrl(origin, locale, path)

  return getSeoLinksFromCanonical(canonicalUrl, alternateLocales)
}

export function getSeoLinksFromCanonical(
  canonicalUrl: string,
  alternateLocales: ReadonlyArray<Locale> = seoLocales,
) {
  return [
    { rel: 'canonical', href: canonicalUrl },
    ...getAlternateLinksFromCanonical(canonicalUrl, alternateLocales),
  ]
}

export function getAlternateLinksFromCanonical(
  canonicalUrl: string,
  alternateLocales: ReadonlyArray<Locale> = seoLocales,
) {
  const url = new URL(canonicalUrl)
  const [, localeSegment, ...pathParts] = url.pathname.split('/')
  const locale = normalizeLocale(localeSegment)

  return getLocalizedAlternateLinks(
    url.origin,
    `/${pathParts.join('/')}`,
    locale,
    alternateLocales,
  )
}

function getLocalizedAlternateLinks(
  origin: string,
  path: string,
  currentLocale: Locale,
  alternateLocales: ReadonlyArray<Locale>,
) {
  const availableLocales = Array.from(
    new Set([...alternateLocales, currentLocale]),
  )
  const xDefaultLocale = availableLocales.includes(defaultSeoLocale)
    ? defaultSeoLocale
    : currentLocale

  return [
    ...availableLocales.map((locale) => ({
      rel: 'alternate',
      hrefLang: locale,
      href: toAbsoluteLocalizedUrl(origin, locale, path),
    })),
    {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: toAbsoluteLocalizedUrl(origin, xDefaultLocale, path),
    },
  ]
}

function toAbsoluteLocalizedUrl(origin: string, locale: Locale, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const localizedPath = normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`

  return `${origin}${localizedPath}`
}
