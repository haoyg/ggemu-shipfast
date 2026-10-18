import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { MemoryCardGame } from '#/components/memory-card-game'
import { SiteLayout } from '#/components/site-layout'
import { cardDeckLabels, filterMCardGames, getCardGamePlayerLabel, mCardGames, mCardGamesCheckedAt, type CardDeckType, type CardGameCategory } from '#/lib/m-card-games'
import { getSeoOrigin, seoLocales } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

const pagePath = '/en/card-games-that-start-with-m'
const localePaths = Object.fromEntries(seoLocales.map(locale => [locale, pagePath]))
const title = 'Card Games That Start With M: 40 Names & Rules | POKOPIE'
const description = 'Explore 40 card games that start with M, from Mao to Monopoly Deal. Play Memory free in your browser, compare decks and find sourced rules for each game.'
const categories = ['All', 'Traditional', 'Published', 'Digital', 'Solitaire'] as const
const faqs = [
  { question: 'What are some card games that start with M?', answer: 'Mao, Mau-Mau, Memory, Machiavelli, Magic: The Gathering, Mille Bornes, Monopoly Deal and Munchkin are examples. This directory includes traditional games, published card games, digital games and solitaire.' },
  { question: 'Which M card games use ordinary playing cards?', answer: 'Memory, Mao, Machiavelli and Mizerka use standard playing cards, although the number of packs and house rules vary. Others need a shortened pack, regional suits or a dedicated commercial deck; check each entry’s deck note.' },
  { question: 'Are Mao and Mau-Mau the same game?', answer: 'No. They are related shedding games, but Mao is known for rules that players discover through observation and penalties. Mau-Mau generally starts with an explained matching rule and agreed special-card effects.' },
  { question: 'Which card games beginning with M can I play alone?', answer: 'Monte Carlo and Miss Milligan are solitaire games. Marvel Champions also supports solo play using its dedicated deck and scenario cards. Follow the linked rules for the specific version.' },
  { question: 'Are Mahjong and Murdoku card games?', answer: 'Traditional Mahjong uses tiles, and Murdoku is a crime-scene deduction puzzle rather than a card game. They are not counted in this directory. Card-based adaptations of tile games should be identified by their specific title and rules.' },
  { question: 'Is this every card game beginning with M?', answer: 'No universal list covers every regional name, house-rule variant and commercial edition. This is a curated directory of 40 sourced titles and variants, with alternate names grouped under their main entry. It is not a list of every expansion or casino poker variant.' },
] as const

export const Route = createFileRoute('/en/card-games-that-start-with-m')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildMCardGamesHead(loaderData),
  component: MCardGamesPage,
})

export function buildMCardGamesHead(origin?: string) {
  const canonical = `${origin ?? 'https://pokopie.com'}${pagePath}`
  return {
    links: [{ rel: 'canonical', href: canonical }],
    meta: [
      { title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' }, { property: 'og:url', content: canonical },
      { name: 'twitter:card', content: 'summary' }, { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    scripts: [{
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', '@id': canonical, url: canonical, name: title, description, inLanguage: 'en', dateModified: mCardGamesCheckedAt, mainEntity: { '@id': `${canonical}#list` } },
          { '@type': 'ItemList', '@id': `${canonical}#list`, name: 'Card games that start with M', numberOfItems: mCardGames.length, itemListOrder: 'https://schema.org/ItemListOrderAscending', itemListElement: mCardGames.map((game, index) => ({ '@type': 'ListItem', position: index + 1, name: game.name, url: `${canonical}#${game.id}` })) },
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin ?? 'https://pokopie.com'}/en` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${origin ?? 'https://pokopie.com'}/en/guides` },
            { '@type': 'ListItem', position: 3, name: 'Card games that start with M', item: canonical },
          ] },
          { '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
        ],
      }).replace(/</g, '\\u003c'),
    }],
  }
}

function MCardGamesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CardGameCategory | 'All'>('All')
  const [players, setPlayers] = useState('All')
  const [deckType, setDeckType] = useState<CardDeckType | 'All'>('All')
  const games = filterMCardGames(query, category, { players: players === 'All' ? undefined : Number(players), deckType })
  const hasFilters = Boolean(query || category !== 'All' || players !== 'All' || deckType !== 'All')
  function resetFilters() { setQuery(''); setCategory('All'); setPlayers('All'); setDeckType('All') }

  return (
    <SiteLayout locale="en" localePaths={localePaths}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-base-content/70">
          <Link className="link link-hover" params={{ locale: 'en' }} to="/$locale/guides">Guides</Link>
          <span aria-hidden="true"> / </span><span>Card games beginning with M</span>
        </nav>
        <header className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Play Memory · Browse names &amp; rules</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Card Games That Start With M</h1>
          <p className="mt-5 text-lg leading-8 text-base-content/85">Mao, Mau-Mau, Memory, Magic: The Gathering, Mille Bornes, Monopoly Deal and Munchkin all start with M. Find these and more in the alphabetical list below, with a short explanation and a link to the rules for each game.</p>
          <p className="mt-4 text-sm leading-6 text-base-content/65">40 sourced titles and variants. Alternate names are grouped with their main entry. Rules and editions vary; this directory does not claim to cover every regional name or expansion. Currently available in English.</p>
          <p className="mt-4 font-medium">Memory is playable here. The other 39 entries provide introductions and external rules, not playable games.</p>
          <a className="btn btn-primary mt-4" href="#play-memory">Play Memory now</a>
          <p className="mt-3 text-sm text-base-content/65">POKOPIE Editorial Team · Sources checked October 18, 2026</p>
        </header>

        <section aria-labelledby="find-a-game" className="my-8 rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <h2 id="find-a-game" className="text-xl font-bold">Find a game</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <label className="col-span-2 grid gap-2 text-sm font-medium lg:col-span-1">Search names, aliases or gameplay
              <input className="input input-bordered w-full" onChange={event => setQuery(event.target.value)} placeholder="Try Mao, MTG or Marias" type="search" value={query} />
            </label>
            <div className="grid gap-2 text-sm font-medium">
              <label htmlFor="m-card-game-type">Game type</label>
              <select className="select select-bordered w-full" id="m-card-game-type" onChange={event => setCategory(event.target.value as CardGameCategory | 'All')} value={category}>
                {categories.map(value => <option key={value} value={value}>{value === 'Published' ? 'Published card games' : value}</option>)}
              </select>
            </div>
            <div className="grid gap-2 text-sm font-medium">
              <label htmlFor="m-card-players">Players</label>
              <select className="select select-bordered w-full" id="m-card-players" onChange={event => setPlayers(event.target.value)} value={players}>
                <option value="All">Any number</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(count => <option key={count} value={count}>{count === 1 ? '1 (solo)' : `${count} players`}</option>)}
              </select>
            </div>
            <div className="grid gap-2 text-sm font-medium">
              <label htmlFor="m-card-deck">Cards available</label>
              <select className="select select-bordered w-full" id="m-card-deck" onChange={event => setDeckType(event.target.value as CardDeckType | 'All')} value={deckType}>
                <option value="All">Any cards</option>
                {Object.entries(cardDeckLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-base-content/65">Choose 1 (solo) to find single-player options. Counts refer to the documented versions, not every house rule. Games with an unspecified player count are excluded when you choose a number. Standard deck(s) can mean multiple packs or jokers; see each entry for exact cards.</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" role="status" className="text-sm text-base-content/70">{games.length} of {mCardGames.length} games shown · A–Z</p>
            {hasFilters ? <button className="btn btn-ghost btn-sm" onClick={resetFilters} type="button">Clear filters</button> : null}
          </div>
        </section>

        <section aria-labelledby="quick-list-title" className="my-8">
          <h2 className="text-2xl font-bold" id="quick-list-title">M card games at a glance</h2>
          <p className="mt-3 text-sm leading-6 text-base-content/70">Compare the names, player counts and cards below. Select a name for its introduction and sourced rules. Only Memory is playable on POKOPIE.</p>
          <p className="mt-2 text-sm leading-6 text-base-content/65">Traditional player counts follow the <a className="link link-primary" href="https://www.pagat.com/alpha/#m" rel="noopener noreferrer" target="_blank">Pagat index</a> or the named rules version. Published games follow their publisher; see each introduction for edition notes.</p>
          <div aria-label="M card game comparison" className="mt-5 overflow-x-auto rounded-xl border border-base-300 focus-visible:outline-2 focus-visible:outline-primary" role="region" tabIndex={0}>
            <table className="table w-full min-w-[32rem] bg-base-100">
              <caption className="sr-only">Filtered M card games: names, documented player counts, required deck types and play availability</caption>
              <thead><tr><th scope="col">Game</th><th scope="col">Players</th><th scope="col">Cards</th><th scope="col">On POKOPIE</th></tr></thead>
              <tbody>{games.map(game => <tr key={game.id}>
                <th scope="row"><a className="link link-primary" href={`#${game.id}`}>{game.name}</a></th>
                <td>{getCardGamePlayerLabel(game)}{game.players.includes(1) ? <span className="mt-1 block text-xs text-base-content/65">Solo supported</span> : null}</td>
                <td>{cardDeckLabels[game.deckType]}</td>
                <td>{game.id === 'memory' ? <a className="link link-primary font-semibold" href="#play-memory">Play Memory</a> : 'Rules only'}</td>
              </tr>)}</tbody>
            </table>
            {!games.length ? <p className="p-5 text-sm">No games match these filters. Try another combination or clear the filters above.</p> : null}
          </div>
        </section>

        <MemoryCardGame />

        <section aria-labelledby="game-list-title">
          <h2 className="text-2xl font-bold" id="game-list-title">Alphabetical list of M card games</h2>
          <p className="mt-3 text-sm leading-6 text-base-content/70">Traditional means regional or shared-deck games. Published games need their own cards. Digital games use an app, while solitaire entries are designed for one player.</p>
          {games.length ? (
            <ol className="mt-6 divide-y divide-base-300 rounded-xl border border-base-300 bg-base-100">
              {games.map(game => (
                <li className="scroll-mt-32 p-5 sm:p-6" id={game.id} key={game.id}>
                  <article className="grid gap-4 md:grid-cols-[15rem_1fr]">
                    <div>
                      <h3 className="text-xl font-bold"><a className="hover:underline" href={`#${game.id}`}>{game.name}</a></h3>
                      <span className="badge badge-outline mt-2 text-xs">{game.category}</span>
                      <p className="mt-2 text-sm text-base-content/65">{game.id === 'memory' ? 'Playable on POKOPIE' : 'Rules & introduction only'}</p>
                      {game.aliases?.length ? <p className="mt-3 text-sm leading-6 text-base-content/65">Also called: {game.aliases.join(', ')}</p> : null}
                    </div>
                    <div>
                      <p className="leading-7 text-base-content/85">{game.description}</p>
                      <p className="mt-3 text-sm leading-6 text-base-content/70"><strong className="font-semibold text-base-content">Players:</strong> {getCardGamePlayerLabel(game)}{game.playerNote ? ` · ${game.playerNote}` : ''}</p>
                      <p className="mt-3 text-sm leading-6 text-base-content/70"><strong className="font-semibold text-base-content">Cards needed:</strong> {game.deck}</p>
                      {game.id === 'memory' ? <a className="btn btn-primary btn-sm mt-3 mr-4" href="#play-memory">Play Memory</a> : null}
                      <a aria-label={`Read ${game.name} rules — ${game.source}`} className="link link-primary mt-3 inline-block text-sm font-semibold" href={game.rulesUrl} rel="noopener noreferrer" target="_blank">Rules: {game.source}<span aria-hidden="true"> ↗</span></a>
                      {game.playerSourceUrl ? <a className="link link-primary mt-3 block text-sm" href={game.playerSourceUrl} rel="noopener noreferrer" target="_blank">Publisher player-count reference ↗</a> : null}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          ) : <div className="mt-6 rounded-xl border border-base-300 p-6"><p>No matching games. Try another spelling or clear the filters.</p><button className="btn btn-primary btn-sm mt-4" onClick={resetFilters} type="button">Show all games</button></div>}
        </section>

        <section aria-labelledby="similar-names" className="mt-10 rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <h2 className="text-2xl font-bold" id="similar-names">Similar names, different games</h2>
          <p className="mt-4 leading-7 text-base-content/80">Mao and Mau-Mau are different shedding games. Mille is rummy, while Mille Bornes is a race. Marriage here means Nepalese rummy, not the entire family of games that award marriage bonuses. Michigan Rummy can describe a multi-phase game rather than ordinary Michigan.</p>
          <p className="mt-4 leading-7 text-base-content/80">Mahjong traditionally uses tiles, so it is not included. If you meant Murdoku, it is a deduction puzzle rather than a card game.</p>
          <Link className="link link-primary mt-3 inline-block font-semibold" params={{ locale: 'en', gameId: 'murdoku-html5-2026' }} to="/$locale/games/$gameId">Looking for Murdoku?</Link>
        </section>

        <section aria-labelledby="m-card-faq" className="mt-10">
          <h2 className="text-2xl font-bold" id="m-card-faq">Frequently asked questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map(faq => <details className="rounded-xl border border-base-300 bg-base-100 p-5" key={faq.question}><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 leading-7 text-base-content/80">{faq.answer}</p></details>)}
          </div>
        </section>
        <aside className="mt-10 border-t border-base-300 pt-6 text-sm leading-6 text-base-content/65">
          <p>These are identification summaries, not complete rulebooks or claims that POKOPIE hosts these games. Each rules link identifies the source and, where relevant, the particular edition or implementation. A linked rules page may include spoilers, historical variants or downloadable PDFs.</p>
          <p className="mt-3">Know a missing name or spot a rules error? <a className="link link-primary" href={`mailto:${siteConfig.SITE_EMAIL}?subject=M%20card%20game%20directory%20correction`}>Send a correction</a>.</p>
        </aside>
      </div>
    </SiteLayout>
  )
}
