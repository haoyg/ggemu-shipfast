import { Link } from '@tanstack/react-router'

import {
  GameCardPreviewVideo,
  gameCardPreviewHandlers,
} from '#/components/game-card-preview'
import { SiteLayout } from '#/components/site-layout'
import type { PublicGame } from '#/lib/ggemu'

export type GameCollectionFaq = {
  question: string
  answer: string
}

export type CollectionIconName = keyof typeof collectionIconPaths

export type GameCollectionGenre = {
  name: string
  description: string
  icon: CollectionIconName
  matchTerms?: Array<string>
}

export type GameCollectionPageConfig = {
  routePath: string
  heroTitle: string
  heroDescription: string
  ctaLabel: string
  secondaryCta?: { href: string; label: string }
  libraryTitle: string
  libraryDescription: (total: number) => string
  unavailableMessage: string
  featuredLabel: string
  coverAlt: string
  articleTitle: string
  articleParagraphs: Array<string>
  benefits: Array<{ icon: CollectionIconName; title: string; body: string }>
  genresTitle: string
  genres: Array<GameCollectionGenre>
  faqs: Array<GameCollectionFaq>
}

export function GameCollectionPage({
  config,
  games,
  total,
}: {
  config: GameCollectionPageConfig
  games: Array<PublicGame>
  total: number
}) {
  const featuredGames = games.slice(0, 4)
  const libraryGames = games.slice(0, 18)

  return (
    <SiteLayout
      locale="en"
      localePaths={{ 'zh-CN': '/zh-CN', en: config.routePath, ja: '/ja' }}
    >
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {config.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-base-content/70">
              {config.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#game-library">
                {config.ctaLabel}
                <i aria-hidden="true" className="ri-arrow-down-line" />
              </a>
              {config.secondaryCta ? (
                <a className="btn btn-outline" href={config.secondaryCta.href}>
                  {config.secondaryCta.label}
                  <i aria-hidden="true" className="ri-pulse-line" />
                </a>
              ) : null}
            </div>
          </div>

          <HeroGameCovers games={featuredGames} label={config.featuredLabel} />
        </div>
      </section>

      <section className="bg-neutral text-neutral-content" id="game-library">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-white">{config.libraryTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            {config.libraryDescription(total)}
          </p>

          {libraryGames.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {libraryGames.map((game, index) => (
                <GameCollectionCard
                  coverAlt={config.coverAlt}
                  game={game}
                  isPriority={index < 2}
                  key={getGameId(game)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-10 text-center text-white/65">
              {config.unavailableMessage}
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] lg:px-8">
          <article>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              {config.articleTitle}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-base-content/70">
              {config.articleParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="divide-y divide-base-300 border-y border-base-300">
            {config.benefits.map((benefit) => (
              <article className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5" key={benefit.title}>
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-primary/30 text-xl text-primary">
                  <CollectionIcon name={benefit.icon} />
                </span>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-base-content/65">{benefit.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-200/45">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold">{config.genresTitle}</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {config.genres.map((genre) => (
              <GenreLink game={findGenreGame(games, genre)} genre={genre} key={genre.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-base-300 bg-base-100">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-base-300 border-y border-base-300">
            {config.faqs.map((faq) => (
              <details className="group py-1" key={faq.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold">
                  {faq.question}
                  <i aria-hidden="true" className="ri-add-line text-xl transition group-open:rotate-45" />
                </summary>
                <p className="max-w-3xl pb-5 leading-7 text-base-content/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function HeroGameCovers({ games, label }: { games: Array<PublicGame>; label: string }) {
  if (games.length === 0) {
    return (
      <div className="grid min-h-72 place-items-center rounded-xl border border-base-300 bg-base-200 text-base-content/45">
        <i aria-hidden="true" className="ri-gamepad-line text-6xl" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2" aria-label={label}>
      {games.map((game, index) => (
        <Link
          className={`group overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
            index % 2 === 0 ? 'lg:-translate-y-3' : 'lg:translate-y-3'
          }`}
          key={getGameId(game)}
          params={{ gameId: getGameId(game), locale: 'en' }}
          to="/$locale/games/$gameId"
        >
          <div className="aspect-[4/3] overflow-hidden bg-base-300">
            {game.game_cover ? (
              <img
                alt={game.name ?? label}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                height="300"
                loading={index === 0 ? 'eager' : 'lazy'}
                src={game.game_cover}
                width="400"
              />
            ) : null}
          </div>
          <p className="line-clamp-1 px-3 py-2 text-sm font-semibold">{game.name}</p>
        </Link>
      ))}
    </div>
  )
}

function GameCollectionCard({
  coverAlt,
  game,
  isPriority,
}: {
  coverAlt: string
  game: PublicGame
  isPriority: boolean
}) {
  const gameId = getGameId(game)

  return (
    <Link
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-primary/70 hover:bg-white/10"
      {...gameCardPreviewHandlers}
      params={{ gameId, locale: 'en' }}
      search={{}}
      to="/$locale/games/$gameId"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        {game.game_cover ? (
          <img
            alt={`${game.name ?? 'Game'} ${coverAlt}`}
            className="h-full w-full object-cover"
            decoding="async"
            fetchPriority={isPriority ? 'high' : 'auto'}
            height="300"
            loading={isPriority ? 'eager' : 'lazy'}
            src={game.game_cover}
            width="400"
          />
        ) : null}
        <GameCardPreviewVideo src={game.game_video} />
      </div>
      <h3 className="line-clamp-2 min-h-12 px-3 py-3 text-sm font-semibold leading-snug text-white">
        {game.name}
      </h3>
    </Link>
  )
}

function GenreLink({ game, genre }: { game?: PublicGame; genre: GameCollectionGenre }) {
  const content = (
    <>
      <CollectionIcon className="h-6 w-6 text-primary" name={genre.icon} />
      <span className="font-semibold">{genre.name}</span>
      <span className="text-xs leading-5 text-base-content/50">{genre.description}</span>
    </>
  )

  if (!game) {
    return <a className="grid gap-2 bg-base-100 p-5 hover:bg-base-200" href="#game-library">{content}</a>
  }

  return (
    <Link
      className="grid gap-2 bg-base-100 p-5 hover:bg-base-200"
      params={{ gameId: getGameId(game), locale: 'en' }}
      to="/$locale/games/$gameId"
    >
      {content}
    </Link>
  )
}

function findGenreGame(games: Array<PublicGame>, genre: GameCollectionGenre) {
  const matchTerms = genre.matchTerms ?? [genre.name]

  return games.find((game) =>
    game.categories?.some((category) =>
      matchTerms.some((term) => category.toLowerCase().includes(term.toLowerCase())),
    ),
  )
}

function getGameId(game: PublicGame) {
  return game.url_slug?.trim() || game._id?.trim() || ''
}

const collectionIconPaths = {
  ball: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-8 8.5h16M8 4.2c2.8 3.1 2.8 12.5 0 15.6m8-15.6c-2.8 3.1-2.8 12.5 0 15.6',
  bolt: 'M13 2 4.5 13H11l-1 9 9.5-13H13V2Z',
  boxing: 'M7 13V8.5a3.5 3.5 0 0 1 7 0V10h1a3 3 0 0 1 3 3v2a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2h2Zm0 0h8',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 5.5-2 5-5 2 2-5 5-2Z',
  dumbbell: 'M4 9v6m3-8v10m10-10v10m3-8v6M7 12h10',
  flag: 'M6 21V4m0 1h10l-2 3 2 3H6',
  gamepad: 'M8 7h8a5 5 0 0 1 4.7 6.7l-1 3A2.5 2.5 0 0 1 15.5 18L14 16h-4l-1.5 2a2.5 2.5 0 0 1-4.2-1.3l-1-3A5 5 0 0 1 8 7Zm0 3v4m-2-2h4m6-1h.01m2 2h.01',
  grid: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
  monitor: 'M3 5h18v12H3V5Zm6 16h6m-3-4v4',
  platform: 'M4 19h16M6 15h5v-4h4V7h3M8 6h.01',
  puzzle: 'M9 4h3a2 2 0 1 1 4 0h4v5a2 2 0 1 0 0 4v7h-7a2 2 0 1 0-4 0H4v-7a2 2 0 1 0 0-4V4h5Z',
  rocket: 'M14 4c2-1.4 4.4-1.8 6-1.8-.1 1.7-.6 4-2 6L13 13l-4-2-2-4 7-3Zm-5 7-3 1-3 3 5 1m5-3 1 5 3-3 1-3M7 18c-1 2-3 3-5 3 0-2 1-4 3-5',
  steering: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7 8h14m-7 0v9m-5-9 2 4h6l2-4',
  swords: 'm5 4 15 15m-2-17-5 8 3 3 6-7V2h-4ZM4 16l4 4m-6 2 5-5',
  trophy: 'M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4m-4 1v5m-4 4h8m-6-4h4',
  wand: 'm4 20 12-12m-9 0 1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1Zm10 8 .7-2 .8 2 2 .7-2 .8-.8 2-.7-2-2-.8 2-.7Z',
} as const

function CollectionIcon({ className = 'h-6 w-6', name }: { className?: string; name: CollectionIconName }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <path d={collectionIconPaths[name]} />
    </svg>
  )
}
