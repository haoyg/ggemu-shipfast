import { Link, Outlet, createFileRoute, redirect, useRouterState } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getI18n, normalizeLocale } from '#/lib/i18n'
import { getSeoOrigin } from '#/lib/seo'
import { guides } from './$locale.guides.$guideId'

export const Route = createFileRoute('/$locale/guides')({
  beforeLoad: ({ params }) => {
    if (params.locale !== 'en') {
      throw redirect({ params: { locale: 'en' }, replace: true, statusCode: 301, to: '/$locale/guides' })
    }
  },
  loader: () => getSeoOrigin(),
  head: ({ loaderData, params }) => ({
    meta: [
      { title: 'Retro Game Guides | POKOPIE' },
      { name: 'description', content: 'Read POKOPIE guides to retro game platforms, keyboard and controller setup, browser saves and compatibility. Compare options before choosing your next game.' },
    ],
    links: loaderData ? [{ rel: 'canonical', href: `${loaderData}/${params.locale}/guides` }] : undefined,
  }),
  component: GuidesIndexPage,
})

function GuidesIndexPage() {
  const locale = normalizeLocale(Route.useParams().locale)
  const isGuideDetail = useRouterState({
    select: (state) => state.matches.some((match) => match.routeId === '/$locale/guides/$guideId'),
  })
  const t = getI18n(locale).layout

  if (isGuideDetail) {
    return <Outlet />
  }

  return (
    <SiteLayout locale={locale}>
      <main className="min-h-[calc(100vh-8rem)] bg-neutral text-neutral-content">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_28rem),radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30rem)]">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{t.tagline}</p>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Retro Game Guides</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">Clear, practical references for playing classic games in a browser.</p>
          </div>
        </section>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="mb-6 rounded-xl border border-primary/30 bg-base-100 p-6 text-base-content">
            <h2 className="text-xl font-bold">Card games that start with M</h2>
            <p className="mt-3 leading-7 text-base-content/75">Compare 40 names and variants by player count and cards needed. Play Memory in your browser, learn with an illustrated example, or follow sourced rules for other games.</p>
            <Link className="link link-primary mt-4 inline-block font-semibold" to="/en/card-games-that-start-with-m">Browse the M card game list</Link>
            <Link className="link link-primary mt-3 block font-semibold" hash="play-memory" to="/en/card-games-that-start-with-m">Play Memory and learn the rules</Link>
          </section>
          <section className="mb-6 rounded-xl border border-primary/30 bg-base-100 p-6 text-base-content">
            <h2 className="text-xl font-bold">The Pickwick Papers card game answer</h2>
            <p className="mt-3 leading-7 text-base-content/75">Find the five-letter crossword answer, verify it in Dickens’s text and learn why WHIST fits the clue.</p>
            <Link className="link link-primary mt-4 inline-block font-semibold" to="/en/pickwick-papers-card-game">See the answer and explanation</Link>
          </section>
          <section className="mb-6 rounded-xl border border-primary/30 bg-base-100 p-6 text-base-content">
            <h2 className="text-xl font-bold">PS5 games on Xbox Series X</h2>
            <p className="mt-3 leading-7 text-base-content/75">See what the experimental PS5X project can actually run on Xbox hardware, with reported FPS, download status and a source for every claim.</p>
            <Link className="link link-primary mt-4 inline-block font-semibold" to="/en/ps5-games-on-xbox-series-x">Check PS5 game compatibility</Link>
          </section>
          <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(guides).map(([guideId, guide]) => (
              <article className="rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/[0.08] hover:shadow-lg" key={guideId}>
                <h2 className="text-xl font-bold text-white">{guide.title}</h2>
                <p className="mt-3 leading-7 text-white/70">{guide.description}</p>
                <Link className="link link-primary mt-4 inline-block font-semibold" params={{ guideId, locale }} to="/$locale/guides/$guideId">Read guide</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </SiteLayout>
  )
}
