import { Link } from '@tanstack/react-router'

import {
  GameCardPreviewVideo,
  gameCardPreviewHandlers,
} from '#/components/game-card-preview'
import { SiteLayout } from '#/components/site-layout'
import type { PublicGame } from '#/lib/ggemu'

const genreNames = ['RPG', 'Racing', 'Action', 'Adventure', 'Fighting', 'Sports']

const benefits = [
  {
    icon: 'ri-flashlight-line',
    title: 'Start in your browser',
    body: 'Open a supported game page and begin without installing a desktop emulator.',
  },
  {
    icon: 'ri-gamepad-line',
    title: 'Keyboard and controller support',
    body: 'Use the controls provided by each game and browser player.',
  },
  {
    icon: 'ri-layout-grid-line',
    title: 'A focused PS1 library',
    body: 'Browse PlayStation classics in one dedicated collection.',
  },
  {
    icon: 'ri-device-line',
    title: 'Built for modern browsers',
    body: 'Play on a current desktop or mobile browser when the game supports it.',
  },
]

export const ps1Faqs = [
  {
    question: 'Can I play PS1 games online without downloading anything?',
    answer:
      'Yes. Supported PS1 games on POKOPIE launch directly from their game page in a modern browser, without requiring a separate emulator download.',
  },
  {
    question: 'Which browser works best for online PS1 games?',
    answer:
      'A current version of Chrome, Edge, Firefox, or Safari is recommended. Performance can vary by game, device, browser, and network connection.',
  },
  {
    question: 'Can I use a controller to play PS1 games online?',
    answer:
      'Controller support depends on the game player and browser. Connect your controller before launching a game and review the controls shown in the player.',
  },
  {
    question: 'Are all PlayStation 1 games available to play?',
    answer:
      'Availability changes over time. This page lists the PS1 titles currently available in the POKOPIE catalog.',
  },
]

export function Ps1GamesPage({
  games,
  total,
}: {
  games: Array<PublicGame>
  total: number
}) {
  const featuredGames = games.slice(0, 4)
  const libraryGames = games.slice(0, 18)

  return (
    <SiteLayout
      locale="en"
      localePaths={{ 'zh-CN': '/zh-CN', en: '/en/ps1-games', ja: '/ja' }}
    >
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Play PS1 Games Online
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-base-content/70">
              Play PS1 games online in your browser and revisit classic
              PlayStation adventures, racers, RPGs, and fighting games. No
              separate emulator installation is required for supported titles.
            </p>
            <a className="btn btn-primary mt-8" href="#ps1-games">
              Browse PS1 Games
              <i aria-hidden="true" className="ri-arrow-down-line" />
            </a>
          </div>

          <HeroGameCovers games={featuredGames} />
        </div>
      </section>

      <section className="bg-neutral text-neutral-content" id="ps1-games">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-white">PS1 Game Library</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Browse {total} PlayStation 1 games currently listed in the POKOPIE catalog.
              </p>
            </div>
          </div>

          {libraryGames.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {libraryGames.map((game, index) => (
                <Ps1GameCard game={game} isPriority={index < 2} key={getGameId(game)} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-10 text-center text-white/65">
              PS1 games are temporarily unavailable. Please check back soon.
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] lg:px-8">
          <article>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              The Best Way to Play PS1 Games in Your Browser
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-base-content/70">
              <p>
                The original PlayStation built a library that crossed genres and
                generations. POKOPIE brings available PS1 titles into a focused
                browser collection, so you can move from discovery to a playable
                game page with fewer steps.
              </p>
              <p>
                Start with a familiar series or explore something new. Each game
                page includes the title, platform information, controls, and a
                browser player when that game is available online.
              </p>
              <p>
                For the most reliable experience, use an up-to-date browser,
                close unnecessary tabs, and connect a controller before launching
                the game if you prefer gamepad controls.
              </p>
            </div>
          </article>

          <div className="divide-y divide-base-300 border-y border-base-300">
            {benefits.map((benefit) => (
              <article className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5" key={benefit.title}>
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-primary/30 text-xl text-primary">
                  <i aria-hidden="true" className={benefit.icon} />
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
          <h2 className="text-center text-3xl font-semibold">Popular PS1 Genres</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {genreNames.map((genre) => (
              <GenreLink game={findGenreGame(games, genre)} genre={genre} key={genre} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-base-300 bg-base-100">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-base-300 border-y border-base-300">
            {ps1Faqs.map((faq) => (
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

function HeroGameCovers({ games }: { games: Array<PublicGame> }) {
  if (games.length === 0) {
    return (
      <div className="grid min-h-72 place-items-center rounded-xl border border-base-300 bg-base-200 text-base-content/45">
        <i aria-hidden="true" className="ri-playstation-line text-6xl" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2" aria-label="Featured PS1 games">
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
                alt={game.name ?? 'PS1 game'}
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

function Ps1GameCard({ game, isPriority }: { game: PublicGame; isPriority: boolean }) {
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
            alt={game.name ?? 'PS1 game cover'}
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

function GenreLink({ game, genre }: { game?: PublicGame; genre: string }) {
  const content = (
    <>
      <i aria-hidden="true" className={`${getGenreIcon(genre)} text-2xl text-primary`} />
      <span className="font-semibold">{genre}</span>
      <span className="text-xs text-base-content/50">Explore a PS1 title</span>
    </>
  )

  if (!game) {
    return <a className="grid gap-2 bg-base-100 p-5 hover:bg-base-200" href="#ps1-games">{content}</a>
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

function findGenreGame(games: Array<PublicGame>, genre: string) {
  return games.find((game) =>
    game.categories?.some((category) => category.toLowerCase().includes(genre.toLowerCase())),
  )
}

function getGenreIcon(genre: string) {
  return {
    Action: 'ri-sword-line',
    Adventure: 'ri-compass-3-line',
    Fighting: 'ri-boxing-line',
    RPG: 'ri-magic-line',
    Racing: 'ri-steering-2-line',
    Sports: 'ri-football-line',
  }[genre] ?? 'ri-gamepad-line'
}

function getGameId(game: PublicGame) {
  return game.url_slug?.trim() || game._id?.trim() || ''
}
