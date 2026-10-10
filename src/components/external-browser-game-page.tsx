import { Link } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import type { FeaturedBrowserGame } from '#/lib/featured-browser-games'
import { trackEvent } from '#/lib/analytics'

export function ExternalBrowserGamePage({
  game,
  relatedGames,
}: {
  game: FeaturedBrowserGame
  relatedGames: Array<{ description: string; href: string; title: string }>
}) {
  return (
    <SiteLayout
      locale="en"
      localePaths={{
  'zh-TW': game.canonicalPath,
  ko: game.canonicalPath, 'zh-CN': game.canonicalPath, en: game.canonicalPath, ja: game.canonicalPath }}
    >
      <main className="bg-base-200">
        <section className="border-b border-white/10 bg-neutral text-neutral-content">
          <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.85fr)] lg:px-8 lg:py-16">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Verified browser game</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">{game.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{game.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  className="btn btn-primary"
                  href={game.externalUrl}
                  onClick={() => trackEvent('game_play_click', { game_id: game.id, source: 'external_verified_page' })}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {game.sourceLabel} <i aria-hidden="true" className="ri-external-link-line" />
                </a>
                <span className="text-sm text-white/55">Opens the creator-hosted game in a new tab</span>
              </div>
            </div>
            <figure className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-2xl">
              <img
                alt={game.imageAlt}
                className="aspect-video h-auto w-full object-cover"
                decoding="async"
                fetchPriority="high"
                height="864"
                src={game.imageUrl}
                width="1536"
              />
              <figcaption className="border-t border-white/10 px-4 py-2 text-xs leading-5 text-white/50">
                Original POKOPIE artwork · Gameplay opens on the creator site
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
            <article className="rounded-2xl bg-base-100 p-6 shadow-sm">
              <h2 className="text-2xl font-black">How to play</h2>
              <p className="mt-3 leading-7 text-base-content/70">{game.howToPlayIntro}</p>
              <ol className="mt-5 grid gap-4">
                {game.controls.map((control, index) => (
                  <li className="flex gap-4" key={control}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-black text-primary-content">{index + 1}</span>
                    <p className="pt-1 leading-7 text-base-content/70">{control}</p>
                  </li>
                ))}
              </ol>
            </article>
            <aside className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
              <h2 className="text-xl font-black">Version and requirements</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                <div><dt className="font-bold">Tested version</dt><dd className="mt-1 leading-6 text-base-content/65">{game.version}</dd></div>
                <div><dt className="font-bold">Devices</dt><dd className="mt-1 leading-6 text-base-content/65">{game.deviceNote}</dd></div>
                <div><dt className="font-bold">Hosting</dt><dd className="mt-1 leading-6 text-base-content/65">External creator-hosted player; no POKOPIE iframe or copied game files.</dd></div>
              </dl>
            </aside>
          </section>

          <section className="mt-8 rounded-2xl border border-warning/30 bg-warning/10 p-6" aria-labelledby={`${game.id}-rights`}>
            <h2 className="text-xl font-black" id={`${game.id}-rights`}>Hosting and rights note</h2>
            <p className="mt-3 max-w-4xl leading-7 text-base-content/75">{game.licenseNote}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {game.sources.map((source) => (
                <li key={source.href}>
                  <a className="font-bold text-primary underline-offset-4 hover:underline" href={source.href} rel="noopener noreferrer" target="_blank">
                    {source.label} <i aria-hidden="true" className="ri-external-link-line" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10" aria-labelledby={`${game.id}-faq`}>
            <h2 className="text-3xl font-black" id={`${game.id}-faq`}>{game.title} FAQ</h2>
            <div className="mt-5 grid gap-3">
              {game.faq.map((item) => (
                <details className="collapse-arrow collapse rounded-2xl bg-base-100 shadow-sm" key={item.question}>
                  <summary className="collapse-title text-lg font-bold">{item.question}</summary>
                  <div className="collapse-content leading-7 text-base-content/70"><p>{item.answer}</p></div>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10" aria-labelledby={`${game.id}-related`}>
            <h2 className="text-3xl font-black" id={`${game.id}-related`}>Related browser games</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedGames.map((related) => (
                <Link className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary" key={related.href} to={related.href}>
                  <h3 className="text-lg font-black">{related.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-base-content/65">{related.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-primary">View game <i aria-hidden="true" className="ri-arrow-right-line" /></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </SiteLayout>
  )
}
