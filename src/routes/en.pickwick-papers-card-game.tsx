import { Link, createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getSeoOrigin } from '#/lib/seo'

const pagePath = '/en/pickwick-papers-card-game'
const title = 'The Pickwick Papers Card Game Answer: WHIST (5 Letters)'
const description = 'The 5-letter answer to “card game in The Pickwick Papers” is WHIST. See the passage in Dickens, why the answer fits, and a quick guide to the game.'
const publishedAt = '2026-10-20'

export const Route = createFileRoute('/en/pickwick-papers-card-game')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildPickwickCardGameHead(loaderData),
  component: PickwickPapersCardGamePage,
})

export function buildPickwickCardGameHead(origin?: string) {
  const siteOrigin = origin ?? 'https://pokopie.com'
  const canonical = `${siteOrigin}${pagePath}`

  return {
    links: [{ rel: 'canonical', href: canonical }],
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonical },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
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
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-base-content/70">
          <Link className="link link-hover" params={{ locale: 'en' }} to="/$locale/guides">Guides</Link>
          <span aria-hidden="true"> / </span>
          <span>The Pickwick Papers card game</span>
        </nav>

        <article className="max-w-4xl">
          <header>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Crossword answer · 5 letters</p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">The Pickwick Papers Card Game: WHIST</h1>
            <p className="mt-5 text-lg leading-8 text-base-content/85">The answer to the crossword clue <strong>“card game in The Pickwick Papers”</strong> is <strong>WHIST</strong>.</p>
            <div aria-label="Crossword answer WHIST" className="mt-6 flex flex-wrap gap-2" role="img">
              {'WHIST'.split('').map(letter => (
                <span className="grid size-14 place-items-center border-2 border-base-content bg-base-100 text-2xl font-black shadow-sm sm:size-16 sm:text-3xl" key={letter}>{letter}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-base-content/65">Answer length: 5 letters · Updated October 20, 2026</p>
          </header>

          <section aria-labelledby="why-whist" className="mt-10 rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-8">
            <h2 className="text-2xl font-bold" id="why-whist">Why WHIST is the answer</h2>
            <p className="mt-4 leading-7 text-base-content/80">Charles Dickens names the game directly in <cite>The Pickwick Papers</cite>. When card tables are prepared, the text describes “the one for Pope Joan, and the other for whist.” That makes WHIST the exact five-letter fit for this clue.</p>
            <p className="mt-4 leading-7 text-base-content/80">You can verify the passage in the public-domain text at <a className="link link-primary font-semibold" href="https://www.gutenberg.org/cache/epub/580/pg580-images.html" rel="noopener noreferrer" target="_blank">Project Gutenberg<span aria-hidden="true"> ↗</span></a>.</p>
          </section>

          <section aria-labelledby="clue-variants" className="mt-10">
            <h2 className="text-2xl font-bold" id="clue-variants">Clue variants with the same answer</h2>
            <p className="mt-3 leading-7 text-base-content/80">Crossword wording can vary, but these forms point to the same five-letter answer:</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Card game in The Pickwick Papers',
                'The Pickwick Papers card game',
                'Dickensian card game',
                'Classic trick-taking game',
              ].map(clue => <li className="rounded-xl border border-base-300 bg-base-100 p-4 font-medium" key={clue}>{clue} — <strong>WHIST</strong></li>)}
            </ul>
          </section>

          <section aria-labelledby="what-is-whist" className="mt-10">
            <h2 className="text-2xl font-bold" id="what-is-whist">What is whist?</h2>
            <p className="mt-4 leading-7 text-base-content/80">Classic whist is a four-player trick-taking game played by two fixed partnerships with a standard 52-card deck. Each player receives 13 cards. Players must follow the suit led when possible, and the highest trump wins a trick when a trump is played.</p>
            <p className="mt-4 leading-7 text-base-content/80">For complete rules and scoring, see <a className="link link-primary font-semibold" href="https://www.pagat.com/whist/whist.html" rel="noopener noreferrer" target="_blank">Pagat’s classic whist rules<span aria-hidden="true"> ↗</span></a>.</p>
          </section>

          <section aria-labelledby="other-answer" className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold" id="other-answer">Could the answer be POPE JOAN?</h2>
            <p className="mt-4 leading-7 text-base-content/80">The same scene mentions Pope Joan, another card game, but it does not fit a five-letter clue. If the crossword asks for five letters, WHIST is the intended answer. Always check the crossing letters when the clue gives no length.</p>
          </section>

          <aside className="mt-10 border-t border-base-300 pt-6">
            <h2 className="text-xl font-bold">Related card-game guide</h2>
            <p className="mt-3 leading-7 text-base-content/75">Looking for game names rather than a crossword answer? Browse our sourced directory of 40 card games beginning with M.</p>
            <Link className="link link-primary mt-3 inline-block font-semibold" to="/en/card-games-that-start-with-m">Card games that start with M</Link>
          </aside>
        </article>
      </main>
    </SiteLayout>
  )
}
