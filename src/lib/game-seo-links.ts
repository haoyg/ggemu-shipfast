import type { Locale, PublicGame } from '#/lib/ggemu'

export type GameSeoInternalLink = {
  label: string
  slug: string
}

const gameSeoLinkClusters: Array<Array<GameSeoInternalLink>> = [
  [
    {
      label: 'Play Geometry Dash Advance online',
      slug: 'geometry-dash-advance-gba-2025',
    },
    {
      label: 'Play Space is Key online',
      slug: 'space-is-key-flash-2011',
    },
    {
      label: 'Play Rhythm Tengoku online',
      slug: 'rhythm-tengoku-japan-gba-2006',
    },
  ],
  [
    {
      label: 'Play Taiko Web online',
      slug: 'taiko-no-tatsujin-taiko-web-html5-2011',
    },
    {
      label: 'Play Taiko no Tatsujin DS online',
      slug: 'taiko-no-tatsujin-ds-touch-de-dokodon-nds-2005',
    },
    {
      label: 'Play Rhythm Heaven online',
      slug: 'rhythm-heaven-nds-2008',
    },
  ],
  [
    {
      label: "Play Shonen Jump's One Piece online",
      slug: 'shonen-jump-s-one-piece-gba-2005',
    },
    {
      label: 'Play One Piece: Gigant Battle online',
      slug: 'one-piece-gigant-battle-nds-2011',
    },
    {
      label: 'Play One Piece Grand Battle online',
      slug: 'one-piece-grand-battle-swan-colosseum-wsc-2002',
    },
    {
      label: 'Play One Piece Swan Colosseum online',
      slug: 'from-tv-animation-one-piece-grand-battle-swan-colosseum-wsc-2002',
    },
  ],
]

export function getGameSeoInternalLinks(game: PublicGame, locale: Locale) {
  if (locale !== 'en') {
    return []
  }

  const currentSlug = game.url_slug?.trim().toLowerCase()
  const cluster = gameSeoLinkClusters.find((links) =>
    links.some((link) => link.slug === currentSlug),
  )

  return cluster?.filter((link) => link.slug !== currentSlug) ?? []
}
