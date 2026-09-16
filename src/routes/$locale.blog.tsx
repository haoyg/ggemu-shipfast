import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import {
  searchBlogPosts,
  type BlogPost,
  type Locale,
} from '#/lib/ggemu'
import {
  getI18n,
  getLocalizedBlogPostExcerpt,
  normalizeLocale,
} from '#/lib/i18n'
import { enBlogFaqs } from '#/lib/i18n/en'
import { jaBlogFaqs } from '#/lib/i18n/ja'
import { zhCnBlogFaqs } from '#/lib/i18n/zh-CN'
import { getLocalizedSeoLinks, getSeoOrigin } from '#/lib/seo'

const BLOG_PAGE_SIZE = 12

export const Route = createFileRoute('/$locale/blog')({
  loader: async ({ params }) => {
    const locale = normalizeLocale(params.locale)
    const [seoOrigin, result] = await Promise.all([
      getSeoOrigin(),
      searchBlogPosts({
        data: {
          limit: locale === 'en' ? 100 : BLOG_PAGE_SIZE,
          page: 1,
        },
      }).catch(() => emptyBlogPostSearchResult()),
    ])

    const localizedResult = locale === 'en'
      ? filterEnglishBlogPosts(result)
      : result

    return {
      ...localizedResult,
      seoOrigin,
    }
  },
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const t = getI18n(locale).blog
    const faqs = locale === 'zh-CN' ? zhCnBlogFaqs : locale === 'ja' ? jaBlogFaqs : enBlogFaqs
    const seoOrigin = loaderData?.seoOrigin
    const canonicalUrl = seoOrigin
      ? `${seoOrigin}/${locale}/blog`
      : undefined

    return {
      links: canonicalUrl && seoOrigin
        ? getLocalizedSeoLinks({
            locale,
            origin: seoOrigin,
            path: '/blog',
          })
        : undefined,
      meta: [
        { title: t.title },
        { name: 'description', content: t.description },
      ],
      scripts: canonicalUrl
        ? [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.items.map((item: { question: string; answer: string }) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                  },
                })),
              }),
            },
          ]
        : undefined,
    }
  },
  component: BlogListPage,
})

function BlogListPage() {
  const { blogPosts, pagination } = Route.useLoaderData()
  const { locale } = Route.useParams()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const lang = normalizeLocale(locale)
  const t = getI18n(lang).blog

  if (pathname !== `/${locale}/blog`) {
    return <Outlet />
  }

  return (
    <SiteLayout locale={lang}>
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.2),transparent_28rem),radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30rem)] bg-neutral text-neutral-content">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/70">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-neutral text-neutral-content">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {blogPosts.map((blogPost) => (
                <BlogPostCard blogPost={blogPost} key={getBlogPostKey(blogPost)} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center text-white/65">
              {t.empty}
            </div>
          )}

          {pagination.pages > 1 ? (
            <p className="mt-8 text-sm text-white/55">
              {t.total.replace('{total}', String(pagination.total))}
            </p>
          ) : null}
        </div>
      </section>
    </SiteLayout>
  )
}

export function isLikelyEnglishBlogPost(blogPost: BlogPost) {
  const sample = `${blogPost.title ?? ''} ${blogPost.excerpt ?? ''}`
  const latinCharacters = sample.match(/[A-Za-z]/g)?.length ?? 0
  const cjkCharacters = sample.match(/[\u3400-\u9fff\u3040-\u30ff]/g)?.length ?? 0

  return latinCharacters > 0 && latinCharacters >= cjkCharacters * 2
}

function filterEnglishBlogPosts(result: ReturnType<typeof emptyBlogPostSearchResult> | {
  blogPosts: Array<BlogPost>
  pagination: { total: number; page: number; limit: number; pages: number }
}) {
  const blogPosts = result.blogPosts.filter(isLikelyEnglishBlogPost).slice(0, BLOG_PAGE_SIZE)

  return {
    blogPosts,
    pagination: {
      ...result.pagination,
      total: blogPosts.length,
      page: 1,
      limit: BLOG_PAGE_SIZE,
      pages: blogPosts.length > 0 ? 1 : 0,
    },
  }
}

function emptyBlogPostSearchResult() {
  return {
    blogPosts: [],
    pagination: {
      total: 0,
      page: 1,
      limit: BLOG_PAGE_SIZE,
      pages: 0,
    },
  }
}

function BlogPostCard({
  blogPost,
  lang,
}: {
  blogPost: BlogPost
  lang: Locale
}) {
  const id = getBlogPostRouteId(blogPost)
  const excerpt = getLocalizedBlogPostExcerpt(blogPost, lang)

  if (!id) {
    return null
  }

  return (
    <Link
      className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/[0.08] hover:shadow-lg"
      params={{ blogId: id, locale: lang }}
      to="/$locale/blog/$blogId"
    >
      <div className="aspect-[16/9] bg-white/5">
        {blogPost.cover_image_url ? (
          <img
            alt={blogPost.title ?? 'Blog cover'}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            decoding="async"
            loading="lazy"
            src={blogPost.cover_image_url}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/40">
            Blog
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-white/50">
          {formatDate(blogPost.created_at, lang)}
        </p>
        <h2 className="mt-2 line-clamp-2 min-h-14 text-xl font-bold leading-tight text-white">
          {blogPost.title}
        </h2>
        {excerpt ? (
          <p className="mt-3 line-clamp-3 leading-6 text-white/65">
            {excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

function getBlogPostRouteId(blogPost: BlogPost) {
  return blogPost.slug?.trim() || blogPost._id?.trim() || ''
}

function getBlogPostKey(blogPost: BlogPost) {
  return getBlogPostRouteId(blogPost) || blogPost.title || 'blog-post'
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
