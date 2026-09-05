import { GamePlayerFrame } from '#/components/game-player-frame'
import { trackEvent } from '#/lib/analytics'
import type { PublicGame } from '#/lib/ggemu'
import { buildGameEmbedSrc } from '#/lib/game-embed'
import { siteConfig } from '#/lib/site-config'
import { useCurrentSiteTheme } from '#/lib/use-site-theme'

const playPageCopy = {
  en: 'Open game page',
  'zh-CN': '在独立页面游玩',
  ja: '別ページでプレイ',
}

export function EmbeddedGamePlayer({
  description,
  game,
  gameId,
  heading,
  locale,
  playPath,
}: {
  description: string
  game: PublicGame
  gameId: string
  heading: string
  locale: string
  playPath: string
}) {
  const theme = useCurrentSiteTheme()
  const playPageLabel = playPageCopy[locale as keyof typeof playPageCopy] ?? playPageCopy.en
  const embedSrc = buildGameEmbedSrc({
    embedId: game._id || game.url_slug || gameId,
    isPsp: false,
    locale,
    refcode: siteConfig.GGEMU_REFCODE,
    theme,
  })

  return (
    <section
      className="scroll-mt-24 overflow-hidden rounded-box border border-base-300 bg-neutral text-neutral-content shadow-lg"
      id="play-online"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {heading}
          </h2>
          <p className="mt-1 text-sm leading-6 text-white/65">
            {description}
          </p>
        </div>
        <a
          className="btn btn-sm border-white/20 bg-white/10 text-white hover:bg-white/20"
          href={playPath}
          onClick={() => trackEvent('game_play_click', { game_id: gameId, source: 'play_page' })}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i aria-hidden="true" className="ri-external-link-line" />
          {playPageLabel}
        </a>
      </div>
      <div className="aspect-video min-h-96 w-full min-w-0 bg-black">
        <GamePlayerFrame
          allow="autoplay; gamepad"
          className="h-full w-full border-0 bg-black"
          lazy
          gameId={gameId}
          locale={locale}
          src={embedSrc}
          title={heading}
          unavailable={game.play_online === 0}
        />
      </div>
    </section>
  )
}
