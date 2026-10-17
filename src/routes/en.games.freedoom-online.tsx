import { Link, createFileRoute } from '@tanstack/react-router'

import { FreedoomPlayer } from '#/components/freedoom-player'
import { SiteLayout } from '#/components/site-layout'
import { SocialShareActions } from '#/components/social-share-actions'
import { freedoomGame } from '#/lib/freedoom-game'
import { getSeoOrigin } from '#/lib/seo'

export const Route = createFileRoute('/en/games/freedoom-online')({
  loader: async () => ({ origin: await getSeoOrigin() }),
  head: ({ loaderData }) => buildFreedoomHead(loaderData?.origin),
  component: FreedoomOnlinePage,
})

export function buildFreedoomHead(origin?: string) {
  const canonicalUrl = `${origin ?? ''}${freedoomGame.canonicalPath}`
  const imageUrl = `${origin ?? ''}${freedoomGame.imageUrl}`
  const title = 'Freedoom Online – Play a Free Browser FPS | POKOPIE'
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: freedoomGame.title,
      description: freedoomGame.description,
      url: canonicalUrl,
      image: imageUrl,
      applicationCategory: 'BrowserGame',
      gamePlatform: ['Web browser', 'Desktop', 'Mobile'],
      isAccessibleForFree: true,
      playMode: 'SinglePlayer',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: freedoomGame.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return {
    links: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [
      { title },
      { name: 'description', content: freedoomGame.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: freedoomGame.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: freedoomGame.imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: freedoomGame.description },
      { name: 'twitter:image', content: imageUrl },
    ],
    scripts: structuredData.map((data) => ({
      type: 'application/ld+json',
      children: JSON.stringify(data).replace(/</g, '\\u003c'),
    })),
  }
}

function FreedoomOnlinePage() {
  return (
    <SiteLayout locale="en" localePaths={{ 'zh-CN': freedoomGame.canonicalPath, 'zh-TW': freedoomGame.canonicalPath, de: freedoomGame.canonicalPath, en: freedoomGame.canonicalPath, es: freedoomGame.canonicalPath, fr: freedoomGame.canonicalPath, ja: freedoomGame.canonicalPath, ko: freedoomGame.canonicalPath, pt: freedoomGame.canonicalPath }}>
      <main className="bg-base-200">
        <section className="border-b border-white/10 bg-neutral text-neutral-content">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Open-source browser FPS</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">Freedoom Online</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
              Play the independently created Freedoom: Phase 1 campaign in a Chocolate Doom WebAssembly player. No installer and no proprietary Doom game data are included.
            </p>
            <SocialShareActions
              canonicalPath={freedoomGame.canonicalPath}
              gameId={freedoomGame.id}
              text="Play Freedoom Online, a free open-source browser FPS on POKOPIE."
              title={freedoomGame.title}
              tone="dark"
            />
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <section aria-label="Freedoom browser player" className="overflow-hidden rounded-2xl border border-base-300 bg-black shadow-2xl">
            <FreedoomPlayer />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
            <article className="rounded-2xl bg-base-100 p-6 shadow-sm">
              <h2 className="text-2xl font-black">How to play Freedoom</h2>
              <p className="mt-3 leading-7 text-base-content/70">Wait for the engine and Phase 1 data to load, choose <strong>Tap to Start</strong>, then use the in-game menu to begin a new game.</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <Control keys="Arrow keys" action="Move forward or backward and turn" />
                <Control keys="Ctrl" action="Fire the selected weapon" />
                <Control keys="Space" action="Open doors and activate switches" />
                <Control keys="Q / E" action="Strafe left or right" />
                <Control keys="Shift" action="Run while moving" />
                <Control keys="1–3" action="Select an available weapon" />
                <Control keys="Enter" action="Confirm a menu choice" />
                <Control keys="Esc" action="Open or leave the game menu" />
              </dl>
              <p className="mt-6 text-sm leading-6 text-base-content/60">On touch devices, use the controls displayed below the game canvas. Landscape orientation provides more room for the game and buttons.</p>
            </article>

            <aside className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
              <h2 className="text-xl font-black">Version and requirements</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                <Info term="Game data" value="Freedoom: Phase 1 v0.13.0" />
                <Info term="Engine" value="Chocolate Doom compiled to WebAssembly" />
                <Info term="First load" value="Approximately 35 MB; later loads may use browser cache" />
                <Info term="Recommended" value="Current Chrome, Edge, Firefox, or Safari with WebAssembly enabled" />
                <Info term="Hosting" value="Embedded from the open-source project’s GitHub Pages deployment" />
              </dl>
              <a className="btn btn-outline btn-sm mt-6" href={freedoomGame.embedUrl} rel="noopener noreferrer" target="_blank">Open player in a new tab <i aria-hidden="true" className="ri-external-link-line" /></a>
            </aside>
          </section>

          <section aria-labelledby="freedoom-rights" className="mt-8 rounded-2xl border border-warning/30 bg-warning/10 p-6">
            <h2 className="text-xl font-black" id="freedoom-rights">Open-source hosting and rights</h2>
            <p className="mt-3 max-w-4xl leading-7 text-base-content/75">
              Freedoom’s original levels, artwork, sounds, and music are distributed under the BSD 3-Clause license. The Chocolate Doom engine and this WebAssembly port are GPLv2. The embedded build identifies its engine source revision and includes the applicable licence and contributor files. POKOPIE does not provide Doom or Doom II WAD files.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-primary">
              <li><a className="underline-offset-4 hover:underline" href={freedoomGame.sourceUrl} rel="noopener noreferrer" target="_blank">Player source and license files</a></li>
              <li><a className="underline-offset-4 hover:underline" href="https://github.com/freedoom/freedoom" rel="noopener noreferrer" target="_blank">Freedoom project</a></li>
              <li><a className="underline-offset-4 hover:underline" href="https://github.com/cloudflare/doom-wasm" rel="noopener noreferrer" target="_blank">WASM engine source</a></li>
            </ul>
          </section>

          <section aria-labelledby="freedoom-faq" className="mt-10">
            <h2 className="text-3xl font-black" id="freedoom-faq">Freedoom Online FAQ</h2>
            <div className="mt-5 grid gap-3">
              {freedoomGame.faq.map((item) => (
                <details className="collapse-arrow collapse rounded-2xl bg-base-100 shadow-sm" key={item.question}>
                  <summary className="collapse-title text-lg font-bold">{item.question}</summary>
                  <div className="collapse-content leading-7 text-base-content/70"><p>{item.answer}</p></div>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="freedoom-related" className="mt-10">
            <h2 className="text-3xl font-black" id="freedoom-related">More browser games</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Related title="Quake Online" description="Play a separate free Quake-engine campaign through the verified LibreQuake player." href="/en/games/quake-online" />
              <Related title="CS Surf Online" description="Practice Source-style surf movement in a creator-hosted browser beta." href="/en/games/cs-surf" />
              <Related title="WASM Arcade Review" description="Compare another browser-game catalog, its compatibility, saves, and limitations." href="/en/guides/wasm-arcade-review" />
            </div>
          </section>
        </div>
      </main>
    </SiteLayout>
  )
}

function Control({ action, keys }: { action: string; keys: string }) {
  return <div><dt><kbd className="kbd kbd-sm">{keys}</kbd></dt><dd className="mt-2 text-sm leading-6 text-base-content/65">{action}</dd></div>
}

function Info({ term, value }: { term: string; value: string }) {
  return <div><dt className="font-bold">{term}</dt><dd className="mt-1 leading-6 text-base-content/65">{value}</dd></div>
}

function Related({ description, href, title }: { description: string; href: string; title: string }) {
  return (
    <Link className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary" to={href}>
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-base-content/65">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-bold text-primary">View page <i aria-hidden="true" className="ri-arrow-right-line" /></span>
    </Link>
  )
}

