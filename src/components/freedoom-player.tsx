import { useState } from 'react'

import { GamePlayerFrame } from '#/components/game-player-frame'
import { trackEvent } from '#/lib/analytics'
import { freedoomGame } from '#/lib/freedoom-game'

export function FreedoomPlayer() {
  const [started, setStarted] = useState(false)

  if (started) {
    return (
      <GamePlayerFrame
        allow="autoplay; gamepad; fullscreen"
        className="h-[42rem] min-h-[34rem] sm:h-[46rem] lg:h-[48rem]"
        gameId={freedoomGame.id}
        locale="en"
        src={freedoomGame.embedUrl}
        title={freedoomGame.title}
      />
    )
  }

  return (
    <div className="relative isolate h-[23rem] overflow-hidden bg-black sm:aspect-video sm:h-auto sm:min-h-[28rem]">
      <img
        alt={freedoomGame.imageAlt}
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        decoding="async"
        fetchPriority="high"
        height="900"
        src={freedoomGame.imageUrl}
        width="1600"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/15" />
      <div className="relative flex h-full min-w-0 max-w-full items-center justify-center overflow-hidden px-5 py-10 text-center text-white">
        <div className="w-full min-w-0 max-w-[calc(100vw-4rem)] sm:max-w-xl">
          <h2 className="break-words text-2xl font-black sm:text-4xl">Start Freedoom Phase 1</h2>
          <p className="mt-3 break-words leading-7 text-white/75">
            Loads about 35 MB from the open-source project host. The game starts only after you choose to load it.
          </p>
          <button
            className="btn btn-primary btn-lg mt-6"
            onClick={() => {
              trackEvent('game_start', { game_id: freedoomGame.id, mode: 'embedded_open_source' })
              setStarted(true)
            }}
            type="button"
          >
            Load game <i aria-hidden="true" className="ri-play-fill" />
          </button>
          <p className="mt-4 break-words text-xs leading-5 text-white/55">Third-party open-source player · No proprietary Doom WAD files</p>
        </div>
      </div>
    </div>
  )
}

