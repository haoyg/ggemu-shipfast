import { Link, createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getSeoOrigin } from '#/lib/seo'

const pagePath = '/en/pickwick-papers-card-game'
const title = 'The Pickwick Papers Card Game Answer: WHIST (5 Letters)'
const description = 'The 5-letter answer to “card game in The Pickwick Papers” is WHIST. See the passage in Dickens, why the answer fits, and a quick guide to the game.'
const publishedAt = '2026-10-20'
const heroImagePath = '/guide-art/pickwick-whist-hero.webp'
const playWhistUrl = 'https://playpendium.com/whist/'
const literaryFont = { fontFamily: 'Georgia, "Times New Roman", serif' } as const

export const Route = createFileRoute('/en/pickwick-papers-card-game')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildPickwickCardGameHead(loaderData),
  component: PickwickPapersCardGamePage,
})

export function buildPickwickCardGameHead(origin?: string) {
  const siteOrigin = origin ?? 'https://pokopie.com'
  const canonical = `${siteOrigin}${pagePath}`

  return {
    links: [
      { rel: 'canonical', href: canonical },
      { rel: 'preload', href: heroImagePath, as: 'image', type: 'image/webp' },
    ],
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: `${siteOrigin}${heroImagePath}` },
      { property: 'og:image:alt', content: 'Vintage playing cards on a green Whist table' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${siteOrigin}${heroImagePath}` },
    ],
    scripts: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${canonical}#article`,
            headline: title,
            description,
            datePublished: publishedAt,
            dateModified: publishedAt,
            inLanguage: 'en',
            mainEntityOfPage: canonical,
            author: { '@type': 'Organization', name: 'POKOPIE Editorial Team', url: siteOrigin },
            publisher: { '@type': 'Organization', name: 'POKOPIE', url: siteOrigin },
            about: [
              { '@type': 'Thing', name: 'Whist' },
              { '@type': 'Book', name: 'The Pickwick Papers', author: { '@type': 'Person', name: 'Charles Dickens' } },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteOrigin}/en` },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteOrigin}/en/guides` },
              { '@type': 'ListItem', position: 3, name: 'The Pickwick Papers card game answer', item: canonical },
            ],
          },
        ],
      }).replace(/</g, '\\u003c'),
    }],
  }
}

function PickwickPapersCardGamePage() {
  return (
    <SiteLayout locale="en" localePaths={{ en: pagePath }}>
      <main className="bg-[#07151c] text-[#f6f0df]">
        <article>
          <section className="border-b border-[#b9914c]/50">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="text-sm text-[#d8cfb9]/70">
                <Link className="hover:text-[#e9c981]" params={{ locale: 'en' }} to="/$locale/guides">Guides</Link>
                <span aria-hidden="true"> / </span>
                <span>The Pickwick Papers card game</span>
              </nav>
            </div>

            <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.88fr_1.12fr]">
              <header className="flex flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#e9c981]">
                  <span className="h-px w-12 bg-[#b9914c]" aria-hidden="true" />
                  Crossword answer
                </div>
                <h1 className="mt-6 max-w-xl text-4xl font-bold leading-[1.05] text-[#fff9ea] sm:text-6xl" style={literaryFont}>The Pickwick Papers Card Game</h1>
                <div aria-label="Crossword answer WHIST" className="mt-7 border border-[#d4ad62] bg-[#651b20] px-5 py-4 text-center shadow-[inset_0_0_0_3px_#8c292f,0_18px_50px_rgba(0,0,0,0.28)] sm:px-8" role="img">
                  <strong className="text-5xl tracking-[0.12em] text-[#ffe6a7] sm:text-7xl" style={literaryFont}>WHIST</strong>
                </div>
                <p className="mt-4 text-center text-xl text-[#ddd3bd]" style={literaryFont}>5-letter crossword answer</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f0c469] bg-[#a9232d] px-6 font-bold text-white shadow-lg transition hover:bg-[#c42f3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c469]" href={playWhistUrl} rel="noopener noreferrer" target="_blank">
                    <i aria-hidden="true" className="ri-external-link-line text-lg" />
                    Play Whist Online
                  </a>
                  <a className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#b9914c] px-6 font-semibold text-[#f7e5bd] transition hover:bg-[#b9914c]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c469]" href="#source-passage">
                    <i aria-hidden="true" className="ri-book-open-line text-lg" />
                    Read the passage
                  </a>
                </div>
                <p className="mt-3 text-sm text-[#d8cfb9]/65">The game opens on PlayPendium in a new tab. No download or sign-up is required.</p>
              </header>

              <div className="min-h-[22rem] bg-[url('/guide-art/pickwick-whist-hero.webp')] bg-cover bg-center lg:min-h-[38rem]" aria-label="Vintage playing cards on a green Whist table" role="img" />
            </div>
          </section>

          <section className="border-b border-[#b9914c]/35 bg-[#f3ead4] text-[#231b13]" id="source-passage">
            <figure className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[11rem_1fr] lg:items-center lg:px-8">
              <figcaption className="flex items-center gap-3 border-b border-[#9d7130] pb-3 text-xs font-bold uppercase tracking-[0.2em] lg:border-b-0 lg:border-r lg:pb-0">
                <i aria-hidden="true" className="ri-book-open-line text-2xl" />
                Source passage
              </figcaption>
              <blockquote className="text-lg leading-8 sm:text-xl" style={literaryFont}>“The lethargic youth contrived without any additional rousing to set out two card-tables; the one for Pope Joan, and the other for whist.”
                <cite className="mt-2 block font-sans text-sm not-italic text-[#5c4a36]">Charles Dickens, <span className="italic">The Pickwick Papers</span> · <a className="font-semibold underline decoration-[#9d7130] underline-offset-4" href="https://www.gutenberg.org/cache/epub/580/pg580-images.html" rel="noopener noreferrer" target="_blank">Project Gutenberg ↗</a></cite>
              </blockquote>
            </figure>
          </section>

          <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr_0.75fr] lg:px-8 lg:py-16">
            <div>
              <h2 className="border-b border-[#b9914c]/60 pb-4 text-3xl font-bold" id="why-whist" style={literaryFont}>Why WHIST is the answer</h2>
              <p className="mt-5 leading-8 text-[#ddd3bd]">Dickens names the game directly in the scene. The clue asks for a card game from the novel and gives five letters, so <strong className="text-[#fff9ea]">WHIST</strong> is the exact fit.</p>
              <p className="mt-4 leading-8 text-[#ddd3bd]">The passage also mentions Pope Joan, but that answer has eight letters before the space and does not fit a five-letter grid.</p>
            </div>

            <div>
              <h2 className="border-b border-[#b9914c]/60 pb-4 text-3xl font-bold" id="what-is-whist" style={literaryFont}>How Whist works</h2>
              <p className="mt-5 leading-8 text-[#ddd3bd]">Classic whist is a four-player trick-taking game played by two fixed partnerships. Every player receives 13 cards from a standard 52-card deck. Players follow suit when possible, and trump cards can win the trick.</p>
              <dl className="mt-6 grid grid-cols-3 border border-[#b9914c]/60 bg-[#0b211e] text-center">
                <div className="px-3 py-4"><dt className="text-xs uppercase tracking-wider text-[#d8cfb9]/65">Players</dt><dd className="mt-1 text-2xl text-[#f0c469]" style={literaryFont}>4</dd></div>
                <div className="border-x border-[#b9914c]/40 px-3 py-4"><dt className="text-xs uppercase tracking-wider text-[#d8cfb9]/65">Cards</dt><dd className="mt-1 text-2xl text-[#f0c469]" style={literaryFont}>52</dd></div>
                <div className="px-3 py-4"><dt className="text-xs uppercase tracking-wider text-[#d8cfb9]/65">Tricks</dt><dd className="mt-1 text-2xl text-[#f0c469]" style={literaryFont}>13</dd></div>
              </dl>
              <a className="mt-5 inline-block font-semibold text-[#e9c981] underline decoration-[#b9914c] underline-offset-4" href="https://www.pagat.com/whist/whist.html" rel="noopener noreferrer" target="_blank">Read the complete rules on Pagat ↗</a>
            </div>

            <aside className="border-t border-[#b9914c]/60 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="text-2xl font-bold" style={literaryFont}>Related clues</h2>
              <ul className="mt-4 space-y-3 text-[#ddd3bd]">
                <li>Classic trick-taking game — <strong className="text-[#fff9ea]">WHIST</strong></li>
                <li>Dickensian card game — <strong className="text-[#fff9ea]">WHIST</strong></li>
                <li>Game for four, at cards — <strong className="text-[#fff9ea]">WHIST</strong></li>
              </ul>
              <div className="mt-8 border-t border-[#b9914c]/50 pt-5">
                <h2 className="text-2xl font-bold" style={literaryFont}>Explore more</h2>
                <Link className="mt-4 inline-flex items-center gap-2 font-semibold text-[#e9c981] underline decoration-[#b9914c] underline-offset-4" to="/en/card-games-that-start-with-m">Card games that start with M <span aria-hidden="true">→</span></Link>
              </div>
            </aside>
          </section>
        </article>
      </main>
    </SiteLayout>
  )
}
