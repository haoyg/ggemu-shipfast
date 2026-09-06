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
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.tagline}</p>
        <h1 className="mt-3 text-4xl font-semibold">Retro Game Guides</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-base-content/70">Clear, practical references for playing classic games in a browser.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {Object.entries(guides).map(([guideId, guide]) => (
            <article className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm" key={guideId}>
              <h2 className="text-xl font-semibold">{guide.title}</h2>
              <p className="mt-3 leading-7 text-base-content/70">{guide.description}</p>
              <Link className="link link-primary mt-4 inline-block" params={{ guideId, locale }} to="/$locale/guides/$guideId">Read guide</Link>
            </article>
          ))}
        </div>
      </main>
    </SiteLayout>
  )
}
