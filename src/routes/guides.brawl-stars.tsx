import { Link, createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getSeoOrigin } from '#/lib/seo'

const pagePath = '/guides/brawl-stars'
const title = 'Brawl Stars Guides – Creator Codes, Events & Rewards | POKOPIE'
const description = 'Browse practical Brawl Stars guides for creator codes, limited-time events and rewards, with source checks and clear step-by-step instructions.'

const guides = [
  {
    description: 'Search source-labeled creator codes, copy a code instantly and follow the current in-game Shop path.',
    image: '/guide-art/brawl-stars/creator-codes-hero.webp',
    label: 'Always useful',
    title: 'Brawl Stars Creator Codes',
    to: '/guides/brawl-stars/creator-codes' as const,
  },
  {
    description: 'Review the Creator Coffins event dates, participating creator codes, daily tasks and community rewards.',
    image: '/guide-art/brawl-stars/creator-coffins-hero.webp',
    label: 'Event guide',
    title: 'Creator Coffins: Codes, Teams & Rewards',
    to: '/guides/brawl-stars/creator-coffins' as const,
  },
]

export const Route = createFileRoute('/guides/brawl-stars')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildBrawlStarsHubHead(loaderData),
  component: BrawlStarsGuidesPage,
})

export function buildBrawlStarsHubHead(origin?: string) {
  const siteOrigin = origin ?? 'https://pokopie.com'
  const canonical = `${siteOrigin}${pagePath}`

  return {
    links: [{ rel: 'canonical', href: canonical }],
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: `${siteOrigin}/guide-art/brawl-stars/creator-codes-hero.webp` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    scripts: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Brawl Stars Guides',
        description,
        url: canonical,
        hasPart: guides.map((guide) => ({
          '@type': 'Article',
          name: guide.title,
          url: `${siteOrigin}${guide.to}`,
        })),
      }).replace(/</g, '\\u003c'),
    }],
  }
}

function BrawlStarsGuidesPage() {
  return (
    <SiteLayout locale="en" localePaths={{ en: pagePath }}>
      <main className="min-h-screen bg-[#050b18] text-slate-100">
        <header className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.22),transparent_30rem),radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_32rem),#040814]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400">
              <Link className="hover:text-sky-300" params={{ locale: 'en' }} to="/$locale/guides">Guides</Link>
              <span aria-hidden="true">/</span>
              <span>Brawl Stars</span>
            </nav>
            <p className="mt-10 text-sm font-black uppercase tracking-[0.22em] text-amber-300">POKOPIE reference hub</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">Brawl Stars guides for <span className="text-sky-300">codes, events and rewards</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Use concise, source-checked references instead of guessing whether a code is current or where it belongs. Start with the guide that matches your goal.</p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="brawl-stars-guides">
          <h2 className="text-2xl font-black text-white sm:text-3xl" id="brawl-stars-guides">Choose a Brawl Stars guide</h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {guides.map((guide) => (
              <Link className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-xl transition hover:-translate-y-1 hover:border-sky-300/60" key={guide.to} preload="intent" to={guide.to}>
                <div className="aspect-[16/9] overflow-hidden bg-slate-900">
                  <img alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" decoding="async" height="900" loading="lazy" src={guide.image} width="1600" />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{guide.label}</p>
                  <h2 className="mt-3 text-2xl font-black text-white">{guide.title}</h2>
                  <p className="mt-3 leading-7 text-slate-300">{guide.description}</p>
                  <span className="mt-5 inline-flex font-bold text-sky-300 group-hover:text-white">Read the guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
