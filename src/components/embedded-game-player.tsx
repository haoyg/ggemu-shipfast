import type { PublicGame } from '#/lib/ggemu'
import { buildGameEmbedSrc } from '#/lib/game-embed'
import { siteConfig } from '#/lib/site-config'
import { useCurrentSiteTheme } from '#/lib/use-site-theme'

export function EmbeddedGamePlayer({
  game,
  gameId,
  locale,
  playPath,
}: {
  game: PublicGame
  gameId: string
  locale: string
  playPath: string
}) {
  const theme = useCurrentSiteTheme()
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
      id="play-contra-online"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Play Contra Game Online Free
          </h2>
          <p className="mt-1 text-sm leading-6 text-white/65">
            Start Contra in your browser with no separate emulator download.
          </p>
        </div>
        <a
          className="btn btn-sm border-white/20 bg-white/10 text-white hover:bg-white/20"
          href={playPath}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i aria-hidden="true" className="ri-fullscreen-line" />
          Open Fullscreen
        </a>
      </div>
      <div className="aspect-video min-h-56 bg-black sm:min-h-96">
        <iframe
          allow="autoplay; gamepad"
          allowFullScreen
          className="h-full w-full border-0 bg-black"
          loading="lazy"
          src={embedSrc}
          title="Play Contra game online free"
        />
      </div>
    </section>
  )
}
