import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import {
  GameCardPreviewVideo,
  gameCardPreviewHandlers,
} from '#/components/game-card-preview'
import { SiteLayout } from '#/components/site-layout'
import {
  UnavailablePage,
  getUnavailableCopy,
} from '#/components/unavailable-page'
import {
  buildArticleStructuredData,
  getArticleMetaCopy,
  hasDistinctUpdatedDate,
} from '#/lib/article-seo'
import {
  getGameDetail,
  getBlogPostDetailPageData,
  getRelatedBlogPosts,
  type Locale,
  type PublicGame,
} from '#/lib/ggemu'
import {
  getI18n,
  getGameDetailSummary,
  getLocalizedBlogPostExcerpt,
  normalizeLocale,
} from '#/lib/i18n'
import { getAlternateLinksFromCanonical } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

export const Route = createFileRoute('/$locale/blog/$blogId')({
  loader: async ({ params }) => {
    const locale = normalizeLocale(params.locale)
    const detail = await getBlogPostDetailPageData({
      data: {
        id: params.blogId,
        locale,
      },
    }).catch(() => null)

    if (!detail) {
      throw notFound({
        data: { locale },
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }

    return {
      ...detail,
      kind: 'ready' as const,
      linkedGames: await loadLinkedGames(
        detail.blogPost.content || detail.blogPost.excerpt || '',
      ),
      relatedBlogPosts: await getRelatedBlogPosts({
        data: {
          currentPostId: detail.blogPost.slug?.trim() || detail.blogPost._id?.trim() || '',
          keyword: extractRelatedKeyword(detail.blogPost.title || ''),
          limit: 4,
        },
      }).catch(() => ({ blogPosts: [] })),
    }
  },
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)

    if (!loaderData) {
      const t = getUnavailableCopy(locale, 'blog')

      return {
        meta: [
          { title: t.title },
          { name: 'description', content: t.description },
          { name: 'robots', content: 'noindex,nofollow' },
        ],
      }
    }

    const { blogPost, canonicalUrl } = loaderData
    const title = blogPost.title || getI18n(locale).blog.title
    const description = getLocalizedBlogPostExcerpt(blogPost, locale)
    const image = blogPost.cover_image_url
    const origin = new URL(canonicalUrl).origin

    return {
      links: [
        { rel: 'canonical', href: canonicalUrl },
        ...getAlternateLinksFromCanonical(canonicalUrl),
      ],
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: canonicalUrl },
        ...(blogPost.created_at
          ? [{ property: 'article:published_time', content: blogPost.created_at }]
          : []),
        ...(blogPost.updated_at
          ? [{ property: 'article:modified_time', content: blogPost.updated_at }]
          : []),
        {
          property: 'article:author',
          content: `${origin}/${locale}/about`,
        },
        ...(image ? [{ property: 'og:image', content: image }] : []),
        { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        ...(image ? [{ name: 'twitter:image', content: image }] : []),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: serializeJsonLd(
            buildArticleStructuredData({
              blogPost,
              canonicalUrl,
              description,
              locale,
              siteName: siteConfig.SITE_NAME,
            }),
          ),
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
                name: getI18n(locale).blog.title,
                item: `${origin}/${locale}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: blogPost.title,
                item: canonicalUrl,
              },
            ],
          }),
        },
      ],
    }
  },
  notFoundComponent: BlogDetailNotFound,
  component: BlogDetailPage,
})

function BlogDetailNotFound({ data }: { data?: unknown }) {
  return <UnavailablePage locale={getNotFoundLocale(data)} type="blog" />
}

function getNotFoundLocale(data: unknown) {
  if (data && typeof data === 'object' && 'locale' in data) {
    return normalizeLocale((data as { locale?: unknown }).locale)
  }

  return normalizeLocale(undefined)
}

function BlogDetailPage() {
  const data = Route.useLoaderData()!
  const { locale } = Route.useParams()
  const lang = normalizeLocale(locale)
  const t = getI18n(lang).blog
  const articleMeta = getArticleMetaCopy(lang, siteConfig.SITE_NAME)

  const { blogPost, linkedGames, canonicalUrl, relatedBlogPosts } = data
  const description = getLocalizedBlogPostExcerpt(blogPost, lang)

  return (
    <SiteLayout locale={lang}>
      <section className="bg-base-100">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link params={{ locale: lang }} to="/$locale/blog">
                  {t.title}
                </Link>
              </li>
              <li>{blogPost.title}</li>
            </ul>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 break-words text-4xl font-semibold leading-tight sm:text-5xl">
            {blogPost.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-base-content/60">
            <Link
              className="inline-flex items-center gap-2 font-medium text-base-content/75 hover:text-primary"
              params={{ locale: lang }}
              rel="author"
              to="/$locale/about"
            >
              <i className="ri-team-line text-base text-primary" />
              {articleMeta.author}
            </Link>
            {blogPost.created_at ? (
              <span className="inline-flex items-center gap-2">
                <i className="ri-calendar-line" />
                {articleMeta.published}
                <time dateTime={blogPost.created_at}>
                  {formatDate(blogPost.created_at, lang)}
                </time>
              </span>
            ) : null}
            {hasDistinctUpdatedDate(blogPost.created_at, blogPost.updated_at) ? (
              <span className="inline-flex items-center gap-2">
                <i className="ri-refresh-line" />
                {articleMeta.updated}
                <time dateTime={blogPost.updated_at}>
                  {formatDate(blogPost.updated_at, lang)}
                </time>
              </span>
            ) : null}
          </div>
        </header>

        {blogPost.cover_image_url ? (
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-box border border-base-300 bg-base-200">
            <img
              alt={blogPost.title ?? 'Blog cover'}
              className="h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
              src={blogPost.cover_image_url}
            />
          </div>
        ) : null}

        <div className="mt-10 break-words space-y-6 text-base leading-8 text-base-content/75">
          {renderContent(
            blogPost.content || '',
            lang,
            linkedGames,
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-base-300 pt-8">
          <a
            className="btn btn-outline btn-sm gap-2"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title || '')}&url=${encodeURIComponent(canonicalUrl)}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="ri-twitter-x-line" />
            Tweet
          </a>
          <a
            className="btn btn-outline btn-sm gap-2"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="ri-facebook-circle-line" />
            Share
          </a>
          <a
            className="btn btn-outline btn-sm gap-2"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(blogPost.title || '')}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="ri-linkedin-box-line" />
            LinkedIn
          </a>
          <a
            className="btn btn-outline btn-sm gap-2"
            href={`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(blogPost.title || '')}&desc=${encodeURIComponent(description)}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Share to QQ/QZone"
          >
            <i className="ri-qq-line" />
            QQ
          </a>
          <button
            className="btn btn-outline btn-sm gap-2"
            onClick={() => {
              navigator.clipboard?.writeText(canonicalUrl).catch(() => undefined)
              const el = document.getElementById('wechat-toast')
              if (el) {
                el.classList.remove('hidden')
                setTimeout(() => el.classList.add('hidden'), 2000)
              }
            }}
            type="button"
          >
            <i className="ri-wechat-pay-line" />
            WeChat
          </button>
          <a
            className="btn btn-outline btn-sm gap-2"
            href={`https://www.xiaohongshu.com/explore/${encodeURIComponent(canonicalUrl)}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Share to Xiaohongshu"
          >
            <i className="ri-baidu-line" />
            Rednote
          </a>
        </div>

        <div
          className="hidden toast toast-top toast-center z-50"
          id="wechat-toast"
          role="alert"
        >
          <div className="alert alert-info w-auto shadow-lg">
            <i className="ri-check-line" />
            <span>Link copied! Share to WeChat</span>
          </div>
        </div>

        {relatedBlogPosts.blogPosts.length > 0 && (
          <section className="mt-12 border-t border-base-300 pt-10">
            <h2 className="text-2xl font-semibold">
              {t.relatedPosts}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedBlogPosts.blogPosts.map((post) => {
                const postId = post.slug?.trim() || post._id?.trim() || ''
                const postExcerpt = getLocalizedBlogPostExcerpt(post, lang)

                if (!postId) {
                  return null
                }

                return (
                  <Link
                    className="group overflow-hidden rounded-box border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                    key={postId}
                    params={{ blogId: postId, locale: lang }}
                    to="/$locale/blog/$blogId"
                  >
                    <div className="aspect-[16/9] bg-base-300">
                      {post.cover_image_url ? (
                        <img
                          alt={post.title ?? 'Blog cover'}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          decoding="async"
                          loading="lazy"
                          src={post.cover_image_url}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-base-content/40">
                          Blog
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-base-content/50">
                        {formatDate(post.created_at, lang)}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight">
                        {post.title}
                      </h3>
                      {postExcerpt ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-base-content/65">
                          {postExcerpt}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </article>
    </SiteLayout>
  )
}

async function loadLinkedGames(content: string) {
  const gameIds = Array.from(extractGgemuGameIds(content))
  const entries = await Promise.all(
    gameIds.map(async (gameId) => {
      const game = await getGameDetail({ data: { id: gameId } }).catch(() => null)

      return [gameId, game] as const
    }),
  )

  return Object.fromEntries(entries) as Record<string, PublicGame | null>
}

function extractGgemuGameIds(content: string) {
  const gameIds = new Set<string>()
  const pattern = /https?:\/\/[^\s]+/g

  for (const match of content.matchAll(pattern)) {
    const gameId = getGgemuGameIdFromUrl(match[0])

    if (gameId) {
      gameIds.add(gameId)
    }
  }

  return gameIds
}

function renderContent(
  content: string,
  locale: Locale,
  linkedGames: Record<string, PublicGame | null>,
) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => renderBlock(block, index, locale, linkedGames))
}

function renderBlock(
  block: string,
  index: number,
  locale: Locale,
  linkedGames: Record<string, PublicGame | null>,
) {
  const image = block.match(/^!\[(?<alt>.*)]\((?<src>https?:\/\/[^)]+)\)$/)

  if (image?.groups) {
    return (
      <figure className="overflow-hidden rounded-box border border-base-300 bg-base-200" key={index}>
        <img
          alt={cleanBlogDisplayText(image.groups.alt) || 'Blog image'}
          className="h-full w-full object-cover"
          decoding="async"
          loading="lazy"
          src={image.groups.src}
        />
      </figure>
    )
  }

  const displayBlock = cleanBlogDisplayText(block)

  if (!displayBlock) {
    return null
  }

  if (displayBlock.startsWith('### ')) {
    return (
      <h3 className="pt-3 text-2xl font-semibold text-base-content" key={index}>
        {displayBlock.slice(4)}
      </h3>
    )
  }

  if (displayBlock.startsWith('## ')) {
    return (
      <h2 className="pt-4 text-3xl font-semibold text-base-content" key={index}>
        {displayBlock.slice(3)}
      </h2>
    )
  }

  if (/^-{3,}$/.test(displayBlock)) {
    return <hr className="border-base-300" key={index} />
  }

  if (hasInternalGameLink(displayBlock)) {
    return (
      <div className="space-y-4" key={index}>
        {renderBlockWithGameCards(displayBlock, locale, linkedGames)}
      </div>
    )
  }

  return (
    <p className="whitespace-pre-line" key={index}>
      {renderInlineMarkdown(displayBlock, locale)}
    </p>
  )
}

function cleanBlogDisplayText(text: string) {
  return text
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/!\[[^\]]*]\([^)]*$/g, '')
    .replace(/\bGGEMU(?:\.com)?\b/gi, 'POKOPIE')
    .trim()
}

function hasInternalGameLink(text: string) {
  return text
    .match(/https?:\/\/[^\s]+/g)
    ?.some((urlValue) => getGgemuGameIdFromUrl(urlValue)) ?? false
}

function renderBlockWithGameCards(
  text: string,
  locale: Locale,
  linkedGames: Record<string, PublicGame | null>,
) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g)
  const nodes: Array<ReactNode> = []
  let paragraphParts: Array<ReactNode> = []

  function flushParagraph() {
    if (paragraphParts.length === 0) {
      return
    }

    nodes.push(
      <p className="whitespace-pre-line" key={`text-${nodes.length}`}>
        {paragraphParts}
      </p>,
    )
    paragraphParts = []
  }

  parts.forEach((part, index) => {
    if (!part.startsWith('http')) {
      paragraphParts.push(...renderStrongText(part, `text-${index}`))
      return
    }

    const internalGameLink = getInternalGameLink(part, locale)

    if (!internalGameLink) {
      paragraphParts.push(renderExternalLink(part, index))
      return
    }

    flushParagraph()
    nodes.push(
      <LinkedGameCard
        game={linkedGames[internalGameLink.gameId]}
        gameId={internalGameLink.gameId}
        key={`game-${internalGameLink.gameId}-${index}`}
        locale={locale}
      />,
    )
  })

  flushParagraph()

  return nodes
}

function renderInlineMarkdown(text: string, locale: Locale) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g)

  return parts.flatMap((part, index) => {
    if (!part.startsWith('http')) {
      return renderStrongText(part, `text-${index}`)
    }

    const internalGameLink = getInternalGameLink(part, locale)

    if (internalGameLink) {
      return (
        <Link
          className="link link-primary"
          key={`${part}-${index}`}
          params={{
            gameId: internalGameLink.gameId,
            locale: internalGameLink.locale,
          }}
          to="/$locale/games/$gameId"
        >
          {internalGameLink.label}
        </Link>
      )
    }

    return (
      renderExternalLink(part, index)
    )
  })
}

function renderStrongText(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*\n]+?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong className="font-semibold text-base-content" key={`${keyPrefix}-strong-${index}`}>
          {part.slice(2, -2)}
        </strong>
      )
    }

    return part
  })
}

function renderExternalLink(urlValue: string, index: number) {
  return (
    <a
      className="link link-primary"
      href={urlValue}
      key={`${urlValue}-${index}`}
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {getExternalLinkLabel(urlValue)}
    </a>
  )
}

function getExternalLinkLabel(urlValue: string) {
  try {
    const url = new URL(urlValue)

    if (url.hostname === 'ggemu.com') {
      url.hostname = 'pokopie.com'
      return url.toString()
    }
  } catch {
    return cleanBlogDisplayText(urlValue)
  }

  return cleanBlogDisplayText(urlValue)
}

function LinkedGameCard({
  game,
  gameId,
  locale,
}: {
  game: PublicGame | null | undefined
  gameId: string
  locale: Locale
}) {
  const title = game?.name?.trim() || gameId
  const description = game ? getGameDetailSummary(game, locale) : ''
  const labels = getLinkedGameCardLabels(locale)

  return (
    <Link
      className="group grid gap-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:grid-cols-[160px_1fr]"
      {...gameCardPreviewHandlers}
      params={{ gameId, locale }}
      to="/$locale/games/$gameId"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-base-300">
        {game?.game_cover ? (
          <img
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            decoding="async"
            loading="lazy"
            src={game.game_cover}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-base-content/45">
            Game
          </div>
        )}
        <GameCardPreviewVideo src={game?.game_video} />
      </div>
      <div className="min-w-0 self-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {labels.eyebrow}
        </p>
        <h3 className="mt-1 line-clamp-2 text-xl font-semibold leading-tight text-base-content">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-base-content/65">
            {description}
          </p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          {labels.action}
          <i className="ri-arrow-right-line" />
        </span>
      </div>
    </Link>
  )
}

function getLinkedGameCardLabels(locale: Locale) {
  if (locale === 'zh-CN') {
    return {
      action: '开始游戏',
      eyebrow: '相关游戏',
    }
  }

  if (locale === 'ja') {
    return {
      action: '今すぐプレイ',
      eyebrow: '関連ゲーム',
    }
  }

  return {
    action: 'Play now',
    eyebrow: 'Related game',
  }
}

function getInternalGameLink(urlValue: string, locale: Locale) {
  const gameId = getGgemuGameIdFromUrl(urlValue)

  if (!gameId) {
    return undefined
  }

  return {
    gameId,
    label: `/${locale}/games/${gameId}`,
    locale,
  }
}

function getGgemuGameIdFromUrl(urlValue: string) {
  try {
    const url = new URL(urlValue)

    if (url.hostname !== 'ggemu.com') {
      return undefined
    }

    const segments = url.pathname.split('/').filter(Boolean)
    const routeIndex = segments.findIndex(
      (segment) => segment === 'game' || segment === 'games',
    )
    const gameId = routeIndex >= 0 ? segments[routeIndex + 1] : undefined

    if (!gameId) {
      return undefined
    }

    return decodeURIComponent(gameId)
  } catch {
    return undefined
  }
}

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(value))
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function extractRelatedKeyword(title: string) {
  if (!title) {
    return ''
  }

  return title
    .replace(/[^\w\s一-鿿぀-ゟ゠-ヿ]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 3)
    .join(' ')
}
