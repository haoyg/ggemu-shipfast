import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { SiteLayout } from '#/components/site-layout'
import { normalizeLocale } from '#/lib/i18n'
import { getLocalizedSeoLinks, getSeoOrigin } from '#/lib/seo'
import { useCurrentSiteTheme } from '#/lib/use-site-theme'
import type { Locale } from '#/lib/ggemu'

const GGEMU_ORIGIN = 'https://ggemu.com'

const crossOriginIsolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Permissions-Policy': 'cross-origin-isolated=(self "https://ggemu.com")',
} as const

type PlayMyRomSearch = {
  isolated?: 1
}

const playMyRomCopies: Record<Locale, { title: string; description: string }> = {
  'zh-CN': {
    title: '玩本地 ROM',
    description: '通过 POKOPIE 的嵌入式播放器加载并游玩你自己的 ROM。',
  },
  en: {
    title: 'Play My ROM',
    description: 'Load and play your own ROM through the embedded POKOPIE player.',
  },
  ja: {
    title: '自分の ROM で遊ぶ',
    description: 'POKOPIEの埋め込みプレイヤーで自分の ROM を読み込んで遊べます。',
  },
}

function validatePlayMyRomSearch(search: Record<string, unknown>): PlayMyRomSearch {
  return {
    isolated: isIsolatedSearchValue(search.isolated) ? 1 : undefined,
  }
}

function isIsolatedSearch(search: unknown) {
  return (
    Boolean(search) &&
    typeof search === 'object' &&
    isIsolatedSearchValue((search as Record<string, unknown>).isolated)
  )
}

export const Route = createFileRoute('/$locale/play-my-rom')({
  validateSearch: validatePlayMyRomSearch,
  loader: () => getSeoOrigin(),
  headers: ({ match }) =>
    isIsolatedSearch(match.search) ? crossOriginIsolationHeaders : undefined,
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const copy = playMyRomCopies[locale]

    return {
      links: loaderData
        ? getLocalizedSeoLinks({
            locale,
            origin: loaderData,
            path: '/play-my-rom',
          })
        : undefined,
      meta: [
        { title: copy.title },
        {
          name: 'description',
          content: copy.description,
        },
      ],
    }
  },
  component: PlayMyRomPage,
})

function PlayMyRomPage() {
  const { locale } = Route.useParams()
  const { isolated } = Route.useSearch()
  const lang = normalizeLocale(locale)
  const copy = playMyRomCopies[lang]
  const theme = useCurrentSiteTheme()
  const [loadedFrameSrc, setLoadedFrameSrc] = useState<string | null>(null)
  const iframeSrc = `${GGEMU_ORIGIN}/${lang}/play-my-rom?${buildIframeSearch(isolated === 1, theme)}`
  const isFrameLoading = loadedFrameSrc !== iframeSrc

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== GGEMU_ORIGIN || !isIsolatedMessage(event.data)) {
        return
      }

      const url = new URL(window.location.href)

      if (url.searchParams.get('isolated') === '1') {
        return
      }

      url.searchParams.set('isolated', '1')
      const nextUrl = url.toString()

      window.location.href = nextUrl
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (!window.crossOriginIsolated) {
        return
      }

      window.setTimeout(() => {
        const url = new URL(window.location.href)

        url.searchParams.delete('isolated')
        window.location.href = url.toString()
      }, 0)
    }
  }, [])

  return (
    <SiteLayout locale={lang}>
      <section className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-base-content/65 sm:text-base">
            {copy.description}
          </p>
        </header>

        <div className="relative min-h-[32rem] flex-1 overflow-hidden rounded-lg border border-base-300 bg-base-200">
          <iframe
            allow={
              isolated === 1
                ? 'fullscreen; gamepad; autoplay; cross-origin-isolated'
                : 'fullscreen; gamepad; autoplay'
            }
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 bg-base-100"
            onLoad={() => setLoadedFrameSrc(iframeSrc)}
            src={iframeSrc}
            title={copy.title}
          />
          {isFrameLoading ? (
            <div
              aria-live="polite"
              className="absolute inset-0 z-10 grid place-items-center bg-base-200"
              role="status"
            >
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : null}
        </div>
      </section>
    </SiteLayout>
  )
}

function buildIframeSearch(isIsolated: boolean, theme: string) {
  const params = new URLSearchParams({
    embed: '1',
    theme,
  })

  if (isIsolated) {
    params.set('isolated', '1')
  }

  return params.toString()
}

function isIsolatedSearchValue(value: unknown) {
  return value === 1 || value === '1'
}

function isIsolatedMessage(data: unknown) {
  return (
    Boolean(data) &&
    typeof data === 'object' &&
    (data as Record<string, unknown>).type === 'isolated'
  )
}
