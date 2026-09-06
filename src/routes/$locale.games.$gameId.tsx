import { trackEvent } from '#/lib/analytics'
import { getBrowserPlayGuide } from '#/lib/game-detail-content'
import {
  Link,
  Outlet,
  createFileRoute,
  notFound,
  redirect,
  useRouterState,
} from '@tanstack/react-router'
import { GameInstallButton } from '#/components/game-install-button'
import { GameEmbedCard, GameShareActions } from '#/components/game-share-actions'
import { EmbeddedGamePlayer } from '#/components/embedded-game-player'
import { SiteLayout } from '#/components/site-layout'
import {
  UnavailablePage,
  getUnavailableCopy,
} from '#/components/unavailable-page'
import { saveRecentPlayedGame } from '#/components/home/recent-played-games'
import {
  getGameDetailPageData,
  getRelatedGamePageData,
  type Locale,
  type PublicGame,
} from '#/lib/ggemu'
import {
  getKeywordItems,
} from '#/lib/game-share-text'
import {
  buildGameDetailSeo,
  getGameDetailFaqs,
  getGameDetailKeywordText,
  getGameDetailSummary,
  getI18n,
  getLocalizedCategoryLabels,
  getLocalizedPlatformLabel,
  normalizeLocale,
} from '#/lib/i18n'
import { getRetroCoverFallbackLabel } from '#/lib/locale-labels'
import {
  getGameSeoInternalLinks,
  type GameSeoInternalLink,
} from '#/lib/game-seo-links'
import { getTargetedGameSeo } from '#/lib/game-seo-targets'
import {
  getGameDescriptionParagraphs,
  getGameHowToPlayParagraphs,
  getGameSidebarContent,
} from '#/lib/game-detail-content'
import { getAlternateLinksFromCanonical } from '#/lib/seo'

const removedLegacyGameIds = new Set([
  's-c-a-t-nes-1991',
  'superman-the-new-superman-adventures-n64-1999',
])

export const Route = createFileRoute('/$locale/games/$gameId')({
  beforeLoad: ({ location, params }) => {
    if (isSimplifiedChineseLocaleAlias(params.locale)) {
      throw redirect({
        params: { gameId: params.gameId, locale: 'zh-CN' },
        replace: true,
        to: '/$locale/games/$gameId',
      })
    }

    if (location.pathname.endsWith('/play') || !location.searchStr) {
      return undefined as never
    }

    throw redirect({
      params,
      replace: true,
      to: '/$locale/games/$gameId',
    })
  },
  loader: async ({ params }) => {
    const locale = normalizeLocale(params.locale)
    const detail = await getGameDetailPageData({
      data: { id: params.gameId, locale },
    }).catch(() => null)

    if (!detail) {
      if (removedLegacyGameIds.has(params.gameId)) {
        throw redirect({
          params: { locale },
          replace: true,
          to: '/$locale',
        })
      }

      throw notFound({
        data: { locale },
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }

    const currentId = getGameRouteId(detail.game) || params.gameId

    if (currentId !== params.gameId) {
      throw redirect({
        params: { gameId: currentId, locale },
        replace: true,
        to: '/$locale/games/$gameId',
      })
    }

    const relatedGames = await getRelatedGamePageData({
      data: {
        category: detail.game.categories?.[0],
        currentId,
        developer: detail.game.developer,
      },
    }).catch(() => ({
      relatedByCategory: [],
      relatedByDeveloper: [],
    }))

    return {
      ...detail,
      kind: 'ready' as const,
      relatedGames,
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      const locale = normalizeLocale(params.locale)
      const t = getUnavailableCopy(locale, 'game')

      return {
        meta: [
          { title: t.title },
          { name: 'description', content: t.description },
          { name: 'robots', content: 'noindex,nofollow' },
        ],
      }
    }

    const { canonicalUrl, game } = loaderData
    const locale = normalizeLocale(params.locale)
    const seo = getTargetedGameSeo(game, locale) ?? buildGameDetailSeo(game, locale)
    const image = game.game_cover
    const faqItems = getGameDetailFaqs(game, locale)
    const structuredData = buildGameStructuredData({
      canonicalUrl,
      faqItems,
      game,
      locale,
      seo,
    })

    return {
      links: [
        { rel: 'canonical', href: canonicalUrl },
        {
          rel: 'manifest',
          href: buildGameManifestHref(locale),
        },
        ...getAlternateLinksFromCanonical(canonicalUrl),
      ],
      meta: [
        { title: seo.title },
        { name: 'description', content: seo.description },
        { name: 'keywords', content: seo.keywords },
        { property: 'og:title', content: seo.title },
        { property: 'og:description', content: seo.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:locale', content: toOpenGraphLocale(locale) },
        ...(image ? [{ property: 'og:image', content: image }] : []),
        { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
        { name: 'twitter:title', content: seo.title },
        { name: 'twitter:description', content: seo.description },
        ...(image ? [{ name: 'twitter:image', content: image }] : []),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: serializeJsonLd(structuredData),
        },
      ],
    }
  },
  notFoundComponent: GameDetailNotFound,
  component: LocalizedGameDetailPage,
})

function isSimplifiedChineseLocaleAlias(value: string) {
  if (value === 'zh-CN') {
    return false
  }

  const normalized = value.toLowerCase()

  return normalized === 'zh-cn' || normalized === 'zh'
}

function GameDetailNotFound({ data }: { data?: unknown }) {
  return <UnavailablePage locale={getNotFoundLocale(data)} type="game" />
}

function getNotFoundLocale(data: unknown) {
  if (data && typeof data === 'object' && 'locale' in data) {
    return normalizeLocale((data as { locale?: unknown }).locale)
  }

  return normalizeLocale(undefined)
}

function getRelatedGames(
  relatedByCategory: Array<PublicGame>,
  relatedByDeveloper: Array<PublicGame>,
) {
  const seen = new Set<string>()

  return [...relatedByCategory, ...relatedByDeveloper]
    .filter((game) => {
      const id = getGameRouteId(game)

      if (!id || seen.has(id)) {
        return false
      }

      seen.add(id)
      return true
    })
    .slice(0, 6)
}

function getGameRouteId(game: PublicGame) {
  return game.url_slug?.trim() || game._id?.trim() || ''
}

function buildGamePlayPath(locale: Locale, gameId: string) {
  return `/${locale}/games/${encodeURIComponent(gameId)}/play`
}

function buildGameEmbedUrl(canonicalUrl: string, locale: Locale, gameId: string) {
  const url = new URL(`/embed/${locale}/games/${encodeURIComponent(gameId)}`, canonicalUrl)

  url.searchParams.set('utm_source', 'embed')
  url.searchParams.set('utm_medium', 'iframe')
  return url.toString()
}

function buildGameManifestHref(locale: Locale) {
  const params = new URLSearchParams({
    locale,
  })

  return `/manifest.webmanifest?${params.toString()}`
}

function toOpenGraphLocale(locale: Locale) {
  if (locale === 'zh-CN') {
    return 'zh_CN'
  }

  return locale
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function buildGameStructuredData({
  canonicalUrl,
  faqItems,
  game,
  locale,
  seo,
}: {
  canonicalUrl: string
  faqItems: ReturnType<typeof getGameDetailFaqs>
  game: PublicGame
  locale: Locale
  seo: ReturnType<typeof buildGameDetailSeo>
}) {
  const homeUrl = new URL(`/${locale}`, canonicalUrl).toString()
  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    '@id': `${canonicalUrl}#game`,
    name: game.name,
    description: seo.description,
    url: canonicalUrl,
    image: game.game_cover,
    gamePlatform: game.platform,
    applicationCategory: 'Game',
    genre: game.categories,
    inLanguage: game.languages,
    numberOfPlayers: game.players,
    publisher: game.developer
      ? {
          '@type': 'Organization',
          name: game.developer,
        }
      : undefined,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: getI18n(locale).detail.home,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: game.name,
        item: canonicalUrl,
      },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const schemas: unknown[] = [removeEmptySchemaValues(gameSchema), breadcrumbSchema]

  if (faqItems.length > 0) {
    schemas.push(faqSchema)
  }

  const howToSteps = getGameHowToPlayParagraphs(game, locale)
  if (howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to play ${game.name}`,
      description: seo.description,
      step: howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        name: String(index + 1),
        text: step,
      })),
    })
  }

  return schemas
}

function removeEmptySchemaValues<T extends Record<string, unknown>>(schema: T) {
  return Object.fromEntries(
    Object.entries(schema).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }

      return value !== undefined && value !== ''
    }),
  )
}

function LocalizedGameDetailPage() {
  const data = Route.useLoaderData()!
  const { gameId, locale } = Route.useParams()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const lang = normalizeLocale(locale)
  const t = getI18n(lang).detail

  const { canonicalUrl, game, relatedGames } = data
  const categories = getLocalizedCategoryLabels(game.categories, lang)
  const languages = game.languages ?? []
  const platformLabel = getLocalizedPlatformLabel(game.platform, lang)
  const faqItems = getGameDetailFaqs(game, lang)
  const summary = getGameDetailSummary(game, lang)
  const keywordText = getGameDetailKeywordText(game, lang)
  const descriptionParagraphs = getGameDescriptionParagraphs(game, lang)
  const howToPlayParagraphs = getGameHowToPlayParagraphs(game, lang)
  const browserGuide = getBrowserPlayGuide(lang)
  const sidebarContent = getGameSidebarContent(game, lang)
  const playPath = buildGamePlayPath(lang, gameId)
  const embedUrl = buildGameEmbedUrl(canonicalUrl, lang, gameId)
  const manifestHref = buildGameManifestHref(lang)
  const targetedSeo = getTargetedGameSeo(game, lang)
  const seoInternalLinks = getGameSeoInternalLinks(game, lang)
  const relatedGuide = lang === 'en' ? getRelatedGuideForPlatform(game.platform) : undefined

  if (pathname.endsWith('/play')) {
    return <Outlet />
  }

  return (
    <SiteLayout locale={lang}>
      <div className="bg-base-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
          <section>
            <div className="breadcrumbs text-sm">
              <ul className="min-w-0">
                <li>
                  <Link params={{ locale: lang }} search={{}} to="/$locale">
                    {t.home}
                  </Link>
                </li>
                <li className="min-w-0">
                  <span className="block max-w-[min(70vw,32rem)] truncate">{game.name}</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(320px,440px)_1fr] lg:gap-8">
            <div className="flex min-w-0 flex-col gap-4">
              <div
                className="group relative aspect-[4/3] w-full self-start overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-sm"
              >
                {game.game_cover ? (
                  <img
                    alt={game.name ?? 'Game cover'}
                    className="h-full w-full object-cover"
                    decoding="async"
                    fetchPriority="high"
                    height="660"
                    src={game.game_cover}
                    width="880"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-base-300 text-base-content/40">
                    {getRetroCoverFallbackLabel(lang)}
                  </div>
                )}
              </div>

              <ArticlePanel
                paragraphs={descriptionParagraphs}
                title={t.overview}
              />
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-3 sm:gap-6 lg:self-center">
              <div>
                <div className="mb-2 flex flex-wrap gap-2 sm:mb-3">
                  <span className="badge badge-sm badge-success badge-outline gap-1 sm:badge-md">
                    <i className="ri-global-line" />
                    {t.browserReady}
                  </span>
                  <span className="badge badge-sm badge-primary badge-outline gap-1 sm:badge-md">
                    <i className="ri-download-cloud-2-line" />
                    {t.noDownload}
                  </span>
                  {platformLabel ? (
                    <span className="badge badge-sm badge-primary max-w-full gap-1 sm:badge-md">
                      <i className="ri-gamepad-line" />
                      <span className="truncate">{platformLabel}</span>
                    </span>
                  ) : null}
                </div>
                <h1 className="max-w-4xl text-2xl font-semibold leading-tight sm:text-4xl">
                  {targetedSeo?.heading ?? game.name}
                </h1>
                <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-base-content/70 sm:mt-4 sm:line-clamp-none sm:text-lg sm:leading-7">
                  {summary}
                </p>
              </div>

              <div className="grid gap-3 sm:flex sm:flex-row">
                <div className="grid gap-1 sm:w-auto">
                  <a
                    className="btn btn-primary btn-lg w-full px-8 text-primary-content hover:text-primary-content sm:w-auto"
                    href={targetedSeo ? '#play-online' : playPath}
                    onClick={() => {
                      saveRecentPlayedGame(game, gameId)
                      trackEvent('game_play_click', { game_id: gameId, source: 'detail' })
                    }}
                    rel={targetedSeo ? undefined : 'noopener noreferrer'}
                    target={targetedSeo ? undefined : '_blank'}
                  >
                    <i className={targetedSeo ? 'ri-play-fill text-xl' : 'ri-external-link-line'} />
                    {targetedSeo ? t.play : t.playPage}
                  </a>
                  {!targetedSeo ? (
                    <p className="text-center text-xs text-base-content/65 sm:text-left">
                      {t.playPageHint}
                    </p>
                  ) : null}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:contents">
                  <GameInstallButton labels={t} manifestHref={manifestHref} />
                  <GameShareActions
                    canonicalUrl={canonicalUrl}
                    embedUrl={embedUrl}
                    game={game}
                    labels={t}
                  />
                </div>
              </div>

              <GameEmbedCard
                canonicalUrl={canonicalUrl}
                embedUrl={embedUrl}
                labels={t}
                title={game.name || 'POKOPIE'}
              />

              <div className="grid grid-cols-2 gap-4 text-left sm:max-w-md sm:gap-6">
                <Stat label={t.plays} value={game.plays_count ?? 0} />
                <Stat label={t.views} value={game.views_count ?? 0} />
              </div>
            </div>
          </section>

          {targetedSeo ? (
            <EmbeddedGamePlayer
              description={targetedSeo.description}
              game={game}
              gameId={gameId}
              heading={targetedSeo.heading}
              locale={lang}
              playPath={playPath}
            />
          ) : null}

          <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="flex flex-col gap-6">
              <KeywordPanel title={t.keywords} value={keywordText} />
              <ArticlePanel paragraphs={howToPlayParagraphs} title={t.howToPlay} />
              <ArticlePanel paragraphs={browserGuide.paragraphs} title={browserGuide.title} />
              {relatedGuide ? (
                <section className="rounded-box border border-primary/25 bg-primary/5 p-5 shadow-sm">
                  <h2 className="text-lg font-semibold">Related guide</h2>
                  <p className="mt-2 text-sm leading-6 text-base-content/70">{relatedGuide.description}</p>
                  <a className="link link-primary mt-3 inline-block" href={relatedGuide.href}>{relatedGuide.label}</a>
                </section>
              ) : null}
              <SeoInternalLinkSection lang={lang} links={seoInternalLinks} />
              <FaqSection items={faqItems} title={t.faq} />
              <RelatedGameSection
                games={getRelatedGames(
                  relatedGames.relatedByCategory,
                  relatedGames.relatedByDeveloper,
                )}
                lang={lang}
                title={t.relatedGames}
              />
            </div>

            <aside className="order-first flex flex-col gap-4 lg:order-none lg:sticky lg:top-24 lg:self-start">
              <section className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
                <h2 className="text-lg font-semibold">{t.details}</h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  <Fact icon="ri-gamepad-line" label={t.platform} value={platformLabel} />
                  <Fact icon="ri-building-2-line" label={t.developer} value={game.developer} />
                  <Fact icon="ri-calendar-line" label={t.released} value={game.released_year} />
                  <Fact icon="ri-user-line" label={t.players} value={String(game.players ?? 1)} />
                </dl>
              </section>

              {browserGuide.paragraphs[0] ? (
                <section className="rounded-box border border-primary/25 bg-primary/5 p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <i className="ri-gamepad-line text-primary" />
                    {browserGuide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-base-content/70">
                    {browserGuide.paragraphs[0]}
                  </p>
                </section>
              ) : null}

              <SidebarArticle
                icon="ri-book-open-line"
                text={sidebarContent.background}
                title={sidebarContent.backgroundTitle}
              />

              <SidebarTips
                items={sidebarContent.tips}
                title={sidebarContent.tipsTitle}
              />

              <TagSection emptyText={t.noData} items={categories} title={t.categories} />
              <TagSection emptyText={t.noData} items={languages} title={t.languages} />
            </aside>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}

function getRelatedGuideForPlatform(platform?: string) {
  if (platform === 'Famicom' || platform === 'Super Famicom') {
    return {
      href: '/en/guides/nes-vs-snes-games',
      label: 'Read: NES vs SNES Games',
      description: 'Compare the two libraries, their controller layouts, and the kinds of sessions they suit.',
    }
  }

  if (platform === 'Nintendo 64') {
    return {
      href: '/en/guides/retro-game-controller-guide',
      label: 'Read: Retro Game Controller Guide',
      description: 'Learn why controller setup and analog input matter for many Nintendo 64 games.',
    }
  }

  if (platform === 'Game Boy Advance') {
    return {
      href: '/en/guides/how-browser-game-saves-work',
      label: 'Read: How Browser Game Saves Work',
      description: 'Understand the difference between in-game saves, save states, and browser storage.',
    }
  }

  return undefined
}

function Stat({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="text-sm text-base-content/60">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function ArticlePanel({
  paragraphs,
  title,
}: {
  paragraphs: Array<string>
  title: string
}) {
  if (paragraphs.length === 0) {
    return null
  }

  return (
    <article className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <i className="ri-file-text-line text-primary" />
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base-content/75">
        {paragraphs.map((paragraph, index) => (
          <p className="leading-7" key={`${index}-${paragraph.slice(0, 32)}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}

function SidebarArticle({
  icon,
  text,
  title,
}: {
  icon: string
  text: string
  title: string
}) {
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <i className={`${icon} text-primary`} />
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-base-content/70">{text}</p>
    </section>
  )
}

function SidebarTips({ items, title }: { items: Array<string>; title: string }) {
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <i className="ri-lightbulb-line text-primary" />
        {title}
      </h2>
      <ul className="mt-3 grid gap-3 text-sm leading-6 text-base-content/70">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <i className="ri-check-line mt-0.5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function KeywordPanel({ title, value }: { title: string; value?: string }) {
  const keywords = getKeywordItems(value)

  if (keywords.length === 0) {
    return null
  }

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <i className="ri-price-tag-3-line text-primary" />
        {title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span className="badge badge-outline" key={keyword}>
            {keyword}
          </span>
        ))}
      </div>
    </section>
  )
}

function FaqSection({
  items,
  title,
}: {
  items: ReturnType<typeof getGameDetailFaqs>
  title: string
}) {
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <article key={item.question}>
            <h3 className="text-base font-semibold">{item.question}</h3>
            <p className="mt-2 leading-7 text-base-content/75">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function RelatedGameSection({
  games,
  lang,
  title,
}: {
  games: Array<PublicGame>
  lang: Locale
  title: string
}) {
  if (games.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-4 grid-cols-2 max-[360px]:grid-cols-1 xl:grid-cols-3">
        {games.map((game) => (
          <RelatedGameCard game={game} key={game.url_slug ?? game._id} lang={lang} />
        ))}
      </div>
    </section>
  )
}

function SeoInternalLinkSection({
  lang,
  links,
}: {
  lang: Locale
  links: Array<GameSeoInternalLink>
}) {
  if (links.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">Explore related online games</h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
        {links.map((link) => (
          <li key={link.slug}>
            <Link
              className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
              params={{ gameId: link.slug, locale: lang }}
              search={{}}
              to="/$locale/games/$gameId"
            >
              {link.label}
              <i aria-hidden="true" className="ri-arrow-right-up-line" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function RelatedGameCard({ game, lang }: { game: PublicGame; lang: Locale }) {
  const gameId = game.url_slug || game._id || ''

  if (!gameId) {
    return null
  }

  return (
    <Link
      className="group overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
      params={{ gameId, locale: lang }}
      search={{}}
      to="/$locale/games/$gameId"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-base-300">
        {game.game_cover ? (
          <img
            alt={game.name ?? 'Game cover'}
            className="h-full w-full object-cover"
            decoding="async"
            height="660"
            loading="lazy"
            src={game.game_cover}
            width="880"
          />
        ) : (
        <div className="flex h-full items-center justify-center text-base-content/40">
            {getRetroCoverFallbackLabel(lang)}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug">
          {game.name}
        </h3>
        {game.platform ? (
          <span className="badge badge-sm badge-outline mt-2 max-w-full truncate text-xs text-base-content/60">
            {getLocalizedPlatformLabel(game.platform, lang)}
          </span>
        ) : null}
      </div>
    </Link>
  )
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-base-300 pb-3 last:border-0 last:pb-0">
      <dt className="flex items-center gap-2 text-base-content/55">
        <i className={icon} />
        {label}
      </dt>
      <dd className="text-right font-medium">{value || '-'}</dd>
    </div>
  )
}

function TagSection({
  emptyText,
  items,
  title,
}: {
  emptyText: string
  items: Array<string>
  title: string
}) {
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <i className="ri-price-tag-3-line text-primary" />
        {title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span className="badge badge-outline" key={item}>
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-base-content/50">{emptyText}</span>
        )}
      </div>
    </section>
  )
}
