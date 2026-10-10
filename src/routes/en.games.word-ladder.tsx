import { Link, createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { WordLadderGame } from '#/components/word-ladder-game'
import { getSeoOrigin } from '#/lib/seo'
import { originalGames } from '#/lib/original-games'
import { getDailyPuzzle } from '#/lib/word-ladder/engine'
import {
  WORD_LADDER_DICTIONARY_SOURCE,
  WORD_LADDER_DICTIONARY_VERSION,
} from '#/lib/word-ladder/dictionary'

const gameMetadata = originalGames.wordLadder
const pageTitle = `${gameMetadata.title} – Daily Word Game | POKOPIE`
const pageDescription =
  'Play a free daily Word Ladder Challenge. Change one letter at a time, use smart hints, compare the shortest path, or keep playing in Unlimited Mode.'

const faqs = [
  {
    question: 'What is a word ladder?',
    answer: 'A word ladder changes one word into another by replacing exactly one letter per move. Every intermediate step must be a valid word.',
  },
  {
    question: 'Does the Daily Challenge reset at midnight?',
    answer: 'Yes. Everyone receives the same deterministic challenge for the current UTC date. Your saved progress remains on this device.',
  },
  {
    question: 'How do Smart Hints work?',
    answer: 'Hints reveal information gradually: first the remaining shortest distance, then a useful next word, and finally the complete shortest path.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No. Progress, completed games, and the daily streak are stored locally in your browser without an account.',
  },
] as const

const relatedGames = [
  { slug: 'murdoku-html5-2026', title: 'Murdoku', description: 'A deduction puzzle with a mystery twist.' },
  { slug: 'onet-master-html5', title: 'Onet Master', description: 'Match tiles by finding clear connecting paths.' },
  { slug: 'pixeltris-html5-2026', title: 'Pixeltris', description: 'A compact block puzzle for quick sessions.' },
] as const

export const Route = createFileRoute('/en/games/word-ladder')({
  loader: async () => {
    const dailyDate = new Date().toISOString().slice(0, 10)
    return {
      dailyDate,
      dailyPuzzle: getDailyPuzzle(dailyDate),
      origin: await getSeoOrigin(),
    }
  },
  head: ({ loaderData }) => buildWordLadderHead(loaderData?.origin),
  component: WordLadderPage,
})

export function buildWordLadderHead(origin?: string) {
  const canonicalUrl = `${origin ?? ''}/en/games/word-ladder`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'POKOPIE Word Ladder Challenge',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
      description: pageDescription,
      url: canonicalUrl,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  return {
    links: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [
      { title: pageTitle },
      { name: 'description', content: pageDescription },
      { name: 'keywords', content: 'word ladder, daily word game, word ladder game, word puzzle, vocabulary game' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
    ],
    scripts: structuredData.map((data) => ({
      type: 'application/ld+json',
      children: JSON.stringify(data).replace(/</g, '\\u003c'),
    })),
  }
}

function WordLadderPage() {
  const { dailyDate, dailyPuzzle } = Route.useLoaderData()

  return (
    <SiteLayout
      locale="en"
      localePaths={{
  'zh-TW': '/en/games/word-ladder',
  ko: '/en/games/word-ladder', 'zh-CN': '/en/games/word-ladder', en: '/en/games/word-ladder', ja: '/en/games/word-ladder' }}
    >
      <main className="bg-base-200">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.25),transparent_28rem),radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_30rem)] bg-neutral text-neutral-content">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">POKOPIE Word Arcade</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">Word Ladder Challenge</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Transform the start word into the target by changing exactly one letter at a time. Every step must be a real English word—and shorter ladders score better.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <span className="badge badge-primary badge-lg">Daily Challenge</span>
              <span className="badge badge-outline badge-lg border-white/25 text-white">Unlimited Play</span>
              <span className="badge badge-outline badge-lg border-white/25 text-white">Smart Hints</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-3 py-8 sm:px-6 lg:px-8 lg:py-12">
          <WordLadderGame dailyDate={dailyDate} dailyPuzzle={dailyPuzzle} />

          <section className="mt-10 grid gap-6 lg:grid-cols-2" aria-labelledby="how-to-play">
            <article className="rounded-2xl bg-base-100 p-6 shadow-sm">
              <h2 className="text-2xl font-black" id="how-to-play">How to Play</h2>
              <ol className="mt-5 grid gap-4">
                <HowToStep number="1" title="Start with the first word">Look at the target and plan a chain of same-length words.</HowToStep>
                <HowToStep number="2" title="Change one letter">Keep the other letters in the same positions. Each new word must be accepted by the game dictionary.</HowToStep>
                <HowToStep number="3" title="Reach the target">Finish in as few moves as possible, then compare your ladder with a BFS-verified shortest path.</HowToStep>
              </ol>
            </article>
            <article className="rounded-2xl bg-base-100 p-6 shadow-sm">
              <h2 className="text-2xl font-black">Fair play and dictionary</h2>
              <p className="mt-4 leading-7 text-base-content/70">The challenge uses a curated common-word subset of the public-domain ENABLE 1 lexicon. Puzzles are checked automatically for valid endpoints, solvability, shortest path, and difficulty before release.</p>
              <dl className="mt-5 grid gap-3 text-sm">
                <div><dt className="font-bold">Dictionary version</dt><dd className="text-base-content/65">{WORD_LADDER_DICTIONARY_VERSION}</dd></div>
                <div><dt className="font-bold">Source</dt><dd className="text-base-content/65">{WORD_LADDER_DICTIONARY_SOURCE}</dd></div>
                <div><dt className="font-bold">Daily schedule</dt><dd className="text-base-content/65">Deterministic UTC date mapping; no browser randomness.</dd></div>
              </dl>
            </article>
          </section>

          <section className="mt-10" aria-labelledby="word-ladder-faq">
            <h2 className="text-3xl font-black" id="word-ladder-faq">Word Ladder FAQ</h2>
            <div className="mt-5 grid gap-3">
              {faqs.map((faq) => (
                <details className="collapse-arrow collapse rounded-2xl bg-base-100 shadow-sm" key={faq.question}>
                  <summary className="collapse-title text-lg font-bold">{faq.question}</summary>
                  <div className="collapse-content leading-7 text-base-content/70"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10" aria-labelledby="related-word-games">
            <h2 className="text-3xl font-black" id="related-word-games">More quick browser games</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedGames.map((game) => (
                <Link className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary" key={game.slug} params={{ gameId: game.slug, locale: 'en' }} to="/$locale/games/$gameId">
                  <h3 className="text-lg font-black">{game.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-base-content/65">{game.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-primary">Play now <i className="ri-arrow-right-line" /></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </SiteLayout>
  )
}

function HowToStep({ children, number, title }: { children: React.ReactNode; number: string; title: string }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-black text-primary-content">{number}</span>
      <div><h3 className="font-black">{title}</h3><p className="mt-1 leading-6 text-base-content/65">{children}</p></div>
    </li>
  )
}
