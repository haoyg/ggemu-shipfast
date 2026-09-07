import { Link, createFileRoute, redirect } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getI18n, normalizeLocale } from '#/lib/i18n'
import { getSeoOrigin } from '#/lib/seo'
import { guides } from './$locale.guides.$guideId'

export const Route = createFileRoute('/$locale/guides')({
  beforeLoad: ({ params }) => {
    if (params.locale !== 'en') {
      throw redirect({ params: { locale: 'en' }, replace: true, to: '/$locale/guides' })
    }
  },
  loader: () => getSeoOrigin(),
  head: ({ loaderData, params }) => ({
    meta: [
      { title: 'Retro Game Guides | POKOPIE' },
      { name: 'description', content: 'Practical guides for choosing platforms, controllers, saves, and browser retro games.' },
    ],
    links: loaderData ? [{ rel: 'canonical', href: `${loaderData}/${params.locale}/guides` }] : undefined,
  }),
  component: GuidesIndexPage,
})

function GuidesIndexPage() {
  const locale = normalizeLocale(Route.useParams().locale)
  const t = getI18n(locale).layout

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
